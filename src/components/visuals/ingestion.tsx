import { Arrow, Box, C, Chip, Cylinder, Doc, Mark, Particle, Person, Svg, T, dim, show, toneColors, type Tone } from './kit'
import type { VisualRegistry } from './types'

/* ——— 1. El camino completo del dato: cada etapa debe demostrarse ——— */
const pathStages = [
  { label: 'Origen', q: ['¿se generó?'] },
  { label: 'Canal', q: ['¿mecanismo', 'esperado?'] },
  { label: 'Auth', q: ['¿token/credencial', 'con scopes?'] },
  { label: 'Pipeline', q: ['¿matcher y orden', 'correctos?'] },
  { label: 'Storage', q: ['¿retención y', 'bucket aplican?'] },
  { label: 'Query', q: ['¿dataset, campos', 'y permisos?'] },
]

function DataPath({ step }: { step: number }) {
  // Etapa alcanzada por la muestra en cada paso; en los pasos 2-3 se detiene en Auth.
  const reached = [0, 1, 2, 2, 5][step]
  const failed = step === 2 || step === 3
  const stageX = (i: number) => 14 + i * 124
  const tokenX = stageX(reached) + 56
  return (
    <Svg h={290} label="Camino del dato: origen, canal, auth, pipeline, storage y query; la muestra se detiene en Auth por un token sin scope">
      <T x={14} y={22} size={10} tone="muted" anchor="start" weight={800}>MUESTRA CONCRETA: timestamp · host · servicio · trace ID</T>
      {/* Muestra que avanza */}
      <g style={{ transform: `translateX(${tokenX}px)` }}>
        <rect x={-34} y={40} width={68} height={30} rx={6} fill={failed ? C.coralTint : C.tealTint} stroke={failed ? C.coral : C.teal} strokeWidth={1.5} />
        <T x={0} y={59} size={10.5} weight={800} tone={failed ? 'coral' : 'teal'}>muestra</T>
        <path d="M-6,72 L6,72 L0,80 Z" fill={failed ? C.coral : C.teal} />
      </g>
      {pathStages.map((stage, i) => {
        const x = stageX(i)
        const done = i < reached || (i === reached && !failed)
        const isFail = failed && i === reached
        const tone: Tone = isFail ? 'coral' : done ? 'teal' : 'navy'
        const t = toneColors[tone]
        return (
          <g key={stage.label} className={dim(i <= reached)}>
            <rect x={x} y={92} width={112} height={70} rx={8} fill={t.fill} stroke={t.stroke} strokeWidth={1.5} />
            <T x={x + 56} y={114} size={13} weight={800} tone={tone}>{stage.label}</T>
            {stage.q.map((line, k) => <T key={line} x={x + 56} y={133 + k * 14} size={10.5} tone="muted">{line}</T>)}
            {i < pathStages.length - 1 && <Arrow from={[x + 113, 127]} to={[x + 123, 127]} tone={i < reached ? 'teal' : 'neutral'} />}
            <g className={show(done || isFail)}>
              <Mark x={x + 56} y={182} ok={!isFail} r={10} />
            </g>
          </g>
        )
      })}
      {/* Mensajes por paso */}
      <g className={show(step === 2)}>
        <Chip x={stageX(2) + 56} y={210} text="token sin scope → rechazado" tone="coral" solid w={200} />
      </g>
      <g className={show(step === 3)}>
        <rect x={590} y={200} width={156} height={74} rx={8} fill="#fff" stroke={C.coral} strokeWidth={1.5} strokeDasharray="5 4" />
        <T x={668} y={222} size={11} weight={800} tone="coral">Query: 0 registros</T>
        <T x={668} y={240} size={10.5} tone="muted">pantalla vacía, aunque</T>
        <T x={668} y={255} size={10.5} tone="muted">el origen sí lo generó</T>
        <T x={318} y={218} size={11.5} weight={700} tone="coral">El fallo está en Auth, no en la consulta</T>
        <T x={318} y={238} size={10.5} tone="muted">Cambiar la query no lo arregla.</T>
      </g>
      <g className={show(step === 4)}>
        <T x={380} y={226} size={12.5} weight={800} tone="teal">Scope corregido: cada etapa aporta su evidencia</T>
        <T x={380} y={248} size={11} tone="muted">Compara lo que salió del origen con lo aceptado, procesado y almacenado.</T>
      </g>
      <g className={show(step <= 1)}>
        <T x={380} y={226} size={12} weight={700} tone="navy">No existe “el dato” hasta que se demuestra cada etapa</T>
      </g>
    </Svg>
  )
}

/* ——— 2. OpenPipeline: ingest source → routing → pipeline (stages) → bucket ——— */
const opStages = [
  { label: '1 · Ingest source', sub: 'API · OneAgent · extensions' },
  { label: '2 · Routing', sub: 'elige la pipeline' },
  { label: '3 · Pipeline', sub: 'stages: Processing … Bucket' },
]
type OpRecord = { content: string; after: string; extract?: string; fate: 'keep' | 'mask' | 'drop'; bucket?: 0 | 1; route: string }
const opRecords: OpRecord[] = [
  { content: 'GET /cart 504 timeout', after: 'GET /cart 504 timeout', extract: 'status = 504', fate: 'keep', bucket: 0, route: 'route → pipeline nginx' },
  { content: 'login user=ana@mail.com', after: 'login user=***', fate: 'mask', bucket: 1, route: 'route → pipeline auth' },
  { content: 'DEBUG heartbeat ok', after: 'DEBUG heartbeat ok', fate: 'drop', route: 'Default route' },
]

function OpenPipeline({ step }: { step: number }) {
  const colX = [20, 210, 400]
  return (
    <Svg h={330} label="OpenPipeline: la ingest source recibe, el routing elige la pipeline y la pipeline procesa y asigna el bucket">
      {opStages.map((stage, i) => {
        const active = (i === 0 && step === 0) || (i === 1 && step === 1) || (i === 2 && step >= 2)
        return (
          <g key={stage.label}>
            <rect x={colX[i]} y={16} width={176} height={304} rx={10} fill={active ? C.tealTint : C.paperSoft} stroke={active ? C.teal : C.line} strokeWidth={1.5} />
            <Box x={colX[i] + 8} y={24} w={160} h={46} label={stage.label} sub={stage.sub} tone={active ? 'teal' : 'navy'} solid={active} size={12.5} />
            {i < 2 && <Arrow from={[colX[i] + 178, 46]} to={[colX[i + 1] - 2, 46]} tone="teal" flow />}
          </g>
        )
      })}
      {/* Buckets */}
      <T x={672} y={34} size={10} tone="muted" weight={800}>BUCKETS</T>
      <Cylinder x={622} y={70} w={100} h={56} tone="navy" label="default_logs" className={dim(step === 3)} />
      <Cylinder x={622} y={170} w={100} h={56} tone="violet" label="custom" sub="bucket custom" className={dim(step === 3)} />
      {opRecords.map((rec, r) => {
        const col = step === 0 ? 0 : step === 1 ? 1 : 2
        const dropped = rec.fate === 'drop' && step >= 2
        const x = colX[col] + 8
        const y = 90 + r * 76
        const masked = rec.fate === 'mask' && step >= 2
        const extracted = rec.extract && step >= 2
        const tone: Tone = dropped ? 'coral' : masked ? 'amber' : 'teal'
        return (
          <g key={rec.content}>
            <g style={{ transform: `translateX(${x}px)`, opacity: dropped && step >= 3 ? 0.35 : 1 }}>
              <rect x={0} y={y} width={160} height={62} rx={6} fill="#fff" stroke={toneColors[tone].stroke} strokeWidth={1.5} />
              <T x={8} y={y + 17} size={10} mono anchor="start" tone={masked ? 'amber' : 'ink'} weight={700}>{masked ? rec.after : rec.content}</T>
              <T x={8} y={y + 34} size={9.5} mono anchor="start" tone="violet" className={show(step >= 1)}>{rec.route}</T>
              <g className={show(Boolean(extracted))}>
                <T x={8} y={y + 51} size={10} mono anchor="start" tone="teal" weight={700}>{rec.extract ?? ''}</T>
                <T x={152} y={y + 51} size={9.5} anchor="end" tone="muted">DPL</T>
              </g>
              <g className={show(masked)}>
                <T x={8} y={y + 51} size={10} anchor="start" tone="amber" weight={700}>PII enmascarada</T>
              </g>
              <g className={show(dropped)}>
                <line x1={6} x2={154} y1={y + 13} y2={y + 13} stroke={C.coral} strokeWidth={1.5} />
                <T x={8} y={y + 51} size={10} anchor="start" tone="coral" weight={700}>drop: no se persiste</T>
                <Mark x={150} y={y + 4} ok={false} r={9} />
              </g>
            </g>
            {/* Ruta hacia bucket */}
            {rec.bucket !== undefined && (
              <g className={show(step === 3)}>
                <Arrow d={`M568,${y + 31} C592,${y + 31} 596,${rec.bucket === 0 ? 98 : 198} 618,${rec.bucket === 0 ? 98 : 198}`} tone={rec.bucket === 0 ? 'navy' : 'violet'} flow />
                <Particle path={`M568,${y + 31} C592,${y + 31} 596,${rec.bucket === 0 ? 98 : 198} 618,${rec.bucket === 0 ? 98 : 198}`} dur={1.6} begin={r * 0.4} tone={rec.bucket === 0 ? 'navy' : 'violet'} r={4} />
              </g>
            )}
          </g>
        )
      })}
      <g className={show(step === 0)}>
        <T x={672} y={268} size={10.5} tone="muted">Primero llega</T>
        <T x={672} y={283} size={10.5} tone="muted">por una source</T>
      </g>
      <g className={show(step === 3)}>
        <T x={672} y={268} size={10.5} tone="muted">Bucket assignment</T>
        <T x={672} y={283} size={10.5} tone="muted">decide el bucket</T>
      </g>
    </Svg>
  )
}

/* ——— 3. Cuatro mecanismos de ingestión ——— */
const mechanisms = [
  { name: 'OneAgent', fit: 'Host / proceso', fitSub: 'compatible', check: ['Modo, versión,', 'inyección y soporte'] },
  { name: 'ActiveGate', fit: 'Gateway / cloud', fitSub: 'monitorización remota', check: ['Grupo, red,', 'credenciales y endpoint'] },
  { name: 'OpenTelemetry', fit: 'Instrumentación', fitSub: 'exportación agnóstica', check: ['Endpoint, protocolo, auth,', 'atributos y sampling'] },
  { name: 'API', fit: 'Fuente externa', fitSub: 'integración específica', check: ['Token, payload, límites', 'y modelo de datos'] },
]

function Mechanisms() {
  return (
    <Svg h={320} label="Cuatro caminos hacia Dynatrace: OneAgent, ActiveGate, OpenTelemetry y API, cada uno con su comprobación crítica">
      <T x={20} y={22} size={10} tone="muted" anchor="start" weight={800}>CUÁNDO ENCAJA</T>
      <T x={240} y={22} size={10} tone="muted" anchor="start" weight={800}>MECANISMO</T>
      <T x={412} y={22} size={10} tone="muted" anchor="start" weight={800}>COMPROBACIÓN CRÍTICA</T>
      {mechanisms.map((m, i) => {
        const y = 38 + i * 70
        const path = `M210,${y + 28} L646,${y + 28}`
        return (
          <g key={m.name}>
            <Arrow d={path} tone="teal" head={false} dashed width={1.5} />
            <Particle path={path} dur={3.2} begin={i * 0.7} tone="teal" r={4.5} />
            <Box x={20} y={y} w={180} h={56} label={m.fit} sub={m.fitSub} tone="neutral" size={12} />
            <Box x={240} y={y + 6} w={140} h={44} label={m.name} tone="teal" solid size={12.5} />
            <rect x={412} y={y + 4} width={206} height={48} rx={8} fill={C.amberTint} stroke={C.amber} strokeWidth={1.4} />
            <rect x={422} y={y + 20} width={14} height={14} rx={3} fill="#fff" stroke={C.amber} strokeWidth={1.6} />
            <path d={`M425,${y + 27} L428.5,${y + 31} L434,${y + 23}`} fill="none" stroke={C.amber} strokeWidth={1.8} strokeLinecap="round" />
            {m.check.map((line, k) => <T key={line} x={446} y={y + 24 + k * 15} size={10.5} anchor="start" tone="amber" weight={650}>{line}</T>)}
          </g>
        )
      })}
      <rect x={650} y={38} width={96} height={266} rx={12} fill={C.navy} />
      <T x={698} y={166} size={13} weight={800} tone="white">Dynatrace</T>
      <T x={698} y={184} size={10} tone="white" opacity={0.75}>Grail</T>
    </Svg>
  )
}

/* ——— 4. Cardinalidad: dimensiones que multiplican series ——— */
const hosts = ['host-a', 'host-b', 'host-c']
const endpoints = ['/cart', '/login', '/search', '/pay']
const spark = (seed: number, x: number, y: number, w: number, h: number) =>
  Array.from({ length: 9 }, (_, i) => `${x + (i * w) / 8},${y + h / 2 + Math.sin(seed * 1.7 + i * 1.3) * h * 0.35 + Math.cos(seed + i * 0.7) * h * 0.12}`).join(' ')

function Cardinality({ step }: { step: number }) {
  const factors = [
    { label: 'metric key', n: '1', show: true },
    { label: '× host', n: '3', show: step >= 1 },
    { label: '× endpoint', n: '4', show: step >= 2 },
    { label: '× user_id', n: 'N', show: step >= 3 },
  ]
  const total = ['1', '3', '12', '12 × N'][step]
  return (
    <Svg h={320} label="Explosión de cardinalidad: cada dimensión multiplica el número de series de una métrica">
      {/* Fórmula */}
      <T x={20} y={22} size={10} tone="muted" anchor="start" weight={800}>DIMENSIONES</T>
      {factors.map((f, i) => (
        <g key={f.label} className={show(f.show)}>
          <rect x={20} y={36 + i * 44} width={250} height={34} rx={6} fill={i === 3 ? C.coralTint : i === 0 ? C.tealTint : C.violetTint} stroke={i === 3 ? C.coral : i === 0 ? C.teal : C.violet} strokeWidth={1.4} />
          <T x={34} y={58 + i * 44} size={12} anchor="start" mono weight={700} tone={i === 3 ? 'coral' : i === 0 ? 'teal' : 'violet'}>{f.label}</T>
          <T x={256} y={58 + i * 44} size={13} anchor="end" weight={800} tone={i === 3 ? 'coral' : 'ink'}>{f.n} {i === 0 ? 'serie' : 'valores'}</T>
        </g>
      ))}
      <line x1={20} x2={270} y1={218} y2={218} stroke={C.navy} strokeWidth={1.5} />
      <T x={20} y={246} size={12} anchor="start" weight={700} tone="navy">Series resultantes</T>
      <T x={270} y={250} size={24} anchor="end" weight={850} tone={step >= 3 ? 'coral' : 'teal'}>{total}</T>
      <g className={show(step >= 3)}>
        <T x={20} y={280} size={11} anchor="start" tone="coral" weight={700}>Afecta a coste, rendimiento y utilidad.</T>
        <T x={20} y={298} size={10.5} anchor="start" tone="muted">Mide el valor de cada dimensión antes de ingerir.</T>
      </g>
      {/* Rejilla de series */}
      <rect x={300} y={16} width={446} height={296} rx={10} fill="#fff" stroke={step >= 3 ? C.coral : C.line} strokeWidth={1.5} />
      {hosts.map((h, c) => <T key={h} x={412 + c * 128} y={36} size={10.5} mono weight={700} tone="navy" className={show(step >= 1)}>{h}</T>)}
      {endpoints.map((e, r) => <T key={e} x={326} y={80 + r * 64} size={10.5} mono weight={700} tone="navy" className={show(step >= 2)} anchor="middle">{e}</T>)}
      {hosts.map((_, c) => endpoints.map((__, r) => {
        const visible = step >= 2 || (step === 1 && r === 0) || (c === 0 && r === 0)
        const x = 356 + c * 128
        const y = 48 + r * 64
        return (
          <g key={`${c}-${r}`} className={show(visible)}>
            <rect x={x} y={y} width={112} height={56} rx={6} fill={step >= 3 ? C.coralTint : C.paperSoft} stroke={step >= 3 ? C.coral : C.line} />
            <polyline points={spark(c * 4 + r, x + 8, y + 8, 96, 40)} fill="none" stroke={C.teal} strokeWidth={2} />
            <g className={show(step >= 3)}>
              {[1, 2, 3, 4, 5, 6].map((k) => (
                <polyline key={k} points={spark(c * 4 + r + k * 3.1, x + 8, y + 8, 96, 40)} fill="none" stroke={C.coral} strokeWidth={1} opacity={0.7} />
              ))}
            </g>
          </g>
        )
      }))}
    </Svg>
  )
}

/* ——— 5. Traces: propagación y sampling ——— */
const spans = [
  { name: 'frontend', op: 'GET /checkout', x0: 170, x1: 490 },
  { name: 'checkout', op: 'POST /order', x0: 192, x1: 470 },
  { name: 'payment', op: 'charge', x0: 240, x1: 408 },
  { name: 'payment-db', op: 'query', x0: 268, x1: 370 },
]
const taxonomy = ['no se generó', 'se muestreó', 'no se exportó', 'se descartó en pipeline', 'expiró por retención', 'no tengo permiso']

function TraceSampling({ step }: { step: number }) {
  const broken = step === 1
  const sampled = step === 2
  const spanTone = (i: number): Tone => (broken && i >= 2 ? 'coral' : sampled ? 'neutral' : 'teal')
  return (
    <Svg h={330} label="Waterfall de un trace: la propagación rota separa spans y el sampling descarta el trace aunque la petición existió">
      <T x={20} y={22} size={10} tone="muted" anchor="start" weight={800}>WATERFALL DEL TRACE</T>
      <g className={show(!sampled)}>
        <Chip x={420} y={20} text={broken ? 'trace_id solo en 2 spans' : 'trace_id compartido'} tone={broken ? 'coral' : 'teal'} w={170} mono size={10} />
      </g>
      <line x1={170} x2={500} y1={44} y2={44} stroke={C.line} />
      {[0, 1, 2, 3, 4].map((k) => <line key={k} x1={170 + k * 82} x2={170 + k * 82} y1={40} y2={210} stroke={C.line} strokeDasharray="2 4" />)}
      {spans.map((s, i) => {
        const moved = broken && i >= 2
        const y = 58 + i * 38 + (moved ? 88 : 0)
        const t = toneColors[spanTone(i)]
        return (
          <g key={s.name} className={step === 3 ? 'sv-dim' : 'sv-in'} style={{ transform: `translateY(${y}px)` }}>
            <T x={20} y={16} size={11} anchor="start" mono weight={700} tone={moved ? 'coral' : 'navy'}>{s.name}</T>
            <rect x={s.x0} y={2} width={s.x1 - s.x0} height={22} rx={4} fill={t.fill} stroke={t.stroke} strokeWidth={1.5} strokeDasharray={sampled ? '5 4' : undefined} />
            <T x={s.x0 + 8} y={17} size={10} anchor="start" mono tone={moved ? 'coral' : 'ink'}>{s.op}</T>
          </g>
        )
      })}
      {/* Huecos cuando la propagación se rompe */}
      <g className={show(broken)}>
        {[2, 3].map((i) => <rect key={i} x={spans[i].x0} y={60 + i * 38} width={spans[i].x1 - spans[i].x0} height={22} rx={4} fill="none" stroke={C.coral} strokeDasharray="4 4" />)}
        <T x={430} y={146} size={10.5} tone="coral" weight={700} anchor="start">¿?</T>
        <T x={170} y={308} size={10.5} tone="coral" weight={700} anchor="start">sin trace context: no se une al trace original</T>
      </g>
      {/* Sampling */}
      <g className={show(sampled)}>
        <rect x={160} y={52} width={346} height={156} rx={8} fill="none" stroke={C.muted} strokeDasharray="6 5" />
        <Chip x={333} y={230} text="descartado por sampling" tone="neutral" solid w={190} />
        <Person x={40} y={260} tone="teal" scale={0.9} />
        <T x={60} y={262} size={11} anchor="start" weight={700} tone="teal">La petición sí ocurrió</T>
        <T x={60} y={278} size={10.5} anchor="start" tone="muted">pero su trace no se conserva</T>
      </g>
      {/* Panel derecho */}
      <rect x={526} y={16} width={220} height={300} rx={10} fill={C.paperSoft} stroke={C.line} />
      <g className={show(step === 0)}>
        <T x={540} y={44} size={12} anchor="start" weight={800} tone="teal">Trace completo</T>
        <T x={540} y={66} size={10.5} anchor="start" tone="muted">Los spans de varios servicios</T>
        <T x={540} y={81} size={10.5} anchor="start" tone="muted">se unen solo si el contexto</T>
        <T x={540} y={96} size={10.5} anchor="start" tone="muted">se transmite y exportan</T>
        <T x={540} y={111} size={10.5} anchor="start" tone="muted">datos compatibles.</T>
      </g>
      <g className={show(step === 1)}>
        <T x={540} y={44} size={12} anchor="start" weight={800} tone="coral">Propagación rota</T>
        <T x={540} y={66} size={10.5} anchor="start" tone="muted">payment no recibe el trace</T>
        <T x={540} y={81} size={10.5} anchor="start" tone="muted">context: sus spans no</T>
        <T x={540} y={96} size={10.5} anchor="start" tone="muted">aparecen bajo checkout.</T>
      </g>
      <g className={show(step === 2)}>
        <T x={540} y={44} size={12} anchor="start" weight={800} tone="amber">Sampling</T>
        <T x={540} y={66} size={10.5} anchor="start" tone="muted">La fuente o el collector</T>
        <T x={540} y={81} size={10.5} anchor="start" tone="muted">muestrea: la ausencia del</T>
        <T x={540} y={96} size={10.5} anchor="start" tone="muted">span no prueba que la</T>
        <T x={540} y={111} size={10.5} anchor="start" tone="muted">petición no existiera.</T>
      </g>
      <g className={show(step === 3)}>
        <T x={540} y={44} size={12} anchor="start" weight={800} tone="navy">¿Por qué falta?</T>
        {taxonomy.map((item, i) => (
          <g key={item}>
            <circle cx={548} cy={70 + i * 34} r={9} fill="#fff" stroke={C.navy} strokeWidth={1.4} />
            <T x={548} y={74 + i * 34} size={10} weight={800} tone="navy">{i + 1}</T>
            <T x={564} y={74 + i * 34} size={11} anchor="start">{item}</T>
          </g>
        ))}
        <T x={540} y={290} size={10.5} anchor="start" tone="coral" weight={700}>Descártalo antes de</T>
        <T x={540} y={305} size={10.5} anchor="start" tone="coral" weight={700}>cambiar la query.</T>
      </g>
      <g className={show(step === 3)}>
        <T x={260} y={262} size={12} weight={800} tone="navy">Taxonomía de ausencias</T>
        <T x={260} y={282} size={10.5} tone="muted">el problema puede estar antes de la consulta</T>
      </g>
    </Svg>
  )
}

/* ——— 6. Logs: timestamp del evento frente a ingestión ——— */
const hours = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30']
const tx = (min: number) => 50 + (min / 150) * 620 // 0..150 min desde 09:00
const logChain = [
  { label: 'Fuente', sub: 'archivo / endpoint' },
  { label: 'Parser / DPL', sub: 'campos resultantes' },
  { label: 'OpenPipeline', sub: 'matcher · orden' },
  { label: 'Bucket', sub: 'retención' },
  { label: 'Query', sub: 'permisos del lector' },
]

function LogTimestamps({ step }: { step: number }) {
  const eventMin = 12
  const ingestMin = 16
  const wrongMin = 132
  const docMin = step >= 2 ? wrongMin : step >= 1 ? ingestMin : eventMin
  return (
    <Svg h={330} label="Línea de tiempo con timestamp del evento, timestamp de ingestión y timeframe de la query, y la cadena parser, OpenPipeline, bucket y query">
      <T x={20} y={22} size={10} tone="muted" anchor="start" weight={800}>LÍNEA DE TIEMPO</T>
      {/* Timeframe de la query */}
      <rect x={tx(0)} y={34} width={tx(60) - tx(0)} height={92} rx={6} fill={C.tealTint} stroke={C.teal} strokeDasharray="5 4" />
      <T x={tx(30)} y={50} size={10.5} weight={700} tone="teal">timeframe de la query</T>
      <line x1={tx(0) - 10} x2={tx(150) + 10} y1={132} y2={132} stroke={C.navy} strokeWidth={2} />
      {hours.map((h, i) => (
        <g key={h}>
          <line x1={tx(i * 30)} x2={tx(i * 30)} y1={128} y2={136} stroke={C.navy} strokeWidth={1.5} />
          <T x={tx(i * 30)} y={152} size={10} mono tone="muted">{h}</T>
        </g>
      ))}
      {/* Timestamp del evento */}
      <g>
        <line x1={tx(eventMin)} x2={tx(eventMin)} y1={106} y2={132} stroke={C.amber} strokeWidth={2} />
        <circle cx={tx(eventMin)} cy={132} r={5} fill={C.amber} />
        <T x={tx(eventMin) - 5} y={121} size={10.5} weight={700} tone="amber" anchor="end">evento</T>
      </g>
      <g className={show(step >= 1)}>
        <line x1={tx(ingestMin)} x2={tx(ingestMin)} y1={106} y2={132} stroke={C.violet} strokeWidth={2} />
        <circle cx={tx(ingestMin)} cy={132} r={5} fill={C.violet} />
        <T x={tx(ingestMin) + 6} y={121} size={10.5} weight={700} tone="violet" anchor="start">ingestión</T>
      </g>
      {/* Registro */}
      <g style={{ transform: `translateX(${tx(docMin) - 22}px)` }}>
        <Doc x={0} y={60} w={34} h={42} tone={step >= 2 ? 'coral' : 'teal'} />
      </g>
      <g className={show(step >= 2)}>
        <Arrow d={`M${tx(eventMin) + 30},${76} C${tx(60)},${58} ${tx(110)},${58} ${tx(wrongMin) - 28},${76}`} tone="coral" dashed />
        <T x={312} y={88} size={10.5} weight={700} tone="coral" anchor="start">timestamp mal interpretado:</T>
        <T x={312} y={104} size={11} weight={700} tone="coral" anchor="start">el registro existe, pero</T>
        <T x={312} y={120} size={11} weight={700} tone="coral" anchor="start">fuera del timeframe</T>
      </g>
      <g className={show(step === 1)}>
        <T x={312} y={92} size={11} weight={700} tone="navy" anchor="start">dos momentos distintos del mismo registro</T>
      </g>
      <g className={show(step === 0)}>
        <T x={312} y={92} size={11} weight={700} tone="navy" anchor="start">cuándo ocurrió el evento en la fuente</T>
      </g>
      {/* Cadena */}
      <T x={20} y={190} size={10} tone="muted" anchor="start" weight={800}>RESTO DE LA CADENA</T>
      {logChain.map((stage, i) => {
        const x = 20 + i * 146
        return (
          <g key={stage.label} className={dim(step === 3)}>
            <Box x={x} y={204} w={130} h={54} label={stage.label} sub={stage.sub} tone={step === 3 ? 'teal' : 'navy'} size={12} />
            {i < logChain.length - 1 && <Arrow from={[x + 131, 231]} to={[x + 145, 231]} tone="teal" />}
          </g>
        )
      })}
      <g className={show(step === 3)}>
        <Particle path="M20,231 L740,231" dur={4} tone="teal" r={5} />
        <T x={380} y={290} size={11.5} weight={700} tone="navy">Un campo dentro del mensaje no es un campo estructurado de consulta</T>
        <T x={380} y={310} size={10.5} tone="muted">Prueba con una muestra conocida y conserva contenido, timestamp y record type.</T>
      </g>
    </Svg>
  )
}

/* ——— 7. Log Ingest API y Syslog ——— */
const payloadLines: { text: string; tone: 'white' | 'teal' | 'amber' }[] = [
  { text: 'HTTP POST  → Log ingestion API', tone: 'white' },
  { text: 'Authorization: Api-Token <token>', tone: 'amber' },
  { text: '  token con scope logs.ingest', tone: 'amber' },
  { text: 'Content-Type: application/json', tone: 'white' },
  { text: 'Content-Encoding: gzip', tone: 'teal' },
  { text: '[ { registro 1 },', tone: 'white' },
  { text: '  { registro 2 },', tone: 'white' },
  { text: '  … ≤ 50.000 records, ≤ 10 MB ]', tone: 'teal' },
]

function LogIngestApi() {
  return (
    <Svg h={340} label="Payload de la Log ingestion API con token logs.ingest, gzip y hasta 50.000 records o 10 MB; Syslog por ActiveGate en 514/UDP y 601/TCP">
      <T x={20} y={22} size={10} tone="muted" anchor="start" weight={800}>SOLICITUD HTTP</T>
      <rect x={20} y={32} width={300} height={196} rx={8} fill={C.navy} />
      {payloadLines.map((line, i) => (
        <T key={line.text} x={34} y={58 + i * 22} size={10.5} mono anchor="start" tone={line.tone === 'white' ? 'white' : line.tone} style={{ fill: line.tone === 'teal' ? '#6fe0d2' : line.tone === 'amber' ? '#f2c562' : '#fff' }}>{line.text}</T>
      ))}
      {/* Resultados */}
      <Arrow d="M322,100 C370,100 380,72 420,72" tone="teal" flow />
      <Arrow d="M322,160 C370,160 380,188 420,188" tone="coral" flow />
      <T x={372} y={62} size={10.5} weight={700} tone="teal">dentro del límite</T>
      <T x={372} y={208} size={10.5} weight={700} tone="coral">excede el límite</T>
      <Box x={424} y={46} w={130} h={52} label="Aceptado" sub="payload válido" tone="teal" solid size={13} />
      <Box x={424} y={162} w={130} h={52} label="HTTP 413" sub="Payload Too Large" tone="coral" solid size={13} />
      <Arrow from={[556, 72]} to={[578, 72]} tone="navy" />
      <rect x={582} y={30} width={164} height={112} rx={8} fill="#fff" stroke={C.navy} strokeDasharray="5 4" />
      <T x={664} y={50} size={10.5} weight={800} tone="navy">Aún falta demostrar</T>
      {['OpenPipeline', 'bucket y retención', 'permisos', 'query'].map((s, i) => (
        <T key={s} x={664} y={72 + i * 18} size={10.5} tone="muted">{s}</T>
      ))}
      <T x={664} y={176} size={11} weight={700} tone="coral">413 no es reintentable:</T>
      <T x={664} y={192} size={11} weight={700} tone="coral">divide el lote</T>
      {/* Syslog */}
      <line x1={20} x2={746} y1={248} y2={248} stroke={C.line} />
      <T x={20} y={270} size={10} tone="muted" anchor="start" weight={800}>SYSLOG DE RED</T>
      <Box x={20} y={282} w={150} h={44} label="Dispositivos de red" tone="neutral" size={11.5} />
      <Chip x={272} y={304} text="514/UDP · 601/TCP" tone="amber" w={150} />
      <Box x={374} y={282} w={150} h={44} label="Environment AG" sub="Linux · syslog on" tone="teal" solid size={12} />
      <Box x={596} y={282} w={150} h={44} label="Dynatrace" tone="navy" solid size={12.5} />
      <Arrow from={[172, 304]} to={[196, 304]} tone="neutral" />
      <Arrow from={[348, 304]} to={[372, 304]} tone="neutral" />
      <Arrow from={[526, 304]} to={[594, 304]} tone="teal" flow />
      <Particle path="M172,304 L372,304" dur={2.2} tone="amber" r={4} />
      <Particle path="M526,304 L594,304" dur={1.4} begin={1} tone="teal" r={4} />
    </Svg>
  )
}


/* ——— Pipeline groups: orden de la composición y memberStages ——— */
function PipelineGroupComposition({ step }: { step: number }) {
  const recordX = [70, 125, 380, 635, 380][step]
  const active = (i: number) => (step === 0 || step === 4 ? true : step - 1 === i)
  return (
    <Svg h={300} label="Composición de un pipeline group: base pipeline antes del placeholder, member pipelines en el placeholder y base pipeline después">
      <T x={20} y={22} size={10.5} tone="muted" anchor="start" weight={800}>COMPOSICIÓN DEL PIPELINE GROUP (orden de ejecución →)</T>
      <g style={{ transform: `translateX(${recordX}px)` }}>
        <rect x={-36} y={34} width={72} height={24} rx={6} fill={C.tealTint} stroke={C.teal} strokeWidth={1.5} />
        <T x={0} y={50} size={10.5} weight={800} tone="teal">registro</T>
      </g>
      <g className={dim(active(0))}>
        <Box x={20} y={72} w={210} h={64} label="Base: global-permissions" sub="antes del placeholder" tone="navy" size={12.5} />
      </g>
      <Arrow from={[232, 104]} to={[272, 104]} tone="teal" flow />
      <g className={dim(active(1))}>
        <rect x={275} y={72} width={210} height={64} rx={8} fill={C.tealTint} stroke={C.teal} strokeWidth={1.5} strokeDasharray="6 4" />
        <T x={380} y={100} size={12.5} weight={800} tone="teal">Placeholder</T>
        <T x={380} y={118} size={10.5} tone="muted">member pipelines</T>
      </g>
      <Arrow from={[487, 104]} to={[527, 104]} tone="teal" flow />
      <g className={dim(active(2))}>
        <Box x={530} y={72} w={210} h={64} label="Base: global-cost" sub="después del placeholder" tone="navy" size={12.5} />
      </g>
      <g className={dim(step === 2 || step === 4 || step === 0)}>
        <Arrow from={[330, 176]} to={[350, 140]} tone="neutral" dashed head={false} />
        <Arrow from={[430, 176]} to={[410, 140]} tone="neutral" dashed head={false} />
        <Box x={262} y={178} w={110} h={46} label="Equipo A" sub="member pipeline" tone="violet" size={12} />
        <Box x={388} y={178} w={110} h={46} label="Equipo B" sub="member pipeline" tone="violet" size={12} />
      </g>
      <g className={show(step === 4)}>
        <Chip x={380} y={250} text="memberStages: Permission excluida en miembros" tone="coral" w={330} />
        <T x={380} y={280} size={11} tone="muted">Si base y miembro tienen la misma etapa activa, se ejecutan ambas</T>
      </g>
      <g className={show(step === 1)}>
        <T x={125} y={168} size={11} weight={700} tone="navy">1.º: Permission global</T>
      </g>
      <g className={show(step === 3)}>
        <T x={635} y={168} size={11} weight={700} tone="navy">3.º: se ejecuta al final</T>
      </g>
    </Svg>
  )
}

export const ingestionVisuals: VisualRegistry = {
  'data-path': {
    kind: 'animation',
    title: 'Una pantalla vacía puede nacer en cualquier etapa',
    caption: 'Sigue una muestra concreta etapa a etapa. En el ejemplo el origen genera el dato y el canal lo envía, pero el token no tiene el scope necesario: la query devuelve 0 registros aunque el dato existió. Cambiar la consulta no arregla un fallo de Auth.',
    steps: ['Origen: ¿se generó? ✓', 'Canal: ¿se envió? ✓', 'Auth: token sin scope ✗', 'Query vacía: falta evidencia', 'Scope corregido: todo demostrado'],
    stepMs: 2600,
    render: ({ step }) => <DataPath step={step} />,
  },
  'deep-openpipeline': {
    kind: 'animation',
    title: 'OpenPipeline: el routing va antes del procesado',
    caption: 'Los registros entran por una ingest source; el routing envía cada uno a una pipeline (la primera ruta que coincide o la Default route). Dentro de la pipeline, el stage Processing extrae con DPL, enmascara PII o descarta (drop), y el stage Bucket assignment decide el bucket: default_logs o uno custom.',
    steps: ['Ingest source: llegan los records', 'Routing: cada record a su pipeline', 'Processing: DPL, masking y drop', 'Bucket assignment: bucket de destino'],
    stepMs: 2800,
    render: ({ step }) => <OpenPipeline step={step} />,
  },
  mechanisms: {
    kind: 'animation',
    title: 'Cuatro caminos hacia Dynatrace',
    caption: 'Cada mecanismo encaja con un origen distinto y tiene su propia comprobación crítica (en ámbar). La mejor elección no es la que tiene más funciones, sino la que cubre cobertura, contexto, red, credenciales, volumen y soporte.',
    render: () => <Mechanisms />,
  },
  'metric-ingestion': {
    kind: 'animation',
    title: 'Cada dimensión multiplica las series',
    caption: 'Una métrica genera una serie por cada combinación de valores de sus dimensiones. host y endpoint multiplican de forma controlada; una dimensión como user_id dispara la cardinalidad, con impacto en coste, rendimiento y utilidad.',
    steps: ['Métrica sin dimensiones: 1 serie', '× host: 3 series', '× endpoint: 12 series', '× user_id: explosión de series'],
    stepMs: 2600,
    render: ({ step }) => <Cardinality step={step} />,
  },
  'trace-ingestion': {
    kind: 'animation',
    title: 'Que falte un span no prueba que no hubo petición',
    caption: 'Un trace une spans de varios servicios solo si el trace context se propaga. Si la propagación se rompe, los spans quedan fuera del trace; si el sampling descarta el trace, la petición ocurrió igualmente. Separa las causas antes de modificar la query.',
    steps: ['Trace completo', 'Propagación de contexto rota', 'Sampling: trace descartado', 'Taxonomía de ausencias'],
    stepMs: 2800,
    render: ({ step }) => <TraceSampling step={step} />,
  },
  'log-ingestion': {
    kind: 'animation',
    title: 'El registro existe, pero ¿en qué momento?',
    caption: 'Timestamp del evento y timestamp de ingestión son momentos distintos. Si el timestamp se interpreta mal, el registro existe pero cae fuera del timeframe consultado. Después, parser, OpenPipeline, bucket y permisos deciden qué puedes consultar.',
    steps: ['Timestamp del evento', 'Timestamp de ingestión', 'Timestamp mal interpretado', 'Parser → OpenPipeline → bucket → query'],
    stepMs: 2800,
    render: ({ step }) => <LogTimestamps step={step} />,
  },
  'deep-ingestion-lifecycle': {
    kind: 'animation',
    title: 'Log ingestion API: aceptado no es consultable',
    caption: 'Cada petición admite hasta 10 MB y 50.000 log records, con gzip y un token con scope logs.ingest (o un platform token con openpipeline:logs:ingest); si se supera, la API responde 413. Aceptar el payload es solo una etapa. Abajo, syslog de red entra por un Environment ActiveGate en 514/UDP o 601/TCP.',
    render: () => <LogIngestApi />,
  },
  'sup-op-groups-access': {
    kind: 'animation',
    title: 'La composición fija el orden: base, miembros, base',
    caption: 'Sigue el registro: la base pipeline situada antes del placeholder se ejecuta primero, el member pipeline del equipo en la posición del placeholder y la base situada después, al final. Si una etapa está activa en la base y en el miembro, se ejecutan ambas; por eso memberStages permite excluir Permission en los miembros.',
    steps: ['Composición: base · placeholder · base', 'Base antes del placeholder: primero', 'Member pipeline en el placeholder', 'Base después del placeholder: al final', 'memberStages excluye Permission'],
    stepMs: 2800,
    render: ({ step }) => <PipelineGroupComposition step={step} />,
  },
}
