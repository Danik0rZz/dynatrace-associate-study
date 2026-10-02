import { Arrow, Box, C, Chip, Cylinder, Mark, Person, Svg, T, cx, dim, show, toneColors, type Tone } from './kit'
import type { VisualRegistry } from './types'

/* ——— 1. Timeframe, granularidad y dimensiones ——— */
const MINUTES = 330 // datos hasta "to" = 5 h 30 min
const HOUR_W = 80
const CX0 = 50
const CY0 = 232
const mx = (m: number) => CX0 + (m * HOUR_W) / 60
const vy = (v: number) => CY0 - v * 1.35
const noise = (i: number) => Math.sin(i * 12.9898) * 43758.5453 - Math.floor(Math.sin(i * 12.9898) * 43758.5453)
const base = Array.from({ length: MINUTES }, (_, i) => 46 + 8 * Math.sin(i / 55) + (noise(i) - 0.5) * 14)
const spike = (i: number) => (i >= 196 && i < 203 ? 72 : 0)
const regionA = base.map((v) => v * 0.55)
const regionB = base.map((v, i) => v * 0.45 + spike(i))
const total = base.map((v, i) => v + spike(i))
const poly = (vals: number[]) => vals.map((v, i) => `${mx(i).toFixed(1)},${vy(v).toFixed(1)}`).join(' ')
const hourly = Array.from({ length: 6 }, (_, h) => {
  const slice = total.slice(h * 60, Math.min(MINUTES, h * 60 + 60))
  return { h, avg: slice.reduce((a, b) => a + b, 0) / slice.length, n: slice.length, sum: slice.reduce((a, b) => a + b, 0) }
})

function Timeframes({ step }: { step: number }) {
  const meaning = [
    { big: '1 minuto', sub: '330 puntos en el periodo', note: 'el pico de 7 min se ve' },
    { big: '1 hora', sub: '6 puntos (media por hora)', note: 'el mismo pico se diluye' },
    { big: '1 min · región', sub: 'una serie por dimensión', note: 'el pico es solo de B' },
    { big: '1 h · suma', sub: 'count por hora', note: 'última hora incompleta' },
  ][step]
  return (
    <Svg h={290} label="Los mismos datos por minuto, por hora, por región y con la última ventana incompleta">
      {/* Ejes */}
      <line x1={CX0} x2={CX0 + 6 * HOUR_W} y1={CY0} y2={CY0} stroke={C.soft} />
      {Array.from({ length: 7 }, (_, h) => (
        <g key={h}>
          <line x1={mx(h * 60)} x2={mx(h * 60)} y1={46} y2={CY0} stroke={C.line} strokeDasharray="2 4" />
          <T x={mx(h * 60)} y={CY0 + 16} size={10} tone="muted">{`${h} h`}</T>
        </g>
      ))}
      <Chip x={CX0 + 14} y={24} text="from" tone="navy" mono size={10.5} w={46} />
      <Chip x={mx(MINUTES)} y={24} text="to" tone="navy" mono size={10.5} w={36} />
      <line x1={mx(MINUTES)} x2={mx(MINUTES)} y1={36} y2={CY0} stroke={C.navy} strokeWidth={1.5} />
      <T x={(CX0 + 14 + mx(MINUTES)) / 2} y={28} size={10.5} tone="muted">periodo consultado</T>
      {/* Por minuto (total) */}
      <polyline points={poly(total)} fill="none" stroke={C.navy} strokeWidth={1.3} className={step === 0 ? 'sv-in' : step === 1 ? 'sv-dim' : 'sv-out'} />
      <g className={show(step === 0)}>
        <circle cx={mx(199)} cy={vy(total[199]) - 2} r={14} fill="none" stroke={C.coral} strokeWidth={2} className="sv-ping" />
      </g>
      {/* Por hora (media) */}
      <g className={show(step === 1)}>
        <polyline points={hourly.map((p) => `${mx(p.h * 60 + 30)},${vy(p.avg)}`).join(' ')} fill="none" stroke={C.teal} strokeWidth={3} />
        {hourly.map((p) => <circle key={p.h} cx={mx(p.h * 60 + 30)} cy={vy(p.avg)} r={6} fill="#fff" stroke={C.teal} strokeWidth={2.5} />)}
      </g>
      {/* Por región */}
      <g className={show(step === 2)}>
        <polyline points={poly(regionA)} fill="none" stroke={C.teal} strokeWidth={1.4} />
        <polyline points={poly(regionB)} fill="none" stroke={C.violet} strokeWidth={1.4} />
        <Chip x={mx(40)} y={vy(regionA[40]) - 22} text="región A" tone="teal" size={10.5} w={70} />
        <Chip x={mx(150)} y={vy(regionB[150]) + 26} text="región B" tone="violet" size={10.5} w={70} />
      </g>
      {/* Suma por hora con la última ventana incompleta */}
      <g className={show(step === 3)}>
        {hourly.map((p) => {
          const hgt = (p.sum / 60) * 1.35 * 0.9
          const full = (p.avg * 60 * 1.35 * 0.9) / 60
          const x = mx(p.h * 60) + 8
          const partial = p.n < 60
          return (
            <g key={p.h}>
              {partial && <rect x={x} y={CY0 - full} width={HOUR_W - 16} height={full} rx={3} fill="none" stroke={C.coral} strokeDasharray="4 4" />}
              <rect x={x} y={CY0 - hgt} width={HOUR_W - 16} height={hgt} rx={3} fill={partial ? C.coral : C.teal} opacity={0.75} />
            </g>
          )
        })}
        <T x={mx(330) - 8} y={CY0 - 116} size={10.5} tone="coral" weight={750} anchor="end">¿caída? no:</T>
        <T x={mx(330) - 8} y={CY0 - 102} size={10.5} tone="coral" weight={750} anchor="end">faltan 30 min</T>
      </g>
      {/* Panel: qué significa cada punto */}
      <rect x={560} y={46} width={186} height={186} rx={10} fill={C.paperSoft} stroke={C.line} />
      <T x={653} y={70} size={10} weight={800} tone="muted">CADA PUNTO / BARRA =</T>
      <T x={653} y={104} size={19} weight={800} tone="navy">{meaning.big}</T>
      <T x={653} y={128} size={10.5} tone="muted">{meaning.sub}</T>
      <line x1={580} x2={726} y1={148} y2={148} stroke={C.line} />
      <T x={653} y={176} size={11} weight={750} tone={step === 0 ? 'navy' : 'coral'}>{meaning.note}</T>
      <T x={653} y={206} size={10} tone="muted">mismos datos, otra lectura</T>
      <T x={CX0} y={CY0 + 40} size={10.5} tone="muted" anchor="start">Serie de ejemplo: requests por minuto durante 5 h 30 min.</T>
    </Svg>
  )
}

/* ——— 2. Correlación frente a causalidad ——— */
const corrN = 40
const latency = Array.from({ length: corrN }, (_, i) => 30 + (i > 22 ? (i - 22) * 3.2 : 0) + (noise(i + 7) - 0.5) * 8)
const dbErr = Array.from({ length: corrN }, (_, i) => 18 + (i > 21 ? (i - 21) * 2.6 : 0) + (noise(i + 91) - 0.5) * 7)
const cpx = (i: number) => 34 + i * 8.4
const cpoly = (vals: number[]) => vals.map((v, i) => `${cpx(i).toFixed(1)},${(172 - v * 1.25).toFixed(1)}`).join(' ')
const confidence = [
  { level: 1, text: 'baja: solo coincidencia en el tiempo' },
  { level: 1, text: 'baja: hipótesis aún sin comprobar' },
  { level: 2, text: 'media: una señal independiente la apoya' },
  { level: 3, text: 'alta: señal + entidad + dependencia' },
  { level: 3, text: 'alta, con la siguiente comprobación' },
]

function Correlation({ step }: { step: number }) {
  const conf = confidence[step]
  return (
    <Svg h={340} label="De dos curvas correlacionadas a una conclusión con nivel de confianza: hipótesis, segunda señal y dependencia">
      {/* 1. Observación */}
      <g className={dim(step === 0 || step === 4)}>
        <T x={20} y={22} size={10} weight={800} tone="muted" anchor="start">1 · OBSERVACIÓN</T>
        <rect x={20} y={32} width={350} height={152} rx={8} fill="#fff" stroke={C.line} />
        <rect x={cpx(22)} y={36} width={cpx(39) - cpx(22)} height={144} fill={C.amberTint} />
        <polyline points={cpoly(latency)} fill="none" stroke={C.navy} strokeWidth={2} />
        <polyline points={cpoly(dbErr)} fill="none" stroke={C.coral} strokeWidth={2} />
        <T x={30} y={52} size={10.5} weight={750} tone="navy" anchor="start">latencia del servicio</T>
        <T x={30} y={67} size={10.5} weight={750} tone="coral" anchor="start">errores de base de datos</T>
        <T x={cpx(30)} y={52} size={10.5} weight={750} tone="amber">suben a la vez</T>
      </g>
      {/* 2. Hipótesis */}
      <g className={cx(show(step >= 1), step >= 1 && step !== 1 && step !== 4 ? 'sv-dim' : undefined)}>
        <T x={396} y={22} size={10} weight={800} tone="muted" anchor="start">2 · HIPÓTESIS FALSABLE</T>
        <rect x={396} y={32} width={344} height={62} rx={8} fill={C.amberTint} stroke={C.amber} />
        <T x={410} y={55} size={11.5} weight={800} tone="amber" anchor="start">«La base de datos ralentiza el servicio»</T>
        <T x={410} y={76} size={10.5} tone="muted" anchor="start">Si es cierta, las trazas lentas pasan por la DB.</T>
      </g>
      {/* 3. Segunda señal: trace */}
      <g className={cx(show(step >= 2), step >= 2 && step !== 2 && step !== 4 ? 'sv-dim' : undefined)}>
        <T x={396} y={116} size={10} weight={800} tone="muted" anchor="start">3 · SEGUNDA SEÑAL INDEPENDIENTE (TRACE)</T>
        <rect x={396} y={126} width={344} height={82} rx={8} fill="#fff" stroke={C.line} />
        {[
          { label: 'Service', x: 486, w: 240, tone: 'navy' as Tone },
          { label: 'auth', x: 492, w: 30, tone: 'teal' as Tone },
          { label: 'DB query', x: 526, w: 190, tone: 'coral' as Tone },
        ].map((s, i) => (
          <g key={s.label}>
            <T x={408} y={146 + i * 22} size={10.5} mono anchor="start">{s.label}</T>
            <rect x={s.x} y={136 + i * 22} width={s.w} height={14} rx={3} fill={toneColors[s.tone].solid} opacity={0.8} />
          </g>
        ))}
      </g>
      {/* 4. Entidad y dependencia */}
      <g className={cx(show(step >= 3), step !== 3 && step !== 4 ? 'sv-dim' : undefined)}>
        <T x={20} y={214} size={10} weight={800} tone="muted" anchor="start">4 · ENTIDAD Y DEPENDENCIA</T>
        <Box x={20} y={226} w={110} h={40} label="Service" tone="navy" size={12} />
        <Box x={168} y={226} w={110} h={40} label="Database" tone="coral" solid size={12} />
        <Arrow from={[132, 246]} to={[166, 246]} tone="coral" flow />
        <T x={149} y={238} size={10} tone="muted">calls</T>
        <Box x={296} y={226} w={74} h={40} label="Host" tone="neutral" size={12} />
        <Arrow from={[280, 246]} to={[294, 246]} tone="neutral" />
        <T x={20} y={298} size={10.5} tone="muted" anchor="start">¿Causa, consecuencia o ruido? La CPU del</T>
        <T x={20} y={313} size={10.5} tone="muted" anchor="start">host también podría estar implicada.</T>
      </g>
      {/* 5. Conclusión y confianza */}
      <T x={396} y={232} size={10} weight={800} tone="muted" anchor="start">NIVEL DE CONFIANZA</T>
      {[0, 1, 2].map((i) => (
        <rect key={i} x={396 + i * 116} y={242} width={110} height={14} rx={4} fill={i < conf.level ? (conf.level === 1 ? C.coral : conf.level === 2 ? C.amber : C.teal) : C.paperSoft} stroke={C.line} />
      ))}
      <T x={396} y={276} size={11} weight={750} tone={conf.level === 1 ? 'coral' : conf.level === 2 ? 'amber' : 'teal'} anchor="start">{conf.text}</T>
      <g className={show(step === 4)}>
        <rect x={396} y={288} width={344} height={42} rx={8} fill={C.tealTint} stroke={C.teal} />
        <T x={408} y={305} size={10.5} weight={750} tone="teal" anchor="start">Comunica: observación, evidencia y confianza.</T>
        <T x={408} y={321} size={10.5} tone="muted" anchor="start">Siguiente: consultas, saturación o deploy.</T>
      </g>
    </Svg>
  )
}

/* ——— 3. Retención en Grail (escala logarítmica) ——— */
const DAY = 1
const MONTH = 30.4
const YEAR = 365
const L0 = Math.log10(7)
const L1 = Math.log10(10 * YEAR)
const RX0 = 250
const RX1 = 726
const rx = (days: number) => RX0 + ((Math.log10(days) - L0) / (L1 - L0)) * (RX1 - RX0)
type RetRow = { name: string; sub: string; def: number; defLabel: string; max?: number; maxLabel?: string; range?: boolean; tone: Tone }
const retention: RetRow[] = [
  { name: 'default_logs', sub: 'bucket integrado, no editable', def: 35 * DAY, defLabel: '35 días (fijo)', max: 10 * YEAR, maxLabel: 'bucket personalizado de logs: hasta 10 años', tone: 'teal' },
  { name: 'Metrics powered by Grail', sub: 'resolución de 1 min', def: 15 * MONTH, defLabel: '15 meses incluidos', max: 10 * YEAR, maxLabel: 'hasta 10 años', tone: 'navy' },
  { name: 'default_securityevents_builtin', sub: 'integrado · security events de Dynatrace', def: 3 * YEAR, defLabel: '3 años (fijo)', tone: 'coral' },
  { name: 'default_securityevents', sub: 'integrado · security events de terceros', def: YEAR, defLabel: '1 año (fijo)', tone: 'coral' },
  { name: 'Davis Problems / Events', sub: 'independiente de los logs', def: 14 * MONTH, defLabel: '14 meses', tone: 'violet' },
  { name: 'default_spans', sub: 'integrado · distributed traces', def: 10 * DAY, defLabel: '10 días (fijo)', max: 10 * YEAR, maxLabel: 'bucket personalizado de spans: hasta 10 años', tone: 'amber' },
]
const ticks = [
  { d: 10, label: '10 días' },
  { d: 30.4, label: '1 mes' },
  { d: 365, label: '1 año' },
  { d: 3 * 365, label: '3 años' },
  { d: 3650, label: '10 años' },
]

function Retention() {
  return (
    <Svg h={402} label="Retención por defecto y máxima de default_logs, Metrics powered by Grail, default_securityevents_builtin, default_securityevents, Davis Problems/Events y default_spans en escala logarítmica">
      <T x={20} y={20} size={10} weight={800} tone="muted" anchor="start">BUCKET / DATO</T>
      <T x={RX0} y={20} size={10} weight={800} tone="muted" anchor="start">RETENCIÓN (ESCALA LOGARÍTMICA)</T>
      {ticks.map((t) => (
        <g key={t.label}>
          <line x1={rx(t.d)} x2={rx(t.d)} y1={30} y2={334} stroke={C.line} strokeDasharray="3 4" />
          <T x={rx(t.d)} y={350} size={10.5} tone="muted" weight={700}>{t.label}</T>
        </g>
      ))}
      <line x1={RX0} x2={RX1} y1={334} y2={334} stroke={C.soft} />
      {retention.map((r, i) => {
        const y = 40 + i * 50
        const t = toneColors[r.tone]
        const xd = rx(r.def)
        const labelRight = xd - RX0 > 190
        return (
          <g key={r.name}>
            <T x={20} y={y + 20} size={11.5} weight={800} anchor="start" mono={!r.name.includes(' ')} tone="navy">{r.name}</T>
            <T x={20} y={y + 35} size={10} anchor="start" tone="muted">{r.sub}</T>
            {r.max && !r.range && (
              <g>
                <rect x={xd} y={y + 20} width={rx(r.max) - xd} height={16} rx={3} fill="#fff" stroke={t.stroke} strokeDasharray="4 3" />
                <T x={RX1} y={y + 14} size={10} tone="muted" anchor="end">{r.maxLabel}</T>
              </g>
            )}
            {r.range && r.max && <rect x={xd} y={y + 20} width={rx(r.max) - xd} height={16} rx={3} fill={t.fill} stroke={t.stroke} />}
            <rect x={RX0} y={y + 20} width={xd - RX0} height={16} rx={3} fill={t.solid} opacity={0.85} />
            <T x={labelRight ? (r.range && r.max ? rx(r.max) : xd) : xd + 6} y={y + 14} size={10.5} weight={750} tone={r.tone} anchor={labelRight ? 'end' : 'start'}>{r.defLabel}</T>
          </g>
        )
      })}
      <g>
        <rect x={20} y={366} width={120} height={14} rx={3} fill={C.slate} opacity={0.85} />
        <T x={146} y={377} size={10} tone="muted" anchor="start">por defecto / incluido</T>
        <rect x={270} y={366} width={50} height={14} rx={3} fill="#fff" stroke={C.slate} strokeDasharray="4 3" />
        <T x={326} y={377} size={10} tone="muted" anchor="start">ampliable</T>
        <Chip x={584} y={373} text="buckets personalizados: storage:bucket-definitions:write" tone="violet" mono size={9.5} w={340} />
      </g>
      <T x={20} y={398} size={10} tone="coral" weight={700} anchor="start">Acortar la retención de un bucket personalizado elimina los datos que superan el nuevo periodo.</T>
    </Svg>
  )
}

/* ——— 4. Muestreo y completitud ——— */
const COLS = 12
const ROWS = 6
const facts = Array.from({ length: COLS * ROWS }, (_, i) => {
  const col = i % COLS
  const row = Math.floor(i / COLS)
  const sampled = (col * 7 + row * 5) % 3 === 0
  const excluded = col >= 9 || row === 5
  return { i, col, row, sampled, excluded }
})
const nAll = facts.length
const nSampled = facts.filter((f) => f.sampled).length
const nFiltered = facts.filter((f) => f.sampled && !f.excluded).length

function Sampling({ step }: { step: number }) {
  const count = [nAll, nSampled, nFiltered, nFiltered][step]
  const checks = ['Cobertura de la fuente', 'Sampling o agregación', 'Filtros y exclusiones', 'Población incluida', 'Nivel de confianza']
  const checked = [1, 2, 3, 5][step]
  return (
    <Svg h={300} label="Población completa, muestra y filtros: un número exacto que representa solo una parte">
      <T x={20} y={22} size={10} weight={800} tone="muted" anchor="start">HECHOS REALES DEL PERIODO</T>
      <rect x={20} y={32} width={370} height={206} rx={10} fill="#fff" stroke={C.line} />
      {/* Zonas excluidas */}
      <g className={show(step >= 2)}>
        <rect x={20 + 9 * 28 + 18} y={36} width={3 * 28 + 4} height={198} rx={6} fill={C.coralTint} opacity={0.8} />
        <rect x={24} y={36 + 5 * 32 + 6} width={362} height={30} rx={6} fill={C.coralTint} opacity={0.8} />
        <T x={390} y={22} size={10} weight={750} tone="coral" anchor="end">timeframe incompleto ↓</T>
        <T x={20} y={254} size={10} weight={750} tone="coral" anchor="start">↑ regla de drop</T>
      </g>
      {facts.map((f) => {
        const inSample = step === 0 || f.sampled
        const counted = step === 0 ? true : step === 1 ? f.sampled : f.sampled && !f.excluded
        return (
          <circle
            key={f.i}
            cx={48 + f.col * 28}
            cy={58 + f.row * 32}
            r={8}
            fill={counted ? C.teal : '#fff'}
            stroke={counted ? C.teal : inSample ? C.coral : '#c8d4d1'}
            strokeWidth={1.5}
            strokeDasharray={counted ? undefined : '3 3'}
          />
        )
      })}
      <T x={205} y={276} size={10.5} tone="muted">
        {['● cada punto es un hecho real', '● capturado · ○ fuera de la muestra', '● contado · ○ excluido o no capturado', '● lo que tu número representa'][step]}
      </T>
      {/* Número exacto */}
      <rect x={420} y={32} width={320} height={112} rx={10} fill={step === 3 ? C.amberTint : C.paperSoft} stroke={step === 3 ? C.amber : C.line} />
      <T x={440} y={56} size={11} mono tone="teal" anchor="start" weight={700}>summarize count()</T>
      <T x={440} y={104} size={40} weight={800} tone="navy" anchor="start">{count}</T>
      <T x={530} y={90} size={11} tone="muted" anchor="start">{`de ${nAll} hechos reales`}</T>
      <T x={530} y={108} size={11} tone={step === 0 ? 'teal' : 'coral'} weight={750} anchor="start">{step === 0 ? 'población completa' : `${Math.round((count / nAll) * 100)} % de la población`}</T>
      <T x={440} y={132} size={10.5} tone={step === 3 ? 'amber' : 'muted'} weight={step === 3 ? 750 : 500} anchor="start">{step === 3 ? 'Exacto sobre una parte: di qué quedó fuera' : 'resultado de la consulta'}</T>
      {/* Checklist */}
      <T x={420} y={170} size={10} weight={800} tone="muted" anchor="start">ANTES DE CONCLUIR, COMPRUEBA</T>
      {checks.map((c, i) => (
        <g key={c} className={dim(i < checked)}>
          <Mark x={430} y={188 + i * 22} ok={i < checked} r={7} />
          <T x={444} y={192 + i * 22} size={10.5} anchor="start">{c}</T>
        </g>
      ))}
    </Svg>
  )
}

/* ——— 5. Baselines, anomalías e impacto ——— */
const bN = 48
const bx = (i: number) => 34 + i * 7
const baseline = Array.from({ length: bN }, (_, i) => 70 + 18 * Math.sin((i / bN) * Math.PI * 2 - 1))
const actual = baseline.map((v, i) => (i >= 38 ? v + 20 + (i - 38) * 6 : v + (noise(i + 3) - 0.5) * 14))
const by = (v: number) => 196 - v * 1.2
const questions = [
  { q: '¿Qué cambió?', e: ['métrica, log, trace', 'o event en timeframe'] },
  { q: '¿Por qué?', e: ['root-cause candidate', 'y dependencias'] },
  { q: '¿A quién afecta?', e: ['impact, entry points,', 'RUM y SLO'] },
  { q: '¿Qué hago?', e: ['siguiente comprobación', 'o Workflow autorizado'] },
]

function BaselinesImpact({ step }: { step: number }) {
  const upper = baseline.map((v) => v + 14)
  const lower = baseline.map((v) => v - 14)
  const band = `M${upper.map((v, i) => `${bx(i)},${by(v)}`).join(' L')} L${lower.map((v, i) => `${bx(i)},${by(v)}`).reverse().join(' L')} Z`
  return (
    <Svg h={346} label="Métrica con banda de baseline y una anomalía; cuatro preguntas con su evidencia: qué cambió, por qué, a quién afecta y qué hago">
      {/* Gráfico */}
      <g className={dim(step === 0)}>
        <T x={20} y={20} size={10} weight={800} tone="muted" anchor="start">MÉTRICA FRENTE A BASELINE</T>
        <rect x={20} y={30} width={356} height={190} rx={8} fill="#fff" stroke={C.line} />
        <path d={band} fill={C.tealTint} stroke="none" />
        <polyline points={baseline.map((v, i) => `${bx(i)},${by(v)}`).join(' ')} fill="none" stroke={C.teal} strokeDasharray="4 4" strokeWidth={1.3} />
        <polyline points={actual.slice(0, 39).map((v, i) => `${bx(i)},${by(v)}`).join(' ')} fill="none" stroke={C.navy} strokeWidth={2} />
        <polyline points={actual.slice(38).map((v, i) => `${bx(i + 38)},${by(v)}`).join(' ')} fill="none" stroke={C.coral} strokeWidth={2.5} />
        <circle cx={bx(bN - 1)} cy={by(actual[bN - 1])} r={16} fill="none" stroke={C.coral} strokeWidth={2} className="sv-ping" />
        <T x={30} y={212} size={10} tone="teal" anchor="start" weight={700}>banda esperada (baseline)</T>
        <Chip x={bx(28)} y={46} text="anomalía → Davis event" tone="coral" size={10.5} />
      </g>
      {/* Topología */}
      <g className={dim(step === 1 || step === 2)}>
        <T x={400} y={20} size={10} weight={800} tone="muted" anchor="start">TOPOLOGÍA</T>
        <rect x={396} y={30} width={344} height={190} rx={8} fill="#fff" stroke={C.line} />
        <g className={dim(step !== 1)}>
          {[0, 1, 2].map((i) => <Person key={i} x={424} y={92 + i * 30} tone={step >= 2 ? 'coral' : 'navy'} scale={0.72} />)}
        </g>
        <Box x={448} y={96} w={88} h={40} label="Application" sub="entry point" tone={step >= 2 ? 'coral' : 'navy'} size={11} />
        <Box x={552} y={96} w={78} h={40} label="Service" tone="navy" size={11.5} />
        <Box x={646} y={96} w={84} h={40} label="Database" tone={step >= 1 ? 'coral' : 'navy'} solid={step >= 1} size={11.5} />
        <Arrow from={[538, 116]} to={[550, 116]} tone="navy" />
        <Arrow from={[632, 116]} to={[644, 116]} tone="navy" />
        <g className={show(step >= 1)}>
          <circle cx={688} cy={116} r={34} fill="none" stroke={C.coral} strokeWidth={1.5} className="sv-ping" />
          <Chip x={672} y={170} text="root-cause candidate" tone="coral" size={10.5} />
          <T x={672} y={198} size={10} tone="muted">anomalía ≠ causa segura</T>
        </g>
        <g className={show(step >= 2)}>
          <Chip x={492} y={170} text="SLO en riesgo" tone="amber" size={10.5} />
          <T x={410} y={62} size={10.5} tone="coral" weight={750} anchor="start">usuarios afectados (RUM)</T>
        </g>
      </g>
      {/* Preguntas */}
      {questions.map((q, i) => {
        const x = 20 + i * 182
        const active = i === step
        return (
          <g key={q.q} className={dim(i <= step)}>
            <rect x={x} y={240} width={172} height={96} rx={10} fill={active ? C.navy : '#fff'} stroke={active ? C.navy : C.line} strokeWidth={1.5} />
            <circle cx={x + 18} cy={260} r={10} fill={i <= step ? C.teal : '#fff'} stroke={C.teal} />
            <T x={x + 18} y={264} size={10.5} weight={800} tone={i <= step ? 'white' : 'teal'}>{i + 1}</T>
            <T x={x + 34} y={265} size={12.5} weight={800} tone={active ? 'white' : 'navy'} anchor="start">{q.q}</T>
            <T x={x + 14} y={296} size={10.5} tone={active ? 'white' : 'muted'} anchor="start">{q.e[0]}</T>
            <T x={x + 14} y={312} size={10.5} tone={active ? 'white' : 'muted'} anchor="start">{q.e[1]}</T>
          </g>
        )
      })}
    </Svg>
  )
}

/* ——— 6. Key Requests: niveles de evidencia ——— */
const levels = [
  { label: 'Detalle code-level', sub: 'investigación reciente', x: 596, tone: 'violet' as Tone, h: 18, dense: 3 },
  { label: 'Agregado de requests', sub: 'tendencia con menos detalle', x: 420, tone: 'teal' as Tone, h: 12, dense: 8 },
  { label: 'Historial métrico', sub: 'visión prolongada', x: 216, tone: 'navy' as Tone, h: 6, dense: 16 },
]

function KeyRequests() {
  const qx = 320
  return (
    <Svg h={250} label="Tres niveles de evidencia con ventanas distintas: detalle code-level reciente, agregado de requests e historial métrico prolongado">
      <T x={216} y={22} size={10.5} tone="muted" anchor="start" weight={700}>← pasado</T>
      <T x={726} y={22} size={10.5} tone="muted" anchor="end" weight={700}>ahora</T>
      <line x1={726} x2={726} y1={30} y2={196} stroke={C.navy} strokeWidth={2} />
      {levels.map((l, i) => {
        const y = 42 + i * 52
        const t = toneColors[l.tone]
        const reaches = l.x <= qx
        return (
          <g key={l.label}>
            <T x={20} y={y + 16} size={12} weight={800} anchor="start" tone={l.tone}>{l.label}</T>
            <T x={20} y={y + 32} size={10.5} anchor="start" tone="muted">{l.sub}</T>
            <rect x={l.x} y={y + 4} width={726 - l.x} height={32} rx={6} fill={t.fill} stroke={t.stroke} />
            {Array.from({ length: Math.floor((726 - l.x - 12) / l.dense) }, (_, k) => (
              <line key={k} x1={l.x + 8 + k * l.dense} x2={l.x + 8 + k * l.dense} y1={y + 20 - l.h / 2} y2={y + 20 + l.h / 2} stroke={t.solid} strokeOpacity={0.55} strokeWidth={1.2} />
            ))}
            <Mark x={qx} y={y + 20} ok={reaches} r={9} className={cx('sv-pulse')} />
          </g>
        )
      })}
      <line x1={qx} x2={qx} y1={30} y2={196} stroke={C.amber} strokeWidth={1.5} strokeDasharray="5 4" />
      <Chip x={qx} y={210} text="«stack trace de hace meses»" tone="amber" size={10.5} />
      <T x={380} y={240} size={10.5} tone="muted">La densidad de trazos indica el detalle; la longitud, cuánto atrás llega cada nivel (sin escala).</T>
    </Svg>
  )
}


/* ——— Buckets, tablas y vistas en Grail ——— */
const BUCKETS = [
  { name: 'default_logs', sub: '35 días, fijo', tone: 'navy' as Tone },
  { name: 'logs_equipo_a', sub: 'retención propia', tone: 'teal' as Tone },
  { name: 'logs_equipo_b', sub: 'retención propia', tone: 'teal' as Tone },
]

function GrailBuckets() {
  return (
    <Svg h={320} label="OpenPipeline asigna buckets; la tabla logs agrupa todos los buckets de logs; fetch logs devuelve una única salida y una vista es una tabla virtual">
      <Box x={12} y={40} w={190} h={56} label="OpenPipeline" sub="sin asignación → default_logs" tone="navy" />
      <rect x={212} y={50} width={380} height={190} rx={12} fill={C.paperSoft} stroke={C.teal} strokeDasharray="6 5" strokeWidth={1.5} />
      {BUCKETS.map((b, i) => {
        const x = 230 + i * 120
        const cxm = x + 52
        return (
          <g key={b.name}>
            <Arrow d={`M202,68 C${150 + cxm * 0.5},64 ${cxm},66 ${cxm},104`} tone="navy" flow />
            <Cylinder x={x} y={108} w={104} h={64} tone={b.tone} />
            <T x={cxm} y={146} size={11} weight={750} tone={b.tone} mono>{b.name}</T>
            <T x={cxm} y={190} size={10.5} tone="muted">{b.sub}</T>
          </g>
        )
      })}
      <T x={402} y={216} size={11.5} weight={800} tone="teal">tabla logs (lógica): agrupa los buckets de logs</T>
      <T x={402} y={232} size={10} tone="muted">cada bucket guarda un único tipo de registro</T>
      <Arrow from={[592, 140]} to={[618, 140]} tone="teal" flow />
      <Box x={620} y={112} w={128} h={56} label="fetch logs" sub="una única salida" tone="teal" mono size={12.5} />
      <Arrow from={[592, 226]} to={[618, 226]} tone="violet" dashed />
      <Box x={620} y={198} w={128} h={56} label="vista" sub="tabla virtual" tone="violet" />
      <T x={684} y={272} size={10} tone="violet">no copia datos</T>
      <Chip x={128} y={298} text="default_ y dt_: no editables" tone="coral" />
      <Chip x={380} y={298} text="personalizados: 1 día – 10 años" tone="teal" />
      <Chip x={626} y={298} text="250 personalizados por entorno" tone="navy" />
    </Svg>
  )
}

/* ——— Ciclo de vida de un bucket ——— */
const RECORDS = Array.from({ length: 10 }, (_, i) => i)
const LIFE = [
  { op: 'Estado inicial', tone: 'navy' as Tone, lines: ['registros dentro', 'de la retención'] },
  { op: 'Acortar retención', tone: 'coral' as Tone, lines: ['se eliminan los datos', 'que superan el', 'nuevo periodo'] },
  { op: 'Truncate', tone: 'amber' as Tone, lines: ['borra los registros', 'el bucket se conserva', 'y sigue recibiendo datos'] },
  { op: 'Delete referenciado', tone: 'coral' as Tone, lines: ['409 conflict', 'lista de processors', 'no se borra nada'] },
  { op: 'Delete sin referencias', tone: 'amber' as Tone, lines: ['tarea asíncrona', 'status: deleting', 'después, eliminado'] },
]

function BucketLifecycle({ step }: { step: number }) {
  const s = LIFE[step]
  const recordVisible = (i: number) => {
    if (step === 1) return i >= 4
    if (step === 2) return i === 9
    if (step === 4) return false
    return true
  }
  return (
    <Svg h={270} label="Efecto de acortar la retención, truncate y delete sobre un bucket personalizado">
      <Box x={16} y={110} w={176} h={56} label="OpenPipeline" sub="processor → bucket" tone={step === 3 ? 'coral' : 'navy'} />
      <Arrow from={[192, 138]} to={[246, 138]} tone={step === 3 ? 'coral' : 'navy'} flow={step !== 4} dashed={step === 4} />
      <g className={step === 4 ? 'sv-dim' : 'sv-in'}>
        <rect x={250} y={74} width={300} height={130} rx={14} fill="#fff" stroke={C.slate} strokeWidth={1.6} />
        <T x={400} y={98} size={12} weight={800} tone="navy" mono>logs_equipo_a</T>
      </g>
      {RECORDS.map((i) => (
        <rect key={i} x={266 + i * 28} y={114} width={22} height={60} rx={4}
          fill={step === 1 && i < 4 ? C.coral : C.teal} opacity={0.8}
          className={recordVisible(i) ? 'sv-in' : 'sv-out'} />
      ))}
      <g className={show(step === 1)}>
        <line x1={372} x2={372} y1={106} y2={184} stroke={C.coral} strokeWidth={2} strokeDasharray="4 3" />
        <T x={372} y={196} size={10} tone="coral" weight={700}>nuevo límite</T>
      </g>
      <g className={show(step === 2)}>
        <T x={400} y={196} size={10} tone="teal" weight={700}>nuevo registro tras truncate</T>
      </g>
      <g className={show(step === 4)}>
        <Chip x={400} y={146} text="deleting" tone="amber" solid size={12} />
      </g>
      <g className={show(step === 3)}>
        <Mark x={400} y={60} ok={false} r={11} />
      </g>
      <T x={280} y={226} size={10} tone="muted" anchor="start">← más antiguos</T>
      <T x={536} y={226} size={10} tone="muted" anchor="end">más recientes →</T>
      <rect x={572} y={74} width={176} height={130} rx={10} fill={C.paperSoft} stroke={C.line} />
      <T x={660} y={100} size={12} weight={800} tone={s.tone}>{s.op}</T>
      {s.lines.map((line, i) => <T key={line} x={660} y={128 + i * 20} size={11} tone="ink">{line}</T>)}
      <T x={380} y={256} size={10.5} tone="coral" weight={700}>Acortar, truncar o eliminar borra datos de forma permanente.</T>
    </Svg>
  )
}

export const dataVisuals: VisualRegistry = {
  'sup-grail-buckets': {
    kind: 'illustration',
    title: 'La tabla es lógica; el bucket decide retención y acceso',
    caption: 'OpenPipeline asigna cada registro a un bucket (sin asignación, al predeterminado de su tipo). La tabla logs agrupa todos los buckets de logs, así que fetch logs devuelve una única salida; una vista es una tabla virtual que no copia datos.',
    render: () => <GrailBuckets />,
  },
  'sup-bucket-lifecycle': {
    kind: 'animation',
    title: 'Qué borra cada operación sobre un bucket',
    caption: 'Acortar la retención elimina lo que supera el nuevo periodo; truncate vacía el bucket pero lo conserva; delete se rechaza con 409 si un processor lo referencia y, si no, es asíncrono (status deleting).',
    steps: ['Bucket con datos', 'Acortar la retención', 'Truncate: vacía y conserva el bucket', 'Delete referenciado: 409 conflict', 'Delete sin referencias: deleting'],
    stepMs: 3000,
    render: ({ step }) => <BucketLifecycle step={step} />,
  },
  timeframes: {
    kind: 'animation',
    title: 'Mismos datos, distinta granularidad, otra lectura',
    caption: 'Antes de interpretar un pico, pregunta qué representa cada punto. Por minuto el pico es visible; por hora se diluye; por región descubres a quién afecta; y una última ventana incompleta puede parecer una caída que no existe.',
    steps: ['Por minuto: el pico se ve', 'Por hora: el pico se diluye', 'Por región: el pico es solo de B', 'Ventana incompleta: falsa caída'],
    stepMs: 3000,
    render: ({ step }) => <Timeframes step={step} />,
  },
  correlation: {
    kind: 'animation',
    title: 'Correlación es una pista, no una explicación',
    caption: 'Dos curvas que suben a la vez solo justifican una hipótesis. La confianza crece cuando una segunda señal independiente (una trace) y la dependencia entre entidades apuntan en la misma dirección; aun así, comunica el nivel de confianza y la siguiente comprobación.',
    steps: ['Observación: suben a la vez', 'Hipótesis falsable', 'Segunda señal independiente', 'Entidad y dependencia', 'Conclusión con confianza'],
    stepMs: 3000,
    render: ({ step }) => <Correlation step={step} />,
  },
  'deep-retention-reference': {
    kind: 'illustration',
    title: 'Retención por tipo de dato en Grail',
    caption: 'En escala logarítmica: la barra sólida es la retención por defecto o incluida y el tramo discontinuo, hasta dónde puede llegar. Los buckets integrados default_ no se modifican: para logs o spans más antiguos se usa un bucket personalizado. La retención del bucket no es la ventana temporal de tu consulta.',
    render: () => <Retention />,
  },
  'sampling-completeness': {
    kind: 'animation',
    title: 'Un número exacto puede representar solo una parte',
    caption: 'El count() es exacto sobre lo que llegó a la consulta, pero el muestreo, un timeframe incompleto o una regla de drop cambian la población. Antes de hablar de totales o porcentajes, documenta qué quedó fuera.',
    steps: ['Población completa', 'Muestreo: solo una parte', 'Filtros y exclusiones', 'Exacto, pero parcial'],
    stepMs: 2800,
    render: ({ step }) => <Sampling step={step} />,
  },
  'deep-baselines-impact': {
    kind: 'animation',
    title: 'De la anomalía a la acción, pregunta a pregunta',
    caption: 'La métrica que sale de la banda de baseline dice qué cambió, no por qué. La causa candidata sale de las dependencias; el impacto, de entry points, RUM y SLO; y la acción es una comprobación o un Workflow autorizado.',
    steps: ['¿Qué cambió?', '¿Por qué?', '¿A quién afecta?', '¿Qué hago?'],
    stepMs: 3000,
    render: ({ step }) => <BaselinesImpact step={step} />,
  },
  'key-requests': {
    kind: 'illustration',
    title: 'Cada nivel de evidencia llega hasta un punto distinto',
    caption: 'El detalle code-level sirve para investigar lo reciente; el agregado de requests muestra tendencias con menos detalle; el historial métrico llega más atrás. Para una pregunta sobre hace meses, no prometas el mismo detalle que para ayer.',
    render: () => <KeyRequests />,
  },
}
