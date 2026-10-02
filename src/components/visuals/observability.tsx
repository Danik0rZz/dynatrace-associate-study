import { Arrow, Box, C, Chip, Cylinder, Doc, Mark, Particle, Person, Svg, T, dim, show, toneColors, type Tone } from './kit'
import type { VisualRegistry } from './types'

/* ——— 1. OneAgent: jerarquía de entidades ——— */
const ladder = [
  { label: 'Host', sub: 'infraestructura y SO', y: 276 },
  { label: 'Process Group', sub: 'agrupación lógica', y: 170 },
  { label: 'Process Group Instance', sub: 'instancia en ejecución', y: 222 },
  { label: 'Service', sub: 'función o endpoint', y: 112 },
  { label: 'Application', sub: 'consume el servicio', y: 20 },
]

function HostFrame({ x, name, step, pgiX, otherX }: { x: number; name: string; step: number; pgiX: number; otherX: number }) {
  return (
    <g>
      <rect x={x} y={222} width={250} height={104} rx={10} fill={toneColors.navy.fill} stroke={C.navy} strokeWidth={1.5} />
      <T x={x + 12} y={238} size={11.5} weight={800} tone="navy" anchor="start">{name}</T>
      <g className={show(step >= 1)}>
        <Box x={otherX} y={250} w={90} h={40} label="otro proceso" tone="neutral" size={10.5} />
        <Box x={pgiX} y={250} w={120} h={40} label="checkout" sub={step >= 2 ? 'PGI' : 'proceso'} tone={step >= 2 ? 'teal' : 'neutral'} solid={step === 2} size={11.5} />
      </g>
      <Chip x={x + 190} y={306} text="OneAgent" tone="teal" solid w={88} />
      <g className={show(step === 0)}>
        <circle cx={x + 190} cy={306} r={22} fill="none" stroke={C.teal} strokeWidth={1.5} className="sv-ping" />
      </g>
    </g>
  )
}

function OneAgentHierarchy({ step }: { step: number }) {
  return (
    <Svg h={340} label="Jerarquía de entidades que observa OneAgent: Host, Process Group, Process Group Instance, Service y Application">
      {/* Escalera de niveles */}
      {ladder.map((level, index) => (
        <g key={level.label} className={dim(step >= index)}>
          <Box x={16} y={level.y} w={170} h={42} label={level.label} sub={level.sub} tone={step === index ? 'teal' : 'navy'} solid={step === index} size={11.5} />
        </g>
      ))}
      {/* Hosts */}
      <HostFrame x={200} name="Host A" step={step} pgiX={318} otherX={216} />
      <HostFrame x={480} name="Host B" step={step} pgiX={494} otherX={624} />
      {/* Process Group */}
      <g className={show(step >= 1)}>
        <rect x={308} y={246} width={316} height={48} rx={9} fill="none" stroke={C.violet} strokeWidth={2} strokeDasharray="7 5" className="sv-flow-slow" />
        <Chip x={466} y={206} text="Process Group: checkout" tone="violet" solid={step === 1} w={190} />
        <line x1={466} x2={466} y1={217} y2={246} stroke={C.violet} strokeWidth={1.5} strokeDasharray="3 3" />
      </g>
      {/* Service */}
      <g className={show(step >= 3)}>
        <Box x={385} y={112} w={160} h={46} label="Service" sub="/checkout" tone="teal" solid={step === 3} />
        <Arrow from={[378, 248]} to={[440, 162]} tone="teal" flow />
        <Arrow from={[554, 248]} to={[492, 162]} tone="teal" flow />
        <T x={610} y={140} size={10.5} tone="muted" anchor="start">los procesos ofrecen</T>
        <T x={610} y={154} size={10.5} tone="muted" anchor="start">la función</T>
      </g>
      {/* Application */}
      <g className={show(step >= 4)}>
        <Box x={385} y={20} w={160} h={46} label="Application" sub="experiencia de usuario" tone="teal" solid={step === 4} />
        <Arrow from={[465, 68]} to={[465, 108]} tone="navy" />
        <T x={474} y={92} size={10.5} tone="muted" anchor="start">consume</T>
        {[0, 1, 2].map((i) => <Person key={i} x={620 + i * 26} y={52} tone="navy" scale={0.8} />)}
        <Arrow from={[604, 43]} to={[550, 43]} tone="navy" />
      </g>
      <T x={330} y={70} size={10.5} tone="muted" className={show(step === 0)}>OneAgent se instala en el host</T>
      <T x={330} y={86} size={10.5} tone="muted" className={show(step === 0)}>y observa desde ahí</T>
    </Svg>
  )
}

/* ——— 2. OneAgent frente a ActiveGate y extensión ——— */
function ActiveGateModel() {
  const sources = ['BD remota', 'Cloud API', 'vCenter']
  return (
    <Svg h={340} label="OneAgent se despliega en el host observado; ActiveGate media el acceso remoto a bases de datos, cloud APIs o vCenter">
      {/* Dynatrace */}
      <rect x={622} y={24} width={118} height={276} rx={12} fill={C.navy} />
      <T x={681} y={158} size={14} weight={800} tone="white">Dynatrace</T>
      <T x={681} y={176} size={10} tone="white" opacity={0.75}>entorno</T>
      {/* Carril OneAgent */}
      <T x={20} y={20} size={10} tone="muted" anchor="start" weight={800}>DESPLEGADO DONDE OBSERVA</T>
      <rect x={20} y={30} width={280} height={96} rx={10} fill={toneColors.navy.fill} stroke={C.navy} strokeWidth={1.5} />
      <T x={32} y={48} size={11.5} weight={800} tone="navy" anchor="start">Host / proceso observado</T>
      <Box x={32} y={58} w={112} h={34} label="proceso" tone="neutral" size={11} />
      <Box x={154} y={58} w={134} h={34} label="OneAgent" tone="teal" solid size={12} />
      <T x={160} y={112} size={10} tone="muted">instalado dentro del host</T>
      <Arrow from={[302, 75]} to={[618, 75]} tone="teal" />
      <Particle path="M302,75 L618,75" dur={2.2} tone="teal" r={4.5} />
      <Particle path="M302,75 L618,75" dur={2.2} begin={1.1} tone="teal" r={4.5} />
      <T x={460} y={64} size={11} weight={700} tone="teal">OneAgent</T>
      <T x={460} y={96} size={10.5} tone="muted">¿instalado, conectado, soporta la tecnología?</T>
      <line x1={20} x2={600} y1={146} y2={146} stroke={C.line} strokeDasharray="4 6" />
      {/* Carril ActiveGate */}
      <T x={20} y={166} size={10} tone="muted" anchor="start" weight={800}>ORIGEN REMOTO</T>
      {sources.map((source, index) => (
        <g key={source}>
          <Box x={20} y={176 + index * 46} w={126} h={36} label={source} tone="neutral" size={12} />
          <Arrow from={[244, 230]} to={[150, 194 + index * 46]} tone="navy" dashed />
          <Particle path={`M148,${194 + index * 46} L244,230`} dur={2} begin={index * 0.6} tone="navy" r={4} />
        </g>
      ))}
      <Box x={246} y={202} w={186} h={56} label="ActiveGate" sub="media el acceso remoto" tone="navy" solid />
      <T x={339} y={278} size={10.5} tone="muted">¿grupo, red y credenciales</T>
      <T x={339} y={292} size={10.5} tone="muted">permiten llegar al origen?</T>
      <Arrow from={[434, 230]} to={[618, 230]} tone="navy" />
      <Particle path="M434,230 L618,230" dur={2} tone="navy" r={4.5} />
      <Particle path="M434,230 L618,230" dur={2} begin={1} tone="navy" r={4.5} />
      {/* Extensión */}
      <Doc x={462} y={156} w={40} h={52} tone="violet" />
      <line x1={462} y1={196} x2={434} y2={210} stroke={C.violet} strokeWidth={1.5} strokeDasharray="3 3" />
      <T x={512} y={170} size={11.5} weight={800} tone="violet" anchor="start">Extensión</T>
      <T x={512} y={185} size={10} tone="muted" anchor="start">define integración</T>
      <T x={512} y={198} size={10} tone="muted" anchor="start">y modelo de datos</T>
      <T x={446} y={254} size={10} tone="muted" anchor="start">¿activa, configurada y</T>
      <T x={446} y={268} size={10} tone="muted" anchor="start">produciendo entidades?</T>
      <Chip x={380} y={322} text="OneAgent dentro de un servicio remoto no resuelve el acceso remoto" tone="coral" size={10.5} />
    </Svg>
  )
}

/* ——— 3. Matriz de modos de monitorización ——— */
type Cell = 'si' | 'no' | 'in' | 'out' | 'inreq'
const modeRows: { cap: string; cells: [Cell, Cell, Cell] }[] = [
  { cap: 'Topology discovery / Smartscape', cells: ['si', 'si', 'si'] },
  { cap: 'Basic host monitoring', cells: ['si', 'si', 'si'] },
  { cap: 'Host process details', cells: ['si', 'si', 'no'] },
  { cap: 'Disk, network, memory analysis', cells: ['si', 'si', 'no'] },
  { cap: 'Tracing and profiling', cells: ['si', 'no', 'no'] },
  { cap: 'Process injection', cells: ['si', 'out', 'no'] },
  { cap: 'Log Management', cells: ['in', 'in', 'in'] },
  { cap: 'Extensions', cells: ['in', 'in', 'no'] },
  { cap: 'Application Security', cells: ['in', 'in', 'inreq'] },
]
const cellStyle: Record<Cell, { text: string; fill: string; stroke: string; color: string; dash?: string }> = {
  si: { text: 'Sí', fill: C.teal, stroke: C.teal, color: '#fff' },
  no: { text: 'No', fill: C.coralTint, stroke: C.coral, color: toneColors.coral.text },
  in: { text: 'Opt-in', fill: '#fff', stroke: C.amber, color: toneColors.amber.text, dash: '4 3' },
  out: { text: 'Opt-out', fill: C.tealTint, stroke: C.teal, color: C.tealDark },
  inreq: { text: 'Opt-in ¹', fill: '#fff', stroke: C.amber, color: toneColors.amber.text, dash: '4 3' },
}
const modes = [
  { name: 'Full-Stack', desc: 'Modo por defecto: visibilidad completa en hosts, procesos y services, con tracing y profiling.' },
  { name: 'Infrastructure', desc: 'Infraestructura, logs, AIOps y backing services; auto-injection activa por defecto (opt-out).' },
  { name: 'Discovery', desc: 'Métricas básicas para descubrir hosts y procesos; DPS, consumo vía Foundation & Discovery.' },
]

function MonitoringModes({ step }: { step: number }) {
  const colX = [372, 506, 640]
  return (
    <Svg h={404} label="Matriz de capacidades de los modos Full-Stack, Infrastructure y Discovery">
      {modes.map((mode, c) => (
        <g key={mode.name}>
          <rect x={colX[c] - 64} y={14} width={128} height={330} rx={10} fill={step === c ? '#f6fbfa' : 'none'} stroke={step === c ? C.teal : 'none'} strokeWidth={1.5} />
          <Box x={colX[c] - 60} y={20} w={120} h={30} label={mode.name} tone={step === c ? 'teal' : 'navy'} solid={step === c} size={12} />
        </g>
      ))}
      <T x={20} y={40} size={10} tone="muted" anchor="start" weight={800}>CAPACIDAD</T>
      {modeRows.map((row, r) => {
        const y = 62 + r * 31
        return (
          <g key={row.cap}>
            <line x1={20} x2={710} y1={y + 26} y2={y + 26} stroke={C.line} strokeOpacity={0.7} />
            <T x={20} y={y + 16} size={11.5} anchor="start" weight={650}>{row.cap}</T>
            {row.cells.map((cell, c) => {
              const s = cellStyle[cell]
              return (
                <g key={c} style={{ opacity: step === c ? 1 : 0.5 }}>
                  <rect x={colX[c] - 56} y={y + 1} width={112} height={22} rx={11} fill={s.fill} stroke={s.stroke} strokeWidth={1.3} strokeDasharray={s.dash} />
                  <T x={colX[c]} y={y + 16} size={10.5} weight={750} style={{ fill: s.color }}>{s.text}</T>
                </g>
              )
            })}
          </g>
        )
      })}
      {modes.map((mode, c) => (
        <T key={mode.name} x={380} y={362} size={11} weight={650} tone="teal" className={show(step === c)}>{mode.name}: {mode.desc}</T>
      ))}
      <T x={20} y={382} size={9.5} tone="muted" anchor="start">«No» corresponde a «—» en la tabla oficial de modos de OneAgent.</T>
      <T x={20} y={396} size={9.5} tone="muted" anchor="start">¹ En Discovery, Application Security requiere habilitar code-module injection en el host y reiniciar los procesos.</T>
    </Svg>
  )
}

/* ——— 4. Inyección y reinicios ——— */
const lifeStages = ['arranque', 'inyección', 'cambio de config', 'reinicio', 'nuevo proceso']

function Toggle({ x, y, on, label, state }: { x: number; y: number; on: boolean; label: string; state: string }) {
  return (
    <g>
      <T x={x} y={y + 14} size={11.5} weight={700} anchor="start">{label}</T>
      <rect x={x + 116} y={y} width={40} height={20} rx={10} fill={on ? C.teal : '#c9d4d2'} />
      <circle cx={x + 126} cy={y + 10} r={7} fill="#fff" style={{ transform: `translateX(${on ? 20 : 0}px)` }} />
      <T x={x + 136} y={y + 36} size={10} tone={on ? 'teal' : 'coral'} weight={700}>{state}</T>
    </g>
  )
}

function Injection({ step }: { step: number }) {
  const moduleLoaded = step === 1 || step === 2
  const configOn = step <= 1
  return (
    <Svg h={310} label="Vida de un proceso: la inyección realizada permanece hasta que el proceso se reinicia">
      {/* Línea temporal */}
      <line x1={70} x2={690} y1={30} y2={30} stroke={C.line} strokeWidth={3} />
      {lifeStages.map((stage, index) => {
        const x = 70 + index * 155
        return (
          <g key={stage} className={dim(index <= step)}>
            <circle cx={x} cy={30} r={8} fill={index === step ? C.teal : index < step ? C.navy : '#fff'} stroke={index <= step ? C.teal : '#b9c7c5'} strokeWidth={2} />
            <T x={x} y={54} size={10.5} weight={index === step ? 800 : 600} tone={index === step ? 'teal' : 'muted'}>{stage}</T>
          </g>
        )
      })}
      {/* Proceso */}
      <g className={step === 3 ? 'sv-dim' : 'sv-in'}>
        <rect x={20} y={74} width={500} height={172} rx={12} fill={C.paperSoft} stroke={C.navy} strokeWidth={1.5} />
        <T x={36} y={96} size={12} weight={800} tone="navy" anchor="start">{step >= 4 ? 'Proceso (nueva ejecución)' : 'Proceso en ejecución'}</T>
        <Box x={36} y={112} w={200} h={110} label="Código de la aplicación" sub="p. ej. Java, .NET, Node.js" tone="neutral" size={12} />
        <rect x={262} y={112} width={240} height={110} rx={8} fill="none" stroke="#b9c7c5" strokeWidth={1.5} strokeDasharray="5 5" />
        <T x={382} y={172} size={11} tone="muted" className={show(!moduleLoaded)}>sin code module</T>
        <g className={show(moduleLoaded)}>
          <Box x={262} y={112} w={240} h={110} label="OneAgent code module" sub={step === 2 ? 'sigue enlazado al proceso' : 'inyectado al arrancar'} tone="teal" solid={step === 1} size={13} />
        </g>
      </g>
      {/* Reinicio */}
      <g className={show(step === 3)}>
        <circle cx={270} cy={160} r={34} fill="#fff" stroke={C.amber} strokeWidth={3} strokeDasharray="150 60" className="sv-spin" style={{ transformOrigin: '270px 160px' }} />
        <T x={270} y={165} size={12} weight={800} tone="amber">reinicio</T>
      </g>
      {/* Configuración */}
      <rect x={544} y={74} width={196} height={172} rx={12} fill={step === 2 ? C.amberTint : '#fff'} stroke={step === 2 ? C.amber : C.line} strokeWidth={1.5} />
      <T x={558} y={96} size={10} tone="muted" anchor="start" weight={800}>CONFIGURACIÓN DEL HOST</T>
      <Toggle x={558} y={114} on={configOn} label="Auto-injection" state={configOn ? 'enabled' : 'disabled'} />
      <Toggle x={558} y={180} on={configOn} label="OneAgent" state={configOn ? 'en ejecución' : 'detenido'} />
      {/* Mensajes */}
      <T x={380} y={278} size={12} weight={700} tone="muted" className={show(step === 0)}>El proceso arranca con auto-injection activa</T>
      <T x={380} y={278} size={12} weight={700} tone="teal" className={show(step === 1)}>OneAgent inyecta el code module en el proceso</T>
      <g className={show(step === 2)}>
        <T x={380} y={274} size={12.5} weight={800} tone="coral">Cambiar la configuración ≠ efecto en procesos vivos</T>
        <T x={380} y={294} size={11} tone="muted">La inyección ya realizada permanece enlazada hasta reiniciar el proceso</T>
      </g>
      <T x={380} y={278} size={12} weight={700} tone="amber" className={show(step === 3)}>El proceso se reinicia…</T>
      <g className={show(step === 4)}>
        <T x={380} y={274} size={12.5} weight={800} tone="teal">Solo tras el reinicio el proceso queda sin módulo</T>
        <T x={380} y={294} size={11} tone="muted">Distingue cambio de configuración, reinicio y evidencia posterior</T>
      </g>
    </Svg>
  )
}

/* ——— 5. Árbol de troubleshooting por capas ——— */
const layers = [
  { label: 'Conectividad y versión', sub: 'Deployment Status, versión, conexión' },
  { label: 'Modo y capacidad habilitada', sub: 'modo de monitorización, capability' },
  { label: 'Proceso, reinicio e inyección', sub: 'auto-injection, reinicio, tecnología' },
  { label: 'ActiveGate, extensión o integración', sub: 'grupo, endpoint, permisos, salud' },
  { label: 'Ingestión, procesamiento y retención', sub: 'path, regla, OpenPipeline, bucket' },
  { label: 'Consulta, timeframe y permisos', sub: 'UI, management zone, query, scope' },
]
const symptoms = [
  { text: 'Host sí, service no', layer: 2 },
  { text: 'Service sí, logs no', layer: 4 },
  { text: 'Solo un usuario afectado', layer: 5 },
]

function Troubleshooting({ step }: { step: number }) {
  return (
    <Svg h={330} label="Escalera de diagnóstico de OneAgent por capas, de conectividad a consulta y permisos">
      {layers.map((layer, index) => {
        const x = 20 + index * 76
        const y = 18 + index * 51
        const state = index < step ? 'done' : index === step ? 'active' : 'todo'
        const tone: Tone = state === 'active' ? 'teal' : 'navy'
        return (
          <g key={layer.label} className={dim(state !== 'todo')}>
            {index > 0 && <path d={`M${x - 50},${y - 9} L${x - 50},${y + 21} L${x - 2},${y + 21}`} fill="none" stroke={C.line} strokeWidth={2} />}
            <Box x={x} y={y} w={340} h={44} label={layer.label} sub={layer.sub} tone={tone} solid={state === 'active'} size={12.5} />
            <circle cx={x + 320} cy={y + 22} r={10} fill={state === 'active' ? '#fff' : C.paperSoft} stroke={toneColors[tone].stroke} className={show(state !== 'done')} />
            <T x={x + 320} y={y + 26} size={10.5} weight={800} tone={tone} className={show(state !== 'done')}>{index + 1}</T>
            <Mark x={x + 320} y={y + 22} ok r={10} className={show(state === 'done')} />
          </g>
        )
      })}
      {/* Síntomas */}
      <T x={522} y={30} size={10} tone="muted" anchor="start" weight={800}>SÍNTOMA → CAPA A REVISAR</T>
      {symptoms.map((symptom, index) => {
        const active = symptom.layer === step
        return (
          <g key={symptom.text}>
            <rect x={518} y={42 + index * 34} width={222} height={28} rx={6} fill={active ? C.amberTint : '#fff'} stroke={active ? C.amber : C.line} strokeWidth={1.3} />
            <T x={528} y={60 + index * 34} size={10.5} anchor="start" weight={active ? 750 : 500}>{symptom.text}</T>
            <Chip x={710} y={56 + index * 34} text={`capa ${symptom.layer + 1}`} tone={active ? 'amber' : 'neutral'} solid={active} w={50} size={10} />
          </g>
        )
      })}
      {/* Mensaje */}
      <rect x={20} y={238} width={250} height={72} rx={10} fill={C.coralTint} stroke={C.coral} strokeWidth={1.3} />
      <T x={34} y={262} size={11.5} weight={800} tone="coral" anchor="start">No concluyas «falta soporte»</T>
      <T x={34} y={280} size={10.5} tone="muted" anchor="start">hasta descartar las capas</T>
      <T x={34} y={296} size={10.5} tone="muted" anchor="start">anteriores, en orden</T>
    </Svg>
  )
}

/* ——— 6. Conectores de infraestructura ——— */
function ScenarioCard({ x, y, title, source, component, sub, validate, tone }: { x: number; y: number; title: string; source: string; component: string; sub?: string; validate: string; tone: Tone }) {
  return (
    <g>
      <rect x={x} y={y} width={355} height={146} rx={12} fill="#fff" stroke={C.line} strokeWidth={1.5} />
      <T x={x + 14} y={y + 24} size={12.5} weight={800} anchor="start" tone="navy">{title}</T>
      <Box x={x + 14} y={y + 38} w={112} h={50} label={source} tone="neutral" size={11.5} />
      <Box x={x + 168} y={y + 38} w={174} h={50} label={component} sub={sub} tone={tone} solid size={11.5} />
      <Arrow from={[x + 166, y + 63]} to={[x + 130, y + 63]} tone={tone} dashed />
      <Particle path={`M${x + 128},${y + 63} L${x + 166},${y + 63}`} dur={1.6} tone={tone} r={3.5} />
      <T x={x + 14} y={y + 112} size={10} tone="muted" anchor="start" weight={800}>VALIDAR</T>
      <T x={x + 14} y={y + 130} size={10.5} anchor="start">{validate}</T>
    </g>
  )
}

function InfraConnectors() {
  return (
    <Svg h={326} label="Escenarios de Infrastructure Observability: base de datos remota, Kubernetes API, workloads de Kubernetes y VMware">
      <ScenarioCard x={20} y={12} title="Base de datos remota" source="Servidor de BD" component="Environment ActiveGate" sub="+ extensión" validate="driver, red, credenciales y permisos" tone="navy" />
      <ScenarioCard x={385} y={12} title="Kubernetes API" source="API del cluster" component="ActiveGate 1.327+" sub="Enhanced Object Visibility" validate="Enhanced Object Visibility, RBAC, cluster connection" tone="navy" />
      {/* Workloads: OneAgent dentro */}
      <g>
        <rect x={20} y={172} width={355} height={146} rx={12} fill="#fff" stroke={C.line} strokeWidth={1.5} />
        <T x={34} y={196} size={12.5} weight={800} anchor="start" tone="navy">Kubernetes workload / process</T>
        <rect x={34} y={210} width={328} height={50} rx={8} fill={toneColors.navy.fill} stroke={C.navy} strokeWidth={1.3} />
        <T x={46} y={239} size={11} weight={700} anchor="start" tone="navy">pods · contenedores</T>
        <Chip x={270} y={235} text="OneAgent / Dynatrace Operator" tone="teal" solid w={178} size={9.5} />
        <T x={34} y={284} size={10} tone="muted" anchor="start" weight={800}>VALIDAR</T>
        <T x={34} y={302} size={10.5} anchor="start">modo Full-Stack, auto-injection en pods y namespace</T>
      </g>
      <ScenarioCard x={385} y={172} title="VMware vSphere" source="vCenter / ESXi" component="ActiveGate" validate="vCenter/ESXi, lectura, red y grupo" tone="navy" />
    </Svg>
  )
}


/* ——— 7. Network zones: preferencia, alternative zones y fallback ——— */
type ZoneState = 'up' | 'down'
const zoneRows = [
  { key: 'main', name: 'Zona principal', sub: 'network zone del OneAgent', y: 24 },
  { key: 'alt', name: 'Alternative zone', sub: 'respaldo configurado', y: 124 },
  { key: 'def', name: 'Default zone', sub: 'fuera de sus zonas', y: 224 },
] as const

function NetworkZones({ step }: { step: number }) {
  const state: Record<'main' | 'alt' | 'def', ZoneState> = {
    main: step === 0 ? 'up' : 'down',
    alt: step <= 1 ? 'up' : 'down',
    def: 'up',
  }
  const target = step === 0 ? 'main' : step === 1 ? 'alt' : step === 2 ? 'def' : null
  const agY = (y: number) => y + 44
  return (
    <Svg h={360} label="Network zones: OneAgent usa la zona principal, después las alternative zones y por último el fallback mode">
      {/* OneAgent */}
      <Box x={20} y={140} w={150} h={56} label="OneAgent" sub="inicia la conexión" tone="teal" solid />
      {/* Zonas */}
      {zoneRows.map((zone) => {
        const up = state[zone.key] === 'up'
        const active = target === zone.key
        return (
          <g key={zone.key}>
            <rect x={300} y={zone.y} width={210} height={88} rx={12} fill={active ? C.tealTint : C.paperSoft} stroke={active ? C.teal : '#b9c7c5'} strokeWidth={1.5} strokeDasharray="6 4" />
            <T x={312} y={zone.y + 18} size={11} weight={800} tone="navy" anchor="start">{zone.name}</T>
            <T x={312} y={zone.y + 32} size={10} tone="muted" anchor="start">{zone.sub}</T>
            <Box x={318} y={zone.y + 42} w={130} h={36} label="ActiveGate" tone={up ? (active ? 'teal' : 'navy') : 'coral'} size={11.5} />
            <Mark x={474} y={zone.y + 60} ok={up} r={10} />
          </g>
        )
      })}
      {/* Rutas OneAgent → ActiveGate */}
      {zoneRows.map((zone) => {
        const d = `M170,168 C235,168 250,${agY(zone.y) + 16} 316,${agY(zone.y) + 16}`
        const active = target === zone.key
        return (
          <g key={zone.key} className={dim(active)}>
            <Arrow d={d} tone={active ? 'teal' : 'neutral'} flow={active} />
            {active && <Particle path={d} dur={1.8} tone="teal" />}
          </g>
        )
      })}
      <g className={show(target !== null)}>
        <Chip x={236} y={124} text="9999" tone="teal" w={52} />
      </g>
      {/* Cluster */}
      <Box x={600} y={140} w={140} h={56} label="SaaS Cluster" sub="puerto 443" tone="navy" />
      {zoneRows.map((zone) => {
        const active = target === zone.key
        const d = `M510,${zone.y + 44} C560,${zone.y + 44} 560,168 598,168`
        return (
          <g key={zone.key} className={show(active)}>
            <Arrow d={d} tone="teal" flow />
          </g>
        )
      })}
      {/* Fallback None */}
      <g className={show(step === 3)}>
        <rect x={20} y={226} width={240} height={86} rx={10} fill={C.coralTint} stroke={C.coral} strokeWidth={1.5} />
        <T x={140} y={250} size={11.5} weight={800} tone="coral">Fallback mode: None</T>
        <T x={140} y={270} size={10.5} tone="coral">el tráfico no sale de la zona</T>
        <T x={140} y={286} size={10.5} tone="coral">principal ni de las alternative zones</T>
        <line x1={268} x2={300} y1={268} y2={268} stroke={C.coral} strokeWidth={2} strokeDasharray="4 4" />
        <Mark x={284} y={268} ok={false} r={9} />
      </g>
      <g className={show(step === 2)}>
        <rect x={20} y={226} width={240} height={86} rx={10} fill={C.tealTint} stroke={C.teal} strokeWidth={1.5} />
        <T x={140} y={250} size={11.5} weight={800} tone="teal">Fallback mode: Any ActiveGate</T>
        <T x={140} y={270} size={10.5} tone="teal">(por defecto) cualquier ActiveGate</T>
        <T x={140} y={286} size={10.5} tone="teal">disponible, incluida la default zone</T>
      </g>
      <T x={380} y={340} size={11.5} weight={700} tone="muted">
        {['Hay ActiveGate en su zona: lo prefiere', 'Zona principal sin ActiveGate: usa la alternative zone', 'Ninguna disponible: decide el fallback mode', 'Con None, el tráfico no cruza a otras zonas'][step]}
      </T>
    </Svg>
  )
}

/* ——— 8. Un Problem a partir de Davis events correlacionados ——— */
const davisServices = [
  { name: 'checkout', x: 40 },
  { name: 'cart', x: 290 },
  { name: 'payments', x: 540 },
]

function DavisProblem({ step }: { step: number }) {
  return (
    <Svg h={372} label="Tres services degradados por una base de datos lenta se correlacionan en un único Problem">
      {/* Frontend (entry point) */}
      <Box x={290} y={16} w={180} h={40} label="Frontend" sub="entry-point service" tone={step >= 3 ? 'amber' : 'navy'} size={12} />
      {davisServices.map((svc) => (
        <g key={svc.name}>
          <Arrow from={[380, 58]} to={[svc.x + 90, 96]} tone={step >= 2 ? 'violet' : 'neutral'} dashed={step < 2} />
          <Box x={svc.x} y={98} w={180} h={44} label={`Service ${svc.name}`} tone={step >= 3 ? 'amber' : 'navy'} size={12} />
          <g className={show(step >= 0 && step < 2)}>
            <Chip x={svc.x + 150} y={98} text="Davis event" tone="amber" solid w={92} size={10} />
          </g>
          <Arrow from={[svc.x + 90, 144]} to={[380, 216]} tone={step >= 2 ? 'violet' : 'neutral'} dashed={step < 2} />
        </g>
      ))}
      {/* Base de datos */}
      <Cylinder x={330} y={218} w={100} h={62} tone={step >= 2 ? 'coral' : 'navy'} label="Base de datos" />
      <g className={show(step >= 0 && step < 2)}>
        <Chip x={470} y={240} text="lenta" tone="amber" w={56} size={10} />
      </g>
      {/* Etiquetas de perspectivas */}
      <g className={show(step === 1)}>
        <Chip x={120} y={196} text="horizontal: service → service" tone="violet" w={196} size={10.5} />
        <Chip x={630} y={196} text="vertical: proceso → host" tone="violet" w={176} size={10.5} />
        <Box x={560} y={226} w={140} h={36} label="Proceso · Host" tone="violet" size={11} />
        <Arrow from={[630, 144]} to={[630, 224]} tone="violet" />
      </g>
      {/* Problem */}
      <g className={show(step >= 2)}>
        <rect x={40} y={296} width={680} height={60} rx={12} fill={C.coralTint} stroke={C.coral} strokeWidth={1.5} />
        <T x={60} y={320} size={12.5} weight={800} tone="coral" anchor="start">1 Problem · root cause: Base de datos</T>
        <T x={60} y={340} size={10.5} tone="coral" anchor="start">Davis events con la misma root cause, correlacionados</T>
        <g className={show(step >= 3)}>
          <T x={700} y={320} size={11.5} weight={800} tone="amber" anchor="end">Impact analysis</T>
          <T x={700} y={340} size={10.5} tone="amber" anchor="end">blast radius: entry points y entidades afectadas</T>
        </g>
      </g>
      <g className={show(step < 2)}>
        <T x={380} y={330} size={11.5} weight={700} tone="muted">{step === 0 ? 'Tres services generan Davis events a la vez' : 'Davis usa la topología vertical y horizontal'}</T>
      </g>
    </Svg>
  )
}

export const observabilityVisuals: VisualRegistry = {
  'sup-activegate-routing': {
    kind: 'animation',
    title: 'Por qué ActiveGate sale el tráfico de OneAgent',
    caption: 'OneAgent siempre inicia la conexión (9999 hacia el Environment ActiveGate, 443 hacia el SaaS Cluster). Prefiere el ActiveGate de su network zone, después las alternative zones, y solo entonces aplica el fallback mode: Any ActiveGate (por defecto) u Only default zone permiten salir; None mantiene el tráfico dentro de sus zonas.',
    steps: ['ActiveGate en su zona', 'Alternative zone', 'Fallback: Any ActiveGate', 'Fallback: None'],
    stepMs: 3000,
    render: ({ step }) => <NetworkZones step={step} />,
  },
  'sup-davis-problems': {
    kind: 'animation',
    title: 'Muchos síntomas, un solo Problem',
    caption: 'Tres services muestran Davis events porque dependen de la misma base de datos lenta. Davis recorre la topología vertical (service, proceso, host) y horizontal (llamadas entre services) y los correlaciona en un único Problem con la base de datos como root cause; el impact analysis mide el blast radius.',
    steps: ['Davis events en tres services', 'Topología vertical y horizontal', 'Un único Problem', 'Impact analysis'],
    stepMs: 3000,
    render: ({ step }) => <DavisProblem step={step} />,
  },

  oneagent: {
    kind: 'animation',
    title: 'Qué observa OneAgent y cómo se relaciona',
    caption: 'OneAgent se instala en el host y desde ahí descubre procesos. Los procesos relacionados forman un Process Group; cada ejecución concreta es una Process Group Instance; los procesos ofrecen Services y una Application los consume. Tener el host monitorizado no garantiza que toda tecnología esté cubierta.',
    steps: ['Host con OneAgent', 'Process Group', 'Process Group Instances', 'Service', 'Application'],
    stepMs: 2600,
    render: ({ step }) => <OneAgentHierarchy step={step} />,
  },
  activegate: {
    kind: 'animation',
    title: 'OneAgent observa desde dentro; ActiveGate llega al origen remoto',
    caption: 'Arriba, OneAgent vive en el host o proceso que observa. Abajo, el origen (base de datos remota, cloud API, vCenter) no lleva agente: ActiveGate media el acceso y la extensión define la integración y el modelo de datos. Cada componente tiene su propia pregunta de diagnóstico.',
    render: () => <ActiveGateModel />,
  },
  'monitoring-modes': {
    kind: 'animation',
    title: 'Tres modos, tres perfiles de capacidad',
    caption: 'Recorre cada columna: los tres modos comparten topología y basic host monitoring; Discovery no tiene detalle de procesos, análisis de disco, red y memoria, process injection ni Extensions, y tracing/profiling es exclusivo de Full-Stack. Opt-in se activa explícitamente; opt-out viene activo y puede desactivarse. Discovery no equivale a Full-Stack ni a Infrastructure.',
    steps: ['Full-Stack', 'Infrastructure', 'Discovery'],
    stepMs: 3200,
    render: ({ step }) => <MonitoringModes step={step} />,
  },
  injection: {
    kind: 'animation',
    title: 'La inyección vive hasta que el proceso se reinicia',
    caption: 'Fíjate en el paso 3: la configuración cambia (auto-injection desactivada, OneAgent detenido) pero el code module sigue cargado en el proceso vivo. Solo el reinicio produce un proceso sin módulo. Separa siempre cambio de configuración, reinicio y evidencia posterior.',
    steps: ['El proceso arranca', 'Code module inyectado', 'Auto-injection off / OneAgent stop', 'Reinicio del proceso', 'Nuevo proceso sin módulo'],
    stepMs: 2800,
    render: ({ step }) => <Injection step={step} />,
  },
  'deep-observability-troubleshooting': {
    kind: 'animation',
    title: 'Diagnostica por capas, en orden',
    caption: 'Baja la escalera de una capa en una capa: cada una solo tiene sentido si la anterior está descartada. El panel derecho relaciona síntomas típicos con la capa donde suele estar la causa (se ilumina al llegar a ella).',
    steps: ['Conectividad y versión', 'Modo y capacidad', 'Proceso, reinicio e inyección', 'ActiveGate / extensión', 'Ingestión y retención', 'Consulta, timeframe y permisos'],
    stepMs: 2400,
    render: ({ step }) => <Troubleshooting step={step} />,
  },
  'deep-infrastructure-connectors': {
    kind: 'animation',
    title: 'Qué componente interviene en cada escenario',
    caption: 'En los escenarios remotos (base de datos, Kubernetes API, vSphere) es un ActiveGate el que llega al origen; en los workloads de Kubernetes, OneAgent vía Dynatrace Operator observa desde dentro. «Database monitoring» no es solo instalar OneAgent, y Enhanced Object Visibility requiere ActiveGate 1.327+.',
    render: () => <InfraConnectors />,
  },
}
