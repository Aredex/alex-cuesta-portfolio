# Evidencia TDD — preparación SEO para publicación

Fecha: 14 de agosto de 2026.

## Comportamientos protegidos

- La portada comunica en su único H1 el nombre, el rol freelance y Sevilla.
- Las páginas públicas incluyen canonical, Open Graph, Twitter Card y JSON-LD válidos, sin
  placeholders publicados.
- El sitemap enumera exactamente las tres URLs públicas y `robots.txt` lo anuncia.
- Las migas de Briefline solo enlazan páginas rastreables, nunca fragmentos.
- El formulario solo se publica con un endpoint HTTPS válido de Formspree. Sin configuración,
  Servicios conserva una vía de contacto por email.
- El formulario cubre validación, envío, error y éxito con limpieza de campos.

## Ciclo rojo → verde

- RED: `c45075f` añadió los casos de aceptación. Vitest falló porque el resolvedor de contacto
  aún no existía y Playwright reprodujo cuatro fallos: placeholder público, H1 sin intención
  local, breadcrumb con fragmento y expectativa del sitemap.
- GREEN: `9474bb1` implementó la configuración segura de Formspree, el fallback por email, el
  H1 local, las migas rastreables y las comprobaciones de publicación.

## Resultado de verificación

- `npx astro check`: 0 errores, 0 warnings, 0 hints.
- Build de producción sin `PUBLIC_FORMSPREE_ENDPOINT`: correcto; no contiene `TODO_*` ni un
  endpoint de ejemplo y muestra el email directo.
- Vitest: 16/16.
- Playwright: 66/66 en Chromium de escritorio y móvil.
- La cobertura porcentual no está configurada en este repositorio; la ruta crítica queda
  cubierta mediante pruebas unitarias del resolvedor y recorridos E2E de ambos resultados del
  formulario.
