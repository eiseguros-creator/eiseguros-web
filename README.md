# EISeguros — sitio web

Sitio estático de EISeguros · *Estrategias inteligentes de seguros*.
Sitio en vivo: **https://estrategiasinteligentesdeseguros.com**

---

## Cómo está organizado

| Carpeta | Qué contiene | ¿Se publica? |
|---|---|---|
| `public/` | El sitio: páginas, imágenes, estilos y los dos paneles | **Sí** |
| `content/tips/` | Publicaciones de TipSeguros, una por archivo. Las crea el panel `/admin/` | No (se convierten en `posts.json` al desplegar) |
| `docs/` | Auditoría del sitio Wix anterior, especificación de diseño y bitácora de cambios | No |
| `archivo/` | Página de testimonios con referencias de muestra, guardada por si más adelante hay testimonios reales | No |

Netlify publica únicamente `public/`, según lo indicado en `netlify.toml`.

## Páginas

| Archivo | Página |
|---|---|
| `index.html` | Inicio |
| `empresas.html` | Seguros Empresariales |
| `personas.html` | Seguros Personales |
| `seguros-hogar.html` | Hogar |
| `seguros-vida.html` | Vida y Familia |
| `seguros-salud.html` | Gastos Médicos Mayores |
| `seguros-autos.html` | Autos |
| `tipseguros.html` | TipSeguros |
| `contacto.html` | Contacto |
| `admin/` | **Panel de publicación de TipSeguros** (Decap CMS) |
| `editor.html` | Editor de textos e imágenes de las páginas |

## Paneles

### `/admin/` — publicar en TipSeguros
Es el panel que usa EISeguros para escribir y publicar. Se entra con la cuenta de GitHub,
se llena el formulario (título, fecha, categoría, resumen, texto, imagen, video y PDF) y al
guardar **la publicación queda en el sitio en un par de minutos**, sin descargar ni subir archivos.

Cada publicación se guarda como un archivo en `content/tips/`. Al desplegar, `build-posts.mjs`
las convierte en `public/assets/data/posts.json`, que es lo que lee la página de TipSeguros.

### `/editor.html` — editar el texto de las páginas
Para cambios ocasionales en las páginas del sitio. Descarga el archivo modificado, que hay que
subir al repositorio. Pensado para uso del equipo de desarrollo.

## Publicación

Cada cambio guardado en la rama `main` se publica solo en Netlify, en un par de minutos.

## Pendientes antes del lanzamiento

- [ ] **Aviso de privacidad** — obligatorio (LFPDPPP) porque el formulario recaba datos personales. El enlace del pie apunta a `#`.
- [ ] **Dirección de la oficina** — aparece como `[por confirmar]` en el pie de todas las páginas.
- [ ] **Activar el formulario de contacto** — hoy muestra la confirmación pero no envía. Se habilita con Netlify Forms.
- [ ] **Visto bueno a las viñetas de Seguro de Hombre Clave** (`empresas.html`).
- [ ] **Logotipos de GNP y Aarco** — hoy aparecen como texto; requieren archivo y autorización de uso.

## Datos de contacto publicados

- Teléfono y WhatsApp: +52 4461 4458 45
- Correo: eiseguros25@gmail.com
- Facebook: EISeguros · Instagram: @eiseguros

---

Desarrollado por Arechavala Consulting.
