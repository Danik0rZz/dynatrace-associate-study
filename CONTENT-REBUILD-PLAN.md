# Plan de reconstrucción del contenido de Dynatrace Associate

Estado: banco tipo test implantado con 480 preguntas en diez módulos evaluables  
Fecha de referencia: 28 de septiembre de 2026  
Aplicación: `study-app`  
Fuente principal del path: [Dynatrace Associate Certification Learning Plan](https://university.dynatrace.com/learn/public/learning_plan/view/47/dynatrace-associate-certification-learning-plan)  
Path publicado: [Associate Certification Learning Path 2025](https://community.dynatrace.com/pssft35649/attachments/pssft35649/GetStarted/1351/1/Associate_Certification_Learning_Path_2025.pdf)

## 1. Decisión de alcance

La aplicación se reconstruirá como una guía autocontenida y trazable. No se tratará de traducir el índice ni de resumir cada capítulo en unos pocos párrafos.

Cada módulo tendrá:

- una guía de estudio extensa en español;
- terminología de producto, nombres de aplicaciones, campos, permisos y sintaxis DQL en inglés cuando sea la forma oficial;
- conceptos, comparaciones, procedimientos, límites, requisitos, permisos, retención y errores frecuentes;
- enlaces contextuales a la documentación oficial para verificar o ampliar cada bloque;
- una matriz de cobertura que conecte objetivo, fuente, explicación, práctica y preguntas;
- preguntas que no puedan existir sin una afirmación fuente asociada;
- una marca de versión: `Latest Dynatrace`, `Dynatrace Classic`, `DPS`, `preview`, `experimental`, `deprecated` o dependiente de tenant/licencia/permisos.

La guía no presentará como regla universal una característica que la documentación marque como dependiente de versión, licencia, permisos, configuración o disponibilidad regional. Cuando un dato pueda cambiar —por ejemplo una retención, un límite o un requisito de versión— se mostrará como dato versionado con fecha de verificación.

## 2. Path oficial que se cubrirá

El documento oficial del path enumera estos doce apartados:

1. **Welcome**
2. **Instructions**
3. **The Dynatrace Platform**
4. **Monitoring & Infrastructure Observability**
5. **Notebooks & Dashboards**
6. **Business Analytics and DEM**
7. **Data, Reporting & Analysis**
8. **DQL (Dynatrace Query Language)**
9. **Security**
10. **Automation**
11. **Ingestion**
12. **Other**

El [Learning Plan actual](https://university.dynatrace.com/learn/public/learning_plan/view/47/dynatrace-associate-certification-learning-plan) presenta tres recursos obligatorios: Exam Preparation Guide, Study Guide y Practice Simulations. Recomienda además completar Dynatrace Essentials. El PDF 2025 se conservará como mapa de alcance, pero no se tratará como autoridad suficiente para detalles funcionales que hayan cambiado en Latest Dynatrace.

## 3. Inventario de documentación por apartado

El inventario se organizará en tres niveles:

1. **Fuente de alcance**: el capítulo correspondiente del path oficial.
2. **Fuente conceptual**: páginas de explicación y conceptos de Dynatrace Docs.
3. **Fuente operativa**: configuración, permisos, límites, retención, APIs, troubleshooting y referencias de campos/comandos.

La lista siguiente fue el inventario de semillas de investigación. El catálogo operativo deduplicado vive en [`src/data/source-catalog.ts`](./src/data/source-catalog.ts), se muestra dentro de cada módulo y se asigna también a los bloques de estudio y preguntas. Los enlaces fueron comprobados contra el dominio oficial; los recursos de Community y ProctorU pueden responder `403` a comprobaciones automatizadas aunque sigan siendo enlaces oficiales accesibles desde navegador.

El catálogo actual contiene 105 URLs oficiales únicas entre Dynatrace University, el path publicado y Dynatrace Docs. No se presenta como una congelación de la documentación: las cifras, límites, permisos y rutas de UI deben volver a verificarse si Dynatrace publica una modificación.

### 3.1 Welcome

Objetivo: entender el mapa de capacidades y el flujo de investigación de Dynatrace antes de entrar en cada producto.

Fuentes y subtemas:

- [What is Dynatrace](https://docs.dynatrace.com/docs/discover-dynatrace/what-is-dynatrace): plataforma, observabilidad, seguridad, automatización, business analytics y extensibilidad.
- [Dynatrace Platform](https://docs.dynatrace.com/docs/platform): visión general de la plataforma y sus servicios.
- [Root cause analysis concepts](https://docs.dynatrace.com/docs/dynatrace-intelligence/root-cause-analysis/concepts): incidente, Davis event, Problem, root cause, impact, lifecycle y correlación contextual.
- [Event analysis and correlation](https://docs.dynatrace.com/docs/dynatrace-intelligence/root-cause-analysis/event-analysis-and-correlation): análisis causal, topology y business impact.
- [Problems app](https://docs.dynatrace.com/docs/dynatrace-intelligence/problems-app): feed, filtros, affected entities, root cause e impact.
- [Smartscape concepts](https://docs.dynatrace.com/docs/analyze-explore-automate/smartscape/smartscape-concepts): topología, entidades, relaciones, búsqueda y drilldowns.
- [Smartscape core entities](https://docs.dynatrace.com/docs/semantic-dictionary/model/smartscape/core): host, process, service, container, disk, frontend y relaciones.
- [Dynatrace Hub](https://docs.dynatrace.com/docs/manage/hub): descubrir capacidades, apps y extensiones.
- [Grail](https://docs.dynatrace.com/docs/platform/grail): almacenamiento unificado, contexto, DQL y acceso.

La guía explicará un flujo completo: detectar una anomalía, abrir el Problem, distinguir Davis events de Problem, leer root cause e impact, navegar por Smartscape, abrir la entidad afectada y continuar con logs, métricas, trazas, DQL, dashboards o Workflows.

### 3.2 Instructions

Objetivo: interpretar correctamente los prerrequisitos, recursos de preparación y límites de lo que se puede afirmar sobre el examen.

Fuentes y subtemas:

- [Learning Plan oficial](https://university.dynatrace.com/learn/public/learning_plan/view/47/dynatrace-associate-certification-learning-plan): recursos obligatorios, duración publicada, idioma y recomendación de Dynatrace Essentials.
- [Associate Certification Learning Path 2025](https://community.dynatrace.com/pssft35649/attachments/pssft35649/GetStarted/1351/1/Associate_Certification_Learning_Path_2025.pdf): prerrequisitos técnicos y capítulos del study path.
- [Dynatrace Essentials](https://university.dynatrace.com/learn/public/learning_plan/view/47/dynatrace-associate-certification-learning-plan): recurso recomendado de base; se marcará como prerrequisito recomendado, no como requisito de examen salvo que Dynatrace lo indique explícitamente.
- [Dynatrace documentation](https://docs.dynatrace.com/): consulta de versión, producto y modalidad.

La guía distinguirá entre: contenido del path, contenido necesario para entenderlo, formato del examen publicado por Dynatrace y datos que deben verificarse en University antes de reservar. No se inventarán pesos, número de preguntas, tiempo ni porcentaje de aprobado si no están publicados en una fuente oficial vigente.

### 3.3 The Dynatrace Platform

Objetivo: explicar la plataforma, la UI, Grail, Davis, Hub, soporte y el modelo Latest frente a Classic.

Fuentes y subtemas:

- [What is Dynatrace](https://docs.dynatrace.com/docs/discover-dynatrace/what-is-dynatrace).
- [Grail overview](https://docs.dynatrace.com/docs/platform/grail).
- [What is Grail](https://docs.dynatrace.com/docs/platform/grail/dynatrace-grail).
- [Grail concepts](https://docs.dynatrace.com/docs/platform/grail/dynatrace-grail/concepts): permisos, ABAC, DPS y conceptos de almacenamiento.
- [Organize data in Grail](https://docs.dynatrace.com/docs/platform/grail/organize-data): buckets, retención, acceso y organización.
- [Dynatrace UI](https://docs.dynatrace.com/docs/discover-dynatrace/get-started/dynatrace-ui): Launcher, aplicaciones, contexto y navegación.
- [Share documents](https://docs.dynatrace.com/docs/discover-dynatrace/get-started/dynatrace-ui/share): ownership, Can view, Can edit, environment sharing y enlaces.
- [Dynatrace Hub](https://docs.dynatrace.com/docs/manage/hub): apps, extensions, technical information, permisos e instalación.
- [Root cause analysis concepts](https://docs.dynatrace.com/docs/dynatrace-intelligence/root-cause-analysis/concepts).
- [Dynatrace Intelligence limits](https://docs.dynatrace.com/docs/dynatrace-intelligence/reference/dynatrace-intelligence-limits): límites de Problems y Davis events.
- [Data privacy and security](https://docs.dynatrace.com/docs/manage/data-privacy-and-security): privacidad, masking, permisos y retención.

La guía incluirá un mapa de arquitectura: fuentes de telemetría → ingestión/procesamiento → Grail → DQL/apps → Davis/Problems → automatización. Se explicará qué parte es plataforma común y qué parte requiere una capability concreta o DPS.

### 3.4 Monitoring & Infrastructure Observability

Objetivo: dominar OneAgent y las formas de observación de aplicaciones, procesos, hosts, bases de datos, Kubernetes, cloud y AI.

Fuentes y subtemas:

- [OneAgent overview](https://docs.dynatrace.com/docs/platform/oneagent).
- [Supported monitoring types](https://docs.dynatrace.com/docs/platform/oneagent/supported-monitoring-types): RUM web/mobile, servicios, bases de datos, procesos, hosts, cloud, contenedores y análisis de causa raíz.
- [How OneAgent works](https://docs.dynatrace.com/docs/platform/oneagent/how-one-agent-works): procesos especializados, detección, inyección, RUM, logs, red y comunicación outbound.
- [OneAgent monitoring modes](https://docs.dynatrace.com/docs/platform/oneagent/monitoring-modes/monitoring-modes): Full-Stack, Infrastructure, Discovery, matriz de capacidades y condiciones de Discovery.
- [Enable monitoring modes](https://docs.dynatrace.com/docs/platform/oneagent/monitoring-modes/enable-monitoring-modes): activación y configuración de modos.
- [OneAgent CLI configuration](https://docs.dynatrace.com/docs/ingest-from/dynatrace-oneagent/oneagent-configuration-via-command-line-interface): `--set-monitoring-mode`, `--get-monitoring-mode` y valores válidos.
- [OneAgent platform and capability support matrix](https://docs.dynatrace.com/docs/ingest-from/technology-support/oneagent-platform-and-capability-support-matrix): tecnologías y capacidades soportadas.
- [Application and Infrastructure Observability overview](https://docs.dynatrace.com/docs/license/capabilities/app-infra-observability): Full Stack, Infrastructure y Foundation & Discovery bajo DPS.
- [Infrastructure Observability](https://docs.dynatrace.com/docs/observe/infrastructure-observability): hosts, procesos, contenedores, bases de datos y cloud.
- [Databases](https://docs.dynatrace.com/docs/observe/infrastructure-observability/databases): requisitos de ActiveGate, extensiones, conectividad y vistas de base de datos.
- [Kubernetes](https://docs.dynatrace.com/docs/observe/infrastructure-observability/kubernetes-app): clusters, nodes, namespaces, workloads, pods, services, containers, Grail y ActiveGate.
- [Monitor Kubernetes metrics](https://docs.dynatrace.com/docs/observe/infrastructure-observability/container-platform-monitoring/kubernetes-monitoring/monitor-metrics-kubernetes): API monitoring, ActiveGate, cAdvisor y límites de disponibilidad.
- [Monitor Kubernetes events](https://docs.dynatrace.com/docs/observe/infrastructure-observability/container-platform-monitoring/kubernetes-monitoring/monitor-events-kubernetes): eventos nativos, eventos inferidos y Davis.
- [VMware vSphere monitoring](https://docs.dynatrace.com/docs/observe/infrastructure-observability/vmware-vsphere-monitoring): ActiveGate, capa de virtualización y datos complementarios de OneAgent.
- [Cloud application and workload detection](https://docs.dynatrace.com/docs/observe/infrastructure-observability/process-groups/configuration/cloud-app-and-workload-detection): detección de workloads y process groups.
- [Davis root cause analysis](https://docs.dynatrace.com/docs/dynatrace-intelligence/root-cause-analysis/concepts): baselines, anomalías, topology, causa e impacto.

Este módulo tendrá un capítulo profundo de OneAgent, no una introducción anecdótica. Incluirá tablas Full Stack/Infrastructure/Discovery, requisitos de inyección, qué datos dejan de estar disponibles en cada modo, cuándo interviene ActiveGate, qué permanece habilitado cuando se desactiva una capacidad, reinicios de procesos, soporte de tecnologías, costes/licencia y escenarios de elección de modo.

### 3.5 Notebooks & Dashboards

Objetivo: seleccionar la herramienta de análisis adecuada, construir documentos, consultar Grail, visualizar resultados, compartirlos y controlar permisos.

Fuentes y subtemas:

- [Notebooks](https://docs.dynatrace.com/docs/analyze-explore-automate/dashboards-and-notebooks/notebooks): secciones Explore, Query, Code y Markdown; timeframe; autocomplete; secciones predefinidas; anotaciones; organización y ejecución.
- [Dashboards](https://docs.dynatrace.com/docs/analyze-explore-automate/dashboards-and-notebooks/dashboards-new): tiles, Explore, Query, Code, Markdown, variables, visualizaciones, exportación y ownership.
- [Share documents](https://docs.dynatrace.com/docs/discover-dynatrace/get-started/dynatrace-ui/share): Can view, Can edit, links, owner y editores.
- [DQL language reference](https://docs.dynatrace.com/docs/discover-dynatrace/references/dynatrace-query-language/dql-reference): queries que alimentan documentos.
- [Explore data](https://docs.dynatrace.com/docs/analyze-explore-automate/explorer): exploración sin DQL y transición a consulta.
- [Dashboard variables](https://docs.dynatrace.com/docs/analyze-explore-automate/dashboards-and-notebooks/dashboards-new): tipos DQL, Code, List y Free Text; multi-select; dependencias y ciclos.
- [Business event analysis](https://docs.dynatrace.com/docs/observe/business-observability/bo-analysis): uso de DQL en notebooks y dashboards.

Las preguntas cubrirán también diferencias que suelen producir errores: un documento no es un dashboard estático; un tile Explore no tiene el mismo contrato que uno Query; cambiar ownership puede retirar el acceso; un permiso de visualización no equivale a permiso de edición; y una variable tiene reglas de clave, dependencias, valores por defecto y multi-select.

### 3.6 Business Analytics and DEM

Objetivo: conectar señales de negocio con experiencia real y sintética, sin confundir tipos de evento ni modelos de consumo.

Fuentes y subtemas:

- [Business Observability overview](https://docs.dynatrace.com/docs/observe/business-observability): conceptos, captura, ingestión, límites, procesamiento, retención, análisis y use cases.
- [Basic concepts of Business Observability](https://docs.dynatrace.com/docs/observe/business-observability/bo-basic-concepts): business event, business-grade data, metadatos, capture/process/analyze y Semantic Dictionary.
- [Business event analysis](https://docs.dynatrace.com/docs/observe/business-observability/bo-analysis): consultas y análisis.
- [Business reporting](https://docs.dynatrace.com/docs/observe/business-observability/business-reporting): KPIs, fuentes, contexto Smartscape y reporting.
- [Business event capture](https://docs.dynatrace.com/docs/observe/business-observability/bo-events-capturing): OneAgent, RUM y fuentes externas.
- [Ingest business events via API](https://docs.dynatrace.com/docs/observe/business-observability/bo-events-capturing/bo-events-capturing-external-sources): endpoint `/bizevents/ingest`, JSON/CloudEvents, autenticación, payload y límites.
- [Business event processing](https://docs.dynatrace.com/docs/observe/business-observability/bo-event-processing): filtering, parsing, enrichment, transformation, retención y transición de classic pipeline a OpenPipeline.
- [Real User Monitoring](https://docs.dynatrace.com/docs/semantic-dictionary/model/rum): user.events, user.sessions, user actions, sessions y session properties.
- [Real User and Synthetic Monitoring overview](https://docs.dynatrace.com/docs/license/capabilities/real-user-synthetic-monitoring): RUM, Browser Monitor/Clickpath, HTTP Monitor y third-party synthetic.
- [Synthetic Monitoring](https://docs.dynatrace.com/docs/observe/digital-experience/synthetic): monitors, locations, execution y análisis.
- [RUM data model](https://docs.dynatrace.com/docs/observe/digital-experience/new-rum-experience/concepts/data-model): modelo de datos y relación entre eventos/sesiones.
- [RUM web user sessions](https://docs.dynatrace.com/docs/observe/digital-experience/rum/web-frontends/concepts/user-sessions-web): sesiones, acciones y journeys.
- [Digital Experience Monitoring units](https://docs.dynatrace.com/docs/license/classic-licensing/digital-experience-monitoring-units): referencia Classic separada del modelo DPS actual.
- [Business Flow](https://docs.dynatrace.com/docs/observe/business-observability/business-flow/set-up-business-flow): journeys, KPIs y retención de business events.

La guía separará expresamente: user event, user action, user session, business event, Davis event, Problem, RUM, Synthetic Monitor, session property, business KPI y journey. Se incluirán escenarios donde el mismo hecho puede tener señal técnica, señal de experiencia y señal de negocio, pero no son intercambiables.

### 3.7 Data, Reporting & Analysis

Objetivo: analizar métricas, trazas, logs, eventos, sesiones, comportamiento, reportes y retención con el modelo correcto.

Fuentes y subtemas:

- [Grail](https://docs.dynatrace.com/docs/platform/grail): almacenamiento y contexto unificado.
- [Metrics powered by Grail](https://docs.dynatrace.com/docs/license/capabilities/metrics): ingest & process, retain, query, rollup y buckets.
- [Metrics](https://docs.dynatrace.com/docs/analyze-explore-automate/metrics): métricas, dimensiones, agregaciones y análisis.
- [Metrics FAQ](https://docs.dynatrace.com/docs/analyze-explore-automate/metrics/faq): precisión, resolución, consulta y límites.
- [Data retention periods](https://docs.dynatrace.com/docs/manage/data-privacy-and-security/data-privacy/data-retention-periods): retenciones por tipo, Latest/Classic y trials.
- [Log Analytics](https://docs.dynatrace.com/docs/analyze-explore-automate/logs): schema-on-read, OpenPipeline, DQL, costes, retención y análisis.
- [Root cause analysis concepts](https://docs.dynatrace.com/docs/dynatrace-intelligence/root-cause-analysis/concepts): baselining, eventos, Problems, root cause e impact.
- [Real User Monitoring](https://docs.dynatrace.com/docs/semantic-dictionary/model/rum): usuarios, user events, user sessions y session properties; desde esta página se rastrearán las páginas de User Analytics que estén vigentes.
- [Business reporting](https://docs.dynatrace.com/docs/observe/business-observability/business-reporting): KPIs y reporting de negocio.
- [Dashboards](https://docs.dynatrace.com/docs/analyze-explore-automate/dashboards-and-notebooks/dashboards-new): publicación, visualización, exportación y sharing; la suscripción a reports se comprobará desde sus enlaces relacionados vigentes.
- [Ingest business events via API](https://docs.dynatrace.com/docs/observe/business-observability/bo-events-capturing/bo-events-capturing-external-sources): incluye la referencia operativa del Grail - DQL Query API, sus dos pasos `query:execute`/`query:poll`, OAuth y límites.

La guía tendrá un bloque de retención con una tabla separada por `Latest Dynatrace`, `Classic`, `Grail`, tipo de dato y fecha de verificación. Como base actual documentada: métricas Grail 15 meses por defecto, métricas Classic 5 años, Davis Problems/events 14 meses, RUM 35 días y Synthetic 35 días; cada cifra se marcará como susceptible de cambio y no se mezclará con otra arquitectura.

### 3.8 DQL (Dynatrace Query Language)

Objetivo: escribir, leer y corregir consultas DQL para observabilidad, seguridad, negocio, logs, entidades y métricas.

Fuentes y subtemas:

- [DQL overview](https://docs.dynatrace.com/docs/platform/grail/dynatrace-query-language): propósito, Grail y ejecución.
- [DQL language reference](https://docs.dynatrace.com/docs/discover-dynatrace/references/dynatrace-query-language/dql-reference): sintaxis, pipeline y comandos.
- [DQL commands](https://docs.dynatrace.com/docs/shortlink/dql-commands): `fetch`, `data`, `describe`, `timeseries`, `metrics`, `filter`, `search`, `fields`, `parse`, `sort`, `limit`, `summarize` y estructuración.
- [DQL filtering commands](https://docs.dynatrace.com/docs/platform/grail/dynatrace-query-language/commands/filtering-commands): `filter`, `search`, operadores y búsqueda.
- [DQL data types](https://docs.dynatrace.com/docs/platform/grail/dynatrace-query-language/data-types): tipos primitivos, arrays, records, casting y acceso.
- [DQL functions](https://docs.dynatrace.com/docs/platform/grail/dynatrace-query-language/functions): funciones de strings, arrays, fechas, matemáticas, parsing y agregación.
- [DQL best practices](https://docs.dynatrace.com/docs/platform/grail/dynatrace-query-language/dql-best-practices): orden de filtros, reducción de datos, `summarize`, `maketimeseries`, buckets y `scanLimitGBytes`.
- [DPL](https://docs.dynatrace.com/docs/platform/grail/dynatrace-pattern-language): matchers, parsing y uso con `parse`/OpenPipeline.
- [DQL metric commands](https://docs.dynatrace.com/docs/platform/grail/dynatrace-query-language/commands/metric-commands): `timeseries`, métricas y resoluciones.
- [DQL log examples](https://docs.dynatrace.com/docs/analyze-explore-automate/logs): logs, parsing y análisis.
- [Davis DQL examples](https://docs.dynatrace.com/docs/dynatrace-intelligence/use-cases/dynatrace-intelligence-dql-examples): Problems y Davis events en Grail.
- [Query monitored entities](https://docs.dynatrace.com/docs/platform/grail/querying-monitored-entities): entidades y Smartscape desde DQL.

La guía incluirá ejercicios de salida y no solo memoria de comandos: predecir qué registros quedan tras cada pipe, detectar por qué `limit` antes de una agregación puede alterar el resultado, elegir entre `summarize` y `timeseries`, distinguir DQL de DPL, identificar tipos, leer records anidados y optimizar una consulta sin cambiar su semántica.

### 3.9 Security

Objetivo: diferenciar vulnerabilidades de terceros, code-level y runtime; priorizar riesgo; usar Security Advisor e investigar.

Fuentes y subtemas:

- [Application Security](https://docs.dynatrace.com/docs/secure/application-security): alcance, capacidades y requisitos.
- [Vulnerability evaluation](https://docs.dynatrace.com/docs/secure/application-security/vulnerability-analytics/vulnerability-evaluation): detección y evaluación de third-party/code-level.
- [Third-party vulnerabilities](https://docs.dynatrace.com/docs/secure/application-security/vulnerability-analytics/third-party-vulnerabilities): componentes, bibliotecas en uso, recomendaciones y remediation tracking.
- [Code-level vulnerabilities](https://docs.dynatrace.com/docs/secure/application-security/vulnerability-analytics/code-level-vulnerabilities): vulnerabilidades en código y runtime.
- [Prioritize vulnerabilities](https://docs.dynatrace.com/docs/secure/vulnerabilities/prioritize): DSS, exposición, datos alcanzables, exploits, evolución, CISA KEV y cobertura.
- [Davis Security Advisor API](https://docs.dynatrace.com/docs/dynatrace-api/environment-api/application-security/davis-security-advice): recomendaciones, paginación, scopes y permisos.
- [Davis Security Advisor API](https://docs.dynatrace.com/docs/dynatrace-api/environment-api/application-security/davis-security-advice): recomendaciones, paginación, scopes y permisos; las reglas de cálculo se cubrirán desde la documentación enlazada por la página de vulnerabilidades.
- [Investigations](https://docs.dynatrace.com/docs/secure/investigations): consultas DQL, DPL, query tree, evidence, contexto y colaboración.
- [Investigations concepts](https://docs.dynatrace.com/docs/secure/investigations/concepts): escenarios, nodos, tamaño y límites.
- [Security notifications for vulnerabilities](https://docs.dynatrace.com/docs/secure/application-security/vulnerability-analytics/security-notifications-rva): integración y aviso explícito de que la ruta es Classic/deprecated.
- [Security data retention](https://docs.dynatrace.com/docs/manage/data-privacy-and-security/data-privacy/data-retention-periods): Grail y Classic.
- [Application Security FAQ](https://docs.dynatrace.com/docs/secure/application-security/faq): limitaciones, requisitos y comportamiento.

Las preguntas distinguirán “la librería está presente” de “la librería está en uso”, “severidad” de “riesgo contextual”, “vulnerabilidad de código” de “third-party vulnerability”, recomendación de Security Advisor, resolución automática, permisos de lectura y APIs. Las páginas Classic/deprecated se mantendrán solo cuando sirvan para detectar una comparación de versión.

### 3.10 Automation

Objetivo: diseñar y operar Workflows con triggers, tasks, actions, actors, permisos, ejecución y control.

Fuentes y subtemas:

- [Workflows](https://docs.dynatrace.com/docs/analyze-explore-automate/workflows): casos de uso, prerrequisitos, acciones, auditoría, retries, loops y paralelismo.
- [AutomationEngine](https://docs.dynatrace.com/docs/platform/automationengine): motor, ejecución y autorización.
- [Workflows](https://docs.dynatrace.com/docs/analyze-explore-automate/workflows): workflow, task, action, actor, execution y tipos, con enlaces de aprendizaje oficiales a cada concepto.
- [Workflow triggers](https://docs.dynatrace.com/docs/analyze-explore-automate/workflows/build/trigger): on-demand, event, schedule y API.
- [Event triggers](https://docs.dynatrace.com/docs/analyze-explore-automate/workflows/build/trigger/event-trigger): Problem, Davis event, event trigger y espera de root-cause analysis.
- [Schedule triggers](https://docs.dynatrace.com/docs/analyze-explore-automate/workflows/build/trigger/schedule-trigger): intervalos, calendario y ventanas.
- [Manage workflow permissions](https://docs.dynatrace.com/docs/analyze-explore-automate/workflows/security): permisos de usuario, admin, actor, authorization settings y 403.
- [Monitor workflow executions](https://docs.dynatrace.com/docs/analyze-explore-automate/workflows/running): ejecuciones, tasks, estados, cancelación, repetición, actor, resultados y retención.
- [Workflow actions](https://docs.dynatrace.com/docs/analyze-explore-automate/workflows/default-workflow-actions/actions): acciones integradas, funciones y sistemas externos.
- [Jinja expressions](https://docs.dynatrace.com/docs/analyze-explore-automate/workflows/reference): expresiones, contexto y datos de tasks.
- [Event triggers](https://docs.dynatrace.com/docs/analyze-explore-automate/workflows/build/trigger/event-trigger): límites de triggers y throttling; los límites restantes se rastrearán desde la referencia vigente de Workflows.

Se practicará el diagnóstico de un workflow que no arranca, que arranca pero falla en una task, que carece de permisos del actor o que procesa el tipo de evento equivocado. Se explicará que un workflow no es un mecanismo de ingestión masiva y que la ejecución se evalúa en el contexto del actor.

### 3.11 Ingestion

Objetivo: seleccionar el mecanismo correcto para logs, métricas, trazas, eventos y datos de cloud o VMware.

Fuentes y subtemas:

- [Log ingestion](https://docs.dynatrace.com/docs/analyze-explore-automate/logs/lma-log-ingestion): OneAgent, API, ActiveGate/syslog, Kubernetes, OTLP, cloud forwarding y extensiones.
- [Log Analytics](https://docs.dynatrace.com/docs/analyze-explore-automate/logs): fuentes, OpenPipeline, Grail, schema-on-read y consumo.
- [Log ingestion via OneAgent](https://docs.dynatrace.com/docs/analyze-explore-automate/logs/lma-log-ingestion/log-ingestion-via-oneagent): descubrimiento y configuración.
- [Log ingest API](https://docs.dynatrace.com/docs/analyze-explore-automate/logs/lma-log-ingestion/log-ingestion-api): endpoint, payload, autenticación y límites.
- [Ingest sources in OpenPipeline](https://docs.dynatrace.com/docs/platform/openpipeline/reference/api-ingestion-reference): source, endpoint y token para API/OTLP.
- [OpenPipeline](https://docs.dynatrace.com/docs/platform/openpipeline): procesamiento, routing, masking, parsing y transformación.
- [Log processing with DPL](https://docs.dynatrace.com/docs/platform/grail/dynatrace-pattern-language): parseo y matchers.
- [OpenTelemetry ingestion](https://docs.dynatrace.com/docs/ingest-from/opentelemetry): OTLP, Collector y endpoints.
- [Cloud integrations](https://docs.dynatrace.com/docs/ingest-from/cloud-integrations): integraciones y fuentes cloud.
- [VMware vSphere monitoring](https://docs.dynatrace.com/docs/observe/infrastructure-observability/vmware-vsphere-monitoring): ActiveGate y capa de virtualización.
- [Ingest business events via API](https://docs.dynatrace.com/docs/observe/business-observability/bo-events-capturing/bo-events-capturing-external-sources): API de business events.
- [Metric ingestion](https://docs.dynatrace.com/docs/ingest-from/extend-dynatrace/metrics): métricas custom y API.
- [Trace ingestion](https://docs.dynatrace.com/docs/ingest-from/opentelemetry/ingest-opentelemetry): trazas OTLP.
- [Bucket assignment](https://docs.dynatrace.com/docs/analyze-explore-automate/logs/lma-bucket-assignment): destino, retención y permisos.

Los ejercicios partirán de restricciones concretas: no se puede instalar OneAgent, se necesita syslog, llega OTLP desde un Collector, se requiere masking antes de almacenar, se quiere conservar logs diez años o se deben consultar datos de VMware. La respuesta deberá justificar mecanismo, endpoint, componente intermediario, scope y ruta de procesamiento.

### 3.12 Other

Objetivo: consolidar topology, logs, entidades, Smartscape, Hub y capacidades transversales.

Fuentes y subtemas:

- [Smartscape](https://docs.dynatrace.com/docs/analyze-explore-automate/smartscape): vistas de topología, búsqueda, relaciones y drilldowns.
- [Smartscape concepts](https://docs.dynatrace.com/docs/analyze-explore-automate/smartscape/smartscape-concepts).
- [Smartscape core entities](https://docs.dynatrace.com/docs/semantic-dictionary/model/smartscape/core): definiciones y correspondencias Latest/Classic.
- [Log Analytics](https://docs.dynatrace.com/docs/analyze-explore-automate/logs): exploración de logs, schema-on-read, DQL y OpenPipeline.
- [Logs app](https://docs.dynatrace.com/docs/analyze-explore-automate/logs/logs-app): filtros, contexto, visualización y drilldowns.
- [DQL log commands](https://docs.dynatrace.com/docs/platform/grail/dynatrace-query-language/commands): `fetch logs`, `filter`, `search`, `parse`, `summarize`, `sort` y `limit`.
- [Dynatrace Hub](https://docs.dynatrace.com/docs/manage/hub): apps, extensiones, permisos, technical information y lifecycle.
- [Query monitored entities](https://docs.dynatrace.com/docs/platform/grail/querying-monitored-entities): entidades, IDs y datos de Smartscape.
- [Semantic Dictionary](https://docs.dynatrace.com/docs/semantic-dictionary): campos, modelos y nombres normalizados.
- [Data privacy and security](https://docs.dynatrace.com/docs/manage/data-privacy-and-security): masking, acceso y exposición de datos.

Se incluirán prácticas de identificación de entidad: `Host` frente a `Process Group`/`Process Group Instance`, `Service` frente a `Application`, nodo de Smartscape frente a registro de logs, y app instalada frente a extensión activada.

## 4. Cómo se convertirá la documentación en una guía real

Cada módulo se dividirá en capítulos de estudio, no en una tarjeta-resumen. El mínimo de contenido por módulo será:

- mapa de objetivos y prerrequisitos;
- glosario específico;
- arquitectura y flujo de datos;
- conceptos y definiciones;
- tablas de comparación;
- pasos de configuración o navegación;
- requisitos de licencia, versión y permisos;
- límites, retenciones y costes cuando estén documentados;
- errores frecuentes y troubleshooting;
- prácticas guiadas con datos de entrada y resultado esperado;
- resumen de memorización rápida;
- fuentes enlazadas por afirmación;
- preguntas asociadas a cada subobjetivo.

El contenido se almacenará de forma estructurada para que la aplicación pueda renderizarlo como lectura guiada, índice navegable, tarjetas de conceptos, tablas, bloques de alerta y prácticas. No se meterá todo en un único párrafo de texto que después no pueda reutilizarse para generar evaluaciones.

## 5. Banco de preguntas y revisión de calidad

La versión actual retira las 480 preguntas generadas por semillas, cuyo volumen ocultaba alternativas absurdas. Hay 480 preguntas propias con cuatro opciones temáticas por pregunta. El segundo bloque aportó 80 preguntas; el tercero y el cuarto, 40 cada uno; el quinto, 60; y el bloque final, 194. Welcome e Instructions se mantienen como orientación, sin preguntas de examen. Cada uno de los diez módulos evaluables tiene 48 preguntas. Esta distribución es editorial y no atribuye pesos oficiales al examen.

Cada pregunta tendrá, como mínimo:

```ts
{
  id,
  moduleId,
  chapterId,
  objectiveId,
  sourceRefs,
  type,
  cognitiveLevel,
  difficulty,
  promptEs,
  options,
  correctOptionIds,
  explanationEs,
  stimulus,
  classicOrLatest,
  versionNote,
  lastVerified
}
```

La distribución objetivo para futuras ampliaciones será:

| Familia | Objetivo orientativo por módulo | Qué debe evaluar |
|---|---:|---|
| Conocimiento fundamental | 12 | Conceptos y definiciones que el candidato debe recordar. |
| Precisión y alternativas cercanas | 12 | Condiciones, diferencias Latest/Classic, permisos, límites y términos parecidos. |
| Escenarios técnicos | 14 | Selección de herramienta, modo, fuente, flujo o siguiente paso. |
| Troubleshooting, permisos y límites | 8 | Diagnóstico ordenado, scopes, actor, retención, versión y restricciones. |
| Mini-prácticas | 2 | DQL, pantalla, configuración, resultado o tabla. |

Las preguntas no usarán ambigüedad artificial. Una pregunta “trampa” será precisa y tendrá un motivo verificable para que cada distractor sea incorrecto. Se prohibirán:

- afirmaciones que dependan de una versión no indicada;
- opciones con dos respuestas defendibles;
- preguntas que confundan un valor de Classic con Latest sin avisarlo;
- detalles de UI no presentes en la fuente o que puedan haber cambiado;
- filtraciones o supuestas preguntas reales del examen;
- distractores absurdos que permitan acertar por descarte superficial;
- preguntas cuyo único objetivo sea recordar una traducción literal.

### Revisión adversarial de cada pregunta

Cada pregunta pasará por estas comprobaciones:

1. **Prueba de fuente**: la respuesta correcta aparece en una fuente oficial enlazada.
2. **Prueba de unicidad**: ninguna otra opción es correcta bajo las condiciones del enunciado.
3. **Prueba de alternativas**: todas pertenecen al mismo ámbito técnico, son plausibles en algún contexto y sólo la clave satisface por completo el enunciado.
4. **Prueba de alcance**: la pregunta pertenece al objetivo y capítulo que declara.
5. **Prueba de versión**: Latest, Classic, DPS, preview, experimental y deprecated están visibles.
6. **Prueba de dificultad**: se justifica por el razonamiento requerido, no por redacción confusa.
7. **Prueba de no repetición**: no se cambia solo el nombre de una entidad para simular una pregunta nueva.
8. **Prueba de recuperación**: después del error se muestra la explicación y la fuente exacta.

## 6. Modos de evaluación

- **Quiz rápido**: 8 preguntas estratificadas, feedback inmediato y enlace al capítulo fuente.
- **Módulo completo**: todo el banco disponible del módulo.
- **Repaso adaptativo**: prioridad a fallos recientes, baja confianza, dificultad alta y objetivos con baja cobertura.
- **Simulacro**: 60 preguntas seleccionadas entre las menos practicadas, sin atribuir pesos oficiales no publicados; feedback y revisión de fallos al final.
- **Prácticas**: ejercicios DQL, interpretación de resultados, configuración y decisiones operativas separados de la puntuación teórica.
- **Historial**: error, respuesta elegida, respuesta correcta, explicación, fuente y fecha de último intento.

El sistema de dominio no se calculará solo con porcentaje global. Mostrará cobertura por módulo, capítulo, objetivo y familia de pregunta. Un 85% global no ocultará un 40% en OneAgent monitoring modes o DQL parsing.

## 7. Proceso de implementación por fases

### Fase A — inventario y normalización

- extraer el path y sus objetivos;
- comprobar la fuente oficial y la URL canónica;
- rastrear enlaces internos relevantes desde cada semilla;
- clasificar cada página como explicación, how-to, reference, limits, permissions, API, Classic o Latest;
- registrar título, URL, fecha de actualización, producto, versión y objetivos cubiertos;
- detectar enlaces rotos, redirecciones, duplicados y páginas deprecated.

Entrega: `source-manifest.json`, `objective-source-matrix.json` y vista de fuentes por módulo.

### Fase B — guía profunda

- redactar capítulos en español a partir del inventario;
- preservar nombres y sintaxis oficiales;
- incorporar tablas y ejemplos;
- separar hechos confirmados de dependencias de entorno;
- enlazar cada bloque a sus fuentes;
- revisar que OneAgent, retención, DQL, permisos y límites tengan tratamiento explícito en la interfaz.

Entrega: `study-guides.ts`/datos equivalentes con capítulos completos, no solamente `summary` y `focus`.

### Fase C — banco y prácticas

- redactar las preguntas desde afirmaciones atómicas;
- crear opciones y refutaciones;
- incluir escenarios técnicos y mini-prácticas;
- añadir DQL ejecutable conceptualmente y resultados esperados;
- conectar pregunta, objetivo, capítulo y fuentes;
- pasar la revisión adversarial.

Entrega: banco validado, informe de cobertura y reporte de preguntas rechazadas/corregidas.

### Fase D — aplicación

- navegación por módulo, capítulo y fuente;
- modo lectura sin salir de la aplicación;
- enlaces externos claros como verificación opcional, no como requisito para estudiar;
- mapa de estudio y alternativa en lista accesible;
- quiz rápido, banco, adaptativo, prácticas, simulacro y errores;
- filtros por dificultad, familia, Latest/Classic y capítulo;
- progreso persistente y exportable localmente.

### Fase E — gates de calidad

- validación estructural: 12 módulos, objetivos sin huérfanos y conteos;
- validación de fuentes: URLs oficiales accesibles y metadatos presentes;
- validación de preguntas: unicidad, respuestas, distractores y trazabilidad;
- lint, typecheck, tests y build;
- validación visual en escritorio y móvil;
- validación de teclado y alternativa no visual al mapa;
- comprobación de overflow horizontal y consola sin errores;
- prueba manual de todos los modos de evaluación.

## 8. Criterio de finalización

La reconstrucción no se considerará completa cuando la interfaz “parezca” más larga. Se considerará completa cuando:

- cada uno de los 12 apartados tenga una guía de estudio extensa y navegable;
- cada capítulo tenga fuentes oficiales consultables desde la app;
- cada objetivo tenga afirmaciones, explicación y preguntas asociadas;
- OneAgent y los demás dominios críticos cubran capacidades, condiciones, límites y troubleshooting;
- las retenciones estén separadas por tipo de dato y arquitectura;
- DQL tenga ejercicios de lectura y corrección, no solo lista de comandos;
- el banco tenga preguntas originales, precisas y explicadas;
- los enlaces y la fecha de verificación sean visibles;
- el contenido se pueda estudiar sin abandonar la aplicación;
- las pruebas automáticas y de interacción estén superadas.

## 9. Regla de mantenimiento

La documentación de Dynatrace cambia. Cada contenido sensible a versión tendrá `lastVerified`, `sourceUpdatedAt` cuando se pueda obtener y una nota de cambio. La aplicación mostrará un aviso de revisión cuando una fuente se marque como deprecated, preview, Classic o tenga una fecha de actualización posterior a la verificación del contenido.

La guía será una herramienta de preparación basada en documentación pública oficial; no afirmará que reproduce preguntas reales ni que sustituye la confirmación final del formato del examen en Dynatrace University.
