import { Arrow, Box, C, Chip, Clock, Mark, Person, Svg, T, dim, show, toneColors, type Tone } from './kit'
import type { VisualRegistry } from './types'

const MONO = 'ui-monospace, SFMono-Regular, Consolas, monospace'

/** Mini gráfico de líneas dentro de un rectángulo. */
function Spark({ x, y, w, h, values, tone = 'teal', className }: { x: number; y: number; w: number; h: number; values: number[]; tone?: Tone; className?: string }) {
  const max = Math.max(...values)
  const pts = values.map((v, i) => `${x + (i * w) / (values.length - 1)},${y + h - (v / max) * h}`).join(' ')
  return <polyline points={pts} fill="none" stroke={toneColors[tone].solid} strokeWidth={2} strokeLinejoin="round" className={className} />
}

/** Etiqueta de tipo de sección/tile (pequeña, a la izquierda). */
function Tag({ x, y, text, tone }: { x: number; y: number; text: string; tone: Tone }) {
  const w = text.length * 10 * 0.62 + 14
  return (
    <g>
      <rect x={x} y={y} width={w} height={17} rx={4} fill={toneColors[tone].solid} />
      <text x={x + w / 2} y={y + 12.3} textAnchor="middle" fontSize={10} fontWeight={800} fill="#fff">{text}</text>
    </g>
  )
}

/* ——— 1. Notebook frente a Dashboard ——— */
const needs = [
  { need: 'Explorar una anomalía', tool: 'nb', why: 'permite iterar y narrar' },
  { need: 'Monitorizar un KPI', tool: 'db', why: 'facilita seguimiento recurrente' },
  { need: 'Explicar un incidente', tool: 'nb', why: 'conserva evidencia y razonamiento' },
  { need: 'Comunicar estado a equipo', tool: 'db', why: 'vista resumida y repetible' },
]

function Choose({ step }: { step: number }) {
  const nbActive = needs[step].tool === 'nb'
  return (
    <Svg h={320} label="Notebook como secuencia narrativa de celdas frente a Dashboard como rejilla de tiles; cuatro necesidades clasificadas">
      {/* Notebook */}
      <rect x={20} y={20} width={232} height={288} rx={12} fill={nbActive ? '#f3fbf9' : '#fff'} stroke={nbActive ? C.teal : C.line} strokeWidth={1.6} />
      <T x={34} y={44} size={14} weight={800} tone="teal" anchor="start">Notebook</T>
      <T x={238} y={44} size={10} tone="muted" anchor="end">secuencia narrativa</T>
      <line x1={40} x2={40} y1={62} y2={268} stroke={C.line} strokeWidth={2} strokeDasharray="3 4" />
      {[
        { y: 58, h: 40, tag: 'contexto', tone: 'navy' as Tone },
        { y: 106, h: 40, tag: 'consulta', tone: 'teal' as Tone },
        { y: 154, h: 62, tag: 'resultado', tone: 'violet' as Tone },
        { y: 224, h: 44, tag: 'interpretación', tone: 'navy' as Tone },
      ].map((cell) => (
        <g key={cell.tag}>
          <rect x={52} y={cell.y} width={188} height={cell.h} rx={6} fill="#fff" stroke={C.line} />
          <circle cx={40} cy={cell.y + 10} r={4} fill={toneColors[cell.tone].solid} />
          <Tag x={60} y={cell.y + 5} text={cell.tag} tone={cell.tone} />
        </g>
      ))}
      <rect x={60} y={85} width={150} height={5} rx={2.5} fill="#c5d3d0" />
      <text x={60} y={138} fontSize={10} fill={C.tealDark} fontFamily={MONO}>fetch logs | filter …</text>
      <Spark x={64} y={180} w={164} h={30} values={[4, 5, 4, 6, 5, 14, 12, 6, 5]} tone="violet" />
      <rect x={60} y={250} width={165} height={5} rx={2.5} fill="#c5d3d0" />
      <rect x={60} y={259} width={110} height={5} rx={2.5} fill="#c5d3d0" />
      <T x={136} y={294} size={10.5} tone="muted">se lee de arriba abajo</T>

      {/* Dashboard */}
      <rect x={508} y={20} width={232} height={288} rx={12} fill={!nbActive ? '#f2f6f7' : '#fff'} stroke={!nbActive ? C.navy : C.line} strokeWidth={1.6} />
      <T x={522} y={44} size={14} weight={800} tone="navy" anchor="start">Dashboard</T>
      <Clock x={718} y={40} r={10} tone="navy" />
      <T x={700} y={44} size={10} tone="muted" anchor="end">recurrente</T>
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={518 + i * 72} y={58} width={66} height={54} rx={6} fill="#fff" stroke={C.line} />
          <rect x={528 + i * 72} y={70} width={30} height={5} rx={2.5} fill="#c5d3d0" />
          <rect x={528 + i * 72} y={84} width={44} height={16} rx={3} fill={i === 1 ? C.amber : C.teal} opacity={0.85} />
        </g>
      ))}
      <rect x={518} y={120} width={210} height={90} rx={6} fill="#fff" stroke={C.line} />
      <Spark x={530} y={138} w={186} h={60} values={[6, 7, 6, 8, 7, 9, 8, 9, 8, 10]} tone="navy" />
      <rect x={518} y={218} width={102} height={70} rx={6} fill="#fff" stroke={C.line} />
      {[0, 1, 2, 3].map((i) => <rect key={i} x={528} y={230 + i * 13} width={82} height={7} rx={2} fill={i === 0 ? '#b9c7c5' : '#e1e9e7'} />)}
      <rect x={626} y={218} width={102} height={70} rx={6} fill="#fff" stroke={C.line} />
      {[30, 44, 22, 38, 50].map((v, i) => <rect key={i} x={640 + i * 16} y={278 - v} width={10} height={v} rx={2} fill={C.navy} opacity={0.7} />)}

      {/* Necesidades */}
      <T x={380} y={30} size={10} tone="muted" weight={800}>NECESIDAD → HERRAMIENTA</T>
      {needs.map((item, index) => {
        const y = 44 + index * 66
        const decided = index <= step
        const nb = item.tool === 'nb'
        const tone: Tone = nb ? 'teal' : 'navy'
        return (
          <g key={item.need} className={dim(decided)}>
            <rect x={270} y={y} width={220} height={54} rx={8} fill={index === step ? toneColors[tone].fill : '#fff'} stroke={decided ? toneColors[tone].stroke : C.line} strokeWidth={index === step ? 2 : 1.3} />
            <T x={380} y={y + 20} size={12} weight={800}>{item.need}</T>
            <g className={show(decided)}>
              <T x={380} y={y + 38} size={10} tone={tone} weight={650}>{item.why}</T>
            </g>
            <g className={show(decided)}>
              {nb ? <Arrow from={[268, y + 27]} to={[256, y + 27]} tone="teal" /> : <Arrow from={[492, y + 27]} to={[504, y + 27]} tone="navy" />}
            </g>
          </g>
        )
      })}
    </Svg>
  )
}

/* ——— 2. Anatomía de un Notebook ——— */
const sectionInfo = [
  { name: 'Explore', tone: 'violet' as Tone, lines: ['Descubrimiento guiado visual:', 'point-and-click sobre logs, métricas,', 'business events y otros datos.'] },
  { name: 'Query', tone: 'teal' as Tone, lines: ['DQL directo contra Grail,', 'con autocomplete y timeframe;', 'visualiza el resultado.'] },
  { name: 'Code', tone: 'navy' as Tone, lines: ['JavaScript ejecutado como', 'Dynatrace function; devuelve', 'datos (p. ej. de una API).'] },
  { name: 'Markdown', tone: 'amber' as Tone, lines: ['Contexto, fórmulas, enlaces,', 'imágenes y conclusiones:', 'documentación reproducible.'] },
]

function NotebookSections({ step }: { step: number }) {
  const secY = [66, 136, 206, 276]
  return (
    <Svg h={350} label="Anatomía de un Notebook: secciones Explore, Query, Code y Markdown">
      <rect x={20} y={10} width={462} height={332} rx={12} fill={C.paperSoft} stroke={C.line} strokeWidth={1.5} />
      <T x={470} y={40} size={12} weight={800} tone="navy" anchor="end" >Notebook</T>
      {/* Secciones */}
      <g className={show(step >= 0)}>
        <rect x={32} y={secY[0]} width={438} height={60} rx={8} fill="#fff" stroke={step === 0 ? C.violet : C.line} strokeWidth={step === 0 ? 2 : 1.2} />
        <Tag x={42} y={secY[0] + 8} text="Explore" tone="violet" />
        {['logs', 'filter: loglevel', 'split by: host'].map((chip, i) => <Chip key={chip} x={[82, 176, 294][i]} y={secY[0] + 42} text={chip} tone="violet" size={10} />)}
        <Chip x={420} y={secY[0] + 42} text="Run" tone="violet" solid size={10} w={52} />
      </g>
      <g className={show(step >= 1)}>
        <rect x={32} y={secY[1]} width={438} height={60} rx={8} fill="#fff" stroke={step === 1 ? C.teal : C.line} strokeWidth={step === 1 ? 2 : 1.2} />
        <Tag x={42} y={secY[1] + 8} text="Query" tone="teal" />
        <text x={42} y={secY[1] + 40} fontSize={10.5} fill={C.ink} fontFamily={MONO}>fetch logs</text>
        <text x={42} y={secY[1] + 54} fontSize={10.5} fill={C.ink} fontFamily={MONO}>
          | filter loglevel == <tspan fill={C.tealDark} fontWeight={800}>"ERROR"</tspan>
        </text>
        <rect x={326} y={secY[1] + 10} width={134} height={42} rx={4} fill={C.tealTint} />
        <Spark x={332} y={secY[1] + 16} w={122} h={30} values={[3, 5, 4, 7, 6, 8, 5, 6]} tone="teal" />
      </g>
      <g className={show(step >= 2)}>
        <rect x={32} y={secY[2]} width={438} height={60} rx={8} fill="#fff" stroke={step === 2 ? C.navy : C.line} strokeWidth={step === 2 ? 2 : 1.2} />
        <Tag x={42} y={secY[2] + 8} text="Code" tone="navy" />
        <text x={42} y={secY[2] + 40} fontSize={10.5} fill={C.ink} fontFamily={MONO}>export default async function () {'{'}</text>
        <text x={56} y={secY[2] + 54} fontSize={10.5} fill={C.soft} fontFamily={MONO}>// fetch(API) → return datos {'}'}</text>
      </g>
      <g className={show(step >= 3)}>
        <rect x={32} y={secY[3]} width={438} height={60} rx={8} fill="#fff" stroke={step === 3 ? C.amber : C.line} strokeWidth={step === 3 ? 2 : 1.2} />
        <Tag x={42} y={secY[3] + 8} text="Markdown" tone="amber" />
        <T x={42} y={secY[3] + 42} size={12} weight={800} anchor="start">Hipótesis</T>
        <T x={114} y={secY[3] + 42} size={11} tone="muted" anchor="start">y conclusión: qué muestra la consulta,</T>
        <T x={42} y={secY[3] + 55} size={11} tone="muted" anchor="start">con qué filtros y qué limitación tiene.</T>
      </g>
      {/* Panel explicativo */}
      <rect x={500} y={66} width={240} height={150} rx={12} fill={toneColors[sectionInfo[step].tone].fill} stroke={toneColors[sectionInfo[step].tone].stroke} strokeWidth={1.5} />
      <T x={514} y={92} size={10} tone="muted" anchor="start" weight={800}>TIPO DE SECCIÓN</T>
      <T x={514} y={118} size={17} weight={800} tone={sectionInfo[step].tone} anchor="start">{sectionInfo[step].name}</T>
      {sectionInfo[step].lines.map((line, i) => <T key={i} x={514} y={148 + i * 18} size={11} anchor="start">{line}</T>)}
      <T x={620} y={250} size={10.5} tone="muted">pregunta → filtros → consulta</T>
      <T x={620} y={266} size={10.5} tone="muted">→ visualización → interpretación</T>
    </Svg>
  )
}

/* ——— 3. Anatomía de un Dashboard ——— */
function DashboardModel({ step }: { step: number }) {
  const changed = step >= 2
  const svc = changed ? 'payment' : 'checkout'
  return (
    <Svg h={340} label="Dashboard con Query tiles, Markdown tile y variable; drilldown hacia un Notebook y Document API JSON">
      <rect x={20} y={12} width={452} height={316} rx={12} fill={C.paperSoft} stroke={C.line} strokeWidth={1.5} />
      <T x={34} y={38} size={13} weight={800} tone="navy" anchor="start">Dashboard</T>
      {/* Variable */}
      <g className={dim(step >= 1)}>
        <rect x={236} y={20} width={226} height={28} rx={6} fill="#fff" stroke={step >= 1 ? C.coral : C.line} strokeWidth={1.5} />
        <text x={248} y={38} fontSize={11.5} fontWeight={700} fill={toneColors.coral.text} fontFamily={MONO}>$service</text>
        <rect x={322} y={25} width={132} height={18} rx={4} fill={step === 2 ? C.coral : C.coralTint} />
        <text x={332} y={38} fontSize={11} fontWeight={700} fill={step === 2 ? '#fff' : C.ink} fontFamily={MONO}>{svc} ▾</text>
      </g>
      {/* Markdown tile */}
      <rect x={30} y={58} width={160} height={92} rx={8} fill="#fff" stroke={C.line} />
      <Tag x={38} y={66} text="Markdown tile" tone="amber" />
      <T x={40} y={106} size={13} weight={800} anchor="start">Estado de {svc}</T>
      <rect x={40} y={118} width={130} height={5} rx={2.5} fill="#c5d3d0" />
      <rect x={40} y={128} width={96} height={5} rx={2.5} fill="#c5d3d0" />
      {/* KPI tile */}
      <rect x={200} y={58} width={262} height={92} rx={8} fill="#fff" stroke={changed ? C.coral : C.line} strokeWidth={changed ? 1.8 : 1} />
      <Tag x={208} y={66} text="Query tile · single value" tone="teal" />
      <text x={210} y={106} fontSize={10} fill={C.soft} fontFamily={MONO}>… | filter service.name == $service</text>
      <rect x={210} y={118} width={240} height={16} rx={4} fill={C.paperSoft} />
      <rect x={210} y={118} width={changed ? 170 : 96} height={16} rx={4} fill={changed ? C.coral : C.teal} />
      {/* Line tile */}
      <rect x={30} y={160} width={432} height={158} rx={8} fill="#fff" stroke={changed ? C.coral : C.line} strokeWidth={changed ? 1.8 : 1} />
      <Tag x={38} y={168} text="Query tile · líneas" tone="teal" />
      <text x={40} y={202} fontSize={10} fill={C.soft} fontFamily={MONO}>timeseries … | filter service.name == $service</text>
      <Spark x={44} y={222} w={400} h={80} values={[5, 6, 5, 7, 6, 6, 7, 6, 7, 6]} tone="teal" className={show(!changed)} />
      <Spark x={44} y={222} w={400} h={80} values={[4, 5, 4, 5, 9, 12, 11, 7, 6, 5]} tone="coral" className={show(changed)} />
      <g className={show(step === 2)}>
        <circle cx={454} cy={70} r={6} fill={C.coral} className="sv-blink" />
        <circle cx={454} cy={172} r={6} fill={C.coral} className="sv-blink" />
      </g>
      {/* Drilldown */}
      <g className={show(step === 3)}>
        <Chip x={396} y={178} text="Drilldown ↗" tone="violet" solid size={10.5} w={96} />
        <Arrow d="M444,178 C490,178 480,90 500,82" tone="violet" flow />
      </g>

      {/* Panel derecho por paso */}
      <g className={show(step === 0)}>
        <T x={500} y={30} size={10} tone="muted" anchor="start" weight={800}>TIPOS DE TILE</T>
        <Box x={500} y={42} w={240} h={100} tone="teal" />
        <T x={514} y={66} size={12.5} weight={800} tone="teal" anchor="start">Query tile</T>
        <T x={514} y={86} size={11} anchor="start">Ejecuta DQL contra Grail:</T>
        <T x={514} y={102} size={11} anchor="start">barras, líneas, tablas, single value.</T>
        <T x={514} y={124} size={10.5} tone="muted" anchor="start">Requiere permisos de lectura</T>
        <Box x={500} y={156} w={240} h={86} tone="amber" />
        <T x={514} y={180} size={12.5} weight={800} tone="amber" anchor="start">Markdown tile</T>
        <T x={514} y={200} size={11} anchor="start">Títulos y notas explicativas.</T>
        <T x={514} y={222} size={10.5} tone="muted" anchor="start">No ejecuta código dinámico</T>
      </g>
      <g className={show(step === 1)}>
        <T x={500} y={30} size={10} tone="muted" anchor="start" weight={800}>VARIABLE ($var)</T>
        <Box x={500} y={42} w={240} h={220} tone="coral" />
        <T x={514} y={66} size={11} anchor="start">Se referencia en DQL como</T>
        <text x={514} y={84} fontSize={11.5} fontWeight={700} fill={toneColors.coral.text} fontFamily={MONO}>$service</text>
        <T x={514} y={110} size={11} anchor="start">Tipos: DQL, Code, List, Free Text</T>
        <T x={514} y={134} size={11} anchor="start">Puede depender de otra</T>
        <T x={514} y={150} size={10.5} tone="muted" anchor="start">(p. ej. Procesos según el Host)</T>
        <Mark x={522} y={178} ok={false} r={8} />
        <T x={538} y={182} size={11} anchor="start">dependencias circulares</T>
        <Mark x={522} y={206} ok={false} r={8} />
        <text x={538} y={210} fontSize={11} fill={C.ink} fontFamily={MONO}>$dt_service</text>
        <T x={514} y={236} size={10.5} tone="muted" anchor="start">el prefijo dt_ está reservado</T>
        <T x={514} y={250} size={10.5} tone="muted" anchor="start">para el sistema</T>
      </g>
      <g className={show(step === 2)}>
        <T x={500} y={30} size={10} tone="muted" anchor="start" weight={800}>CAMBIO DE VARIABLE</T>
        <Box x={500} y={42} w={240} h={120} tone="coral" />
        <text x={514} y={70} fontSize={11.5} fontFamily={MONO} fill={C.ink}>checkout → <tspan fontWeight={800} fill={toneColors.coral.text}>payment</tspan></text>
        <T x={514} y={98} size={11} anchor="start">Los Query tiles que usan</T>
        <T x={514} y={114} size={11} anchor="start">$service se actualizan con</T>
        <T x={514} y={130} size={11} anchor="start">el nuevo valor: un mismo</T>
        <T x={514} y={146} size={11} anchor="start">Dashboard, muchos contextos.</T>
      </g>
      <g className={show(step === 3)}>
        <T x={500} y={30} size={10} tone="muted" anchor="start" weight={800}>DRILLDOWN ACTION</T>
        <Box x={500} y={42} w={240} h={80} label="Notebook / App" sub="continúa la investigación" tone="violet" solid />
        <T x={514} y={148} size={11} anchor="start">Transmite el contexto activo:</T>
        {['timeframe', 'entity IDs', 'filtros activos'].map((chip, i) => <Chip key={chip} x={560} y={172 + i * 30} text={chip} tone="violet" size={10.5} w={110} />)}
      </g>
      <g className={show(step === 4)}>
        <T x={500} y={30} size={10} tone="muted" anchor="start" weight={800}>DOCUMENT API</T>
        <rect x={500} y={42} width={240} height={200} rx={8} fill={C.navy} />
        {['{', '  "tiles": { … },', '  "variables": [', '    { "key": "service" }', '  ],', '  "layouts": { … }', '}'].map((line, i) => (
          <text key={i} x={514 + (line.length - line.trimStart().length) * 6.6} y={66 + i * 22} fontSize={11} fill="#fff" fontFamily={MONO}>{line.trimStart()}</text>
        ))}
        <T x={620} y={264} size={11} tone="navy" weight={700}>estructura JSON declarativa</T>
        <T x={620} y={282} size={10.5} tone="muted">exportar y sincronizar con GitOps</T>
      </g>
      <rect x={20} y={12} width={452} height={316} rx={12} fill="none" stroke={C.navy} strokeWidth={2} strokeDasharray="6 5" className={show(step === 4)} />
    </Svg>
  )
}

/* ——— 4. Visualizaciones: pregunta y riesgo ——— */
function Visualizations({ step }: { step: number }) {
  const risk = step === 1
  const cols = [
    { title: 'Tabla', q: ['¿Qué registros forman', 'el resultado?'], r: ['Ocultar volumen', 'o duplicados'] },
    { title: 'Serie temporal', q: ['¿Cómo evoluciona?'], r: ['Elegir intervalo', 'inadecuado'] },
    { title: 'KPI', q: ['¿Cuál es el valor', 'de decisión?'], r: ['Omitir unidad', 'o periodo'] },
    { title: 'Distribución', q: ['¿Cómo se reparte?'], r: ['Confundir promedio', 'con población'] },
  ]
  const hist = [6, 14, 24, 14, 5, 3, 5, 15, 26, 16, 6]
  return (
    <Svg h={300} label="Cuatro salidas: tabla, serie temporal, KPI y distribución, con su pregunta y su riesgo">
      {cols.map((col, i) => {
        const x = 20 + i * 184
        return (
          <g key={col.title}>
            <rect x={x} y={12} width={172} height={176} rx={10} fill="#fff" stroke={risk ? C.coral : C.line} strokeWidth={1.4} />
            <T x={x + 86} y={34} size={13} weight={800} tone="navy">{col.title}</T>
            {col.q.map((line, k) => <T key={k} x={x + 86} y={212 + k * 16} size={11} weight={600} tone={risk ? 'muted' : 'teal'}>{line}</T>)}
            <g className={show(risk)}>
              <rect x={x} y={248} width={172} height={44} rx={8} fill={C.coralTint} stroke={C.coral} />
              {col.r.map((line, k) => <T key={k} x={x + 86} y={266 + k * 15} size={11} weight={700} tone="coral">{line}</T>)}
            </g>
          </g>
        )
      })}
      {/* Tabla */}
      {[0, 1, 2, 3, 4].map((r) => {
        const dup = risk && (r === 2 || r === 3)
        return (
          <g key={r}>
            <rect x={32} y={48 + r * 22} width={148} height={18} rx={3} fill={dup ? C.coralTint : r === 0 ? '#e4ecee' : '#f6f9f8'} stroke={dup ? C.coral : C.line} />
            <text x={40} y={61 + r * 22} fontSize={10} fontFamily={MONO} fill={C.ink}>{r === 0 ? 'timestamp  host' : `10:0${r === 3 ? 2 : r}  host-${r === 3 ? 'b' : 'abcd'[r - 1]}`}</text>
          </g>
        )
      })}
      <T x={106} y={176} size={10} tone={risk ? 'coral' : 'muted'} weight={risk ? 700 : 500}>{risk ? '¿duplicados? ¿limit?' : 'detalle y auditoría'}</T>
      {/* Serie */}
      <line x1={216} x2={372} y1={150} y2={150} stroke={C.line} />
      <Spark x={216} y={56} w={156} h={88} values={[5, 6, 5, 6, 22, 6, 5, 6, 5, 6, 5, 6]} tone="teal" className={show(!risk)} />
      <Spark x={216} y={56} w={156} h={88} values={[5.5, 9, 5.5, 5.5]} tone="coral" className={show(risk)} />
      <T x={294} y={176} size={10} tone={risk ? 'coral' : 'muted'} weight={risk ? 700 : 500}>{risk ? 'el pico desaparece' : 'tendencia'}</T>
      {/* KPI */}
      <T x={474} y={112} size={34} weight={800} tone="teal" className={show(!risk)}>240</T>
      <T x={474} y={134} size={11} tone="muted" className={show(!risk)}>ms · p90 · últimas 2 h</T>
      <T x={474} y={112} size={34} weight={800} tone="coral" className={show(risk)}>240</T>
      <T x={474} y={134} size={11} tone="coral" weight={700} className={show(risk)}>¿unidad? ¿periodo?</T>
      <T x={474} y={176} size={10} tone="muted">valor de decisión</T>
      {/* Distribución */}
      {hist.map((v, k) => <rect key={k} x={572 + k * 14} y={150 - v * 3.4} width={11} height={v * 3.4} rx={2} fill={C.violet} opacity={0.75} />)}
      <line x1={572} x2={726} y1={150} y2={150} stroke={C.line} />
      <g className={show(risk)}>
        <line x1={648} x2={648} y1={52} y2={152} stroke={C.coral} strokeWidth={2} strokeDasharray="4 3" />
        <T x={652} y={62} size={10} tone="coral" anchor="start" weight={700}>promedio</T>
      </g>
      <T x={650} y={176} size={10} tone={risk ? 'coral' : 'muted'} weight={risk ? 700 : 500}>{risk ? 'pocos valores en la media' : 'variabilidad'}</T>
    </Svg>
  )
}

/* ——— 5. Sharing y permisos de datos ——— */
const shareLevels = [
  { name: 'Can view', desc: 'lectura del documento' },
  { name: 'Can edit', desc: 'cambios y ejecución (en su alcance)' },
  { name: 'Share link', desc: 'según el permiso del enlace' },
  { name: 'Owner', desc: 'controla sharing y ownership' },
]

function ViewerPanel({ y, name, dataOk, visible }: { y: number; name: string; dataOk: boolean; visible: boolean }) {
  return (
    <g className={show(visible)}>
      <rect x={440} y={y} width={300} height={132} rx={10} fill="#fff" stroke={dataOk ? C.teal : C.coral} strokeWidth={1.5} />
      <Person x={462} y={y + 34} tone={dataOk ? 'teal' : 'coral'} scale={0.85} />
      <T x={482} y={y + 26} size={12} weight={800} anchor="start">{name}</T>
      <T x={482} y={y + 42} size={10.5} tone="muted" anchor="start">Can view</T>
      <Chip x={654} y={y + 30} text={dataOk ? 'data: permitido' : 'data: restringido'} tone={dataOk ? 'teal' : 'coral'} size={10} w={130} />
      <rect x={454} y={y + 56} width={272} height={64} rx={6} fill={C.paperSoft} />
      <T x={462} y={y + 70} size={10} tone="muted" anchor="start" weight={700}>Query tile: mismo DQL</T>
      {dataOk ? (
        [0, 1, 2].map((r) => <rect key={r} x={462} y={y + 78 + r * 13} width={[220, 180, 200][r]} height={8} rx={2} fill={C.teal} opacity={0.55} />)
      ) : (
        <T x={590} y={y + 100} size={11} weight={700} tone="coral">la consulta no devuelve datos</T>
      )}
    </g>
  )
}

function DocumentSharing({ step }: { step: number }) {
  return (
    <Svg h={330} label="El mismo documento compartido muestra resultados distintos según los data permissions de cada usuario">
      {/* Owner y niveles */}
      <Person x={40} y={40} tone="navy" scale={0.9} />
      <T x={62} y={32} size={12.5} weight={800} anchor="start" tone="navy">Owner</T>
      <T x={62} y={48} size={10.5} tone="muted" anchor="start">comparte el documento</T>
      {shareLevels.map((level, i) => {
        const y = 70 + i * 52
        const active = step === 0 || (step >= 1 && step <= 2 && level.name === 'Can view')
        return (
          <g key={level.name} className={dim(active || step === 3)}>
            <rect x={20} y={y} width={222} height={44} rx={8} fill={level.name === 'Can view' && step >= 1 ? C.tealTint : '#fff'} stroke={level.name === 'Can view' && step >= 1 ? C.teal : C.line} strokeWidth={1.4} />
            <T x={32} y={y + 19} size={12} weight={800} anchor="start" tone="navy">{level.name}</T>
            <T x={32} y={y + 35} size={10.5} tone="muted" anchor="start">{level.desc}</T>
          </g>
        )
      })}
      <T x={20} y={296} size={10.5} tone="amber" weight={700} anchor="start">Cambiar owner = transferencia,</T>
      <T x={20} y={311} size={10.5} tone="amber" weight={700} anchor="start">no copia</T>
      {/* Documento */}
      <rect x={290} y={110} width={96} height={116} rx={6} fill="#fff" stroke={C.navy} strokeWidth={1.6} />
      <T x={338} y={134} size={11.5} weight={800} tone="navy">Dashboard</T>
      <rect x={302} y={146} width={72} height={30} rx={4} fill={C.paperSoft} />
      <Spark x={306} y={150} w={64} h={22} values={[3, 5, 4, 6, 5, 7]} tone="navy" />
      <rect x={302} y={184} width={72} height={30} rx={4} fill={C.paperSoft} />
      <T x={338} y={243} size={10.5} tone="muted">un solo documento</T>
      <Arrow from={[244, 92]} to={[300, 118]} tone="navy" className={show(step === 0)} />
      <Arrow d="M388,150 C414,150 410,84 436,84" tone="teal" flow className={show(step >= 1)} />
      <Arrow d="M388,190 C414,190 410,236 436,236" tone="coral" flow className={show(step >= 2)} />
      <ViewerPanel y={18} name="Usuario A" dataOk visible={step >= 1} />
      <ViewerPanel y={172} name="Usuario B" dataOk={false} visible={step >= 2} />
      {/* Diagnóstico */}
      <g className={show(step === 3)}>
        <rect x={248} y={254} width={186} height={74} rx={8} fill="#fff" stroke={C.navy} strokeWidth={1.4} />
        <T x={341} y={269} size={10} tone="muted" weight={800}>DIAGNOSTICA POR SEPARADO</T>
        <T x={396} y={285} size={10} weight={800} tone="teal">A</T>
        <T x={420} y={285} size={10} weight={800} tone="coral">B</T>
        <T x={256} y={302} size={10.5} anchor="start">Document permission</T>
        <Mark x={396} y={298} ok r={7} />
        <Mark x={420} y={298} ok r={7} />
        <T x={256} y={320} size={10.5} anchor="start">Data permission</T>
        <Mark x={396} y={316} ok r={7} />
        <Mark x={420} y={316} ok={false} r={7} />
      </g>
    </Svg>
  )
}

/* ——— 6. Precedencia de timeframe en los tiles ——— */
const tfTiles = [
  { name: 'Errores', rule: 'sin override', dql: 'fetch logs | filter …', mode: 'global' as const },
  { name: 'Latencia', rule: 'Custom timeframe: Last 24 hours', dql: 'timeseries avg(…)', mode: 'custom' as const },
  { name: 'Despliegues', rule: 'timeframe en la DQL', dql: 'fetch events, from: now()-7d', mode: 'dql' as const },
]

function TimeframePrecedence({ step }: { step: number }) {
  const global = step === 0 ? 'Last 2 hours' : 'Last 30 minutes'
  const effective = (mode: 'global' | 'custom' | 'dql') => (mode === 'global' ? (step === 0 ? '2 h' : '30 min') : mode === 'custom' ? '24 h' : '7 días')
  const why = { global: 'sigue al selector global', custom: 'el tile prevalece', dql: 'selector deshabilitado' }
  return (
    <Svg h={330} label="Tres tiles ante un cambio del timeframe global: sin override sigue al global, Custom timeframe prevalece y DQL con from deshabilita el selector">
      <rect x={20} y={12} width={720} height={44} rx={10} fill={C.paperSoft} stroke={C.line} />
      <T x={36} y={39} size={12.5} weight={800} tone="navy" anchor="start">Selector global del Dashboard</T>
      <rect x={300} y={22} width={170} height={24} rx={6} fill={step >= 1 ? C.navy : '#fff'} stroke={C.navy} strokeWidth={1.4} />
      <T x={385} y={38.5} size={12} weight={800} anchor="middle" className="" tone={step >= 1 ? 'white' : 'navy'}>{global} ▾</T>
      <g className={show(step === 1)}>
        <T x={490} y={39} size={11} tone="amber" weight={700} anchor="start" className="sv-blink">cambias el selector</T>
      </g>
      {tfTiles.map((tile, i) => {
        const x = 20 + i * 244
        const eff = effective(tile.mode)
        const follows = tile.mode === 'global'
        const tone: Tone = tile.mode === 'global' ? 'teal' : tile.mode === 'custom' ? 'amber' : 'violet'
        return (
          <g key={tile.name}>
            <Arrow from={[x + 112, 58]} to={[x + 112, 84]} tone={follows ? 'teal' : 'neutral'} dashed={!follows} />
            <rect x={x} y={88} width={232} height={176} rx={10} fill="#fff" stroke={step === 2 ? toneColors[tone].solid : C.line} strokeWidth={step === 2 ? 2 : 1.3} />
            <T x={x + 14} y={112} size={13} weight={800} anchor="start" tone="navy">{tile.name}</T>
            <T x={x + 14} y={132} size={10.5} tone="muted" anchor="start">{tile.rule}</T>
            <text x={x + 14} y={154} fontSize={10} fill={C.tealDark} fontFamily={MONO}>{tile.dql}</text>
            <Spark x={x + 16} y={166} w={200} h={40} values={[4, 6, 5, 7, 6, 9, 7, 6, 8, 7]} tone={tone} />
            <rect x={x + 14} y={220} width={204} height={30} rx={6} fill={toneColors[tone].fill} stroke={toneColors[tone].stroke} />
            <T x={x + 26} y={240} size={11} anchor="start" weight={700}>Intervalo:</T>
            <T x={x + 206} y={240} size={13} anchor="end" weight={800} tone={tone}>{eff}</T>
            <g className={show(step === 2)}>
              <T x={x + 116} y={286} size={11} weight={700} tone={tone}>{why[tile.mode]}</T>
            </g>
          </g>
        )
      })}
      <g className={show(step === 2)}>
        <T x={380} y={318} size={11} tone="muted">Sin override → global · Custom timeframe → tile · from: en la DQL → consulta</T>
      </g>
    </Svg>
  )
}

/* ——— 7. tiles + layouts en una cuadrícula de 24 columnas ——— */
function DashboardJson({ step }: { step: number }) {
  const gx = 380
  const gw = 360
  const col = gw / 24
  return (
    <Svg h={300} label="El JSON de un Dashboard: tiles define el contenido, layouts la posición; con 24 columnas, w 12 es medio ancho">
      <rect x={20} y={12} width={330} height={276} rx={10} fill={C.navy} />
      {[
        { t: '"tiles": {', on: step === 0 },
        { t: '  "1": { "type": "data", … },', on: step === 0 },
        { t: '  "2": { "type": "markdown", … }', on: step === 0 },
        { t: '},', on: step === 0 },
        { t: '"layouts": {', on: step >= 1 },
        { t: '  "1": { "x": 0,  "y": 0, "w": 12, "h": 6 },', on: step >= 1 },
        { t: '  "2": { "x": 12, "y": 0, "w": 12, "h": 6 }', on: step >= 1 },
        { t: '}', on: step >= 1 },
      ].map((line, i) => (
        <text key={i} x={34 + (line.t.length - line.t.trimStart().length) * 6} y={46 + i * 28} fontSize={10.5} fontFamily={MONO} fill="#fff" opacity={line.on ? 1 : 0.4}>{line.t.trimStart()}</text>
      ))}
      <T x={185} y={276} size={10.5} tone="white" weight={700}>los IDs "1" y "2" coinciden</T>
      {/* Cuadrícula */}
      <T x={gx} y={30} size={11} weight={800} tone="muted" anchor="start">CUADRÍCULA DE 24 COLUMNAS</T>
      <rect x={gx} y={44} width={gw} height={200} rx={6} fill="#fff" stroke={C.line} />
      {Array.from({ length: 25 }, (_, i) => (
        <line key={i} x1={gx + i * col} x2={gx + i * col} y1={44} y2={244} stroke={C.line} strokeWidth={i % 12 === 0 ? 1.4 : 0.6} opacity={step === 2 ? 1 : 0.5} />
      ))}
      <g className={show(step >= 1)}>
        <rect x={gx + 4} y={52} width={12 * col - 8} height={110} rx={6} fill={C.tealTint} stroke={C.teal} strokeWidth={1.5} />
        <T x={gx + 6 * col} y={100} size={13} weight={800} tone="teal">tile "1"</T>
        <T x={gx + 6 * col} y={120} size={10.5} tone="muted">x 0 · w 12</T>
        <rect x={gx + 12 * col + 4} y={52} width={12 * col - 8} height={110} rx={6} fill={C.amberTint} stroke={C.amber} strokeWidth={1.5} />
        <T x={gx + 18 * col} y={100} size={13} weight={800} tone="amber">tile "2"</T>
        <T x={gx + 18 * col} y={120} size={10.5} tone="muted">x 12 · w 12</T>
      </g>
      <g className={show(step === 0)}>
        <T x={gx + gw / 2} y={150} size={11.5} tone="muted">sin layouts, los tiles no se colocan</T>
      </g>
      <g className={show(step === 2)}>
        <Arrow from={[gx + 4, 182]} to={[gx + 12 * col - 4, 182]} tone="navy" />
        <T x={gx + 6 * col} y={200} size={11} weight={700} tone="navy">12 de 24 = medio ancho</T>
        <T x={gx + gw / 2} y={266} size={11} tone="muted">x, y, w, h en unidades de cuadrícula, no en píxeles</T>
      </g>
    </Svg>
  )
}

export const notebooksVisuals: VisualRegistry = {
  choose: {
    kind: 'animation',
    title: 'Notebook para investigar, Dashboard para vigilar',
    caption: 'Un Notebook es una secuencia narrativa (contexto → consulta → resultado → interpretación); un Dashboard es una rejilla de tiles para seguimiento recurrente. Observa cómo cada necesidad se clasifica por su propósito, no por la estética.',
    steps: needs.map((n) => n.need),
    stepMs: 2600,
    render: ({ step }) => <Choose step={step} />,
  },
  'deep-notebook-sections': {
    kind: 'animation',
    title: 'Un Notebook combina exploración, consulta, código y narrativa',
    caption: 'Cada tipo de sección tiene un papel: Explore descubre sin escribir consultas, Query ejecuta DQL sobre Grail, Code ejecuta JavaScript como Dynatrace function y Markdown documenta la pregunta y la conclusión. Además, una sección Prompt traduce preguntas en lenguaje natural a DQL.',
    steps: ['Explore', 'Query (DQL)', 'Code (JavaScript)', 'Markdown'],
    stepMs: 2600,
    render: ({ step }) => <NotebookSections step={step} />,
  },
  'deep-dashboard-model': {
    kind: 'animation',
    title: 'Tiles, variables, drilldown y Document API',
    caption: 'Además de Explore y Code tiles, los Query tiles ejecutan DQL y los Markdown tiles aportan contexto. La variable $service (nunca con prefijo dt_) parametriza los tiles: al cambiarla, se actualizan. Un Drilldown Action lleva timeframe, entity IDs y filtros a un Notebook o App, y todo el Dashboard es un JSON declarativo en la Document API.',
    steps: ['Query tiles y Markdown tile', 'Variable $service', 'Cambio de variable', 'Drilldown Action', 'Document API JSON'],
    stepMs: 2800,
    render: ({ step }) => <DashboardModel step={step} />,
  },
  visualizations: {
    kind: 'animation',
    title: 'Cada salida responde una pregunta y trae un riesgo',
    caption: 'Primero, la pregunta que cada forma responde bien; después, el error típico que introduce. Una visualización llamativa no corrige una métrica mal definida: declara unidad, periodo, dimensión y agregación.',
    steps: ['Qué pregunta responde', 'Qué riesgo introduce'],
    stepMs: 3200,
    render: ({ step }) => <Visualizations step={step} />,
  },
  'deep-document-sharing': {
    kind: 'animation',
    title: 'Compartir el documento no comparte los datos',
    caption: 'Los dos usuarios reciben el mismo Dashboard con Can view, pero la consulta se ejecuta con los data permissions de cada uno: A ve resultados y B no. Si un documento se abre pero no devuelve datos, diagnostica document permission y data permission por separado.',
    steps: ['El owner comparte el documento', 'Usuario A: Can view, ve datos', 'Usuario B: Can view, sin datos', 'Dos capas de permisos'],
    stepMs: 2800,
    render: ({ step }) => <DocumentSharing step={step} />,
  },
  'sup-dashboard-tiles-timeframe': {
    kind: 'animation',
    title: 'Qué intervalo usa cada tile',
    caption: 'Al cambiar el selector global, solo el tile sin override lo sigue. El Custom timeframe del tile prevalece sobre el global, y si la DQL fija el intervalo con from:, el selector queda deshabilitado y manda la consulta.',
    steps: ['Global: Last 2 hours', 'Cambias a Last 30 minutes', 'Por qué cada tile usa su intervalo'],
    stepMs: 2800,
    render: ({ step }) => <TimeframePrecedence step={step} />,
  },
  'sup-dashboard-json': {
    kind: 'animation',
    title: 'tiles define el contenido; layouts, la posición',
    caption: 'Cada tile de tiles necesita una entrada con el mismo ID en layouts. x, y, w y h se miden en una cuadrícula de 24 columnas: dos tiles con w 12 en x 0 y x 12 quedan uno junto al otro, cada uno con medio ancho.',
    steps: ['tiles: el contenido', 'layouts: la posición', '24 columnas: w 12 = medio ancho'],
    stepMs: 2800,
    render: ({ step }) => <DashboardJson step={step} />,
  },
}
