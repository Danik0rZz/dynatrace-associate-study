/**
 * Pares texto/fondo (y foco/fondo) que deben cumplir contraste en los dos temas. Los usa src/tests/theme.test.ts.
 * Un fondo puede ser una capa translúcida sobre otro: «--nav-surface sobre --sidebar-bg» se escribe ['--nav-surface', '--sidebar-bg'].
 */
export type Background = string | [overlay: string, base: string]
/** `scope: 'sv'`: el par se mide dentro de la tarjeta de ilustración (.sv), con sus tokens fijos en claro. */
export type ContrastPair = { what: string; fg: string; bg: Background; min: number; scope?: 'sv' }

const text = (what: string, fg: string, bg: Background): ContrastPair => ({ what, fg, bg, min: 4.5 })
const focus = (what: string, fg: string, bg: Background): ContrastPair => ({ what, fg, bg, min: 3 })
const sv = (pair: ContrastPair): ContrastPair => ({ ...pair, scope: 'sv' })

export const CONTRAST_PAIRS: ContrastPair[] = [
  // Texto y texto secundario sobre sus fondos.
  text('texto / fondo', '--ink', '--bg'),
  text('texto / tarjeta', '--ink', '--paper'),
  text('texto / tarjeta suave', '--ink', '--paper-soft'),
  text('texto suave / fondo', '--ink-soft', '--bg'),
  text('texto suave / tarjeta', '--ink-soft', '--paper'),
  text('texto suave / tarjeta suave (pie)', '--ink-soft', '--paper-soft'),
  text('muted / fondo', '--muted', '--bg'),
  text('muted / tarjeta', '--muted', '--paper'),
  text('muted / tarjeta suave', '--muted', '--paper-soft'),
  // Enlaces y acentos de texto.
  text('enlace / fondo', '--teal-dark', '--bg'),
  text('enlace / tarjeta', '--teal-dark', '--paper'),
  text('enlace / tinte', '--teal-dark', '--surface-tint'),
  text('quiz a medida: detalle de la opción elegida', '--ink-soft', '--surface-tint'),
  text('acento / tarjeta', '--accent-text', '--paper'),
  text('acento / fondo', '--accent-text', '--bg'),
  text('código en línea', '--inline-text', '--paper-soft'),
  // Botones.
  text('botón principal', '--on-accent', '--teal'),
  text('botón principal (hover)', '--on-accent', '--accent-strong'),
  text('botón oscuro', '--on-accent', '--navy'),
  // Estados correcto / incorrecto y avisos.
  text('opción correcta', '--ink', '--answer-surface-2'),
  text('opción incorrecta', '--ink', '--answer-surface-3'),
  text('opción seleccionada', '--ink', '--answer-surface'),
  text('feedback negativo', '--ink', '--feedback-surface'),
  text('texto de error / tarjeta', '--coral', '--paper'),
  text('texto de error / feedback negativo', '--coral', '--feedback-surface'),
  // Feedback del quiz (encabezado «Correcto…» / «Incorrecto…», texto y foco del bloque).
  text('feedback correcto: encabezado', '--teal-dark', '--surface-tint'),
  text('feedback incorrecto: encabezado', '--difficulty-text-3', '--feedback-surface'),
  text('feedback correcto: texto', '--ink', '--surface-tint'),
  text('feedback: detalle', '--ink-soft', '--feedback-surface'),
  text('feedback: contexto', '--muted', '--surface-tint'),
  focus('foco del feedback correcto', '--focus-ring', '--surface-tint'),
  focus('foco del feedback incorrecto', '--focus-ring', '--feedback-surface'),
  text('aviso de la guía', '--study-text-4', '--study-surface-4'),
  // Pills y estados del mapa.
  text('pill básica', '--difficulty-text', '--difficulty-surface'),
  text('pill intermedia', '--difficulty-text-2', '--difficulty-surface-2'),
  text('pill avanzada', '--difficulty-text-3', '--difficulty-surface-3'),
  text('pill de categoría', '--ink-soft', '--bucket-surface'),
  text('estado dominado', '--teal-dark', '--node-surface'),
  text('estado en progreso', '--node-text', '--node-surface-2'),
  text('estado pendiente', '--node-text-2', '--node-surface-3'),
  // Aviso de la portada y pie (PR 8).
  text('aviso completo', '--ink-soft', '--paper'),
  text('pie', '--ink-soft', '--paper-soft'),
  // Resaltado de la búsqueda.
  text('resaltado <mark>', '--ink', '--highlight'),
  // Barra lateral y menú móvil.
  text('barra lateral', '--sidebar-text', '--sidebar-bg'),
  text('entrada de navegación', '--nav-text', '--sidebar-bg'),
  text('entrada activa', '--on-accent', ['--nav-surface', '--sidebar-bg']),
  text('cabecera móvil y botón Menú', '--sidebar-text-2', ['--sidebar-surface', '--sidebar-bg']),
  text('acento sobre oscuro', '--text-on-dark-accent', '--sidebar-bg'),
  text('opción de tema', '--sidebar-text', ['--data-surface', '--sidebar-bg']),
  text('opción de tema activa', '--on-accent', '--teal'),
  // Ficha de precisión (panel oscuro).
  text('ficha de precisión', '--precision-text', '--precision-surface'),
  text('ficha de precisión (celdas)', '--precision-text-3', '--precision-surface'),
  // Mapa: etiquetas de las aristas (sobre su píldora), texto de la leyenda y del lienzo.
  text('etiqueta de arista / píldora', '--react-graphic', '--paper'),
  text('leyenda del mapa', '--ink-soft', '--canvas-surface'),
  // Fases del mapa: título y píldora del encabezado, etiqueta de fase de cada nodo y etiqueta de la «Ruta curricular».
  ...[1, 2, 3, 4].flatMap((n) => [
    text(`fase ${n}: título del encabezado`, `--map-phase-${n}-text`, '--paper'),
    text(`fase ${n}: píldora «FASE ${n}»`, `--map-phase-${n}-text`, [`--map-phase-${n}-tint`, '--paper']),
    text(`fase ${n}: etiqueta de fase del nodo`, `--map-phase-${n}-text`, '--paper'),
    text(`fase ${n}: etiqueta de la ruta curricular`, '--on-accent', `--map-phase-${n}-badge`),
  ]),
  text('ayuda del lienzo', '--muted', '--canvas-surface'),
  // Elementos gráficos sin texto (≥ 3:1): contorno de los puntos de estado de la leyenda.
  focus('punto «Dominado» de la leyenda', '--legend-mastered-line', '--canvas-surface'),
  focus('punto «En progreso» de la leyenda', '--legend-progress-line', '--canvas-surface'),
  focus('punto «Pendiente» de la leyenda', '--legend-pending-line', '--canvas-surface'),
  focus('línea del gráfico de estadísticas', '--teal-dark', '--paper'),
  // Isla clara de las ilustraciones (.sv): cabecera, pie y pasos, iguales en los dos temas.
  sv(text('ilustración: título de la cabecera', '--sv-ink', '--sv-header-bg')),
  sv(text('ilustración: etiqueta «Animación»', '--sv-teal-dark', '--sv-kind-bg')),
  sv(text('ilustración: etiqueta «Ilustración»', '--sv-static-kind', '--sv-static-kind-bg')),
  sv(text('ilustración: botones de control', '--sv-teal-dark', '--sv-paper')),
  sv(text('ilustración: pie', '--sv-ink-soft', '--sv-paper')),
  sv(text('ilustración: paso', '--sv-ink-soft', '--sv-paper')),
  sv(text('ilustración: número de paso', '--sv-ink-soft', '--sv-step-num-bg')),
  sv(text('ilustración: paso hecho', '--sv-ink', '--sv-paper')),
  sv(text('ilustración: número de paso hecho', '--sv-teal-dark', '--sv-step-done-bg')),
  sv(text('ilustración: paso activo', '--sv-on-dark', '--sv-step-active-bg')),
  sv(text('ilustración: número de paso activo', '--sv-on-dark', '--sv-teal')),
  sv(focus('ilustración: foco', '--focus-ring', '--sv-paper')),
  // Foco visible.
  focus('foco / fondo', '--focus-ring', '--bg'),
  focus('foco / tarjeta', '--focus-ring', '--paper'),
  focus('foco en la barra lateral', '--focus-ring-on-dark', '--sidebar-bg'),
]
