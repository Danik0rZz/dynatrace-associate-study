# Instrucciones para trabajar en este proyecto

App de estudio en español para la certificación **Dynatrace Associate** (React 19 + TypeScript + Vite + Vitest).
Lee este fichero entero antes de tocar contenido: guía de estudio, preguntas o cobertura.

## Reglas de contenido

- Términos de producto, UI, campos, permisos y DQL **siempre en inglés** (Dashboards, Workflows, segments, `storage:logs:read`…). Las explicaciones van en español.
- Cada dato debe estar verificado en **docs.dynatrace.com** (versión Latest). Si no puedes verificarlo, no lo escribas en la guía ni lo conviertas en pregunta.
- **Todo lo que se pregunta debe estar explicado en la guía del mismo bloque**, en el apartado al que apunta la pregunta.
- No hay un tope de preguntas por bloque. Una pregunta sencilla sobre un dato real de la documentación es válida.

## Dónde vive cada cosa

Cada bloque tiene una carpeta `src/data/blocks/<bloque>/` con **todo** su contenido. Es la fuente única: se edita ahí directamente.

| Qué | Dónde | Notas |
|---|---|---|
| Bloques (título, objetivos, fuentes) | `src/data/modules.ts` | Un bloque nuevo se añade aquí, en `src/data/blocks/index.ts` y en `src/data/blocks/questions.ts` (estos dos, solo para Node y los tests). En la app, la guía y las preguntas las recogen solos los cargadores (`import.meta.glob`). |
| Guía de estudio | `src/data/blocks/<bloque>/guide.ts` | Apartados con `id` estable (las preguntas y los visuales lo usan), título **sin número** (se numera solo por el orden), ≥ 2 párrafos y `sourceRefs` oficiales. |
| Ficha de hechos de precisión | `src/data/blocks/<bloque>/precision.ts` | Una fila por `topic`, con fuente oficial. |
| Preguntas | `src/data/blocks/<bloque>/questions.ts` | Cada pregunta lleva `guide: { section, evidence }`: el apartado que la respalda (o `'precision-facts'`) y un fragmento **literal** (≥ 25 caracteres) que contiene el dato decisivo. Ids nuevos `R-<COD>-NN` continuando la numeración del bloque; `lastVerified` = fecha de verificación. |
| Animaciones e ilustraciones | `src/components/visuals/<bloque>.tsx` | Clave = id del apartado. Tras añadir o quitar uno, actualiza `src/components/visuals/index-ids.ts` (un test lo comprueba). |
| Valoración de cada apartado | `docs/plan-apartados.csv` | Manual (persona o IA). Ver abajo. |
| Inventario | `docs/inventario*.csv`, `docs/inventario.md` | **Generados**: nunca a mano. |
| Índice ligero (guía y preguntas) | `src/data/generated/*.json` | **Generado** con `npm run inventario`: nunca a mano. Un test falla si está desfasado. |
| Historial de la revisión de 2026 | `docs/historial-revision-2026.md` | Motivos de las correcciones previas a la unificación; desde entonces, el historial es git. |

Ids de bloque (carpetas): welcome, instructions, platform, observability, notebooks, business-dem, data-analysis, dql, security, automation, ingestion, other.

## Circuito de cobertura (obligatorio en cada cambio de guía o preguntas)

1. Haz el cambio: un apartado nuevo, una pregunta nueva o una corrección.
2. Ejecuta `npm run inventario`. Este comando:
   - añade al plan, como `pendiente`, los apartados nuevos;
   - quita las filas de apartados que ya no existen;
   - regenera los informes;
   - lista los problemas abiertos.
3. Para cada apartado `pendiente`, decide en `docs/plan-apartados.csv` (separador `;`, se abre en Excel):
   - `requiere` + `Minimo`: tiene datos evaluables. Escribe al menos `Minimo` preguntas que apunten a ese apartado.
   - `cubierto` + `CubiertoPor`: su contenido evaluable ya lo cubren las preguntas de otro apartado del mismo bloque.
   - `no-requiere`: orientación o método de estudio, sin datos verificables.
   - Rellena siempre `Motivo` y `Revisado` (AAAA-MM-DD). Ante la duda, `requiere`.
4. Escribe las preguntas con su `guide` (apartado + frase literal). Después revisa a mano (o con un revisor independiente) que el apartado **enseña de verdad el dato que decide la respuesta**. El test solo comprueba que la frase es literal, no que baste para responder. En la ronda de octubre de 2026, 92 de 216 preguntas nuevas (y 4 de las 959 originales) pasaban el test sin estar respaldadas. Criterio estricto: si la clave depende de un nombre concreto (permiso, campo, comando, cifra, ruta de UI), ese nombre debe aparecer en el apartado; un principio general no basta.
5. Vuelve a ejecutar `npm run inventario` y después `npm test`. El test `src/tests/inventory.test.ts` falla si:
   - hay apartados sin valorar o sin motivo;
   - a un apartado `requiere` le faltan preguntas;
   - hay referencias rotas o preguntas huérfanas;
   - los informes no están al día.

## Dynatrace cambia: re-verificación

- La columna `Revisado` del plan indica cuándo se contrastó cada apartado con la documentación.
- Al actualizar un apartado:
  - corrige el texto en `guide.ts` o `precision.ts`;
  - revisa las preguntas que apuntan a él (`docs/inventario-preguntas.csv`, filtrando por apartado);
  - actualiza la evidencia si cambia el texto;
  - pon la fecha de hoy en `Revisado`.

## Calidad de una pregunta

- Una sola respuesta defendible y verificada.
- 4 opciones del mismo tema, plausibles y de longitud equilibrada, sin coletillas que delaten («sin…», «aunque…», «solo…»).
- Explicación que justifica la clave y desmonta cada distractor.
- Sin duplicar otra pregunta del bloque.
- Que haya respuesta múltiple («(Selecciona 2)», exactamente 2 correctas) y preguntas con `stimulus`.

## Comandos

```bash
npm run inventario   # sincroniza el plan y regenera el inventario
npm test             # tests: contenido, cobertura en la guía, inventario, visuales, selección, backup e interfaz
npm run lint         # TypeScript + ESLint
npm run build
npm run check        # todo lo anterior (lo mismo que ejecuta GitHub Actions antes de publicar)
```

## Publicación

`.github/workflows/deploy.yml` publica en GitHub Pages cada push a `main`, solo si pasan tipos, ESLint, tests y compilación.
La app usa rutas relativas (`base: './'` en `vite.config.ts`), así que funciona en cualquier subcarpeta.

## Cómo actualizar la app

Antes de subir nada, ejecuta `npm run check` en local.

- **Cambios pequeños** (una corrección de texto, una pregunta, un ajuste puntual): commit y push directo a `main`.
- **Cambios grandes** (un apartado o bloque nuevo, muchas preguntas, cambios en el código de la app): en una rama aparte, con un PR contra `main`.
  - El workflow `deploy.yml` también se ejecuta en cada PR, pero ahí solo comprueba, no publica.
  - Haz el merge solo cuando todos los checks del PR estén en verde. Al llegar a `main`, se publica.

## Código de la app

- `src/App.tsx`: estructura y navegación. `src/app/`: tipos, etiquetas, sesión de preguntas (`useStudySession`), almacenamiento local y copia de seguridad.
- `src/views/`: una pantalla por fichero. `src/components/`: piezas reutilizables (barra lateral, apartado de la guía, panel de la guía, mapa, visuales).
- `src/lib/`: lógica sin interfaz (selección aleatoria, progreso, enlaces pregunta ↔ guía, inventario, backup).
- La guía, la ficha de precisión y las preguntas se cargan por bloque (`src/data/guide-loader.ts`, `src/data/question-loader.ts`). Selección, contadores, repaso, estadísticas y copia de seguridad usan solo el índice ligero (`src/data/question-catalog.ts`). La app no debe importar `data/guide`, `data/questions` ni `data/blocks/*` de forma síncrona (lo comprueban los tests).
- El mapa (React Flow) y los visuales de cada bloque se descargan solo al abrirlos.
- Accesibilidad: foco visible, enlace «Saltar al contenido», panel de la guía con foco atrapado y Esc. Mantén el contraste de texto ≥ 4,5:1 (usa los colores de `:root` en `styles.css`).
