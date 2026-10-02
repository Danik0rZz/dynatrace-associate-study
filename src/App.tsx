import { lazy, Suspense, useEffect, useState } from 'react'
import { navItems } from './app/labels'
import { useStoredState } from './app/storage'
import type { View } from './app/types'
import { useStudySession } from './app/useStudySession'
import { ErrorBoundary } from './components/ErrorBoundary'
import { GuideDrawer } from './components/GuideDrawer'
import { Sidebar } from './components/Sidebar'
import { ResumeMockPanel } from './components/ResumeMockPanel'
import { StorageWarning } from './components/StorageWarning'
import { allQuestions, modulesWithQuestions } from './data/questions'
import { guideRefFor, type GuideRef } from './lib/guide-links'
import { continueModule, LAST_MODULE_KEY } from './lib/route'
import { dueQuestionIds, latestAttempt, loadProgress, saveProgress, type ProgressState } from './lib/progress'
import { ErrorHistoryView } from './views/ErrorHistoryView'
import { GlossaryView } from './views/GlossaryView'
import { HomeView } from './views/HomeView'
import { MockReviewView } from './views/MockReviewView'
import { ModuleView } from './views/ModuleView'
import { PracticeView } from './views/PracticeView'
import { QuizView } from './views/QuizView'
import { ReviewView } from './views/ReviewView'
import { SessionResult } from './views/SessionResult'

// El mapa usa React Flow, que es pesado: se descarga solo al abrirlo.
const MapView = lazy(() => import('./components/MapView').then((module) => ({ default: module.MapView })))

const scrollToTop = () => { if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'auto' }) }

function App() {
  const [view, setView] = useState<View>('home')
  const [sidebarCollapsed, setSidebarCollapsed] = useStoredState<boolean>('dynatrace-associate-sidebar-collapsed', false)
  const [selectedModuleId, setSelectedModuleId] = useState('platform')
  const [progress, setProgress] = useState<ProgressState>(() => loadProgress())
  const [lastModuleId, setLastModuleId] = useStoredState<string | null>(LAST_MODULE_KEY, null)
  const [practiceDone, setPracticeDone] = useStoredState<string[]>('dynatrace-associate-practices-v1', [])
  const [glossarySearch, setGlossarySearch] = useState('')
  const [guide, setGuide] = useState<GuideRef | null>(null)
  const [pendingAnchor, setPendingAnchor] = useState<string | null>(null)

  useEffect(() => { saveProgress(progress) }, [progress])

  const study = useStudySession(progress, setProgress, (mode) => {
    scrollToTop()
    setGuide(null)
    setView(mode === 'mock' ? 'mock' : 'quiz')
  })
  const { session, currentQuestion } = study

  const selectedModule = modulesWithQuestions.find((module) => module.id === selectedModuleId) ?? modulesWithQuestions[0]
  const routeModule = currentQuestion ? modulesWithQuestions.find((module) => module.id === currentQuestion.moduleId) ?? selectedModule : selectedModule
  const attemptedQuestionCount = allQuestions.filter((question) => (progress.attempts[question.id] ?? []).length > 0).length
  const overallScore = allQuestions.reduce((sum, question) => sum + (latestAttempt(progress, question.id)?.score ?? 0), 0)
  const continueTarget = continueModule(modulesWithQuestions, progress, typeof lastModuleId === 'string' ? lastModuleId : null)
  const overallPercentage = Math.round((attemptedQuestionCount / allQuestions.length) * 100)

  /** Salir de un simulacro en curso pide confirmación; si se acepta, queda guardado para reanudarlo. */
  const confirmLeave = () => !study.mockInProgress || window.confirm('Tienes un simulacro en curso. Si sales, quedará guardado para reanudarlo, pero el tiempo seguirá corriendo. ¿Quieres salir?')

  const navigate = (nextView: View) => {
    if (!confirmLeave()) return
    scrollToTop()
    setView(nextView)
    if (nextView === 'practice') setSelectedModuleId('')
    study.close()
  }

  const openModule = (moduleId: string): boolean => {
    if (!confirmLeave()) return false
    scrollToTop()
    setSelectedModuleId(moduleId)
    setLastModuleId(moduleId)
    setView('module')
    study.close()
    return true
  }

  /** Simulacro: si hay uno en curso se vuelve a él; si hay uno guardado, se ofrece reanudarlo o descartarlo. */
  const startMock = () => {
    if (study.mockInProgress) {
      setView('mock')
      return
    }
    if (study.savedMock) {
      scrollToTop()
      setGuide(null)
      study.close()
      setView('mock')
      return
    }
    study.startMock()
  }

  const openPractices = (moduleId: string) => {
    setView('practice')
    setSelectedModuleId(moduleId)
  }

  const goToSection = (moduleId: string, sectionId: string) => {
    if (!openModule(moduleId)) return
    setGuide(null)
    setPendingAnchor(sectionId)
  }

  // Tras abrir un bloque desde la guía, desplaza la vista al apartado pedido. Los visuales del bloque se
  // descargan después y cambian la altura de la página: mientras llegan (máx. 2 s) se vuelve a colocar el
  // apartado, salvo que el usuario ya haya empezado a desplazarse por su cuenta.
  useEffect(() => {
    if (view !== 'module' || !pendingAnchor) return undefined
    const align = () => document.getElementById(pendingAnchor)?.scrollIntoView({ behavior: 'auto', block: 'start' })
    const frame = window.requestAnimationFrame(align)
    const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(align)
    const content = document.querySelector('.content-wrap')
    if (observer && content) observer.observe(content)
    const stop = () => {
      observer?.disconnect()
      window.removeEventListener('wheel', stop)
      window.removeEventListener('touchstart', stop)
      window.removeEventListener('keydown', stop)
      setPendingAnchor(null)
    }
    window.addEventListener('wheel', stop, { passive: true })
    window.addEventListener('touchstart', stop, { passive: true })
    window.addEventListener('keydown', stop)
    const timeout = window.setTimeout(stop, 2000)
    return () => {
      window.cancelAnimationFrame(frame)
      window.clearTimeout(timeout)
      observer?.disconnect()
      window.removeEventListener('wheel', stop)
      window.removeEventListener('touchstart', stop)
      window.removeEventListener('keydown', stop)
    }
  }, [view, pendingAnchor, selectedModuleId])

  const openGuide = (question: Parameters<typeof guideRefFor>[0]) => {
    const ref = guideRefFor(question)
    if (ref) setGuide(ref)
  }

  const startModuleQuiz = (mode: 'quick' | 'full', moduleId = selectedModule.id) => {
    const module = modulesWithQuestions.find((item) => item.id === moduleId) ?? selectedModule
    study.startModuleQuiz(mode, module.id, module.title)
  }

  const togglePractice = (id: string) => setPracticeDone((items) => items.includes(id) ? items.filter((item) => item !== id) : [...items, id])
  const inQuiz = view === 'quiz' || view === 'mock'
  // Versiones anteriores guardaban '1'/'0' en vez de true/false.
  const collapsed = Boolean(sidebarCollapsed)
  const breadcrumb = view === 'home' ? 'Study Lab' : navItems.find((item) => item.id === view)?.label ?? selectedModule.title

  return (
    <div className={`app-shell ${collapsed ? 'sidebar-collapsed' : ''}`}>
      <a className="skip-link" href="#main-content">Saltar al contenido</a>
      <Sidebar view={view} collapsed={collapsed} routeModule={routeModule} onToggle={() => setSidebarCollapsed((collapsed) => !collapsed)} onNavigate={navigate} onStartMock={startMock} onOpenModule={openModule} />

      <main className="main-content" id="main-content" tabIndex={-1}>
        <header className="topbar">
          <nav className="breadcrumbs" aria-label="Ruta de navegación"><span>Dynatrace</span><span className="crumb-separator" aria-hidden="true">/</span><span>Associate Certification</span><span className="crumb-separator" aria-hidden="true">/</span><strong aria-current="page">{breadcrumb}</strong></nav>
          <div className="topbar-meta"><span className="status-pulse" aria-hidden="true" /> Progreso guardado localmente <span className="topbar-divider" aria-hidden="true" /> <span>{attemptedQuestionCount}/{allQuestions.length} revisadas</span></div>
        </header>

        <StorageWarning />
        {study.savedMock && !session && view !== 'mock' && <ResumeMockPanel mock={study.savedMock} discardLabel="Descartar" onResume={study.resumeMock} onDiscard={study.discardSavedMock} />}
        <div className={`content-wrap ${view === 'map' ? 'content-wrap-wide' : ''}`}>
          {view === 'home' && <HomeView modules={modulesWithQuestions} progress={progress} continueTarget={continueTarget} overallPercentage={overallPercentage} overallScore={overallScore} attemptedQuestionCount={attemptedQuestionCount} onStart={() => openModule(continueTarget.id)} onMap={() => navigate('map')} onMock={startMock} onOpenModule={openModule} />}
          {view === 'map' && <ErrorBoundary fallback={(retry) => <div className="loading-state" role="alert">No se ha podido cargar el mapa. Comprueba la conexión y <button type="button" className="text-button" onClick={retry}>vuelve a intentarlo</button>, o recarga la página.</div>}><Suspense fallback={<p className="loading-state" role="status">Cargando el mapa…</p>}><MapView progress={progress} onOpenModule={openModule} onQuickQuiz={(id) => startModuleQuiz('quick', id)} onFullQuiz={(id) => startModuleQuiz('full', id)} onPractice={openPractices} /></Suspense></ErrorBoundary>}
          {view === 'module' && <ModuleView module={selectedModule} progress={progress} onOpenModule={openModule} onPracticeSection={study.startSection} onQuick={() => startModuleQuiz('quick')} onFull={() => startModuleQuiz('full')} onPractice={() => openPractices(selectedModule.id)} />}
          {view === 'mock' && !session && study.savedMock && <ResumeMockPanel mock={study.savedMock} discardLabel="Descartar y empezar uno nuevo" onResume={study.resumeMock} onDiscard={() => { study.discardSavedMock(); study.startMock() }} />}
          {inQuiz && session && !study.done && study.reviewing && <MockReviewView session={session} answers={study.answers} flagged={study.flagged} secondsLeft={study.secondsLeft} onJump={study.jump} onBack={study.closeReview} onConfirm={study.complete} />}
          {inQuiz && session && currentQuestion && !study.done && !study.reviewing && <QuizView session={session} question={currentQuestion} index={study.index} selected={study.answers[currentQuestion.id] ?? []} confidence={session.mode === 'mock' ? study.confidenceByQuestion[currentQuestion.id] ?? 3 : study.confidence} flagged={study.flagged.includes(currentQuestion.id)} secondsLeft={study.secondsLeft} feedbackVisible={study.feedbackQuestionId === currentQuestion.id} onToggleAnswer={(optionId) => study.toggleAnswer(currentQuestion, optionId)} onConfidence={(value) => study.setQuestionConfidence(currentQuestion, value)} onSubmit={study.submit} onNext={study.next} onToggleFlag={() => study.toggleFlag(currentQuestion.id)} onOpenGuide={() => openGuide(currentQuestion)} onBack={study.back} onJump={study.jump} onReview={study.openReview} />}
          {inQuiz && session && study.done && <SessionResult session={session} answers={study.answers} flagged={study.flagged} onHome={() => navigate('home')} onReview={() => dueQuestionIds(progress, allQuestions).length ? study.startReview() : navigate('review')} onRetry={study.retry} onOpenGuide={setGuide} onModule={() => session.moduleId && session.sectionId ? goToSection(session.moduleId, session.sectionId) : session.moduleId ? openModule(session.moduleId) : navigate('home')} />}
          {view === 'review' && !session && <ReviewView progress={progress} onStart={study.startReview} onOpenModule={openModule} />}
          {view === 'errors' && <ErrorHistoryView progress={progress} onOpenModule={openModule} onOpenGuide={openGuide} />}
          {view === 'practice' && <PracticeView selectedModuleId={selectedModuleId} done={practiceDone} onToggle={togglePractice} onOpenModule={openModule} />}
          {view === 'glossary' && <GlossaryView search={glossarySearch} onSearch={setGlossarySearch} onOpenModule={openModule} />}
        </div>
      </main>
      {guide && <GuideDrawer guide={guide} inSession={Boolean(session && !study.done)} onClose={() => setGuide(null)} onOpenInGuide={() => goToSection(guide.moduleId, guide.sectionId)} />}
    </div>
  )
}

export default App
