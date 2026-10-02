import { useMemo, useState, useCallback, useEffect } from 'react'
import {
  ReactFlow,
  Handle,
  Position,
  Background,
  Controls,
  useReactFlow,
  type Node,
  type Edge,
  type NodeProps,
} from '@xyflow/react'
import { modulesWithQuestions, allQuestions } from '../data/questions'
import { moduleCompletion, moduleScore, type ProgressState, latestAttempt } from '../lib/progress'
import type { Module } from '../data/types'

function CanvasViewUpdater({ isInspectorOpen }: { isInspectorOpen: boolean }) {
  const { fitView } = useReactFlow()
  useEffect(() => {
    const timer = window.setTimeout(() => {
      fitView({ padding: 0.05, duration: 250 })
    }, 60)
    return () => window.clearTimeout(timer)
  }, [isInspectorOpen, fitView])
  return null
}

export type StudyPhase = {
  id: string
  name: string
  shortName: string
  order: number
  description: string
  moduleIds: string[]
  /** Color de la fase y sus variantes translúcidas (tokens CSS con valor claro y oscuro). */
  color: string
  tint: string
  line: string
}

export const studyPhases: StudyPhase[] = [
  {
    id: 'foundation',
    order: 1,
    name: 'Fase 1: Plataforma, Agentes & Ingesta',
    shortName: 'Plataforma & Agentes',
    description: 'Cimientos del tenant SaaS, licenciamiento DPS, OneAgent, ActiveGate y canales de OpenPipeline.',
    moduleIds: ['platform', 'observability', 'ingestion'],
    color: 'var(--map-phase-1)',
    tint: 'var(--map-phase-1-tint)',
    line: 'var(--map-phase-1-line)',
  },
  {
    id: 'storage-dql',
    order: 2,
    name: 'Fase 2: Motor Grail, Métricas & DQL',
    shortName: 'Grail & DQL',
    description: 'Particionado de buckets, retención, series temporales y lenguaje de consulta Dynatrace (DQL).',
    moduleIds: ['data-analysis', 'dql'],
    color: 'var(--map-phase-2)',
    tint: 'var(--map-phase-2-tint)',
    line: 'var(--map-phase-2-line)',
  },
  {
    id: 'analytics-dem',
    order: 3,
    name: 'Fase 3: Visualización & Experiencia Digital',
    shortName: 'Dashboards & DEM',
    description: 'Notebooks exploratorios, Dashboards interactivos, Real User Monitoring (RUM) y Synthetic.',
    moduleIds: ['notebooks', 'business-dem'],
    color: 'var(--map-phase-3)',
    tint: 'var(--map-phase-3-tint)',
    line: 'var(--map-phase-3-line)',
  },
  {
    id: 'security-action',
    order: 4,
    name: 'Fase 4: Inteligencia, Seguridad & Automatización',
    shortName: 'Seguridad & Workflows',
    description: 'Vulnerabilidades en runtime (DSS), flujos automáticos de AutomationEngine y topología Smartscape.',
    moduleIds: ['security', 'automation', 'other'],
    color: 'var(--map-phase-4)',
    tint: 'var(--map-phase-4-tint)',
    line: 'var(--map-phase-4-line)',
  },
]

export const studyModuleOrder: Record<string, number> = {
  platform: 1,
  observability: 2,
  ingestion: 3,
  'data-analysis': 4,
  dql: 5,
  notebooks: 6,
  'business-dem': 7,
  security: 8,
  automation: 9,
  other: 10,
}

// -------------------------------------------------------------
// Custom Node 1: Module Custom Node
// -------------------------------------------------------------
type ModuleNodeData = {
  module: Module
  studyOrder: number
  completion: number
  score: number
  attempted: number
  totalQuestions: number
  phaseId: string
  phaseName: string
  phaseColor: string
  isSelected: boolean
  onSelect: (id: string) => void
  onOpen: (id: string) => void
}

function ModuleCustomNode({ data }: NodeProps<Node<ModuleNodeData>>) {
  const { module, studyOrder, completion, score, attempted, totalQuestions, phaseName, phaseColor, isSelected, onSelect, onOpen } = data
  const isMastered = completion >= 80 && score >= 80
  const isInProgress = completion > 0 && !isMastered
  const statusLabel = isMastered ? 'Dominado' : isInProgress ? 'En progreso' : 'Pendiente'
  const statusClass = isMastered ? 'status-mastered' : isInProgress ? 'status-progress' : 'status-pending'

  return (
    <div
      className={`map-custom-node ${isSelected ? 'is-selected' : ''} ${statusClass}`}
      onClick={(e) => {
        e.stopPropagation()
        onOpen(module.id)
      }}
      onMouseEnter={() => onSelect(module.id)}
      role="link"
      tabIndex={0}
      title={`Abrir el bloque ${module.title}`}
      onKeyDown={(e) => e.key === 'Enter' && onOpen(module.id)}
    >
      <Handle type="target" position={Position.Left} id="left" className="map-node-handle" />
      <Handle type="target" position={Position.Top} id="top" className="map-node-handle" />

      <div className="node-phase-indicator" style={{ background: phaseColor }} />

      <div className="node-content">
        <div className="node-header">
          <span className="node-order-pill">{`M${String(studyOrder).padStart(2, '0')}`}</span>
          <span className="node-phase-tag" style={{ color: phaseColor }}>
            {phaseName}
          </span>
          <span className={`node-badge ${statusClass}`}>
            {isMastered && <span className="badge-check">✓</span>}
            {statusLabel}
          </span>
        </div>

        <h3 className="node-title" title={module.title}>{module.title}</h3>

        <div className="node-focus-row">
          <span>{module.focus.split(',').slice(0, 3).join(' · ')}</span>
        </div>

        <div className="node-progress-block">
          <div className="node-progress-track">
            <div
              className="node-progress-bar"
              style={{
                width: `${completion}%`,
                background: isMastered
                  ? 'var(--teal)'
                  : completion > 0
                  ? 'linear-gradient(90deg, var(--map-progress-start), var(--map-progress-end))'
                  : 'var(--map-progress-empty)',
              }}
            />
          </div>
          <div className="node-metrics-footer">
            <span className="node-count">
              <strong>{attempted}</strong>/{totalQuestions} preguntas
            </span>
            {score > 0 && <span className="node-score-pill">{score}% acierto</span>}
            <span className="node-completion-pct">{completion}%</span>
          </div>
          <span className="node-open-hint" aria-hidden="true">Abrir bloque →</span>
        </div>
      </div>

      <Handle type="source" position={Position.Right} id="right" className="map-node-handle" />
      <Handle type="source" position={Position.Bottom} id="bottom" className="map-node-handle" />
    </div>
  )
}

// -------------------------------------------------------------
// Custom Node 2: Phase Header Custom Node (Column Anchor)
// -------------------------------------------------------------
type PhaseHeaderData = {
  phaseId: string
  order: number
  title: string
  subtitle: string
  color: string
  tint: string
  line: string
  attempted: number
  totalQuestions: number
  completionPct: number
  isActiveFilter: boolean
  onToggleFilter: (phaseId: string) => void
}

function PhaseHeaderCustomNode({ data }: NodeProps<Node<PhaseHeaderData>>) {
  const {
    phaseId,
    order,
    title,
    subtitle,
    color,
    tint,
    line,
    attempted,
    totalQuestions,
    completionPct,
    isActiveFilter,
    onToggleFilter,
  } = data

  return (
    <div
      className={`map-phase-header-node ${isActiveFilter ? 'is-active-filter' : ''}`}
      onClick={(e) => {
        e.stopPropagation()
        onToggleFilter(phaseId)
      }}
      role="button"
      tabIndex={0}
      title="Haz clic para filtrar o mostrar esta fase"
    >
      <div className="phase-header-node-bar" style={{ background: color }} />
      <div className="phase-header-node-content">
        <div className="phase-header-node-badge-row">
          <span
            className="phase-header-node-pill"
            style={{ color, borderColor: line, background: tint }}
          >
            FASE {order}
          </span>
          <span className="phase-header-node-stats">
            {attempted}/{totalQuestions} ({completionPct}%)
          </span>
        </div>
        <h4 className="phase-header-node-title" style={{ color: color }}>
          {title}
        </h4>
        <p className="phase-header-node-sub">{subtitle}</p>
      </div>
    </div>
  )
}

const nodeTypes = {
  moduleNode: ModuleCustomNode,
  phaseHeader: PhaseHeaderCustomNode,
}

export interface MapViewProps {
  progress: ProgressState
  onOpenModule: (id: string) => void
  onQuickQuiz?: (id: string) => void
  onFullQuiz?: (id: string) => void
  onPractice?: (id: string) => void
  /** Tema ya resuelto (con «Sistema», según prefers-color-scheme). */
  colorMode?: 'light' | 'dark'
}

export function MapView({ progress, colorMode = 'light', onOpenModule, onQuickQuiz, onFullQuiz, onPractice }: MapViewProps) {
  const [viewMode, setViewMode] = useState<'graph' | 'roadmap'>('graph')
  const [selectedModuleId, setSelectedModuleId] = useState<string>('platform')
  const [activePhaseFilter, setActivePhaseFilter] = useState<string>('all')
  const [isInspectorOpen, setIsInspectorOpen] = useState<boolean>(true)

  // Only take domain modules that form the 4-phase certification graph (excludes welcome/instructions orientation)
  const studyModules = useMemo(() => {
    return modulesWithQuestions.filter((m) => !['welcome', 'instructions'].includes(m.id))
  }, [])

  const totalAttempted = useMemo(() => {
    return allQuestions.filter((q) => Boolean(latestAttempt(progress, q.id))).length
  }, [progress])

  const globalCompletion = Math.round((totalAttempted / allQuestions.length) * 100)

  const selectedModule = useMemo(() => {
    return studyModules.find((m) => m.id === selectedModuleId) ?? studyModules[0]
  }, [selectedModuleId, studyModules])

  const selectedModuleCompletion = moduleCompletion(progress, selectedModule.questionIds)
  const selectedModuleScore = moduleScore(progress, selectedModule.questionIds)
  const selectedModuleAttempted = selectedModule.questionIds.filter((id) => Boolean(latestAttempt(progress, id))).length
  const selectedModuleStudyOrder = studyModuleOrder[selectedModule.id] ?? selectedModule.order

  const handleSelectModule = useCallback((id: string) => {
    setSelectedModuleId(id)
  }, [])

  const handleTogglePhaseFilter = useCallback((phaseId: string) => {
    setActivePhaseFilter((prev) => (prev === phaseId ? 'all' : phaseId))
  }, [])

  // -------------------------------------------------------------
  // Mathematically Verified Grid (Zero Overlap):
  // Headers: y = 20, height = 84px (ends at y: 104)
  // Gap: 41px
  // Row 1:   y = 145, height = 160px (ends at y: 305)
  // Gap: 70px
  // Row 2:   y = 375, height = 160px (ends at y: 535)
  // Gap: 70px
  // Row 3:   y = 605, height = 160px (ends at y: 765)
  // -------------------------------------------------------------
  const nodes = useMemo<Node[]>(() => {
    const coords: Record<string, { x: number; y: number; phaseId: string }> = {
      // Columna 1: Ingesta & Agentes (x: 30)
      platform: { x: 30, y: 145, phaseId: 'foundation' },
      observability: { x: 30, y: 375, phaseId: 'foundation' },
      ingestion: { x: 30, y: 605, phaseId: 'foundation' },

      // Columna 2: Grail Lakehouse & DQL (x: 400)
      'data-analysis': { x: 400, y: 145, phaseId: 'storage-dql' },
      dql: { x: 400, y: 375, phaseId: 'storage-dql' },

      // Columna 3: Visualización & DEM (x: 770)
      notebooks: { x: 770, y: 145, phaseId: 'analytics-dem' },
      'business-dem': { x: 770, y: 375, phaseId: 'analytics-dem' },

      // Columna 4: Seguridad, IA & Automatización (x: 1140)
      security: { x: 1140, y: 145, phaseId: 'security-action' },
      automation: { x: 1140, y: 375, phaseId: 'security-action' },
      other: { x: 1140, y: 605, phaseId: 'security-action' },
    }

    const headerCoords: Record<string, { x: number; y: number }> = {
      foundation: { x: 30, y: 20 },
      'storage-dql': { x: 400, y: 20 },
      'analytics-dem': { x: 770, y: 20 },
      'security-action': { x: 1140, y: 20 },
    }

    // 1. Column Header Nodes (Fixed height 84px, ends at 104px)
    const headerNodes: Node<PhaseHeaderData>[] = studyPhases.map((phase) => {
      const phaseModules = studyModules.filter((m) => phase.moduleIds.includes(m.id))
      const phaseQuestionIds = phaseModules.flatMap((m) => m.questionIds)
      const phaseAttempted = phaseQuestionIds.filter((id) => Boolean(latestAttempt(progress, id))).length
      const completionPct = phaseQuestionIds.length
        ? Math.round((phaseAttempted / phaseQuestionIds.length) * 100)
        : 0
      const pos = headerCoords[phase.id] ?? { x: 40, y: 20 }
      const isDimmed = activePhaseFilter !== 'all' && activePhaseFilter !== phase.id

      return {
        id: `header-${phase.id}`,
        type: 'phaseHeader',
        position: { x: pos.x, y: pos.y },
        data: {
          phaseId: phase.id,
          order: phase.order,
          title: phase.shortName,
          subtitle: phase.name.replace(/^Fase \d+:\s*/, ''),
          color: phase.color,
          tint: phase.tint,
          line: phase.line,
          attempted: phaseAttempted,
          totalQuestions: phaseQuestionIds.length,
          completionPct,
          isActiveFilter: activePhaseFilter === phase.id,
          onToggleFilter: handleTogglePhaseFilter,
        },
        className: isDimmed ? 'map-node-dimmed' : '',
        selectable: false,
        draggable: false,
      }
    })

    // 2. Study Module Nodes (Starts at y: 145, 41px gap below headers)
    const moduleNodes: Node<ModuleNodeData>[] = studyModules.map((module) => {
      const completion = moduleCompletion(progress, module.questionIds)
      const score = moduleScore(progress, module.questionIds)
      const attempted = module.questionIds.filter((id) => Boolean(latestAttempt(progress, id))).length
      const pos = coords[module.id] ?? { x: 40, y: 145, phaseId: 'foundation' }
      const phase = studyPhases.find((p) => p.id === pos.phaseId) ?? studyPhases[0]
      const studyOrder = studyModuleOrder[module.id] ?? module.order
      const isDimmed = activePhaseFilter !== 'all' && activePhaseFilter !== phase.id

      return {
        id: module.id,
        type: 'moduleNode',
        position: { x: pos.x, y: pos.y },
        data: {
          module,
          studyOrder,
          completion,
          score,
          attempted,
          totalQuestions: module.questionIds.length,
          phaseId: phase.id,
          phaseName: phase.shortName,
          phaseColor: phase.color,
          isSelected: selectedModuleId === module.id,
          onSelect: handleSelectModule,
          onOpen: onOpenModule,
        },
        className: isDimmed ? 'map-node-dimmed' : '',
      }
    })

    return [...headerNodes, ...moduleNodes]
  }, [studyModules, progress, selectedModuleId, activePhaseFilter, handleSelectModule, handleTogglePhaseFilter, onOpenModule])

  // -------------------------------------------------------------
  // Clean Planar Orthogonal Edges (Zero Crossings)
  // -------------------------------------------------------------
  const edges = useMemo<Edge[]>(() => {
    const isDimmed = (srcPhaseId: string, tgtPhaseId: string) => {
      if (activePhaseFilter === 'all') return false
      return srcPhaseId !== activePhaseFilter && tgtPhaseId !== activePhaseFilter
    }

    const edgeDefs = [
      // --- FASE 1 INTERNA (Columna 1: Vertical descendente) ---
      {
        id: 'e-plat-obs',
        source: 'platform',
        target: 'observability',
        srcPhase: 'foundation',
        tgtPhase: 'foundation',
        sourceHandle: 'bottom',
        targetHandle: 'top',
        type: 'smoothstep',
        animated: true,
        label: 'OneAgent Core',
        style: { stroke: 'var(--map-edge-foundation)', strokeWidth: 2 },
      },
      {
        id: 'e-obs-ing',
        source: 'observability',
        target: 'ingestion',
        srcPhase: 'foundation',
        tgtPhase: 'foundation',
        sourceHandle: 'bottom',
        targetHandle: 'top',
        type: 'smoothstep',
        animated: true,
        label: 'OpenPipeline',
        style: { stroke: 'var(--map-edge-foundation)', strokeWidth: 2 },
      },

      // --- FASE 1 -> FASE 2 (Ingesta a Almacenamiento & Analítica Grail) ---
      {
        id: 'e-obs-data',
        source: 'observability',
        target: 'data-analysis',
        srcPhase: 'foundation',
        tgtPhase: 'storage-dql',
        sourceHandle: 'right',
        targetHandle: 'left',
        type: 'smoothstep',
        animated: true,
        label: 'Métricas & Logs',
        style: { stroke: 'var(--map-edge-grail)', strokeWidth: 2 },
      },
      {
        id: 'e-ing-dql',
        source: 'ingestion',
        target: 'dql',
        srcPhase: 'foundation',
        tgtPhase: 'storage-dql',
        sourceHandle: 'right',
        targetHandle: 'left',
        type: 'smoothstep',
        animated: true,
        label: 'Grail Lakehouse',
        style: { stroke: 'var(--map-edge-grail)', strokeWidth: 2 },
      },

      // --- FASE 2 INTERNA (Columna 2: Vertical descendente) ---
      {
        id: 'e-data-dql',
        source: 'data-analysis',
        target: 'dql',
        srcPhase: 'storage-dql',
        tgtPhase: 'storage-dql',
        sourceHandle: 'bottom',
        targetHandle: 'top',
        type: 'smoothstep',
        label: 'DQL Engine',
        style: { stroke: 'var(--map-edge-grail)', strokeWidth: 1.5 },
      },

      // --- FASE 2 -> FASE 3 (Grail a Visualización & DEM: Líneas Horizontales puras) ---
      {
        id: 'e-data-notebooks',
        source: 'data-analysis',
        target: 'notebooks',
        srcPhase: 'storage-dql',
        tgtPhase: 'analytics-dem',
        sourceHandle: 'right',
        targetHandle: 'left',
        type: 'smoothstep',
        animated: true,
        label: 'Notebooks & Paneles',
        style: { stroke: 'var(--map-edge-dem)', strokeWidth: 2 },
      },
      {
        id: 'e-dql-biz',
        source: 'dql',
        target: 'business-dem',
        srcPhase: 'storage-dql',
        tgtPhase: 'analytics-dem',
        sourceHandle: 'right',
        targetHandle: 'left',
        type: 'smoothstep',
        animated: true,
        label: 'BizEvents & RUM',
        style: { stroke: 'var(--map-edge-dem)', strokeWidth: 2 },
      },

      // --- FASE 3 INTERNA (Columna 3: Vertical descendente) ---
      {
        id: 'e-notebooks-biz',
        source: 'notebooks',
        target: 'business-dem',
        srcPhase: 'analytics-dem',
        tgtPhase: 'analytics-dem',
        sourceHandle: 'bottom',
        targetHandle: 'top',
        type: 'smoothstep',
        label: 'DEM Dashboards',
        style: { stroke: 'var(--map-edge-dem)', strokeWidth: 1.5 },
      },

      // --- FASE 3 -> FASE 4 (Visualización a Seguridad & Automatización: Líneas Horizontales puras) ---
      {
        id: 'e-notebooks-sec',
        source: 'notebooks',
        target: 'security',
        srcPhase: 'analytics-dem',
        tgtPhase: 'security-action',
        sourceHandle: 'right',
        targetHandle: 'left',
        type: 'smoothstep',
        animated: true,
        label: 'AppSec Dashboards',
        style: { stroke: 'var(--map-edge-security)', strokeWidth: 2 },
      },
      {
        id: 'e-biz-auto',
        source: 'business-dem',
        target: 'automation',
        srcPhase: 'analytics-dem',
        tgtPhase: 'security-action',
        sourceHandle: 'right',
        targetHandle: 'left',
        type: 'smoothstep',
        animated: true,
        label: 'SLO & Event Triggers',
        style: { stroke: 'var(--map-edge-security)', strokeWidth: 2 },
      },

      // --- FASE 4 INTERNA (Columna 4: Vertical descendente) ---
      {
        id: 'e-sec-auto',
        source: 'security',
        target: 'automation',
        srcPhase: 'security-action',
        tgtPhase: 'security-action',
        sourceHandle: 'bottom',
        targetHandle: 'top',
        type: 'smoothstep',
        label: 'Remediación',
        style: { stroke: 'var(--map-edge-remediation)', strokeWidth: 1.5, strokeDasharray: '4 4' },
      },
      {
        id: 'e-auto-other',
        source: 'automation',
        target: 'other',
        srcPhase: 'security-action',
        tgtPhase: 'security-action',
        sourceHandle: 'bottom',
        targetHandle: 'top',
        type: 'smoothstep',
        animated: true,
        label: 'Davis AI & Smartscape',
        style: { stroke: 'var(--map-edge-security)', strokeWidth: 2 },
      },

      // --- BUS INFERIOR (Fila 3: Ingesta a Smartscape & Hub) ---
      {
        id: 'e-ing-other',
        source: 'ingestion',
        target: 'other',
        srcPhase: 'foundation',
        tgtPhase: 'security-action',
        sourceHandle: 'right',
        targetHandle: 'left',
        type: 'smoothstep',
        label: 'Hub & Extensiones',
        style: { stroke: 'var(--map-edge-hub)', strokeWidth: 1.5, strokeDasharray: '5 5' },
      },
    ]

    return edgeDefs.map((def) => {
      const dimmed = isDimmed(def.srcPhase, def.tgtPhase)
      return {
        id: def.id,
        source: def.source,
        target: def.target,
        sourceHandle: def.sourceHandle,
        targetHandle: def.targetHandle,
        type: def.type,
        animated: dimmed ? false : def.animated,
        label: def.label,
        style: {
          ...def.style,
          opacity: dimmed ? 0.15 : 1,
        },
        labelStyle: {
          fontSize: 10,
          fontWeight: 700,
          fill: 'var(--react-graphic)',
          opacity: dimmed ? 0.2 : 1,
        },
        labelBgStyle: {
          fill: 'var(--paper)',
          fillOpacity: 0.96,
          stroke: 'var(--react-graphic-2)',
          strokeWidth: 1,
          rx: 4,
          ry: 4,
        },
      }
    })
  }, [activePhaseFilter])

  return (
    <div className="page-stack map-page-v2">
      {/* Top Banner & Control Bar */}
      <section className="map-v2-header">
        <div className="map-v2-heading-block">
          <p className="eyebrow">RUTA DE CERTIFICACIÓN · ARQUITECTURA TÉCNICA</p>
          <h1>Mapa de estudio interactivo</h1>
          <p className="map-v2-lede">
            Explora las dependencias reales entre la plataforma Dynatrace on Grail, agentes, pipelines, análisis DQL y
            automatización. Selecciona cualquier módulo para inspeccionar su banco o iniciar tests directamente.
          </p>
        </div>

        {/* Global Progress Card */}
        <div className="map-v2-summary-card">
          <div className="summary-card-ring">
            <svg viewBox="0 0 36 36" className="circular-chart">
              <path
                className="circle-bg"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="circle"
                strokeDasharray={`${globalCompletion}, 100`}
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="ring-content">
              <strong>{globalCompletion}%</strong>
              <small>global</small>
            </div>
          </div>
          <div className="summary-card-data">
            <span className="summary-card-label">PROGRESO CERTIFICACIÓN</span>
            <strong>
              {totalAttempted} / {allQuestions.length}
            </strong>
            <span>preguntas completadas en el banco</span>
          </div>
        </div>
      </section>

      {/* Control Strip & View Mode Switcher */}
      <div className="map-control-bar">
        <div className="view-mode-segmented">
          <button
            className={`segmented-button ${viewMode === 'graph' ? 'active' : ''}`}
            onClick={() => setViewMode('graph')}
          >
            <span className="seg-icon">⬡</span>
            <span>Grafo Arquitectónico (Canvas)</span>
          </button>
          <button
            className={`segmented-button ${viewMode === 'roadmap' ? 'active' : ''}`}
            onClick={() => setViewMode('roadmap')}
          >
            <span className="seg-icon">▦</span>
            <span>Ruta Curricular (Fases)</span>
          </button>
        </div>

        {/* Phase Filter Chips */}
        <div className="phase-filters">
          <button
            className={`phase-chip ${activePhaseFilter === 'all' ? 'active' : ''}`}
            onClick={() => setActivePhaseFilter('all')}
          >
            Todos los módulos ({studyModules.length})
          </button>
          {studyPhases.map((phase) => (
            <button
              key={phase.id}
              className={`phase-chip ${activePhaseFilter === phase.id ? 'active' : ''}`}
              onClick={() => setActivePhaseFilter(phase.id)}
            >
              <span className="phase-color-dot" style={{ background: phase.color }} />
              {phase.shortName}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      {viewMode === 'graph' ? (
        <div className={`map-workspace-grid ${!isInspectorOpen ? 'inspector-collapsed' : ''}`}>
          {/* ReactFlow Interactive Canvas */}
          <div className="map-canvas-container">
            <div className="canvas-header-bar">
              <div className="canvas-legend">
                <span>
                  <i className="legend-indicator mastered" /> Dominado (≥80%)
                </span>
                <span>
                  <i className="legend-indicator in-progress" /> En progreso
                </span>
                <span>
                  <i className="legend-indicator pending" /> Pendiente
                </span>
                <span className="legend-divider">|</span>
                <span>
                  <i className="legend-line solid-anim" /> Flujo core
                </span>
                <span>
                  <i className="legend-line dashed" /> Relación analítica
                </span>
              </div>
              <div className="canvas-header-actions">
                <small className="canvas-tip">Arrastra para explorar · Rueda para zoom</small>
                <button
                  className="canvas-toggle-btn"
                  onClick={() => setIsInspectorOpen((prev) => !prev)}
                  title={isInspectorOpen ? 'Ocultar panel lateral para maximizar el lienzo' : 'Mostrar panel de detalle del módulo'}
                >
                  {isInspectorOpen ? '⇤ Ocultar panel' : '⇥ Mostrar inspector'}
                </button>
              </div>
            </div>

            {/* En móvil el lienzo mantiene un ancho mínimo legible y se desplaza en horizontal dentro de este marco. */}
            <p className="map-scroll-hint" id="map-scroll-hint">Desliza en horizontal para ver todo el mapa →</p>
            <div className="map-canvas-frame">
            <div className="map-canvas-scroll" tabIndex={0} role="region" aria-label="Lienzo del mapa de estudio" aria-describedby="map-scroll-hint">
            <div className="flow-canvas-wrapper">
              <ReactFlow
                colorMode={colorMode}
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
                fitView
                fitViewOptions={{ padding: 0.05 }}
                onNodeClick={(_, node) => {
                  if (node.type === 'moduleNode') {
                    handleSelectModule(node.id)
                    setIsInspectorOpen(true)
                  } else if (node.type === 'phaseHeader') {
                    const phaseId = (node.data as unknown as PhaseHeaderData)?.phaseId
                    if (phaseId) handleTogglePhaseFilter(phaseId)
                  }
                }}
                proOptions={{ hideAttribution: true }}
                minZoom={0.4}
                maxZoom={1.5}
              >
                <CanvasViewUpdater isInspectorOpen={isInspectorOpen} />
                <Background color="var(--map-grid)" gap={28} size={1.2} />
                <Controls className="custom-controls" showInteractive={false} />
              </ReactFlow>
            </div>
            </div>
            </div>
          </div>

          {/* Quick Inspector Side Drawer */}
          {isInspectorOpen && (
            <aside className="module-inspector-panel">
              <div className="inspector-top">
                <div className="inspector-pill-row">
                  <span className="inspector-order">{`M${String(selectedModuleStudyOrder).padStart(2, '0')}`}</span>
                  <span className="inspector-eyebrow">{selectedModule.eyebrow}</span>
                  <span
                    className={`inspector-status ${
                      selectedModuleCompletion >= 80 && selectedModuleScore >= 80
                        ? 'mastered'
                        : selectedModuleCompletion > 0
                        ? 'in-progress'
                        : 'pending'
                    }`}
                  >
                    {selectedModuleCompletion >= 80 && selectedModuleScore >= 80
                      ? 'Dominado'
                      : selectedModuleCompletion > 0
                      ? 'En progreso'
                      : 'Pendiente'}
                  </span>
                  <button
                    className="inspector-close-btn"
                    onClick={() => setIsInspectorOpen(false)}
                    title="Ocultar inspector para ampliar lienzo"
                    aria-label="Cerrar inspector"
                  >
                    ✕
                  </button>
                </div>

                <h2 className="inspector-title">{selectedModule.title}</h2>
                <p className="inspector-summary">{selectedModule.summary}</p>
              </div>

            {/* Metrics Snapshot */}
            <div className="inspector-metrics-grid">
              <div className="inspector-metric-box">
                <span className="metric-label">Preguntas respondidas</span>
                <div className="metric-value-row">
                  <strong>{selectedModuleAttempted}</strong>
                  <span className="metric-total">/ {selectedModule.questionIds.length}</span>
                </div>
              </div>
              <div className="inspector-metric-box">
                <span className="metric-label">Tasa de acierto</span>
                <div className="metric-value-row">
                  <strong className={selectedModuleScore >= 80 ? 'text-teal' : ''}>
                    {selectedModuleScore > 0 ? `${selectedModuleScore}%` : '-'}
                  </strong>
                </div>
              </div>
            </div>

            {/* Certification Focus */}
            <div className="inspector-section">
              <h3 className="inspector-section-heading">Foco de examen</h3>
              <p className="inspector-focus-text">{selectedModule.focus}</p>
            </div>

            {/* Key Concepts */}
            <div className="inspector-section">
              <h3 className="inspector-section-heading">Conceptos y términos clave</h3>
              <div className="inspector-tags-cloud">
                {selectedModule.keyTerms.map((term, i) => (
                  <span key={i} className="inspector-term-pill">
                    {term}
                  </span>
                ))}
              </div>
            </div>

            {/* Core Objectives */}
            <div className="inspector-section">
              <h3 className="inspector-section-heading">Objetivos evaluados</h3>
              <ul className="inspector-objectives-list">
                {selectedModule.objectives.map((obj, i) => (
                  <li key={i}>{obj}</li>
                ))}
              </ul>
            </div>

            {/* Direct Action Triggers */}
            <div className="inspector-actions-block">
              <button className="button-primary inspector-open-lesson" onClick={() => onOpenModule(selectedModule.id)}>
                📖 Ir al bloque {String(selectedModule.order).padStart(2, '0')} · {selectedModule.title} <span>→</span>
              </button>
              <div className="inspector-actions-grid">
                {onQuickQuiz && (
                  <button className="button-accent inspector-btn" onClick={() => onQuickQuiz(selectedModule.id)}>
                    ⚡ Quiz rápido ({Math.min(8, selectedModule.questionIds.length)})
                  </button>
                )}
                {onFullQuiz && (
                  <button className="button-secondary inspector-btn" onClick={() => onFullQuiz(selectedModule.id)}>
                    📚 Banco completo ({selectedModule.questionIds.length})
                  </button>
                )}
              </div>
              {onPractice && (
                <button className="button-quiet inspector-btn-sub" onClick={() => onPractice(selectedModule.id)}>
                  ⌁ Ver prácticas guiadas de este módulo
                </button>
              )}
            </div>
          </aside>
          )}
        </div>
      ) : (
        /* Roadmap / Phase Cards View */
        <div className="map-roadmap-container">
          {studyPhases
            .filter((p) => activePhaseFilter === 'all' || activePhaseFilter === p.id)
            .map((phase) => {
              const phaseModules = studyModules.filter((m) => phase.moduleIds.includes(m.id))
              const phaseQuestionIds = phaseModules.flatMap((m) => m.questionIds)
              const phaseAttempted = phaseQuestionIds.filter((id) => Boolean(latestAttempt(progress, id))).length
              const phaseCompletionPct = phaseQuestionIds.length
                ? Math.round((phaseAttempted / phaseQuestionIds.length) * 100)
                : 0

              return (
                <section key={phase.id} className="roadmap-phase-card">
                  <header className="phase-card-header" style={{ borderLeftColor: phase.color }}>
                    <div className="phase-header-left">
                      <span className="phase-tag" style={{ background: phase.color }}>
                        FASE {phase.order}
                      </span>
                      <h2>{phase.name}</h2>
                      <p>{phase.description}</p>
                    </div>
                    <div className="phase-header-progress">
                      <div className="phase-meter-text">
                        <span>
                          {phaseAttempted} / {phaseQuestionIds.length} preguntas
                        </span>
                        <strong>{phaseCompletionPct}%</strong>
                      </div>
                      <div className="phase-progress-bar">
                        <div
                          className="phase-progress-fill"
                          style={{ width: `${phaseCompletionPct}%`, background: phase.color }}
                        />
                      </div>
                    </div>
                  </header>

                  <div className="phase-modules-grid">
                    {phaseModules.map((module) => {
                      const completion = moduleCompletion(progress, module.questionIds)
                      const score = moduleScore(progress, module.questionIds)
                      const attempted = module.questionIds.filter((id) => Boolean(latestAttempt(progress, id))).length
                      const isMastered = completion >= 80 && score >= 80
                      const studyOrder = studyModuleOrder[module.id] ?? module.order

                      return (
                        <article
                          key={module.id}
                          className={`roadmap-module-card is-clickable ${isMastered ? 'mastered' : ''}`}
                          onClick={() => onOpenModule(module.id)}
                          onKeyDown={(e) => e.key === 'Enter' && onOpenModule(module.id)}
                          role="link"
                          tabIndex={0}
                          title={`Abrir el bloque ${module.title}`}
                        >
                          <div className="module-card-topbar">
                            <span className="module-order-badge">{`M${String(studyOrder).padStart(2, '0')}`}</span>
                            <span className="module-eyebrow-text">{module.eyebrow}</span>
                            <span
                              className={`status-badge-mini ${
                                isMastered ? 'mastered' : completion > 0 ? 'progress' : 'pending'
                              }`}
                            >
                              {isMastered ? 'Dominado' : completion > 0 ? `${completion}%` : 'Pendiente'}
                            </span>
                          </div>

                          <h3>{module.title}</h3>
                          <p className="module-card-summary">{module.summary}</p>

                          <div className="module-card-objectives-preview">
                            <small className="eyebrow">OBJETIVOS PRINCIPALES</small>
                            <ul>
                              {module.objectives.slice(0, 2).map((obj, i) => (
                                <li key={i}>{obj}</li>
                              ))}
                            </ul>
                          </div>

                          <div className="module-card-progress-footer">
                            <div className="thin-progress">
                              <span style={{ width: `${completion}%` }} />
                            </div>
                            <div className="module-card-stats-line">
                              <span>
                                {attempted}/{module.questionIds.length} resueltas {score > 0 ? `· ${score}% acierto` : ''}
                              </span>
                              <span className="roadmap-card-actions">
                                <span className="roadmap-open-hint">Abrir bloque →</span>
                                <button
                                  className="button-accent btn-sm"
                                  onClick={(e) => { e.stopPropagation(); if (onQuickQuiz) onQuickQuiz(module.id); else onOpenModule(module.id) }}
                                >
                                  ⚡ Practicar
                                </button>
                              </span>
                            </div>
                          </div>
                        </article>
                      )
                    })}
                  </div>
                </section>
              )
            })}
        </div>
      )}
    </div>
  )
}
