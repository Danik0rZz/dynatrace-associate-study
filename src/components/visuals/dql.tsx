import { Arrow, Box, C, Chip, Cylinder, Particle, Svg, T, dim, show, toneColors, type Tone } from './kit'
import type { VisualRegistry } from './types'

/* ——— 1. Pipeline: cada comando transforma lo que recibe ——— */
const pipelineCode = [
  'fetch logs, from: -2h',
  '| filter loglevel == "ERROR"',
  '| fields timestamp, content, dt.entity.host',
  '| sort timestamp desc',
  '| limit 3',
]
const levels = ['INFO', 'ERROR', 'WARN', 'ERROR', 'INFO', 'ERROR', 'INFO', 'ERROR', 'WARN', 'ERROR']
const levelTone: Record<string, Tone> = { INFO: 'teal', ERROR: 'coral', WARN: 'amber' }
const rows = levels.map((level, index) => ({ level, index, time: `10:${String(index * 6).padStart(2, '0')}`, host: `host-${'abcab'[index % 5]}` }))

function Pipeline({ step }: { step: number }) {
  const errors = rows.filter((row) => row.level === 'ERROR')
  const rowY = (row: (typeof rows)[number]) => {
    if (step === 0 || row.level !== 'ERROR') return row.index
    const rank = errors.indexOf(row)
    return step >= 3 ? errors.length - 1 - rank : rank
  }
  const rowVisible = (row: (typeof rows)[number]) => {
    if (step === 0) return true
    if (row.level !== 'ERROR') return false
    if (step >= 4) return rowY(row) < 3
    return true
  }
  const count = [10, 5, 5, 5, 3][step]
  const narrow = step >= 2
  // Columnas: timestamp, loglevel, content, host, trace_id
  const col = {
    ts: 368,
    level: 436,
    content: narrow ? 436 : 494,
    host: narrow ? 566 : 610,
    trace: 700,
  }
  return (
    <Svg h={330} label="Pipeline DQL: fetch, filter, fields, sort y limit transformando una tabla de registros">
      {/* Código */}
      <rect x={10} y={30} width={330} height={170} rx={8} fill={C.navy} />
      {pipelineCode.map((line, index) => (
        <g key={line} className={index <= step ? 'sv-in' : 'sv-dim'}>
          <rect x={16} y={42 + index * 30} width={318} height={24} rx={4} fill={index === step ? 'rgba(17,168,153,.35)' : 'transparent'} />
          <T x={24} y={58 + index * 30} size={10.5} mono tone="white" anchor="start">{line}</T>
        </g>
      ))}
      <T x={10} y={20} size={10} tone="muted" anchor="start" weight={800}>CONSULTA</T>
      <g transform="translate(0 0)">
        <Box x={10} y={218} w={330} h={56} tone="teal" label={`${count} registros · ${narrow ? 3 : 5} campos`} sub={['fetch: todos los registros del dataset', 'filter: solo ERROR', 'fields: controla las columnas', 'sort: más recientes primero', 'limit: corta el resultado'][step]} />
      </g>
      <Arrow from={[342, 110]} to={[356, 110]} tone="teal" />
      {/* Cabecera tabla */}
      <T x={362} y={20} size={10} tone="muted" anchor="start" weight={800}>RESULTADO QUE RECIBE EL SIGUIENTE COMANDO</T>
      <g>
        <T x={col.ts} y={42} size={10} weight={800} anchor="start" tone="navy">timestamp</T>
        <T x={col.level} y={42} size={10} weight={800} anchor="start" tone="navy" className={show(!narrow)}>loglevel</T>
        <T x={col.content} y={42} size={10} weight={800} anchor="start" tone="navy" style={{ transform: `translateX(0)` }}>content</T>
        <T x={col.host} y={42} size={10} weight={800} anchor="start" tone="navy">dt.entity.host</T>
        <T x={col.trace} y={42} size={10} weight={800} anchor="start" tone="navy" className={show(!narrow)}>trace_id</T>
      </g>
      {rows.map((row) => {
        const y = 52 + rowY(row) * 27
        return (
          <g key={row.index} className={rowVisible(row) ? 'sv-in' : 'sv-out'} style={{ transform: `translateY(${y}px)` }}>
            <rect x={360} y={0} width={narrow ? 300 : 396} height={22} rx={4} fill={row.level === 'ERROR' && step >= 1 ? C.coralTint : '#f6f9f8'} stroke={C.line} />
            <T x={col.ts} y={15} size={10.5} mono anchor="start">{row.time}</T>
            <g className={show(!narrow)}>
              <rect x={col.level - 2} y={4} width={46} height={14} rx={7} fill={toneColors[levelTone[row.level]].solid} />
              <T x={col.level + 21} y={14.5} size={8.5} weight={800} tone="white">{row.level}</T>
            </g>
            <rect x={col.content} y={8} width={row.level === 'ERROR' ? 110 : 80} height={6} rx={3} fill="#c5d3d0" />
            <T x={col.host} y={15} size={10.5} mono anchor="start">{row.host}</T>
            <rect x={col.trace} y={8} width={44} height={6} rx={3} fill="#dfe7e5" className={show(!narrow)} />
          </g>
        )
      })}
    </Svg>
  )
}

/* ——— 2. summarize frente a timeseries ——— */
function Aggregation({ step }: { step: number }) {
  const dots = Array.from({ length: 34 }, (_, i) => ({ x: 30 + ((i * 97) % 700), level: i % 5 === 0 ? 'ERROR' : i % 3 === 0 ? 'WARN' : 'INFO' }))
  const hours = [0, 1, 2, 3, 4, 5]
  const values = [42, 55, 48, 71, 64, 58]
  return (
    <Svg h={330} label="Registros sueltos que summarize convierte en una tabla por grupo y timeseries en una serie por intervalo">
      <T x={20} y={22} size={10} tone="muted" anchor="start" weight={800}>REGISTROS / DATOS DE ENTRADA (3 días)</T>
      <line x1={20} x2={740} y1={70} y2={70} stroke={C.line} strokeWidth={2} />
      {dots.map((dot, i) => <circle key={i} cx={dot.x} cy={50 + (i % 3) * 8} r={5} fill={toneColors[levelTone[dot.level]].solid} opacity={0.85} />)}
      {/* summarize */}
      <g className={dim(step === 1 || step === 0)}>
        <Arrow d="M200,80 C200,110 190,120 190,138" tone="navy" className={show(step >= 1)} />
        <rect x={20} y={140} width={340} height={172} rx={10} fill="#fff" stroke={step === 1 ? C.teal : C.line} strokeWidth={1.5} />
        <T x={34} y={162} size={11} mono anchor="start" tone="teal" weight={700}>summarize count(), by:{'{loglevel}'}</T>
        <g className={show(step >= 1)}>
          {[['INFO', 19], ['WARN', 8], ['ERROR', 7]].map(([level, value], i) => (
            <g key={level as string}>
              <rect x={34} y={180 + i * 36} width={70} height={26} rx={4} fill={toneColors[levelTone[level as string]].fill} stroke={toneColors[levelTone[level as string]].stroke} />
              <T x={69} y={197 + i * 36} size={10.5} weight={800} tone={levelTone[level as string]}>{level as string}</T>
              <rect x={112} y={185 + i * 36} width={(value as number) * 10} height={16} rx={3} fill={toneColors[levelTone[level as string]].solid} opacity={0.75} />
              <T x={118 + (value as number) * 10} y={197 + i * 36} size={11} weight={800} anchor="start">{value as number}</T>
            </g>
          ))}
          <T x={190} y={300} size={10.5} tone="muted">Tabla: una fila por grupo</T>
        </g>
      </g>
      {/* timeseries */}
      <g className={dim(step === 2 || step === 0)}>
        <Arrow d="M560,80 C560,110 570,120 570,138" tone="navy" className={show(step >= 2)} />
        <rect x={400} y={140} width={340} height={172} rx={10} fill="#fff" stroke={step === 2 ? C.teal : C.line} strokeWidth={1.5} />
        <T x={414} y={162} size={11} mono anchor="start" tone="teal" weight={700}>timeseries avg(…), interval:1h</T>
        <g className={show(step >= 2)}>
          {hours.map((h) => <line key={h} x1={430 + h * 55} x2={430 + h * 55} y1={180} y2={280} stroke={C.line} strokeDasharray="2 4" />)}
          <polyline points={values.map((v, i) => `${430 + i * 55},${280 - v}`).join(' ')} fill="none" stroke={C.teal} strokeWidth={2.5} />
          {values.map((v, i) => <circle key={i} cx={430 + i * 55} cy={280 - v} r={4.5} fill="#fff" stroke={C.teal} strokeWidth={2} />)}
          <T x={570} y={300} size={10.5} tone="muted">Array de valores: uno por intervalo</T>
        </g>
      </g>
    </Svg>
  )
}

/* ——— 3. Arrays: arraySize y expand ——— */
function ArrayExpand({ step }: { step: number }) {
  const orders = [
    { id: 'A-17', items: ['disk', 'cpu', 'net'] },
    { id: 'B-42', items: ['cpu', 'mem'] },
  ]
  const expanded = orders.flatMap((order) => order.items.map((item) => ({ id: order.id, item })))
  return (
    <Svg h={290} label="expand multiplica filas: una por cada elemento del array">
      {/* Antes */}
      <T x={20} y={24} size={10} tone="muted" anchor="start" weight={800}>{step < 2 ? 'REGISTROS CON UN ARRAY' : 'ANTES DE expand'}</T>
      {orders.map((order, i) => (
        <g key={order.id} className={step >= 2 ? 'sv-dim' : 'sv-in'}>
          <rect x={20} y={40 + i * 50} width={356} height={38} rx={6} fill="#f6f9f8" stroke={C.line} />
          <T x={34} y={64 + i * 50} size={11.5} mono anchor="start" weight={700}>{order.id}</T>
          <T x={92} y={64 + i * 50} size={11} mono anchor="start" tone="muted">items =</T>
          {order.items.map((item, k) => <Chip key={item} x={176 + k * 52} y={59 + i * 50} text={item} tone="violet" w={46} mono size={10} />)}
          <g className={show(step >= 1)}>
            <Chip x={344} y={59 + i * 50} text={`n=${order.items.length}`} tone="teal" solid w={44} mono size={10} />
          </g>
        </g>
      ))}
      <g className={show(step === 1)}>
        <T x={20} y={160} size={11.5} mono anchor="start" tone="teal" weight={700}>| fieldsAdd n = arraySize(items)</T>
        <T x={20} y={180} size={11} anchor="start" tone="muted">Añade una columna numérica; el número de filas no cambia (2).</T>
      </g>
      {/* Después */}
      <g className={show(step >= 2)}>
        <Arrow from={[382, 90]} to={[432, 90]} tone="teal" flow />
        <T x={407} y={80} size={10} tone="teal" weight={800} mono>expand</T>
        <T x={440} y={24} size={10} tone="muted" anchor="start" weight={800}>DESPUÉS: 1 FILA POR ELEMENTO (5)</T>
        {expanded.map((row, i) => (
          <g key={`${row.id}-${row.item}`} style={{ transform: `translateY(${step >= 2 ? i * 44 : 0}px)` }}>
            <rect x={440} y={40} width={290} height={36} rx={6} fill={row.id === 'A-17' ? C.violetTint : C.tealTint} stroke={C.line} />
            <T x={454} y={63} size={11.5} mono anchor="start" weight={700}>{row.id}</T>
            <T x={514} y={63} size={11} mono anchor="start" tone="muted">item =</T>
            <Chip x={596} y={58} text={row.item} tone="violet" w={50} mono size={10} />
          </g>
        ))}
        <T x={20} y={160} size={11.5} mono anchor="start" tone="teal" weight={700} className={show(step >= 2)}>| expand item = items</T>
        <T x={20} y={180} size={11} anchor="start" tone="coral" className={show(step >= 2)}>2 filas → 5 filas: vigila la cardinalidad antes de agregar.</T>
      </g>
    </Svg>
  )
}

/* ——— 4. DQL, DPL y OpenPipeline ——— */
function DqlDpl() {
  return (
    <Svg h={280} label="Momento de uso de OpenPipeline, DPL y DQL en el ciclo del dato">
      <line x1={30} x2={730} y1={140} y2={140} stroke={C.line} strokeWidth={3} />
      <Particle path="M30,140 L730,140" dur={6} tone="teal" r={6} />
      <Particle path="M30,140 L730,140" dur={6} begin={3} tone="teal" r={6} />
      <T x={30} y={166} size={10} tone="muted" anchor="start" weight={800}>INGESTIÓN / PROCESAMIENTO</T>
      <T x={730} y={166} size={10} tone="muted" anchor="end" weight={800}>QUERY TIME</T>
      <Box x={30} y={60} w={110} h={54} label="Datos" sub="logs, spans…" tone="neutral" />
      <Box x={170} y={52} w={210} h={70} label="OpenPipeline" sub="procesa · enruta · enmascara" tone="teal" solid />
      <Cylinder x={410} y={54} w={80} h={66} tone="navy" label="Grail" />
      <Box x={520} y={52} w={210} h={70} label="DQL" sub="consulta · filtra · agrega" tone="navy" solid />
      <Arrow from={[142, 87]} to={[168, 87]} tone="neutral" />
      <Arrow from={[382, 87]} to={[408, 87]} tone="neutral" />
      <Arrow from={[492, 87]} to={[518, 87]} tone="neutral" />
      <Box x={185} y={196} w={180} h={54} label="DPL" sub="extrae con patrones" tone="violet" />
      <Box x={535} y={196} w={180} h={54} label="DPL en parse" sub="parse content, patrón" tone="violet" />
      <Arrow from={[275, 194]} to={[275, 126]} tone="violet" dashed />
      <Arrow from={[625, 194]} to={[625, 126]} tone="violet" dashed />
      <T x={450} y={216} size={10.5} tone="violet" weight={700}>mismo lenguaje</T>
      <T x={450} y={231} size={10.5} tone="violet" weight={700}>de patrones,</T>
      <T x={450} y={246} size={10.5} tone="violet" weight={700}>dos momentos</T>
    </Svg>
  )
}

/* ——— 5. Coste: filtrar temprano ——— */
const goodPlan = [
  { cmd: 'fetch logs', vol: 100 },
  { cmd: 'filter …', vol: 12 },
  { cmd: 'fields …', vol: 12 },
  { cmd: 'summarize …', vol: 2 },
  { cmd: 'sort …', vol: 2 },
]
const badPlan = [
  { cmd: 'fetch logs', vol: 100 },
  { cmd: 'parse …', vol: 100 },
  { cmd: 'sort …', vol: 100 },
  { cmd: 'filter …', vol: 12 },
  { cmd: 'summarize …', vol: 2 },
]

function Lane({ y, plan, step, tone, title }: { y: number; plan: typeof goodPlan; step: number; tone: Tone; title: string }) {
  const work = plan.slice(0, step + 1).reduce((sum, stage, i) => sum + (i === 0 ? stage.vol : plan[i - 1].vol), 0)
  return (
    <g>
      <T x={20} y={y} size={11} weight={800} anchor="start" tone={tone}>{title}</T>
      {plan.map((stage, i) => {
        const x = 20 + i * 118
        const input = i === 0 ? stage.vol : plan[i - 1].vol
        return (
          <g key={stage.cmd} className={i <= step ? 'sv-in' : 'sv-dim'}>
            <rect x={x} y={y + 12} width={108} height={30} rx={5} fill="#fff" stroke={toneColors[tone].stroke} />
            <T x={x + 54} y={y + 31} size={10.5} mono weight={700}>{stage.cmd}</T>
            <rect x={x} y={y + 50} width={108} height={14} rx={3} fill={C.paperSoft} />
            <rect x={x} y={y + 50} width={Math.max(3, input * 1.08)} height={14} rx={3} fill={toneColors[tone].solid} opacity={0.8} />
            <T x={x + 54} y={y + 78} size={9.5} tone="muted">entra {input}%</T>
          </g>
        )
      })}
      <g>
        <T x={640} y={y + 18} size={10} tone="muted" anchor="start">trabajo acumulado</T>
        <rect x={640} y={y + 26} width={100} height={16} rx={3} fill={C.paperSoft} />
        <rect x={640} y={y + 26} width={Math.min(100, work / 4)} height={16} rx={3} fill={toneColors[tone].solid} />
        <T x={690} y={y + 60} size={13} weight={800} tone={tone}>{work}</T>
      </g>
    </g>
  )
}

function DqlPerformance({ step }: { step: number }) {
  return (
    <Svg h={250} label="Comparación de volumen procesado al filtrar temprano frente a filtrar tarde">
      <Lane y={22} plan={goodPlan} step={step} tone="teal" title="Filtro temprano: cada comando recibe menos registros" />
      <Lane y={140} plan={badPlan} step={step} tone="coral" title="Filtro tarde: transformaciones y sort sobre el 100 %" />
    </Svg>
  )
}

/* ——— 6. join, lookup y joinNested: qué filas sobreviven ——— */
type JoinRow = { l?: string; r?: string[]; empty?: boolean }
const joinModes: { cmd: string; note: string; rows: JoinRow[] }[] = [
  { cmd: 'join (kind:inner)', note: 'Solo pares que coinciden · campos right.*', rows: [{ l: 'B', r: ['B'] }, { l: 'C', r: ['C·1'] }, { l: 'C', r: ['C·2'] }] },
  { cmd: 'join kind:leftOuter', note: 'Toda la izquierda · A se conserva sin datos', rows: [{ l: 'A', empty: true }, { l: 'B', r: ['B'] }, { l: 'C', r: ['C·1'] }, { l: 'C', r: ['C·2'] }] },
  { cmd: 'join kind:outer', note: 'Coincidentes y no coincidentes de ambos lados', rows: [{ l: 'A', empty: true }, { l: 'B', r: ['B'] }, { l: 'C', r: ['C·1'] }, { l: 'C', r: ['C·2'] }, { r: ['D'] }] },
  { cmd: 'lookup', note: 'Todas las filas de origen · primera coincidencia · lookup.*', rows: [{ l: 'A', empty: true }, { l: 'B', r: ['B'] }, { l: 'C', r: ['C·1'] }] },
  { cmd: 'joinNested', note: 'Una fila por origen · coincidencias en un array', rows: [{ l: 'A', empty: true }, { l: 'B', r: ['B'] }, { l: 'C', r: ['C·1', 'C·2'] }] },
]

function JoinKinds({ step }: { step: number }) {
  const mode = joinModes[step]
  const left = ['A', 'B', 'C']
  const right = ['B', 'C·1', 'C·2', 'D']
  return (
    <Svg h={300} label="Filas que conservan join inner, leftOuter, outer, lookup y joinNested con la misma entrada">
      <T x={20} y={22} size={10} tone="muted" anchor="start" weight={800}>LEFT (consulta)</T>
      {left.map((key, i) => (
        <g key={key}>
          <rect x={20} y={36 + i * 34} width={120} height={26} rx={5} fill={C.tealTint} stroke={C.teal} />
          <T x={80} y={53 + i * 34} size={11.5} mono weight={700}>key = {key}</T>
        </g>
      ))}
      <T x={170} y={22} size={10} tone="muted" anchor="start" weight={800}>RIGHT (subconsulta)</T>
      {right.map((key, i) => (
        <g key={key}>
          <rect x={170} y={36 + i * 34} width={120} height={26} rx={5} fill={C.violetTint} stroke={C.violet} />
          <T x={230} y={53 + i * 34} size={11.5} mono weight={700}>key = {key}</T>
        </g>
      ))}
      <T x={155} y={196} size={10.5} tone="muted">A no tiene pareja; D tampoco.</T>
      <T x={155} y={212} size={10.5} tone="muted">C coincide dos veces.</T>
      <Arrow from={[304, 100]} to={[344, 100]} tone="navy" flow />
      <rect x={352} y={12} width={396} height={276} rx={10} fill="#fff" stroke={C.line} />
      <T x={550} y={36} size={12.5} mono weight={800} tone="teal">{mode.cmd}</T>
      <T x={550} y={56} size={10.5} tone="muted">{mode.note}</T>
      {mode.rows.map((row, i) => (
        <g key={`${step}-${i}`} className="sv-in">
          <rect x={372} y={70 + i * 40} width={356} height={30} rx={6} fill={C.paperSoft} stroke={C.line} />
          {row.l ? <Chip x={420} y={85 + i * 40} text={`left ${row.l}`} tone="teal" w={78} mono size={10.5} /> : <T x={420} y={89 + i * 40} size={10.5} tone="muted">sin left</T>}
          {row.empty && <T x={560} y={89 + i * 40} size={10.5} tone="coral" weight={700}>sin coincidencia</T>}
          {row.r && row.r.length === 1 && <Chip x={560} y={85 + i * 40} text={`right ${row.r[0]}`} tone="violet" w={92} mono size={10.5} />}
          {row.r && row.r.length > 1 && (
            <g>
              <T x={482} y={89 + i * 40} size={11} mono weight={700} tone="violet">[</T>
              {row.r.map((key, k) => <Chip key={key} x={535 + k * 90} y={85 + i * 40} text={`right ${key}`} tone="violet" w={84} mono size={10.5} />)}
              <T x={678} y={89 + i * 40} size={11} mono weight={700} tone="violet">]</T>
            </g>
          )}
        </g>
      ))}
    </Svg>
  )
}

/* ——— 7. traverse: de los nodos de origen a los de destino ——— */
function Traverse({ step }: { step: number }) {
  const procs = [{ id: 'PROCESS p1', y: 70 }, { id: 'PROCESS p2', y: 130 }, { id: 'PROCESS p3', y: 190 }]
  const hosts = [{ id: 'HOST h1', y: 100 }, { id: 'HOST h2', y: 190 }]
  const edges = [[0, 0], [1, 0], [2, 1]]
  const backward = step === 2
  const code = [
    'smartscapeNodes PROCESS',
    'smartscapeNodes PROCESS | traverse runs_on, HOST',
    'smartscapeNodes HOST | traverse runs_on, PROCESS, direction: backward',
  ][step]
  return (
    <Svg h={290} label="traverse sigue aristas runs_on de PROCESS a HOST y, con direction backward, de HOST a PROCESS">
      <rect x={20} y={14} width={720} height={30} rx={6} fill={C.navy} />
      <T x={34} y={34} size={11} mono tone="white" anchor="start">{code}</T>
      {edges.map(([p, h]) => (
        <Arrow key={`${p}-${h}`} from={[262, procs[p].y + 16]} to={[478, hosts[h].y + 16]} tone="violet" dashed className={dim(step >= 1)} />
      ))}
      <T x={370} y={276} size={10.5} tone="violet" weight={700}>aristas runs_on: PROCESS → HOST</T>
      {procs.map((proc) => (
        <Box key={proc.id} x={100} y={proc.y} w={160} h={34} label={proc.id} tone="teal" solid={step === 0 || backward} size={12} mono />
      ))}
      {hosts.map((host) => (
        <Box key={host.id} x={480} y={host.y} w={150} h={34} label={host.id} tone="navy" solid={step === 1} size={12} mono />
      ))}
      <g className={show(step === 1)}>
        <T x={555} y={86} size={10.5} tone="teal" weight={700}>resultado: nodos HOST</T>
        <T x={555} y={250} size={10} tone="muted">+ dt.traverse.history (origen)</T>
      </g>
      <g className={show(backward)}>
        <T x={180} y={60} size={10.5} tone="teal" weight={700}>resultado: nodos PROCESS</T>
        <T x={180} y={250} size={10} tone="muted">recorrido en sentido contrario</T>
      </g>
      <g className={show(step === 0)}>
        <T x={370} y={250} size={10.5} tone="muted">Solo se cargan nodos; las aristas aún no se recorren.</T>
      </g>
    </Svg>
  )
}

export const dqlVisuals: VisualRegistry = {
  pipeline: {
    kind: 'animation',
    title: 'La consulta como tubería de registros',
    caption: 'Cada comando recibe la tabla que produjo el anterior. filter elimina filas, fields elimina o calcula columnas, sort reordena y limit corta. Si cambias el orden de los comandos, cambia el resultado (y el coste).',
    steps: ['fetch: todos los registros', 'filter: solo ERROR', 'fields: 3 columnas', 'sort: desc por timestamp', 'limit 3'],
    stepMs: 2400,
    render: ({ step }) => <Pipeline step={step} />,
  },
  aggregation: {
    kind: 'animation',
    title: 'summarize devuelve una tabla; timeseries, una serie',
    caption: 'Los mismos datos pueden responder dos preguntas distintas: summarize agrupa y produce una fila por grupo (ideal para tablas y barras); timeseries produce valores por intervalo (ideal para ver la evolución en el tiempo).',
    steps: ['Datos del periodo', 'summarize → tabla por grupo', 'timeseries → valores por intervalo'],
    stepMs: 3000,
    render: ({ step }) => <Aggregation step={step} />,
  },
  'deep-dql-command-contract': {
    kind: 'animation',
    title: 'arraySize añade una columna; expand multiplica filas',
    caption: 'Con arrays, fíjate en si la operación mantiene el número de filas (arraySize, in(), items[0]) o lo multiplica (expand). Tras un expand, un count() cuenta elementos, no registros originales.',
    steps: ['Registros con array', 'fieldsAdd n = arraySize(items)', 'expand item = items'],
    stepMs: 3000,
    render: ({ step }) => <ArrayExpand step={step} />,
  },
  'deep-dql-dpl': {
    kind: 'illustration',
    title: 'Quién hace qué y cuándo: OpenPipeline, DPL y DQL',
    caption: 'DQL consulta y analiza en query time. DPL no es un lenguaje de consulta: describe patrones, y se usa tanto en el procesamiento de OpenPipeline como dentro de parse en una consulta DQL.',
    render: () => <DqlDpl />,
  },
  'deep-dql-performance': {
    kind: 'animation',
    title: 'Filtrar temprano reduce el trabajo de cada comando',
    caption: 'Ambas consultas pueden devolver el mismo resultado, pero en la segunda las transformaciones costosas y el sort se aplican a todos los registros. Filtra pronto, proyecta los campos necesarios y agrega antes de ordenar volúmenes grandes.',
    steps: ['fetch', 'segundo comando', 'tercer comando', 'cuarto comando', 'quinto comando'],
    stepMs: 2000,
    render: ({ step }) => <DqlPerformance step={step} />,
  },
  'sup-dql-join': {
    kind: 'animation',
    title: 'Misma entrada, filas distintas según el comando',
    caption: 'A no tiene pareja, C coincide dos veces y D solo existe en la subconsulta. Mira qué filas sobreviven: inner descarta A, leftOuter la conserva, outer añade D, lookup se queda con la primera coincidencia y joinNested agrupa las coincidencias en un array.',
    steps: ['join inner (por defecto)', 'join leftOuter', 'join outer', 'lookup', 'joinNested'],
    stepMs: 3000,
    render: ({ step }) => <JoinKinds step={step} />,
  },
  'sup-dql-smartscape': {
    kind: 'animation',
    title: 'traverse recorre aristas desde los nodos que recibe',
    caption: 'smartscapeNodes carga nodos; traverse sigue el tipo de arista hasta el tipo de nodo destino. Por defecto avanza en el sentido de la arista (forward); con direction: backward se recorre al revés, de HOST a PROCESS.',
    steps: ['smartscapeNodes PROCESS', 'traverse runs_on, HOST', 'direction: backward'],
    stepMs: 3200,
    render: ({ step }) => <Traverse step={step} />,
  },
}

