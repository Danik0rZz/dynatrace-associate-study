import { Arrow, Box, C, Chip, Cylinder, Doc, Mark, Particle, Person, Svg, T, cx, dim, show, toneColors } from './kit'
import type { VisualRegistry } from './types'

/* ——— 1. Contrato de una capacidad: escalera de 6 peldaños ——— */
const stairs = [
  { name: 'Existe', sub: ['aparece en Hub', 'o documentación'] },
  { name: 'Habilitada', sub: ['la capability', 'está activa'] },
  { name: 'Configurada', sub: ['requisitos y', 'credenciales'] },
  { name: 'Produce', sub: ['llega entidad', 'o señal'] },
  { name: 'Visible', sub: ['query, timeframe', 'y permisos'] },
  { name: 'Actúa', sub: ['usuario o actor', 'ejecuta el cambio'] },
]

function CapabilityContract({ step }: { step: number }) {
  const base = 290
  const rise = 36
  return (
    <Svg h={330} label="Escalera de seis peldaños: existe, habilitada, configurada, produce, visible y actúa">
      {/* Mensaje clave */}
      <Chip x={104} y={24} text="Descubrir ≠ poder usar" tone="amber" solid w={168} size={11.5} />
      <T x={20} y={56} size={11} anchor="start" tone="muted">Hub puede mostrar la app; la tenant puede necesitar</T>
      <T x={20} y={72} size={11} anchor="start" tone="muted">permisos, ActiveGate, red, credenciales o suscripción.</T>
      {stairs.map((stair, i) => {
        const x = 20 + i * 122
        const top = base - (i + 1) * rise
        const state = i === step ? 'active' : i < step ? 'done' : 'todo'
        const tone = toneColors.teal
        return (
          <g key={stair.name} className={dim(state !== 'todo')}>
            <rect x={x} y={top} width={116} height={(i + 1) * rise} rx={6} fill={state === 'active' ? tone.solid : state === 'done' ? tone.fill : '#fff'} stroke={state === 'todo' ? '#b9c7c5' : tone.stroke} strokeWidth={1.5} />
            <circle cx={x + 14} cy={top + 17} r={8} fill={state === 'active' ? '#fff' : C.teal} />
            <T x={x + 14} y={top + 20.5} size={10} weight={800} tone={state === 'active' ? 'teal' : 'white'}>{i + 1}</T>
            <T x={x + 68} y={top + 22} size={12.5} weight={800} tone={state === 'active' ? 'white' : 'navy'}>{stair.name}</T>
            <T x={x + 58} y={top - 22} size={10} tone="muted">{stair.sub[0]}</T>
            <T x={x + 58} y={top - 8} size={10} tone="muted">{stair.sub[1]}</T>
            {state === 'active' && <rect x={x - 3} y={top - 3} width={122} height={(i + 1) * rise + 6} rx={8} fill="none" stroke={C.teal} strokeWidth={2} className="sv-glow" />}
          </g>
        )
      })}
      {/* Descubrir frente a poder usar */}
      <path d={`M22,${base + 8} L22,${base + 14} L134,${base + 14} L134,${base + 8}`} fill="none" stroke={C.amber} strokeWidth={1.6} />
      <T x={78} y={base + 32} size={11} weight={800} tone="amber">descubrir</T>
      <path d={`M144,${base + 8} L144,${base + 14} L744,${base + 14} L744,${base + 8}`} fill="none" stroke={C.teal} strokeWidth={1.6} />
      <T x={444} y={base + 32} size={11} weight={800} tone="teal">poder usar: cada peldaño se comprueba en orden</T>
    </Svg>
  )
}

/* ——— 2. Permisos y contexto: mismos datos, dos usuarios ——— */
const gates = [
  ['Identidad', 'y grupo'],
  ['Permiso de', 'aplicación'],
  ['Storage', 'o entidad'],
  ['WHERE o', 'segment'],
  ['Escritura', 'o ejecución'],
]
const gateX = [190, 295, 400, 505, 610]
const segCenter = [137, 242, 347, 452, 557]
const laneA = [8, 8, 8, 8, 8]
const laneB = [8, 8, 8, 5, 3]

function Dots({ cxp, cy, count, tone }: { cxp: number; cy: number; count: number; tone: 'teal' | 'navy' }) {
  return (
    <g>
      {Array.from({ length: 8 }, (_, j) => (
        <circle key={j} cx={cxp - 21 + (j % 4) * 14} cy={cy - 7 + Math.floor(j / 4) * 14} r={4.5} fill={toneColors[tone].solid} className={show(j < count)} />
      ))}
    </g>
  )
}

function Permissions({ step }: { step: number }) {
  const lanes = [
    { y: 128, name: 'Usuario A', counts: laneA, tone: 'teal' as const, result: '8 registros', canEdit: true },
    { y: 218, name: 'Usuario B', counts: laneB, tone: 'navy' as const, result: '3 registros', canEdit: false },
  ]
  return (
    <Svg h={300} label="Capas de permisos: dos usuarios consultan los mismos datos y obtienen resultados distintos">
      {/* Fuente común */}
      <Cylinder x={14} y={112} w={70} h={120} tone="navy" label="Datos" />
      <T x={49} y={252} size={10.5} tone="muted" weight={700}>mismos datos</T>
      {/* Puertas */}
      {gates.map((gate, i) => (
        <g key={gate[0]} className={dim(i <= step)}>
          <T x={gateX[i]} y={26} size={10.5} weight={800} tone="navy">{`${i + 1}. ${gate[0]}`}</T>
          <T x={gateX[i]} y={41} size={10.5} weight={800} tone="navy">{gate[1]}</T>
          <rect x={gateX[i] - 4} y={56} width={8} height={196} rx={4} fill={i === step ? C.teal : C.navy} />
        </g>
      ))}
      {/* Carriles */}
      {lanes.map((lane) => (
        <g key={lane.name}>
          <line x1={84} x2={628} y1={lane.y} y2={lane.y} stroke={C.line} strokeWidth={2} />
          <Chip x={137} y={lane.y - 28} text={lane.name} tone={lane.tone} w={80} size={10.5} />
          {segCenter.map((c, k) => (
            <g key={c} className={k === 0 || k - 1 <= step ? 'sv-in' : 'sv-dim'}>
              <Dots cxp={c} cy={lane.y} count={k === 0 || k - 1 <= step ? lane.counts[k] : lane.counts[0]} tone={lane.tone} />
            </g>
          ))}
        </g>
      ))}
      {/* Recortes del usuario B */}
      <g className={show(step >= 2)}>
        <rect x={392} y={206} width={16} height={24} rx={3} fill={C.coral} />
        <T x={400} y={264} size={10} tone="coral" weight={700}>sin acceso a</T>
        <T x={400} y={277} size={10} tone="coral" weight={700}>parte del storage</T>
      </g>
      <g className={show(step >= 3)}>
        <rect x={497} y={206} width={16} height={24} rx={3} fill={C.coral} />
        <T x={505} y={264} size={10} tone="coral" weight={700}>WHERE por</T>
        <T x={505} y={277} size={10} tone="coral" weight={700}>registro</T>
      </g>
      {/* Resultados */}
      {lanes.map((lane) => (
        <g key={`r-${lane.name}`} className={show(step >= 4)}>
          <Box x={634} y={lane.y - 30} w={112} h={60} label={lane.result} sub={lane.canEdit ? 'lee y edita' : 'solo lectura'} tone={lane.canEdit ? 'teal' : 'navy'} size={12.5} />
          <Mark x={738} y={lane.y - 28} ok={lane.canEdit} r={9} />
        </g>
      ))}
      <T x={380} y={294} size={10.5} tone="muted" className={show(step >= 4)}>Un resultado vacío o parcial no prueba que no haya datos: revisa permisos, WHERE por registro y segments.</T>
    </Svg>
  )
}

/* ——— 3. Grail: record types, buckets, DQL, permisos y timeframe ——— */
const records = ['logs', 'bizevents', 'dt.davis.problems', 'métricas']
const dqlLines = ['fetch logs', 'fetch bizevents', 'fetch dt.davis.problems', 'timeseries …', 'fetch dt.system.buckets']

function GrailRecords({ step }: { step: number }) {
  return (
    <Svg h={380} label="Grail: record types, buckets con retención y gobierno, DQL que lee, permisos que filtran y timeframe frente a retención">
      {/* Record types */}
      <g className={dim(step >= 0)}>
        <T x={20} y={22} size={10} tone="muted" anchor="start" weight={800}>RECORD TYPES</T>
        {records.map((r, i) => (
          <Chip key={r} x={95} y={56 + i * 44} text={r} tone="violet" solid={step === 0} w={150} mono size={10.5} />
        ))}
        <T x={95} y={238} size={10} tone="muted">cada uno: campos, tipos,</T>
        <T x={95} y={251} size={10} tone="muted">acceso e ingestión propios</T>
      </g>
      {/* Buckets */}
      <g className={dim(step >= 1)}>
        <T x={210} y={22} size={10} tone="muted" anchor="start" weight={800}>BUCKETS</T>
        {records.map((_, i) => (
          <Arrow key={i} from={[172, 56 + i * 44]} to={[206, i < 2 ? 66 + i * 64 : 194]} tone="neutral" />
        ))}
        {['A', 'B', 'C'].map((b, i) => (
          <g key={b}>
            <rect x={210} y={42 + i * 64} width={196} height={50} rx={8} fill={step === 1 ? toneColors.navy.fill : '#fff'} stroke={C.navy} strokeWidth={1.5} />
            <T x={224} y={63 + i * 64} size={12} weight={800} anchor="start" tone="navy" mono>{`bucket ${b}`}</T>
            <T x={224} y={80 + i * 64} size={10.5} anchor="start" tone="muted">retención + acceso (gobierno)</T>
          </g>
        ))}
        <T x={308} y={238} size={10} tone="amber" weight={700} className={show(step === 1)}>dt.system.buckets audita buckets,</T>
        <T x={308} y={251} size={10} tone="amber" weight={700} className={show(step === 1)}>record types y días de retención</T>
      </g>
      {/* DQL */}
      <g className={dim(step >= 2 || step === 1)}>
        <T x={440} y={22} size={10} tone="muted" anchor="start" weight={800}>DQL LEE Y TRANSFORMA</T>
        {[0, 1, 2].map((i) => <Arrow key={i} from={[408, 67 + i * 64]} to={[436, 67 + i * 64]} tone="navy" />)}
        <rect x={440} y={42} width={164} height={178} rx={10} fill={C.navy} />
        {dqlLines.map((line, i) => {
          const hl = (step === 1 && i === 4) || (step === 2 && i < 4)
          return (
            <g key={line}>
              <rect x={446} y={52 + i * 32} width={152} height={24} rx={4} fill={hl ? (i === 4 ? 'rgba(201,139,18,.5)' : 'rgba(17,168,153,.35)') : 'transparent'} />
              <T x={452} y={68 + i * 32} size={9.5} mono tone="white" anchor="start">{line}</T>
            </g>
          )
        })}
      </g>
      {/* Permisos */}
      <g className={dim(step >= 3)}>
        <T x={690} y={22} size={10} tone="muted" weight={800}>PERMISOS</T>
        <Arrow from={[606, 131]} to={[620, 131]} tone="navy" />
        <rect x={624} y={42} width={10} height={178} rx={5} fill={C.violet} />
        <T x={629} y={236} size={10} tone="violet" weight={700}>ABAC / políticas</T>
        <Arrow from={[636, 86]} to={[646, 86]} tone="violet" />
        <Arrow from={[636, 176]} to={[646, 176]} tone="violet" />
        <Box x={650} y={52} w={96} h={68} label="Identidad A" sub="más records" tone="teal" size={11.5} />
        <Box x={650} y={142} w={96} h={68} label="Identidad B" sub="menos records" tone="navy" size={11.5} />
      </g>
      {/* Almacenado ≠ consultable ≠ modificable */}
      <g className={show(step === 3)}>
        <Chip x={200} y={274} text="está almacenado" tone="navy" w={150} />
        <T x={292} y={278} size={13} weight={800} tone="muted">≠</T>
        <Chip x={384} y={274} text="puedo consultarlo" tone="teal" w={160} />
        <T x={481} y={278} size={13} weight={800} tone="muted">≠</T>
        <Chip x={578} y={274} text="puedo modificarlo" tone="coral" w={160} />
      </g>
      {/* Timeframe frente a retención */}
      <g className={dim(step === 4)}>
        <T x={20} y={302} size={10} tone="muted" anchor="start" weight={800}>TIMEFRAME ≠ RETENCIÓN</T>
        <rect x={20} y={310} width={720} height={22} rx={5} fill={toneColors.amber.fill} stroke={C.amber} strokeWidth={1.3} />
        <T x={30} y={325} size={10.5} anchor="start" tone="amber" weight={700}>Retención: cuánto tiempo conserva los records el bucket (política)</T>
        <rect x={596} y={340} width={140} height={22} rx={5} fill={toneColors.teal.fill} stroke={C.teal} strokeWidth={1.5} className={cx(step === 4 && 'sv-glow')} />
        <rect x={596} y={340} width={140} height={22} rx={5} fill="none" stroke={C.teal} strokeWidth={1.5} />
        <T x={666} y={355} size={10.5} weight={800} tone="teal">Timeframe</T>
        <T x={586} y={355} size={10.5} anchor="end" tone="muted">ventana que analiza la consulta, no política de retención</T>
        <T x={740} y={376} size={9.5} anchor="end" tone="muted">ahora</T>
      </g>
    </Svg>
  )
}

/* ——— 4. Dynatrace Hub: ciclo de una capacidad ——— */
const hubStates = [
  { label: 'Descubrir', sub: 'ficha en Hub' },
  { label: 'Instalar', sub: 'desplegar' },
  { label: 'Autorizar', sub: 'permisos IAM' },
  { label: 'Producir', sub: 'datos' },
]
const hubDetail = [
  { title: 'Ver la ficha no autoriza a desplegar', code: '', tone: 'amber' as const },
  { title: 'Permiso IAM obligatorio para instalar', code: 'app-engine:apps:install', tone: 'teal' as const },
  { title: 'Technical info: permisos requeridos', code: 'app-engine:*  ·  storage:*', tone: 'violet' as const },
  { title: 'Contents: artefactos listos para usar', code: 'Dashboards · Notebooks · Workflows', tone: 'teal' as const },
  { title: 'Permiso IAM obligatorio para retirar', code: 'app-engine:apps:delete', tone: 'coral' as const },
]

function HubLifecycle({ step }: { step: number }) {
  const tabActive = (tab: number) => (step === 0 ? true : tab === 2 ? step === 2 : tab === 1 ? step === 3 : false)
  const detail = hubDetail[step]
  return (
    <Svg h={320} label="Ciclo de una app en Dynatrace Hub: descubrir, instalar, autorizar, producir datos y retirar">
      {/* Ficha de Hub */}
      <rect x={20} y={14} width={280} height={292} rx={12} fill="#fff" stroke={C.line} strokeWidth={1.5} />
      <rect x={20} y={14} width={280} height={40} rx={12} fill={C.navy} />
      <rect x={20} y={40} width={280} height={14} fill={C.navy} />
      <T x={34} y={39} size={12} weight={800} tone="white" anchor="start">Dynatrace Hub · ficha</T>
      <g className={dim(step === 1 || step === 0)}>
        <rect x={222} y={24} width={68} height={22} rx={11} fill={step === 1 ? C.teal : 'rgba(255,255,255,.18)'} stroke="#fff" strokeOpacity={0.5} />
        <T x={256} y={39} size={11} weight={800} tone="white">Install</T>
      </g>
      {/* Product information */}
      <g className={dim(tabActive(0))}>
        <rect x={32} y={64} width={256} height={66} rx={8} fill={C.paperSoft} stroke={C.line} />
        <T x={44} y={84} size={12} weight={800} anchor="start" tone="navy" mono>Product information</T>
        <T x={44} y={104} size={10.5} anchor="start" tone="muted">descripción, arquitectura</T>
        <T x={44} y={119} size={10.5} anchor="start" tone="muted">y casos de uso</T>
      </g>
      {/* Contents */}
      <g className={dim(tabActive(1))}>
        <rect x={32} y={138} width={256} height={74} rx={8} fill={step === 3 ? toneColors.teal.fill : C.paperSoft} stroke={step === 3 ? C.teal : C.line} />
        <T x={44} y={158} size={12} weight={800} anchor="start" tone="navy" mono>Contents</T>
        {['Dashboards', 'Notebooks', 'Workflows'].map((a, i) => (
          <Chip key={a} x={80 + i * 82} y={188} text={a} tone="teal" w={76} size={10} />
        ))}
      </g>
      {/* Technical info */}
      <g className={dim(tabActive(2))}>
        <rect x={32} y={220} width={256} height={76} rx={8} fill={step === 2 ? toneColors.violet.fill : C.paperSoft} stroke={step === 2 ? C.violet : C.line} />
        <T x={44} y={240} size={12} weight={800} anchor="start" tone="navy" mono>Technical information</T>
        <Chip x={96} y={264} text="app-engine:*" tone="violet" w={110} mono size={10} />
        <Chip x={210} y={264} text="storage:*" tone="violet" w={96} mono size={10} />
        <T x={44} y={288} size={10} anchor="start" tone="muted">+ requisitos de infraestructura</T>
      </g>

      {/* Estados del ciclo */}
      {hubStates.map((s, i) => {
        const x = 330 + i * 105
        const state = i === step ? 'active' : i < step || step === 4 ? 'done' : 'todo'
        return (
          <g key={s.label} className={dim(state !== 'todo')}>
            <Box x={x} y={30} w={95} h={50} label={s.label} sub={s.sub} tone={state === 'active' ? 'teal' : 'navy'} solid={state === 'active'} size={12.5} />
            {i < hubStates.length - 1 && <Arrow from={[x + 96, 55]} to={[x + 104, 55]} tone="navy" />}
          </g>
        )
      })}
      <Particle path={`M${330 + Math.min(step, 3) * 105 + 47},86 L${330 + Math.min(step, 3) * 105 + 47},112`} dur={1.4} tone="teal" r={4} />
      {/* Detalle del paso */}
      <rect x={330} y={116} width={320} height={92} rx={10} fill={toneColors[detail.tone].fill} stroke={toneColors[detail.tone].stroke} strokeWidth={1.5} />
      <T x={490} y={146} size={12.5} weight={800} tone={detail.tone}>{detail.title}</T>
      {detail.code ? (
        <g>
          <rect x={345} y={160} width={290} height={32} rx={6} fill="#fff" stroke={toneColors[detail.tone].stroke} />
          <T x={490} y={181} size={12} weight={800} mono tone={detail.tone}>{detail.code}</T>
        </g>
      ) : (
        <T x={490} y={180} size={11} tone="muted">Aquí no se configuran credenciales.</T>
      )}
      {/* Retirar */}
      <g className={dim(step === 4)}>
        <Arrow from={[692, 88]} to={[692, 222]} tone="coral" dashed />
        <Box x={430} y={226} w={266} h={50} label="Retirar la app" sub="requiere app-engine:apps:delete" tone="coral" solid={step === 4} size={12.5} />
        <T x={563} y={300} size={10.5} tone="muted">editar un dashboard no permite borrar la app</T>
      </g>
    </Svg>
  )
}

/* ——— 5. Documents: ownership y sharing controls ——— */
function DocumentsPermissions({ step }: { step: number }) {
  const moved = step >= 4
  return (
    <Svg h={345} label="Documento con owner, permisos Can view y Can edit, Allow editors to share, visibilidad en el environment y Transfer ownership">
      {/* Environment */}
      <rect x={14} y={14} width={612} height={286} rx={14} fill="#f8fbfa" stroke={C.slate} strokeWidth={1.3} strokeDasharray="6 5" />
      <T x={28} y={34} size={10} tone="muted" anchor="start" weight={800}>TU ENVIRONMENT (TENANT)</T>
      {/* Documento */}
      <Doc x={285} y={100} w={62} h={78} tone="navy" />
      <T x={316} y={197} size={10.5} weight={700} tone="navy">Dashboard · Notebook · Launchpad</T>
      {/* Owner original */}
      <Person x={150} y={150} tone="amber" scale={1.2} />
      <T x={150} y={178} size={10.5} tone="muted">creador</T>
      <Arrow from={[172, 140]} to={[280, 140]} tone="amber" />
      {/* Viewer */}
      <g className={dim(step >= 1)}>
        <Arrow from={[350, 118]} to={[462, 68]} tone="teal" dashed />
        <Person x={480} y={72} tone="teal" />
        <Chip x={560} y={64} text="Can view" tone="teal" w={84} size={10.5} />
        <T x={560} y={92} size={10} tone="muted">solo lectura</T>
      </g>
      {/* Editor */}
      <g className={dim(step >= 1)}>
        <Arrow from={[350, 150]} to={[462, 150]} tone="teal" />
        <Person x={480} y={158} tone="teal" />
        <Chip x={560} y={150} text="Can edit" tone="teal" solid w={84} size={10.5} />
        <T x={560} y={178} size={10} tone="muted">layout y tiles</T>
      </g>
      {/* Allow editors to share */}
      <g className={show(step === 2)}>
        <Arrow d="M488,178 C500,215 540,230 552,246" tone="violet" dashed />
        <Person x={566} y={268} tone="violet" />
        <T x={566} y={292} size={10} tone="muted">invitado</T>
        <Chip x={430} y={236} text="Allow editors to share" tone="violet" solid={step === 2} w={160} size={10.5} />
      </g>
      {/* Visible to anyone in your environment */}
      <g className={show(step === 3)}>
        <T x={30} y={236} size={10.5} tone="teal" weight={800} anchor="start">Visible to anyone in your environment</T>
        {[0, 1, 2, 3, 4].map((i) => (
          <Person key={i} x={48 + i * 46} y={280} tone="teal" scale={0.85} />
        ))}
        <Mark x={640} y={150} ok={false} r={10} />
        <Person x={700} y={158} tone="neutral" />
        <T x={700} y={186} size={10.5} tone="coral" weight={700}>Internet</T>
        <T x={700} y={200} size={10} tone="muted">sin exposición</T>
      </g>
      {/* Transfer ownership */}
      <g className={show(step === 4)}>
        <Arrow d="M150,190 C220,240 400,240 444,200" tone="amber" dashed />
        <T x={300} y={254} size={10.5} tone="amber" weight={800}>Transfer ownership: el owner pasa a ser otro usuario</T>
      </g>
      {/* Insignia de owner (se mueve al transferir) */}
      <g style={{ transform: moved ? 'translate(330px, 80px)' : 'translate(0px, 0px)' }}>
        <Chip x={150} y={112} text="Owner" tone="amber" solid w={62} size={10.5} />
      </g>
      {/* Capa de datos */}
      <rect x={14} y={308} width={732} height={30} rx={8} fill={toneColors.navy.fill} stroke={C.navy} strokeWidth={1.2} />
      <T x={380} y={327} size={11} tone="navy" weight={700}>Otra capa: los permisos de app y de Grail/storage siguen filtrando los datos de sus queries</T>
    </Svg>
  )
}

/* ——— 6. Permisos en Grail: bucket ∩ tabla ∩ WHERE ——— */
const gpBuckets = [
  { name: 'default_logs', x: 292, allowed: true },
  { name: 'common_logs', x: 402, allowed: true },
  { name: 'team_b_logs', x: 512, allowed: false },
]
const gpPolicies = [
  { from: 1, lines: ['ALLOW storage:buckets:read', 'WHERE bucket-name MATCH', '("default_*", "common_logs")'], tone: 'navy' as const },
  { from: 2, lines: ['ALLOW storage:logs:read'], tone: 'teal' as const },
]
const gpResult = [
  { big: '✗', text: ['Sin permisos:', 'no se lee nada'], tone: 'coral' as const },
  { big: '✗', text: ['Falta el permiso', 'de tabla'], tone: 'coral' as const },
  { big: '12', text: ['registros de los', 'buckets permitidos'], tone: 'teal' as const },
  { big: '6', text: ['solo namespace1', 'en esos buckets'], tone: 'teal' as const },
  { big: '12', text: ['el WHERE deja de', 'filtrar: se suman'], tone: 'amber' as const },
]

function GrailPermissions({ step }: { step: number }) {
  const tableOk = step >= 2
  const whereOn = step === 3
  const result = gpResult[step]
  return (
    <Svg h={340} label="Permisos en Grail: el resultado es la intersección del permiso de bucket, el de tabla y la condición WHERE">
      {/* Panel de políticas */}
      <rect x={14} y={20} width={252} height={262} rx={10} fill={C.paperSoft} stroke={C.line} />
      <T x={30} y={44} size={12} weight={800} tone="navy" anchor="start">Políticas del usuario</T>
      {step === 0 && <T x={30} y={74} size={11} tone="muted" anchor="start">(ninguna política asignada)</T>}
      {gpPolicies.map((policy, i) => (
        <g key={i} className={show(step >= policy.from)}>
          {policy.lines.map((line, j) => (
            <T key={j} x={30} y={74 + i * 74 + j * 17} size={10.5} mono weight={j === 0 ? 700 : 500} tone={policy.tone} anchor="start">{line}</T>
          ))}
        </g>
      ))}
      <g className={show(step >= 3)}>
        <T x={30} y={165} size={10.5} mono tone={step === 4 ? 'muted' : 'teal'} anchor="start">WHERE k8s.namespace.name</T>
        <T x={30} y={182} size={10.5} mono tone={step === 4 ? 'muted' : 'teal'} anchor="start">= "namespace1"</T>
        <line x1={28} y1={161} x2={190} y2={178} stroke={C.coral} strokeWidth={2} className={show(step === 4)} />
      </g>
      <g className={show(step === 4)}>
        <rect x={24} y={204} width={232} height={64} rx={8} fill={C.amberTint} stroke={C.amber} />
        <T x={36} y={224} size={10.5} weight={800} tone="amber" anchor="start">Otra política del usuario:</T>
        <T x={36} y={242} size={10.5} mono weight={700} tone="amber" anchor="start">ALLOW storage:logs:read</T>
        <T x={36} y={259} size={10.5} tone="amber" anchor="start">sin condición</T>
      </g>

      {/* Tabla logs que abarca los buckets */}
      <rect x={282} y={20} width={330} height={30} rx={8} fill={tableOk ? C.tealTint : '#fff'} stroke={tableOk ? C.teal : '#b9c7c5'} strokeWidth={1.5} />
      <T x={447} y={40} size={12} weight={800} tone={tableOk ? 'teal' : 'muted'}>tabla logs (abarca todos sus buckets)</T>

      {/* Buckets con registros de dos namespaces */}
      {gpBuckets.map((bucket) => {
        const bucketOk = step >= 1 && bucket.allowed
        return (
          <g key={bucket.name}>
            <g className={dim(bucketOk)}>
              <Cylinder x={bucket.x} y={70} w={90} h={170} tone={bucketOk ? 'teal' : 'neutral'} />
            </g>
            {Array.from({ length: 6 }, (_, j) => {
              const ns1 = j % 2 === 0
              const visible = bucketOk && tableOk && (ns1 || !whereOn)
              return (
                <circle key={j} cx={bucket.x + 30 + (j % 2) * 30} cy={110 + Math.floor(j / 2) * 38} r={9}
                  fill={ns1 ? C.teal : C.navy} className={dim(visible)} />
              )
            })}
            <T x={bucket.x + 45} y={262} size={10.5} weight={700} mono tone={bucketOk ? 'teal' : 'muted'}>{bucket.name}</T>
            {step >= 1 && <Mark x={bucket.x + 45} y={284} ok={bucket.allowed} r={9} />}
          </g>
        )
      })}

      {/* Resultado */}
      <Arrow d="M612,155 L640,155" tone={result.tone} />
      <rect x={644} y={95} width={102} height={120} rx={10} fill={toneColors[result.tone].fill} stroke={toneColors[result.tone].stroke} strokeWidth={1.5} />
      <T x={695} y={122} size={11} weight={800} tone={result.tone}>fetch logs</T>
      <T x={695} y={160} size={26} weight={800} tone={result.tone}>{result.big}</T>
      <T x={695} y={184} size={10} tone={result.tone}>{result.text[0]}</T>
      <T x={695} y={199} size={10} tone={result.tone}>{result.text[1]}</T>

      {/* Leyenda */}
      <circle cx={300} cy={318} r={6} fill={C.teal} />
      <T x={312} y={322} size={10.5} anchor="start" tone="muted">registro de namespace1</T>
      <circle cx={470} cy={318} r={6} fill={C.navy} />
      <T x={482} y={322} size={10.5} anchor="start" tone="muted">registro de namespace2</T>
    </Svg>
  )
}

export const platformVisuals: VisualRegistry = {
  'platform-contract': {
    kind: 'animation',
    title: 'Descubrir una capacidad no es poder usarla',
    caption: 'Sube peldaño a peldaño: que algo aparezca en Hub solo demuestra que existe. Ante una pantalla vacía, comprueba si la capacidad está habilitada, si produce datos y si tu identidad puede verlos; si una acción falla, revisa el permiso de escritura o ejecución.',
    steps: ['Existe', 'Habilitada', 'Configurada', 'Produce', 'Visible', 'Actúa'],
    stepMs: 2200,
    render: ({ step }) => <CapabilityContract step={step} />,
  },
  permissions: {
    kind: 'animation',
    title: 'Mismos datos, resultados distintos según identidad',
    caption: 'Cada capa de permiso recorta lo que llega al usuario. A y B consultan los mismos datos, pero B no tiene acceso a parte del storage, una condición WHERE por registro (por ejemplo sobre dt.security_context) le deja ver solo una parte y solo puede leer. Ver una configuración no implica poder modificarla.',
    steps: ['Identidad y grupo', 'Permiso de aplicación', 'Permiso de storage o entidad', 'WHERE por registro, segment o filtro', 'Escritura o ejecución'],
    stepMs: 2600,
    render: ({ step }) => <Permissions step={step} />,
  },
  'deep-grail-records': {
    kind: 'animation',
    title: 'Grail comparte almacenamiento, no contratos',
    caption: 'Cada record type conserva su esquema; los buckets fijan retención y gobierno (auditables con dt.system.buckets); DQL lee y transforma, y los permisos deciden qué ve cada identidad. El timeframe elige la ventana analizada; la retención la decide el bucket.',
    steps: ['Record types con contratos propios', 'Buckets: retención y gobierno', 'DQL lee y transforma', 'Permisos: cada identidad ve lo suyo', 'Timeframe ≠ retención'],
    stepMs: 3000,
    render: ({ step }) => <GrailRecords step={step} />,
  },
  'deep-hub-lifecycle': {
    kind: 'animation',
    title: 'De la ficha en Hub a los datos, con permisos en cada paso',
    caption: 'Hub describe la app en Product information, Technical information, Contents y Release notes, pero verla no autoriza nada: instalar exige app-engine:apps:install, la app necesita los permisos que lista Technical information y retirarla exige app-engine:apps:delete.',
    steps: ['Descubrir: Product info, Tech info, Contents', 'Instalar: app-engine:apps:install', 'Autorizar: permisos requeridos', 'Producir datos y usar Contents', 'Retirar: app-engine:apps:delete'],
    stepMs: 3000,
    render: ({ step }) => <HubLifecycle step={step} />,
  },
  'deep-documents-permissions': {
    kind: 'animation',
    title: 'Quién puede ver, editar y compartir un documento',
    caption: 'Quien crea el documento es su owner y reparte Can view o Can edit. Allow editors to share delega el compartir; Visible to anyone in your environment abre la lectura a todo el tenant sin publicarlo en internet; Transfer ownership cambia el owner. Los permisos sobre los datos son otra capa.',
    steps: ['Quien crea el documento es owner', 'Can view / Can edit', 'Allow editors to share', 'Visible to anyone in your environment', 'Transfer ownership'],
    stepMs: 2800,
    render: ({ step }) => <DocumentsPermissions step={step} />,
  },
  'sup-grail-permissions': {
    kind: 'animation',
    title: 'Dos llaves para leer: bucket y tabla',
    caption: 'Fíjate en qué registros quedan encendidos: hace falta storage:buckets:read sobre el bucket y el permiso de la tabla; el WHERE recorta registros dentro de esa intersección. Si otra política concede el permiso de tabla sin condición, el WHERE deja de tener efecto.',
    steps: ['Sin permisos: no se lee nada', 'Solo bucket: falta la tabla', 'Bucket + tabla: buckets permitidos', 'WHERE: solo namespace1', 'Política sin condición anula el WHERE'],
    stepMs: 3000,
    render: ({ step }) => <GrailPermissions step={step} />,
  },
}
