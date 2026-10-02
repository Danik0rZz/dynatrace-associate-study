import { Arrow, Box, C, Chip, Mark, Particle, Svg, T, cx, dim, show, toneColors } from './kit'
import type { VisualRegistry } from './types'

/* ——— 1. Capas de fuente: Path → Concepts → How-to → Reference ——— */
const scopeLayers = [
  { name: 'Path', question: '¿Qué dominios entran?', how: 'Usarlo como índice y alcance' },
  { name: 'Concepts', question: '¿Qué significa el producto?', how: 'Construir modelo mental' },
  { name: 'How-to', question: '¿Cómo se habilita o usa?', how: 'Practicar pasos y prerequisitos' },
  { name: 'Reference', question: '¿Qué campos, comandos o límites existen?', how: 'Memorizar matices verificables' },
]

function OfficialScope({ step }: { step: number }) {
  const rowY = (i: number) => 22 + i * 66
  return (
    <Svg h={330} label="Capas de estudio: Path, Concepts, How-to y Reference, cada una con su pregunta y forma de estudio">
      {/* Agrupación de fuentes */}
      <T x={62} y={rowY(0) + 24} size={11} weight={800} tone="navy">Learning Plan</T>
      <T x={62} y={rowY(0) + 39} size={10} tone="muted">PDF del path</T>
      <path d={`M116,${rowY(1) + 4} L108,${rowY(1) + 4} L108,${rowY(3) + 52} L116,${rowY(3) + 52}`} fill="none" stroke={C.teal} strokeWidth={2} />
      <T x={58} y={rowY(2) + 14} size={12} weight={800} tone="teal">Dynatrace</T>
      <T x={58} y={rowY(2) + 30} size={12} weight={800} tone="teal">Docs</T>
      <T x={58} y={rowY(2) + 46} size={10} tone="muted">autoridad</T>
      <T x={58} y={rowY(2) + 59} size={10} tone="muted">técnica</T>
      {scopeLayers.map((layer, i) => {
        const y = rowY(i)
        const active = i === step
        const seen = i <= step
        return (
          <g key={layer.name} className={dim(seen)}>
            <rect x={126} y={y} width={614} height={56} rx={10} fill={active ? toneColors.teal.fill : '#fff'} stroke={active ? C.teal : C.line} strokeWidth={1.5} />
            <Box x={134} y={y + 8} w={120} h={40} label={layer.name} tone={i === 0 ? 'navy' : 'teal'} solid={active} size={13} rx={20} />
            <T x={274} y={y + 24} size={13} weight={750} anchor="start">{layer.question}</T>
            <T x={274} y={y + 43} size={11} anchor="start" tone="muted">Cómo estudiarla: {layer.how}</T>
            {active && <circle cx={722} cy={y + 28} r={6} fill={C.teal} className="sv-pulse" />}
          </g>
        )
      })}
      {/* Nota sobre fuentes secundarias */}
      <g>
        <rect x={126} y={290} width={614} height={30} rx={8} fill={toneColors.amber.fill} stroke={C.amber} strokeWidth={1.2} />
        <T x={140} y={309} size={11} anchor="start" tone="amber" weight={700}>Página de comunidad: ayuda a localizar el path, no justifica un hecho técnico si existe fuente oficial.</T>
      </g>
    </Svg>
  )
}

/* ——— 2. Rutina de estudio comprobable ——— */
const routine = [
  { label: 'Lectura profunda', sub: '30–60 min por módulo' },
  { label: 'Recuperación', sub: 'explicar sin mirar' },
  { label: 'Quiz rápido', sub: 'detectar huecos' },
  { label: 'Banco', sub: 'precisión y escenarios' },
  { label: 'Repaso', sub: 'corregir la causa' },
]
const routineDetail = [
  'Lee el capítulo y sus fuentes internas.',
  'Cierra la documentación y escribe de memoria las diferencias importantes.',
  'Ocho preguntas. Si fallas una de precisión: vuelve a la fila de hechos y al bloque fuente.',
  'Con una base estable, completa el banco: precisión y escenarios.',
  'No repitas la opción: corrige la causa del error (y termina explicando el razonamiento).',
]

function StudyRoutine({ step }: { step: number }) {
  const bx = (i: number) => 20 + i * 146
  const loop = 'M672,98 C672,138 88,138 88,98'
  return (
    <Svg h={330} label="Rutina de estudio: lectura, recuperación libre, quiz rápido, banco y repaso en ciclo">
      {/* Vuelta atrás desde el quiz */}
      <g className={show(step === 2)}>
        <Arrow d="M380,44 C380,14 88,14 88,42" tone="coral" dashed />
        <T x={234} y={12} size={10.5} tone="coral" weight={700}>fallo de precisión → vuelve al bloque fuente</T>
      </g>
      {routine.map((node, i) => {
        const active = i === step
        return (
          <g key={node.label} className={dim(i <= step)}>
            <Box x={bx(i)} y={46} w={136} h={52} label={node.label} sub={node.sub} tone={active ? 'teal' : 'navy'} solid={active} size={12} />
            {i < routine.length - 1 && <Arrow from={[bx(i) + 137, 72]} to={[bx(i) + 145, 72]} tone="navy" />}
          </g>
        )
      })}
      {/* Ciclo */}
      <path d={loop} fill="none" stroke={C.line} strokeWidth={2} strokeDasharray="4 6" />
      <Particle path={loop} dur={4} tone="teal" r={5} />
      <T x={380} y={152} size={10.5} tone="muted" weight={700}>el repaso alimenta la siguiente sesión</T>
      {/* Detalle del paso */}
      <Box x={20} y={166} w={720} h={40} tone="teal" label={routineDetail[step]} size={12} />
      {/* Confianza frente a corrección */}
      <g className={dim(step === 4)}>
        <T x={20} y={232} size={10} tone="muted" anchor="start" weight={800}>LA CONFIANZA ES UNA SEÑAL SEPARADA DE LA CORRECCIÓN</T>
        <rect x={20} y={244} width={352} height={70} rx={10} fill={toneColors.amber.fill} stroke={C.amber} strokeWidth={1.4} />
        <Mark x={44} y={266} ok r={10} />
        <T x={62} y={270} size={12} weight={750} anchor="start" tone="amber">Acierto + confianza baja</T>
        <T x={36} y={298} size={11} anchor="start">Merece revisión: aún no es conocimiento estable.</T>
        <rect x={388} y={244} width={352} height={70} rx={10} fill={toneColors.coral.fill} stroke={C.coral} strokeWidth={1.4} className={cx(step === 4 && 'sv-pulse')} />
        <Mark x={412} y={266} ok={false} r={10} />
        <T x={430} y={270} size={12} weight={750} anchor="start" tone="coral">Fallo + confianza alta</T>
        <T x={404} y={298} size={11} anchor="start">Falsa seguridad: tiene prioridad en el repaso.</T>
      </g>
    </Svg>
  )
}

/* ——— 3. Estrategia de examen: eliminar distractores ——— */
const options = [
  { letter: 'A', text: 'Reinstalar siempre todos los agentes', reason: 'Absoluto no soportado', tone: 'coral' as const },
  { letter: 'B', text: 'Activar la función recomendada, porque es obligatoria', reason: '“Recomendado” ≠ “obligatorio”', tone: 'coral' as const },
  { letter: 'C', text: 'Que el usuario modifique la configuración del entorno', reason: 'Asume permiso de escritura', tone: 'coral' as const },
  { letter: 'D', text: 'Comprobar timeframe, filtros y permiso de lectura', reason: 'Mejor siguiente paso', tone: 'teal' as const },
]

function ExamStrategy({ step }: { step: number }) {
  return (
    <Svg h={320} label="Eliminación de opciones en una pregunta de ejemplo: se descartan absolutos, recomendaciones convertidas en obligación y permisos asumidos">
      {/* Enunciado */}
      <rect x={20} y={14} width={720} height={66} rx={10} fill={C.paperSoft} stroke={C.line} />
      <Chip x={92} y={32} text="EJEMPLO GENÉRICO" tone="neutral" w={130} size={10} />
      <T x={36} y={62} size={12.5} anchor="start">
        Un usuario con acceso de{' '}
        <tspan fontWeight={800} fill={step === 0 || step === 3 ? toneColors.amber.text : C.ink}>solo lectura</tspan>
        {' '}ve un dashboard vacío. ¿Cuál es el{' '}
        <tspan fontWeight={800} fill={step === 0 || step === 4 ? toneColors.amber.text : C.ink}>mejor siguiente paso</tspan>?
      </T>
      <g className={show(step === 0)}>
        <Chip x={620} y={32} text="Subraya las palabras de alcance" tone="amber" size={10.5} />
      </g>
      {options.map((opt, i) => {
        const y = 96 + i * 52
        const eliminated = opt.tone === 'coral' && step >= i + 1
        const winner = opt.tone === 'teal' && step >= 4
        const judged = step >= i + 1
        return (
          <g key={opt.letter}>
            <g className={eliminated ? 'sv-dim' : 'sv-in'}>
              <rect x={20} y={y} width={480} height={42} rx={8} fill={winner ? toneColors.teal.fill : '#fff'} stroke={winner ? C.teal : C.line} strokeWidth={winner ? 2 : 1.5} />
              <circle cx={44} cy={y + 21} r={12} fill={winner ? C.teal : C.paperSoft} stroke={winner ? C.teal : C.line} />
              <T x={44} y={y + 25.5} size={12} weight={800} tone={winner ? 'white' : 'navy'}>{opt.letter}</T>
              <T x={66} y={y + 26} size={12.5} anchor="start">{opt.text}</T>
            </g>
            {/* Tachado */}
            <line x1={62} x2={eliminated ? 490 : 62} y1={y + 21} y2={y + 21} stroke={C.coral} strokeWidth={2.2} className={show(eliminated)} style={{ transition: 'opacity .5s ease' }} />
            <g className={show(judged)}>
              <Mark x={518} y={y + 21} ok={opt.tone === 'teal'} r={10} />
              <Chip x={638} y={y + 21} text={opt.reason} tone={opt.tone} solid={winner} w={206} size={10.5} />
            </g>
          </g>
        )
      })}
      <T x={380} y={308} size={10.5} tone="muted" className={show(step === 4)}>Si dos opciones parecen válidas, decide por el criterio exacto del enunciado.</T>
    </Svg>
  )
}

/* ——— 4. Conectividad: 443 directo, 9999 hacia ActiveGate, proxy y sentido de las conexiones ——— */
function ExamReadiness({ step }: { step: number }) {
  const laneY = [50, 140, 230]
  return (
    <Svg h={350} label="OneAgent abre siempre conexiones salientes: directo a SaaS por 443, a un Environment ActiveGate por 9999 o a través de un proxy; Dynatrace nunca inicia conexiones hacia OneAgent">
      {/* Red corporativa */}
      <rect x={14} y={30} width={456} height={276} rx={14} fill="#f8fbfa" stroke={C.slate} strokeWidth={1.4} strokeDasharray="6 5" />
      <T x={28} y={22} size={10} tone="muted" anchor="start" weight={800}>RED CORPORATIVA</T>
      {/* Firewall */}
      <T x={498} y={22} size={10} tone="navy" weight={800}>FIREWALL</T>
      <rect x={486} y={30} width={24} height={276} rx={3} fill="#e4ecee" stroke={C.navy} strokeWidth={1.4} />
      {Array.from({ length: 15 }, (_, i) => (
        <line key={i} x1={486} x2={510} y1={48 + i * 18} y2={48 + i * 18} stroke={C.navy} strokeOpacity={0.35} />
      ))}
      {/* Clúster SaaS */}
      <Box x={560} y={60} w={180} h={200} tone="teal" solid rx={14} />
      <T x={650} y={150} size={15} weight={800} tone="white">Dynatrace</T>
      <T x={650} y={170} size={12} tone="white" opacity={0.85}>clúster SaaS</T>
      <T x={650} y={190} size={11} tone="white" opacity={0.85}>recibe en :443</T>

      {/* Carril 1: directo */}
      <g className={dim(step === 0)}>
        <Box x={30} y={laneY[0]} w={150} h={56} label="Host" sub="OneAgent" tone="navy" />
        <Arrow from={[182, laneY[0] + 28]} to={[556, laneY[0] + 28]} tone="teal" flow width={2.2} />
        {step === 0 && <Particle path={`M182,${laneY[0] + 28} L556,${laneY[0] + 28}`} dur={2.4} tone="teal" r={4.5} />}
        <Chip x={330} y={laneY[0] + 12} text="saliente · TCP 443" tone="teal" size={10.5} />
      </g>

      {/* Carril 2: Environment ActiveGate */}
      <g className={dim(step === 1)}>
        <Box x={30} y={laneY[1]} w={150} h={56} label="Host aislado" sub="OneAgent" tone="navy" />
        <Box x={262} y={laneY[1]} w={176} h={56} label="Environment" sub="ActiveGate · escucha :9999" tone="violet" />
        <Arrow from={[182, laneY[1] + 28]} to={[258, laneY[1] + 28]} tone="teal" flow width={2.2} />
        <Arrow from={[440, laneY[1] + 28]} to={[556, laneY[1] + 28]} tone="teal" flow width={2.2} />
        {step === 1 && <Particle path={`M182,${laneY[1] + 28} L258,${laneY[1] + 28}`} dur={1.2} tone="teal" r={4.5} />}
        {step === 1 && <Particle path={`M440,${laneY[1] + 28} L556,${laneY[1] + 28}`} dur={1.6} begin={0.6} tone="teal" r={4.5} />}
        <Chip x={220} y={laneY[1] - 10} text=":9999" tone="violet" w={58} mono size={10.5} />
        <Chip x={530} y={laneY[1] + 12} text=":443" tone="teal" w={52} mono size={10.5} />
      </g>

      {/* Carril 3: proxy */}
      <g className={dim(step === 2)}>
        <Box x={30} y={laneY[2]} w={150} h={56} label="Host" sub="OneAgent con --set-proxy" tone="navy" size={12} />
        <rect x={262} y={laneY[2]} width={176} height={56} rx={8} fill={toneColors.amber.fill} stroke={C.amber} strokeWidth={1.5} strokeDasharray="5 4" />
        <T x={350} y={laneY[2] + 24} size={12.5} weight={750} tone="amber">Proxy HTTP/HTTPS</T>
        <T x={350} y={laneY[2] + 42} size={10.5} tone="muted">ActiveGate: [http.client]</T>
        <Arrow from={[182, laneY[2] + 28]} to={[258, laneY[2] + 28]} tone="teal" flow width={2.2} />
        <Arrow from={[440, laneY[2] + 28]} to={[556, laneY[2] + 10]} tone="teal" flow width={2.2} />
        {step === 2 && <Particle path={`M182,${laneY[2] + 28} L258,${laneY[2] + 28}`} dur={1.2} tone="teal" r={4.5} />}
      </g>

      {/* Paso 4: Dynatrace nunca inicia conexiones */}
      <g className={show(step === 3)}>
        <Arrow from={[556, 285]} to={[200, 285]} tone="coral" dashed />
        <Mark x={530} y={285} ok={false} r={10} />
        <rect x={30} y={316} width={700} height={28} rx={8} fill={toneColors.coral.fill} stroke={C.coral} strokeWidth={1.3} />
        <T x={380} y={334} size={11.5} weight={800} tone="coral">Dynatrace nunca inicia conexiones hacia OneAgent: no hay puertos inbound en los hosts</T>
      </g>
    </Svg>
  )
}

/* ——— 5. Network zones: grupos de prioridad y fallback mode ——— */
const nzGroups = [
  { label: 'Grupo 1', sub: 'misma network zone', tone: 'teal' as const },
  { label: 'Grupo 2', sub: 'zona alternativa', tone: 'teal' as const },
  { label: 'Grupo 3', sub: 'zona default', tone: 'amber' as const },
  { label: 'Grupo 4', sub: 'resto de ActiveGates', tone: 'amber' as const },
]
const nzModes = [
  { name: 'Any ActiveGate (por defecto)', reach: 4 },
  { name: 'Only default zone', reach: 3 },
  { name: 'None', reach: 2 },
]

function NetworkZones({ step }: { step: number }) {
  const gx = (i: number) => 196 + i * 140
  const mode = step >= 2 ? nzModes[step - 2] : nzModes[0]
  const reach = step === 0 ? 1 : step === 1 ? 4 : mode.reach
  return (
    <Svg h={300} label="OneAgent recorre los grupos de prioridad de ActiveGates; la fallback mode limita hasta qué grupo puede llegar">
      <Box x={20} y={56} w={140} h={64} label="OneAgent" sub="zona eu.de.prod" tone="navy" />
      {nzGroups.map((g, i) => {
        const active = i < reach
        return (
          <g key={g.label} className={dim(active)}>
            <Box x={gx(i)} y={46} w={126} h={84} tone={g.tone} solid={i === 0 && step === 0} rx={10} />
            <T x={gx(i) + 63} y={74} size={13} weight={800} tone={i === 0 && step === 0 ? 'white' : 'navy'}>{g.label}</T>
            <T x={gx(i) + 63} y={94} size={10.5} tone={i === 0 && step === 0 ? 'white' : 'muted'}>{g.sub}</T>
            <T x={gx(i) + 63} y={114} size={10.5} tone={i === 0 && step === 0 ? 'white' : 'muted'}>ActiveGates</T>
            {i > 0 && <Arrow from={[gx(i) - 13, 88]} to={[gx(i) - 2, 88]} tone="navy" />}
          </g>
        )
      })}
      <Arrow from={[162, 88]} to={[192, 88]} tone="teal" flow width={2.2} />
      {/* Corte de la fallback mode */}
      <g className={show(step >= 2)}>
        <line x1={gx(reach) - 7} x2={gx(reach) - 7} y1={36} y2={140} stroke={C.coral} strokeWidth={2.4} strokeDasharray="5 4" style={{ transition: 'all .5s ease' }} />
      </g>
      <rect x={20} y={168} width={720} height={54} rx={10} fill={C.paperSoft} stroke={C.line} />
      <T x={380} y={190} size={12.5} weight={800} tone="navy">
        {step === 0 && 'Prefiere los ActiveGates de su propia zona y reparte la carga entre ellos'}
        {step === 1 && 'Si no responden, prueba el siguiente grupo y vuelve cuando se recuperan'}
        {step >= 2 && `Fallback mode: ${mode.name}`}
      </T>
      <T x={380} y={210} size={11} tone="muted">
        {step === 0 && 'Grupo 1: misma network zone'}
        {step === 1 && 'Comprueba en segundo plano si hay ActiveGates de mayor prioridad'}
        {step === 2 && 'Puede llegar a cualquier ActiveGate (grupos 1 a 4)'}
        {step === 3 && 'Zona propia, alternativa y default (grupos 1 a 3)'}
        {step === 4 && 'Solo zona propia y alternativa; si fallan, los datos se descartan'}
      </T>
      <g className={show(step === 4)}>
        <Chip x={380} y={250} text="Útil para residencia de datos: el tráfico no sale de la región" tone="coral" size={11} />
      </g>
      <g className={show(step < 2)}>
        <Chip x={380} y={250} text="ActiveGate groups no intervienen: solo sirven para acciones en bloque" tone="violet" size={11} />
      </g>
    </Svg>
  )
}

export const instructionsVisuals: VisualRegistry = {
  'deep-official-scope': {
    kind: 'animation',
    title: 'Cuatro capas de fuente, cuatro preguntas',
    caption: 'El path fija qué entra en el examen; Dynatrace Docs aporta la profundidad. Baja capa a capa: primero el alcance, luego el modelo mental (Concepts), los pasos y prerequisitos (How-to) y, por último, los matices verificables (Reference).',
    steps: ['Path: alcance e índice', 'Concepts: modelo mental', 'How-to: pasos y prerequisitos', 'Reference: campos, comandos, límites'],
    stepMs: 2800,
    render: ({ step }) => <OfficialScope step={step} />,
  },
  'deep-study-routine': {
    kind: 'animation',
    title: 'Una sesión de estudio que deja evidencia',
    caption: 'Sigue el ciclo: leer, recuperar sin mirar, detectar huecos con el quiz, practicar en el banco y repasar corrigiendo la causa del error. En el repaso, un fallo con confianza alta tiene prioridad sobre un acierto dudoso.',
    steps: ['Lectura profunda', 'Recuperación libre', 'Quiz rápido', 'Banco', 'Repaso: corregir la causa'],
    stepMs: 2800,
    render: ({ step }) => <StudyRoutine step={step} />,
  },
  'exam-strategy': {
    kind: 'animation',
    title: 'Eliminar distractores por su condición exacta',
    caption: 'Ejemplo genérico, no un hecho de producto. Primero localiza las palabras de alcance (“solo lectura”, “mejor siguiente paso”); después descarta los absolutos no soportados, lo recomendado convertido en obligatorio y los permisos que el escenario no concede.',
    steps: ['Lee el enunciado: palabras de alcance', 'A: absoluto no soportado', 'B: recomendado ≠ obligatorio', 'C: permiso no concedido', 'D: mejor siguiente paso'],
    stepMs: 2600,
    render: ({ step }) => <ExamStrategy step={step} />,
  },
  'deep-exam-readiness': {
    kind: 'animation',
    title: 'OneAgent siempre abre la conexión hacia fuera',
    caption: 'Sin ActiveGate, OneAgent sale directamente a SaaS por 443. Con un Environment ActiveGate, los OneAgents se conectan a él por 9999 y solo el ActiveGate sale por 443. Si hay proxy, OneAgent lo usa con --set-proxy. En ningún caso Dynatrace inicia conexiones hacia los hosts.',
    steps: ['Directo: OneAgent → SaaS por 443', 'ActiveGate: 9999 dentro, 443 fuera', 'Proxy HTTP/HTTPS en la salida', 'Dynatrace nunca inicia conexiones'],
    stepMs: 3000,
    render: ({ step }) => <ExamReadiness step={step} />,
  },
  'sup-network-zones': {
    kind: 'animation',
    title: 'Grupos de prioridad y fallback mode',
    caption: 'Un OneAgent prefiere los ActiveGates de su network zone, luego los de la zona alternativa, la zona default y el resto. La fallback mode corta esa cadena: None la limita a la zona propia y la alternativa.',
    steps: ['Grupo 1: misma network zone', 'Failover al siguiente grupo', 'Any ActiveGate (por defecto)', 'Only default zone', 'None: sin salto entre zonas'],
    stepMs: 2800,
    render: ({ step }) => <NetworkZones step={step} />,
  },
}
