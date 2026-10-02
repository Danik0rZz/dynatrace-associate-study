# Dynatrace Associate Study Lab

Aplicación local de preparación para Dynatrace Associate Certification. Está pensada como una herramienta de estudio trazable: el contenido está en español, pero conserva la terminología de la UI, los nombres de producto y la sintaxis DQL en inglés.

## Alcance

- 12 módulos del path local de estudio.
- 12 lecciones autocontenidas en español, con capítulos explicativos, comparativas, ejemplos, límites, troubleshooting y checklist de dominio.
- Fichas de hechos de alta precisión por módulo: retención, límites, permisos, modos, sintaxis, estados y condiciones con enlace oficial fila a fila.
- 1175 preguntas tipo test (entre 84 y 111 por bloque, según la amplitud de su temario; sin tope fijo) tras la revisión editorial de octubre de 2026, con respuesta múltiple y estímulos (consulta DQL, tabla o caso) en todos los bloques.
- Cada pregunta está respaldada por un fragmento literal de la guía de estudio de su bloque (campo `guide` de cada pregunta); un test automático falla si alguna pregunta no tiene respaldo o si la guía cambia y deja de contenerlo.
- Selección aleatoria con rotación: los quiz rápidos, el simulacro (60 preguntas repartidas por bloque) y el repaso priorizan lo no respondido ni servido recientemente (`src/lib/selection.ts`).
- Enunciado, módulo de origen, cuatro alternativas temáticas, solución, explicación, dificultad, objetivo, variante y fuente oficial por pregunta. La selección múltiple indica cuántas opciones marcar.
- Quiz rápido de hasta 8 preguntas, banco completo del módulo, repaso adaptativo y simulacro de 60 preguntas con revisión de fallos al terminar.
- Pregunta ↔ guía en ambos sentidos: tras responder, «Ver en la guía» abre en un panel lateral el apartado exacto (y la frase) que contiene la respuesta sin salir de la sesión; cada apartado con preguntas asociadas tiene «Practicar este apartado» (`src/lib/guide-links.ts`).
- Resultado de cada sesión por bloque, lista de apartados de la guía con fallos y botón para repetir solo los fallos.
- Exportar e importar el progreso desde la barra lateral (fichero JSON con todas las claves `dynatrace-associate*` de `localStorage`, validado al importar; `src/lib/backup.ts`).
- Ilustraciones y animaciones integradas en los apartados que más se benefician de una explicación visual (marcados con ▶ en el índice de cada lección).
- Prácticas guiadas, glosario, mapa visual con React Flow y persistencia local.
- Los enlaces oficiales aparecen en el módulo, en el contexto de cada pregunta y en el feedback.

El formato del examen se presenta como referencia versionada. La aplicación no promete que las reglas futuras sean idénticas: verifica siempre Dynatrace University y el proveedor de proctoring antes de reservar.

## Requisitos para otro PC

La aplicación es completamente local y no necesita tenant de Dynatrace, API tokens, backend, base de datos ni variables de entorno.

El progreso de este banco se guarda con la clave `dynatrace-associate-progress-v3`. Los intentos del banco anterior permanecen en el navegador, pero no se mezclan con las puntuaciones de las preguntas nuevas.

- Windows 10/11, macOS o Linux.
- Node.js `20.19+` o `22.12+`. Se recomienda instalar Node.js 22 LTS desde [nodejs.org](https://nodejs.org/).
- npm, incluido con Node.js.
- Un navegador moderno: Edge, Chrome, Firefox o Safari.
- Conexión a internet únicamente para instalar dependencias y abrir los enlaces oficiales de estudio.

No es necesario instalar React, TypeScript, Vite ni React Flow por separado: `npm ci` instala las versiones fijadas en `package-lock.json`.

## Ejecutar

```powershell
cd "ruta\a\study-app"
npm.cmd ci
npm.cmd run dev
```

Abre la dirección que indique Vite, normalmente `http://localhost:5173/`. Si ese puerto está ocupado, Vite elegirá otro, como `5174`.

Validaciones disponibles:

```powershell
npm.cmd run lint        # TypeScript + ESLint
npm.cmd test
npm.cmd run build
npm.cmd run check       # todo lo anterior
npm.cmd run inventario  # inventario de cobertura (ver CLAUDE.md)
```

## Estructura

- `src/data/blocks/<bloque>/`: **todo el contenido de cada bloque** en un sitio: `guide.ts` (guía de estudio), `precision.ts` (ficha de hechos de precisión) y `questions.ts` (preguntas, cada una con el apartado y la frase literal de la guía que la respaldan).
- `src/data/modules.ts`: alcance, objetivos, términos y fuentes de cada bloque. `src/data/guide.ts` y `src/data/questions.ts` agregan el contenido de todos los bloques.
- `src/data/study-guides.ts`, `practices.ts`, `glossary.ts`: lectura de orientación, prácticas guiadas y glosario.
- `src/App.tsx` (estructura y navegación), `src/app/` (sesión de preguntas, almacenamiento, copia de seguridad), `src/views/` (una pantalla por fichero), `src/components/` (barra lateral, guía, panel lateral, mapa, visuales), `src/lib/` (selección, progreso, enlaces pregunta ↔ guía, inventario).
- `src/components/visuals/`: 84 ilustraciones y animaciones SVG; se descargan por bloque al abrirlo, se pausan fuera de pantalla y respetan `prefers-reduced-motion`.
- `src/tests/`: contenido, cobertura en la guía, inventario, visuales, selección aleatoria, progreso, backup y pruebas de la interfaz.
- `docs/`: plan de valoración de apartados, inventario generado e historial de la revisión de 2026.
- `.github/workflows/deploy.yml`: comprobación y publicación en GitHub Pages.

## Circuito de cobertura

Cada apartado de la guía tiene una valoración documentada en `docs/plan-apartados.csv` (si requiere preguntas y cuántas como mínimo, si ya lo cubre otro apartado o si no las necesita, con su motivo y fecha de revisión). `npm run inventario` sincroniza ese plan con la guía (los apartados nuevos entran como «pendiente») y regenera `docs/inventario-apartados.csv`, `docs/inventario-preguntas.csv` y `docs/inventario.md`. El test `src/tests/inventory.test.ts` falla si queda algún apartado sin valorar, si a uno que requiere preguntas le faltan, si hay referencias rotas o si los informes no están al día. El procedimiento completo, también para una IA que trabaje en el proyecto, está en `CLAUDE.md`.

## Política de calidad

Las alternativas incorrectas tratan el mismo concepto que la respuesta correcta y el orden se mezcla en cada sesión. La validación automática comprueba estructura, respuesta, unicidad, fuente y trazabilidad. La explicación técnica y el enlace oficial aparecen tras responder o al finalizar el simulacro. Es un banco de preparación propio, no preguntas oficiales ni una predicción del examen. El simulacro reproduce la parte escrita del examen (60 preguntas multiple-choice y multiple-response, según el Learning Path oficial); la parte práctica no se simula. Como no hay pesos oficiales por dominio verificables, el reparto es proporcional al temario de cada bloque y los 60 minutos son un ritmo de práctica.

## Fuentes base

- [Learning Plan oficial](https://university.dynatrace.com/learn/public/learning_plan/view/47/dynatrace-associate-certification-learning-plan)
- [Associate Certification Learning Path 2025](https://community.dynatrace.com/pssft35649/attachments/pssft35649/GetStarted/1351/1/Associate_Certification_Learning_Path_2025.pdf)
- [What is Dynatrace?](https://docs.dynatrace.com/docs/discover-dynatrace/what-is-dynatrace)
- [DQL](https://docs.dynatrace.com/docs/platform/grail/dynatrace-query-language)
- [Real User and Synthetic Monitoring](https://docs.dynatrace.com/docs/license/capabilities/real-user-synthetic-monitoring)
- [Application Security](https://docs.dynatrace.com/docs/secure/application-security)
- [AutomationEngine](https://docs.dynatrace.com/docs/platform/automationengine)
- [Log ingestion](https://docs.dynatrace.com/docs/analyze-explore-automate/logs/lma-log-ingestion)
