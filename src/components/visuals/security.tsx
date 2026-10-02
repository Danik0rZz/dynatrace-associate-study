import { Arrow, Box, C, Chip, Cylinder, Mark, Particle, Person, Svg, T, cx, dim, show, toneColors } from './kit'
import type { VisualRegistry } from './types'

/** Líneas de texto apiladas (local). */
function Lines({ x, y, lines, size = 10.5, gap = 14, tone = 'ink', weight = 500, anchor = 'start', className }: { x: number; y: number; lines: string[]; size?: number; gap?: number; tone?: 'ink' | 'muted' | 'teal' | 'coral' | 'navy' | 'amber' | 'violet' | 'white'; weight?: number; anchor?: 'start' | 'middle' | 'end'; className?: string }) {
  return (
    <g className={className}>
      {lines.map((line, i) => (
        <T key={i} x={x} y={y + i * gap} size={size} tone={tone} weight={weight} anchor={anchor}>{line}</T>
      ))}
    </g>
  )
}

/* ——— 1. Código propio frente a dependencias directas y transitivas ——— */
const ownershipCases = [
  { title: 'Código propio', q: '¿Qué ruta o componente controlamos?', next: 'Corregir, probar y desplegar' },
  { title: 'Dependencia directa', q: '¿Qué versión y uso están activos?', next: 'Actualizar o mitigar' },
  { title: 'Dependencia transitiva', q: '¿Qué paquete la introduce?', next: 'Trazar cadena y evaluar upgrade' },
  { title: 'Exposición runtime', q: '¿Se ejecuta y es alcanzable?', next: 'Priorizar con contexto' },
]

function CodeThirdParty({ step }: { step: number }) {
  const current = ownershipCases[step]
  const on = (i: number) => step === i || (step === 3 && i !== 1)
  return (
    <Svg h={320} label="Árbol de dependencias: código propio, dependencias directas y una transitiva vulnerable">
      <T x={20} y={22} size={10} tone="muted" anchor="start" weight={800}>PROCESO DE LA APLICACIÓN</T>
      <rect x={14} y={32} width={432} height={270} rx={14} fill="none" stroke={step === 3 ? C.teal : C.line} strokeWidth={step === 3 ? 2 : 1.5} strokeDasharray="6 6" className={step === 3 ? 'sv-flow-slow' : undefined} />
      {/* Árbol */}
      <Arrow from={[180, 96]} to={[120, 136]} tone="navy" />
      <Arrow from={[280, 96]} to={[340, 136]} tone="navy" />
      <Arrow from={[120, 186]} to={[120, 226]} tone={step >= 2 ? 'coral' : 'navy'} />
      <g className={dim(on(0))}>
        <Box x={140} y={46} w={180} h={50} label="Mi aplicación" sub="código propio" tone="navy" solid={step === 0} />
      </g>
      <g className={dim(on(1) || step >= 2)}>
        <Box x={40} y={138} w={160} h={48} label="Dependencia A" sub="directa" tone={step === 1 ? 'teal' : 'neutral'} />
      </g>
      <g className={dim(on(1))}>
        <Box x={260} y={138} w={160} h={48} label="Dependencia B" sub="directa" tone={step === 1 ? 'teal' : 'neutral'} />
      </g>
      <g className={dim(on(2))}>
        <Box x={40} y={228} w={160} h={50} label="Librería C" sub="transitiva · vulnerable" tone="coral" solid={step === 2} />
        <circle cx={196} cy={232} r={10} fill={C.coral} className="sv-pulse" />
        <T x={196} y={236} size={11} weight={900} tone="white">!</T>
      </g>
      <g className={show(step === 2)}>
        <T x={214} y={246} size={10.5} tone="coral" anchor="start" weight={700}>llega a través de A,</T>
        <T x={214} y={260} size={10.5} tone="coral" anchor="start" weight={700}>no la declaras tú</T>
      </g>
      {step === 3 && <Particle path="M230,40 L230,96 L120,160 L120,252" dur={2.6} tone="teal" r={5} />}
      <g className={show(step === 3)}>
        <T x={214} y={246} size={10.5} tone="teal" anchor="start" weight={700}>¿se carga y la alcanza</T>
        <T x={214} y={260} size={10.5} tone="teal" anchor="start" weight={700}>una petición real?</T>
      </g>
      {/* Panel del caso */}
      <rect x={470} y={46} width={274} height={232} rx={12} fill={C.paperSoft} stroke={C.line} />
      <T x={488} y={72} size={10} tone="muted" anchor="start" weight={800}>{`CASO ${step + 1} DE 4`}</T>
      <T x={488} y={96} size={15} tone="navy" anchor="start" weight={800}>{current.title}</T>
      <T x={488} y={126} size={10} tone="muted" anchor="start" weight={800}>PREGUNTA</T>
      <T x={488} y={144} size={12} anchor="start" weight={600}>{current.q}</T>
      <T x={488} y={178} size={10} tone="muted" anchor="start" weight={800}>SIGUIENTE PASO</T>
      <Box x={488} y={188} w={238} h={38} label={current.next} tone="teal" size={12} />
      <Chip x={607} y={254} text="Mismo proceso ≠ código propio" tone="amber" w={230} />
    </Svg>
  )
}

/* ——— 2. Runtime Vulnerability Analytics ——— */
const rvaFocus = [
  { key: 'Componente', text: 'Qué versión y dependencia están presentes.' },
  { key: 'Runtime', text: 'Si el componente está cargado y observado.' },
  { key: 'Input flow', text: 'Por qué camino entra el dato.' },
  { key: 'Contexto', text: 'Qué aplicación, servicio y endpoint intervienen.' },
  { key: 'Evidencia', text: 'Qué observación permite priorizar y verificar.' },
]

function Rva({ step }: { step: number }) {
  const hl = (keys: number[]) => (keys.includes(step) ? 'sv-in' : 'sv-dim')
  return (
    <Svg h={330} label="Runtime Vulnerability Analytics: una petición externa fluye por endpoint y servicio hasta una librería vulnerable cargada">
      {/* Origen */}
      <g className={hl([2, 3, 4])}>
        <Person x={44} y={128} tone="navy" />
        <T x={44} y={158} size={10.5} tone="muted">petición</T>
        <T x={44} y={171} size={10.5} tone="muted">externa</T>
      </g>
      <g className={hl([2, 3, 4])}>
        <Box x={84} y={100} w={112} h={48} label="Endpoint" sub="entrada" tone="navy" />
      </g>
      <g className={hl([2, 3, 4])}>
        <Box x={228} y={100} w={112} h={48} label="Servicio" sub="aplicación" tone="navy" />
      </g>
      {/* Proceso */}
      <g className={hl([1, 3, 4])}>
        <rect x={372} y={50} width={374} height={150} rx={14} fill={toneColors.teal.fill} stroke={C.teal} strokeWidth={1.5} />
        <T x={386} y={72} size={10.5} tone="teal" anchor="start" weight={800}>Proceso monitorizado · code module</T>
      </g>
      <g className={hl([2, 3, 4])}>
        <Box x={388} y={100} w={140} h={48} label="Código de la app" tone="neutral" size={12} />
      </g>
      <g className={hl([0, 1, 2, 4])}>
        <Box x={570} y={96} w={160} h={56} label="Librería vulnerable" sub="versión · dependencia" tone="coral" solid={step === 0 || step === 4} size={12} />
        <Chip x={650} y={176} text="cargada en memoria" tone="teal" solid={step === 1} w={150} />
      </g>
      <Arrow from={[58, 124]} to={[82, 124]} tone="navy" />
      <Arrow from={[198, 124]} to={[226, 124]} tone="navy" flow />
      <Arrow from={[342, 124]} to={[386, 124]} tone="navy" flow />
      <Arrow from={[530, 124]} to={[568, 124]} tone="coral" flow />
      <Particle path="M44,124 L140,124 L284,124 L458,124 L650,124" dur={3.4} tone={step === 2 ? 'coral' : 'amber'} r={6} />
      {/* Disco */}
      <Cylinder x={610} y={232} w={80} h={56} tone="neutral" label="disco" />
      <Mark x={700} y={240} ok={false} r={9} />
      <T x={650} y={312} size={10.5} tone="muted">en disco ≠ cargada</T>
      {/* Panel del foco */}
      <rect x={20} y={226} width={560} height={82} rx={12} fill={C.paperSoft} stroke={C.line} />
      {rvaFocus.map((f, i) => (
        <Chip key={f.key} x={78 + i * 108} y={248} text={f.key} tone={i === step ? 'teal' : 'neutral'} solid={i === step} w={100} size={10.5} />
      ))}
      <T x={36} y={288} size={12.5} anchor="start" weight={650}>{rvaFocus[step].text}</T>
      <g className={show(step === 4)}>
        <rect x={384} y={92} width={354} height={68} rx={10} fill="none" stroke={C.amber} strokeWidth={2} strokeDasharray="6 5" className="sv-flow-slow" />
      </g>
    </Svg>
  )
}

/* ——— 3. Third-party vs Code-level vs Runtime Application Protection vs Mute ——— */
function FindingTypes() {
  const cols = [
    { x: 14, title: 'Third-party', tag: 'CVE', tone: 'coral' as const, origin: ['Librería o framework', 'externo'], how: ['Binarios/JARs cargados', 'en memoria del proceso'] },
    { x: 200, title: 'Code-level', tag: 'CWE', tone: 'coral' as const, origin: ['Código propio de', 'la aplicación'], how: ['Flujo de entrada hasta', 'sinks vulnerables'] },
    { x: 386, title: 'RAP', tag: 'ataque', tone: 'amber' as const, origin: ['Ataque activo', 'en ejecución'], how: ['Payloads maliciosos', 'contra el servicio'] },
    { x: 572, title: 'Mute', tag: 'gestión', tone: 'neutral' as const, origin: ['Riesgo evaluado o', 'falso positivo'], how: ['Silencia entidades:', 'no corrige ni excluye'] },
  ]
  const w = 174
  return (
    <Svg h={360} label="Comparación de hallazgos: third-party, code-level, Runtime Application Protection y mute">
      {cols.map((c) => (
        <g key={c.title}>
          <rect x={c.x} y={14} width={w} height={332} rx={12} fill="#fff" stroke={toneColors[c.tone].stroke} strokeWidth={1.5} />
          <T x={c.x + w / 2} y={40} size={13.5} weight={800} tone={c.tone === 'neutral' ? 'navy' : c.tone}>{c.title}</T>
          <Chip x={c.x + w / 2} y={60} text={c.tag} tone={c.tone} solid={c.tone !== 'neutral'} w={70} size={10.5} />
          <T x={c.x + 12} y={228} size={9.5} tone="muted" anchor="start" weight={800}>ORIGEN</T>
          <Lines x={c.x + 12} y={244} lines={c.origin} />
          <T x={c.x + 12} y={288} size={9.5} tone="muted" anchor="start" weight={800}>DETECCIÓN</T>
          <Lines x={c.x + 12} y={304} lines={c.how} />
        </g>
      ))}
      {/* Glifo third-party: proceso con JARs cargados y uno en disco */}
      <rect x={28} y={82} width={146} height={82} rx={8} fill={C.tealTint} stroke={C.teal} />
      <T x={101} y={98} size={10} tone="teal" weight={800}>proceso (memoria)</T>
      <Chip x={66} y={122} text="JAR" tone="navy" w={52} size={10} />
      <Chip x={136} y={122} text="JAR" tone="coral" solid w={52} size={10} />
      <T x={101} y={152} size={10} tone="coral" weight={700}>cargado → hallazgo</T>
      <Chip x={56} y={188} text="JAR" tone="neutral" w={52} size={10} className="sv-dim" />
      <T x={90} y={185} size={10} tone="muted" anchor="start">solo en disco:</T>
      <T x={90} y={198} size={10} tone="muted" anchor="start">sin hallazgo</T>
      {/* Glifo code-level: input → código → sink */}
      <Chip x={240} y={96} text="input" tone="amber" w={60} size={10} />
      <Box x={214} y={120} w={146} h={34} label="código propio" tone="navy" size={11.5} />
      <Box x={244} y={172} w={86} h={30} label="sink SQL" tone="coral" size={11} />
      <Arrow d="M240,108 L240,118" tone="amber" />
      <Arrow d="M287,155 L287,170" tone="coral" />
      <Particle path="M240,86 L240,137 L287,137 L287,187" dur={2.4} tone="coral" r={4.5} />
      <T x={338} y={98} size={10} tone="muted" anchor="middle">sin validar</T>
      {/* Glifo Runtime Application Protection */}
       <Chip x={436} y={100} text="payload" tone="coral" solid w={74} size={10} />
      <Box x={446} y={140} w={96} h={46} label="Servicio" tone="navy" size={12} />
      <Arrow d="M436,112 C436,150 436,163 444,163" tone="coral" flow />
      <Particle path="M436,112 C436,150 436,163 444,163" dur={1.8} tone="coral" r={4.5} />
      <circle cx={494} cy={163} r={32} fill="none" stroke={C.amber} strokeWidth={1.5} className="sv-ping" />
      {/* Glifo mute */}
      <g className="sv-dim">
        <Chip x={659} y={100} text="alerta" tone="coral" w={128} size={10} />
      </g>
      <line x1={600} x2={718} y1={112} y2={88} stroke={C.slate} strokeWidth={2.2} strokeLinecap="round" />
      <Box x={604} y={132} w={110} h={34} label="Mute" tone="navy" solid size={11.5} />
      <Mark x={620} y={190} ok r={8} />
      <T x={634} y={194} size={10} tone="teal" anchor="start" weight={700}>código intacto</T>
    </Svg>
  )
}

/* ——— 4. CVSS base frente a Dynatrace Security Score contextual ——— */
const dssFactors = [
  { label: 'Public internet exposure', sub: 'accesible desde internet' },
  { label: 'Reachable data assets', sub: 'alcanza bases de datos' },
  { label: 'Public exploit availability', sub: 'informativo · no altera el DSS' },
]
const dssLevels = ['Baja', 'Media', 'Alta', 'Crítica']
// Presencia de cada factor por paso: [exposición, datos, exploit]
const dssPresent = [[true, true, false], [false, true, false], [false, false, false], [false, false, true]]

function DssPriority({ step }: { step: number }) {
  const cxg = 596
  const cyg = 210
  const r = 118
  // Aguja: el DSS nunca supera el CVSS; quitar contexto de riesgo solo lo reduce.
  const angles = [68, 32, -10, -10]
  const angle = angles[step]
  const arc = (a0: number, a1: number) => {
    const p = (a: number) => [cxg + r * Math.sin((a * Math.PI) / 180), cyg - r * Math.cos((a * Math.PI) / 180)]
    const [x0, y0] = p(a0)
    const [x1, y1] = p(a1)
    return `M${x0.toFixed(1)},${y0.toFixed(1)} A${r},${r} 0 0 1 ${x1.toFixed(1)},${y1.toFixed(1)}`
  }
  const segTones = [C.teal, C.amber, '#e0a05a', C.coral]
  const levelIndex = [3, 2, 1, 1][step]
  return (
    <Svg h={320} label="El CVSS base no cambia; el Dynatrace Security Score se reduce cuando faltan exposición pública y datos alcanzables">
      {/* CVSS */}
      <rect x={20} y={30} width={170} height={120} rx={12} fill="#fff" stroke={C.line} strokeWidth={1.5} />
      <T x={105} y={56} size={10.5} tone="muted" weight={800}>CVSS BASE</T>
      <T x={105} y={98} size={34} tone="navy" weight={800}>9.8</T>
      <T x={105} y={122} size={11} tone="muted">severidad teórica</T>
      <T x={105} y={138} size={11} tone="muted">igual en todos los pasos</T>
      {/* Factores */}
      <T x={216} y={22} size={10} tone="muted" anchor="start" weight={800}>FACTORES DE CONTEXTO</T>
      {dssFactors.map((f, i) => {
        const active = dssPresent[step][i]
        return (
          <g key={f.label} className={dim(true)}>
            <rect x={216} y={34 + i * 58} width={240} height={48} rx={10} fill={active ? C.coralTint : '#fff'} stroke={active ? C.coral : C.line} strokeWidth={1.5} />
            <T x={230} y={54 + i * 58} size={11.5} weight={750} anchor="start" tone={active ? 'coral' : 'ink'}>{f.label}</T>
            <T x={230} y={71 + i * 58} size={10.5} anchor="start" tone="muted">{f.sub}</T>
            <rect x={416} y={48 + i * 58} width={30} height={18} rx={9} fill={active ? C.coral : '#cfd9d7'} />
            <circle cx={active ? 437 : 425} cy={57 + i * 58} r={6.5} fill="#fff" style={{ transition: 'cx .5s' }} />
          </g>
        )
      })}
      <Arrow from={[190, 90]} to={[212, 90]} tone="navy" />
      {/* Medidor */}
      {[[-90, -45], [-45, 0], [0, 45], [45, 90]].map(([a0, a1], i) => (
        <path key={i} d={arc(a0 + 1.5, a1 - 1.5)} fill="none" stroke={segTones[i]} strokeWidth={18} opacity={i === levelIndex ? 1 : 0.28} style={{ transition: 'opacity .6s' }} />
      ))}
      {dssLevels.map((l, i) => {
        const a = ((-67.5 + i * 45) * Math.PI) / 180
        return (
          <T key={l} x={cxg + (r + 26) * Math.sin(a)} y={cyg - (r + 26) * Math.cos(a) + 4} size={10.5} weight={i === levelIndex ? 800 : 500} tone={i === levelIndex ? 'ink' : 'muted'}>{l}</T>
        )
      })}
      <g style={{ transform: `rotate(${angle}deg)`, transformOrigin: `${cxg}px ${cyg}px`, transition: 'transform .8s cubic-bezier(.3,1.4,.5,1)' }}>
        <line x1={cxg} y1={cyg} x2={cxg} y2={cyg - r + 22} stroke={C.navy} strokeWidth={4} strokeLinecap="round" />
      </g>
      <circle cx={cxg} cy={cyg} r={9} fill={C.navy} />
      <T x={cxg} y={cyg + 30} size={12} tone="navy" weight={800}>Dynatrace Security Score</T>
      <T x={cxg} y={cyg + 46} size={10.5} tone="muted">nunca supera el CVSS base</T>
      {/* Escenario */}
      <rect x={20} y={214} width={436} height={82} rx={12} fill={C.paperSoft} stroke={C.line} />
      <T x={36} y={238} size={10} tone="muted" anchor="start" weight={800}>ESCENARIO</T>
      <T x={36} y={260} size={12.5} anchor="start" weight={700}>
        {['Expuesto a internet y con acceso a datos', 'Sin exposición pública', 'Sin exposición ni datos alcanzables', 'Aparece un exploit público'][step]}
      </T>
      <T x={36} y={280} size={11} anchor="start" tone="muted">
        {['DSS = CVSS: no hay contexto que lo reduzca', 'El DSS baja respecto al CVSS 9.8', 'El DSS baja todavía más', 'El DSS no cambia: el exploit es informativo'][step]}
      </T>
    </Svg>
  )
}

/* ——— 5. Application Security: cadena de compuertas ——— */
const gates = [
  { label: 'Capability', sub: 'licencia', q: ['¿Está disponible', 'para la tenant?'], not: ['que el proceso esté', 'instrumentado'] },
  { label: 'Monitoring mode', sub: 'profundidad', q: ['¿Qué profundidad', 'permite?'], not: ['que todas las funciones', 'estén activas'] },
  { label: 'Code module', sub: 'inyectado', q: ['¿Se inyectó', 'en el proceso?'], not: ['OneAgent instalado ≠', 'code module inyectado'] },
  { label: 'Restart', sub: 'del proceso', q: ['¿El proceso cargó', 'el cambio?'], not: ['que cambiar el setting', 'altere procesos vivos'] },
]

function AppSecGates({ step }: { step: number }) {
  const gx = (i: number) => 18 + i * 150
  const tokenX = step < 4 ? gx(step) + 64 : 680
  return (
    <Svg h={330} label="Cadena de compuertas de Application Security: capability, monitoring mode, code module y restart">
      {gates.map((g, i) => {
        const passed = step > i
        const active = step === i
        return (
          <g key={g.label} className={dim(step >= i)}>
            <Box x={gx(i)} y={60} w={128} h={54} label={g.label} sub={g.sub} tone={passed ? 'teal' : active ? 'navy' : 'neutral'} solid={active} size={12.5} />
            {passed && <Mark x={gx(i) + 124} y={62} ok r={9} />}
            <T x={gx(i)} y={140} size={9.5} tone="muted" anchor="start" weight={800}>PREGUNTA</T>
            <Lines x={gx(i)} y={156} lines={g.q} />
            <g className={show(step >= i)}>
              <rect x={gx(i)} y={192} width={134} height={62} rx={8} fill={C.coralTint} stroke={C.coral} strokeDasharray="4 4" />
              <T x={gx(i) + 8} y={208} size={9.5} tone="coral" anchor="start" weight={800}>NO DEMUESTRA</T>
              <Lines x={gx(i) + 8} y={225} lines={g.not} size={10} gap={13} />
            </g>
            {i < 3 && <Arrow from={[gx(i) + 130, 87]} to={[gx(i) + 148, 87]} tone={passed ? 'teal' : 'neutral'} />}
          </g>
        )
      })}
      <Arrow from={[600, 87]} to={[616, 87]} tone={step >= 4 ? 'teal' : 'neutral'} />
      <g className={dim(step >= 4)}>
        <Box x={618} y={56} w={132} h={62} label="Datos AppSec" sub="proceso activo" tone="teal" solid={step >= 4} size={13} />
        <T x={684} y={140} size={9.5} tone="muted" weight={800}>Y ADEMÁS</T>
        <Lines x={684} y={156} lines={['datos y permisos', 'para verlos']} anchor="middle" />
      </g>
      {/* Token que avanza */}
      <g style={{ transform: `translateX(${tokenX}px)`, transition: 'transform .7s ease' }}>
        <circle cx={0} cy={36} r={8} fill={C.amber} className="sv-pulse" />
        <path d="M0,44 L0,54" stroke={C.amber} strokeWidth={2} />
      </g>
      <T x={20} y={22} size={10} tone="muted" anchor="start" weight={800}>¿SIN RESULTADOS? RECORRE LA CADENA EN ORDEN</T>
      <rect x={18} y={272} width={732} height={42} rx={10} fill={C.paperSoft} stroke={C.line} />
      <T x={384} y={290} size={11} weight={650}>Discovery: habilita code-module injection y reinicia los procesos.</T>
      <T x={384} y={306} size={10.5} tone="muted">El permiso o la licencia no sustituyen la instrumentación.</T>
    </Svg>
  )
}

/* ——— 6. Ciclo de remediación con mínimo privilegio ——— */
const remNodes = [
  { label: 'Detectar', sub: 'el hallazgo', x: 380, y: 50 },
  { label: 'Contextualizar', sub: 'componente y exposición', x: 606, y: 124 },
  { label: 'Priorizar', sub: 'impacto y evidencia', x: 520, y: 246 },
  { label: 'Corregir', sub: 'cambio autorizado', x: 240, y: 246 },
  { label: 'Comprobar', sub: 'el riesgo se reduce', x: 154, y: 124 },
]

function RemediationCycle({ step }: { step: number }) {
  const ellipse = 'M380,50 A232,98 0 0 1 380,246 A232,98 0 0 1 380,50'
  return (
    <Svg h={300} label="Ciclo de remediación: detectar, contextualizar, priorizar, corregir con autorización y comprobar">
      <ellipse cx={380} cy={148} rx={232} ry={98} fill="none" stroke={C.line} strokeWidth={2} strokeDasharray="4 7" />
      <Particle path={ellipse} dur={9} tone="teal" r={6} />
      <circle cx={380} cy={148} r={58} fill={C.paperSoft} stroke={C.line} />
      <T x={380} y={142} size={10.5} tone="muted" weight={800}>MÍNIMO</T>
      <T x={380} y={160} size={15} tone="navy" weight={800}>privilegio</T>
      {remNodes.map((n, i) => {
        const state = i === step ? 'active' : i < step ? 'done' : 'todo'
        const isFix = i === 3
        return (
          <g key={n.label} className={dim(state !== 'todo')}>
            <Box x={n.x - 86} y={n.y - 25} w={172} h={50} label={n.label} sub={n.sub} tone={state === 'active' ? (isFix ? 'amber' : 'teal') : 'navy'} solid={state === 'active'} rx={25} />
            <circle cx={n.x - 66} cy={n.y - 21} r={11} fill={state === 'todo' ? '#fff' : C.teal} stroke={C.teal} />
            <T x={n.x - 66} y={n.y - 17} size={11} weight={800} tone={state === 'todo' ? 'teal' : 'white'}>{i + 1}</T>
          </g>
        )
      })}
      {/* Candado en corregir */}
      <g className={show(step === 3)}>
        <rect x={334} y={238} width={20} height={16} rx={3} fill={C.amber} />
        <path d="M338,238 L338,232 A6,6 0 0 1 350,232 L350,238" fill="none" stroke={C.amber} strokeWidth={2.5} />
        <Chip x={570} y={196} text="Ver un hallazgo ≠ poder editar" tone="amber" w={210} />
      </g>
      <g className={show(step === 4)}>
        <Chip x={170} y={176} text="reanálisis · nueva versión · ruta inactiva" tone="teal" w={270} size={10.5} />
      </g>
      <g className={cx(show(step === 0))}>
        <Chip x={600} y={50} text="datos de seguridad restringidos" tone="violet" w={220} size={10.5} />
      </g>
    </Svg>
  )
}

/* ——— Ciclo de una third-party vulnerability: feed, importación, escaneo, Resolved y reapertura ——— */
const tpNotes = [
  ['Dynatrace comprueba cada cinco minutos si hay actualizaciones del', 'Dynatrace Vulnerability feed y del NVD feed.'],
  ['Los feeds actualizados se importan al Dynatrace Cluster', 'en un plazo de dos horas: un CVE nuevo puede tardar hasta 2 h.'],
  ['Cada minuto se buscan vulnerabilidades en los componentes del entorno:', 'la librería cargada por el proceso coincide y la vulnerabilidad se abre.'],
  ['Ningún process group reporta el componente durante más de dos horas:', 'Resolved. Puede ser una actualización… o un proceso detenido.'],
  ['El proceso vuelve a ejecutarse y carga otra vez el componente', 'vulnerable: la vulnerabilidad se reabre.'],
]

function ThirdPartyLifecycle({ step }: { step: number }) {
  const state = step < 2 ? { label: 'Sin hallazgo', sub: 'aún no evaluado', tone: 'neutral' as const } : step === 3 ? { label: 'Resolved', sub: '> 2 h sin reportes', tone: 'teal' as const } : { label: 'Open', sub: step === 4 ? 'reabierta' : 'vulnerabilidad', tone: 'coral' as const }
  return (
    <Svg h={290} label="Ciclo de una third-party vulnerability: comprobación del feed, importación, escaneo, Resolved y reapertura">
      <g className={dim(step === 0)}>
        <Box x={20} y={50} w={160} h={64} label="Vulnerability feeds" sub="Dynatrace · NVD" tone="violet" solid={step === 0} size={12.5} />
        <Chip x={100} y={140} text="comprueba cada 5 min" tone="violet" />
      </g>
      <g className={dim(step === 1)}>
        <Box x={215} y={50} w={160} h={64} label="Dynatrace Cluster" sub="feeds importados" tone="navy" solid={step === 1} size={12.5} />
        <Chip x={295} y={140} text="importa en ≤ 2 h" tone="navy" />
      </g>
      <g className={dim(step === 2 || step === 4)}>
        <Box x={410} y={50} w={160} h={64} label="Proceso" sub="librería cargada" tone={step === 3 ? 'neutral' : 'amber'} solid={step === 2 || step === 4} size={12.5} />
      </g>
      <g className={show(step === 2 || step === 4)}>
        <Chip x={490} y={140} text={step === 4 ? 'carga otra vez la librería' : 'escaneo cada minuto'} tone="amber" />
      </g>
      <g className={show(step === 3)}>
        <Chip x={490} y={140} text="> 2 h sin reportes" tone="neutral" />
      </g>
      <Box x={604} y={50} w={136} h={64} label={state.label} sub={state.sub} tone={state.tone} solid={step >= 2} size={13} />
      <Arrow from={[182, 82]} to={[212, 82]} tone="violet" flow={step === 1} />
      <Arrow from={[377, 82]} to={[407, 82]} tone="navy" flow={step === 2} />
      <Arrow from={[572, 82]} to={[601, 82]} tone={step === 3 ? 'teal' : 'coral'} flow={step >= 2} />
      {step === 1 && <Particle path="M100,82 L295,82" dur={2} tone="violet" r={4.5} />}
      {step === 2 && <Particle path="M295,82 L490,82 L672,82" dur={2.4} tone="amber" r={4.5} />}
      {step === 4 && <Particle path="M490,82 L672,82" dur={1.8} tone="coral" r={4.5} />}
      <rect x={20} y={176} width={720} height={92} rx={12} fill={C.paperSoft} stroke={C.line} />
      <T x={38} y={200} size={10} tone="muted" anchor="start" weight={800}>{`PASO ${step + 1} DE 5`}</T>
      <Lines x={38} y={224} lines={tpNotes[step]} size={12} gap={20} tone="ink" />
    </Svg>
  )
}

export const securityVisuals: VisualRegistry = {
  'code-thirdparty': {
    kind: 'animation',
    title: 'Quién es dueño del componente decide la remediación',
    caption: 'La librería vulnerable no la declara tu aplicación: llega como dependencia transitiva a través de A. Recorre los cuatro casos de la tabla y fíjate en que la pregunta y el siguiente paso cambian según la propiedad del componente, no según el proceso donde aparece.',
    steps: ['Código propio', 'Dependencia directa', 'Dependencia transitiva', 'Exposición runtime'],
    stepMs: 3000,
    render: ({ step }) => <CodeThirdParty step={step} />,
  },
  rva: {
    kind: 'animation',
    title: 'RVA sigue la petición hasta el componente cargado',
    caption: 'La partícula es un dato que entra desde fuera por un endpoint, atraviesa el servicio y llega a la librería vulnerable cargada en el proceso monitorizado. La copia que solo está en disco no demuestra riesgo activo: RVA aporta componente, runtime, input flow, contexto y evidencia.',
    steps: ['Componente', 'Runtime', 'Input flow', 'Contexto', 'Evidencia'],
    stepMs: 3000,
    render: ({ step }) => <Rva step={step} />,
  },
  'deep-third-party-code-level': {
    kind: 'animation',
    title: 'Cuatro tipos de hallazgo, cuatro orígenes',
    caption: 'Third-party (CVE) depende de que el proceso cargue la librería; code-level (CWE) sigue el input sin validar hasta un sink del código propio; Runtime Application Protection (RAP) detecta payloads de ataques reales; el mute silencia entidades afectadas en la app Vulnerabilities sin corregir el código ni excluirlas del análisis (eso lo hacen las monitoring rules).',
    render: () => <FindingTypes />,
  },
  'deep-security-prioritization': {
    kind: 'animation',
    title: 'Mismo CVSS, distinta prioridad real',
    caption: 'El CVSS base (9.8) no se mueve. El Dynatrace Security Score solo puede igualarlo o reducirlo: sin Public internet exposure y sin Reachable data assets, baja. Public exploit availability se muestra como factor de riesgo para priorizar, pero no entra en el cálculo del DSS.',
    steps: ['Expuesto y con datos: DSS = CVSS', 'Sin exposición pública: baja', 'Sin datos alcanzables: baja más', 'Exploit público: DSS igual'],
    stepMs: 3000,
    render: ({ step }) => <DssPriority step={step} />,
  },
  'appsec-modes': {
    kind: 'animation',
    title: 'AppSec solo produce datos si pasan todas las compuertas',
    caption: 'Si AppSec no muestra resultados, recorre la cadena en orden: capability/licencia, monitoring mode, code module inyectado y restart del proceso. El recuadro coral de cada capa recuerda lo que esa capa, por sí sola, NO demuestra.',
    steps: ['Capability/licencia', 'Monitoring mode', 'Code module inyectado', 'Restart del proceso', 'Proceso activo: datos AppSec'],
    stepMs: 2800,
    render: ({ step }) => <AppSecGates step={step} />,
  },
  'security-permissions': {
    kind: 'animation',
    title: 'El ciclo de remediación con mínimo privilegio',
    caption: 'Detectar no es el final: el ciclo contextualiza, prioriza, aplica una corrección autorizada y comprueba que el riesgo se reduce. Ver un hallazgo no implica permiso para editar una configuración o ejecutar una acción.',
    steps: ['Detectar', 'Contextualizar', 'Priorizar', 'Corregir (autorizado)', 'Comprobar'],
    render: ({ step }) => <RemediationCycle step={step} />,
  },
  'sup-third-party-evaluation': {
    kind: 'animation',
    title: 'Del CVE publicado a Resolved… y a la reapertura',
    caption: 'Sigue los tiempos documentados: el feed se comprueba cada cinco minutos, se importa al clúster en un plazo de dos horas y el entorno se escanea cada minuto. Resolved solo significa más de dos horas sin reportes del componente; si el proceso vuelve a cargarlo, la vulnerabilidad se reabre.',
    steps: ['Comprobar feed (5 min)', 'Importar al clúster (≤ 2 h)', 'Escanear entorno (1 min)', 'Más de 2 h sin reportes', 'Se carga de nuevo: reabierta'],
    stepMs: 3200,
    render: ({ step }) => <ThirdPartyLifecycle step={step} />,
  },
}
