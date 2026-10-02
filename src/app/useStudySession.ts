import { useEffect, useRef, useState, type Dispatch, type SetStateAction } from 'react'
import { allQuestions, questionsById, questionsByModule } from '../data/questions'
import type { Question } from '../data/types'
import { questionIdsForSection, sectionTitle } from '../lib/guide-links'
import { appendMockHistory, buildMockHistoryEntry } from '../lib/mock-history'
import { clearSavedMock, loadSavedMock, saveMock, secondsUntil, type SavedMock } from '../lib/mock-session'
import { recordAttempt, type ProgressState } from '../lib/progress'
import { adaptiveReviewIds, fullBankIds, loadServed, mockExamIds, optionOrders, quickQuizIds, rememberServed } from '../lib/selection'
import { MOCK_DURATION_SECONDS, type Confidence, type QuizMode, type Session } from './types'

/**
 * Estado y acciones de una sesión de preguntas (quiz, banco, repaso, apartado o simulacro).
 * `onStart` avisa a la app para que cambie de pantalla.
 *
 * El simulacro en curso se guarda en localStorage a cada cambio (ver `lib/mock-session.ts`) y su tiempo se
 * calcula a partir de un `deadline` absoluto, así que sobrevive a recargas y cierres de la pestaña.
 */
export function useStudySession(progress: ProgressState, setProgress: Dispatch<SetStateAction<ProgressState>>, onStart: (mode: QuizMode) => void) {
  const [session, setSession] = useState<Session | null>(null)
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string[]>>({})
  const [confidence, setConfidence] = useState<Confidence>(3)
  const [confidenceByQuestion, setConfidenceByQuestion] = useState<Record<string, Confidence>>({})
  const [feedbackQuestionId, setFeedbackQuestionId] = useState<string | null>(null)
  const [done, setDone] = useState(false)
  const [deadline, setDeadline] = useState<number | null>(null)
  const [now, setNow] = useState(() => Date.now())
  const [flagged, setFlagged] = useState<string[]>([])
  const [reviewing, setReviewing] = useState(false)
  /** Simulacro guardado que se puede reanudar (al abrir la app o tras salir de uno en curso). */
  const [savedMock, setSavedMock] = useState<SavedMock | null>(() => loadSavedMock(questionsById))

  const currentQuestion = session ? questionsById[session.questionIds[index]] : undefined
  const mockInProgress = Boolean(session && session.mode === 'mock' && !done)
  const secondsLeft = deadline === null ? MOCK_DURATION_SECONDS : secondsUntil(deadline, now)

  const mockSnapshot = (): SavedMock | null => session && session.mode === 'mock' && deadline !== null
    ? { version: 1, title: session.title, questionIds: session.questionIds, optionOrderByQuestionId: session.optionOrderByQuestionId, answers, confidenceByQuestion, flagged, index, deadline }
    : null

  const reset = () => {
    setIndex(0)
    setAnswers({})
    setFlagged([])
    setConfidence(3)
    setConfidenceByQuestion({})
    setFeedbackQuestionId(null)
    setDone(false)
    setReviewing(false)
    setDeadline(null)
    setNow(Date.now())
  }

  const start = (mode: QuizMode, questionIds: string[], title: string, moduleId?: string, sectionId?: string) => {
    rememberServed(questionIds)
    setSession({ mode, questionIds, title, moduleId, sectionId, optionOrderByQuestionId: optionOrders(questionIds.map((id) => questionsById[id])) })
    reset()
    if (mode === 'mock') {
      clearSavedMock()
      setSavedMock(null)
      setDeadline(Date.now() + MOCK_DURATION_SECONDS * 1000)
    }
    onStart(mode)
  }

  /** Cierra la sesión. Un simulacro sin entregar queda guardado para reanudarlo. */
  const close = () => {
    if (mockInProgress) setSavedMock(mockSnapshot())
    setSession(null)
    setDone(false)
    setReviewing(false)
    setFeedbackQuestionId(null)
  }

  const startModuleQuiz = (mode: 'quick' | 'full', moduleId: string, moduleTitle: string) => {
    const pool = questionsByModule[moduleId]
    const ids = mode === 'quick' ? quickQuizIds(pool, progress, loadServed()) : fullBankIds(pool)
    start(mode, ids, `${mode === 'quick' ? 'Quiz rápido' : 'Banco completo'} · ${moduleTitle}`, moduleId)
  }
  const startMock = () => start('mock', mockExamIds(allQuestions, progress, loadServed()), 'Simulacro · 60 preguntas')
  const startReview = () => {
    const ids = adaptiveReviewIds(allQuestions, progress)
    if (ids.length) start('review', ids, 'Repaso adaptativo')
  }
  const startSection = (moduleId: string, sectionId: string) => {
    const ids = questionIdsForSection(moduleId, sectionId)
    if (ids.length) start('section', fullBankIds(ids.map((id) => questionsById[id])), `Apartado · ${sectionTitle(moduleId, sectionId)}`, moduleId, sectionId)
  }
  const retry = (ids: string[]) => {
    if (ids.length) start('review', fullBankIds(ids.map((id) => questionsById[id])), 'Repetir fallos')
  }

  /** Reanuda el simulacro guardado. Si su tiempo ya ha vencido, se entrega solo con las respuestas guardadas. */
  const resumeMock = () => {
    if (!savedMock) return
    setSession({ mode: 'mock', title: savedMock.title, questionIds: savedMock.questionIds, optionOrderByQuestionId: savedMock.optionOrderByQuestionId })
    reset()
    setIndex(savedMock.index)
    setAnswers(savedMock.answers)
    setConfidenceByQuestion(savedMock.confidenceByQuestion)
    setFlagged(savedMock.flagged)
    setDeadline(savedMock.deadline)
    setSavedMock(null)
    onStart('mock')
  }
  const discardSavedMock = () => {
    clearSavedMock()
    setSavedMock(null)
  }

  // Cada cambio del simulacro en curso se guarda; al entregarlo o descartarlo se borra.
  useEffect(() => {
    if (!mockInProgress || !session || deadline === null) return
    saveMock({ version: 1, title: session.title, questionIds: session.questionIds, optionOrderByQuestionId: session.optionOrderByQuestionId, answers, confidenceByQuestion, flagged, index, deadline })
  }, [mockInProgress, session, answers, confidenceByQuestion, flagged, index, deadline])

  // Al cerrar o recargar la pestaña con un simulacro en curso, el navegador pide confirmación.
  useEffect(() => {
    if (!mockInProgress) return undefined
    const warn = (event: BeforeUnloadEvent) => {
      event.preventDefault()
      event.returnValue = ''
    }
    window.addEventListener('beforeunload', warn)
    return () => window.removeEventListener('beforeunload', warn)
  }, [mockInProgress])

  const toggleAnswer = (question: Question, optionId: string) => {
    const current = answers[question.id] ?? []
    const next = question.type === 'single'
      ? [optionId]
      : current.includes(optionId) ? current.filter((id) => id !== optionId) : current.length < question.correctOptionIds.length ? [...current, optionId] : current
    setAnswers((all) => ({ ...all, [question.id]: next }))
  }

  const setQuestionConfidence = (question: Question, value: Confidence) => {
    setConfidence(value)
    setConfidenceByQuestion((current) => ({ ...current, [question.id]: value }))
  }

  const complete = () => {
    if (!session || done) return
    if (session.mode === 'mock') {
      setProgress((current) => session.questionIds.reduce((next, id) => recordAttempt(next, questionsById[id], answers[id] ?? [], confidenceByQuestion[id] ?? 3), current))
      clearSavedMock()
      // El inicio se deduce del deadline, así que también vale para un simulacro reanudado.
      if (deadline !== null) {
        const total = MOCK_DURATION_SECONDS * 1000
        appendMockHistory(buildMockHistoryEntry(session.questionIds.map((id) => questionsById[id]), answers, deadline - total, Math.min(Date.now(), deadline), MOCK_DURATION_SECONDS))
      }
    }
    setDone(true)
    setReviewing(false)
    setFeedbackQuestionId(null)
  }

  // El temporizador del simulacro llama siempre a la versión más reciente de `complete`.
  const completeRef = useRef(complete)
  useEffect(() => { completeRef.current = complete })
  useEffect(() => {
    if (!mockInProgress) return undefined
    const timer = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(timer)
  }, [mockInProgress, session])
  // Al llegar a 00:00 el simulacro se entrega solo (una única vez: `complete` ignora una sesión ya terminada).
  useEffect(() => {
    if (mockInProgress && deadline !== null && secondsLeft === 0) completeRef.current()
  }, [mockInProgress, deadline, secondsLeft])

  const submit = () => {
    if (!session || !currentQuestion) return
    if (session.mode === 'mock') {
      if (index === session.questionIds.length - 1) setReviewing(true)
      else setIndex((value) => value + 1)
      return
    }
    setProgress((current) => recordAttempt(current, currentQuestion, answers[currentQuestion.id] ?? [], confidence))
    setFeedbackQuestionId(currentQuestion.id)
  }

  const next = () => {
    if (!session || !currentQuestion) return
    if (index === session.questionIds.length - 1) complete()
    else {
      setIndex((value) => value + 1)
      setFeedbackQuestionId(null)
      setConfidence(3)
    }
  }

  const back = () => { if (index > 0) setIndex((value) => value - 1) }
  const jump = (target: number) => { setIndex(target); setFeedbackQuestionId(null); setReviewing(false) }
  const toggleFlag = (questionId: string) => setFlagged((items) => items.includes(questionId) ? items.filter((id) => id !== questionId) : [...items, questionId])
  /** Revisión previa a la entrega del simulacro. */
  const openReview = () => { if (mockInProgress) setReviewing(true) }
  const closeReview = () => setReviewing(false)

  return {
    session, index, answers, confidence, confidenceByQuestion, feedbackQuestionId, done, secondsLeft, flagged, currentQuestion,
    mockInProgress, reviewing, savedMock,
    start, close, startModuleQuiz, startMock, startReview, startSection, retry, resumeMock, discardSavedMock,
    toggleAnswer, setQuestionConfidence, submit, next, back, jump, toggleFlag, openReview, closeReview, complete,
  }
}
