# Evidencia TDD — recuperación de Webhook Reliability Playground

Fecha: 2026-08-17
Rama de trabajo: `agent/landing-remediation`

## Fuente y recorrido

La solicitud parte de una recuperación de producción ya verificada: Worker `ba84ed5e`, health `200` sin ACAO, preflight canónico `204`, preflight hostil `403` sin ACAO, POST canónico firmado `200` y lectura D1 `200` para `run_3b61f1c2c7f64ff2a8b22d0de3de2db8`.

Recorrido: una persona abre el catálogo, encuentra Webhook Reliability Playground activo, no ve una advertencia CORS obsoleta y puede abrir `https://webhook-reliability-playground.alexcuesta.dev`. La selección sustituta de tres flagships y la evidencia comercial se conservan sin re-promocionar Webhook.

## RED / GREEN

- RED unitario: `npm test -- tests/unit/lab.test.ts --maxWorkers=1 --no-file-parallelism` ejecutó 7 pruebas; 6 pasaron y la recuperación falló porque el manifiesto todavía devolvía `status: 'degraded'`.
- RED E2E: `npm run test:e2e -- tests/e2e/laboratorio.spec.ts --project=chromium --grep 'presenta Webhook activo' --workers=1` ejecutó 1 prueba y falló porque la página todavía decía `código público` y no publicaba el estado recuperado.
- GREEN focalizado: los mismos objetivos pasaron 7/7 unitarias y 1/1 E2E después de retirar el estado/nota degradados y restaurar el copy de demo pública.
- Checkpoints: `1753a3e` contiene el reproducer RED y `ed26d4f` contiene la corrección GREEN.

## Garantías

| # | Qué queda garantizado | Prueba | Tipo | Resultado |
|---|---|---|---|---|
| 1 | Webhook figura `active`, sin nota de estado y sigue con `flagship: false` | `tests/unit/lab.test.ts` | Unitario | PASS |
| 2 | La selección sustituta mantiene tres flagships activos por pilar y Webhook no vuelve a evidencia comercial | `tests/unit/lab.test.ts` | Unitario | PASS |
| 3 | La tarjeta no muestra badge, nota degradada ni claim CORS y recupera el enlace canónico | `tests/e2e/laboratorio.spec.ts` | E2E | PASS |
| 4 | El laboratorio vuelve a afirmar `demo y código públicos` | `tests/e2e/laboratorio.spec.ts` | E2E | PASS |

## Verificación final

- `npm test -- --maxWorkers=1 --no-file-parallelism`: 25/25.
- `npx astro check`: 0 errores, 0 warnings; 4 hints preexistentes en artefactos de cobertura.
- `npm run build`: 5 páginas generadas.
- `npm run test:e2e -- --workers=1`: 88/88.
- E2E focalizado con `--repeat-each=10 --workers=1`: 10/10.
- `npm run test:coverage -- --maxWorkers=1 --no-file-parallelism`: statements 96,85 %, branches 89,06 %, functions 100 %, lines 96,29 %.

No hay huecos conocidos dentro del alcance editorial. La recuperación del servicio se acepta con la evidencia de producción proporcionada; esta suite valida la representación del estado en la landing.
