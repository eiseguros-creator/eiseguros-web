# EISeguros — Rediseño web · Especificación de diseño

**Fecha:** 2026-08-05 · **Aprobado por:** Pablo (Opción A + arquitectura de 9 páginas)
**Referencia de contenido:** `docs/content-audit.md` (auditoría del sitio Wix original)

## Objetivo

Rediseño completo del sitio de EISeguros (broker de seguros, México) como sitio estático HTML/CSS/JS,
fuera de Wix, que servirá de semilla para la futura plataforma. Enfoque principal: **empresas/corporativo**,
con sección de seguros personales. Mercado objetivo: México, 35–65 años.

## Dirección de diseño — "Cristal profundo" (liquid glass + confianza)

- Base azul marino/índigo profundo con brillos aurora (navy + rosa contenido); tarjetas de vidrio
  esmerilado (backdrop-blur, bordes internos luminosos, highlights especulares).
- Secciones de lectura larga alternan a fondos claros plata/hielo para legibilidad.
- El rosa de marca se usa como acento preciso (CTAs, destacados) — nunca tiles chillones.
- Señales de confianza: tipografía sobria y grande (cuerpo ≥18px), fotografía realista de contextos
  empresariales mexicanos, banda de cifras, strip de aseguradoras (GNP, Aarco Seguros), testimonios.
- Accesibilidad: contraste AA, focus visible, navegación por teclado, `prefers-reduced-motion`.

### Marca
- Logo actual sin cambios: `assets/brand/logo-eiseguros.png` (+ `estrella-eiseguros.png`).
- Paleta refinada derivada del logo: índigo profundo (~#232A6C→#151A4A), rosa mexicano (~#E5197D),
  plata/hielo (#E9EDF5), blanco. Degradados aurora sutiles índigo→cian apagado→rosa.
- Tipografía: display humanista bold para titulares + sans legible para cuerpo (Google Fonts,
  p.ej. Sora/Manrope + Inter), tamaños generosos.

## Arquitectura (9 páginas, todo en español)

| Página | Archivo | Contenido |
|---|---|---|
| Inicio | `index.html` | Hero corporate-first (reescrito en ES), 5 promesas de protección en tarjetas de vidrio, "Razones para asegurar" condensado (tabs/acordeón), strip GNP + Aarco, teaser de testimonios, banda CTA |
| Seguros Empresariales | `empresas.html` | Página estrella: 6 áreas de solución (Daños y patrimonial, Responsabilidad Civil, Flotillas, Transporte de mercancías, Beneficios para empleados, Continuidad del negocio), base = copy actual de Empresa, misma voz |
| Seguros Personales | `personas.html` | Hub con tarjetas hacia las 4 líneas personales |
| Hogar | `seguros-hogar.html` | Contenido existente, digerible |
| Vida y Familia | `seguros-vida.html` | Contenido existente, digerible |
| Salud (GMM) | `seguros-salud.html` | Contenido existente, digerible |
| Autos | `seguros-autos.html` | Contenido existente, digerible |
| Testimonios | `testimonios.html` | ~8 referencias inventadas (5 empresas, 3 personales), marcadas como placeholder en comentarios |
| Contacto | `contacto.html` | Form de cotización (UI), CTA WhatsApp; teléfono/email/dirección como "[por confirmar]" |

Plantilla de páginas de producto: intro corta → "¿Qué protege?" → "¿Qué incluye?" (bullets con icono)
→ Beneficios (tarjetas) → Objeciones + FAQ (acordeones) → CTA de cierre hacia contacto.

## Reglas de contenido

- Mantener tono y voz: trato de "tú", consultivo, énfasis en tranquilidad/patrimonio/familia/respaldo.
- Tagline: "Decisiones claras hoy… protección real mañana."
- Home reescrito íntegramente en español; textos más cortos y escaneables.
- No inventar claims legales/coberturas más allá del contenido existente; el copy nuevo del suite
  corporativo se redacta en la misma voz y queda sujeto a revisión de Pablo.
- Datos de contacto EN ESPERA — tokens visibles `[por confirmar]`.
- Aseguradoras: GNP y Aarco Seguros.

## Imágenes

- Generadas con Higgsfield (fotorealistas, contextos mexicanos, gradación acorde a paleta navy/rosa):
  heroes corporativos, familia, hogar, salud, autos, asesor, contacto.
- Texturas de vidrio/aurora: CSS/SVG, no imágenes pesadas.

## Técnica

- HTML/CSS/JS estático en `eiseguros/`, sin framework; `assets/css/glass.css` compartido,
  JS mínimo (nav móvil, acordeones, animaciones de entrada respetando reduced-motion).
- Responsive completo; peso de página contenido (imágenes optimizadas).

## Fuera de alcance (por ahora)

- Publicación/hosting, formulario funcional (backend), datos de contacto reales, migración de dominio,
  la "plataforma" futura (contexto pendiente del usuario).
