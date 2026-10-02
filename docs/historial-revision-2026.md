# Historial de la revisión de contenido (septiembre–octubre de 2026)

Archivo de los motivos registrados en la revisión editorial antes de unificar el contenido en `src/data/blocks/`. A partir de aquí, el historial vive en git.

## 01 Welcome

### Preguntas corregidas (51)

- **W-002**: Distractores absurdos sustituidos por arquitecturas alternativas plausibles; clave igualada en longitud.
- **W-003**: Nombre actual (Dynatrace Intelligence), sin absolutos en distractores y con distractores plausibles.
- **W-004**: Precisado como Classic con los nombres de tier documentados; distractores con entidades reales.
- **W-005**: Distractores sustituidos por modelos de licenciamiento reales pero incorrectos para DPS.
- **W-006**: Distractores absurdos sustituidos por confusiones reales (inversión de conceptos, release, pod).
- **W-007**: Distractores plausibles (severidad, origen, notificación) y fuente del Semantic Dictionary.
- **W-008**: Distractores sustituidos por secuencias plausibles que difieren en el punto de partida (revisión v3).
- **W-009**: Distractores absurdos sustituidos por modelos de almacenamiento alternativos.
- **W-010**: Distractores con confusiones reales (DPL, SQL, políticas IAM).
- **W-011**: Eliminado el detalle inventado (saturación de conexiones) y distractores plausibles.
- **W-012**: Distractores con relaciones reales de Smartscape en lugar de IAM y buckets.
- **W-013**: Distractores plausibles (agentes por tecnología, ActiveGate, OTLP).
- **W-017**: Reescrita sobre los modelos documentados (seasonal baseline, auto-adaptive, static); la versión anterior atribuía estacionalidad a todos los baselines.
- **W-018**: Corregida la definición: la navegación central es el Dock; Launcher crea launchpads. Distractores con Dock, Hub y Search.
- **W-019**: Distractores plausibles (cuota diaria, bloqueo de consulta, cambio de modo) y dato on-demand verificado.
- **W-020**: Distractores plausibles y clave acortada.
- **W-021**: Distractores plausibles (timeframe, caché, segments) en lugar de absurdos.
- **W-022**: Distractores con confusiones conceptuales reales.
- **W-023**: Distractores plausibles (agrupación por management zone, un Problem por host).
- **W-024**: Distractores absurdos sustituidos por confusiones sobre el modelo de entidades.
- **W-026**: Distractores con absolutos evidentes sustituidos por usos reales de Dashboards (revisión v3).
- **W-027**: Concepto anclado en Dynatrace y distractores con otras fuentes de datos reales.
- **W-029**: Distractores plausibles (tiempo de consulta, OneAgent, retención).
- **W-030**: Eliminado el "100% automático" y añadidas las fuentes reales de topología.
- **W-032**: Explicación ajustada a lo que documenta la página de maintenance windows (revisión v3).
- **W-034**: Distractores con unidades reales de otras capabilities.
- **W-035**: Clave reformulada sin afirmar detalles internos de almacenamiento de Classic no documentados; longitud equilibrada (revisión v3).
- **W-037**: Distractores con confusiones típicas (detección, permisos, correlación).
- **W-038**: Concepto genérico sustituido por el mecanismo concreto de Dynatrace (Adaptive Traffic Management).
- **W-039**: Distractores con otros componentes reales de la plataforma.
- **W-040**: Distractores absurdos sustituidos por confusiones de unidades reales; se diferencia de W-005 al evaluar la unidad de Kubernetes (revisión v3).
- **W-041**: La versión anterior generalizaba la estacionalidad a todos los baselines; reescrita con el cálculo documentado.
- **W-042**: Convertida a respuesta múltiple, coherente con el enunciado ("dos funciones"), con distractores plausibles.
- **W-044**: Distractores plausibles sobre el modelo de datos de Business Events.
- **W-045**: Actualizada a Latest (segments y políticas) con distractores plausibles.
- **W-046**: Distractores absurdos sustituidos por confusiones plausibles.
- **W-047**: Corregidos los nombres de campo según la documentación de enriquecimiento automático.
- **W-048**: Distractores con confusiones reales entre RUM y Synthetic.
- **W-049**: Enunciado corregido: un Problem señala entidades, no métodos (revisión v3).
- **W-052**: Eliminado "en tiempo real" (no documentado) y distractores plausibles.
- **W-054**: Convertida a respuesta múltiple con distractores plausibles (golden signals).
- **W-055**: Convertida a respuesta múltiple con datos verificados del endpoint OTLP.
- **W-056**: Auditoría v4: la clave citaba también Smartscape, que muestra la dirección de las llamadas pero no su volumen; ahora solo Service flow (vista de Services Classic), con evidencia verificada en Service flow filtering.
- **W-058**: Distractores con enfoques de seguridad reales pero distintos.
- **W-059**: Nombre actual (Dynatrace Assist) verificado y distractores plausibles.
- **W-060**: Fusiona W-033; corregida la explicación (Grail no usa índices) y distractores plausibles.
- **W-061**: Distractores obvios sustituidos por configuraciones reales pero incorrectas; clave acortada (revisión v3).
- **W-062**: Clave sin detalles no documentados y opciones equilibradas (revisión v3).
- **W-063**: Distractores plausibles sobre la agregación de entidades.
- **W-065**: Distractores sin coletillas negativas (revisión v3). Auditoría v4: enunciado reformulado para que pregunte por la evidencia adecuada, coherente con las opciones.
- **W-066**: Distractores plausibles; eliminado el ejemplo de 365 días no verificado.

### Preguntas retiradas (17)

- **W-001**: Pregunta de metaconocimiento sobre la certificación; el módulo se centra en fundamentos de plataforma.
- **W-025**: Duplica W-040 (flexibilidad de DPS ante cambios de arquitectura).
- **W-028**: Duplica W-003 (causalidad frente a correlación) con distractores absurdos.
- **W-033**: Duplica W-060 (cardinalidad en dimensiones de métricas).
- **W-043**: Error: el código de colores rojo/naranja/amarillo no está documentado; el concepto se cubre en W-011 y W-067.
- **W-051**: Trivial (Support Center) y fuera del foco de fundamentos de plataforma.
- **W-053**: Duplica W-009 (schema-on-read de Grail) con afirmaciones de marketing.
- **W-057**: Duplica W-019/W-040 (elasticidad de DPS) y presuponía la instrumentación sin prerrequisitos.
- **W-068**: Pregunta de cierre de marketing sin valor discriminante.
- **W-014**: Duplica W-005 (todas las capabilities se consumen contra el mismo compromiso DPS con su unidad del rate card).
- **W-015**: Conocimiento genérico de SO/JVM no ligado a producto, con distractores absurdos y fuente que no lo respalda.
- **W-016**: Duplica R-WEL-10 (trace_id/span_id en logs para enlazar con trazas), con enunciado confuso.
- **W-031**: Duplica W-021 y R-WEL-01 (permisos de tabla y bucket como causa de resultados vacíos).
- **W-036**: Duplica R-WEL-04 (Infrastructure Monitoring excluye tracing y code-level).
- **W-050**: Solapa con W-004 (tiers de Smartscape Classic, incluido Data centers).
- **W-064**: Duplica W-005 y R-WEL-08 (consumo por capability con su unidad contra el compromiso).
- **W-067**: Duplica W-011 (root cause frente a entidades afectadas).

### Preguntas nuevas (40)

R-WEL-01, R-WEL-02, R-WEL-03, R-WEL-04, R-WEL-05, R-WEL-06, R-WEL-07, R-WEL-08, R-WEL-09, R-WEL-10, R-WEL-11, R-WEL-12, R-WEL-13, R-WEL-14, R-WEL-15, R-WEL-16, R-WEL-17, R-WEL-18, R-WEL-19, R-WEL-20, R-WEL-21, R-WEL-22, R-WEL-23, R-WEL-24, R-WEL-25, R-WEL-26, R-WEL-27, R-WEL-28, R-WEL-29, R-WEL-30, R-WEL-31, R-WEL-32, R-WEL-33, R-WEL-34, R-WEL-35, R-WEL-36, R-WEL-37, R-WEL-38, R-WEL-39, R-WEL-40

### Apartados ampliados o corregidos (3)

- **deep-dynatrace-101**: Corrige el orden PG/PGI de la jerarquía, nombra los 5 tiers documentados de Smartscape Classic y actualiza el nombre Dynatrace Intelligence (W-004, W-006, W-012). Auditoría v4: la tabla ya no niega la AI probabilística (seasonal baseline usa quantile regression y existe predictive AI), describe OneAgent como captura sin cambios de código mediante code modules y define DPS por su compromiso anual y rate card (el licenciamiento anterior tampoco era perpetuo).
- **deep-data-to-decision**: Respalda R-WEL-33 (record type de cada señal). Fuentes: https://docs.dynatrace.com/docs/platform/grail/dynatrace-query-language/commands/metric-commands | https://docs.dynatrace.com/docs/semantic-dictionary/model/rum | https://docs.dynatrace.com/docs/semantic-dictionary/model/security-events
- **deep-evidence-quality**: Respalda R-WEL-36 (las peticiones son spans) y R-WEL-37 (storage:logs:read + storage:buckets:read). Fuentes: https://docs.dynatrace.com/docs/platform/grail/organize-data/assign-permissions-in-grail | https://docs.dynatrace.com/docs/platform/grail/dynatrace-grail

### Apartados nuevos (10)

sup-platform-apps, sup-grail-dql, sup-buckets-permissions, sup-openpipeline, sup-smartscape, sup-oneagent, sup-dps, sup-problems-lifecycle, sup-anomaly-ai, sup-security-business-dem

### Ficha de precisión

Auditoría v4: Launcher crea launchpads (no es el panel de apps, que es el Dock: coherente con sup-platform-apps y W-018); la ficha de Davis negaba la AI probabilística (el seasonal baseline usa quantile regression) y usaba el nombre antiguo; los tiers de Smartscape Classic son Processes, no Process Group; DPS se define por compromiso anual y rate card, no por oposición a licencias perpetuas.

## 02 Instructions

### Preguntas corregidas (21)

- **I-001**: Error: 443 no es el único puerto (OneAgent → Environment ActiveGate usa 9999). Se acota a la conexión directa a SaaS y se cambian distractores absurdos.
- **I-003**: Dato no verificable (PAC, NTLM). Se reescribe con la sintaxis documentada de --set-proxy con autenticación y distractores de comandos reales.
- **I-005**: `oneagentctl --status` no existe; se reescribe el síntoma y se sustituyen distractores absurdos por causas plausibles de conectividad.
- **I-006**: Mecanismo verificado: custom-proxy.pem en el directorio customkeys. Distractores absurdos sustituidos.
- **I-007**: Error: el Namespace no está contenido en el Node. Se distingue jerarquía lógica y recurso de cómputo.
- **I-008**: Simplificación corregida: son los procesos de los contenedores los que se modelan como PGI. Distractores plausibles.
- **I-009**: Distractores absurdos sustituidos por confusiones reales sobre el Operator.
- **I-026**: Se elimina la afirmación no verificada sobre ancho de banda; se usa "buffering and compression" de la documentación. Distractores plausibles.
- **I-027**: Distractores absurdos sustituidos; mecanismo alineado con la documentación (webhook + init container).
- **I-031**: Distractores absurdos sustituidos por nombres de campo plausibles; se quita la referencia a Management Zones (Classic).
- **I-032**: Conocimiento HTTP genérico sin vínculo con Dynatrace; se liga a la failure detection de services (default 500-599 en el lado servidor).
- **I-033**: Pregunta de kernel Linux sin vínculo con Dynatrace; se liga a la alerta integrada de CPU throttling de la app Kubernetes.
- **I-034**: Cabecera HTTP genérica sin vínculo con Dynatrace; se liga a la IP determination de RUM detrás de balanceadores y CDN.
- **I-038**: Pista de longitud y distractores débiles; ahora se comparan tipos de workload reales.
- **I-048**: Auditoría final: duplicaba I-026 (para qué sirve un Environment ActiveGate). Se reorienta al ángulo no cubierto: el ActiveGate de la DMZ solo sale por un proxy corporativo, que se configura en custom.properties, no con oneagentctl.
- **I-052**: Distractores absurdos sustituidos por arquitecturas plausibles; se añaden network zones.
- **I-053**: Se liga a lo que muestra Dynatrace (eventos OOMKilled en la app Kubernetes) y se corrige el actor (kubelet).
- **I-056**: Se liga a la alerta de Dynatrace sobre Pods no listos y se evalúa la diferencia entre probes en un caso.
- **I-059**: Error: el reparto y failover de OneAgent entre ActiveGates se consigue con network zones, no con ActiveGate groups.
- **I-063**: Explicación corregida (un entorno no tiene "endpoints regionales"); se pide el cambio recomendado con network zones.
- **I-064**: Distractores absurdos sustituidos por otros estados de Pod con los que se confunde.

### Preguntas retiradas (47)

- **I-004**: Soporte de archivos PAC en OneAgent no documentado (la documentación de proxy solo cubre host:puerto con credenciales).
- **I-010**: Conocimiento genérico trivial sin relación con el temario; sustituida por preguntas de prerrequisitos verificadas.
- **I-011**: Pregunta de metaconocimiento o logística de examen sin valor técnico, o con datos de política no verificables en university.dynatrace.com / support.proctoru.com.
- **I-012**: Pregunta de metaconocimiento o logística de examen sin valor técnico, o con datos de política no verificables en university.dynatrace.com / support.proctoru.com.
- **I-014**: Pregunta de metaconocimiento o logística de examen sin valor técnico, o con datos de política no verificables en university.dynatrace.com / support.proctoru.com.
- **I-015**: Pregunta de metaconocimiento o logística de examen sin valor técnico, o con datos de política no verificables en university.dynatrace.com / support.proctoru.com.
- **I-017**: Duración y número de preguntas no verificables en university.dynatrace.com.
- **I-018**: Nota de corte no verificable en university.dynatrace.com.
- **I-019**: Pregunta de metaconocimiento o logística de examen sin valor técnico, o con datos de política no verificables en university.dynatrace.com / support.proctoru.com.
- **I-020**: Pregunta de metaconocimiento o logística de examen sin valor técnico, o con datos de política no verificables en university.dynatrace.com / support.proctoru.com.
- **I-021**: Política open-book no verificable en university.dynatrace.com.
- **I-022**: Metaconocimiento (lectura de rutas Latest/Classic); se retira junto con I-025.
- **I-023**: Técnica de búsqueda (metaconocimiento); el permiso de Hub se evalúa en el módulo de seguridad/plataforma.
- **I-024**: Pregunta de metaconocimiento o logística de examen sin valor técnico, o con datos de política no verificables en university.dynatrace.com / support.proctoru.com.
- **I-028**: Pregunta de metaconocimiento o logística de examen sin valor técnico, o con datos de política no verificables en university.dynatrace.com / support.proctoru.com.
- **I-029**: Pregunta de metaconocimiento o logística de examen sin valor técnico, o con datos de política no verificables en university.dynatrace.com / support.proctoru.com.
- **I-035**: Pregunta de metaconocimiento o logística de examen sin valor técnico, o con datos de política no verificables en university.dynatrace.com / support.proctoru.com.
- **I-036**: Pregunta de metaconocimiento o logística de examen sin valor técnico, o con datos de política no verificables en university.dynatrace.com / support.proctoru.com.
- **I-039**: Pregunta de metaconocimiento o logística de examen sin valor técnico, o con datos de política no verificables en university.dynatrace.com / support.proctoru.com.
- **I-040**: Pregunta de metaconocimiento o logística de examen sin valor técnico, o con datos de política no verificables en university.dynatrace.com / support.proctoru.com.
- **I-041**: Duplicado de I-003; además NTLM no está documentado para OneAgent.
- **I-042**: Pregunta de DQL planteada como análisis de distractores; el tema pertenece al módulo DQL y la explicación citaba una métrica inexistente.
- **I-043**: Afirmaciones no verificadas sobre detección de OOM por OneAgent; el concepto OOMKilled se cubre en I-053.
- **I-045**: Pregunta de metaconocimiento o logística de examen sin valor técnico, o con datos de política no verificables en university.dynatrace.com / support.proctoru.com.
- **I-046**: Pregunta de metaconocimiento o logística de examen sin valor técnico, o con datos de política no verificables en university.dynatrace.com / support.proctoru.com.
- **I-047**: Enhanced Object Visibility es una funcionalidad en Preview; el contenido afirmado no coincide con lo documentado.
- **I-050**: Pregunta de metaconocimiento o logística de examen sin valor técnico, o con datos de política no verificables en university.dynatrace.com / support.proctoru.com.
- **I-051**: Política de reintentos no verificable en university.dynatrace.com.
- **I-054**: Contenido del informe de resultados no verificable.
- **I-057**: Pregunta de metaconocimiento o logística de examen sin valor técnico, o con datos de política no verificables en university.dynatrace.com / support.proctoru.com.
- **I-058**: Pregunta de metaconocimiento o logística de examen sin valor técnico, o con datos de política no verificables en university.dynatrace.com / support.proctoru.com.
- **I-061**: Pregunta de metaconocimiento o logística de examen sin valor técnico, o con datos de política no verificables en university.dynatrace.com / support.proctoru.com.
- **I-062**: Pregunta de metaconocimiento o logística de examen sin valor técnico, o con datos de política no verificables en university.dynatrace.com / support.proctoru.com.
- **I-065**: Pregunta de metaconocimiento o logística de examen sin valor técnico, o con datos de política no verificables en university.dynatrace.com / support.proctoru.com.
- **I-067**: Pregunta de metaconocimiento o logística de examen sin valor técnico, o con datos de política no verificables en university.dynatrace.com / support.proctoru.com.
- **I-068**: Pregunta de metaconocimiento o logística de examen sin valor técnico, o con datos de política no verificables en university.dynatrace.com / support.proctoru.com.
- **I-002**: Duplicado de I-001 y R-INS-02 (comunicación de OneAgent solo saliente) con distractores obvios.
- **I-013**: Logística de ProctorU (monitores): no evalúa conocimiento de Dynatrace.
- **I-016**: Logística de ProctorU (máquina virtual): no evalúa conocimiento de Dynatrace.
- **I-025**: Metaconocimiento: lectura de rutas Latest/Classic en tutoriales, no producto.
- **I-030**: Técnica de examen ("primer paso") con pista en el enunciado; el diagnóstico de conectividad se evalúa en I-005 y R-INS-37.
- **I-037**: El mensaje "certificate expired" daba la respuesta; los certificados TLS de OneAgent/ActiveGate se evalúan en I-006, R-INS-10, R-INS-11, R-INS-12 y R-INS-48.
- **I-044**: Diagnóstico DNS/TTL genérico que telegrafiaba la respuesta; la resolución DNS hacia Dynatrace se evalúa en I-005.
- **I-049**: Metaconocimiento: estrategia de lectura de enunciados.
- **I-055**: Extensión TLS genérica (SNI) sin relación verificable con OneAgent ni ActiveGate.
- **I-060**: Duplicado de R-INS-19 (Secret dynakube con apiToken y dataIngestToken), que se conserva por su estímulo.
- **I-066**: Handshake TCP genérico sin relación con Dynatrace.

### Preguntas nuevas (63)

R-INS-01, R-INS-02, R-INS-03, R-INS-04, R-INS-05, R-INS-06, R-INS-07, R-INS-08, R-INS-09, R-INS-10, R-INS-11, R-INS-12, R-INS-13, R-INS-14, R-INS-15, R-INS-16, R-INS-17, R-INS-18, R-INS-19, R-INS-20, R-INS-21, R-INS-22, R-INS-23, R-INS-24, R-INS-25, R-INS-26, R-INS-27, R-INS-28, R-INS-29, R-INS-30, R-INS-31, R-INS-32, R-INS-33, R-INS-34, R-INS-35, R-INS-36, R-INS-37, R-INS-38, R-INS-39, R-INS-40, R-INS-41, R-INS-43, R-INS-44, R-INS-45, R-INS-46, R-INS-47, R-INS-48, R-INS-49, R-INS-50, R-INS-51, R-INS-52, R-INS-53, R-INS-54, R-INS-55, R-INS-56, R-INS-57, R-INS-58, R-INS-59, R-INS-60, R-INS-61, R-INS-62, R-INS-63, R-INS-64

### Apartados ampliados o corregidos (3)

- **deep-exam-readiness**: El texto original afirmaba que todo el tráfico va por 443 (OneAgent → Environment ActiveGate usa 9999), citaba archivos PAC no documentados, igualaba Pod y PGI e incluía logística de proctoring no verificada. Se corrige y se amplía con los destinos de OneAgent, el papel de ActiveGate y el diagnóstico DNS (I-001, I-005, I-026, I-048, R-INS-01, R-INS-02, R-INS-03, R-INS-38).
- **deep-prerequisite-map**: Errata en el párrafo inicial.
- **deep-question-reading**: El texto original daba a entender que todo el examen es open book. El Learning Path oficial solo lo indica para la parte práctica ("The practical section is open book"); se acota a esa parte. v7: se explica qué concede cada permiso y qué devuelve cada tabla citados (R-INS-59, R-INS-60, R-INS-61). Fuentes: https://docs.dynatrace.com/docs/manage/identity-access-management/permission-management/manage-user-permissions-policies/advanced/iam-policystatements | https://docs.dynatrace.com/docs/platform/grail/organize-data | https://docs.dynatrace.com/docs/platform/grail/querying-monitored-entities

### Apartados nuevos (10)

sup-proxy-config, sup-tls-trust, sup-network-zones, sup-processes-services, sup-k8s-operator, sup-k8s-health, sup-http-web, sup-traces, sup-ingest-formats, sup-otlp

### Ficha de precisión

Auditoría final: la ficha afirmaba que todo el tráfico va por 443 (OneAgent → Environment ActiveGate usa 9999), citaba ficheros PAC no documentados, ponía el Namespace dentro del Node, igualaba Pod y PGI, daba requisitos de proctoring no verificados en fuente oficial y presentaba todo el examen como open book. Se retiran esas filas y se sustituyen por hechos verificados, coherentes con deep-exam-readiness, sup-proxy-config, sup-processes-services y sup-k8s-operator.

## 03 The Dynatrace Platform

### Preguntas corregidas (46)

- **A-001**: Explicación ampliada para desmontar cada distractor; absorbe el ángulo de E-001 (retirada).
- **A-002**: Explicación alineada con la guía (red root cause badge).
- **A-003**: Explicación que desmonta cada distractor.
- **A-024**: Distractores sin coletillas justificativas; explicación que desmonta cada uno. Absorbe E-004 (espejo, retirada).
- **B-001**: Distractores autodescartables sustituidos por alternativas plausibles (revisión independiente).
- **B-002**: Explicación que desmonta cada distractor.
- **B-004**: Clave acortada y explicación con la regla literal de la documentación.
- **B-005**: Distractores autodescartables (Transfer ownership, "concede edición") sustituidos; dificultad ajustada.
- **B-006**: Distractores absurdos sustituidos por audiencias plausibles; enunciado centrado en el reenvío.
- **B-007**: Todas las opciones en formato DQL para quitar la pista de formato; fusiona G-007. v4: el enunciado acota a los default buckets (default_), porque los buckets integrados incluyen también los dt_.
- **B-008**: Distractor D sin absoluto; explicación ampliada.
- **C-001**: Explicación que desmonta cada distractor.
- **C-002**: Coletillas "sin…" eliminadas de los distractores.
- **C-003**: Distractores con coletillas que se autodescartaban sustituidos por propiedades reales de eventos.
- **C-004**: El distractor D (audit-logs) también era válido según la regla documentada; sustituido por un nombre con mayúscula.
- **D-001**: Distractor autodescartable ("sin soporte para ID") y pista de longitud; reformulada (revisión independiente).
- **D-002**: Cifra de 72 h verificada; distractores numéricos plausibles en lugar de absolutos.
- **D-003**: Explicación que desmonta cada distractor.
- **D-004**: Explicación que desmonta cada distractor.
- **E-002**: Clave alineada con la redacción de la documentación (entidades afectadas y relacionadas).
- **E-005**: Coletilla "sin condicionar" eliminada; explicación que desmonta cada distractor.
- **E-006**: Patrón "sin permiso de…" que delataba la clave eliminado (revisión independiente).
- **FP-001**: Explicación ampliada.
- **FP-002**: Distractor con "aunque" sustituido; explicación que desmonta cada distractor.
- **FP-003**: Explicación ampliada; absorbe FP-004 (espejo, retirada).
- **FP-005**: Nombre real de la pestaña (Product information) según la documentación de Hub.
- **FP-006**: Explicación alineada con la guía.
- **FP-007**: Explicación ampliada; absorbe FP-011 (duplicado, retirada).
- **FP-008**: Explicación que desmonta cada distractor.
- **FP-009**: El enunciado dictaba la clave; reformulado.
- **FP-010**: Explicación que desmonta cada distractor.
- **FP-012**: Texto de la clave alineado con la documentación; explicación ampliada.
- **FP-013**: Explicación que desmonta cada distractor y fuente de OpenPipeline.
- **FP-016**: Explicación que desmonta cada distractor.
- **FP-017**: Absolutos movidos de distractores a la clave verdadera.
- **FP-018**: Fusiona FP-018 (tipo string) y FP-019 (efecto del renombrado) en una pregunta de respuesta múltiple (revisión independiente).
- **FP-021**: Nombres de filtros verificados; el distractor ImpactLevel era ambiguo.
- **G-004**: Distractores absurdos y dato no verificado (requisitos de red) sustituidos por las pestañas reales.
- **G-010**: Distractores absurdos; reconvertida en troubleshooting con campos de búsqueda verificados.
- **G-011**: Distractores absurdos y clave que atribuía el control de acceso solo al bucket; v4: la clave nombra cada permiso en lugar de "otro permiso".
- **G-012**: Clave ajustada al texto de la documentación y distractores técnicos plausibles.
- **G-013**: Explicación que desmonta cada distractor.
- **G-014**: Distractores absurdos; clave precisada (los buckets integrados no son editables).
- **G-015**: Error técnico (permiso de apps y ActiveGate obligatorio) y distractores absurdos; reescrita con pasos verificados.
- **G-018**: Distractores absurdos y fuente incorrecta.
- **G-019**: Management Zone es un concepto Classic para el aislamiento en Grail; distractores absurdos.

### Preguntas retiradas (22)

- **A-004**: Duplica G-014 (retención distinta mediante un bucket custom); G-014 lo evalúa con más precisión.
- **E-001**: Duplica A-001 (root cause frente a entidades afectadas).
- **E-004**: Espejo de A-024 (bucket + tabla); el concepto queda en A-024 y en E-006 (métricas).
- **FP-004**: Espejo de FP-003 (install/delete); app-engine:apps:delete queda como distractor y en la guía.
- **FP-011**: Duplica FP-007 (revocar enlaces frente a Share access).
- **FP-014**: Solapa con G-014 y R-PLA-15 (motivos para separar buckets).
- **FP-015**: Pregunta de opinión de gobierno con distractores falsos obvios; el fallback a default_logs ya lo evalúa FP-013.
- **FP-019**: Fusionada en FP-018 (Problem fields: tipo string y efecto del renombrado).
- **FP-020**: Limitación de nicho (filtros de array en políticas de Problems) con enunciado confuso; poco valor para Associate.
- **B-003**: Duplica A-024 (storage:buckets:read además del permiso de tabla).
- **E-003**: Duplica C-001 (filtros combinados con AND por defecto).
- **G-001**: Duplica FP-003 (app-engine:apps:install).
- **G-002**: Duplica FP-004 (app-engine:apps:delete), a su vez retirada como espejo de FP-003.
- **G-003**: Duplica FP-005 (pestaña Contents).
- **G-005**: Duplica FP-016 (dt.davis.event_ids).
- **G-006**: Duplica FP-018 (Problem fields de tipo string).
- **G-007**: Duplica B-007 (dt.system.buckets).
- **G-008**: Duplica FP-008 (Allow editors to share).
- **G-009**: Duplica FP-010 (Visible to anyone in your environment).
- **G-016**: Duplica E-001/A-001 (root cause frente a entidades afectadas) y usaba una terminología de severidad no documentada.
- **G-017**: Duplica FP-009 (transferencia de propiedad).
- **G-020**: Pregunta de cierre de curso ("En conclusión"), sin dato de producto evaluable.

### Preguntas nuevas (47)

R-PLA-01, R-PLA-02, R-PLA-03, R-PLA-04, R-PLA-05, R-PLA-07, R-PLA-08, R-PLA-09, R-PLA-10, R-PLA-11, R-PLA-12, R-PLA-13, R-PLA-14, R-PLA-15, R-PLA-16, R-PLA-17, R-PLA-18, R-PLA-19, R-PLA-20, R-PLA-21, R-PLA-22, R-PLA-23, R-PLA-24, R-PLA-25, R-PLA-27, R-PLA-28, R-PLA-29, R-PLA-30, R-PLA-31, R-PLA-32, R-PLA-33, R-PLA-34, R-PLA-35, R-PLA-36, R-PLA-37, R-PLA-38, R-PLA-39, R-PLA-40, R-PLA-41, R-PLA-42, R-PLA-43, R-PLA-44, R-PLA-45, R-PLA-46, R-PLA-47, R-PLA-48, R-PLA-49

### Apartados ampliados o corregidos (6)

- **deep-problems-platform**: La frase sobre "números flotantes sin parsear" no procede de la documentación; se alinea con Problems app (FP-018).
- **ui-navigation**: Terminología alineada con Navigate the Dynatrace platform y con sup-ui-dock: la navegación de Latest se hace desde el Dock; los Launchpads son páginas de inicio.
- **grail-hub**: En la UI actual Help & Support lleva al Support hub (Navigate the Dynatrace platform); coherente con sup-ui-dock. R-PLA-39: acceso a Grail solo con DQL vía Query Processing (https://docs.dynatrace.com/docs/platform/grail/dynatrace-grail).
- **deep-grail-records**: Respalda R-PLA-43 (consultar no es modificar: record deletion en Grail) y R-PLA-44 (timeseries para métricas, fetch dt.davis.problems para Problems; https://docs.dynatrace.com/docs/platform/grail/dynatrace-query-language/commands/metric-commands).
- **platform-contract**: Respalda R-PLA-45 (extensiones remotas en un Environment ActiveGate de un ActiveGate group). Fuentes: https://docs.dynatrace.com/docs/ingest-from/extensions/concepts | https://docs.dynatrace.com/docs/ingest-from/edgeconnect
- **permissions**: v7: ejemplo de lectura frente a escritura en Settings (R-PLA-40; https://docs.dynatrace.com/docs/manage/identity-access-management/permission-management/manage-user-permissions-policies/advanced/iam-policystatements). Coherencia con sup-grail-permissions y R-PLA-08; management zone es un concepto Classic (Permissions in Grail). v5: la doc no especifica si la falta de permiso de tabla o de bucket produce un error o un resultado vacío; se usa la redacción documentada (sin permisos no se pueden consultar los datos), igual que en welcome.

### Apartados nuevos (9)

sup-ui-dock, sup-platform-search, sup-platform-components, sup-dem-resilience, sup-grail-buckets, sup-grail-permissions, sup-hub-extensions, sup-document-sharing, sup-problems-app

### Ficha de precisión

Auditoría final: permiso de dt.system.buckets precisado (storage:bucket-definitions:read, Grail data model), Contents es de la ficha de una app (Dynatrace Hub) y management zone es Classic (Permissions in Grail). v6: filas de app-engine:apps:run (R-PLA-48) y segments frente a management zones (R-PLA-49). v5: IAM ya no afirma que falte un permiso produzca un error, que la doc no especifica.

## 04 Monitoring & Infrastructure Observability

### Preguntas corregidas (36)

- **A-007**: Se quita el absoluto de un distractor y se cita la condición de licencia literal.
- **A-009**: Distractores sin absolutos y explicación con la cita literal.
- **A-010**: Dificultad ajustada: recuerdo de un valor literal de la CLI.
- **A-011**: Formato de respuesta múltiple con "(Selecciona 2)" y explicación con la cita literal.
- **A-012**: Se quita el absoluto del distractor D y se precisa la explicación con la tabla.
- **A-013**: Distractores sin absolutos y distractor C sustituido por una confusión plausible (logs frente a process injection).
- **A-014**: Verificado contra la tabla vigente: se citan los valores literales y se añade estímulo.
- **A-015**: Explicación verificada y distractores equilibrados en longitud.
- **A-016**: Distractores sin absolutos y cita literal de la CLI.
- **B-010**: Distractores inverosímiles (conexión entrante, cambio a Discovery) sustituidos por confusiones plausibles; explicación con citas literales.
- **B-015**: Distractores sin absolutos y explicación ampliada.
- **B-016**: Reorientada: los distractores anteriores eran inverosímiles; ahora se evalúa el almacenamiento de logs frente a confusiones plausibles (retención, CLI, métricas).
- **C-006**: Distractores sin "sólo"/"únicamente" y cita literal. Auditoría final: la opción C se autodescartaba por su coletilla; se sustituye por un distractor plausible (proxy inverso).
- **C-007**: Distractores sin absolutos y clave acortada.
- **D-006**: Distractores sin absolutos; la clave conserva "cualquiera", que es literal en la documentación.
- **D-007**: Distractores sin "únicamente/sólo" y explicación con la lista documentada.
- **D-008**: Distractores sin "Sólo" para no delatar la clave.
- **E-008**: Explicación ampliada con la cita literal y la refutación de cada distractor.
- **E-009**: Distractores sin "por sí solo" y clave con el nombre de la capacidad.
- **E-010**: Distractores sin "Sólo" y términos de producto en inglés (baseline, response time).
- **E-012**: Distractores sin "Sólo".
- **FO-001**: Versión conservada del concepto (A-008 retirada); terminología Full-Stack.
- **FO-002**: El distractor "Full stack con instrumentación desactivada" era defendible; se sustituye por afirmaciones falsas verificables y se cita la tabla.
- **FO-005**: Se quita el absoluto del distractor D y se acorta la clave.
- **FO-009**: Distractor D poco plausible sustituido; explicación con cita literal.
- **FO-010**: Explicación con la cita literal sobre Managed y Kubernetes Classic.
- **FO-011**: Distractores sin "sólo".
- **FO-012**: La definición exacta de "partially active" no está documentada; se reformula sobre lo verificable.
- **FO-014**: Distractor sin "sólo" y cita literal.
- **G-024**: Serie G: distractores plausibles y clave sin pista de longitud.
- **G-028**: Error: no es cierto que siempre se use 443; hacia Environment ActiveGate el puerto por defecto es 9999.
- **G-031**: Serie G: distractores con sintaxis plausible.
- **G-034**: Revisar: el síntoma original (eventos) no dependía de la causa; se corrige el caso y los distractores.
- **G-037**: Serie G: distractores con sintaxis coherente.
- **G-038**: Serie G: distractores plausibles; función verificada en la documentación.
- **G-039**: Serie G: el detalle RBAC no está documentado en la fuente; se reformula sobre la cobertura verificable.

### Preguntas retiradas (30)

- **A-006**: Duplicado de R-OBS-01 (inyección automática de Infrastructure para backing services Java y runtime metrics); la ausencia de tracing queda en FO-001/FO-002.
- **B-009**: Duplicado de A-011 (comunicación saliente de OneAgent, directa o vía ActiveGate).
- **B-012**: Duplicado de A-010 (valores literales de --set-monitoring-mode).
- **B-014**: Duplicado de FO-010 (prerrequisitos Grail/AppEngine de la nueva app Kubernetes) y con distractores "sin…" que delataban la clave.
- **C-008**: Duplicado de G-034 (ActiveGate 1.327+ para Enhanced Object Visibility).
- **D-005**: Duplicado de G-034 (pestaña Explorer (Classic) con ActiveGate anterior a 1.327).
- **FO-003**: Duplicado de A-012 (Discovery sin el detalle de proceso, disco y red de Infrastructure).
- **FO-007**: Duplicado de A-011 (ActiveGate como punto intermedio de la comunicación saliente).
- **FO-015**: Cuarta pregunta sobre ActiveGate 1.327/Explorer (Classic); el concepto queda en G-034.
- **G-022**: Trivial: recordar el nombre del binario; el uso de oneagentctl se evalúa en R-OBS-23, G-031 y G-037.
- **G-023**: Duplicado de A-010 (valores literales de --set-monitoring-mode).
- **G-025**: Duplicado de A-007 y R-OBS-24 (Discovery con DPS y la capability Foundation & Discovery).
- **G-027**: Duplicado de R-OBS-01 (process injection opt-out en Infrastructure).
- **G-030**: Duplicado de R-OBS-19 y R-OBS-06 (cloudNativeFullStack con mutating webhooks).
- **G-033**: Duplicado de A-009 (el módulo inyectado permanece hasta reiniciar el proceso).
- **G-036**: Duplicado de A-015 (desactivar la inyección impide vulnerabilidades y Live Debugger) y ambigua con procesos ya instrumentados.
- **A-008**: Duplicado de FO-001 (Full-Stack para tracing y profiling); se conserva FO-001.
- **B-011**: Duplicado de A-012 (Discovery sin detalles de proceso y red).
- **B-013**: Duplicado de A-009 (reinicio del proceso para retirar el módulo).
- **E-011**: Duplicado de R-OBS-01 (inyección en Infrastructure para runtime metrics).
- **FO-004**: Duplicado de A-013 (Log Management opt-in en Discovery).
- **FO-006**: Duplicado de A-011 (comunicación saliente de OneAgent).
- **FO-008**: Duplicado de C-005 (WebSocket de Live Debugger).
- **FO-013**: Duplicado de C-007 (Health alert frente a Warning signal).
- **G-021**: Duplicado de G-034 (ActiveGate 1.327+).
- **G-026**: Duplicado de A-012 (alcance de Discovery).
- **G-029**: Tercera pregunta sobre el WebSocket de Live Debugger (C-005).
- **G-032**: Duplicado de A-015 (Application Security en Discovery).
- **G-035**: Duplicado de E-008 y con terminología incorrecta ("OneAgent SDK for Mobile").
- **G-040**: Sin respaldo literal ("recomendación oficial"); la elección de modo queda cubierta por FO-001, FO-002 y R-OBS-24.

### Preguntas nuevas (57)

R-OBS-01, R-OBS-02, R-OBS-03, R-OBS-04, R-OBS-05, R-OBS-06, R-OBS-07, R-OBS-08, R-OBS-09, R-OBS-10, R-OBS-11, R-OBS-12, R-OBS-13, R-OBS-14, R-OBS-15, R-OBS-16, R-OBS-17, R-OBS-18, R-OBS-19, R-OBS-20, R-OBS-21, R-OBS-22, R-OBS-23, R-OBS-24, R-OBS-25, R-OBS-26, R-OBS-27, R-OBS-28, R-OBS-29, R-OBS-30, R-OBS-31, R-OBS-32, R-OBS-33, R-OBS-34, R-OBS-35, R-OBS-36, R-OBS-37, R-OBS-38, R-OBS-39, R-OBS-40, R-OBS-41, R-OBS-42, R-OBS-43, R-OBS-44, R-OBS-45, R-OBS-46, R-OBS-47, R-OBS-48, R-OBS-49, R-OBS-50, R-OBS-51, R-OBS-52, R-OBS-53, R-OBS-54, R-OBS-55, R-OBS-56, R-OBS-57

### Apartados ampliados o corregidos (13)

- **deep-observability-troubleshooting**: R-OBS-54: autodiscovery, custom log sources y log ingest rules (https://docs.dynatrace.com/docs/analyze-explore-automate/logs/lma-log-ingestion/lma-log-ingestion-via-oa).
- **oneagent-capabilities**: Cubre E-007, E-009, E-010, E-012, D-008 y R-OBS-40 (contenedores, llamadas a bases de datos, baseline, topología, red por proceso y estados de la support matrix).
- **oneagent-architecture**: Cubre G-038 y R-OBS-29 (Watchdog y non-privileged mode), C-005 (WebSocket de Live Debugger) y B-010 (varios ActiveGates).
- **monitoring-modes**: La tabla decía "No indicado" o "No equivalente" donde la oficial muestra "—"; se añaden custom metrics y host criticality (A-007, A-012, A-014, FO-002, R-OBS-01, R-OBS-37, R-OBS-38).
- **enable-modes**: Se precisa la desactivación de auto-injection por host (R-OBS-13) y se deja la precedencia host > entorno donde la documenta Dynatrace: en la sección Disable selected extensions (JMX/PMI). Se añade la Settings API (R-OBS-32). Se añade que Infrastructure inyecta por defecto para descartar distractores de R-OBS-13 (https://docs.dynatrace.com/docs/platform/oneagent/monitoring-modes/enable-monitoring-modes).
- **activegate**: Respalda R-OBS-46 (Run synthetic monitors desde private Synthetic locations) y R-OBS-45 (Route OneAgent traffic y Monitor cloud environments and remote technologies). Fuente: https://docs.dynatrace.com/docs/ingest-from/dynatrace-activegate
- **topology**: Respalda R-OBS-47 (Problem que reúne varios Davis events; la mayoría de events no forman parte de ninguno). Fuente: https://docs.dynatrace.com/docs/dynatrace-intelligence/root-cause-analysis/concepts
- **kubernetes-db**: Respalda R-OBS-49 ("The sidebar groups all Kubernetes objects by type"). Fuente: https://docs.dynatrace.com/docs/observe/infrastructure-observability/kubernetes-app
- **deep-infrastructure-connectors**: Respalda R-OBS-53 ("Access data from hosts running OneAgent for deeper analysis of resource dependencies"; statements y execution plans los aporta la extensión). Fuente: https://docs.dynatrace.com/docs/observe/infrastructure-observability/databases
- **injection**: Cubre R-OBS-10 (estados de Deployment Status), R-OBS-39 (process monitoring rules) y R-OBS-42 (web servers con runtime metrics).
- **deep-oneagent-capabilities**: "Host Monitoring mode" no es un modo actual de OneAgent y la frase contradecía la inyección opt-out de Infrastructure.
- **deep-oneagent-architecture**: Error: no todo el tráfico va por 443; los Environment ActiveGates reciben conexiones en el puerto 9999 (G-028).
- **deep-oneagent-modes**: Se alinea la tabla con la oficial: Host process details es GA en Full-Stack e Infrastructure y "—" en Discovery; tracing/profiling y process injection son "—" fuera de lo indicado.

### Apartados nuevos (8)

sup-mode-licensing, sup-activegate-routing, sup-process-groups, sup-davis-problems, sup-oneagentctl, sup-dynakube-modes, sup-kubernetes-app, sup-infra-apps

### Ficha de precisión

R-OBS-57: un OneAgent por host es necesario para traces y detalles de proceso; ActiveGate es proxy y monitorización remota por API (Dynatrace ActiveGate; https://docs.dynatrace.com/docs/ingest-from/dynatrace-oneagent). R-OBS-55: dónde se cambia el modo de un host instalado desde la web UI (Enable OneAgent monitoring modes). Auditoría final: --set-auto-injection-enabled actúa a nivel de host (la exclusión de procesos va por custom process monitoring rules); Tracing and profiling es "—" en Discovery; oneagentctl exige root/administrador para ejecutarse, no solo para modificar.

## 05 Notebooks & Dashboards

### Preguntas corregidas (45)

- **A-036**: Auditoría v3: la clave era la única opción sin justificación; opciones paralelas de igual estructura.
- **A-039**: Auditoría v3: clave escueta frente a distractores justificados y distractor absurdo (Markdown que ejecuta DQL).
- **A-041**: Auditoría v3: distractores absurdos (retención, permisos IAM) sustituidos por ajustes reales del Dashboard.
- **A-042**: Auditoría v3: explicación que desmonta cada distractor.
- **E-013**: Auditoría v3: explicación que desmonta cada distractor.
- **B-019**: Auditoría v3: explicación que desmonta cada distractor.
- **B-020**: Auditoría v3: explicación que desmonta cada distractor.
- **B-024**: Auditoría v3: explicación que desmonta cada distractor.
- **C-010**: Auditoría v3: distractor A (DQL sin consulta) poco plausible; explicación que desmonta cada opción.
- **D-012**: Auditoría v3: explicación que desmonta cada distractor.
- **D-010**: Auditoría v3: explicación que desmonta cada distractor.
- **E-016**: Auditoría v3: explicación que desmonta cada distractor.
- **FN-007**: Auditoría: distractores débiles ("siempre", opción inventada); nombre real del tile (Query).
- **FN-009**: Auditoría: distractores obvios sustituidos por confusiones reales de estructura JSON.
- **FN-011**: Auditoría (Revisar): verificado el literal "Create DQL section" en la documentación de Notebooks.
- **FN-013**: Auditoría v3: explicación que desmonta cada distractor.
- **FN-002**: Auditoría v3: explicación que desmonta cada distractor.
- **FN-016**: Auditoría v3: la clave repetía "automáticamente" y era la más larga.
- **FN-018**: Auditoría v3: explicación que desmonta cada distractor.
- **C-011**: Auditoría v3: distractores absurdos (guardar una DQL, duplicar y borrar) sustituidos por confusiones reales.
- **C-009**: Auditoría v3: enunciado más claro y explicación que desmonta cada distractor.
- **A-038**: Se conserva como versión única de la clave derivada; nombre de ejemplo sin caracteres acentuados y clave sin pista de longitud.
- **G-041**: Auditoría: distractores absurdos sustituidos; se corrige la omisión de Explore y la asociación Markdown–anotaciones.
- **G-042**: Auditoría (Revisar): Notebooks no documenta variables; se reorienta a una restricción verificada de variables en tiles Code de Dashboards.
- **G-044**: Auditoría: distractores absurdos sustituidos por confusiones reales (Classic vs Latest, Settings API).
- **G-045**: Auditoría (Revisar): no está documentado que se propaguen las variables; clave ajustada a campos y timeframe y distractores técnicos.
- **G-046**: Auditoría (Revisar): confundía anotaciones con Markdown; se pregunta por el mapeo verificado de campos.
- **G-047**: Auditoría: pregunta trivial con distractores absurdos; se convierte en escenario con acciones reales de sección.
- **G-051**: Auditoría: distractores absurdos; se elimina "secuencialmente", que la documentación no afirma. Auditoría final: el timeframe es por sección (o fijado para varias seleccionadas), no global del Notebook.
- **G-052**: Auditoría: distractores absurdos y "petabytes"; escenario concreto con recomendaciones verificadas.
- **G-053**: Auditoría: distractores absurdos; terminología "sección Code" en Notebooks.
- **G-056**: Auditoría v3: el enunciado atribuía la activación al owner sin respaldo; explicación completada.
- **G-057**: Auditoría: distractores absurdos sustituidos por comandos DQL reales.
- **G-058**: Auditoría v3: trivial (Single value para un número); ahora evalúa el comportamiento documentado con varias filas.
- **G-059**: Auditoría (Revisar): verificado que Notebooks soporta anotaciones; distractores absurdos sustituidos.
- **D-009**: Auditoría v3: distractores descartables sin conocer el producto sustituidos por vías que requieren escritura.
- **B-021**: Auditoría v3: explicación que desmonta cada distractor.
- **B-023**: Auditoría v3: explicación que desmonta cada distractor.
- **E-014**: Auditoría v3: explicación que desmonta cada distractor.
- **FN-001**: Auditoría v3: explicación que desmonta cada distractor.
- **FN-008**: Auditoría v3: explicación que desmonta cada distractor.
- **FN-010**: Auditoría v3: explicación que desmonta cada distractor.
- **FN-015**: Auditoría v3: explicación que desmonta cada distractor.
- **FN-017**: Auditoría v3: distractor D poco plausible y explicación que desmonta cada opción.
- **FN-019**: Auditoría v3: explicación que desmonta cada distractor.

### Preguntas retiradas (23)

- **E-015**: Duplicado de A-038 (clave derivada de variable).
- **FN-003**: Duplicado de A-038 (clave derivada de variable).
- **E-017**: Duplicado de R-NOT-11 (timeframe deshabilitado cuando la DQL lo define).
- **G-043**: Duplicado de C-009 (prefijo reservado dt_) con distractores absurdos.
- **G-048**: Duplicado de E-014 (dependencias circulares) con distractores absurdos.
- **FN-014**: Duplicado de B-023 (enlace a sección con #) con distractores más débiles.
- **B-022**: Duplicado de G-053 (sección Code para Dynatrace functions).
- **FN-006**: Duplicado de C-010 (Multi-select); el uso en DQL se cubre en R-NOT-01.
- **G-049**: Afirmaciones del editor DQL no verificables; sustituida por R-NOT-16.
- **G-054**: Comportamiento responsive/móvil no documentado.
- **G-060**: Pregunta de opinión ("regla de oro") sin valor de producto.
- **A-037**: Duplicado de R-NOT-11 (timeframe definido en la DQL deshabilita el selector).
- **A-040**: Duplicado de G-053 (la sección Code ejecuta JavaScript como Dynatrace function).
- **B-017**: Duplicado de R-NOT-11 (el Custom timeframe del tile prevalece sobre el global).
- **B-018**: Duplicado de R-NOT-11 (timeframe definido en la DQL del tile).
- **C-012**: Duplicado de G-059 (anotaciones de despliegues sobre un gráfico).
- **D-011**: Duplicado de R-NOT-19 (refresh rate inicial Off y persistencia).
- **E-018**: Duplicado de A-036 y G-053 (tipos de sección) con distractores evidentes.
- **FN-004**: Duplicado de G-042 (variables en tiles Code).
- **FN-005**: Duplicado de C-010 (variable List para valores fijos).
- **FN-012**: Duplicado de R-NOT-10 (formatos de Download result) con formatos inventados.
- **G-050**: Duplicado de R-NOT-02 y R-NOT-03 (alcance de Can view, Can edit y owner).
- **G-055**: Duplicado de R-NOT-09 y R-NOT-10 (métodos de sharing y formatos de descarga).

### Preguntas nuevas (53)

R-NOT-01, R-NOT-02, R-NOT-03, R-NOT-04, R-NOT-05, R-NOT-06, R-NOT-07, R-NOT-08, R-NOT-09, R-NOT-10, R-NOT-11, R-NOT-12, R-NOT-13, R-NOT-14, R-NOT-15, R-NOT-16, R-NOT-17, R-NOT-18, R-NOT-19, R-NOT-20, R-NOT-21, R-NOT-22, R-NOT-23, R-NOT-24, R-NOT-25, R-NOT-26, R-NOT-27, R-NOT-28, R-NOT-29, R-NOT-30, R-NOT-31, R-NOT-32, R-NOT-33, R-NOT-34, R-NOT-35, R-NOT-36, R-NOT-37, R-NOT-38, R-NOT-39, R-NOT-40, R-NOT-41, R-NOT-42, R-NOT-43, R-NOT-44, R-NOT-45, R-NOT-46, R-NOT-47, R-NOT-48, R-NOT-49, R-NOT-50, R-NOT-51, R-NOT-52, R-NOT-53

### Apartados ampliados o corregidos (12)

- **choose**: R-NOT-08 y R-NOT-16 (casos de uso y almacenamiento de datos según la comparación oficial).
- **dashboard**: Respalda R-NOT-35. Fuente: https://docs.dynatrace.com/docs/analyze-explore-automate/dashboards-and-notebooks/differences-dashboards-notebooks
- **quality**: Respalda R-NOT-36 y R-NOT-37 (samplingRatio). Fuentes: https://docs.dynatrace.com/docs/platform/grail/dynatrace-query-language/commands/data-source-commands y https://docs.dynatrace.com/docs/platform/grail/dynatrace-query-language/dql-best-practices
- **notebook-cells**: Respalda R-NOT-38 (timeframe absoluto en fetch; "If the timeframe is defined in the query itself, the dropdown list is disabled"). Fuentes: https://docs.dynatrace.com/docs/platform/grail/dynatrace-query-language/commands/data-source-commands y https://docs.dynatrace.com/docs/analyze-explore-automate/dashboards-and-notebooks/notebooks
- **visualizations**: Respalda R-NOT-39 (interval y bins excluyentes) y R-NOT-40 (default). Fuente: https://docs.dynatrace.com/docs/platform/grail/dynatrace-query-language/commands/aggregation-commands
- **variables-sharing**: Respalda R-NOT-41 ("Adding variables in Explore tiles only works for single-select variables in combination with the = operator", https://docs.dynatrace.com/docs/analyze-explore-automate/dashboards-and-notebooks/dashboards-new/components/dashboard-component-variable) y R-NOT-42 (nonempty, https://docs.dynatrace.com/docs/platform/grail/dynatrace-query-language/commands/aggregation-commands).
- **dashboard-operations**: Respalda R-NOT-43. Fuente: https://docs.dynatrace.com/docs/analyze-explore-automate/dashboards-and-notebooks/dashboards-new
- **sharing-governance**: Respalda R-NOT-44. Fuente: https://docs.dynatrace.com/docs/analyze-explore-automate/dashboards-and-notebooks/notebooks
- **deep-notebook-sections**: La lección atribuía variables a Notebooks y TypeScript a las secciones Code; la documentación de Notebooks describe secciones Code en JavaScript y no documenta variables. Auditoría final: faltaba la sección Prompt y "anotaciones" en Markdown se confundía con Annotations (que se configuran sobre gráficos). Orphans: la documentación de Markdown en Notebooks describe texto, tablas, código, enlaces e imágenes, pero no fórmulas.
- **deep-dashboard-model**: R-NOT-48: permisos de tabla en Grail (https://docs.dynatrace.com/docs/platform/grail/organize-data/assign-permissions-in-grail). Las anotaciones no son tiles Markdown (se superponen a gráficos Line, Area y Bar) y la restricción dt_ se aplica a la clave de la variable. Auditoría final: la lista de tipos de tile omitía Explore y Code.
- **deep-analysis-recipe**: Un Notebook tiene secciones, no tiles; la acción documentada es Add to dashboard. R-NOT-50: limit antes de agregar (https://docs.dynatrace.com/docs/platform/grail/dynatrace-query-language/dql-best-practices).
- **deep-document-sharing**: La documentación afirma que al cambiar el owner pierdes el acceso de inmediato (R-NOT-18). R-NOT-49: permisos para consultar logs (https://docs.dynatrace.com/docs/platform/grail/organize-data/assign-permissions-in-grail).

### Apartados nuevos (8)

sup-notebook-section-actions, sup-dashboard-tiles-timeframe, sup-dashboard-variables, sup-dashboard-json, sup-annotations, sup-visualization-types, sup-navigation-links, sup-sharing-methods

### Ficha de precisión

R-NOT-53: permisos de papelera de Notebooks. Auditoría final: la ficha decía que las anotaciones son tiles Markdown, que Notebooks tiene variables y que los drilldowns pasan variables; se alinea con la documentación de Dashboards, variables, anotaciones y Drilldowns and navigation.

## 06 Business Analytics and DEM

### Preguntas corregidas (42)

- **A-033**: Equilibrio de absolutos: se quitan absolutos de distractores. v3: explicación que justifica la clave y desmonta cada distractor.
- **C-013**: Equilibrio de absolutos: se quitan absolutos de distractores. v3: explicación que justifica la clave y desmonta cada distractor.
- **D-013**: Equilibrio de absolutos: se quitan absolutos de distractores. v3: explicación que justifica la clave y desmonta cada distractor. v4: distractores poco plausibles (monitor privado, frecuencia, nombre del paso) sustituidos por alternativas técnicas creíbles.
- **E-023**: Equilibrio de absolutos: se quitan absolutos de distractores. v3: explicación que justifica la clave y desmonta cada distractor.
- **FB-012**: Equilibrio de absolutos: se quitan absolutos de distractores. v3: explicación que justifica la clave y desmonta cada distractor.
- **FB-013**: Equilibrio de absolutos: se quitan absolutos de distractores. v3: explicación que justifica la clave y desmonta cada distractor.
- **FB-015**: Equilibrio de absolutos: se quitan absolutos de distractores. v3: explicación que justifica la clave y desmonta cada distractor.
- **FB-016**: Equilibrio de absolutos: se quitan absolutos de distractores. v3: explicación que justifica la clave y desmonta cada distractor.
- **FB-018**: Equilibrio de absolutos: se quitan absolutos de distractores. v3: explicación que justifica la clave y desmonta cada distractor.
- **D-016**: Equilibrio de absolutos: la clave expresa el absoluto que la documentación sí afirma. v3: explicación que justifica la clave y desmonta cada distractor.
- **FB-007**: Equilibrio de absolutos: la clave expresa el absoluto que la documentación sí afirma. v3: explicación que justifica la clave y desmonta cada distractor.
- **D-014**: Distractor throw new Error defendible; se acota a la API de scripting y se usan métodos reales con otra función.
- **G-063**: Serie G: distractores con límites vecinos plausibles y fuente Latest.
- **G-064**: Serie G: distractor absurdo ("infinitos días") sustituido por límites plausibles.
- **G-065**: Serie G: distractores sustituidos por métodos reales de dtrum con otra función.
- **G-068**: Serie G: distractores absurdos sustituidos; terminología en inglés (capture rules).
- **G-069**: Serie G: distractores absurdos sustituidos por alternativas plausibles.
- **G-070**: Serie G: definición ajustada a la doc (user action o navegación) y distractores plausibles.
- **G-071**: Serie G: distractores absurdos sustituidos por confusiones reales entre apps.
- **G-072**: Serie G: distractores absurdos sustituidos; fuente corregida (antes citaba clickpath steps).
- **G-074**: Serie G: distractores sustituidos por endpoints reales de ingesta vecinos.
- **G-076**: Serie G: distractores absurdos sustituidos; opción verificada (Disable synthetic monitor execution) y fuente corregida.
- **G-077**: Serie G: dato ajustado a la doc (sin "milisegundos") y distractores plausibles.
- **G-078**: Serie G: metaconocimiento genérico convertido en caso concreto con mecanismos de Dynatrace.
- **G-079**: Serie G: distractores absurdos sustituidos y fuente corregida.
- **A-028**: v3: la clave añadía una condición no documentada ("si está habilitada la captura"); distractores plausibles y explicación que los desmonta.
- **A-029**: v3: explicación genérica sustituida por definiciones verificadas; distractor con "sólo" reescrito.
- **A-030**: v3: distractores incoherentes (HTTP "con clics", clickpath sin pasos) sustituidos por alternativas plausibles.
- **A-032**: v3: la clave era la única opción sin justificación; opciones equilibradas y distractores del mismo modelo de datos.
- **A-035**: v3: distractores absurdos (umbral o frecuencia que cambian el selector) sustituidos por confusiones reales.
- **B-031**: v3: distractores inventados (process_properties, log_properties) sustituidos por campos reales de RUM; absorbe FB-004. v4: distractores C y D eran campos sueltos, no namespaces; sustituidos por namespaces reales de user.sessions.
- **C-014**: v3: distractores con absolutos ("siempre", "toda transición") sustituidos por otros user events plausibles.
- **C-016**: v3: distractor con "sólo… automáticamente" sustituido; explicación que desmonta cada opción.
- **E-021**: v3: distractores con "exclusivamente/únicamente" y clasificaciones absurdas sustituidos.
- **E-024**: v3: distractores absurdos sustituidos por variantes cercanas a la regla documentada.
- **FB-014**: v3: distractores implausibles (timeframe, smartscape ID) sustituidos por confusiones reales de tipo.
- **G-073**: v3: el distractor "sin errores JavaScript" chocaba con la regla de errores → Frustrated; la explicación decía "no mide errores".
- **FB-003**: v3: explicación que nombra los campos reales y desmonta cada distractor.
- **D-015**: v3: explicación que justifica la clave y desmonta cada distractor.
- **FB-001**: v3: explicación que justifica la clave y desmonta cada distractor.
- **FB-002**: v3: explicación que justifica la clave y desmonta cada distractor.
- **FB-011**: v3: explicación que justifica la clave y desmonta cada distractor.

### Preguntas retiradas (26)

- **A-031**: v3: trivial (la página inicial depende del Navigate) y solapada con E-024 y A-035.
- **A-034**: v3: duplicado de R-BIZ-10 (RUM frente a Synthetic), que lo evalúa con escenarios.
- **B-025**: v3: duplicado de R-BIZ-19 (user.events frente a user.sessions).
- **B-026**: v3: duplicado de R-BIZ-19 (user.sessions resume eventos en un periodo limitado).
- **B-032**: v3: duplicado de R-BIZ-20, que evalúa el enriquecimiento RUM con campos verificados.
- **C-015**: v3: duplicado de G-063 y G-064 (cierre de sesión) con distractores absolutos.
- **FB-004**: v3: duplicado de B-031 (event_properties frente a session_properties).
- **FB-008**: v3: duplicado de G-074 (Business events API para sistemas sin OneAgent).
- **FB-009**: v3: duplicado de R-BIZ-25 (Business Events desde spans en OpenPipeline).
- **FB-010**: v3: duplicado de D-015 (event.provider como fuente del evento).
- **B-027**: Duplicado de A-032 (user action agrupa eventos); la duración se cubre en FB-001.
- **E-022**: Duplicado de A-032 (función de la user action).
- **B-028**: Duplicado de A-028 (interacción sin request).
- **E-020**: Duplicado de A-028 (interacción sin request).
- **B-029**: Duplicado de A-035 y con distractores delatores ("Sólo ... sin revisar").
- **B-030**: Duplicado de A-030 (clickpath multi-paso).
- **E-019**: Duplicado de R-BIZ-19 (user.events vs user.sessions).
- **G-061**: Duplicado de R-BIZ-19 con distractores absurdos.
- **FB-005**: Duplicado de B-031 (session_properties).
- **FB-006**: Duplicado de C-016 (user identifier vía OpenPipeline).
- **FB-017**: Duplicado de E-023 (Click vs Navigate).
- **G-062**: Duplicado de D-014 (api.fail).
- **G-066**: Duplicado de D-015 (event.provider y event.type).
- **G-067**: Duplicado de R-BIZ-20; los campos de enriquecimiento se cubren en R-BIZ-20 con datos verificados.
- **G-075**: Duplicado de FB-007 (límite de 200 acciones de Classic).
- **G-080**: Metaconocimiento comercial que no mide producto.

### Preguntas nuevas (62)

R-BIZ-01, R-BIZ-02, R-BIZ-03, R-BIZ-04, R-BIZ-05, R-BIZ-06, R-BIZ-07, R-BIZ-08, R-BIZ-09, R-BIZ-10, R-BIZ-11, R-BIZ-12, R-BIZ-13, R-BIZ-14, R-BIZ-15, R-BIZ-16, R-BIZ-17, R-BIZ-18, R-BIZ-19, R-BIZ-20, R-BIZ-21, R-BIZ-22, R-BIZ-23, R-BIZ-24, R-BIZ-25, R-BIZ-26, R-BIZ-27, R-BIZ-28, R-BIZ-29, R-BIZ-30, R-BIZ-31, R-BIZ-32, R-BIZ-33, R-BIZ-34, R-BIZ-35, R-BIZ-36, R-BIZ-37, R-BIZ-38, R-BIZ-39, R-BIZ-40, R-BIZ-41, R-BIZ-42, R-BIZ-43, R-BIZ-44, R-BIZ-45, R-BIZ-46, R-BIZ-47, R-BIZ-48, R-BIZ-49, R-BIZ-50, R-BIZ-51, R-BIZ-52, R-BIZ-53, R-BIZ-54, R-BIZ-55, R-BIZ-56, R-BIZ-57, R-BIZ-58, R-BIZ-59, R-BIZ-60, R-BIZ-61, R-BIZ-62

### Apartados ampliados o corregidos (9)

- **deep-rum-session-semantics**: La documentación de user sessions web cita el cierre del navegador, no el de una pestaña (G-063, G-064, G-065). v4: dt.rum.session.id permite contar sesiones desde user.events (R-BIZ-27), así que no es un error de examen. v5: se aclara a qué nivel aplica cada regla: las cuatro condiciones de web frontends (documentadas igual en la nueva experiencia RUM y en RUM Classic) frente a los valores de end_reason de user.sessions.
- **deep-synthetic-semantics**: Precisión sobre api.fail(): la doc indica que marca la ejecución como fallida (D-014). v6: api.info/warn/error solo registran en el log (R-BIZ-57).
- **deep-business-event-model**: v5: la doc de conceptos básicos define long-term como «The event retention period is up to ten years» (R-BIZ-51); los buckets custom de Grail admiten de 1 día a 10 años. v7: stage Permission con Set dt.security_context (R-BIZ-52), https://docs.dynatrace.com/docs/platform/openpipeline/concepts/processing
- **capture-process**: v7: qué vía de captura corresponde a web, app nativa y cliente propio sin navegador (R-BIZ-41), https://docs.dynatrace.com/docs/observe/business-observability/bo-events-capturing/web-and-mobile-rum
- **business-quality**: v7: el masking ocurre antes de almacenar y es irreversible para lo ya guardado (R-BIZ-48), https://docs.dynatrace.com/docs/platform/openpipeline/concepts/processing
- **business-troubleshooting**: v7: tabla bizevents y permiso storage:bizevents:read (R-BIZ-49, R-BIZ-50), https://docs.dynatrace.com/docs/platform/grail/organize-data/assign-permissions-in-grail
- **deep-business-capture**: v7: campos de enriquecimiento de OneAgent frente a RUM (R-BIZ-54), https://docs.dynatrace.com/docs/observe/business-observability/bo-events-enrichment
- **deep-business-journeys**: v7: correlation ID y cálculo de la conversión (R-BIZ-59), https://docs.dynatrace.com/docs/observe/business-observability/business-flow
- **journeys**: v4: el Logs and events viewer es de Dynatrace Classic; en Latest los Business Events se exploran con DQL en Notebooks, Dashboards y apps como Business Flow.

### Apartados nuevos (9)

sup-rum-data-model, sup-rum-sessions-web, sup-rum-classic, sup-synthetic-monitors, sup-clickpath-steps, sup-bizevents-api, sup-bizevents-capture-sources, sup-business-flow, sup-bizevents-governance

### Ficha de precisión

v5: Session lifecycle distingue las condiciones de fin de web frontends del campo end_reason de user.sessions. v4: los recuentos de sesiones también se obtienen desde user.events con countDistinct(dt.rum.session.id), el campo documentado para unir user events y user sessions (R-BIZ-27).

## 07 Data, Reporting & Analysis

### Preguntas corregidas (43)

- **A-061**: Equilibrio de absolutos: se quitan "sólo/automáticamente/cualquier" de los distractores para que no delaten la clave. Auditoría final: distractor B sin base (orden de secciones Query/Explore) sustituido por una confusión real con el muestreo de fetch.
- **A-062**: Equilibrio de absolutos: se quitan "sólo/automáticamente/cualquier" de los distractores para que no delaten la clave.
- **A-063**: Equilibrio de absolutos: se quitan "sólo/automáticamente/cualquier" de los distractores para que no delaten la clave. Redacción alineada con la documentación ("will delete the data").
- **A-064**: Equilibrio de absolutos: se quitan "sólo/automáticamente/cualquier" de los distractores para que no delaten la clave.
- **A-065**: Equilibrio de absolutos: se quitan "sólo/automáticamente/cualquier" de los distractores para que no delaten la clave. Distractores C y D autodesmontables sustituidos por alternativas plausibles que resuelven solo uno de los dos requisitos.
- **B-033**: Equilibrio de absolutos: se quitan "sólo/automáticamente/cualquier" de los distractores para que no delaten la clave.
- **B-036**: Equilibrio de absolutos: se quitan "sólo/automáticamente/cualquier" de los distractores para que no delaten la clave.
- **B-038**: Equilibrio de absolutos: se quitan "sólo/automáticamente/cualquier" de los distractores para que no delaten la clave. Auditoría final: distractores C y D inverosímiles sustituidos por confusiones reales (rango de retención, 15 meses).
- **C-020**: Equilibrio de absolutos: se quitan "sólo/automáticamente/cualquier" de los distractores para que no delaten la clave.
- **D-017**: Equilibrio de absolutos: se quitan "sólo/automáticamente/cualquier" de los distractores para que no delaten la clave. Distractor D absurdo (recuperar datos fuera de retención) sustituido.
- **E-025**: Equilibrio de absolutos: se quitan "sólo/automáticamente/cualquier" de los distractores para que no delaten la clave.
- **E-028**: Verificada la definición de count (cardinalidad por slot); clave correcta. Equilibrio de absolutos: se quitan "sólo/automáticamente/cualquier" de los distractores para que no delaten la clave.
- **FD-001**: Equilibrio de absolutos: se quitan "sólo/automáticamente/cualquier" de los distractores para que no delaten la clave.
- **FD-002**: Equilibrio de absolutos: se quitan "sólo/automáticamente/cualquier" de los distractores para que no delaten la clave.
- **FD-004**: Equilibrio de absolutos: se quitan "sólo/automáticamente/cualquier" de los distractores para que no delaten la clave.
- **FD-010**: Equilibrio de absolutos: se quitan "sólo/automáticamente/cualquier" de los distractores para que no delaten la clave.
- **FD-012**: Equilibrio de absolutos: se quitan "sólo/automáticamente/cualquier" de los distractores para que no delaten la clave. Auditoría final: la clave era la única opción sin justificación; añadida para igualar la estructura.
- **FD-013**: Añadido el efecto documentado (drop). Equilibrio de absolutos: se quitan "sólo/automáticamente/cualquier" de los distractores para que no delaten la clave.
- **FD-015**: Equilibrio de absolutos: se quitan "sólo/automáticamente/cualquier" de los distractores para que no delaten la clave.
- **FD-020**: Equilibrio de absolutos: se quitan "sólo/automáticamente/cualquier" de los distractores para que no delaten la clave.
- **A-066**: Distractores descartables (cola hasta el primer Dashboard) sustituidos por errores plausibles.
- **B-034**: Clave tautológica ("comparar la retención"); reformulada para exigir la cifra de default_spans (absorbe G-086). Auditoría final: coletilla de D que mezclaba Classic sustituida.
- **B-035**: Distractores descartables y explicación confusa; reescritos.
- **B-037**: Distractor absurdo (renombrar Dashboard) sustituido; matiz del display name añadido.
- **B-040**: Verificado el 409 en la documentación; distractores mejorados.
- **C-018**: Opción A vaga y solapada con FD-020/B-037/B-035; reescrita para evaluar el rango de retención y el display name.
- **B-039**: Distractores autodesmontables ("porque también permite editar", "que implica escritura") y absurdo (Dashboard) sustituidos por permisos reales.
- **D-019**: Equilibrio de longitudes: la clave era la opción más larga.
- **D-020**: Distractor count poco plausible sustituido por percentRank (confusión real con percentile); longitudes equilibradas.
- **E-029**: Absolutos ("sólo") en los distractores sustituidos. Auditoría final: D (métricas Synthetic) no respondía a la pregunta; sustituido por un límite vecino.
- **D-018**: Tres distractores empezaban por "Sólo", pista de que la clave era la combinación; reescritos sin absolutos.
- **C-019**: Cifra verificada (250); distractor con absoluto sustituido por un límite vecino.
- **E-027**: Verificado que percentRank existe en timeseries; explicación ampliada (absorbe FD-006). Auditoría final: distractores C y D con sintaxis absurda sustituidos por alternativas plausibles.
- **FD-005**: Verificado en DQL metric commands.
- **FD-011**: Cifras verificadas; distractor absoluto sustituido por cifra vecina.
- **G-082**: La explicación afirmaba que default_logs es configurable; distractor ajustado.
- **G-085**: Distractores absurdos y pista de longitud; opciones paralelas con cifras vecinas.
- **G-088**: Distractores absurdos y pista de longitud.
- **G-091**: Distractores absurdos y concepto de Classic aplicado a Grail; verificado en Metrics limits.
- **G-092**: Distractores absurdos; dificultad ajustada.
- **G-097**: Distractores de cifras vecinas del mismo tema.
- **G-098**: Pregunta trivial con distractores absurdos convertida en escenario.
- **G-099**: Cifra verificada en Data retention periods; fuente corregida y distractores vecinos.

### Preguntas retiradas (19)

- **C-017**: Memorización muy fina (default_securityevents_builtin frente a default_securityevents) con poco valor para Associate; la tabla de buckets integrados queda en la guía.
- **FD-007**: Pregunta resoluble por el estado Preview (metaconocimiento) y de nicho (countDistinct sobre métricas cardinality).
- **FD-008**: Enunciado vago sobre start()/end() con distractores poco plausibles; bajo valor de examen.
- **FD-009**: La clave repetía el enunciado (scalar no aplica a start/end) y su distractor A era la negación directa.
- **FD-018**: Duplicado de G-097 (35 días para los buckets de RUM y Synthetic).
- **G-086**: Duplicado de B-034, que ahora evalúa la retención de default_spans en un escenario.
- **G-089**: Duplicado de R-DAT-09 (ventajas de key requests, mismo distractor de 5 años de code-level).
- **G-095**: Duplicado de R-DAT-17 (quitar dimensiones volátiles; mismos distractores de bucket personalizado e interval).
- **FD-017**: Duplicado de C-017 (mismo dato con el orden invertido).
- **FD-006**: Duplicado de E-027 (percentRank); la interpretación de 0,9 pasa a la explicación de E-027.
- **G-081**: Duplicado de B-039 (storage:bucket-definitions:write).
- **G-083**: Duplicado de G-085 y B-033 (15 meses de métricas en Grail).
- **G-084**: Duplicado de D-017 (default:0).
- **G-087**: Premisa falsa: los buckets integrados no se modifican; no existe un mínimo justificado por baselines de Davis.
- **G-090**: Duplicado de A-063 y exagera el efecto ("purga inmediata"); el borrado es asíncrono.
- **G-093**: Support archives de OneAgent: dato ajeno al módulo y sin valor de examen para análisis de datos.
- **G-094**: Duplicado de C-017 (retención de security events).
- **G-096**: Duplicado de E-029 y FD-010 (límites del comando metrics).
- **G-100**: Metacomentario de resumen ("En conclusión") sin escenario evaluable; cubierto por A-065 y B-035.

### Preguntas nuevas (49)

R-DAT-01, R-DAT-02, R-DAT-03, R-DAT-04, R-DAT-05, R-DAT-06, R-DAT-07, R-DAT-08, R-DAT-09, R-DAT-10, R-DAT-11, R-DAT-12, R-DAT-13, R-DAT-14, R-DAT-15, R-DAT-16, R-DAT-17, R-DAT-18, R-DAT-19, R-DAT-20, R-DAT-21, R-DAT-22, R-DAT-23, R-DAT-24, R-DAT-25, R-DAT-26, R-DAT-27, R-DAT-28, R-DAT-29, R-DAT-30, R-DAT-31, R-DAT-32, R-DAT-33, R-DAT-34, R-DAT-35, R-DAT-36, R-DAT-37, R-DAT-38, R-DAT-39, R-DAT-40, R-DAT-41, R-DAT-42, R-DAT-43, R-DAT-44, R-DAT-45, R-DAT-46, R-DAT-47, R-DAT-48, R-DAT-49

### Apartados ampliados o corregidos (14)

- **correlation**: R-DAT-19 necesita la combinación de spans y dependencia/secuencia en Smartscape como evidencia causal.
- **reporting**: R-DAT-04, R-DAT-05, R-DAT-32 y R-DAT-33 (dashboard reports Classic y diferencia Notebooks/Dashboards). Las métricas de Grail se agregan por minuto, no se muestrean: «muestreada» se corrige a «agregada».
- **sampling-completeness**: R-DAT-10, R-DAT-11 y R-DAT-21 (samplingRatio, scanLimitGBytes, bucket y dt.system.sampling_ratio).
- **metric-retention**: v5: el matiz de la fila de Grail decía que el bucket cambia el alcance, pero no hay buckets personalizados de métricas (Organize data; Metrics limits: 15 meses incluidos, opción de ampliar a 10 años). R-DAT-15, R-DAT-16, R-DAT-22, G-085, G-098 y FD-012 (tramos de Classic, almacenes separados, DQL frente a metric selectors).
- **key-requests**: R-DAT-08 y R-DAT-09 (ventajas, retención por nivel, tiles desde el marcado y límites).
- **sessions-problems**: R-DAT-01, R-DAT-02, R-DAT-03, G-097 y G-099 (ciclo de vida de sesiones RUM, bounce y retenciones).
- **deep-reporting-analysis**: R-DAT-06, R-DAT-07 y R-DAT-30 (endpoint, scope, resolution, from, metricSelector y formato).
- **timeframes**: Respalda R-DAT-35 (intervalo derivado del timeframe en timeseries). Fuentes: https://docs.dynatrace.com/docs/platform/grail/dynatrace-query-language/commands/metric-commands y https://docs.dynatrace.com/docs/manage/data-privacy-and-security/data-privacy/data-retention-periods
- **retention-model**: Respalda R-DAT-36 y R-DAT-37. Fuentes: https://docs.dynatrace.com/docs/platform/grail/organize-data y https://docs.dynatrace.com/docs/manage/data-privacy-and-security/data-privacy/data-retention-periods
- **analysis-workflow**: Respalda R-DAT-38. Fuentes: https://docs.dynatrace.com/docs/manage/data-privacy-and-security/data-privacy/data-retention-periods y https://docs.dynatrace.com/docs/platform/grail/organize-data
- **deep-signal-semantics**: Respalda R-DAT-40 (https://docs.dynatrace.com/docs/observe/application-observability/distributed-traces/concepts) y R-DAT-41 (https://docs.dynatrace.com/docs/dynatrace-intelligence/root-cause-analysis/concepts).
- **deep-baselines-impact**: Respalda R-DAT-43 (https://docs.dynatrace.com/docs/dynatrace-intelligence/root-cause-analysis/event-analysis-and-correlation/event-categories) y R-DAT-45 (https://docs.dynatrace.com/docs/dynatrace-intelligence/root-cause-analysis/concepts).
- **deep-metric-design**: Sintaxis corregida: default es un parámetro de la agregación (sum(metric, default:0)), no del comando timeseries (DQL metric commands); coherente con D-017.
- **deep-retention-reference**: El texto afirmaba que default_logs y default_spans se amplían hasta 10 años y que la retención de métricas se modifica con storage:bucket-definitions:write; los buckets integrados no se modifican. A-061, B-033 y G-082 necesitan la relación retención/timeframe. Auditoría final: security.events es una tabla, no un bucket (se separa en default_securityevents, 1 año, y default_securityevents_builtin, 3 años); el permiso de gestión no aplica a métricas ni a buckets integrados; Metrics Classic sigue conservando 5 años. v5: la fila de métricas ya no nombra un permiso que no le aplica (pasa a «No aplica»), la tabla incluye la fila del bucket personalizado, que es donde sí aplica storage:bucket-definitions:write, y la celda de spans nombra ese permiso en vez de una «configuración» que no es un permiso (Organize data).

### Apartados nuevos (6)

sup-grail-buckets, sup-bucket-lifecycle, sup-timeseries-params, sup-metrics-exploration, sup-metric-limits, sup-user-behavior

### Ficha de precisión

Auditoría final: default:0 va dentro de la agregación (DQL metric commands); security.events es una tabla, no un bucket, y los buckets integrados no son editables (Organize data); rangos de spans aclarados (Data retention periods). v5: se matiza que existe un programa preview para ampliar la retención de RUM y Synthetic (Organize data; Preview releases).

## 08 DQL (Dynatrace Query Language)

### Preguntas corregidas (46)

- **A-019**: Añadido el matiz del grupo null de summarize (auditoría: pregunta trivial).
- **A-021**: Distractores con absolutos y poco plausibles; se añaden comandos reales con propósito distinto.
- **A-023**: Formato de respuesta múltiple y distractor sin absolutos.
- **A-025**: Se quitan absolutos de los distractores; la opción de grupos finales duplicaba la de la tabla de salida y se sustituye por la confusión con el muestreo (auditoría final).
- **A-026**: Sintaxis canónica by:{…} con llaves, coherente con el resto del banco.
- **B-045**: Distractores débiles o con absolutos; se usan comandos reales de estructura.
- **B-046**: Distractores sin relación con correlación; se sustituyen por append, join y joinNested.
- **C-024**: Distractores con absolutos; se usan alternativas reales.
- **D-021**: Fusionada con G-115: se pregunta la sintaxis exacta de fieldsRename (nombre nuevo primero).
- **D-022**: Verificado: jsonExtract existe. Distractores más plausibles y explicación con conflicts.
- **D-024**: Verificado: fieldsMove existe. Se quitan absolutos y se añade la sintaxis.
- **E-033**: Distractores poco plausibles; se usan parámetros reales de traverse.
- **E-034**: Se quitan absolutos de distractores.
- **FQ-015**: Verificado en DQL data types y time functions: tf[start]/tf[end] y getStart/getEnd. Convertida a respuesta múltiple.
- **A-020**: Se quita un absoluto de distractor.
- **A-022**: Distractores obvios sustituidos por errores plausibles de orden y selección de campos (revisión v3).
- **FQ-001**: Se quitan absolutos de distractores y se equilibra la longitud.
- **FQ-004**: Se quita un absoluto de distractor.
- **FQ-005**: Equilibrio de longitud de opciones.
- **FQ-007**: Se quitan absolutos de distractores.
- **G-101**: Serie G: distractores absurdos sustituidos por errores plausibles de sintaxis temporal.
- **G-102**: Serie G: distractores plausibles y fuente del Semantic Dictionary.
- **G-103**: Serie G: distractores plausibles.
- **G-104**: Dato erróneo: arrayContains no existe en DQL. Clave cambiada a in(needle, haystack).
- **G-106**: Serie G: distractores plausibles y explicación corregida (fields no equivale a fieldsKeep).
- **G-110**: Serie G: reformulada como caso práctico de tipado fuerte (to* frente a as*).
- **G-112**: Serie G: distractores plausibles.
- **G-113**: Serie G: distractores plausibles con parámetros vecinos (bins, from, shift).
- **G-114**: Serie G: distractores plausibles.
- **G-116**: Serie G: distractores plausibles; añadido el valor por defecto verificado.
- **G-118**: Verificado: countDistinct es alias de countDistinctApprox (aproximado). Pregunta reformulada.
- **G-119**: Serie G: clave acortada y distractores plausibles.
- **A-017**: Explicación que desmonta cada distractor (revisión v3).
- **A-018**: Explicación que desmonta cada distractor (revisión v3).
- **B-041**: Distractor con valor imposible (samplingRatio:0.1) sustituido y explicación completa (revisión v3).
- **E-031**: Explicación que desmonta cada distractor (revisión v3).
- **E-032**: Explicación que desmonta cada distractor (revisión v3).
- **E-035**: Distractor D se autodesmontaba; enunciado precisa que se quiere el registro completo (revisión v3).
- **FQ-003**: Explicación que desmonta cada distractor (revisión v3). El distractor lookup (otro comando, no un valor de kind) se sustituye por rightOuter, valor plausible pero inexistente (auditoría final).
- **FQ-006**: Pregunta trivial reorientada al contraste de prefijos por defecto entre join y lookup (revisión v3).
- **FQ-009**: Explicación que desmonta cada distractor (revisión v3).
- **FQ-011**: Explicación alineada con la referencia (sin sort: la elección es aleatoria) y que desmonta los distractores (revisión v3).
- **FQ-012**: Explicación que desmonta cada distractor (revisión v3).
- **FQ-013**: Explicación que desmonta cada distractor (revisión v3).
- **FQ-014**: Enunciado aclarado y explicación que desmonta cada distractor (revisión v3).
- **D-023**: Dificultad ajustada: reconocimiento directo de un comando.

### Preguntas retiradas (22)

- **B-048**: Duplicado de A-022 (selección temprana de campos).
- **C-022**: Concepto de dedup cubierto por E-035 y FQ-011, más exigentes.
- **FQ-008**: Duplicado de D-023 (append frente a join/lookup).
- **FQ-016**: Duplicado de B-044 (posición de sort).
- **G-105**: Duplicado de B-045 (expand).
- **G-107**: Duplicado de E-036 (filtrar antes de transformaciones costosas).
- **G-108**: Afirmaba una ventaja de rendimiento de lookup no documentada; la semántica ya está en FQ-005 y FQ-006.
- **G-109**: Duplicado de B-044 (posición de sort).
- **G-111**: Duplicado de A-025 (limit antes de summarize) con metacomentario.
- **G-115**: Fusionada en D-021 (sintaxis de fieldsRename).
- **G-120**: Pregunta de resumen con afirmación inexacta sobre subconsultas (join, lookup y append las usan).
- **A-027**: Trivial (el pipe pasa la salida al siguiente comando); el efecto del orden ya se evalúa en A-017 y A-025.
- **B-042**: Duplicado de R-DQL-07 (acotar from: en el propio fetch), que evalúa además bucket: en el mismo escenario.
- **B-043**: Duplicado de R-DQL-07 (fetch con bucket: para reducir el escaneo).
- **B-044**: Duplicado de R-DQL-26 (sort al final de la consulta).
- **E-036**: Duplicado de R-DQL-26 (filtrar directamente el campo en lugar de transformarlo).
- **FQ-010**: Duplicado de G-112 (search insensible a mayúsculas); el matching por tokens ya se evalúa en R-DQL-04.
- **B-047**: Duplicado de R-DQL-02 (makeTimeseries frente a timeseries sobre registros de logs).
- **C-021**: Trivial sin el matiz de null; filterOut se evalúa con ese matiz en E-034 y R-DQL-01.
- **C-023**: Duplicado de G-106 (fieldsAdd añade una columna y conserva el resto).
- **FQ-002**: Duplicado de FQ-001 (leftOuter conserva todas las filas de la izquierda) con distractor que se autodesmonta.
- **G-117**: Mismo concepto que G-110 (funciones as* frente a to*).

### Preguntas nuevas (63)

R-DQL-01, R-DQL-02, R-DQL-03, R-DQL-04, R-DQL-05, R-DQL-06, R-DQL-07, R-DQL-08, R-DQL-09, R-DQL-10, R-DQL-11, R-DQL-12, R-DQL-13, R-DQL-14, R-DQL-15, R-DQL-16, R-DQL-17, R-DQL-18, R-DQL-19, R-DQL-20, R-DQL-21, R-DQL-22, R-DQL-23, R-DQL-24, R-DQL-25, R-DQL-26, R-DQL-27, R-DQL-28, R-DQL-29, R-DQL-30, R-DQL-31, R-DQL-32, R-DQL-33, R-DQL-34, R-DQL-35, R-DQL-36, R-DQL-37, R-DQL-38, R-DQL-39, R-DQL-40, R-DQL-41, R-DQL-42, R-DQL-43, R-DQL-44, R-DQL-45, R-DQL-46, R-DQL-47, R-DQL-48, R-DQL-49, R-DQL-50, R-DQL-51, R-DQL-52, R-DQL-53, R-DQL-54, R-DQL-55, R-DQL-56, R-DQL-57, R-DQL-58, R-DQL-59, R-DQL-60, R-DQL-61, R-DQL-62, R-DQL-63

### Apartados ampliados o corregidos (9)

- **aggregation**: v7: forma de salida de summarize con varias expresiones en by: (R-DQL-41), https://docs.dynatrace.com/docs/platform/grail/dynatrace-query-language/commands/aggregation-commands
- **parse-fields**: v7: efecto de expand en el número de registros (R-DQL-49), https://docs.dynatrace.com/docs/platform/grail/dynatrace-query-language/commands/structuring-commands
- **metric-commands**: La referencia de metric commands no habla de un periodo por defecto: metrics está limitado a los últimos diez días (R-DQL-06). "metric commands" es la categoría (timeseries y metrics); el comando se llama metrics (auditoría final).
- **permissions-performance**: En Grail el alcance de datos lo fijan los permisos de bucket, tabla, record y field, no las management zones (auditoría final).
- **dql-troubleshooting**: En Grail el alcance de datos lo fijan los permisos de bucket, tabla, record y field, no las management zones (auditoría final).
- **deep-dql-pipeline**: to:now() por sí solo no fija la ventana temporal (auditoría final; G-101).
- **deep-dql-types-records**: El ejemplo tenía comillas sin escapar dentro del string y no era una consulta válida. Los records se acceden por clave y solo los arrays por índice (auditoría final). R-DQL-57: índices desde 0 (https://docs.dynatrace.com/docs/platform/grail/dynatrace-query-language/data-types).
- **deep-dql-dpl**: Se sustituyen matchers no verificados por los de la referencia DPL y se explica qué parte de una consulta es DPL (R-DQL-21).
- **deep-dql-performance**: R-DQL-59: evitar join/lookup para filtrar (https://docs.dynatrace.com/docs/platform/grail/dynatrace-query-language/dql-best-practices).

### Apartados nuevos (10)

sup-dql-sources, sup-dql-filtering, sup-dql-fields, sup-dql-structure-parse, sup-dql-join, sup-dql-smartscape, sup-dql-aggregation-functions, sup-dql-timeseries, sup-dql-types-conversion, sup-dql-best-practices

### Ficha de precisión

R-DQL-62 y R-DQL-61: permisos de timeseries y campos que sobreviven a summarize. to:now() por sí solo no fija la ventana temporal; expand es un comando (structuring command) y no hace falta para filtrar por pertenencia (auditoría final).

## 09 Security

### Preguntas corregidas (32)

- **A-051**: Versión canónica del concepto "librería cargada"; distractores sin coletillas que los delaten.
- **A-052**: Distractores con coletillas ("sin…") sustituidos por capacidades reales y plausibles.
- **B-050**: Distractores sin absolutos y términos de producto en inglés.
- **B-055**: Distractores con coletillas ("aunque…") sustituidos por condiciones plausibles de otros mecanismos.
- **C-025**: Enunciado en negativo y clave delatada por longitud; reformulada como escenario.
- **C-026**: Formato de respuesta múltiple homogéneo.
- **C-027**: Distractores afirmativos y plausibles (auditoría: patrón "sólo… sin").
- **D-026**: Distractores de lectura reales (antes Write, descartables por la palabra).
- **D-027**: Distractores con elementos reales de Investigations (antes con cláusulas negativas).
- **E-042**: Distractor absurdo ("0 hasta exploit") sustituido; conservada como única pregunta de la regla DSS 10 de code-level.
- **FS-006**: Distractores con coletillas ("aunque…", "sin límite") reescritos.
- **FS-007**: Auditoría v4: el escenario a dos saltos era ambiguo frente a la frase literal de la doc; reescrito a un salto, distractores plausibles y explicación con la cita.
- **FS-008**: Conservada como canónica de la resolución a las dos horas; distractor sin absoluto.
- **FS-009**: Auditoría v4: los distractores eran certezas ("Resolved confirma…") frente a una única hipótesis; reescritos como hipótesis plausibles.
- **FS-015**: Distractores sin absolutos.
- **FS-016**: Auditoría v4: distractores que contradecían el enunciado ("Open sin mute", "Affected sin resolución") sustituidos por estados reales con mute.
- **FS-017**: Pregunta sí/no con distractores débiles; reformulada como escenario.
- **FS-018**: Explicación con términos de producto en inglés.
- **FS-020**: Distractores absurdos sustituidos por funciones reales de Investigations.
- **FS-021**: Conservada como canónica de IP enrichment (absorbe D-028); distractores plausibles.
- **G-122**: Dato erróneo: public exploit no entra en el DSS (docs). Convertida en multiple con factores reales; nombre actual de DSS.
- **G-123**: Error: la tabla dt.security.vulnerabilities no existe; corregido a security.events con event.type verificado.
- **G-124**: Distractores absurdos sustituidos por confusiones reales (resolve, DSS, monitoring rules). Auditoría v4: la clave distingue Muted (Affected) de la entidad y Muted (Open) de la vulnerabilidad.
- **G-127**: Pregunta trivial con distractores absurdos; reescrita con los tipos code-level reales.
- **G-128**: "Hardware-Only mode" no existe; reescrita sobre assessment mode y modos de monitorización reales.
- **G-130**: Distractores absurdos; la clave anterior fijaba "Medium o Low" sin respaldo documental.
- **G-131**: Distractores absurdos sustituidos por confusiones reales.
- **G-132**: Distractores inventados sustituidos por scopes reales; fuente de API verificada.
- **G-134**: Distractores absurdos; reorientada a un detalle verificado (code-level).
- **G-135**: Verificado el reinicio en "Get started"; precisado a code-level y distractores plausibles.
- **G-137**: Distractores absurdos sustituidos por otras funciones reales de Investigations; clave acortada.
- **G-139**: Distractores absurdos sustituidos por confusiones reales; clave acortada.

### Preguntas retiradas (35)

- **B-049**: Duplicado de A-051 (librería presente pero no cargada).
- **FS-001**: Duplicado de A-051 (JAR en disco no cargado).
- **G-125**: Duplicado de A-051; además confundía SAST con escáner de imágenes.
- **B-051**: Duplicado de A-052 (code-level por flujo de datos).
- **FS-011**: Duplicado de A-052 (code-level por flujo de datos).
- **G-121**: Duplicado de A-052 (third-party vs code-level) con distractores absurdos.
- **B-053**: Duplicado de FS-008 (resolución a las dos horas).
- **G-126**: Duplicado de FS-008 (resolución automática).
- **B-056**: Duplicado de FS-009 (interpretación de Resolved).
- **FS-002**: Duplicado de C-025 (qué no evalúa el mecanismo de componentes).
- **FS-004**: Duplicado de C-026 (NVD para runtimes).
- **FS-005**: Duplicado de R-SEC-25 (frecuencia de feed y escaneo).
- **FS-010**: Duplicado de FS-009 (reapertura).
- **D-028**: Duplicado de FS-021 (IP enrichment).
- **B-052**: Duplicado de G-130 (igual CVSS, distinta exposición).
- **G-133**: Pregunta de sentido común sin contenido de producto; cubierta por R-SEC-26 y FS-020.
- **G-136**: Concepto no documentado (tendencia agregada de "Security Score") con distractores absurdos.
- **G-140**: Pregunta de marketing con cifra inventada (90 %).
- **A-053**: Duplicado de A-051 (componentes cargados frente a listado estático); opciones vagas.
- **A-054**: Duplicado de FS-008 (resolución automática al desaparecer el componente).
- **A-055**: Duplicado de A-051 y A-052 (evidencia de third-party frente a code-level).
- **B-054**: Duplicado de FS-009 (reapertura al volver a cargarse el componente).
- **C-028**: Duplicado de R-SEC-25 (frecuencia de feed, importación y escaneo).
- **D-025**: Duplicado de R-SEC-31 (priorización con DSS y CISA KEV); clave tipo "todo lo anterior".
- **E-037**: Duplicado de G-122 y G-130 (DSS añade contexto de exposición y datos).
- **E-038**: Duplicado de G-130 (el DSS no supera el CVSS base).
- **E-039**: Duplicado de R-SEC-22 (entidades afectadas frente a relacionadas).
- **E-040**: Duplicado de G-124 (efecto del mute: Muted (Open)).
- **E-041**: Duplicado de FS-015 (DSS máximo dentro del segmento).
- **FS-003**: Duplicado de B-050 (paquetes runtime de Kubernetes como kubelet).
- **FS-012**: Duplicado de R-SEC-18 (las code-level rules sobrescriben el control global).
- **FS-013**: Duplicado de R-SEC-24 (CVSS v4 frente a v3 como base del DSS).
- **FS-019**: Duplicado de D-027 (evidence lists).
- **G-129**: Duplicado de R-SEC-33 (qué es Investigations).
- **G-138**: Duplicado de G-122 (public exploit no entra en el DSS).

### Preguntas nuevas (62)

R-SEC-02, R-SEC-03, R-SEC-04, R-SEC-05, R-SEC-06, R-SEC-07, R-SEC-08, R-SEC-09, R-SEC-10, R-SEC-11, R-SEC-12, R-SEC-13, R-SEC-14, R-SEC-15, R-SEC-16, R-SEC-17, R-SEC-18, R-SEC-19, R-SEC-20, R-SEC-21, R-SEC-22, R-SEC-23, R-SEC-24, R-SEC-25, R-SEC-26, R-SEC-27, R-SEC-28, R-SEC-29, R-SEC-30, R-SEC-31, R-SEC-32, R-SEC-33, R-SEC-34, R-SEC-35, R-SEC-36, R-SEC-37, R-SEC-38, R-SEC-39, R-SEC-40, R-SEC-41, R-SEC-42, R-SEC-43, R-SEC-44, R-SEC-45, R-SEC-46, R-SEC-47, R-SEC-48, R-SEC-49, R-SEC-50, R-SEC-51, R-SEC-52, R-SEC-53, R-SEC-54, R-SEC-55, R-SEC-56, R-SEC-57, R-SEC-58, R-SEC-59, R-SEC-60, R-SEC-61, R-SEC-62, R-SEC-63

### Apartados ampliados o corregidos (9)

- **security-model**: R-SEC-49: dónde vive una vulnerabilidad frente a Davis events y Problems (https://docs.dynatrace.com/docs/semantic-dictionary/model/security-events/vulnerability, https://docs.dynatrace.com/docs/secure/threat-observability/concepts).
- **security-permissions**: R-SEC-53: lectura frente a settings:objects:write (https://docs.dynatrace.com/docs/manage/identity-access-management/use-cases/built-in-policies).
- **advisor-investigations**: La definición vaga de Security Advisor contradecía sup-security-advisor (solo recomienda actualizaciones de librerías).
- **security-evidence**: Misma precisión sobre Davis Security Advisor frente a Investigations. R-SEC-55: el advisor no aplica upgrades; verificación por Resolved; mute no corrige (https://docs.dynatrace.com/docs/secure/application-security/vulnerability-analytics/third-party-vulnerabilities/davis-security-advisor, https://docs.dynatrace.com/docs/secure/vulnerabilities/concepts).
- **deep-security-modes**: v6: Enable monitoring modes documenta que con OneAgent en contenedor e Infrastructure no se realiza process injection (R-SEC-56).
- **deep-investigations**: Concreta los límites de Investigations que la guía mencionaba sin cifras (Investigations concepts: 100 nodos y 1 GB por investigación). R-SEC-60: Investigations consulta datos ingeridos en Grail y requiere configurar log ingestion (https://docs.dynatrace.com/docs/secure/investigations).
- **rva**: Término de producto en inglés (code-module injection).
- **deep-third-party-code-level**: Corrige XSS (no es un tipo code-level documentado), el nombre de Runtime Application Protection y el término "Mute Rule" (la documentación Latest habla de mute, y las reglas son monitoring rules); añade el criterio de evidencia (A-051, A-052, G-127, R-SEC-09).
- **deep-security-prioritization**: Explicita el efecto de la ausencia de exposición y datos sin absolutos (G-130, G-122); la documentación Latest habla de mute de vulnerabilidades/entidades, no de "mute rules".

### Apartados nuevos (10)

sup-security-events-grail, sup-third-party-evaluation, sup-code-level-details, sup-monitoring-rules, sup-rva-setup, sup-rap, sup-dss-assessment, sup-vulnerabilities-app, sup-security-advisor, sup-investigations-details

### Ficha de precisión

La ficha hablaba de "mute rules", término no documentado en Latest que se confunde con las monitoring rules, y matizaba con "puede no" que un paquete no cargado no genera third-party vulnerability.

## 10 Automation

### Preguntas corregidas (54)

- **A-057**: Quitar absolutos de distractores y precisar la explicación con la doc.
- **A-058**: v3: distractor D sin coletilla ("aunque…") y explicación que desmonta cada opción.
- **A-060**: v3: la clave destacaba frente a ajustes técnicos; reformulada como elección entre casos de uso reales.
- **B-057**: Terminología en inglés (trigger, draft, deploy) y distractores precisos.
- **B-058**: Duplicaba A-056; reorientada a la sintaxis cron verificada.
- **B-059**: v3: distractor B sin coletilla.
- **B-061**: v3: distractores plausibles.
- **B-063**: Distractores con nombres de permiso reales (absorbe G-141).
- **C-029**: Terminología en inglés y quitar absolutos de distractores.
- **C-031**: v3: absorbe A-057 (trigger desactivado) en la explicación.
- **C-032**: Terminología (task) y quitar absoluto de distractor. Auditoría: precisar el coste (sin workflow hours, no sin coste).
- **D-029**: Terminología en inglés (task).
- **D-030**: Terminología, quitar absolutos de distractores (absorbe E-047).
- **D-031**: Terminología y quitar absoluto de distractor.
- **D-032**: La clave anterior omitía skipped: el valor por defecto documentado es "success or skipped".
- **E-046**: v3: distractores plausibles; dato de reintento de iteraciones verificado en Monitor workflow executions.
- **E-048**: Distractores Jinja plausibles en lugar de funciones inexistentes.
- **FA-002**: v3: distractor C que no era una opción real; distractores con opciones existentes.
- **FA-003**: Quitar absolutos de distractores y pista de longitud.
- **FA-004**: Formato de respuesta múltiple.
- **FA-005**: v3: fusiona FA-006 y G-159 (mismo límite) en una respuesta múltiple.
- **FA-007**: Quitar absolutos de distractores (absorbe G-143).
- **FA-008**: Terminología (task) y explicación más precisa.
- **FA-009**: v3: distractores absurdos ("limit 0") sustituidos por opciones reales.
- **FA-010**: Quitar absolutos de distractores. Auditoría: Notebooks/Dashboards usan navegador o user settings, según dql-query-workflow-action.
- **FA-012**: v3: explicación que desmonta los distractores.
- **FA-013**: v3: explicación completa y terminología (action).
- **FA-016**: Terminología (task).
- **FA-017**: Quitar absoluto de distractor y ampliar explicación (absorbe G-148).
- **FA-018**: v3: explicación que desmonta los distractores.
- **FA-019**: Distractores con estados reales y sin absolutos.
- **FA-020**: v3: distractor sin coletilla y explicación sin notas internas.
- **FA-021**: v3: ortografía (solo) y término sub-workflow.
- **B-064**: v3: distractor D sin coletilla; explicación completa.
- **C-030**: v3: distractores que se descartaban sin conocer el producto.
- **E-043**: v3: distractor D plausible y explicación completa.
- **FA-001**: Dificultad ajustada.
- **FA-011**: v3: distractor D plausible y explicación completa.
- **FA-015**: v3: distractores que se descartaban solos.
- **G-142**: v3: pregunta deducible del nombre; convertida en escenario de mínimo privilegio.
- **G-145**: Distractores absurdos; reorientada al coste (el límite 1 trigger/1 task ya lo cubre C-032).
- **G-146**: Reformulada sobre el dato verificado; distractores plausibles.
- **G-149**: Dato verificado; distractores cercanos.
- **G-151**: v3: fuente de version history (la versión Current no se puede restaurar).
- **G-152**: Pregunta trivial con distractores absurdos; reorientada a input().
- **G-153**: v3: el enunciado repetía "approval" y delataba la clave.
- **G-154**: Distractores absurdos sustituidos por causas plausibles.
- **G-155**: Valor por defecto verificado (UTC), distractores plausibles y fuente corregida.
- **G-156**: Dato verificado (no hay vuelta atrás automática) y distractores plausibles.
- **G-157**: Distractores Jinja plausibles.
- **G-158**: Se eliminó el backoff exponencial no documentado; valores por defecto verificados.
- **G-159**: Clave sin datos inventados ("auditoría de eventos"), fuente corregida.
- **A-059**: v3: distractores inverosímiles sustituidos por alternativas plausibles.
- **FA-014**: v3: enunciado confuso ("contrato de ejecución") y distractor irrelevante (Code tile).

### Preguntas retiradas (18)

- **B-060**: Duplicado de A-057 (API tras desactivar el trigger).
- **E-044**: Duplicado de A-057 con distractor absurdo.
- **B-062**: Duplicado de A-058 (403: permisos del actor + autorización).
- **E-045**: Duplicado de D-029 (retry y action executions).
- **E-047**: Duplicado de D-030 (task timeout).
- **G-141**: Duplicado de B-063 (iam:service-users:use).
- **G-143**: Duplicado de FA-007 (1.000 caracteres).
- **G-144**: Duplicado de FA-005 (1.000 ejecuciones por hora).
- **G-147**: Duplicado de FA-013 (records, types, metadata) con distractores absurdos.
- **G-148**: Duplicado de FA-017 (6 MB); el dato general se incorpora a su explicación.
- **G-150**: Duplicado de E-043 (Problem trigger vs Davis event trigger).
- **G-160**: Duplicado de A-060 con metacomentario y distractores absurdos.
- **A-056**: v3: trivial (Schedule para un informe semanal); los tipos de schedule se evalúan en R-AUT-01/02/03, B-058 y G-155.
- **A-057**: v3: duplicado de C-031 (la API inicia cualquier workflow live); el caso del trigger desactivado pasa a su explicación.
- **FA-006**: v3: duplicado de FA-005, que pasa a respuesta múltiple con la desactivación tras tres excesos en siete días.
- **G-159**: v3: duplicado de FA-005 (throttling y desactivación).
- **FA-016**: v3: duplicado de R-AUT-06 (throw para hacer fallar Run JavaScript).
- **G-149**: v3: duplicado de FA-017/FA-018 (6 MB por action, 10 MB por workflow result).

### Preguntas nuevas (45)

R-AUT-01, R-AUT-02, R-AUT-03, R-AUT-04, R-AUT-05, R-AUT-06, R-AUT-07, R-AUT-08, R-AUT-09, R-AUT-10, R-AUT-11, R-AUT-12, R-AUT-13, R-AUT-14, R-AUT-15, R-AUT-16, R-AUT-17, R-AUT-18, R-AUT-19, R-AUT-20, R-AUT-21, R-AUT-22, R-AUT-23, R-AUT-24, R-AUT-25, R-AUT-26, R-AUT-27, R-AUT-28, R-AUT-29, R-AUT-30, R-AUT-31, R-AUT-32, R-AUT-33, R-AUT-34, R-AUT-35, R-AUT-36, R-AUT-37, R-AUT-38, R-AUT-39, R-AUT-40, R-AUT-41, R-AUT-42, R-AUT-43, R-AUT-44, R-AUT-45

### Apartados ampliados o corregidos (12)

- **actor-permissions**: R-AUT-34: acceso del actor a la credencial del vault (https://docs.dynatrace.com/docs/analyze-explore-automate/workflows/default-workflow-actions/http-request-workflow-action).
- **workflow-model**: A-060: propósito de AutomationEngine frente a exportación masiva, con la fuente oficial.
- **triggers**: B-057, B-059, C-031, G-151: ciclo draft/live, deploy/undeploy, API y version history. Auditoría: la fila API de la tabla no es un cuarto tipo de trigger, y el Event trigger arranca al ingerirse en OpenPipeline un evento que coincide (docs: build/trigger).
- **safe-automation**: R-AUT-07, R-AUT-21, R-AUT-22: credenciales, resultados visibles y escalonado de schedules.
- **simple-workflow**: R-AUT-09, R-AUT-25, G-145, G-156: actions permitidas, coste y conversión a estándar.
- **event-trigger-precision**: C-030, FA-003, FA-004, FA-005, FA-007, FA-012, R-AUT-04, R-AUT-10, R-AUT-23: tipos, permisos, evaluación, límites y persistencia.
- **deep-workflow-anatomy**: Tabla de actions corregida: types en el resultado DQL, runtime sin Node.js y Run workflow con su permiso real. R-AUT-39 y R-AUT-40: expresiones en Run JavaScript y allowlist de External requests (https://docs.dynatrace.com/docs/analyze-explore-automate/workflows/default-workflow-actions/run-javascript-workflow-action, https://docs.dynatrace.com/docs/analyze-explore-automate/workflows/default-workflow-actions/http-request-workflow-action).
- **deep-actor-permissions**: A-059, B-061, B-063, C-029: definición de actor, cambio automático al editar y service users.
- **deep-execution-states**: R-AUT-05, G-153: definiciones de estados de ejecución y de task.
- **deep-jinja-dql**: E-048, G-152, G-157, R-AUT-19, R-AUT-20, R-AUT-27, R-AUT-31: funciones y filtros Jinja, límite de records. Auditoría: defaults reales de Execute DQL Query (UTC, 2 h, 1.000 records) según dql-query-workflow-action.
- **execution-limits**: Auditoría: los logs reducen el límite del resultado de cada action (6 MB menos logs), no el del workflow result (10 MB), según running.
- **deep-workflow-limits**: Límite de ejecuciones por workflow (no por trigger) y límite de action result con los logs, según la documentación. R-AUT-42: superar el límite hace fallar la ejecución (https://docs.dynatrace.com/docs/analyze-explore-automate/workflows/running).

### Apartados nuevos (7)

sup-schedule-triggers, sup-problem-davis-triggers, sup-dql-js-actions, sup-http-run-workflow, sup-workflow-permissions, sup-task-options, sup-execution-control

### Ficha de precisión

R-AUT-44: permisos por tipo de dato del Event trigger. Auditoría: la nota contradecía simple-workflow; usar funciones estándar convierte el simple workflow en estándar y no se desactiva quitando lo añadido, aunque se puede crear otro workflow o hacer roll back a una versión anterior (docs: build/simple-workflow).

## 11 Ingestion

### Preguntas corregidas (58)

- **FI-003**: Términos de producto en inglés (pre-processing, routing) en la explicación.
- **FI-005**: Términos de producto en inglés (pre-processing, routing) en la explicación.
- **A-044**: Reparto de la clave entre opciones y explicación más completa.
- **E-050**: Reparto de la clave y opciones de longitud homogénea.
- **A-043**: Distractor D poco plausible y explicación mínima; se alinean las opciones con canales reales.
- **A-048**: Se fusiona con B-067 (duplicado) y se mejoran distractores; dificultad honesta.
- **B-066**: Se fusiona con FI-006 (duplicado); términos de producto en inglés y distractores homogéneos.
- **B-068**: Se fusiona con FI-004 (duplicado); terminología en inglés y opciones de longitud similar.
- **B-069**: Términos de producto en inglés y distractores más técnicos.
- **B-070**: Se concreta el escenario con dt.temp.* (verificado) y se usan términos en inglés.
- **B-071**: Términos de producto en inglés y distractores de longitud similar.
- **C-033**: Distractor absurdo (D) sustituido; distractores construidos con la tabla real de tipos de ingest source.
- **D-036**: Distractores de sentido común sustituidos por códigos reales; convertida en respuesta múltiple verificada.
- **E-049**: Auditoría marcó dato dudoso: verificado en Processing y Pipeline groups que las ready-made pueden ser base o miembro; se amplía la explicación.
- **E-051**: Se equilibra la longitud de opciones y se detalla el orden verificado.
- **E-052**: Distractor B (Bucket assignment) era una etapa, no un processor de Processing; se usa un processor vecino plausible.
- **E-053**: Auditoría pedía verificar: la frase está documentada; se precisa la explicación y se quita un absoluto del distractor.
- **E-054**: Fecha verificada en la documentación vigente; distractores absurdos sustituidos por variantes plausibles.
- **FI-001**: Se mantiene como versión de referencia del flujo (G-161/G-166 retiradas o reorientadas); dificultad honesta.
- **FI-002**: Se conserva frente a C-034 (duplicado); distractor no verificable (dt.openpipeline.route/pipeline) sustituido.
- **FI-013**: La estructura A, B, A+B, C delataba la clave; se convierte en respuesta múltiple con cuatro elementos independientes.
- **A-047**: Auditoría v4: el enunciado ya no repite «default pipeline» (eco léxico con la clave); explicación que desmonta los cuatro distractores.
- **B-065**: Reparto de la clave, distractor sin absolutos y explicación alineada con Data flow.
- **C-035**: Términos en inglés (routing, Default route) y opciones de longitud homogénea.
- **C-036**: Reparto de la clave y distractores sin absolutos.
- **D-033**: Reparto de la clave y distractores sin absolutos.
- **D-034**: Distractor A sin absolutos y explicación con datos verificados del endpoint.
- **D-035**: Reparto de la clave y distractores sin absolutos.
- **FI-007**: Reparto de la clave y distractores sin absolutos.
- **FI-010**: Distractor A con absoluto sustituido; clave verificada en Pipeline groups.
- **FI-011**: Reparto de la clave y distractores sin absolutos.
- **FI-012**: Reparto de la clave y distractor D sin absolutos.
- **FI-015**: Distractores sin absolutos; se conserva frente a B-072 (duplicado).
- **FI-016**: Reparto de la clave y distractores sin absolutos.
- **FI-018**: Reparto de la clave y distractores sin absolutos.
- **FI-019**: Reparto de la clave, distractor D sin absolutos y explicación verificada.
- **FI-014**: Verificado dt.temp.* en Processing; distractor B repetía la clave.
- **G-161**: Clave incorrecta (Ingest→Process→Route no es el modelo documentado) y distractores absurdos; reorientada al orden fijo de etapas verificado.
- **G-163**: Clave incorrecta (1.000 registros) y distractores absurdos; límites verificados en LMA default limits.
- **G-164**: Se acota al Classic access token (existen platform tokens) y se usan scopes reales como distractores.
- **G-165**: Clave inexacta (TCP usa 601, no 514), fuente incorrecta y distractores triviales; verificado en Syslog ingestion.
- **G-168**: Distractores absurdos; la ingest rule Exclude también era defendible, así que se convierte en respuesta múltiple.
- **G-169**: Explicación inventada (corrupción de índices) y distractores absurdos; ventana real verificada en LMA default limits.
- **G-170**: Clave incorrecta (afirmaba soporte gRPC y JSON) y distractores absurdos; verificado en OTLP API endpoints.
- **G-171**: Clave inexacta (no es una función de delegación de ownership) y distractores absurdos; reescrita según Pipeline groups.
- **G-173**: Distractores absurdos sustituidos por alternativas plausibles; explicación precisada.
- **G-174**: Distractores absurdos; destinos y modo verificados en Forwarding.
- **G-175**: Distractores absurdos sustituidos por errores de configuración plausibles.
- **G-176**: Distractores absurdos sustituidos por variantes de nombre plausibles.
- **G-177**: Solapaba con B-070 y tenía distractores absurdos; reorientada a la regla first match verificada.
- **G-178**: Distractores absurdos sustituidos por alternativas plausibles; la opción correcta usa el nombre exacto de la UI (Run sample data).
- **G-179**: Distractores absurdos sustituidos por otros formatos de propagación reales.
- **A-045**: Distractores absurdos sustituidos por alternativas del mismo tema y explicación que refuta cada uno.
- **A-046**: El enunciado descartaba los distractores; se sustituyen por alternativas de la propia ingesta.
- **A-049**: Distractores absurdos (DQL fetch, Notebook como endpoint) y explicación de una línea.
- **FI-008**: Explicación que refuta cada distractor.
- **FI-009**: Enunciado vago y explicación que no desmontaba los distractores.
- **FI-017**: Explicación completa con los cuatro scopes.

### Preguntas retiradas (17)

- **D-033**: Duplicado de A-043 (serverless sin OneAgent → Log ingestion API).
- **B-069**: Duplicado de FI-005 (primary Grail tags antes del pre-processing y del routing).
- **B-071**: Duplicado de R-ING-18 y G-168 (Drop record elimina antes del almacenamiento).
- **E-052**: Duplicado de R-ING-18 (Drop record frente a Remove fields).
- **D-035**: Duplicado de R-ING-20 (OneAgent enriquece logs de Kubernetes) con distractores en forma de negación.
- **FI-018**: Duplicado de R-ING-03 y G-170 (OTLP sin gRPC, conversión con Collector).
- **G-175**: Clave simplificada no verificable en la documentación (relación de la telemetría OTLP con entidades).
- **B-067**: Duplicado de A-048 (registro sin coincidencia sigue la Default route).
- **B-072**: Duplicado de FI-015 (forwarding de datos procesados y sin procesar).
- **C-034**: Duplicado de FI-002 (dt.openpipeline.source).
- **FI-004**: Duplicado de B-068 (pre-processing solo en custom sources).
- **FI-006**: Duplicado de B-066 (orden de rutas dinámicas).
- **G-162**: Clave no verificable (dt.openpipeline.stage no está documentado) y concepto ya cubierto por FI-002.
- **G-166**: Clave incorrecta (Ingest→Process→Route) y duplicado de FI-001.
- **G-167**: Duplicado de A-046 (masking antes del almacenamiento) con distractores absurdos.
- **G-180**: Pregunta-resumen sin conocimiento verificable y con metacomentario.
- **G-172**: Duplicado de A-044 (el routing elige pipeline y el bucket se decide en Bucket assignment), R-ING-08 (bucket custom con un processor de Bucket assignment) y G-177 (first match en Bucket assignment).

### Preguntas nuevas (51)

R-ING-01, R-ING-02, R-ING-03, R-ING-04, R-ING-05, R-ING-06, R-ING-07, R-ING-08, R-ING-09, R-ING-10, R-ING-11, R-ING-12, R-ING-13, R-ING-14, R-ING-15, R-ING-16, R-ING-17, R-ING-18, R-ING-19, R-ING-20, R-ING-21, R-ING-22, R-ING-23, R-ING-24, R-ING-25, R-ING-26, R-ING-27, R-ING-28, R-ING-29, R-ING-30, R-ING-31, R-ING-32, R-ING-33, R-ING-34, R-ING-35, R-ING-36, R-ING-37, R-ING-38, R-ING-39, R-ING-40, R-ING-41, R-ING-42, R-ING-43, R-ING-44, R-ING-45, R-ING-46, R-ING-47, R-ING-48, R-ING-49, R-ING-50, R-ING-51

### Apartados ampliados o corregidos (14)

- **deep-ingestion-lifecycle**: Inventario oct 2026: la recomendación de gzip no aparece en la documentación de la Log ingestion API; se sustituye por el comportamiento documentado ante payloads demasiado grandes.
- **deep-log-ingestion**: A-049 necesita descartar Forwarding de OpenPipeline (sale de Dynatrace hacia cloud object storage) y las log ingest rules (solo configuran OneAgents instalados) como métodos para traer logs (https://docs.dynatrace.com/docs/platform/openpipeline/concepts/forwarding, https://docs.dynatrace.com/docs/analyze-explore-automate/logs/lma-log-ingestion/lma-log-ingestion-via-oa/lma-log-storage-configuration).
- **deep-activegate-integrations**: R-ING-11, R-ING-12 y R-ING-23 necesitan el contrato de VMware vSphere monitoring (ActiveGate, solo lectura, capas y otros hipervisores). Auditoría v4: vmware_monitoring_enabled está en custom.properties y vale true por defecto.
- **openpipeline**: Auditoría v4: «global, por tenant, … contexto de configuración» no corresponde al modelo documentado; los pipelines son específicos de cada configuration scope (tipo de datos), según Data flow in OpenPipeline.
- **retention-storage**: R-ING-08 y R-ING-27 necesitan la retención de default_logs, el rango de los buckets custom y dónde se asigna el bucket.
- **deep-ingestion-governance**: R-ING-47 necesita el nivel de permiso de campo (fieldsets) y su alcance en logs. R-ING-48 necesita la sintaxis del permiso por registro con dt.security_context (https://docs.dynatrace.com/docs/platform/grail/organize-data/assign-permissions-in-grail).
- **data-path**: R-ING-29 y R-ING-30 necesitan el significado de 204/200, el descarte posterior a la aceptación (Drop record), los dos permisos de lectura de logs y los Content-Type admitidos. Fuentes: https://docs.dynatrace.com/docs/dynatrace-api/environment-api/log-monitoring-v2/post-ingest-logs, https://docs.dynatrace.com/docs/platform/grail/organize-data/assign-permissions-in-grail, https://docs.dynatrace.com/docs/analyze-explore-automate/logs/lma-limits.
- **signals**: R-ING-31 necesita dónde se crean campos a partir de content y por qué ni Bucket assignment, ni las log ingest rules, ni el routing lo hacen (https://docs.dynatrace.com/docs/platform/openpipeline/concepts/processing, https://docs.dynatrace.com/docs/platform/openpipeline/concepts/data-flow).
- **mechanisms**: R-ING-34 y R-ING-35 necesitan el papel del Environment ActiveGate con el tráfico de OneAgent y los mecanismos para AWS Lambda (https://docs.dynatrace.com/docs/ingest-from/dynatrace-activegate, https://docs.dynatrace.com/docs/ingest-from).
- **log-ingestion**: R-ING-36 y R-ING-37 necesitan los formatos de timestamp admitidos, unparsed_timestamp y el valor por defecto sin clave de timestamp (https://docs.dynatrace.com/docs/analyze-explore-automate/logs/lma-log-ingestion/lma-log-ingestion-via-api/lma-ingest-json-txt-logs).
- **metric-ingestion**: R-ING-38, R-ING-39 y R-ING-40 necesitan los tipos de payload, la sintaxis count,delta, el resumen de gauge y el límite de dimensiones (https://docs.dynatrace.com/docs/ingest-from/extend-dynatrace/extend-metrics/reference/metric-ingestion-protocol).
- **trace-ingestion**: R-ING-41 necesita la recomendación de ParentBasedSampler (https://docs.dynatrace.com/docs/ingest-from/opentelemetry/troubleshooting).
- **deep-openpipeline**: R-ING-43 necesita la función de la etapa Davis frente a las demás (https://docs.dynatrace.com/docs/platform/openpipeline/concepts/processing).
- **deep-otel-signals**: R-ING-45 y R-ING-46 necesitan el endpoint OTLP local de OneAgent y los scopes por tipo de token (https://docs.dynatrace.com/docs/ingest-from/dynatrace-oneagent/oneagent-and-opentelemetry/oneagent-otel, https://docs.dynatrace.com/docs/ingest-from/opentelemetry/otlp-api).

### Apartados nuevos (7)

sup-op-sources-routing, sup-op-stages-processors, sup-op-groups-access, sup-log-api-contract, sup-oneagent-logs, sup-syslog-cloud, sup-otlp

### Ficha de precisión

Auditoría v4: syslog no es la vía habitual para hipervisores (VMware vSphere monitoring); la regla de timestamp era vaga y se sustituye por la documentada en Log Management and Analytics default limits.

## 12 Other

### Preguntas corregidas (49)

- **A-050**: Distractores caricaturizados sustituidos por acciones reales de ingesta; explicación con la cita de schema on read.
- **B-074**: Distractor C absurdo sustituido por una confusión plausible de semántica de aristas; se fusiona aquí el contenido de B-078.
- **B-075**: Distractores débiles y explicación sin el dato clave (la búsqueda admite IDs parciales).
- **B-076**: Distractores descartables (borrar nodos, cambiar OneAgent, cerrar Problems) sustituidos por funciones reales de la app Smartscape.
- **B-080**: Distractores imposibles sustituidos por funciones reales de la Logs app que no resuelven el recuento por servicio.
- **C-038**: Distractores descartables y uno mucho más largo; se usan conceptos reales del Problem graph.
- **C-040**: Distractores con coletillas delatoras sustituidos por acciones reales que no acotan la vista al área del equipo.
- **FT-007**: La notación dt.smartscape.__type__ es un placeholder; se usa un ejemplo concreto y distractores equilibrados.
- **FT-011**: Fusión con FT-010 (upsert parcial) en un único escenario que evalúa omitir frente a borrar con null.
- **FT-015**: Fusión de FT-015 y FT-016 en una pregunta autocontenida. Auditoría final: se fija el modo Related nodes (en los modos de call chain el trigger node va en un extremo) y se usa la relación documentada "llaman o usan".
- **FT-023**: Distractores con coletillas delatoras sustituidos por sintaxis plausibles.
- **C-037**: Auditoría final: distractores descartables sin conocer el producto y explicación que no los rebatía; se sustituyen por conceptos de la misma app (segmentos, búsqueda, Problems).
- **C-039**: Auditoría final: el enunciado describía el patrón y la clave lo repetía casi literal; se reformula sin pista.
- **D-039**: Equilibrio de absolutos en distractores.
- **D-040**: Equilibrio de absolutos y de longitud de opciones.
- **E-056**: Equilibrio de absolutos en distractores.
- **E-057**: Equilibrio de absolutos en distractores.
- **E-058**: Equilibrio de absolutos y de longitud de opciones.
- **E-059**: Equilibrio de absolutos en distractores.
- **FT-002**: Equilibrio de absolutos y de longitud de opciones.
- **FT-003**: Clave con absoluto verdadero (la documentación dice "always") para equilibrar absolutos.
- **FT-004**: Equilibrio de absolutos en distractores.
- **FT-008**: Equilibrio de absolutos en distractores.
- **FT-009**: Clave con absoluto verdadero y distractores sin absolutos.
- **FT-010**: Clave con absoluto verdadero (upsert parcial) para equilibrar absolutos.
- **FT-012**: Equilibrio de absolutos y de longitud de opciones.
- **FT-013**: Equilibrio de absolutos en distractores.
- **FT-014**: Equilibrio de absolutos en distractores.
- **FT-017**: Equilibrio de absolutos y de longitud de opciones.
- **FT-018**: Equilibrio de absolutos en distractores.
- **FT-019**: Equilibrio de absolutos en distractores.
- **FT-020**: Equilibrio de absolutos y de longitud de opciones.
- **FT-021**: Equilibrio de absolutos en distractores.
- **FT-022**: Equilibrio de absolutos en distractores.
- **FT-024**: Equilibrio de absolutos y de longitud de opciones.
- **G-181**: Distractores de otros dominios sustituidos por permisos de storage de nombre parecido; se quita el absoluto y se aclara que es el modelo Classic.
- **G-183**: Dato dudoso: la relación runs[dt.entity.service_instance] está documentada en el host, no en el servicio. Se reescribe con el campo verificado runs_on[dt.entity.host] y se marca Classic.
- **G-184**: Las 5 capas son de Smartscape Classic; se marca Classic, se usan los nombres de tier documentados y distractores con órdenes plausibles.
- **G-185**: Concepto de Smartscape Classic marcado como latest y distractores absurdos; se reescribe con la definición documentada.
- **G-186**: Distractores absurdos sustituidos por comandos DQL reales mal aplicados; se elimina el atributo de SO no verificado y se menciona la alternativa Latest.
- **G-187**: Distractores absurdos y afirmación sobre historia ilimitada; se reescribe con hechos verificados (DQL, retención 35 días, DPS).
- **G-188**: ActiveGate group no aplica a extensiones locales en OneAgent y los distractores eran absurdos; se plantea sobre una extensión SNMP remota con secuencias plausibles.
- **G-190**: La descripción (árbol de propagación con la causa en el centro) no corresponde a la documentación del Problem graph; se reescribe sobre affected vs related nodes.
- **G-191**: Dato incorrecto: la relación documentada es instance_of (isInstanceOf), no is_instance_of. Distractores con nombres de relación reales.
- **G-194**: Distractores absurdos; se reformula con funciones reales de la Logs app y se marca latest.
- **G-195**: Distractores absurdos sustituidos por componentes plausibles; se ancla en la documentación SNMP.
- **G-197**: Nombres de botón no verificados y distractores absurdos; se convierte en respuesta múltiple con los destinos documentados para continuar el análisis.
- **G-198**: Distractores absurdos sustituidos por confusiones plausibles entre niveles de entidad Classic.
- **G-199**: Concepto de Smartscape Classic marcado como latest y distractores absurdos; se reescribe con la documentación del tier Data centers.

### Preguntas retiradas (14)

- **A-005**: Pregunta genérica (qué muestra Smartscape) cubierta con más precisión por B-074; sus distractores eran la clave recortada.
- **B-073**: Conocimiento genérico de grafos (nodo = entidad, arista = relación) sin valor de examen.
- **B-078**: Duplicado de B-074 (semántica de la arista calls).
- **E-060**: Pregunta genérica (Smartscape on Grail guarda entidades y relaciones) ya implícita en G-187, E-055 y R-OTH-01.
- **FT-010**: Fusionada con FT-011 (upserts parciales y borrado con null).
- **FT-016**: Fusionada con FT-015 (lados source y target de View topology).
- **B-079**: Duplicado de A-050 (schema on read).
- **G-192**: Duplicado de A-050 (schema on read) con distractores absurdos y mención imprecisa a DPL.
- **G-193**: Duplicado de B-078/B-074 (relación calls) con distractores absurdos.
- **B-077**: Duplicado de FT-018 (el Problem graph solo muestra Problems ACTIVE); se conserva la versión en escenario.
- **G-182**: Duplicado de D-037 (fetch dt.entity.host) y enunciado erróneo (lo presentaba como sintaxis Latest).
- **G-189**: Solapa con FT-019..FT-021 (facetas) y sus distractores eran absurdos.
- **G-196**: Solapa con E-057 y FT-006 (lifetime y retención); "periodo de gracia" no está documentado.
- **G-200**: Pregunta-resumen sin conocimiento verificable.

### Preguntas nuevas (57)

R-OTH-01, R-OTH-02, R-OTH-03, R-OTH-04, R-OTH-05, R-OTH-06, R-OTH-07, R-OTH-08, R-OTH-09, R-OTH-10, R-OTH-11, R-OTH-13, R-OTH-14, R-OTH-15, R-OTH-16, R-OTH-17, R-OTH-18, R-OTH-19, R-OTH-20, R-OTH-21, R-OTH-22, R-OTH-23, R-OTH-24, R-OTH-25, R-OTH-26, R-OTH-27, R-OTH-28, R-OTH-29, R-OTH-30, R-OTH-31, R-OTH-32, R-OTH-33, R-OTH-34, R-OTH-35, R-OTH-36, R-OTH-37, R-OTH-38, R-OTH-39, R-OTH-40, R-OTH-41, R-OTH-42, R-OTH-43, R-OTH-44, R-OTH-45, R-OTH-46, R-OTH-47, R-OTH-48, R-OTH-49, R-OTH-50, R-OTH-51, R-OTH-52, R-OTH-53, R-OTH-54, R-OTH-55, R-OTH-56, R-OTH-57, R-OTH-58

### Apartados ampliados o corregidos (13)

- **log-evidence**: R-OTH-41: retención de default_logs (https://docs.dynatrace.com/docs/platform/grail/organize-data).
- **deep-smartscape-graph**: El apartado describía una "jerarquía estricta de 5 capas" con Process Group y relaciones no documentadas (is_instance_of, contained_in). Se corrige a los 5 tiers documentados de Smartscape Classic (G-184, G-185, G-199) y se separa del modelo actual de nodos y edges. Auditoría final: en el tier Processes cada nodo es un proceso, cuya vista Classic más cercana es dt.entity.process_group_instance.
- **logs**: Auditoría final: el ejemplo usa dt.entity.service (ID Classic) sin aclararlo y la nota final era vaga.
- **deep-entities-query**: El ejemplo atribuía runs[dt.entity.service_instance] al servicio; la documentación lo muestra en el host (inversa de runs_on). Auditoría final: el código 403 no está documentado.
- **hub-integrations**: R-OTH-36: el comando lookup de DQL no multiplica filas; con varias coincidencias solo toma el primer registro (join sí genera una fila por coincidencia).
- **smartscape**: R-OTH-29 y R-OTH-30 necesitan la diferencia entre aristas estáticas y dinámicas y la arista FRONTEND calls SERVICE (https://docs.dynatrace.com/docs/platform/grail/smartscape-on-grail, https://docs.dynatrace.com/docs/semantic-dictionary/model/smartscape/core).
- **entity-model**: R-OTH-38 y R-OTH-39 necesitan cómo se modelan las llamadas de un servicio a bases de datos y el campo lifetime de las entidades Classic (https://docs.dynatrace.com/docs/semantic-dictionary/model/smartscape/core, https://docs.dynatrace.com/docs/platform/grail/querying-monitored-entities).
- **smartscape-diagnosis**: R-OTH-43 necesita qué aristas del modelo core son dinámicas y cuáles estáticas (https://docs.dynatrace.com/docs/semantic-dictionary/model/smartscape/core).
- **hub-verification**: R-OTH-44 y R-OTH-45 necesitan la pestaña Health y los permisos de extensiones (https://docs.dynatrace.com/docs/ingest-from/extensions/manage-extensions).
- **deep-log-investigation**: R-OTH-47 y R-OTH-48 necesitan dónde se usa DPL y el orden recomendado de filter, parse y sort (https://docs.dynatrace.com/docs/platform/grail/dynatrace-pattern-language, https://docs.dynatrace.com/docs/platform/grail/dynatrace-query-language/dql-best-practices).
- **deep-hub-extensions**: R-OTH-51, R-OTH-52 y R-OTH-53 necesitan las secciones de la ficha de una app en Hub y el efecto de actualizar una extensión sobre los metric events. «La ficha técnica incluye … contenidos» mezclaba Technical information con Contents (https://docs.dynatrace.com/docs/manage/hub, https://docs.dynatrace.com/docs/ingest-from/extensions/manage-extensions).
- **deep-cross-app-troubleshooting**: R-OTH-54 necesita el mecanismo que pasa el contexto entre apps (https://developer.dynatrace.com/develop/intents/, https://docs.dynatrace.com/docs/manage/hub).
- **dql-dpl**: R-OTH-11: comportamiento de parse cuando el pattern no coincide.

### Apartados nuevos (9)

sup-smartscape-app, sup-problem-graph, sup-smartscape-on-grail, sup-smartscape-dql, sup-smartscape-events, sup-classic-entities, sup-logs-app, sup-log-patterns, sup-hub-extensions-setup

### Ficha de precisión

Auditoría final: fetch dt.entity.* es el modelo Classic (no Latest), is_instance_of no existe (instance_of / instantiates), el código 403 no está documentado, la fila de 5 capas no era Classic ni usaba los tiers documentados (Processes, no Process Group) y el producto se llama Log Management and Analytics.
