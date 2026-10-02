import { useEffect, useRef, useState, type Dispatch, type SetStateAction } from 'react'
import { questionIndex, questionIndexByModule, questionMetaById } from '../data/question-catalog'
import { loadedQuestion, loadQuestions, questionsLoaded } from '../data/question-loader'
import type { Question } from '../data/types'
import { customQuizIds, type CustomFilters } from '../lib/custom-quiz'
import { questionIdsForSection, sectionTitle } from '../lib/guide-links'
import { appendMockHistory, buildMockHistoryEntry } from '../lib/mock-history'
import { clearSavedMock, loadSavedMock, parseSavedMock, saveMock, secondsUntil, type SavedMock } from '../lib/mock-session'
import { recordAttempt, type ProgressState } from '../lib/progress'
import { adaptiveReviewIds, fullBankIds, loadServed, mockExamIds, optionOrders, quickQuizIds, rememberServed } from '../lib/selection'
import { MOCK_DURATION_SECONDS, type Confidence, type QuizMode, type Session } from './types'

/**
 * Estado y acciones de una sesión de preguntas (quiz, banco, repaso, apartado o simulacro).
 * `onStart` avisa a la app para que cambie de pantalla.
 *
 * El simulacro en curso se guarda en localStorage a cada cambio (ver `lib/mock-session.ts`) y su tiempo se
 * calcula a partir de un `deadline` absoluto, así que sobrevive a recargas y cierres de la pestaña.
 *
 * Las preguntas se eligen con el catálogo ligero, pero su texto se carga por bloque: antes de mostrar una sesión se
 * descargan los bloques de sus preguntas (`preparing`). El simulacro fija su `deadline` cuando ya está todo cargado;
 * si la carga falla, no arranca (ni temporizador ni simulacro guardado) y se puede reintentar.
 */

/** Sesión pedida cuyas preguntas se están descargando, o cuya descarga ha fallado. */
export type Preparing = { mode: QuizMode; title: string; status: 'loading' | 'error' | 'incompatible'; resume: boolean }

const fullQuestion = (id: string): Question => {
  const question = loadedQuestion(id)
  if (!question) throw new Error(`Pregunta sin cargar: ${id}`)
  return question
}
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
  const [savedMock, setSavedMock] = useState<SavedMock | null>(() => loadSavedMock(questionMetaById))
  const [preparing, setPreparing] = useState<Preparing | null>(null)
  /** Cada petición de sesión invalida las anteriores: una descarga que llega tarde no arranca nada. */
  const ticket = useRef(0)
  const retryRef = useRef<(() => void) | null>(null)

  const currentQuestion = session ? loadedQuestion(session.questionIds[index]) : undefined
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

  /**
   * Descarga el texto de `questionIds` y después ejecuta `begin` (que monta la sesión). Si ya está cargado, la sesión
   * arranca en el acto; si no, se cambia de pantalla con el estado de carga anunciado.
   */
  const prepare = (mode: QuizMode, title: string, questionIds: string[], begin: () => void, resume = false) => {
    const current = ++ticket.current
    if (questionsLoaded(questionIds)) {
      retryRef.current = null
      setPreparing(null)
      begin()
      onStart(mode)
      return
    }
    const run = () => {
      setPreparing({ mode, title, status: 'loading', resume })
      loadQuestions(questionIds).then(() => {
        if (current !== ticket.current) return
        retryRef.current = null
        setPreparing(null)
        begin()
      }, () => {
        if (current === ticket.current) setPreparing({ mode, title, status: 'error', resume })
      })
    }
    retryRef.current = run
    setSession(null)
    setDone(false)
    setReviewing(false)
    run()
    onStart(mode)
  }
  /** Vuelve a intentar la descarga que ha fallado. */
  const retryPreparing = () => retryRef.current?.()

  const start = (mode: QuizMode, questionIds: string[], title: string, moduleId?: string, sectionId?: string) => {
    prepare(mode, title, questionIds, () => {
      rememberServed(questionIds)
      setSession({ mode, questionIds, title, moduleId, sectionId, optionOrderByQuestionId: optionOrders(questionIds.map(fullQuestion)) })
      reset()
      if (mode === 'mock') {
        clearSavedMock()
        setSavedMock(null)
        // El tiempo empieza a contar con todas las preguntas ya descargadas.
        setDeadline(Date.now() + MOCK_DURATION_SECONDS * 1000)
      }
    })
  }

  /** Cierra la sesión. Un simulacro sin entregar queda guardado para reanudarlo. Cancela una descarga en curso. */
  const close = () => {
    if (mockInProgress) setSavedMock(mockSnapshot())
    ticket.current += 1
    retryRef.current = null
    setPreparing(null)
    setSession(null)
    setDone(false)
    setReviewing(false)
    setFeedbackQuestionId(null)
  }

  const startModuleQuiz = (mode: 'quick' | 'full', moduleId: string, moduleTitle: string) => {
    const pool = questionIndexByModule[moduleId] ?? []
    const ids = mode === 'quick' ? quickQuizIds(pool, progress, loadServed()) : fullBankIds(pool)
    start(mode, ids, `${mode === 'quick' ? 'Quiz rápido' : 'Banco completo'} · ${moduleTitle}`, moduleId)
  }
  const startMock = () => start('mock', mockExamIds(questionIndex, progress, loadServed()), 'Simulacro · 60 preguntas')
  const startReview = () => {
    const ids = adaptiveReviewIds(questionIndex, progress)
    if (ids.length) start('review', ids, 'Repaso adaptativo')
  }
  const startSection = (moduleId: string, sectionId: string) => {
    const ids = questionIdsForSection(moduleId, sectionId)
    if (ids.length) start('section', fullBankIds(ids.map((id) => ({ id }))), `Apartado · ${sectionTitle(moduleId, sectionId)}`, moduleId, sectionId)
  }
  /** Quiz a medida: la selección sale del catálogo y solo se descargan los bloques de las preguntas elegidas. */
  const startCustom = (filters: CustomFilters, title: string) => {
    const ids = customQuizIds(filters, progress, loadServed())
    const moduleId = filters.modules.length === 1 ? filters.modules[0] : undefined
    if (ids.length) start('custom', ids, title, moduleId, moduleId ? filters.section ?? undefined : undefined)
  }
  const retry = (ids: string[]) => {
    if (ids.length) start('review', fullBankIds(ids.map((id) => ({ id }))), 'Repetir fallos')
  }

  /**
   * Reanuda el simulacro guardado, tras descargar sus preguntas. Manda el `deadline` guardado: si vence durante la
   * descarga, se entrega al terminar con las respuestas guardadas. Si el texto cargado no casa con lo guardado
   * (opciones que han cambiado), se descarta.
   */
  const resumeMock = () => {
    if (!savedMock) return
    const saved = savedMock
    prepare('mock', saved.title, saved.questionIds, () => {
      const bank = Object.fromEntries(saved.questionIds.map((id) => [id, fullQuestion(id)]))
      if (!parseSavedMock(JSON.stringify(saved), bank)) {
        clearSavedMock()
        setSavedMock(null)
        setPreparing({ mode: 'mock', title: saved.title, status: 'incompatible', resume: true })
        return
      }
      setSession({ mode: 'mock', title: saved.title, questionIds: saved.questionIds, optionOrderByQuestionId: saved.optionOrderByQuestionId })
      reset()
      setIndex(saved.index)
      setAnswers(saved.answers)
      setConfidenceByQuestion(saved.confidenceByQuestion)
      setFlagged(saved.flagged)
      setDeadline(saved.deadline)
      setSavedMock(null)
    }, true)
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
      setProgress((current) => session.questionIds.reduce((next, id) => recordAttempt(next, fullQuestion(id), answers[id] ?? [], confidenceByQuestion[id] ?? 3), current))
      clearSavedMock()
      // El inicio se deduce del deadline, así que también vale para un simulacro reanudado.
      if (deadline !== null) {
        const total = MOCK_DURATION_SECONDS * 1000
        appendMockHistory(buildMockHistoryEntry(session.questionIds.map(fullQuestion), answers, deadline - total, Math.min(Date.now(), deadline), MOCK_DURATION_SECONDS))
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
    mockInProgress, reviewing, savedMock, preparing,
    start, close, retryPreparing, startModuleQuiz, startMock, startReview, startSection, startCustom, retry, resumeMock, discardSavedMock,
    toggleAnswer, setQuestionConfidence, submit, next, back, jump, toggleFlag, openReview, closeReview, complete,
  }
}
