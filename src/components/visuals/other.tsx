import { Arrow, Box, C, Chip, Mark, Particle, Person, Svg, T, dim, show, toneColors, type Tone } from './kit'
import type { VisualRegistry } from './types'

/* ——— 1. Smartscape Classic: 5 tiers ——— */
type Layer = { name: string; entity: string; rel: string; nodes: { id: string; label: string; x: number }[] }
const layers: Layer[] = [
  { name: 'Data centers', entity: 'ubicación de los hosts', rel: 'ciudad, AZ de AWS o región de Azure', nodes: [{ id: 'dc', label: 'eu-west-1a', x: 365 }] },
  { name: 'Hosts', entity: 'dt.entity.host', rel: 'máquinas físicas o virtuales', nodes: [{ id: 'h1', label: 'host-a', x: 300 }, { id: 'h2', label: 'host-b', x: 430 }] },
  { name: 'Processes', entity: 'dt.entity.process_group_instance', rel: 'procesos que corren en hosts', nodes: [{ id: 'p1', label: 'java-app', x: 262 }, { id: 'p2', label: 'node-api', x: 365 }, { id: 'p3', label: 'postgres', x: 468 }] },
  { name: 'Services', entity: 'dt.entity.service', rel: 'servicios que corren en procesos', nodes: [{ id: 's1', label: 'checkout', x: 262 }, { id: 's2', label: 'payment', x: 365 }, { id: 's3', label: 'orders-db', x: 468 }] },
  { name: 'Applications', entity: 'dt.entity.application', rel: 'experiencia de usuario', nodes: [{ id: 'a1', label: 'web shop', x: 365 }] },
]
const nodeXY = (layer: number, x: number) => ({ x, y: 20 + (4 - layer) * 66 + 31 })
// Dependencias verticales full-stack entre tiers (de arriba abajo).
const vEdges: { from: [number, number]; to: [number, number] }[] = [
  { from: [4, 365], to: [3, 262] },
  { from: [3, 262], to: [2, 262] },
  { from: [3, 365], to: [2, 365] },
  { from: [3, 468], to: [2, 468] },
  { from: [2, 262], to: [1, 300] },
  { from: [2, 365], to: [1, 300] },
  { from: [2, 468], to: [1, 430] },
  { from: [1, 300], to: [0, 365] },
  { from: [1, 430], to: [0, 365] },
]

function SmartscapeGraph({ step }: { step: number }) {
  return (
    <Svg h={380} label="Smartscape Classic en cinco tiers: Applications, Services, Processes, Hosts y Data centers, con dependencias verticales full-stack y llamadas horizontales">
      {layers.map((layer, i) => {
        const y = 20 + (4 - i) * 66
        const built = step >= i
        const current = step === i
        return (
          <g key={layer.name} className={dim(built)}>
            <rect x={14} y={y} width={732} height={58} rx={8} fill={current ? C.violetTint : C.paperSoft} stroke={current ? C.violet : C.line} strokeWidth={1.4} />
            <T x={26} y={y + 24} size={12} anchor="start" weight={800} tone={current ? 'violet' : 'navy'}>{`Tier · ${layer.name}`}</T>
            <T x={26} y={y + 42} size={10} anchor="start" mono tone="muted">{layer.entity}</T>
            <T x={738} y={y + 34} size={10} anchor="end" tone="violet">{layer.rel}</T>
          </g>
        )
      })}
      {vEdges.map((e, k) => {
        const a = nodeXY(e.from[0], e.from[1])
        const b = nodeXY(e.to[0], e.to[1])
        return (
          <g key={k} className={show(step >= e.from[0])}>
            <Arrow from={[a.x, a.y + 14]} to={[b.x, b.y - 15]} tone="navy" width={1.4} />
          </g>
        )
      })}
      {/* Eje vertical: dependencias full-stack */}
      <T x={252} y={224} size={10} anchor="end" tone="navy" weight={700} className={show(step >= 2)}>vertical: full-stack</T>
      {/* Llamadas horizontales dentro del tier Services */}
      <g className={show(step >= 3)}>
        <Arrow from={[304, 117]} to={[322, 117]} tone="teal" flow width={1.6} />
        <Arrow from={[407, 117]} to={[425, 117]} tone="teal" flow width={1.6} />
        <T x={314} y={99} size={10} tone="teal" weight={700}>calls</T>
      </g>
      {layers.map((layer, i) => layer.nodes.map((n) => {
        const p = nodeXY(i, n.x)
        return (
          <g key={n.id} className={show(step >= i)}>
            <rect x={p.x - 40} y={p.y - 14} width={80} height={28} rx={14} fill={step === i ? C.violet : '#fff'} stroke={C.violet} strokeWidth={1.5} />
            <T x={p.x} y={p.y + 4} size={10.5} weight={700} tone={step === i ? 'white' : 'violet'}>{n.label}</T>
          </g>
        )
      }))}
      <g className={show(step >= 4)}>
        <Chip x={380} y={362} text="Smartscape Classic · el Smartscape actual es un grafo sin tiers" tone="amber" w={470} size={10} />
      </g>
    </Svg>
  )
}

/* ——— 2. Niveles de entidad: zoom ——— */
const entityLevels = [
  { name: 'Application', what: 'Experiencia / frontend', q: '¿Qué ve el usuario?' },
  { name: 'Service', what: 'Función / endpoint', q: '¿Qué operación está lenta?' },
  { name: 'Process group instance', what: 'Ejecución concreta', q: '¿Qué instancia tiene el error?' },
  { name: 'Host', what: 'Infraestructura', q: '¿Qué recurso está saturado?' },
]

function EntityLevels({ step }: { step: number }) {
  return (
    <Svg h={320} label="Niveles de entidad: Application, Service, Process group instance y Host, cada uno con su pregunta">
      {entityLevels.map((lvl, i) => {
        const y = 16 + i * 74
        const active = i === step
        return (
          <g key={lvl.name} className={dim(active)}>
            <rect x={20} y={y} width={440} height={64} rx={10} fill={active ? C.tealTint : '#fff'} stroke={active ? C.teal : C.line} strokeWidth={1.5} />
            <T x={34} y={y + 26} size={12.5} anchor="start" weight={800} tone={active ? 'teal' : 'navy'}>{lvl.name}</T>
            <T x={34} y={y + 45} size={10.5} anchor="start" tone="muted">{lvl.what}</T>
            {/* Mini ilustración por nivel */}
            {i === 0 && (
              <g>
                <rect x={300} y={y + 12} width={140} height={40} rx={4} fill="#fff" stroke={C.navy} strokeWidth={1.2} />
                <rect x={300} y={y + 12} width={140} height={9} rx={2} fill={C.navy} />
                <rect x={310} y={y + 28} width={70} height={6} rx={3} fill="#c5d3d0" />
                <rect x={310} y={y + 39} width={100} height={6} rx={3} fill="#c5d3d0" />
                <Person x={282} y={y + 44} tone="navy" scale={0.8} />
              </g>
            )}
            {i === 1 && ['/cart', '/checkout', '/search'].map((e, k) => (
              <Chip key={e} x={274 + k * 64} y={y + 32} text={e} tone={k === 1 ? 'coral' : 'navy'} w={60} mono size={9.5} />
            ))}
            {i === 2 && [0, 1, 2].map((k) => (
              <g key={k}>
                <rect x={250 + k * 66} y={y + 17} width={58} height={30} rx={5} fill={k === 2 ? C.coralTint : C.paperSoft} stroke={k === 2 ? C.coral : C.navy} strokeWidth={1.2} />
                <T x={279 + k * 66} y={y + 36} size={10} weight={700} tone={k === 2 ? 'coral' : 'navy'}>{`inst. ${k + 1}`}</T>
              </g>
            ))}
            {i === 3 && ['CPU', 'Mem', 'Disk'].map((r, k) => (
              <g key={r}>
                <T x={268} y={y + 20 + k * 15} size={9.5} anchor="end" tone="muted">{r}</T>
                <rect x={274} y={y + 12 + k * 15} width={150} height={10} rx={3} fill={C.paperSoft} />
                <rect x={274} y={y + 12 + k * 15} width={[138, 70, 55][k]} height={10} rx={3} fill={k === 0 ? C.coral : C.teal} />
              </g>
            ))}
            {i < entityLevels.length - 1 && <Arrow from={[120, y + 64]} to={[120, y + 73]} tone="neutral" head={false} />}
          </g>
        )
      })}
      {/* Lupa que hace zoom al nivel activo */}
      <g style={{ transform: `translateY(${16 + step * 74}px)` }}>
        <circle cx={466} cy={32} r={18} fill="rgba(17,168,153,.12)" stroke={C.teal} strokeWidth={3} />
        <line x1={479} y1={45} x2={492} y2={58} stroke={C.teal} strokeWidth={5} strokeLinecap="round" />
        <path d="M494,32 L512,32" stroke={C.teal} strokeWidth={1.5} strokeDasharray="3 3" />
      </g>
      {/* Tarjeta con la pregunta */}
      <rect x={516} y={60} width={230} height={200} rx={12} fill={C.navy} />
      {entityLevels.map((lvl, i) => (
        <g key={lvl.name} className={show(i === step)}>
          <T x={532} y={90} size={10} anchor="start" weight={800} tone="white" opacity={0.7}>NIVEL</T>
          <T x={532} y={112} size={i === 2 ? 12 : 14} anchor="start" weight={800} tone="white">{lvl.name}</T>
          <T x={532} y={148} size={10} anchor="start" weight={800} tone="white" opacity={0.7}>PREGUNTA QUE RESPONDE</T>
          <T x={532} y={172} size={12.5} anchor="start" weight={700} style={{ fill: '#6fe0d2' }}>{lvl.q}</T>
          <T x={532} y={214} size={10.5} anchor="start" tone="white" opacity={0.8}>Elige el nivel que conecta</T>
          <T x={532} y={230} size={10.5} anchor="start" tone="white" opacity={0.8}>síntoma y acción.</T>
        </g>
      ))}
      <T x={120} y={312} size={10} tone="muted" anchor="middle">usuario ↑ · infraestructura ↓</T>
    </Svg>
  )
}

/* ——— 3. Hub y Extensions 2.0: ciclo de vida ——— */
const hubStages = [
  { label: 'Catalog', sub: 'descubrir' },
  { label: 'Install', sub: 'hacer disponible' },
  { label: 'Configure', sub: 'origen y permisos' },
  { label: 'Run / use', sub: 'permisos de app' },
  { label: 'Observe', sub: 'validar datos' },
]

function HubLifecycle({ step }: { step: number }) {
  const sx = (i: number) => 20 + i * 146
  const pointer = sx(step) + 66
  return (
    <Svg h={300} label="Ciclo de vida de una extensión: Catalog, Install, Configure, Run/use y Observe">
      <Arrow d={`M${sx(4) + 66},62 C${sx(4) + 66},32 ${sx(1) + 66},32 ${sx(1) + 66},60`} tone="violet" dashed width={1.5} />
      <T x={(sx(4) + sx(1)) / 2 + 66} y={24} size={10.5} weight={700} tone="violet">actualizar · revisar release notes</T>
      {hubStages.map((s, i) => (
        <g key={s.label} className={dim(i <= step)}>
          <Box x={sx(i)} y={64} w={132} h={52} label={s.label} sub={s.sub} tone={i === step ? 'teal' : i < step ? 'navy' : 'neutral'} solid={i === step} size={13} />
          {i < hubStages.length - 1 && <Arrow from={[sx(i) + 133, 90]} to={[sx(i) + 145, 90]} tone="teal" />}
        </g>
      ))}
      <path d={`M${pointer - 10},${138} L${pointer},${126} L${pointer + 10},${138} Z`} fill={C.navy} style={{ transition: 'd .6s' }} />
      <rect x={20} y={138} width={720} height={146} rx={10} fill="#fff" stroke={C.navy} strokeWidth={1.5} />
      {/* Contenido por etapa */}
      <g className={show(step === 0)}>
        <T x={40} y={166} size={13} anchor="start" weight={800} tone="navy">Descubrir en Dynatrace Hub</T>
        <T x={40} y={188} size={11} anchor="start" tone="muted">La ficha técnica incluye:</T>
        {['permisos', 'intents', 'contenidos', 'requisitos'].map((c, k) => <Chip key={c} x={80 + k * 100} y={214} text={c} tone="violet" w={88} />)}
        <T x={40} y={256} size={11} anchor="start" tone="navy" weight={700}>Úsala como fuente distinta de la vista de catálogo.</T>
      </g>
      <g className={show(step === 1)}>
        <T x={40} y={166} size={13} anchor="start" weight={800} tone="navy">Hacer disponible la app o extensión</T>
        <T x={40} y={194} size={11.5} anchor="start">El nombre de la app no dice:</T>
        {['qué records crea', 'dónde se almacenan', 'qué puede consultar cada usuario'].map((c, k) => (
          <g key={c}>
            <circle cx={50} cy={216 + k * 20} r={3.5} fill={C.coral} />
            <T x={62} y={220 + k * 20} size={11} anchor="start" tone="muted">{c}</T>
          </g>
        ))}
      </g>
      <g className={show(step === 2)}>
        <T x={40} y={166} size={13} anchor="start" weight={800} tone="navy">Conectar origen y permisos</T>
        <T x={40} y={188} size={11} anchor="start" tone="muted">«Instala desde Hub» no basta si el escenario también requiere:</T>
        {['ActiveGate', 'credenciales', 'endpoint', 'grupo de usuarios', 'capability DPS'].map((c, k) => <Chip key={c} x={96 + k * 134} y={222} text={c} tone="amber" w={124} />)}
      </g>
      <g className={show(step === 3)}>
        <T x={40} y={166} size={13} anchor="start" weight={800} tone="navy">Ejecutar con permisos de aplicación</T>
        <Person x={60} y={228} tone="navy" />
        <Arrow from={[80, 216]} to={[150, 216]} tone="teal" />
        <Box x={156} y={196} w={170} h={40} label="app / extensión" tone="teal" size={12} />
        <Arrow from={[328, 216]} to={[398, 216]} tone="teal" />
        <Box x={404} y={196} w={150} h={40} label="datos permitidos" tone="navy" size={12} />
        <T x={40} y={266} size={11} anchor="start" tone="muted">Lo que cada usuario puede ver depende de sus permisos, no del catálogo.</T>
      </g>
      <g className={show(step === 4)}>
        <T x={40} y={166} size={13} anchor="start" weight={800} tone="navy">Validar lo que realmente se produce</T>
        {['records', 'entities', 'métricas'].map((c, k) => (
          <g key={c}>
            <rect x={40 + k * 180} y={190} width={160} height={46} rx={8} fill={C.tealTint} stroke={C.teal} />
            <Mark x={64 + k * 180} y={213} ok r={11} />
            <T x={84 + k * 180} y={218} size={12.5} anchor="start" weight={750} tone="teal">{c}</T>
          </g>
        ))}
        <T x={40} y={266} size={11} anchor="start" tone="muted">Instalado no significa observado: comprueba los datos antes de dar el paso por hecho.</T>
      </g>
    </Svg>
  )
}

/* ——— 4. Drill-down transversal: la mochila de contexto ——— */
const crossApps = [
  { name: 'Problems', body: ['root cause', 'SERVICE-A1B2'] },
  { name: 'Smartscape', body: ['misma entidad', 'y sus relaciones'] },
  { name: 'Logs', body: ['registros de', 'la entidad'] },
  { name: 'Notebooks', body: ['query con', 'el contexto'] },
]
const pattern = ['identificar', 'acotar', 'relacionar', 'validar', 'actuar']

function CrossApp({ step }: { step: number }) {
  const ax = (i: number) => 20 + i * 184
  const at = Math.min(step, 3)
  const lost = step === 3
  return (
    <Svg h={330} label="Drill-down entre aplicaciones que conserva entity ID y timeframe, con comprobaciones de record type y permisos">
      {crossApps.map((app, i) => {
        const reached = i <= at
        const hasChecks = i >= 1 && reached
        return (
          <g key={app.name} className={dim(reached)}>
            <rect x={ax(i)} y={20} width={168} height={130} rx={8} fill="#fff" stroke={i === at ? (lost ? C.coral : C.teal) : C.line} strokeWidth={1.6} />
            <rect x={ax(i)} y={20} width={168} height={24} rx={8} fill={C.navy} />
            <rect x={ax(i)} y={34} width={168} height={10} fill={C.navy} />
            <T x={ax(i) + 12} y={37} size={11} anchor="start" weight={800} tone="white">{app.name}</T>
            <T x={ax(i) + 84} y={64} size={10.5} tone="muted">{app.body[0]}</T>
            <T x={ax(i) + 84} y={79} size={10.5} tone="muted" mono={i === 0}>{app.body[1]}</T>
            <g className={show(hasChecks)}>
              {['record type', 'permisos'].map((c, k) => (
                <g key={c}>
                  <T x={ax(i) + 16} y={110 + k * 22} size={10.5} anchor="start">{c}</T>
                  {i === 3 && lost ? (
                    <g>
                      <circle cx={ax(i) + 150} cy={106 + k * 22} r={9} fill={C.amber} />
                      <T x={ax(i) + 150} y={110 + k * 22} size={11} weight={900} tone="white">?</T>
                    </g>
                  ) : (
                    <Mark x={ax(i) + 150} y={106 + k * 22} ok r={9} />
                  )}
                </g>
              ))}
            </g>
            {i < crossApps.length - 1 && <Arrow from={[ax(i) + 170, 85]} to={[ax(i) + 182, 85]} tone={i < at ? 'teal' : 'neutral'} />}
          </g>
        )
      })}
      {/* Mochila de contexto */}
      <g style={{ transform: `translateX(${ax(at)}px)` }}>
        <path d="M60,176 Q60,164 84,164 Q108,164 108,176" fill="none" stroke={C.violet} strokeWidth={3} />
        <rect x={10} y={174} width={148} height={72} rx={12} fill={C.violetTint} stroke={C.violet} strokeWidth={1.8} />
        <T x={84} y={192} size={10} weight={800} tone="violet">CONTEXTO</T>
        <Chip x={84} y={210} text="entity ID" tone="violet" solid w={110} size={10.5} />
        <g className={show(!lost)}>
          <Chip x={84} y={234} text="timeframe" tone="violet" solid w={110} size={10.5} />
        </g>
        <g className={show(lost)}>
          <Chip x={84} y={234} text="timeframe perdido" tone="coral" w={130} size={10.5} />
        </g>
      </g>
      <g className={show(lost)}>
        <T x={20} y={196} size={11.5} anchor="start" weight={800} tone="coral">El destino muestra otra cosa</T>
        <T x={20} y={214} size={10.5} anchor="start" tone="muted">Compara permisos, variante,</T>
        <T x={20} y={229} size={10.5} anchor="start" tone="muted">record type y timezone. Registra</T>
        <T x={20} y={244} size={10.5} anchor="start" tone="muted">entity ID, timeframe, segment,</T>
        <T x={20} y={259} size={10.5} anchor="start" tone="muted">query y filtro.</T>
      </g>
      <g className={show(step < 3)}>
        <T x={ax(at) + 180} y={202} size={11} anchor="start" weight={700} tone="violet" className={show(at < 3)}>viaja con cada drill-down</T>
      </g>
      {/* Patrón transversal */}
      <g className={dim(step === 4)}>
        {pattern.map((p, i) => (
          <g key={p}>
            <Chip x={92 + i * 144} y={300} text={p} tone={step === 4 ? 'teal' : 'navy'} solid={step === 4} w={120} />
            {i < pattern.length - 1 && <Arrow from={[153 + i * 144, 300]} to={[170 + i * 144, 300]} tone="teal" />}
          </g>
        ))}
      </g>
    </Svg>
  )
}

/* ——— 5. Smartscape como hipótesis ——— */
const evidence = ['Relación observada', 'Señal que la respalda', 'Dirección de dependencia', 'Ventana temporal', 'Impacto y causalidad']
const series = (seed: number, spikeAt: number | null) =>
  Array.from({ length: 21 }, (_, i) => {
    const base = 12 + Math.sin(seed + i * 0.9) * 4
    const spike = spikeAt !== null && i >= spikeAt && i <= spikeAt + 4 ? 26 : 0
    return `${60 + i * 19},${spike ? base + spike : base}`
  })

function SmartscapeHypothesis({ step }: { step: number }) {
  const lineA = series(1, 10).map((p) => { const [x, v] = p.split(','); return `${x},${226 - Number(v)}` }).join(' ')
  const lineB = series(3, 9).map((p) => { const [x, v] = p.split(','); return `${x},${286 - Number(v)}` }).join(' ')
  return (
    <Svg h={320} label="Una relación de Smartscape es una hipótesis: señal, dirección y ventana temporal la respaldan; la causalidad queda por confirmar">
      {/* Entidades */}
      <Box x={40} y={50} w={150} h={56} label="Service A" sub="dt.entity.service" tone="navy" />
      <Box x={320} y={50} w={150} h={56} label="Database B" sub="entidad dependiente" tone="navy" />
      <path d="M192,78 L318,78" stroke={step >= 2 ? C.violet : C.muted} strokeWidth={2.2} strokeDasharray={step >= 1 ? undefined : '6 5'} markerEnd={step >= 2 ? 'url(#sv-arrow-violet)' : undefined} fill="none" />
      <g className={show(step === 0)}>
        <circle cx={255} cy={78} r={12} fill="#fff" stroke={C.violet} strokeWidth={1.5} />
        <T x={255} y={82} size={12} weight={900} tone="violet">?</T>
      </g>
      <g className={show(step >= 1)}>
        <Particle path="M192,78 L318,78" dur={1.4} tone="teal" r={4} />
        <Particle path="M192,78 L318,78" dur={1.4} begin={0.7} tone="teal" r={4} />
        <T x={255} y={66} size={10.5} weight={700} tone="teal">tráfico / llamadas</T>
      </g>
      <g className={show(step >= 2)}>
        <T x={255} y={100} size={10.5} weight={700} tone="violet">A depende de B</T>
      </g>
      <T x={40} y={30} size={10} tone="muted" anchor="start" weight={800}>RELACIÓN EN SMARTSCAPE</T>
      {/* Ventana temporal */}
      <g className={dim(step >= 3)}>
        <T x={40} y={142} size={10} tone="muted" anchor="start" weight={800}>SEÑALES EN EL TIEMPO</T>
        <rect x={60 + 8 * 19} y={150} width={7 * 19} height={146} rx={6} fill={step >= 3 ? C.amberTint : 'transparent'} stroke={step >= 3 ? C.amber : C.line} strokeDasharray="5 4" />
        <T x={60 + 11.5 * 19} y={312} size={10} weight={700} tone="amber" className={show(step >= 3)}>ventana temporal</T>
        <T x={52} y={200} size={10.5} anchor="end" weight={700} tone="navy">A</T>
        <T x={52} y={262} size={10.5} anchor="end" weight={700} tone="navy">B</T>
        <polyline points={lineA} fill="none" stroke={C.coral} strokeWidth={2} />
        <polyline points={lineB} fill="none" stroke={C.coral} strokeWidth={2} />
        <T x={450} y={188} size={9.5} anchor="end" tone="muted">latencia</T>
        <T x={450} y={248} size={9.5} anchor="end" tone="muted">errores</T>
      </g>
      {/* Checklist */}
      <rect x={500} y={20} width={246} height={286} rx={12} fill={C.paperSoft} stroke={C.line} />
      <T x={516} y={46} size={11} anchor="start" weight={800} tone="navy">Antes de culpar a B</T>
      {evidence.map((e, i) => {
        const y = 78 + i * 44
        const last = i === evidence.length - 1
        const done = i <= step
        return (
          <g key={e} className={dim(done)}>
            {last ? (
              <g>
                <circle cx={528} cy={y} r={10} fill={done ? C.amber : '#fff'} stroke={C.amber} strokeWidth={1.5} />
                <T x={528} y={y + 4} size={11} weight={900} tone={done ? 'white' : 'amber'}>?</T>
              </g>
            ) : done ? <Mark x={528} y={y} ok r={10} /> : <circle cx={528} cy={y} r={10} fill="#fff" stroke={C.muted} />}
            <T x={546} y={y + 4} size={11.5} anchor="start" weight={700} tone={last && done ? 'amber' : 'ink'}>{e}</T>
            {last && <T x={546} y={y + 20} size={10.5} anchor="start" tone="muted">por confirmar</T>}
          </g>
        )
      })}
      <g className={show(step === 4)}>
        <rect x={246} y={116} width={220} height={26} rx={13} fill={C.amber} className="sv-pulse" />
        <T x={356} y={133} size={11} weight={800} tone="white">hipótesis, no prueba causal</T>
      </g>
    </Svg>
  )
}

/* ——— 6. Investigación de logs: filtra, parsea, relaciona ——— */
const survivors = [3, 11, 17, 26, 34, 41, 48, 55]
const linkTargets = [0, 1, 0, 2, 1, 0, 1, 2]
const relNodes: { label: string; tone: Tone; y: number }[] = [
  { label: 'entidad', tone: 'violet', y: 62 },
  { label: 'trace', tone: 'teal', y: 128 },
  { label: 'Problem', tone: 'amber', y: 194 },
]

function LogsFunnel({ step }: { step: number }) {
  const gridPos = (i: number) => ({ x: 20 + (i % 6) * 64, y: 44 + Math.floor(i / 6) * 22 })
  const listPos = (k: number) => ({ x: 446, y: 44 + k * 26 })
  return (
    <Svg h={300} label="Investigación de logs: filtrar reduce el volumen, parsear crea campos y relacionar conecta con entidad, trace y Problem">
      <T x={209} y={24} size={12} weight={800} tone={step === 1 ? 'teal' : 'navy'}>1. Filtra</T>
      <T x={530} y={24} size={12} weight={800} tone={step === 2 ? 'violet' : 'navy'} className={dim(step >= 2)}>2. Parsea</T>
      <T x={697} y={24} size={12} weight={800} tone={step === 3 ? 'teal' : 'navy'} className={dim(step >= 3)}>3. Relaciona</T>
      <line x1={420} x2={420} y1={36} y2={262} stroke={C.line} strokeDasharray="3 4" />
      {Array.from({ length: 60 }, (_, i) => {
        const k = survivors.indexOf(i)
        const kept = k >= 0
        const pos = kept && step >= 1 ? listPos(k) : gridPos(i)
        return (
          <g key={i} className={!kept && step >= 1 ? 'sv-dim' : 'sv-in'} style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}>
            <rect x={0} y={0} width={58} height={14} rx={3} fill={kept && step >= 1 ? C.tealTint : C.paperSoft} stroke={kept && step >= 1 ? C.teal : '#c9d6d3'} />
            <rect x={6} y={5} width={kept ? 40 : 28 + (i % 3) * 6} height={4} rx={2} fill={kept && step >= 1 ? C.teal : '#b9c7c5'} />
          </g>
        )
      })}
      {/* Campos parseados */}
      <g className={show(step >= 2)}>
        {survivors.map((_, k) => {
          const p = listPos(k)
          return (
            <g key={k}>
              {[0, 1, 2].map((f) => <rect key={f} x={p.x + 64 + f * 28} y={p.y} width={24} height={14} rx={3} fill={C.violetTint} stroke={C.violet} />)}
            </g>
          )
        })}
        <T x={560} y={262} size={10} tone="violet" weight={700}>campos estructurados</T>
      </g>
      {/* Relaciones */}
      <g className={show(step >= 3)}>
        {survivors.map((_, k) => {
          const p = listPos(k)
          const n = relNodes[linkTargets[k]]
          return <path key={k} d={`M${p.x + 148},${p.y + 7} C${p.x + 170},${p.y + 7} 628,${n.y + 17} 646,${n.y + 17}`} fill="none" stroke={toneColors[n.tone].solid} strokeWidth={1.3} opacity={0.8} />
        })}
        {relNodes.map((n) => <Box key={n.label} x={648} y={n.y} w={98} h={34} label={n.label} tone={n.tone} size={12} />)}
      </g>
      {/* Mensajes */}
      <g className={show(step === 0)}>
        <Chip x={209} y={282} text="Sin hipótesis: todo el volumen" tone="coral" w={220} />
      </g>
      <g className={show(step === 1)}>
        <T x={209} y={286} size={10.5} tone="teal" weight={700}>periodo · fuente · host · servicio · severidad · patrón</T>
      </g>
      <g className={show(step >= 2)}>
        <T x={209} y={286} size={10.5} tone="muted">Conserva timestamps, query, muestra y filtros</T>
      </g>
    </Svg>
  )
}

/* ——— Smartscape on Grail: lifetime, timeframe y retención ——— */
function NodeLifetime({ step }: { step: number }) {
  const aEnd = step >= 1 ? 660 : 360
  const win = step === 3 ? { x: 630, w: 80 } : { x: 560, w: 150 }
  return (
    <Svg h={300} label="Lifetime de dos nodos frente al timeframe de una consulta: solo aparece el nodo cuyo lifetime solapa el timeframe">
      <Arrow from={[150, 250]} to={[724, 250]} tone="neutral" width={1.4} />
      <T x={150} y={270} size={10.5} anchor="start" tone="muted">pasado</T>
      <T x={720} y={270} size={10.5} anchor="end" tone="muted">ahora</T>
      {/* Nodo A */}
      <T x={30} y={84} size={12} anchor="start" weight={800} tone="navy">Nodo A</T>
      <rect x={180} y={70} width={aEnd - 180} height={20} rx={10} fill={C.violetTint} stroke={C.violet} strokeWidth={1.5} />
      <T x={180} y={62} size={10} anchor="start" mono tone="violet">lifetime.start</T>
      <T x={aEnd} y={62} size={10} anchor="end" mono tone="violet">lifetime.end</T>
      <g className={show(step === 1)}>
        <Chip x={430} y={110} text="cada upsert extiende lifetime.end" tone="violet" size={10.5} />
      </g>
      {/* Nodo B */}
      <T x={30} y={164} size={12} anchor="start" weight={800} tone="navy">Nodo B</T>
      <g className={step >= 4 ? 'sv-dim' : undefined}>
        <rect x={180} y={150} width={200} height={20} rx={10} fill={step >= 2 ? toneColors.coral.fill : C.violetTint} stroke={step >= 2 ? C.coral : C.violet} strokeWidth={1.5} />
        <T x={380} y={142} size={10} anchor="end" mono tone={step >= 2 ? 'coral' : 'violet'}>lifetime.end: ayer</T>
      </g>
      {/* Timeframe de la consulta */}
      <g className={show(step >= 2)}>
        <rect x={win.x} y={40} width={win.w} height={150} rx={6} fill="none" stroke={C.amber} strokeWidth={1.6} strokeDasharray="6 5" />
        <T x={win.x + win.w / 2} y={206} size={10.5} weight={700} tone="amber">{step === 3 ? '15 min' : 'timeframe'}</T>
        <Mark x={676} y={80} ok />
        <Mark x={410} y={160} ok={false} />
      </g>
      <g className={show(step === 3)}>
        <rect x={694} y={52} width={14} height={126} rx={4} fill={C.amberTint} stroke={C.amber} strokeWidth={1.2} />
        <T x={701} y={34} size={10} weight={700} tone="amber">5 min</T>
        <Chip x={430} y={228} text="inicio a menos de 15 min → se amplía a 15 min" tone="amber" size={10.5} />
      </g>
      <g className={show(step >= 4)}>
        <Chip x={430} y={228} text="35 días tras lifetime.end → se borra con sus static edges" tone="coral" size={10.5} />
      </g>
    </Svg>
  )
}

export const otherVisuals: VisualRegistry = {
  'sup-smartscape-on-grail': {
    kind: 'animation',
    title: 'Un nodo aparece si su lifetime solapa el timeframe',
    caption: 'lifetime.start marca el descubrimiento y lifetime.end avanza con cada upsert. Una consulta solo devuelve los nodos cuyo lifetime solapa su timeframe: el nodo B, observado por última vez ayer, no sale en las últimas 2 horas. La retención es fija: 35 días desde lifetime.end.',
    steps: ['Nodo descubierto', 'Upserts extienden lifetime.end', 'Consulta: ¿solapa el timeframe?', 'Ventana corta: mínimo 15 min', 'Retención: 35 días'],
    stepMs: 2600,
    render: ({ step }) => <NodeLifetime step={step} />,
  },
  'deep-smartscape-graph': {
    kind: 'animation',
    title: 'Smartscape Classic se lee en 5 tiers',
    caption: 'De la infraestructura a la experiencia de usuario: Data centers → Hosts → Processes → Services → Applications. El eje vertical muestra dependencias full-stack entre tiers y el horizontal, llamadas dentro de un tier. El Smartscape actual (Smartscape on Grail) ya no usa tiers: es un grafo de nodos y edges.',
    steps: ['Data centers', 'Hosts', 'Processes', 'Services', 'Applications'],
    stepMs: 2400,
    render: ({ step }) => <SmartscapeGraph step={step} />,
  },
  entities: {
    kind: 'animation',
    title: 'Cada nivel de entidad responde otra pregunta',
    caption: 'La lupa recorre los niveles desde lo que ve el usuario hasta la infraestructura. Elige el nivel que conecta síntoma y acción: buscar solo el host cuando la latencia es de un endpoint oculta la ruta.',
    steps: ['Application: ¿qué ve el usuario?', 'Service: ¿qué operación está lenta?', 'Instancia: ¿cuál tiene el error?', 'Host: ¿qué recurso está saturado?'],
    stepMs: 2600,
    render: ({ step }) => <EntityLevels step={step} />,
  },
  'deep-hub-extensions': {
    kind: 'animation',
    title: 'Instalar desde Hub es solo una etapa',
    caption: 'El ciclo de vida de una app o extensión va del catálogo a la validación de los datos producidos, y vuelve a empezar con cada actualización. Configure y Observe son donde suelen estar las respuestas de examen: credenciales, ActiveGate, permisos y records reales.',
    steps: ['Catalog: descubrir', 'Install: hacer disponible', 'Configure: origen y permisos', 'Run/use: permisos de aplicación', 'Observe: records, entities, métricas'],
    stepMs: 2600,
    render: ({ step }) => <HubLifecycle step={step} />,
  },
  'deep-cross-app-troubleshooting': {
    kind: 'animation',
    title: 'El contexto viaja con cada drill-down',
    caption: 'Entity ID y timeframe viajan como una mochila entre aplicaciones; en cada destino comprueba que acepta el record type y que tienes permisos. Si el destino muestra algo diferente, compara contexto antes de sacar conclusiones.',
    steps: ['Problem: identificar entidad', 'Smartscape: misma entidad', 'Logs: record type y permisos', 'Contexto perdido: compara', 'Identificar → … → actuar'],
    stepMs: 2600,
    render: ({ step }) => <CrossApp step={step} />,
  },
  'smartscape-diagnosis': {
    kind: 'animation',
    title: 'Una flecha de Smartscape es una hipótesis',
    caption: 'La relación observada orienta la investigación. Respáldala con una señal (tráfico o error), confirma la dirección de la dependencia y que las señales coinciden en la ventana temporal; aun así, el impacto y la causalidad quedan por confirmar.',
    steps: ['Relación observada', 'Señal que la respalda', 'Dirección de dependencia', 'Ventana temporal', 'Causalidad por confirmar'],
    stepMs: 2600,
    render: ({ step }) => <SmartscapeHypothesis step={step} />,
  },
  logs: {
    kind: 'animation',
    title: 'Filtra primero, parsea después, relaciona al final',
    caption: 'Cada etapa trabaja sobre menos registros que la anterior: acota periodo, fuente y severidad antes de parsear, y relaciona con entidad, Problem o trace solo lo que queda. Así el análisis es barato y reproducible.',
    steps: ['Sin hipótesis: todo el volumen', 'Filtra: acota la población', 'Parsea: crea campos', 'Relaciona: entidad, trace…'],
    stepMs: 2600,
    render: ({ step }) => <LogsFunnel step={step} />,
  },
}

