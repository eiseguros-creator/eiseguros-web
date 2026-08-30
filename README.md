# EISeguros — sitio web

Sitio estático de EISeguros · *Estrategias inteligentes de seguros*.
Dominio previsto: **estrategiasinteligentesdeseguros.com**

---

## Cómo está organizado

| Carpeta | Qué contiene | ¿Se publica? |
|---|---|---|
| `public/` | El sitio: páginas, imágenes, estilos y el panel de administración | **Sí** |
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
| `novedades.html` | Novedades |
| `contacto.html` | Contacto |
| `admin.html` | Panel de administración |

## Panel de administración

Disponible en `/admin.html`. Permite dos cosas:

1. **Editar páginas** — cambiar textos y reemplazar imágenes de cualquier página. Al terminar se descarga el archivo modificado, que hay que subir al repositorio para publicarlo.
2. **Novedades** — crear, editar y borrar publicaciones (texto, video de YouTube o Vimeo, flyer y PDF). Al terminar se descarga `posts.json`, que se coloca en `public/assets/data/`.

Los PDFs van en `public/assets/docs/` y las imágenes en `public/assets/img/`.

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
