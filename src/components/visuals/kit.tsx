import type { ReactNode, SVGProps } from 'react'

/**
 * Kit de primitivas SVG para las ilustraciones y animaciones de estudio.
 * Todas las figuras usan un lienzo de 760 px de ancho (viewBox) que escala al contenedor.
 */

export const C = {
  navy: '#112f39',
  ink: '#182b30',
  soft: '#5f7277',
  muted: '#8b9a9e',
  line: '#dbe3e2',
  paper: '#ffffff',
  paperSoft: '#eef4f2',
  teal: '#11a899',
  tealDark: '#087d72',
  tealTint: '#e3f5f2',
  coral: '#df735a',
  coralTint: '#fbe9e4',
  amber: '#c98b12',
  amberTint: '#fbf1dc',
  violet: '#6d63c9',
  violetTint: '#ecebfa',
  slate: '#3c5a63',
} as const

export type Tone = 'teal' | 'navy' | 'coral' | 'amber' | 'violet' | 'neutral'

export const toneColors: Record<Tone, { stroke: string; fill: string; text: string; solid: string }> = {
  teal: { stroke: C.teal, fill: C.tealTint, text: C.tealDark, solid: C.teal },
  navy: { stroke: C.navy, fill: '#e4ecee', text: C.navy, solid: C.navy },
  coral: { stroke: C.coral, fill: C.coralTint, text: '#b04f37', solid: C.coral },
  amber: { stroke: C.amber, fill: C.amberTint, text: '#8a5d05', solid: C.amber },
  violet: { stroke: C.violet, fill: C.violetTint, text: '#4a41a3', solid: C.violet },
  neutral: { stroke: '#b9c7c5', fill: C.paper, text: C.ink, solid: C.slate },
}

/** Clases de estado para animaciones por pasos (transiciones suaves definidas en visuals.css). */
export const show = (visible: boolean) => (visible ? 'sv-in' : 'sv-out')
export const dim = (active: boolean) => (active ? 'sv-in' : 'sv-dim')
export const cx = (...names: (string | false | undefined | null)[]) => names.filter(Boolean).join(' ')

type SvgProps = { h?: number; label: string; children: ReactNode; className?: string }

/** Lienzo SVG común: 760 × h, con marcadores de flecha por tono. */
export function Svg({ h = 300, label, children, className }: SvgProps) {
  return (
    <svg className={cx('sv-canvas', className)} viewBox={`0 0 760 ${h}`} role="img" aria-label={label} preserveAspectRatio="xMidYMid meet">
      <defs>
        {(Object.keys(toneColors) as Tone[]).map((tone) => (
          <marker key={tone} id={`sv-arrow-${tone}`} viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill={toneColors[tone].solid} />
          </marker>
        ))}
      </defs>
      {children}
    </svg>
  )
}

type BoxProps = {
  x: number
  y: number
  w: number
  h: number
  label?: string
  sub?: string
  tone?: Tone
  solid?: boolean
  rx?: number
  size?: number
  className?: string
  mono?: boolean
  align?: 'middle' | 'start'
}

/** Caja con etiqueta principal y subtítulo opcional. */
export function Box({ x, y, w, h, label, sub, tone = 'neutral', solid, rx = 8, size = 13, className, mono, align = 'middle' }: BoxProps) {
  const t = toneColors[tone]
  const fill = solid ? t.solid : t.fill
  const text = solid ? '#fff' : t.text
  const tx = align === 'middle' ? x + w / 2 : x + 12
  const labelY = sub ? y + h / 2 - 3 : y + h / 2 + size * 0.36
  return (
    <g className={className}>
      <rect x={x} y={y} width={w} height={h} rx={rx} fill={fill} stroke={t.stroke} strokeWidth={1.5} />
      {label && (
        <text x={tx} y={labelY} textAnchor={align} fontSize={size} fontWeight={750} fill={text} fontFamily={mono ? 'ui-monospace, SFMono-Regular, Consolas, monospace' : undefined}>
          {label}
        </text>
      )}
      {sub && (
        <text x={tx} y={y + h / 2 + 13} textAnchor={align} fontSize={Math.max(10, size - 2.5)} fill={solid ? 'rgba(255,255,255,.82)' : C.soft}>
          {sub}
        </text>
      )}
    </g>
  )
}

type ArrowProps = {
  d?: string
  from?: [number, number]
  to?: [number, number]
  tone?: Tone
  flow?: boolean
  dashed?: boolean
  width?: number
  head?: boolean
  className?: string
}

/** Flecha recta (from/to) o de trazado libre (d). flow = guiones en movimiento. */
export function Arrow({ d, from, to, tone = 'neutral', flow, dashed, width = 1.8, head = true, className }: ArrowProps) {
  const path = d ?? `M${from![0]},${from![1]} L${to![0]},${to![1]}`
  return (
    <path
      d={path}
      fill="none"
      stroke={toneColors[tone].solid}
      strokeWidth={width}
      strokeDasharray={flow || dashed ? '6 6' : undefined}
      markerEnd={head ? `url(#sv-arrow-${tone})` : undefined}
      className={cx(flow && 'sv-flow', className)}
      strokeLinecap="round"
    />
  )
}

type TextProps = Omit<SVGProps<SVGTextElement>, 'x' | 'y'> & {
  x: number
  y: number
  children: ReactNode
  size?: number
  weight?: number
  tone?: Tone | 'muted' | 'ink' | 'white'
  anchor?: 'start' | 'middle' | 'end'
  mono?: boolean
}

/** Texto con tono. */
export function T({ x, y, children, size = 12, weight = 500, tone = 'ink', anchor = 'middle', mono, className, ...rest }: TextProps) {
  const fill = tone === 'muted' ? C.soft : tone === 'ink' ? C.ink : tone === 'white' ? '#fff' : toneColors[tone].text
  return (
    <text x={x} y={y} fontSize={size} fontWeight={weight} fill={fill} textAnchor={anchor} className={className} fontFamily={mono ? 'ui-monospace, SFMono-Regular, Consolas, monospace' : undefined} {...rest}>
      {children}
    </text>
  )
}

type ChipProps = { x: number; y: number; text: string; tone?: Tone; solid?: boolean; w?: number; className?: string; size?: number; mono?: boolean }

/** Píldora centrada en (x, y). */
export function Chip({ x, y, text, tone = 'teal', solid, w, className, size = 11, mono }: ChipProps) {
  const t = toneColors[tone]
  const width = w ?? Math.max(36, text.length * size * 0.62 + 18)
  return (
    <g className={className}>
      <rect x={x - width / 2} y={y - 11} width={width} height={22} rx={11} fill={solid ? t.solid : t.fill} stroke={t.stroke} strokeWidth={1.2} />
      <text x={x} y={y + size * 0.36} textAnchor="middle" fontSize={size} fontWeight={700} fill={solid ? '#fff' : t.text} fontFamily={mono ? 'ui-monospace, SFMono-Regular, Consolas, monospace' : undefined}>
        {text}
      </text>
    </g>
  )
}

type ParticleProps = { path: string; dur?: number; begin?: number; tone?: Tone; r?: number; repeat?: boolean }

/** Partícula que recorre un trazado (SMIL animateMotion; pausable desde el marco). */
export function Particle({ path, dur = 3, begin = 0, tone = 'teal', r = 5, repeat = true }: ParticleProps) {
  return (
    <circle r={r} fill={toneColors[tone].solid} opacity={0}>
      <animateMotion path={path} dur={`${dur}s`} begin={`${begin}s`} repeatCount={repeat ? 'indefinite' : '1'} fill="freeze" rotate="auto" />
      <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.85;1" dur={`${dur}s`} begin={`${begin}s`} repeatCount={repeat ? 'indefinite' : '1'} fill="freeze" />
    </circle>
  )
}

/** Marca de verificación o de error dentro de un círculo. */
export function Mark({ x, y, ok, r = 10, className }: { x: number; y: number; ok: boolean; r?: number; className?: string }) {
  const s = r * 0.45
  return (
    <g className={className}>
      <circle cx={x} cy={y} r={r} fill={ok ? C.teal : C.coral} />
      {ok ? (
        <path d={`M${x - s},${y} L${x - s * 0.25},${y + s * 0.75} L${x + s},${y - s * 0.7}`} stroke="#fff" strokeWidth={2.2} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      ) : (
        <path d={`M${x - s * 0.8},${y - s * 0.8} L${x + s * 0.8},${y + s * 0.8} M${x + s * 0.8},${y - s * 0.8} L${x - s * 0.8},${y + s * 0.8}`} stroke="#fff" strokeWidth={2.2} strokeLinecap="round" />
      )}
    </g>
  )
}

/** Figura de persona sencilla (usuarios reales, actores). */
export function Person({ x, y, tone = 'navy', scale = 1, className }: { x: number; y: number; tone?: Tone; scale?: number; className?: string }) {
  const c = toneColors[tone].solid
  return (
    <g className={className} transform={`translate(${x} ${y}) scale(${scale})`}>
      <circle cx={0} cy={-14} r={7} fill={c} />
      <path d="M-11,8 Q-11,-5 0,-5 Q11,-5 11,8 Z" fill={c} />
    </g>
  )
}

/** Reloj simple con aguja giratoria (triggers programados, timeframes). */
export function Clock({ x, y, r = 16, tone = 'navy', spin = true }: { x: number; y: number; r?: number; tone?: Tone; spin?: boolean }) {
  const c = toneColors[tone].solid
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill="#fff" stroke={c} strokeWidth={2} />
      <line x1={x} y1={y} x2={x} y2={y - r * 0.55} stroke={c} strokeWidth={2} strokeLinecap="round" />
      <line x1={x} y1={y} x2={x + r * 0.7} y2={y} stroke={c} strokeWidth={2} strokeLinecap="round" className={spin ? 'sv-spin' : undefined} style={{ transformOrigin: `${x}px ${y}px` }} />
    </g>
  )
}

/** Base de datos / almacenamiento (cilindro). */
export function Cylinder({ x, y, w = 70, h = 60, tone = 'navy', label, sub, className }: { x: number; y: number; w?: number; h?: number; tone?: Tone; label?: string; sub?: string; className?: string }) {
  const t = toneColors[tone]
  const ry = 9
  return (
    <g className={className}>
      <path d={`M${x},${y + ry} L${x},${y + h - ry} A${w / 2},${ry} 0 0 0 ${x + w},${y + h - ry} L${x + w},${y + ry}`} fill={t.fill} stroke={t.stroke} strokeWidth={1.5} />
      <ellipse cx={x + w / 2} cy={y + ry} rx={w / 2} ry={ry} fill="#fff" stroke={t.stroke} strokeWidth={1.5} />
      {label && <T x={x + w / 2} y={y + h / 2 + 6} size={12} weight={750} tone={tone}>{label}</T>}
      {sub && <T x={x + w / 2} y={y + h + 16} size={10.5} tone="muted">{sub}</T>}
    </g>
  )
}

/** Documento con esquina doblada. */
export function Doc({ x, y, w = 56, h = 70, tone = 'neutral', label, className }: { x: number; y: number; w?: number; h?: number; tone?: Tone; label?: string; className?: string }) {
  const t = toneColors[tone]
  const f = 14
  return (
    <g className={className}>
      <path d={`M${x},${y} L${x + w - f},${y} L${x + w},${y + f} L${x + w},${y + h} L${x},${y + h} Z`} fill={t.fill === C.paper ? '#fff' : t.fill} stroke={t.stroke} strokeWidth={1.5} />
      <path d={`M${x + w - f},${y} L${x + w - f},${y + f} L${x + w},${y + f}`} fill="none" stroke={t.stroke} strokeWidth={1.2} />
      {[0, 1, 2].map((i) => <line key={i} x1={x + 9} x2={x + w - 12} y1={y + 26 + i * 11} y2={y + 26 + i * 11} stroke={t.stroke} strokeOpacity={0.45} strokeWidth={2} strokeLinecap="round" />)}
      {label && <T x={x + w / 2} y={y + h + 16} size={11} weight={700} tone={tone === 'neutral' ? 'ink' : tone}>{label}</T>}
    </g>
  )
}
