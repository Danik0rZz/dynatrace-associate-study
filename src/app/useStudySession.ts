import { useEffect, useRef, useState, type Dispatch, type SetStateAction } from 'react'
import { allQuestions, questionsById, questionsByModule } from '../data/questions'
import type { Question } from '../data/types'
import { questionIdsForSection, sectionTitle } from '../lib/guide-links'
import { recordAttempt, type ProgressState } from '../lib/progress'
import { adaptiveReviewIds, fullBankIds, loadServed, mockExamIds, optionOrders, quickQuizIds, rememberServed } from '../lib/selection'
import { MOCK_DURATION_SECONDS, type Confidence, type QuizMode, type Session } from './types'

/**
 * Estado y acciones de una sesión de preguntas (quiz, banco, repaso, apartado o simulacro).
 * `onStart` avisa a la app para que cambie de pantalla.
 */
export function useStudySession(progress: ProgressState, setProgress: Dispatch<SetStateAction<ProgressState>>, onStart: (mode: QuizMode) => void) {
  const [session, setSession] = useState<Session | null>(null)
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string[]>>({})
  const [confidence, setConfidence] = useState<Confidence>(3)
  const [confidenceByQuestion, setConfidenceByQuestion] = useState<Record<string, Confidence>>({})
  const [feedbackQuestionId, setFeedbackQuestionId] = useState<string | null>(null)
  const [done, setDone] = useState(false)
  const [secondsLeft, setSecondsLeft] = useState(MOCK_DURATION_SECONDS)
  const [flagged, setFlagged] = useState<string[]>([])

  const currentQuestion = session ? questionsById[session.questionIds[index]] : undefined

  const start = (mode: QuizMode, questionIds: string[], title: string, moduleId?: string, sectionId?: string) => {
    rememberServed(questionIds)
    setSession({ mode, questionIds, title, moduleId, sectionId, optionOrderByQuestionId: optionOrders(questionIds.map((id) => questionsById[id])) })
    setIndex(0)
    setAnswers({})
    setFlagged([])
    setConfidence(3)
    setConfidenceByQuestion({})
    setFeedbackQuestionId(null)
    setDone(false)
    setSecondsLeft(MOCK_DURATION_SECONDS)
    onStart(mode)
  }

  const close = () => {
    setSession(null)
    setDone(false)
    setFeedbackQuestionId(null)
  }

  const startModuleQuiz = (mode: 'quick' | 'full', moduleId: string, moduleTitle: string) => {
    const pool = questionsByModule[moduleId]
    const ids = mode === 'quick' ? quickQuizIds(pool, progress, loadServed()) : fullBankIds(pool)
    start(mode, ids, `${mode === 'quick' ? 'Quiz rápido' : 'Banco completo'} · ${moduleTitle}`, moduleId)
  }
  const startMock = () => start('mock', mockExamIds(allQuestions, progress, loadServed()), 'Simulacro · 60 preguntas')
  const startReview = () => start('review', adaptiveReviewIds(allQuestions, progress, loadServed(), 24), 'Repaso adaptativo')
  const startSection = (moduleId: string, sectionId: string) => {
    const ids = questionIdsForSection(moduleId, sectionId)
    if (ids.length) start('section', fullBankIds(ids.map((id) => questionsById[id])), `Apartado · ${sectionTitle(moduleId, sectionId)}`, moduleId, sectionId)
  }
  const retry = (ids: string[]) => {
    if (ids.length) start('review', fullBankIds(ids.map((id) => questionsById[id])), 'Repetir fallos')
  }

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
    }
    setDone(true)
    setFeedbackQuestionId(null)
  }

  // El temporizador del simulacro llama siempre a la versión más reciente de `complete`.
  const completeRef = useRef(complete)
  useEffect(() => { completeRef.current = complete })
  const timerActive = Boolean(session && session.mode === 'mock' && !done)
  useEffect(() => {
    if (!timerActive) return undefined
    const timer = window.setInterval(() => setSecondsLeft((seconds) => Math.max(0, seconds - 1)), 1000)
    return () => window.clearInterval(timer)
  }, [timerActive, session])
  // Al llegar a 00:00 el simulacro se entrega solo (una única vez: `complete` ignora una sesión ya terminada).
  useEffect(() => {
    if (timerActive && secondsLeft === 0) completeRef.current()
  }, [timerActive, secondsLeft])

  const submit = () => {
    if (!session || !currentQuestion) return
    if (session.mode === 'mock') {
      if (index === session.questionIds.length - 1) complete()
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
  const jump = (target: number) => { setIndex(target); setFeedbackQuestionId(null) }
  const toggleFlag = (questionId: string) => setFlagged((items) => items.includes(questionId) ? items.filter((id) => id !== questionId) : [...items, questionId])

  return {
    session, index, answers, confidence, confidenceByQuestion, feedbackQuestionId, done, secondsLeft, flagged, currentQuestion,
    start, close, startModuleQuiz, startMock, startReview, startSection, retry,
    toggleAnswer, setQuestionConfidence, submit, next, back, jump, toggleFlag,
  }
}
