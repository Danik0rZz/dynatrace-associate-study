import type { PrecisionFactSheet } from '../../types'

/**
 * Ficha de hechos de precisión del bloque «Security».
 * Fuente única: edita aquí directamente. Tras cualquier cambio: npm run inventario && npm test (ver CLAUDE.md).
 */
export const precision: PrecisionFactSheet = {
  title: 'Hechos de precisión de Application Security',
  intro: 'Application Security exige distinguir el componente vulnerable, la evidencia de uso, la exposición y la acción de remediación. No respondas solo con la severidad nominal.',
  rows: [
    {
      topic: 'RVA',
      fact: 'Runtime Vulnerability Analytics detecta y evalúa vulnerabilidades open-source, third-party y code-level en runtime.',
      examNote: 'El alcance real depende de capabilities activadas, tecnología, versión, modo y licencia.',
      source: {
        title: 'Runtime Vulnerability Analytics',
        url: 'https://docs.dynatrace.com/docs/secure/application-security/vulnerability-analytics',
      },
    },
    {
      topic: 'Third-party vs Code-level',
      fact: 'Third-party detecta librerías vulnerables cargadas en memoria; Code-level analiza rutas de ejecución con inputs no saneados en código propio.',
      examNote: 'No confunda una vulnerabilidad de dependencia externa (CVE) con una debilidad de código propia (CWE).',
      source: {
        title: 'Runtime Vulnerability Analytics',
        url: 'https://docs.dynatrace.com/docs/secure/application-security/vulnerability-analytics',
      },
    },
    {
      topic: 'Factores del Dynatrace Security Score (DSS)',
      fact: 'DSS parte del CVSS base y lo ajusta con Public internet exposure y Reachable data assets; Public exploit availability y Vulnerable functions son factores informativos que no entran en el cálculo. El DSS nunca supera el CVSS base.',
      examNote: 'Un CVSS 9.8 puede tener un DSS menor si el proceso no está expuesto ni accede a datos; nunca puede ser mayor que el CVSS.',
      source: { title: 'Prioritize vulnerabilities', url: 'https://docs.dynatrace.com/docs/secure/vulnerabilities/prioritize' },
    },
    {
      topic: 'Vulnerabilidades en Grail',
      fact: 'Las vulnerabilidades se consultan con `fetch security.events` filtrando `event.type == "VULNERABILITY_STATE_REPORT_EVENT"`; requiere `storage:security.events:read`. No existe una tabla `dt.security.vulnerabilities`.',
      examNote: 'Los eventos generados por Dynatrace se guardan en `default_securityevents_builtin` (3 años); los de terceros en `default_securityevents` (1 año).',
      source: {
        title: 'Runtime Vulnerability Analytics',
        url: 'https://docs.dynatrace.com/docs/secure/application-security/vulnerability-analytics',
      },
    },
    {
      topic: 'Third-party',
      fact: 'OneAgent reporta librerías cuando un proceso las está cargando; se emite el hallazgo cuando el componente está en uso.',
      examNote: 'Un paquete presente en disco o en un artefacto pero no cargado por ningún proceso no genera una third-party vulnerability.',
      source: {
        title: 'Vulnerability evaluation',
        url: 'https://docs.dynatrace.com/docs/secure/application-security/vulnerability-analytics/vulnerability-evaluation',
      },
    },
    {
      topic: 'Code-level',
      fact: 'Analiza cómo el input fluye por la aplicación y si existen caminos de código inseguros explotables.',
      examNote: 'No es lo mismo que listar CVEs de una librería de terceros.',
      source: {
        title: 'Runtime Vulnerability Analytics',
        url: 'https://docs.dynatrace.com/docs/secure/application-security/vulnerability-analytics',
      },
    },
    {
      topic: 'Risk context',
      fact: 'La evaluación puede considerar public internet exposure, reachable data assets, vulnerable functions y topología.',
      examNote: 'CVSS o severidad no cuentan toda la historia del riesgo contextual.',
      source: { title: 'Prioritize vulnerabilities', url: 'https://docs.dynatrace.com/docs/secure/vulnerabilities/prioritize' },
    },
    {
      topic: 'Auto-resolution',
      fact: 'Una vulnerabilidad puede resolverse automáticamente cuando desaparece la causa raíz, por ejemplo si se elimina una librería vulnerable o se detiene el proceso.',
      examNote: 'Resolver en la UI no equivale a corregir el software.',
      source: {
        title: 'Vulnerability evaluation',
        url: 'https://docs.dynatrace.com/docs/secure/application-security/vulnerability-analytics/vulnerability-evaluation',
      },
    },
    {
      topic: 'Monitoring modes',
      fact: 'Full-Stack ofrece la mayor profundidad; Infrastructure y Discovery tienen cobertura limitada para algunas detecciones; RAP aparece cubierta en los tres modos según la tabla de soporte.',
      examNote: 'AppSec en Discovery requiere code-module injection y puede tener menos contexto ambiental.',
      source: { title: 'Application Security', url: 'https://docs.dynatrace.com/docs/secure/application-security' },
    },
    {
      topic: 'Process restart',
      fact: 'Cambiar controles de detección o inyección puede requerir reiniciar el proceso para que la instrumentación aplicada cambie.',
      examNote: 'Un cambio guardado sin reinicio no demuestra que la cobertura ya se modificó.',
      source: { title: 'Application Security', url: 'https://docs.dynatrace.com/docs/secure/application-security' },
    },
    {
      topic: 'Dynatrace Security Score',
      fact: 'El riesgo usa contexto y AI para priorizar vulnerabilidades relevantes del entorno, no solo impacto teórico.',
      examNote: 'DSS ayuda a priorizar; no es una garantía de explotación ni una prueba de remediación.',
      source: { title: 'Prioritize vulnerabilities', url: 'https://docs.dynatrace.com/docs/secure/vulnerabilities/prioritize' },
    },
    {
      topic: 'Classic vs Latest',
      fact: 'Las apps Classic de Third-Party Vulnerabilities y Code-Level Vulnerabilities pueden estar deprecadas frente a la experiencia unificada Latest.',
      examNote: 'Lee el banner de variante y no memorices rutas antiguas como si fueran universales.',
      source: { title: 'Application Security', url: 'https://docs.dynatrace.com/docs/secure/application-security' },
    },
    {
      topic: 'Permiso API',
      fact: 'La API de vulnerabilities usa “securityProblems.read” para lectura en el ejemplo de Environment API.',
      examNote: 'El permiso de API no equivale automáticamente al permiso de editar o remediar desde la UI.',
      source: {
        title: 'Vulnerability evaluation',
        url: 'https://docs.dynatrace.com/docs/secure/application-security/vulnerability-analytics/vulnerability-evaluation',
      },
    },
    {
      topic: 'Mute (silenciar)',
      fact: 'En la app Vulnerabilities se silencian (mute) vulnerabilidades o entidades afectadas: Muted (Affected) para una entidad silenciada, Muted (Open) cuando todas las entidades afectadas de una vulnerabilidad activa están silenciadas y Muted (Resolved) cuando una entidad silenciada se cierra automáticamente.',
      examNote: 'Silenciar documenta una aceptación de riesgo: no corrige el código ni deja de detectar. No es una "regla": para excluir procesos del análisis se usan monitoring rules (Monitor / Do not monitor).',
      source: { title: 'Vulnerabilities concepts', url: 'https://docs.dynatrace.com/docs/secure/vulnerabilities/concepts' },
    },
  ],
}
