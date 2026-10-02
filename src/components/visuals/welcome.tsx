import { Arrow, Box, C, Chip, Mark, Particle, Person, Svg, T, cx, dim, show, toneColors } from './kit'
import type { VisualRegistry } from './types'

/* ——— 1. Modelo mental: ciclo de evidencia ——— */
const cycleNodes = [
  { label: 'Señal', sub: 'qué ha ocurrido', x: 380, y: 45 },
  { label: 'Entidad', sub: 'a qué pertenece', x: 608, y: 118 },
  { label: 'Relación', sub: 'qué depende de qué', x: 521, y: 238 },
  { label: 'Impacto', sub: 'a quién afecta', x: 239, y: 238 },
  { label: 'Acción', sub: 'qué haces después', x: 152, y: 118 },
]

function PlatformModel({ step }: { step: number }) {
  const ellipse = 'M380,45 A240,105 0 0 1 380,255 A240,105 0 0 1 380,45'
  return (
    <Svg h={290} label="Ciclo de evidencia: señal, entidad, relación, impacto y acción">
      <ellipse cx={380} cy={150} rx={240} ry={105} fill="none" stroke={C.line} strokeWidth={2} strokeDasharray="4 7" />
      <Particle path={ellipse} dur={10} tone="teal" r={6} />
      <circle cx={380} cy={150} r={62} fill={C.paperSoft} stroke={C.line} />
      <T x={380} y={143} size={11} tone="muted" weight={700}>CICLO DE</T>
      <T x={380} y={161} size={16} weight={800} tone="navy">evidencia</T>
      {cycleNodes.map((node, index) => {
        const state = index === step ? 'active' : index < step ? 'done' : 'todo'
        return (
          <g key={node.label} className={dim(state !== 'todo')}>
            <Box x={node.x - 78} y={node.y - 25} w={156} h={50} label={node.label} sub={node.sub} tone={state === 'active' ? 'teal' : 'navy'} solid={state === 'active'} rx={25} />
            <circle cx={node.x - 60} cy={node.y - 20} r={11} fill={state === 'todo' ? '#fff' : C.teal} stroke={C.teal} />
            <T x={node.x - 60} y={node.y - 16} size={11} weight={800} tone={state === 'todo' ? 'teal' : 'white'}>{index + 1}</T>
          </g>
        )
      })}
    </Svg>
  )
}

/* ——— 2. Bucle de investigación: reducir incertidumbre en orden ——— */
const loopStages = ['Pregunta', 'Fuente', 'Periodo', 'Filtro', 'Contexto', 'Evidencia', 'Decisión']

function InvestigationLoop() {
  return (
    <Svg h={250} label="Embudo de investigación: de la pregunta a la decisión reduciendo incertidumbre">
      <defs>
        <linearGradient id="sv-uncertainty" x1="0" x2="1">
          <stop offset="0" stopColor={C.coral} stopOpacity={0.35} />
          <stop offset="1" stopColor={C.teal} stopOpacity={0.55} />
        </linearGradient>
      </defs>
      <path d="M20,120 L740,170 L740,184 L20,234 Z" fill="url(#sv-uncertainty)" />
      <T x={26} y={252 - 10} size={10.5} tone="coral" anchor="start" weight={700}>Mucha incertidumbre</T>
      <T x={736} y={206} size={10.5} tone="teal" anchor="end" weight={700}>Decisión explicable</T>
      {loopStages.map((stage, index) => {
        const x = 18 + index * 104
        return (
          <g key={stage}>
            <Box x={x} y={36} w={92} h={44} label={stage} tone={index === loopStages.length - 1 ? 'teal' : 'navy'} solid={index === loopStages.length - 1} size={12} />
            <T x={x + 46} y={26} size={10} tone="muted" weight={800}>{index + 1}</T>
            {index < loopStages.length - 1 && <Arrow from={[x + 93, 58]} to={[x + 103, 58]} tone="navy" />}
            <line x1={x + 46} x2={x + 46} y1={82} y2={140 + index * 5} stroke={C.line} strokeDasharray="3 4" />
          </g>
        )
      })}
      <Particle path="M64,142 L740,177" dur={7} tone="navy" r={7} />
      <Chip x={600} y={108} text="Reproducible: consulta + filtros + fecha" tone="teal" />
      <Chip x={190} y={108} text="AI = hipótesis a contrastar" tone="amber" />
    </Svg>
  )
}

/* ——— 3. Davis event, Problem, root cause e impact ——— */
const topo = [
  { id: 'app', label: 'Application', x: 96, y: 112 },
  { id: 'svcA', label: 'Service A', x: 246, y: 112 },
  { id: 'svcB', label: 'Service B', x: 396, y: 112 },
  { id: 'db', label: 'Database', x: 546, y: 112 },
  { id: 'host', label: 'Host', x: 546, y: 222 },
]

function ProblemDavis({ step }: { step: number }) {
  return (
    <Svg h={300} label="Varios Davis events se correlacionan en un Problem con una causa raíz y un impacto">
      {/* Problem envolvente */}
      <rect x={80} y={78} width={600} height={206} rx={18} fill={toneColors.amber.fill} stroke={C.amber} strokeWidth={2} strokeDasharray="7 6" className={cx(show(step >= 1), 'sv-flow-slow')} />
      <Chip x={180} y={78} text="Problem: situación correlacionada" tone="amber" solid className={show(step >= 1)} w={220} />
      {/* Usuarios */}
      <g className={step >= 3 ? 'sv-in' : 'sv-dim'}>
        {[0, 1, 2].map((i) => <Person key={i} x={30} y={112 + i * 34 - 16} tone={step >= 3 ? 'coral' : 'navy'} scale={0.8} />)}
        <T x={30} y={200} size={10} tone="muted">usuarios</T>
      </g>
      <Arrow from={[46, 135]} to={[94, 135]} tone="neutral" />
      {/* Topología */}
      {topo.slice(0, 4).map((node, index) => index < 3 && <Arrow key={node.id} from={[node.x + 112, 135]} to={[topo[index + 1].x - 2, 135]} tone="neutral" />)}
      <Arrow from={[601, 160]} to={[601, 218]} tone="neutral" />
      <T x={612} y={194} size={10} tone="muted" anchor="start">runs on</T>
      {topo.map((node) => {
        const isRoot = node.id === 'host' && step >= 2
        const isImpact = node.id === 'app' && step >= 3
        return (
          <g key={node.id}>
            <Box x={node.x} y={node.y} w={112} h={46} label={node.label} tone={isRoot ? 'coral' : isImpact ? 'coral' : 'navy'} solid={isRoot} />
            {/* Davis event individual */}
            <g className={show(step >= 0)}>
              <circle cx={node.x + 108} cy={node.y + 2} r={9} fill={C.amber} className="sv-pulse" />
              <T x={node.x + 108} y={node.y + 6} size={11} weight={900} tone="white">!</T>
            </g>
          </g>
        )
      })}
      <T x={380} y={60} size={11} tone="amber" weight={700} className={show(step === 0)}>Cada marcador ámbar (!) es un Davis event: una anomalía o evento individual</T>
      {/* Root cause */}
      <g className={show(step >= 2)}>
        <circle cx={602} cy={245} r={42} fill="none" stroke={C.coral} strokeWidth={2} className="sv-ping" />
        <Chip x={700} y={245} text="Root cause" tone="coral" solid w={88} />
        <T x={700} y={272} size={10} tone="muted">empieza el drill-down</T>
      </g>
      {/* Impact */}
      <g className={show(step >= 3)}>
        <circle cx={60} cy={140} r={70} fill="none" stroke={C.coral} strokeWidth={1.5} className="sv-ping" />
        <Chip x={152} y={186} text="Impact: blast radius" tone="coral" w={140} />
      </g>
    </Svg>
  )
}

/* ——— 4. Dynatrace 101: arquitectura ——— */
function Dynatrace101() {
  const sources = ['Hosts', 'Kubernetes', 'Cloud', 'Apps / RUM', 'APIs / OTel']
  const apps = ['Notebooks', 'Dashboards', 'Problems', 'Workflows']
  return (
    <Svg h={360} label="Arquitectura: fuentes, OneAgent y OpenPipeline, Grail, Smartscape y Davis, y aplicaciones">
      {/* Fuentes */}
      {sources.map((source, index) => <Box key={source} x={20 + index * 124} y={300} w={112} h={38} label={source} tone="neutral" size={11.5} />)}
      <T x={20} y={290} size={10} tone="muted" anchor="start" weight={800}>ENTORNO OBSERVADO</T>
      {/* Ingestión */}
      <Box x={20} y={222} w={296} h={48} label="OneAgent" sub="contexto profundo sin tocar código" tone="teal" />
      <Box x={330} y={222} w={296} h={48} label="OpenPipeline" sub="procesa, transforma y enruta antes de persistir" tone="teal" />
      {/* Grail */}
      <rect x={20} y={134} width={606} height={62} rx={12} fill={C.navy} />
      <T x={323} y={160} size={16} weight={800} tone="white">Grail · data lakehouse</T>
      <T x={323} y={180} size={11} tone="white" opacity={0.8}>Metrics · Events · Logs · Traces · Business Events · Security · Topología</T>
      {/* IA y topología */}
      <Box x={20} y={62} w={296} h={48} label="Smartscape" sub="grafo vivo de dependencias" tone="violet" />
      <Box x={330} y={62} w={296} h={48} label="Dynatrace Intelligence" sub="anomalías y causa raíz sobre la topología" tone="violet" />
      {/* Apps */}
      {apps.map((app, index) => <Chip key={app} x={96 + index * 152} y={26} text={app} tone="navy" w={130} />)}
      {/* Flujos ascendentes */}
      {[80, 200, 330, 450, 570].map((x, index) => (
        <g key={x}>
          <Particle path={`M${x},300 L${x},270`} dur={1.6} begin={index * 0.3} tone="teal" r={3.5} />
          <Particle path={`M${x},222 L${x},196`} dur={1.6} begin={0.8 + index * 0.3} tone="teal" r={3.5} />
          <Particle path={`M${x},134 L${x},110`} dur={1.6} begin={1.2 + index * 0.3} tone="violet" r={3.5} />
        </g>
      ))}
      {/* DPS */}
      <path d="M648,26 L660,26 L660,338 L648,338" fill="none" stroke={C.amber} strokeWidth={2} />
      <Box x={672} y={140} w={80} h={84} tone="amber" rx={10} />
      <T x={712} y={172} size={13} weight={800} tone="amber">DPS</T>
      <T x={712} y={190} size={9.5} tone="muted">consumo</T>
      <T x={712} y={203} size={9.5} tone="muted">unificado</T>
      <T x={712} y={216} size={9.5} tone="muted">por capability</T>
    </Svg>
  )
}

/* ——— 5. Smartscape: tiers, relaciones y propagación del impacto ——— */
const tiers = ['Applications', 'Services', 'Processes', 'Hosts', 'Data centers']
const rowY = (index: number) => 24 + index * 64

function SmartscapeTiers({ step }: { step: number }) {
  const hostDown = step >= 2
  const pgiDown = step >= 3
  const upDown = step >= 4
  const tone = (failed: boolean) => (failed ? 'coral' : 'navy') as 'coral' | 'navy'
  return (
    <Svg h={336} label="Smartscape Classic: cinco tiers, relaciones horizontales y verticales, y propagación del fallo de un host">
      {tiers.map((tier, index) => (
        <g key={tier}>
          <rect x={14} y={rowY(index) - 6} width={600} height={52} rx={10} fill={index % 2 ? C.paperSoft : '#fff'} stroke={C.line} />
          <T x={26} y={rowY(index) + 25} size={11.5} weight={800} tone="muted" anchor="start">{tier}</T>
        </g>
      ))}
      {/* Vertical: dependencias full-stack */}
      <Arrow from={[372, 64]} to={[290, 86]} tone={upDown ? 'coral' : 'neutral'} />
      <Arrow from={[275, 128]} to={[275, 150]} tone="neutral" />
      <Arrow from={[535, 128]} to={[535, 150]} tone={pgiDown ? 'coral' : 'neutral'} />
      <Arrow from={[275, 192]} to={[275, 214]} tone="neutral" />
      <Arrow from={[535, 192]} to={[535, 214]} tone={hostDown ? 'coral' : 'neutral'} />
      <Arrow from={[275, 256]} to={[330, 278]} tone="neutral" />
      <Arrow from={[535, 256]} to={[420, 278]} tone="neutral" />
      <T x={287} y={207} size={10} tone="muted" anchor="start">runs on</T>
      {/* Horizontal: llamadas dentro del tier */}
      <g className={dim(step >= 1)}>
        <Arrow from={[352, 108]} to={[456, 108]} tone={step === 1 ? 'violet' : upDown ? 'coral' : 'neutral'} flow={step === 1} width={2.4} />
        <T x={404} y={100} size={10.5} weight={700} tone={step === 1 ? 'violet' : 'muted'}>calls</T>
      </g>
      {/* Entidades */}
      <Box x={290} y={rowY(0)} w={164} h={40} label="Web shop" tone={tone(upDown)} solid={upDown} size={12} />
      <Box x={200} y={rowY(1)} w={150} h={40} label="Checkout" tone={tone(upDown)} solid={upDown} size={12} />
      <Box x={460} y={rowY(1)} w={150} h={40} label="Payment" tone={tone(upDown)} solid={upDown} size={12} />
      <Box x={200} y={rowY(2)} w={150} h={40} label="Tomcat (PGI)" sub="en host-1" tone="navy" size={12} />
      <Box x={460} y={rowY(2)} w={150} h={40} label="Node.js (PGI)" sub="en host-2" tone={tone(pgiDown)} solid={pgiDown} size={12} />
      <Box x={200} y={rowY(3)} w={150} h={40} label="host-1" tone="navy" size={12} />
      <Box x={460} y={rowY(3)} w={150} h={40} label="host-2" tone={tone(hostDown)} solid={hostDown} size={12} />
      <Box x={290} y={rowY(4)} w={164} h={40} label="AWS eu-west-1a" sub="Availability Zone" tone="navy" size={12} />
      <g className={show(hostDown)}>
        <Mark x={606} y={rowY(3) + 4} ok={false} />
        <circle cx={535} cy={rowY(3) + 20} r={44} fill="none" stroke={C.coral} strokeWidth={1.5} className="sv-ping" />
      </g>
      {/* Panel lateral */}
      <Chip x={690} y={40} text="5 tiers verticales" tone="navy" w={124} className={show(step === 0)} />
      <Chip x={690} y={108} text="horizontal = calls" tone="violet" w={124} className={show(step === 1)} />
      <Chip x={690} y={236} text="fallo de hardware" tone="coral" solid w={124} className={show(step === 2)} />
      <Chip x={690} y={172} text="caen sus PGIs" tone="coral" w={124} className={show(step === 3)} />
      <Chip x={690} y={72} text="el impacto sube" tone="coral" w={124} className={show(step === 4)} />
    </Svg>
  )
}

/* ——— 6. Ciclo de vida de un Problem ——— */
function ProblemLifecycle({ step }: { step: number }) {
  const x90 = 380
  const closed = step >= 3
  const severity = step >= 1 ? 'Availability' : 'Slowdown'
  return (
    <Svg h={270} label="Ciclo de vida de un Problem: apertura, fusión de eventos, límite de 90 minutos y cierre sin reapertura">
      {/* Eje temporal */}
      <Arrow from={[30, 236]} to={[740, 236]} tone="neutral" />
      <T x={738} y={256} size={10} tone="muted" anchor="end">tiempo</T>
      <T x={60} y={256} size={10.5} weight={700} tone="muted">apertura</T>
      <line x1={x90} x2={x90} y1={50} y2={242} stroke={C.amber} strokeWidth={1.5} strokeDasharray="5 5" className={dim(step >= 2)} />
      <T x={x90} y={256} size={10.5} weight={700} tone="amber" className={dim(step >= 2)}>90 min</T>
      {/* Problem 1 */}
      <rect x={40} y={70} width={420} height={110} rx={14} fill={toneColors[closed ? 'neutral' : 'amber'].fill} stroke={closed ? C.line : C.amber} strokeWidth={2} />
      <Chip x={130} y={70} text={closed ? 'Problem 1 · CLOSED' : 'Problem 1 · ACTIVE'} tone={closed ? 'neutral' : 'amber'} solid={!closed} w={160} />
      <Chip x={318} y={70} text={`Severidad: ${severity}`} tone={step >= 1 ? 'coral' : 'amber'} w={170} />
      <Box x={60} y={100} w={120} h={40} label="Slowdown" sub="checkout" tone="amber" size={11.5} />
      <g className={show(step >= 1)}>
        <Box x={200} y={100} w={130} h={40} label="Availability" sub="host de checkout" tone="coral" size={11.5} />
        <T x={265} y={162} size={10} tone="muted">fusionado: la severidad sube</T>
      </g>
      {/* Tras 90 min: otro Problem */}
      <g className={show(step >= 2)}>
        <rect x={486} y={70} width={150} height={110} rx={14} fill={toneColors.amber.fill} stroke={C.amber} strokeWidth={2} strokeDasharray="6 5" />
        <Chip x={561} y={70} text="Problem 2" tone="amber" solid w={96} />
        <Box x={501} y={100} w={120} h={40} label="Nuevo evento" sub="tras 90 min" tone="amber" size={11.5} />
        <T x={561} y={162} size={10} tone="muted">no entra en Problem 1</T>
      </g>
      {/* Cierre */}
      <g className={show(closed)}>
        <T x={200} y={203} size={10.5} weight={700} tone="navy">Se cierra al cerrarse todos sus Davis events</T>
        <T x={200} y={219} size={10.5} weight={700} tone="navy">o manualmente, con un comentario</T>
        <Chip x={690} y={212} text="nunca se reabre" tone="coral" solid w={110} />
      </g>
    </Svg>
  )
}

export const welcomeVisuals: VisualRegistry = {
  'platform-model': {
    kind: 'animation',
    title: 'El ciclo de evidencia de Dynatrace',
    caption: 'No memorices productos sueltos: cada investigación recorre este ciclo. Una señal solo es útil cuando sabes a qué entidad pertenece, qué relaciones tiene, a quién impacta y qué acción justifica.',
    steps: ['Señal', 'Entidad', 'Relación', 'Impacto', 'Acción'],
    render: ({ step }) => <PlatformModel step={step} />,
  },
  'investigation-loop': {
    kind: 'animation',
    title: 'Cada paso reduce la incertidumbre',
    caption: 'El orden importa: fijar fuente, periodo y filtro antes de añadir contexto evita conclusiones prematuras. Una recomendación de AI entra como hipótesis y la decisión final debe poder reproducirse.',
    render: () => <InvestigationLoop />,
  },
  'deep-problem-davis': {
    kind: 'animation',
    title: 'De Davis events a Problem, root cause e impact',
    caption: 'Un Davis event es una anomalía individual; el Problem agrupa los eventos correlacionados; la root cause es el candidato causal donde empieza el drill-down; el impact mide el alcance (blast radius) sobre usuarios y servicios.',
    steps: ['Davis events individuales', 'Se correlacionan en un Problem', 'Root cause candidata', 'Impact sobre usuarios'],
    stepMs: 2800,
    render: ({ step }) => <ProblemDavis step={step} />,
  },
  'deep-dynatrace-101': {
    kind: 'animation',
    title: 'Arquitectura de la plataforma en capas',
    caption: 'Los datos suben desde el entorno: OneAgent y OpenPipeline los capturan y procesan, Grail los almacena en un único data lakehouse, Smartscape y Dynatrace Intelligence (antes Davis) les dan contexto causal, y las apps los presentan. DPS es el modelo de consumo que atraviesa todas las capas.',
    render: () => <Dynatrace101 />,
  },
  'sup-smartscape': {
    kind: 'animation',
    title: 'Por qué cae una aplicación cuando cae un host',
    caption: 'Las relaciones verticales (runs on) conectan Hosts, Processes, Services y Applications; las horizontales son llamadas dentro de un tier. Fíjate en cómo el fallo de host-2 sube por sus PGIs hasta Payment, alcanza a Checkout por la llamada horizontal y llega a la aplicación.',
    steps: ['Cinco tiers verticales', 'Llamadas horizontales (calls)', 'Cae host-2', 'Caen las PGIs de host-2', 'El impacto sube a Services y App'],
    stepMs: 2800,
    render: ({ step }) => <SmartscapeTiers step={step} />,
  },
  'sup-problems-lifecycle': {
    kind: 'animation',
    title: 'Un Problem crece, se limita y se cierra, pero no se reabre',
    caption: 'La severidad del Problem es la más alta de sus eventos; a partir de los 90 minutos ya no se le fusionan eventos nuevos y se abre otro Problem; se cierra cuando se cierran todos sus Davis events (o a mano, con comentario) y, si vuelve la anomalía, se abre un Problem nuevo.',
    steps: ['Se abre con un Slowdown', 'Se fusiona un Availability', 'Pasados 90 min: otro Problem', 'Se cierra y no se reabre'],
    stepMs: 2800,
    render: ({ step }) => <ProblemLifecycle step={step} />,
  },
}

