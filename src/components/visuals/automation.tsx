import { Arrow, Box, C, Chip, Clock, Mark, Particle, Person, Svg, T, dim, show, toneColors, type Tone } from './kit'
import type { VisualRegistry } from './types'

const MONO = 'ui-monospace, SFMono-Regular, Consolas, monospace'

/* ——— 1. Anatomía de un workflow ——— */
function WorkflowModel({ step }: { step: number }) {
  const on = (i: number) => dim(step === i || step === 4)
  return (
    <Svg h={300} label="Anatomía de un workflow: trigger, input, tasks, actor y execution">
      <T x={20} y={24} size={10} tone="muted" anchor="start" weight={800}>UN WORKFLOW = TRIGGER + TASKS EJECUTADAS EN UN CONTEXTO</T>
      {/* Actor: contexto que envuelve la ejecución */}
      <g className={dim(step === 3 || step === 4)}>
        <rect x={150} y={44} width={430} height={180} rx={14} fill={toneColors.violet.fill} stroke={C.violet} strokeWidth={1.5} strokeDasharray="6 5" />
        <Person x={178} y={206} tone="violet" scale={0.75} />
        <T x={196} y={206} size={11.5} tone="violet" anchor="start" weight={800}>Actor: identidad y permisos del contexto</T>
      </g>
      <g className={on(0)}>
        <Box x={18} y={86} w={110} h={60} label="Trigger" sub="cuándo empieza" tone="amber" solid={step === 0} />
      </g>
      <g className={on(1)}>
        <Box x={168} y={86} w={100} h={60} label="Input" sub="qué recibe" tone="navy" solid={step === 1} />
      </g>
      <g className={on(2)}>
        <rect x={296} y={62} width={266} height={108} rx={10} fill="#fff" stroke={step === 2 ? C.teal : C.line} strokeWidth={1.5} />
        <T x={308} y={80} size={10} tone="muted" anchor="start" weight={800}>TASKS / ACTIONS · qué hace</T>
        <Box x={308} y={94} w={76} h={36} label="Query" tone="teal" size={11.5} />
        <Box x={396} y={94} w={76} h={36} label="Transform" tone="teal" size={11} />
        <Box x={484} y={94} w={66} h={36} label="Notify" tone="teal" size={11.5} />
        <Arrow from={[385, 112]} to={[394, 112]} tone="teal" />
        <Arrow from={[473, 112]} to={[482, 112]} tone="teal" />
        <T x={429} y={154} size={10.5} tone="muted">consultar · transformar · integrar · notificar</T>
      </g>
      <g className={on(4)}>
        <Box x={612} y={80} w={132} h={72} label="Execution" tone="navy" solid={step === 4} />
        <T x={678} y={136} size={10.5} tone={step === 4 ? 'white' : 'muted'}>estado · logs</T>
        <Chip x={678} y={176} text="Success" tone="teal" solid w={72} size={10.5} className={show(step === 4)} />
      </g>
      <Arrow from={[130, 116]} to={[166, 116]} tone="amber" flow />
      <Arrow from={[270, 116]} to={[294, 116]} tone="navy" flow />
      <Arrow from={[564, 116]} to={[610, 116]} tone="navy" flow />
      <Particle path="M72,116 L218,116 L346,112 L434,112 L517,112 L678,116" dur={3.6} tone="amber" r={5.5} />
      <Particle path="M72,116 L218,116 L346,112 L434,112 L517,112 L678,116" dur={3.6} begin={1.8} tone="amber" r={5.5} />
      {/* Distractor */}
      <rect x={18} y={246} width={726} height={40} rx={10} fill={C.coralTint} stroke={C.coral} strokeDasharray="5 5" />
      <T x={381} y={271} size={12} tone="coral" weight={700}>No es el mecanismo para ingestión o exportación masiva → OpenPipeline u otras soluciones</T>
    </Svg>
  )
}

/* ——— 2. Triggers ——— */
const triggerDefs: { label: string; when: string; example: string; tone: Tone; y: number }[] = [
  { label: 'On-demand', when: 'Invocación explícita', example: 'Prueba o remediación puntual', tone: 'navy', y: 20 },
  { label: 'Event', when: 'Evento que coincide', example: 'Notificar un Problem', tone: 'amber', y: 88 },
  { label: 'Schedule', when: 'Hora o intervalo', example: 'Informe nocturno', tone: 'teal', y: 156 },
  { label: 'API (no es un trigger)', when: 'Inicia cualquier workflow live', example: 'Orquestación desde otro sistema', tone: 'violet', y: 224 },
]

function TriggerIcon({ i, x, y }: { i: number; x: number; y: number }) {
  if (i === 0)
    return (
      <g>
        <rect x={x - 20} y={y - 11} width={40} height={22} rx={6} fill={C.navy} />
        <path d={`M${x - 5},${y - 6} L${x + 7},${y} L${x - 5},${y + 6} Z`} fill="#fff" />
      </g>
    )
  if (i === 1)
    return (
      <g>
        <circle cx={x} cy={y} r={15} fill={C.amberTint} stroke={C.amber} strokeWidth={1.5} />
        <path d={`M${x + 2},${y - 10} L${x - 6},${y + 2} L${x},${y + 2} L${x - 2},${y + 10} L${x + 6},${y - 2} L${x},${y - 2} Z`} fill={C.amber} />
      </g>
    )
  if (i === 2) return <Clock x={x} y={y} r={15} tone="teal" />
  return (
    <g>
      <rect x={x - 20} y={y - 12} width={40} height={24} rx={6} fill={C.violetTint} stroke={C.violet} />
      <text x={x} y={y + 4} textAnchor="middle" fontSize={11} fontWeight={800} fill={C.violet} fontFamily={MONO}>{'{ }'}</text>
    </g>
  )
}

function Triggers({ step }: { step: number }) {
  return (
    <Svg h={300} label="Tres tipos de trigger, y también la API, arrancan el mismo workflow">
      {triggerDefs.map((t, i) => {
        const active = step === i || step === 4
        const cy = t.y + 28
        const path = `M300,${cy} C400,${cy} 420,140 526,140`
        return (
          <g key={t.label} className={dim(active)}>
            <rect x={18} y={t.y} width={282} height={56} rx={10} fill={step === i ? toneColors[t.tone].fill : '#fff'} stroke={toneColors[t.tone].stroke} strokeWidth={1.5} />
            <TriggerIcon i={i} x={50} y={cy} />
            <T x={82} y={t.y + 22} size={13} anchor="start" weight={800} tone={t.tone}>{t.label}</T>
            <T x={82} y={t.y + 38} size={10.5} anchor="start" weight={650}>{t.when}</T>
            <T x={82} y={t.y + 51} size={10} anchor="start" tone="muted">{`p. ej. ${t.example}`}</T>
            <Arrow d={path} tone={t.tone} flow={step === i} dashed={step !== i} />
            {step === i && <Particle path={path} dur={1.8} tone={t.tone} r={5.5} />}
          </g>
        )
      })}
      <Box x={530} y={100} w={210} h={80} label="Mismo workflow" sub="estado: live" tone="teal" solid />
      <g className={show(step === 4)}>
        <rect x={530} y={214} width={210} height={56} rx={8} fill="#fff" stroke={C.line} strokeWidth={1.5} strokeDasharray="5 5" />
        <T x={620} y={238} size={12.5} weight={750} tone="muted">Draft</T>
        <T x={620} y={256} size={10.5} tone="muted">sin ejecución automática</T>
        <Mark x={716} y={242} ok={false} r={10} />
        <T x={635} y={200} size={10.5} tone="teal" weight={700}>Triggers automáticos → workflows live</T>
      </g>
    </Svg>
  )
}

/* ——— 3. El actor es el techo de permisos ——— */
const permTasks = [
  { label: 'Task 1', need: 52, x: 150 },
  { label: 'Task 2', need: 140, x: 214 },
  { label: 'Task 3', need: 104, x: 278 },
]

function ActorPermissions({ step }: { step: number }) {
  const base = 290
  const ceil = [74, 214, 116, 116, 142][step]
  const serviceUser = step >= 2
  return (
    <Svg h={320} label="Los permisos del actor son el techo de lo que puede hacer el workflow">
      <T x={20} y={22} size={10} tone="muted" anchor="start" weight={800}>EJECUCIÓN DEL WORKFLOW</T>
      <line x1={140} x2={446} y1={base} y2={base} stroke={C.slate} strokeWidth={2} />
      {/* Actor */}
      <g className={dim(!(step === 1))}>
        <Person x={70} y={210} tone={serviceUser ? 'violet' : 'navy'} scale={1.4} />
      </g>
      <T x={70} y={250} size={11.5} weight={800} tone={serviceUser ? 'violet' : 'navy'}>{serviceUser ? 'Service User' : 'Creador personal'}</T>
      <T x={70} y={266} size={10.5} tone="muted">{serviceUser ? 'desatendido' : step === 1 ? 'pierde privilegios' : 'actor por defecto'}</T>
      {step === 1 && <Mark x={90} y={186} ok={false} r={9} />}
      {/* Tareas */}
      {permTasks.map((t) => {
        const fails = base - t.need < ceil
        return (
          <g key={t.label}>
            <rect x={t.x} y={base - t.need} width={56} height={t.need} rx={6} fill={fails ? C.coralTint : C.tealTint} stroke={fails ? C.coral : C.teal} strokeWidth={1.5} />
            <T x={t.x + 28} y={base - 8} size={11} weight={750} tone={fails ? 'coral' : 'teal'}>{t.label}</T>
            <g className={show(fails)}>
              <Chip x={t.x + 28} y={base - t.need - 18} text="403" tone="coral" solid w={48} size={10.5} />
            </g>
          </g>
        )
      })}
      {/* Techo */}
      <g style={{ transform: `translateY(${ceil}px)` }}>
        <rect x={140} y={-5} width={306} height={10} rx={3} fill={step === 1 ? C.coral : C.violet} opacity={0.9} />
        <T x={444} y={-26} size={10.5} anchor="end" weight={800} tone={step === 1 ? 'coral' : 'violet'}>techo =</T>
        <T x={444} y={-12} size={10.5} anchor="end" weight={800} tone={step === 1 ? 'coral' : 'violet'}>permisos del actor</T>
      </g>
      <g className={show(step === 4)}>
        <T x={293} y={52} size={10.5} tone="teal" weight={700}>mínimo privilegio: solo lectura</T>
        <T x={293} y={66} size={10.5} tone="teal" weight={700}>de lo estrictamente consultado</T>
      </g>
      {/* Permisos IAM */}
      <rect x={474} y={30} width={272} height={262} rx={12} fill={C.paperSoft} stroke={C.line} />
      <T x={490} y={52} size={10} tone="muted" anchor="start" weight={800}>PERMISOS IAM</T>
      {[
        { p: 'iam:service-users:use', d: ['vincular un Service User', 'como actor de ejecución'], at: 2 },
        { p: 'automation:workflows:write', d: ['crear, editar triggers y', 'tasks, eliminar'], at: 3 },
        { p: 'automation:workflows:run', d: ['ejecutar bajo demanda', 'o por API'], at: 3 },
      ].map((perm, i) => (
        <g key={perm.p} className={dim(step >= perm.at)}>
          <rect x={488} y={66 + i * 74} width={244} height={62} rx={8} fill="#fff" stroke={step === perm.at ? C.violet : C.line} strokeWidth={1.5} />
          <text x={500} y={86 + i * 74} fontSize={11} fontWeight={750} fill={toneColors.violet.text} fontFamily={MONO}>{perm.p}</text>
          <T x={500} y={103 + i * 74} size={10.5} anchor="start" tone="muted">{perm.d[0]}</T>
          <T x={500} y={117 + i * 74} size={10.5} anchor="start" tone="muted">{perm.d[1]}</T>
        </g>
      ))}
    </Svg>
  )
}

/* ——— 4. Estados de ejecución ——— */
const stateTone: Record<string, Tone> = { Idle: 'neutral', Running: 'amber', Success: 'teal', Error: 'coral' }

function StateChip({ x, y, s, w = 70 }: { x: number; y: number; s: string; w?: number }) {
  const tone = stateTone[s] ?? 'neutral'
  return <Chip x={x} y={y} text={s} tone={tone} solid={tone !== 'neutral'} w={w} size={10.5} />
}

function ActionExec({ x, y, label, s }: { x: number; y: number; label: string; s: string }) {
  const tone = stateTone[s]
  return (
    <g>
      <rect x={x} y={y} width={196} height={28} rx={6} fill="#fff" stroke={toneColors[tone].stroke} strokeWidth={1.2} />
      <T x={x + 10} y={y + 18} size={10.5} anchor="start" weight={650}>{label}</T>
      <circle cx={x + 180} cy={y + 14} r={6} fill={toneColors[tone].solid} />
    </g>
  )
}

function ExecutionStates({ step }: { step: number }) {
  const wfState = step >= 4 ? 'Success' : 'Running'
  const aState = step >= 1 ? 'Success' : 'Idle'
  const bState = step >= 2 ? 'Success' : 'Idle'
  const cState = step >= 3 ? 'Success' : 'Idle'
  const cols = [20, 262, 504]
  return (
    <Svg h={340} label="Jerarquía de ejecución: workflow execution, task executions y action executions">
      <rect x={10} y={14} width={740} height={236} rx={14} fill={C.paperSoft} stroke={C.navy} strokeWidth={1.5} />
      <T x={26} y={38} size={13} anchor="start" weight={800} tone="navy">Workflow execution</T>
      <T x={190} y={38} size={10.5} anchor="start" tone="muted">una ejecución completa · estado global y trigger</T>
      <StateChip x={700} y={34} s={wfState} w={78} />
      {/* Task A */}
      {[
        { name: 'Task execution · query', st: aState, at: 1 },
        { name: 'Task execution · retry', st: bState, at: 2 },
        { name: 'Task execution · loop', st: cState, at: 3 },
      ].map((t, i) => (
        <g key={t.name} className={dim(step >= t.at || step === 0)}>
          <rect x={cols[i]} y={54} width={236} height={186} rx={10} fill="#fff" stroke={step === t.at ? C.teal : C.line} strokeWidth={1.5} />
          <T x={cols[i] + 12} y={76} size={11.5} anchor="start" weight={750}>{t.name}</T>
          <StateChip x={cols[i] + 118} y={98} s={t.st} />
          <T x={cols[i] + 12} y={130} size={9.5} tone="muted" anchor="start" weight={800}>ACTION EXECUTIONS</T>
        </g>
      ))}
      {/* A: success con 0 records */}
      <g className={show(step >= 1)}>
        <ActionExec x={32} y={140} label="Execute DQL Query" s="Success" />
        <Chip x={138} y={196} text='records: [ ] (0)' tone="amber" w={140} mono size={10.5} />
        <T x={138} y={226} size={10.5} tone="amber" weight={700}>Success ≠ la query trajo records</T>
      </g>
      {/* B: retry */}
      <g className={show(step >= 2)}>
        <ActionExec x={274} y={140} label="intento 1" s="Error" />
        <ActionExec x={274} y={174} label="intento 2 (retry)" s="Success" />
        <T x={380} y={226} size={10.5} tone="muted">cada retry = otra action execution</T>
      </g>
      {/* C: loop */}
      <g className={show(step >= 3)}>
        {[0, 1, 2].map((k) => (
          <g key={k} style={{ transform: `translateX(${k * 70}px)` }}>
            <rect x={516} y={140} width={62} height={28} rx={6} fill="#fff" stroke={C.teal} strokeWidth={1.2} />
            <T x={547} y={158} size={10.5} weight={650}>{`iter ${k + 1}`}</T>
          </g>
        ))}
        <Chip x={622} y={196} text="result = [ …, …, … ]" tone="teal" w={180} mono size={10.5} />
        <T x={622} y={226} size={10.5} tone="muted">una ejecución por iteración</T>
      </g>
      {/* Resultado */}
      <Arrow from={[380, 252]} to={[380, 268]} tone={step >= 4 ? 'teal' : 'neutral'} />
      <g className={dim(step >= 4)}>
        <rect x={160} y={272} width={440} height={56} rx={10} fill={step >= 4 ? C.tealTint : '#fff'} stroke={step >= 4 ? C.teal : C.line} strokeWidth={1.5} />
        <T x={178} y={296} size={12.5} anchor="start" weight={800} tone="navy">Workflow result</T>
        <T x={178} y={314} size={10.5} anchor="start" tone="muted">resultado final evaluado</T>
        <g className={show(step >= 4)}>
          <Mark x={362} y={300} ok r={9} />
          <T x={376} y={304} size={11} anchor="start" weight={700}>JSON válido</T>
          <Mark x={470} y={300} ok r={9} />
          <T x={484} y={304} size={11} anchor="start" weight={700}>tamaño permitido</T>
        </g>
      </g>
    </Svg>
  )
}

/* ——— 5. Jinja y DQL: datos entre tasks ——— */
function JinjaDql({ step }: { step: number }) {
  const empty = step === 4
  const pass = step === 3
  return (
    <Svg h={330} label="event() lleva el evento a DQL, query_task devuelve records y una expresión Jinja decide la siguiente task">
      {/* Evento */}
      <g className={dim(step === 0)}>
        <Box x={16} y={46} w={110} h={60} label="Event trigger" sub="evento entrante" tone="amber" solid={step === 0} size={12} />
      </g>
      <Arrow from={[128, 76]} to={[176, 76]} tone="amber" flow={step === 0} />
      <T x={152} y={66} size={10} tone="amber" weight={800} mono>event()</T>
      {step === 0 && <Particle path="M71,76 L300,76" dur={1.8} tone="amber" r={5} />}
      {/* query_task */}
      <g className={dim(step <= 1 || step === 4)}>
        <rect x={178} y={30} width={290} height={102} rx={10} fill="#fff" stroke={C.navy} strokeWidth={1.5} />
        <T x={192} y={50} size={11.5} anchor="start" weight={800} tone="navy">query_task</T>
        <T x={278} y={50} size={10} anchor="start" tone="muted">Execute DQL Query</T>
        <rect x={188} y={60} width={270} height={62} rx={6} fill={C.navy} />
        <text x={198} y={82} fontSize={10.5} fill="#fff" fontFamily={MONO}>{'data json:"""'}<tspan fill="#f3c46b">{'{{ event()|to_json }}'}</tspan>{'"""'}</text>
        <text x={198} y={106} fontSize={10.5} fill="#fff" fontFamily={MONO}>| fields timestamp, event.name, …</text>
      </g>
      <Arrow from={[470, 80]} to={[500, 80]} tone="navy" />
      {/* Resultado de la action */}
      <g className={dim(step === 1 || step >= 2)}>
        <rect x={502} y={30} width={242} height={102} rx={10} fill={C.paperSoft} stroke={step === 1 ? C.teal : C.line} strokeWidth={1.5} />
        <T x={516} y={50} size={10} tone="muted" anchor="start" weight={800}>RESULTADO DE LA ACTION</T>
        <text x={516} y={74} fontSize={11} fontWeight={700} fill={toneColors.teal.text} fontFamily={MONO}>records</text>
        {(empty ? [] : [0, 1, 2]).map((k) => <rect key={k} x={582 + k * 42} y={63} width={36} height={14} rx={3} fill={C.teal} opacity={0.75} />)}
        {empty && <T x={582} y={74} size={11} tone="coral" anchor="start" weight={700} mono>[ ] vacío</T>}
        <text x={516} y={96} fontSize={11} fill={C.soft} fontFamily={MONO}>types</text>
        <text x={516} y={118} fontSize={11} fill={C.soft} fontFamily={MONO}>metadata</text>
        <Chip x={690} y={108} text="Success" tone="teal" solid w={72} size={10.5} />
      </g>
      {/* Expresión */}
      <Arrow d="M622,134 C622,160 560,160 540,176" tone="violet" />
      <g className={dim(step >= 2)}>
        <rect x={60} y={178} width={560} height={40} rx={8} fill={C.violetTint} stroke={C.violet} strokeWidth={1.5} />
        <text x={340} y={203} textAnchor="middle" fontSize={12} fontWeight={700} fill={toneColors.violet.text} fontFamily={MONO}>{'{{ result("query_task")["records"] | length > 0 }}'}</text>
        <T x={60} y={170} size={10} tone="violet" anchor="start" weight={800}>CONDICIÓN DE LA SIGUIENTE TASK (Jinja)</T>
      </g>
      <g className={show(step >= 3)}>
        <Chip x={680} y={198} text={empty ? 'false' : 'true'} tone={empty ? 'coral' : 'teal'} solid w={70} mono size={12} />
      </g>
      {/* Siguiente task */}
      <Arrow from={[340, 220]} to={[340, 250]} tone={empty ? 'coral' : pass ? 'teal' : 'neutral'} dashed={empty} />
      <g className={dim(step >= 3)}>
        <rect x={220} y={252} width={240} height={52} rx={10} fill={pass ? C.tealTint : '#fff'} stroke={pass ? C.teal : empty ? C.line : C.line} strokeWidth={1.5} strokeDasharray={empty ? '5 5' : undefined} />
        <T x={236} y={283} size={12.5} anchor="start" weight={800} tone={empty ? 'muted' : 'navy'}>Siguiente task</T>
        <Chip x={404} y={278} text={empty ? 'Skipped' : pass ? 'Running' : 'Idle'} tone={empty ? 'neutral' : pass ? 'teal' : 'neutral'} solid={pass} w={78} size={10.5} />
      </g>
      {pass && <Particle path="M340,218 L340,278" dur={1.2} tone="teal" r={5} />}
      <g className={show(empty)}>
        <T x={480} y={268} size={10.5} anchor="start" tone="coral" weight={700}>0 records y aun así Success,</T>
        <T x={480} y={283} size={10.5} anchor="start" tone="coral" weight={700}>salvo Fail on empty result</T>
      </g>
      <Chip x={120} y={316} text="Run JavaScript: sin Jinja en su input" tone="amber" w={232} size={10} />
      <Chip x={600} y={316} text="en el contexto del actor" tone="violet" w={170} size={10} />
    </Svg>
  )
}

/* ——— 6. Límites de workflows ——— */
function Meter({ y, title, limit, note, fill, tone = 'teal' }: { y: number; title: string; limit: string; note: string; fill: number; tone?: Tone }) {
  const x = 20
  const w = 420
  return (
    <g>
      <T x={x} y={y} size={12} anchor="start" weight={800} tone="navy">{title}</T>
      <rect x={x} y={y + 10} width={w} height={16} rx={8} fill="#edf2f1" stroke={C.line} />
      <rect x={x} y={y + 10} width={w * fill} height={16} rx={8} fill={toneColors[tone].solid} opacity={0.8} />
      <line x1={x + w * fill} x2={x + w * fill} y1={y + 4} y2={y + 32} stroke={C.coral} strokeWidth={2.5} />
      <T x={x + w + 12} y={y + 23} size={12} anchor="start" weight={800} tone="coral">{limit}</T>
      <T x={x} y={y + 44} size={10.5} anchor="start" tone="muted">{note}</T>
    </g>
  )
}

function WorkflowLimits() {
  return (
    <Svg h={330} label="Límites: filtro del Event Trigger, ejecuciones por hora, Simple Workflow y tamaño de resultados">
      <T x={20} y={22} size={10} tone="muted" anchor="start" weight={800}>EVENT TRIGGER</T>
      <Meter y={46} title="Filtro DQL (expresión compilada)" limit="1.000 caracteres" note="máximo estricto por Event Trigger" fill={1} tone="amber" />
      <Meter y={114} title="Ejecuciones event-triggered por workflow" limit="1.000 / hora" note="exceso → HTTP 429 · 3 veces en 7 días: trigger desactivado" fill={1} tone="amber" />
      <T x={20} y={190} size={10} tone="muted" anchor="start" weight={800}>TAMAÑO DE RESULTADOS (misma escala en MB)</T>
      <Meter y={214} title="Action result · 6 MB menos los logs" limit="6 MB" note="" fill={0.6} />
      <Meter y={270} title="Workflow result · resultado global" limit="10 MB" note="" fill={1} />
      {/* Simple Workflow */}
      <rect x={580} y={14} width={166} height={302} rx={12} fill={C.paperSoft} stroke={C.line} />
      <T x={663} y={36} size={12} weight={800} tone="navy">Simple Workflow</T>
      <T x={663} y={52} size={10.5} tone="muted">1 trigger + 1 task</T>
      <Box x={608} y={64} w={110} h={32} label="Trigger" tone="amber" size={11.5} />
      <Arrow from={[663, 97]} to={[663, 111]} tone="navy" />
      <Box x={608} y={113} w={110} h={32} label="Task" tone="teal" size={11.5} />
      <T x={663} y={164} size={10.5} tone="teal" weight={700}>no consume horas</T>
      <T x={663} y={178} size={10.5} tone="teal" weight={700}>de workflow</T>
      <line x1={596} x2={730} y1={192} y2={192} stroke={C.line} strokeDasharray="4 4" />
      <T x={663} y={210} size={10.5} tone="muted">+ una 2.ª task</T>
      <Box x={608} y={220} w={110} h={28} label="Task" tone="teal" size={11} />
      <Arrow from={[663, 249]} to={[663, 261]} tone="navy" />
      <Box x={608} y={263} w={110} h={28} label="Task 2" tone="coral" size={11} className="sv-pulse" />
      <T x={663} y={308} size={10.5} tone="coral" weight={700}>= Workflow estándar</T>
    </Svg>
  )
}

/* ——— 7. Opciones del Problem trigger ——— */
const problemPoints = [
  { x: 80, label: 'Problem abierto' },
  { x: 250, label: 'Abierto 15 min' },
  { x: 400, label: 'RCA completado' },
  { x: 545, label: 'Cambia severity' },
  { x: 690, label: 'Problem cerrado' },
]
const problemSteps: { option: string; fires: number[]; note: string }[] = [
  { option: 'Problem state: active', fires: [0], note: 'Por defecto: una ejecución cuando el Problem se abre.' },
  { option: 'Minimum duration: 15 min', fires: [1], note: 'Solo si sigue abierto 15 min: los Problems breves no arrancan nada.' },
  { option: 'Wait for root cause analysis', fires: [2], note: 'Arranca cuando el root cause analysis ha terminado.' },
  { option: 'Updates: severity', fires: [0, 3], note: 'Vuelve a disparar al cambiar un campo seleccionado.' },
  { option: 'Problem state: active or closed', fires: [0, 4], note: 'Una ejecución al abrirse y otra al cerrarse.' },
]

function ProblemTriggerOptions({ step }: { step: number }) {
  const cur = problemSteps[Math.min(step, problemSteps.length - 1)]
  return (
    <Svg h={270} label="Cuándo arranca el workflow según las opciones del Problem trigger">
      <T x={20} y={24} size={10} tone="muted" anchor="start" weight={800}>PROBLEM TRIGGER · ¿EN QUÉ MOMENTO ARRANCA EL WORKFLOW?</T>
      <Chip x={380} y={48} text={cur.option} tone="amber" solid w={300} size={12} />
      {/* Ejecuciones disparadas */}
      {problemPoints.map((p, i) => (
        <g key={`fire-${p.x}`} className={show(cur.fires.includes(i))}>
          <Box x={p.x - 52} y={78} w={104} h={34} label="Workflow" sub="execution" tone="teal" solid size={11.5} />
          <Arrow from={[p.x, 138]} to={[p.x, 114]} tone="teal" flow />
        </g>
      ))}
      {/* Línea de tiempo del Problem */}
      <rect x={60} y={140} width={650} height={14} rx={7} fill={toneColors.coral.fill} stroke={C.coral} />
      <T x={385} y={172} size={10} tone="muted">vida del Problem →</T>
      {problemPoints.map((p, i) => {
        const active = cur.fires.includes(i)
        return (
          <g key={p.x}>
            <circle cx={p.x} cy={147} r={active ? 8 : 6} fill={active ? C.teal : '#fff'} stroke={active ? C.teal : C.coral} strokeWidth={2} className={active ? 'sv-pulse' : undefined} />
            <T x={p.x} y={198} size={11} weight={active ? 800 : 600} tone={active ? 'teal' : 'navy'}>{p.label}</T>
          </g>
        )
      })}
      <rect x={20} y={220} width={720} height={36} rx={10} fill={C.paperSoft} stroke={C.line} />
      <T x={380} y={243} size={12} weight={700} tone="navy">{cur.note}</T>
    </Svg>
  )
}

export const automationVisuals: VisualRegistry = {
  'workflow-model': {
    kind: 'animation',
    title: 'Anatomía de un workflow',
    caption: 'El trigger decide cuándo arranca, el input qué datos llegan, las tasks qué se hace y la execution deja estado y logs. Todo ocurre dentro del contexto del actor (recuadro violeta): su identidad y permisos. Para volúmenes masivos, Workflows no es la herramienta.',
    steps: ['Trigger: cuándo comienza', 'Input: qué datos recibe', 'Tasks/actions: qué hace', 'Actor: identidad y permisos', 'Execution: qué ocurrió'],
    render: ({ step }) => <WorkflowModel step={step} />,
  },
  triggers: {
    kind: 'animation',
    title: 'Cuatro formas de arrancar el mismo workflow',
    caption: 'On-demand, Event, Schedule y API no cambian lo que hace el workflow, solo cuándo empieza. Los triggers automáticos actúan sobre el workflow live: un draft no es una automatización activa.',
    steps: ['On-demand: invocación explícita', 'Event: evento que coincide', 'Schedule: hora o intervalo', 'API (no es un trigger): inicia cualquier workflow live', 'Solo el workflow live se automatiza'],
    render: ({ step }) => <Triggers step={step} />,
  },
  'deep-actor-permissions': {
    kind: 'animation',
    title: 'El actor es el techo de permisos',
    caption: 'Cada task solo puede hacer lo que permite el actor (barra violeta). Si el actor es un creador que pierde privilegios, las tasks chocan con el techo y fallan con 403; un Service User (iam:service-users:use) lo evita. write y run controlan quién edita o ejecuta el workflow, y el techo debe ajustarse al mínimo privilegio.',
    steps: ['Actor = creador personal', 'El creador pierde privilegios → 403', 'Service User como actor', 'write para editar, run para ejecutar', 'Mínimo privilegio'],
    stepMs: 3000,
    render: ({ step }) => <ActorPermissions step={step} />,
  },
  'deep-execution-states': {
    kind: 'animation',
    title: 'Workflow, task y action executions',
    caption: 'Una workflow execution contiene task executions, y cada task contiene una o más action executions: un retry añade otra action execution y un loop crea una por iteración con una lista como resultado. Ojo: una action en Success no garantiza que la query devolviera records.',
    steps: ['Workflow execution: Running', 'Task Success… con 0 records', 'Retry: otra action execution', 'Loop: una ejecución por iteración', 'Workflow result: JSON y tamaño'],
    stepMs: 3000,
    render: ({ step }) => <ExecutionStates step={step} />,
  },
  'deep-jinja-dql': {
    kind: 'animation',
    title: 'Los datos viajan entre tasks con Jinja',
    caption: 'event() inyecta el evento del trigger en la query DQL; query_task devuelve records, types y metadata; la expresión Jinja comprueba records antes de continuar. Si no hay records la action sigue en Success (salvo Fail on empty result), por eso la condición decide si la siguiente task corre o se omite.',
    steps: ['event() lleva el evento a DQL', 'query_task devuelve records', 'La expresión Jinja evalúa records', 'length > 0 → la task se ejecuta', 'Sin records: Success, pero se omite'],
    stepMs: 3000,
    render: ({ step }) => <JinjaDql step={step} />,
  },
  'deep-workflow-limits': {
    kind: 'illustration',
    title: 'Los límites operativos de un workflow',
    caption: 'La línea coral marca cada límite: 1.000 caracteres para el filtro DQL compilado del Event Trigger y 1.000 ejecuciones event-triggered por hora y por workflow. En la misma escala, una action admite 6 MB de resultado (menos sus logs) y el workflow 10 MB. A la derecha: en cuanto añades una segunda task, un Simple Workflow pasa a ser estándar.',
    render: () => <WorkflowLimits />,
  },
  'sup-problem-davis-triggers': {
    kind: 'animation',
    title: 'Cada opción del Problem trigger cambia el momento de arranque',
    caption: 'La barra coral es la vida de un Problem; los puntos verdes marcan cuándo arranca el workflow con cada opción. Minimum duration filtra los Problems breves, Wait for root cause analysis espera al análisis, Updates vuelve a disparar con un cambio de campo y active or closed avisa también del cierre.',
    steps: ['active: al abrirse', 'Minimum duration: si sigue abierto', 'Wait for root cause analysis', 'Updates: cambio de severity', 'active or closed: apertura y cierre'],
    stepMs: 3000,
    render: ({ step }) => <ProblemTriggerOptions step={step} />,
  },
}
