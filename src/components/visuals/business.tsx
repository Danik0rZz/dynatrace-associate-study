import { Arrow, Box, C, Chip, Clock, Cylinder, Mark, Particle, Person, Svg, T, cx, dim, show, toneColors, type Tone } from './kit'
import type { VisualRegistry } from './types'

/* ——— Primitivas locales ——— */

/** Robot sencillo (monitor sintético). */
function Robot({ x, y, tone = 'navy' }: { x: number; y: number; tone?: Tone }) {
  const c = toneColors[tone].solid
  return (
    <g>
      <line x1={x} y1={y - 22} x2={x} y2={y - 16} stroke={c} strokeWidth={2} strokeLinecap="round" />
      <circle cx={x} cy={y - 23} r={2.5} fill={C.amber} className="sv-blink" />
      <rect x={x - 11} y={y - 16} width={22} height={15} rx={4} fill={c} />
      <circle cx={x - 4.5} cy={y - 8.5} r={2.3} fill="#fff" />
      <circle cx={x + 4.5} cy={y - 8.5} r={2.3} fill="#fff" />
      <rect x={x - 8} y={y + 1} width={16} height={11} rx={3} fill={c} />
    </g>
  )
}

/** Partícula que recorre el trazado y luego espera: ejecución periódica a intervalo fijo. */
function PeriodicRun({ path, dur, begin = 0, tone = 'navy', r = 5 }: { path: string; dur: number; begin?: number; tone?: Tone; r?: number }) {
  return (
    <circle r={r} fill={toneColors[tone].solid} opacity={0}>
      <animateMotion path={path} dur={`${dur}s`} begin={`${begin}s`} repeatCount="indefinite" keyPoints="0;1;1" keyTimes="0;0.55;1" calcMode="linear" />
      <animate attributeName="opacity" values="0;1;1;0;0" keyTimes="0;0.04;0.53;0.58;1" dur={`${dur}s`} begin={`${begin}s`} repeatCount="indefinite" />
    </circle>
  )
}

/* ——— 1. RUM frente a Synthetic ——— */
const pages = ['Home', 'Búsqueda', 'Producto', 'Checkout']
const pageX = (i: number) => 150 + i * 105

function RumSynthetic() {
  const rumY = 62
  const synY = 218
  return (
    <Svg h={310} label="RUM observa recorridos reales variados; Synthetic repite un recorrido controlado a intervalos fijos; un Business Event es un hecho de negocio aparte">
      {/* Carril RUM */}
      <rect x={10} y={8} width={560} height={142} rx={12} fill={C.paperSoft} stroke={C.line} />
      <T x={24} y={28} size={10.5} weight={800} tone="teal" anchor="start">RUM · INTERACCIÓN REAL</T>
      <T x={186} y={28} size={10.5} tone="muted" anchor="start">¿Cómo experimentan los usuarios?</T>
      {pages.map((p, i) => <Box key={p} x={pageX(i)} y={rumY - 16} w={90} h={32} label={p} tone="teal" size={11.5} />)}
      {[56, 92, 128].map((y, i) => (
        <g key={y} className={cx('sv-float', `sv-d${i * 2 + 1}`)}>
          <Person x={52} y={y + 6} tone="teal" scale={0.8} />
        </g>
      ))}
      <Particle path="M68,52 C120,52 150,62 195,62 C240,112 360,112 405,62 C360,134 240,134 195,62 C300,34 440,34 510,62" dur={7.5} tone="teal" r={5} />
      <Particle path="M68,88 C120,88 150,70 195,62 C240,100 270,100 300,62 C330,126 260,138 200,138" dur={5.2} begin={1.1} tone="navy" r={5} />
      <Particle path="M68,124 C140,124 250,112 300,62 C340,118 370,118 405,62 C420,110 450,128 480,134" dur={6.4} begin={2.3} tone="teal" r={5} />
      <T x={560} y={140} size={10} tone="muted" anchor="end">recorridos variados, a ritmos distintos</T>
      {/* Business Event aparte */}
      <rect x={584} y={8} width={166} height={142} rx={12} fill="#fff" stroke={C.amber} strokeDasharray="5 5" />
      <T x={667} y={28} size={10.5} weight={800} tone="amber">HECHO DE NEGOCIO</T>
      <Box x={596} y={rumY - 20} w={142} h={42} label="Business Event" sub="p. ej. pedido realizado" tone="amber" size={12} />
      <Arrow from={[556, rumY]} to={[594, rumY]} tone="amber" dashed />
      <Particle path={`M556,${rumY} L594,${rumY}`} dur={7.5} begin={5.6} tone="amber" r={4} />
      <T x={667} y={122} size={10.5} tone="amber" weight={700}>¿Qué acción empresarial</T>
      <T x={667} y={136} size={10.5} tone="amber" weight={700}>ocurrió?</T>

      {/* Carril Synthetic */}
      <rect x={10} y={164} width={740} height={138} rx={12} fill="#fff" stroke={C.line} />
      <T x={24} y={184} size={10.5} weight={800} tone="navy" anchor="start">SYNTHETIC · PRUEBA CONTROLADA</T>
      <T x={250} y={184} size={10.5} tone="muted" anchor="start">¿Funciona de forma controlada?</T>
      <Clock x={728} y={184} r={11} tone="navy" />
      <T x={710} y={188} size={10.5} tone="navy" weight={700} anchor="end">intervalo fijo</T>
      {/* Browser Monitor / Clickpath */}
      <Robot x={50} y={synY} />
      {pages.map((p, i) => (
        <g key={p}>
          <Box x={pageX(i)} y={synY - 16} w={90} h={32} label={p} tone="navy" size={11.5} />
          {i < pages.length - 1 && <Arrow from={[pageX(i) + 91, synY]} to={[pageX(i + 1) - 2, synY]} tone="navy" />}
        </g>
      ))}
      <Arrow from={[70, synY]} to={[148, synY]} tone="navy" />
      <PeriodicRun path={`M70,${synY} L510,${synY}`} dur={6} tone="navy" />
      <T x={572} y={214} size={11} weight={750} tone="navy" anchor="start">Browser Monitor / Clickpath</T>
      <T x={572} y={229} size={10.5} tone="muted" anchor="start">el mismo recorrido, cada vez</T>
      {/* HTTP Monitor */}
      <Robot x={50} y={272} />
      <Box x={150} y={256} w={130} h={30} label="HTTP Monitor" tone="navy" size={11.5} />
      <Box x={320} y={256} w={130} h={30} label="Endpoint" tone="neutral" size={11.5} />
      <Arrow from={[70, 271]} to={[148, 271]} tone="navy" />
      <Arrow from={[282, 271]} to={[318, 271]} tone="navy" />
      <PeriodicRun path="M70,271 L385,271" dur={4} begin={1} tone="navy" r={4.5} />
      <Mark x={470} y={271} ok r={9} />
      <T x={488} y={275} size={10.5} tone="muted" anchor="start">¿Está disponible y responde?</T>
    </Svg>
  )
}

/* ——— 2. Final de sesión RUM ——— */
type SessionCase = {
  title: string
  sub: string
  mono?: boolean
  clicks: number[]
  end: number
  after?: number[]
}
const sessionCases: SessionCase[] = [
  { title: 'Inactividad', sub: '30 minutos', clicks: [200, 232, 266, 300], end: 470, after: [560, 600] },
  { title: 'Duración máxima', sub: '6 horas', clicks: [200, 240, 285, 330, 372, 415, 455, 500, 540, 580, 620], end: 640, after: [672, 706] },
  { title: 'API', sub: 'dtrum.endSession()', mono: true, clicks: [200, 240, 290], end: 350 },
  { title: 'Navegador', sub: 'cierre del navegador', clicks: [200, 250, 300, 340], end: 390 },
]
const TL0 = 190
const TL1 = 740

function RumSessions({ step }: { step: number }) {
  return (
    <Svg h={320} label="Cuatro condiciones que terminan una sesión RUM: 30 minutos de inactividad, 6 horas de duración, dtrum.endSession() y cierre del navegador">
      <T x={20} y={24} size={10} weight={800} tone="muted" anchor="start">CÓMO TERMINA</T>
      <T x={TL0} y={24} size={10} weight={800} tone="muted" anchor="start">TIEMPO →</T>
      <circle cx={520} cy={20} r={5} fill={C.navy} />
      <T x={530} y={24} size={10.5} tone="muted" anchor="start">interacción</T>
      <rect x={606} y={14} width={34} height={12} rx={6} fill={C.tealTint} stroke={C.teal} />
      <T x={646} y={24} size={10.5} tone="muted" anchor="start">sesión RUM</T>
      {sessionCases.map((c, i) => {
        const y = 44 + i * 68
        const cy = y + 30
        const active = step === 0 || step === i + 1
        const closed = step >= i + 1
        const scale = closed ? (c.end - TL0) / (TL1 - TL0) : 1
        return (
          <g key={c.title} className={dim(active || closed)}>
            <rect x={10} y={y} width={740} height={60} rx={10} fill={step === i + 1 ? '#f4faf9' : '#fff'} stroke={step === i + 1 ? C.teal : C.line} />
            <T x={22} y={cy - 3} size={12} weight={800} tone="navy" anchor="start">{c.title}</T>
            <T x={22} y={cy + 13} size={10.5} tone="muted" anchor="start" mono={c.mono}>{c.sub}</T>
            {/* barra de sesión */}
            <rect x={TL0} y={cy - 9} width={TL1 - TL0} height={18} rx={9} fill={C.tealTint} stroke={C.teal} strokeDasharray={closed ? undefined : '5 4'} style={{ transform: `scaleX(${scale})`, transformBox: 'fill-box', transformOrigin: 'left center' }} />
            {c.clicks.map((x, k) => <circle key={x} cx={x} cy={cy} r={5} fill={C.navy} className={k === c.clicks.length - 1 && !closed ? 'sv-pulse' : undefined} />)}
            {/* Cierre */}
            <g className={show(closed)}>
              <line x1={c.end} x2={c.end} y1={cy - 17} y2={cy + 17} stroke={C.coral} strokeWidth={3} strokeLinecap="round" />
              {i === 0 && (
                <g>
                  <path d={`M306,${cy - 14} L306,${cy - 19} L${c.end - 4},${cy - 19} L${c.end - 4},${cy - 14}`} fill="none" stroke={C.amber} strokeWidth={1.5} />
                  <T x={(306 + c.end) / 2} y={cy + 4} size={10.5} weight={750} tone="amber">30 min sin interacción</T>
                </g>
              )}
              {i === 1 && <Chip x={c.end - 70} y={cy - 19} text="límite 6 h" tone="coral" solid w={84} size={10.5} />}
              {i === 2 && <Chip x={c.end + 78} y={cy} text="dtrum.endSession()" tone="coral" solid mono w={140} size={10.5} />}
              {i === 2 && <T x={c.end + 158} y={cy + 4} size={10.5} tone="muted" anchor="start">cierre programático explícito</T>}
              {i === 3 && (
                <g>
                  <rect x={c.end + 16} y={cy - 13} width={40} height={26} rx={4} fill="#fff" stroke={C.slate} strokeWidth={1.5} />
                  <line x1={c.end + 16} x2={c.end + 56} y1={cy - 6} y2={cy - 6} stroke={C.slate} strokeWidth={1.2} />
                  <Mark x={c.end + 56} y={cy - 13} ok={false} r={8} />
                  <T x={c.end + 74} y={cy + 4} size={10.5} tone="muted" anchor="start">se cierra el navegador o la pestaña</T>
                </g>
              )}
              {c.after && (
                <g>
                  <rect x={c.after[0] - 10} y={cy - 9} width={TL1 - c.after[0] + 10} height={18} rx={9} fill="#fff" stroke={C.violet} strokeDasharray="5 4" />
                  {c.after.map((x) => <circle key={x} cx={x} cy={cy} r={5} fill={C.navy} />)}
                  <T x={TL1 - 6} y={cy + 24} size={10} tone="violet" weight={700} anchor="end">nueva sesión</T>
                </g>
              )}
            </g>
          </g>
        )
      })}
    </Svg>
  )
}

/* ——— 3. user.events frente a user.sessions ——— */
const uEvents: { type: string; s: 'A' | 'B'; tone: Tone }[] = [
  { type: 'page load', s: 'A', tone: 'navy' },
  { type: 'click', s: 'A', tone: 'teal' },
  { type: 'web request', s: 'A', tone: 'navy' },
  { type: 'page load', s: 'B', tone: 'navy' },
  { type: 'JS error', s: 'A', tone: 'coral' },
  { type: 'click', s: 'B', tone: 'teal' },
  { type: 'navigation', s: 'A', tone: 'navy' },
]

function RumTables({ step }: { step: number }) {
  const cards = [
    { s: 'A', y: 44, h: 104, n: 5 },
    { s: 'B', y: 162, h: 84, n: 2 },
  ]
  return (
    <Svg h={346} label="Eventos atómicos de user.events se agregan en registros de user.sessions; cada tabla responde a una pregunta distinta">
      {/* user.events */}
      <g className={dim(step !== 2)}>
        <T x={20} y={26} size={13} weight={800} tone="teal" anchor="start" mono>user.events</T>
        <T x={128} y={26} size={10.5} tone="muted" anchor="start">1 fila = 1 interacción</T>
        {uEvents.map((e, i) => {
          const y = 40 + i * 30
          return (
            <g key={i}>
              <rect x={20} y={y} width={290} height={24} rx={5} fill={e.tone === 'coral' ? C.coralTint : '#f6f9f8'} stroke={C.line} />
              <Chip x={78} y={y + 12} text={e.type} tone={e.tone} w={104} size={10.5} mono />
              <T x={144} y={y + 16} size={10.5} tone="muted" anchor="start" mono>session</T>
              <Chip x={216} y={y + 12} text={e.s} tone={e.s === 'A' ? 'teal' : 'violet'} solid w={26} size={10.5} />
              <rect x={240} y={y + 9} width={56} height={6} rx={3} fill="#d3dedb" />
            </g>
          )
        })}
      </g>
      {/* Agregación */}
      <g className={show(step >= 1)}>
        <T x={372} y={148} size={10.5} weight={800} tone="navy">se agregan</T>
        <T x={372} y={162} size={10.5} weight={800} tone="navy">por sesión</T>
        {uEvents.map((e, i) => {
          const card = e.s === 'A' ? cards[0] : cards[1]
          const d = `M312,${52 + i * 30} C360,${52 + i * 30} 400,${card.y + 20} 436,${card.y + 20}`
          return (
            <g key={i}>
              <path d={d} fill="none" stroke={e.s === 'A' ? C.teal : C.violet} strokeOpacity={0.35} strokeWidth={1.2} />
              <Particle path={d} dur={2.4} begin={i * 0.35} tone={e.s === 'A' ? 'teal' : 'violet'} r={3.5} />
            </g>
          )
        })}
      </g>
      {/* user.sessions */}
      <g className={cx(show(step >= 1), step === 1 ? 'sv-dim' : undefined)}>
        <T x={440} y={26} size={13} weight={800} tone="violet" anchor="start" mono>user.sessions</T>
        <T x={560} y={26} size={10.5} tone="muted" anchor="start">1 fila = 1 sesión</T>
        {cards.map((c) => (
          <g key={c.s}>
            <rect x={440} y={c.y} width={300} height={c.h} rx={8} fill={c.s === 'A' ? C.tealTint : C.violetTint} stroke={c.s === 'A' ? C.teal : C.violet} strokeWidth={1.5} />
            <T x={454} y={c.y + 22} size={12} weight={800} anchor="start" tone={c.s === 'A' ? 'teal' : 'violet'}>{`sesión ${c.s}`}</T>
            <T x={728} y={c.y + 22} size={10.5} anchor="end" tone="muted">{`agrega ${c.n} eventos`}</T>
            <g className={show(step >= 2)}>
              <T x={454} y={c.y + 44} size={10.5} anchor="start" mono>duration</T>
              <rect x={540} y={c.y + 36} width={c.s === 'A' ? 150 : 60} height={9} rx={4} fill={C.navy} opacity={0.55} />
              <T x={454} y={c.y + 64} size={10.5} anchor="start" mono>bounce</T>
              <rect x={540} y={c.y + 56} width={38} height={9} rx={4} fill={C.navy} opacity={0.3} />
              {c.s === 'A' && (
                <g>
                  <T x={454} y={c.y + 88} size={10.5} anchor="start" mono>properties</T>
                  <rect x={540} y={c.y + 80} width={44} height={9} rx={4} fill={C.violet} opacity={0.4} />
                  <rect x={590} y={c.y + 80} width={60} height={9} rx={4} fill={C.violet} opacity={0.4} />
                </g>
              )}
            </g>
          </g>
        ))}
      </g>
      {/* Preguntas */}
      <g className={show(step >= 3)}>
        <rect x={20} y={264} width={350} height={74} rx={8} fill="#fff" stroke={C.teal} strokeWidth={1.5} />
        <T x={32} y={284} size={11.5} weight={800} tone="teal" anchor="start">¿Qué pasó en cada interacción?</T>
        <T x={32} y={301} size={10.5} tone="muted" anchor="start">clics, web requests, errores, navegaciones</T>
        <Mark x={40} y={322} ok={false} r={7} />
        <T x={54} y={326} size={10.5} tone="coral" anchor="start">duración o bounce de la sesión en esta tabla</T>
        <rect x={390} y={264} width={350} height={74} rx={8} fill="#fff" stroke={C.violet} strokeWidth={1.5} />
        <T x={402} y={284} size={11.5} weight={800} tone="violet" anchor="start">¿Cuántas sesiones, cuánto duran, rebotan?</T>
        <T x={402} y={301} size={10.5} tone="muted" anchor="start">duración, bounce y properties agregadas</T>
        <Mark x={410} y={322} ok={false} r={7} />
        <T x={424} y={326} size={10.5} tone="coral" anchor="start">buscar clics detallados en esta tabla</T>
      </g>
    </Svg>
  )
}

/* ——— 4. Captura de Business Events ——— */
const bizSources = [
  { label: 'OneAgent', sub: 'captura en vuelo según reglas' },
  { label: 'RUM / Mobile / OpenKit', sub: 'ligados a experiencia digital' },
  { label: 'API', sub: '/bizevents/ingest · JSON' },
  { label: 'OpenPipeline', sub: 'desde logs y spans' },
  { label: 'Workflow', sub: 'desde automatización' },
]

function BusinessCapture() {
  const hub = { x: 320, y: 128, w: 150, h: 72 }
  const hy = hub.y + hub.h / 2
  return (
    <Svg h={316} label="Fuentes de Business Events: OneAgent, RUM, Mobile y OpenKit, API, OpenPipeline y Workflow convergen en bizevents en Grail, consultables con DQL">
      <T x={20} y={16} size={10} weight={800} tone="muted" anchor="start">ORIGEN</T>
      {bizSources.map((s, i) => {
        const y = 26 + i * 58
        const cy = y + 22
        const d = `M242,${cy} C285,${cy} 280,${hy} 318,${hy}`
        return (
          <g key={s.label}>
            <Box x={20} y={y} w={220} h={44} label={s.label} sub={s.sub} tone={s.label === 'API' ? 'navy' : 'teal'} size={12} />
            <path d={d} fill="none" stroke={C.line} strokeWidth={1.8} />
            <Particle path={d} dur={2.2} begin={i * 0.45} tone="teal" r={4} />
            <Particle path={d} dur={2.2} begin={i * 0.45 + 1.1} tone="teal" r={4} />
          </g>
        )
      })}
      {/* Business Events */}
      <Chip x={hub.x + hub.w / 2} y={100} text="event.provider · event.type · timestamp" tone="violet" mono size={10} />
      <Box x={hub.x} y={hub.y} w={hub.w} h={hub.h} label="Business Events" sub="business-grade data" tone="amber" solid size={13} />
      <T x={hub.x + hub.w / 2} y={226} size={10.5} tone="muted">El enriquecimiento automático</T>
      <T x={hub.x + hub.w / 2} y={240} size={10.5} tone="muted">(app, geo, dispositivo)</T>
      <T x={hub.x + hub.w / 2} y={254} size={10.5} tone="amber" weight={750}>depende del origen</T>
      {/* Grail y DQL */}
      <Arrow from={[472, hy]} to={[512, hy]} tone="navy" />
      <Particle path={`M472,${hy} L512,${hy}`} dur={1.1} tone="amber" r={4} />
      <Cylinder x={514} y={hy - 38} w={96} h={76} tone="navy" label="Grail" sub="bizevents" />
      <Arrow from={[612, hy]} to={[640, hy]} tone="navy" />
      <Box x={642} y={hy - 30} w={110} h={60} label="DQL" tone="navy" solid size={13} />
      <T x={697} y={hy + 16} size={10} tone="white" mono>fetch bizevents</T>
      <T x={697} y={hy + 52} size={10.5} tone="muted">KPIs consultables</T>
    </Svg>
  )
}

/* ——— 5. Anatomía de un Business Event ——— */
const jsonLines = [
  '{',
  '  "event.provider": "shop-frontend",',
  '  "event.type": "order.placed",',
  '  "event.category": "sales",',
  '  "order.id": "A-1027",',
  '  "amount": 59.90,',
  '  "currency": "EUR",',
  '  "channel": "web",',
  '  "customer.email": "•••••••",',
  '}',
]
const eventGroups: { label: string; tag?: string; sub: string; tone: Tone; lines: number[] }[] = [
  { label: 'Proveedor', tag: 'obligatorio', sub: 'quién origina el hecho', tone: 'teal', lines: [1] },
  { label: 'Tipo', tag: 'obligatorio', sub: 'qué hecho ocurrió', tone: 'teal', lines: [2] },
  { label: 'Categoría', tag: 'opcional', sub: 'contexto; no sustituye lo obligatorio', tone: 'navy', lines: [3] },
  { label: 'Propiedades', sub: 'semántica estable: id, valor, moneda, canal', tone: 'navy', lines: [4, 5, 6, 7] },
  { label: 'Entidad', sub: 'relación técnica o de experiencia', tone: 'violet', lines: [] },
  { label: 'Privacidad', sub: 'enmascarar o limitar lo sensible', tone: 'coral', lines: [8] },
]
const lineY = (i: number) => 52 + i * 24

function EventModel({ step }: { step: number }) {
  return (
    <Svg h={320} label="Anatomía de un Business Event: proveedor, tipo, categoría, propiedades, entidad y privacidad">
      <rect x={20} y={24} width={380} height={270} rx={10} fill={C.navy} stroke={step === 4 ? C.violet : C.navy} strokeWidth={step === 4 ? 4 : 1.5} />
      <T x={20} y={16} size={10} weight={800} tone="muted" anchor="start">BUSINESS EVENT (JSON)</T>
      {jsonLines.map((line, i) => {
        const gi = eventGroups.findIndex((g) => g.lines.includes(i))
        const active = gi === step
        return (
          <g key={i}>
            <rect x={28} y={lineY(i) - 15} width={364} height={21} rx={4} fill={active ? toneColors[eventGroups[gi].tone].solid : 'transparent'} opacity={active ? 0.45 : 1} />
            <T x={36} y={lineY(i)} size={11} mono tone="white" anchor="start" style={{ whiteSpace: 'pre' }} opacity={gi === -1 || active || step === 4 ? 1 : 0.55}>{line}</T>
          </g>
        )
      })}
      {eventGroups.map((g, i) => {
        const by = 24 + i * 46
        const active = i === step
        const ly = g.lines.length ? (lineY(g.lines[0]) + lineY(g.lines[g.lines.length - 1])) / 2 - 5 : 160
        return (
          <g key={g.label} className={dim(active)}>
            <path d={`M402,${ly} C425,${ly} 420,${by + 19} 446,${by + 19}`} fill="none" stroke={toneColors[g.tone].solid} strokeWidth={1.6} strokeDasharray={g.label === 'Entidad' ? '4 4' : undefined} className={show(active)} />
            <rect x={448} y={by} width={296} height={38} rx={8} fill={active ? toneColors[g.tone].fill : '#fff'} stroke={toneColors[g.tone].stroke} strokeWidth={1.5} />
            <T x={460} y={by + 16} size={12} weight={800} tone={g.tone} anchor="start">{g.label}</T>
            {g.tag && <Chip x={g.label === 'Proveedor' || g.label === 'Categoría' ? 574 : 538} y={by + 12} text={g.tag} tone={g.tag === 'obligatorio' ? 'teal' : 'neutral'} solid={g.tag === 'obligatorio'} size={9.5} w={g.tag === 'obligatorio' ? 78 : 64} />}
            <T x={460} y={by + 31} size={10.5} tone="muted" anchor="start">{g.sub}</T>
          </g>
        )
      })}
      <g className={show(step === 4)}>
        <Chip x={210} y={306} text="se relaciona con un servicio o aplicación" tone="violet" size={10.5} />
      </g>
    </Svg>
  )
}

/* ——— 6. Journeys y conteos ——— */
const stages = [
  { label: 'Start event', sub: 'inicio del journey', w: 160 },
  { label: 'Paso', sub: 'intermedio', w: 124 },
  { label: 'Paso', sub: 'intermedio', w: 96 },
  { label: 'Success event', sub: 'conversión', w: 74 },
]
const stageX = (i: number) => 24 + i * 186
const journeyUsers = [
  { sessions: [3, 2] },
  { sessions: [4] },
  { sessions: [1, 2] },
]

function BusinessJourneys({ step }: { step: number }) {
  const events = journeyUsers.reduce((s, u) => s + u.sessions.reduce((a, b) => a + b, 0), 0)
  const sessions = journeyUsers.reduce((s, u) => s + u.sessions.length, 0)
  return (
    <Svg h={340} label="Journey con start event, pasos, abandonos y success event; los mismos datos dan conteos distintos de eventos, sesiones y usuarios">
      {stages.map((s, i) => {
        const x = stageX(i)
        const active = (step === 0 && i === 0) || (step === 1 && (i === 1 || i === 2)) || (step === 2 && i === 3) || step === 3
        const isEnd = i === 0 || i === 3
        return (
          <g key={i} className={dim(active || step > (i === 0 ? 0 : i === 3 ? 2 : 1))}>
            <Box x={x} y={20} w={160} h={44} label={s.label} sub={s.sub} tone={i === 3 ? 'teal' : isEnd ? 'amber' : 'navy'} solid={isEnd && active && step < 3} size={12} />
            <rect x={x} y={76} width={160} height={24} rx={4} fill={C.paperSoft} />
            <rect x={x} y={76} width={s.w} height={24} rx={4} fill={i === 3 ? C.teal : C.navy} opacity={0.75} />
            {i < stages.length - 1 && (
              <g>
                <Arrow from={[x + 162, 42]} to={[x + 184, 42]} tone="navy" />
                <g className={show(step >= 1)}>
                  <Arrow d={`M${x + 150},102 C${x + 150},128 ${x + 172},128 ${x + 172},146`} tone="coral" />
                  <Particle path={`M${x + 150},102 C${x + 150},128 ${x + 172},128 ${x + 172},146`} dur={2.4} begin={i * 0.6} tone="coral" r={3.5} />
                  <T x={x + 172} y={162} size={10.5} tone="coral" weight={700}>abandono</T>
                </g>
              </g>
            )}
          </g>
        )
      })}
      <Particle path="M104,88 L664,88" dur={5} tone="teal" r={5} />
      <g className={show(step >= 2)}>
        <Mark x={700} y={120} ok r={10} />
        <T x={690} y={146} size={10.5} tone="teal" weight={700}>conversión</T>
      </g>
      {/* Conteos */}
      <g className={dim(step === 3)}>
        <line x1={20} x2={740} y1={180} y2={180} stroke={C.line} strokeDasharray="4 5" />
        <T x={20} y={202} size={10} weight={800} tone="muted" anchor="start">MISMOS DATOS, TRES CONTEOS DISTINTOS</T>
        {journeyUsers.map((u, ui) => {
          const x = 30 + ui * 160
          let sx = x + 34
          return (
            <g key={ui}>
              <Person x={x + 10} y={258} tone="navy" scale={0.85} />
              <T x={x + 10} y={282} size={10} tone="muted">{`usuario ${ui + 1}`}</T>
              {u.sessions.map((n, si) => {
                const w = n * 16 + 10
                const g = (
                  <g key={si}>
                    <rect x={sx} y={234} width={w} height={26} rx={8} fill={C.tealTint} stroke={C.teal} />
                    {Array.from({ length: n }, (_, k) => <circle key={k} cx={sx + 13 + k * 16} cy={247} r={5} fill={C.amber} />)}
                  </g>
                )
                sx += w + 6
                return g
              })}
            </g>
          )
        })}
        <T x={30} y={318} size={10.5} tone="muted" anchor="start">● evento · ▭ sesión · figura = usuario</T>
        {[
          { label: `Eventos: ${events}`, tone: 'amber' as Tone },
          { label: `Sesiones: ${sessions}`, tone: 'teal' as Tone },
          { label: `Usuarios: ${journeyUsers.length}`, tone: 'navy' as Tone },
        ].map((c, i) => <Box key={c.label} x={530} y={206 + i * 42} w={210} h={32} label={c.label} tone={c.tone} size={12.5} />)}
      </g>
    </Svg>
  )
}


/* ——— Business Flow: correlation ID por defecto y local ——— */
const flowSteps = [
  { name: 'Place order', type: 'com.shop.order.placed', field: 'order_id: A-17' },
  { name: 'Payment', type: 'com.shop.payment.done', field: 'order_id: A-17' },
  { name: 'Ship order', type: 'com.shop.order.shipped', field: 'order_number: A-17' },
]
const flowX = (i: number) => 30 + i * 250

function BusinessFlowCorrelation({ step }: { step: number }) {
  return (
    <Svg h={320} label="Business Flow: tres pasos con Business Events unidos por un correlation ID por defecto y uno local en el último paso">
      <T x={10} y={18} size={10} tone="muted" anchor="start" weight={800}>PASOS DEL BUSINESS FLOW</T>
      {flowSteps.map((s, i) => (
        <g key={s.name}>
          <Box x={flowX(i)} y={30} w={200} h={36} label={s.name} tone="navy" solid size={13} />
          {i < 2 && <Arrow from={[flowX(i) + 204, 48]} to={[flowX(i + 1) - 6, 48]} tone="navy" flow />}
          <Box x={flowX(i)} y={86} w={200} h={52} label={s.type} sub={s.field} tone="amber" size={11} mono />
        </g>
      ))}
      {/* Business exception en Payment */}
      <g className={show(step >= 3)}>
        <Box x={flowX(1)} y={148} w={200} h={40} label="Business exception" sub="com.shop.out_of_stock" tone="coral" size={11.5} />
      </g>
      {/* KPI en Ship order */}
      <g className={show(step >= 3)}>
        <Box x={flowX(2)} y={148} w={200} h={40} label="KPI del flujo" sub="amount (double)" tone="violet" size={11.5} />
      </g>
      {/* Correlation ID por defecto */}
      <g className={dim(step >= 1)}>
        <rect x={20} y={200} width={720} height={30} rx={15} fill={C.tealTint} stroke={C.teal} />
        <T x={380} y={219.5} size={11.5} weight={800} tone="teal">Correlation ID por defecto: order_id (se aplica a todos los pasos)</T>
      </g>
      {flowSteps.map((s, i) => {
        const ok = i < 2 || step >= 2
        return (
          <g key={`m-${s.name}`} className={show(step >= 1)}>
            <Mark x={flowX(i) + 100} y={250} ok={ok} r={10} />
            <T x={flowX(i) + 100} y={276} size={10.5} tone={ok ? 'teal' : 'coral'} weight={700}>
              {i < 2 ? 'order_id coincide' : step >= 2 ? 'ID local: order_number' : 'no tiene order_id'}
            </T>
          </g>
        )
      })}
      <g className={show(step >= 2)}>
        <Chip x={380} y={300} text="1 instancia del flujo: pedido A-17" tone="teal" solid size={11} />
      </g>
    </Svg>
  )
}

/* ——— Synthetic: retry, Local outage y Global outage ——— */
const locs = ['Location A', 'Location B', 'Location C']
const runX = (i: number) => 140 + i * 72

function OutageHandling({ step }: { step: number }) {
  // Resultado de cada ejecución por location y paso: ok, retry (falla y el reintento pasa) o fail.
  const result = (loc: number, run: number): 'ok' | 'retry' | 'fail' => {
    if (loc === 1 && run === 1 && step >= 1) return 'retry'
    if (loc === 2 && run >= 3 && step >= 2) return 'fail'
    return 'ok'
  }
  return (
    <Svg h={290} label="Ejecuciones de un browser monitor en tres locations: automatic retry, fallos consecutivos en una location, Local outage y Global outage">
      <T x={10} y={20} size={10} tone="muted" anchor="start" weight={800}>EJECUCIONES PROGRAMADAS</T>
      {[0, 1, 2, 3, 4].map((r) => <T key={r} x={runX(r)} y={42} size={10} tone="muted">{`#${r + 1}`}</T>)}
      {locs.map((loc, l) => (
        <g key={loc}>
          <Box x={10} y={58 + l * 62} w={92} h={34} label={loc} tone="navy" size={11} />
          <line x1={110} y1={75 + l * 62} x2={460} y2={75 + l * 62} stroke={C.line} strokeWidth={2} />
          {[0, 1, 2, 3, 4].map((r) => {
            const res = result(l, r)
            return (
              <g key={r}>
                <Mark x={runX(r)} y={75 + l * 62} ok={res !== 'fail'} r={11} />
                {res === 'retry' && (
                  <g>
                    <circle cx={runX(r) - 14} cy={61 + l * 62} r={7} fill={C.coral} />
                    <T x={runX(r)} y={106 + l * 62} size={9.5} tone="amber" weight={700}>retry ✓</T>
                  </g>
                )}
              </g>
            )
          })}
        </g>
      ))}
      <g className={show(step === 1)}>
        <T x={235} y={262} size={11} tone="amber" weight={700}>Fallo puntual: reintento inmediato; cuenta el 2.º intento</T>
      </g>
      <g className={show(step >= 2)}>
        <rect x={110} y={177} width={360} height={36} rx={8} fill="none" stroke={C.coral} strokeDasharray="5 4" className={show(step >= 2)} />
        <T x={235} y={262} size={11} tone="coral" weight={700} className={show(step === 2)}>Location C falla de forma consecutiva; A y B funcionan</T>
      </g>
      {/* Panel de outage handling */}
      <T x={490} y={20} size={10} tone="muted" anchor="start" weight={800}>OUTAGE HANDLING</T>
      <g className={dim(step >= 3)}>
        <rect x={490} y={40} width={260} height={92} rx={8} fill={C.coralTint} stroke={C.coral} />
        <T x={620} y={66} size={13} weight={800} tone="coral">Local outage → Problem</T>
        <T x={620} y={90} size={10.5} tone="coral">Fallos consecutivos en una</T>
        <T x={620} y={106} size={10.5} tone="coral">o varias locations</T>
        <T x={620} y={122} size={10.5} tone="coral">(requiere ≥ 2 locations)</T>
      </g>
      <g className={dim(step >= 3)}>
        <rect x={490} y={150} width={260} height={92} rx={8} fill="#fff" stroke="#b9c7c5" />
        <T x={620} y={176} size={13} weight={800}>Global outage → sin Problem</T>
        <T x={620} y={202} size={10.5} tone="muted">Se dispara cuando fallan</T>
        <T x={620} y={218} size={10.5} tone="muted">todas las locations</T>
      </g>
      <g className={show(step >= 3)}>
        <T x={235} y={262} size={11} tone="navy" weight={700}>Con solo Global outage activo, este fallo no abre Problem</T>
      </g>
    </Svg>
  )
}

export const businessVisuals: VisualRegistry = {
  'rum-synthetic': {
    kind: 'animation',
    title: 'Usuarios reales frente a un robot controlado',
    caption: 'Arriba, cada usuario real sigue su propio recorrido y a su ritmo: RUM muestra lo que viven a escala. Abajo, el monitor sintético repite siempre el mismo recorrido o endpoint a intervalo fijo. El Business Event es otra cosa: el hecho de negocio que ocurrió.',
    render: () => <RumSynthetic />,
  },
  'rum-sessions': {
    kind: 'animation',
    title: 'Cuatro formas de cerrar una sesión RUM web',
    caption: 'En web frontends, una sesión no dura lo que la pestaña abierta: se cierra tras 30 minutos sin interacción, al llegar a 6 horas, con dtrum.endSession() o al cerrar el navegador. Tras la inactividad o el límite de 6 h, la siguiente interacción ya cuenta en otra sesión.',
    steps: ['Interacciones dentro de la sesión', 'Inactividad: 30 minutos', 'Duración máxima: 6 horas', 'API: dtrum.endSession()', 'Cierre del navegador'],
    stepMs: 2800,
    render: ({ step }) => <RumSessions step={step} />,
  },
  'deep-rum-session-semantics': {
    kind: 'animation',
    title: 'user.events guarda interacciones; user.sessions, sesiones',
    caption: 'Cada fila de user.events es una interacción atómica (clic, web request, error). Esas filas se agregan en un único registro por sesión en user.sessions, con duración, bounce y properties. Elige la tabla según la pregunta: detalle de interacciones o comportamiento por sesión.',
    steps: ['user.events: eventos atómicos', 'Se agregan por sesión', 'user.sessions: duración, bounce…', 'Cada tabla responde otra pregunta'],
    stepMs: 3000,
    render: ({ step }) => <RumTables step={step} />,
  },
  'deep-business-capture': {
    kind: 'animation',
    title: 'Muchos orígenes, un mismo destino: bizevents',
    caption: 'Business Events pueden nacer en OneAgent, RUM/Mobile/OpenKit, el API de ingesta, OpenPipeline o un Workflow, y acaban en Grail consultables con DQL. Los campos automáticos dependen del origen: un evento enviado por API no trae el mismo enriquecimiento que uno capturado por RUM u OneAgent.',
    render: () => <BusinessCapture />,
  },
  'event-model': {
    kind: 'animation',
    title: 'Anatomía de un Business Event',
    caption: 'event.provider y event.type son obligatorios; event.category añade contexto pero no los sustituye. Las propiedades deben tener semántica estable, el evento se relaciona con una entidad y los datos sensibles se enmascaran o limitan antes de capturarse. Los valores del JSON son solo un ejemplo.',
    steps: ['Proveedor (obligatorio)', 'Tipo (obligatorio)', 'Categoría (opcional)', 'Propiedades', 'Entidad', 'Privacidad / masking'],
    stepMs: 2400,
    render: ({ step }) => <EventModel step={step} />,
  },
  'deep-business-journeys': {
    kind: 'animation',
    title: 'Un journey se mide entre start y success',
    caption: 'Define el evento de inicio y el de éxito, y localiza dónde se abandona entre pasos. Después decide qué cuentas: en el ejemplo, los mismos datos dan 12 eventos, 5 sesiones y 3 usuarios, y cada cifra responde a una pregunta distinta.',
    steps: ['Start event', 'Pasos y abandonos', 'Success event: conversión', 'Eventos ≠ sesiones ≠ usuarios'],
    stepMs: 2800,
    render: ({ step }) => <BusinessJourneys step={step} />,
  },
  'sup-business-flow': {
    kind: 'animation',
    title: 'Un correlation ID une los pasos de cada pedido',
    caption: 'Cada paso del Business Flow se alimenta de un Business Event. El correlation ID por defecto (order_id) une los pasos que lo comparten; en el último paso, que solo trae order_number, un correlation ID local lo sobrescribe. Además se pueden marcar business exceptions y mapear un KPI long o double.',
    steps: ['Pasos con Business Events', 'Correlation ID por defecto: order_id', 'Último paso: ID local order_number', 'Business exception y KPI numérico'],
    stepMs: 2800,
    render: ({ step }) => <BusinessFlowCorrelation step={step} />,
  },
  'sup-synthetic-monitors': {
    kind: 'animation',
    title: 'Retry, Local outage y Global outage',
    caption: 'Un fallo puntual se reintenta una vez de inmediato y solo cuenta el segundo intento. Si una location falla de forma consecutiva mientras las demás funcionan, solo Local outage (con al menos dos locations) abre un Problem; Global outage espera a que fallen todas.',
    steps: ['Ejecuciones en 3 locations', 'Fallo puntual: automatic retry', 'Fallos consecutivos en Location C', 'Local outage alerta; Global, no'],
    stepMs: 3000,
    render: ({ step }) => <OutageHandling step={step} />,
  },
}
