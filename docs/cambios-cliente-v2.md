# EISeguros — Cambios solicitados por el cliente (ronda 2)

**Fuentes:** `PágWebJoeHeroSectionCambio.docx` (home), `PÁGINA WEB documento cambioweb.docx` (empresas + producto), `FtosWebJoe.zip` (12 archivos gráficos).
**Analizado:** 2026-08-28. Los textos no listados aquí **se quedan como están**.

---

## 0. DATOS DE CONTACTO — ¡YA LLEGARON!

| Dato | Valor |
|---|---|
| Teléfono | **+52 4461 4458 45** |
| Email | **eiseguros25@gmail.com** |
| Facebook | **EISeguros** |
| Instagram | **eiseguros** |
| Oficina (dirección) | ⚠️ **sigue pendiente** |

Reemplaza todos los `[por confirmar]` del sitio (footer ×9 páginas + página de contacto).
WhatsApp: usar el mismo teléfono salvo indicación contraria → `https://wa.me/524461445845`.

---

## 1. NUEVO POSICIONAMIENTO DE MARCA

- Tagline / kicker principal: **"ESTRATEGIAS INTELIGENTES DE SEGUROS"**
- Concepto rector: **"Decisiones inteligentes de protección"** (DECINTEL)
- Nuevo elemento gráfico de marca: **símbolo Decintel** (mano rosa señalando la estrella)
  → `assets/brand/simbolo-decintel.png`. Se usa como ícono en tarjetas destacadas.
- Logo horizontal alterno → `assets/brand/logo-horizontal.png`

---

## 2. INICIO (index.html)

### 2.1 Hero (bento) — REESCRITO
- **H1:** "Una empresa crece por **sus decisiones**." (segunda parte en rosa)
- **Cuerpo:**
  - "Tu empresa es mucho más que sus instalaciones."
  - "Es el resultado de años de trabajo, inversiones, personas, relaciones y decisiones."
  - "Por eso, una decisión inteligente de protección empresarial debe considerar una estrategia que proteja la continuidad del negocio."
- Botones: se quedan (*Soluciones para empresas* / *Seguros personales*).
- **Columna derecha (cambia por completo):**
  - Arriba: foto → `img/reunion-ejecutiva.jpg`
  - Abajo: tarjeta con símbolo Decintel + título **"DECISIONES INTELIGENTES DE PROTECCIÓN"** + texto "Convierte la gestión del riesgo en una estrategia para la continuidad de tu empresa."
  - ❌ Se elimina el tile del logo/estrella que estaba ahí.

### 2.2 NUEVA sección — "Decisiones inteligentes de protección"
- Subtítulo: "Identifica tus riesgos. Prioriza lo importante. Protege lo que hace crecer tu empresa."
- Izquierda: foto → `img/riesgo-operacion.jpg`
- Derecha, viñetas:
  - Un daño material puede detener la operación.
  - Una responsabilidad puede comprometer el patrimonio.
  - La pérdida de una persona clave puede afectar decisiones críticas.
  - Un accidente puede generar costos inesperados.
  - Una interrupción prolongada puede poner en riesgo clientes, empleos y relaciones comerciales.
- Cierre en rosa: **"¿Qué pasaría si mañana ocurriera algo que tu empresa no puede detener?"**

### 2.3 "Gestión estratégica del riesgo para empresas" (sustituye "Por qué EISeguros")
Tres tarjetas, **ícono = símbolo Decintel** (ya no los íconos SVG):
| Título | Texto |
|---|---|
| Asesoría Consultiva | Un enfoque estratégico para decidir la protección empresarial |
| Respaldo de grandes aseguradoras | Somos socios comerciales de las principales aseguradoras en México |
| Acompañamiento en siniestros | Cuando algo sucede, estamos contigo: gestionamos el proceso frente a la aseguradora hasta resolverlo |

### 2.4 "Convertimos riesgos en decisiones claras" (sustituye "Soluciones para cada riesgo…")
- Intro: "Una buena decisión de protección puede marcar la diferencia entre una interrupción temporal y una crisis empresarial."
- Tarjetas (6) — **"Transporte de mercancías" se fusiona dentro de Flotillas** y entra una nueva:
  1. Daños y patrimonial
  2. Responsabilidad Civil
  3. Flotillas
  4. **🆕 Seguro de Hombre Clave** — "Ayudamos a identificar a las personas cuya ausencia podría generar un impacto significativo en la operación, relaciones, ingresos o continuidad de la empresa."
  5. Beneficios para empleados
  6. Continuidad del negocio
- Se añade un tile de foto dentro de la retícula → `img/asesoria-empresarial.jpg`
- Botón: "Ver todas las soluciones empresariales"

### 2.5 "Seguros personales" — SECCIÓN AMPLIADA
- H2 "Seguros personales" + subtítulo "**Tus metas** también necesitan protección" (rosa en "Tus metas")
- "La vida está llena de decisiones importantes." + lista:
  Formar una familia. / Comprar una casa. / Construir un patrimonio. / Cuidar tu salud. / Crear un negocio. / Preparar el futuro.
- "Cada meta merece una estrategia de protección que la acompañe."
- Foto → `img/asesoria-personal.jpg`
- Tarjeta con símbolo Decintel: "Te ayudamos a tomar decisiones inteligentes para proteger tu vida, tu familia, tu patrimonio y tu tranquilidad"
- Se conserva la lista de 4 líneas + botón "Explorar seguros personales"
- Banda de cierre: "Conectamos tus metas personales con estrategias inteligentes de protección en seguros para que puedas tomar decisiones claras hoy y obtener protección real mañana."

### 2.6 "¿Por qué un seguro es una decisión inteligente?"
Sustituye el título "Razones para asegurar". Acordeones se mantienen (Empresa / Hogar / Familia / Salud / Auto).

### 2.7 ❌ TESTIMONIOS — ELIMINADOS
El cliente borró la sección. Quitar del home, del menú y del footer de las 9 páginas.
(Decisión pendiente: borrar `testimonios.html` o conservarlo fuera de navegación.)

### 2.8 Footer
- Datos reales de contacto (ver §0) + redes sociales (FB / Instagram).
- Texto de marca: "Somos socios comerciales de las mejores aseguradoras en México".

---

## 3. EMPRESAS (empresas.html)

| Elemento | Cambio |
|---|---|
| H1 | "Protege la continuidad de tu negocio mediante **decisiones inteligentes**." |
| Foto hero | → `img/empresas.jpg` (ya reemplazada: presentación "Estrategia de Seguros 2026") |
| Sección soluciones | Nuevo título **"¿Qué necesitas proteger?"**; cada tarjeta antepone la NECESIDAD y luego el producto |
| Proceso | Nuevo título: "Las decisiones de protección responden a una lógica empresarial: del diagnóstico a la protección efectiva" |
| Beneficios | Nuevo título: "Una estrategia empresarial de protección proporciona estabilidad y confianza" · foto → `img/logistica.jpg` (almacén, ya reemplazada) |
| Objeciones | Nuevo título: **"¿Y si mi empresa no lo necesita?"** |
| FAQ | Nuevo título: **"Lo que las empresas nos preguntan"** |
| CTA final | "Tu empresa representa años de esfuerzo. **Protegerla es estrategia**." |

### 3.1 Pares necesidad → producto ("¿Qué necesitas proteger?")
| Necesidad (título) | Producto (subtítulo) |
|---|---|
| Tus activos | Daños y patrimonial |
| Tus responsabilidades | Responsabilidad Civil |
| Lo que mueve tu negocio | Flotillas |
| A quién resulta indispensable para la empresa | **Seguro de Hombre Clave** 🆕 |
| A las personas que hacen posible tu empresa | Beneficios para empleados |
| La capacidad de seguir operando | Continuidad del negocio |

> ⚠️ **Error detectado en el documento del cliente:** en la maqueta, la tarjeta de *Seguro de Hombre Clave*
> lleva por equivocación las viñetas de transporte de mercancías ("Daños o pérdida de mercancía en tránsito",
> "Robo durante el traslado", "Cobertura nacional, por viaje o anual"). Redacté viñetas propias del producto
> para revisión del cliente.

---

## 4. PÁGINAS DE PRODUCTO
Las maquetas conservan los héroes actuales (Hogar, Vida y Familia, Autos) sin cambios de texto.
Fotos nuevas disponibles para enriquecer estas páginas:
- `img/familia-hogar.jpg` (asesor con familia en jardín) → Hogar / hub Personales
- `img/familia-desayuno.jpg` (familia en desayuno) → Vida y Familia
- `img/autos-familia.jpg` y `img/autos-familia-int.jpg` (familia en auto) → Autos

---

## 5. NUEVA SECCIÓN: NOTICIAS / NOVEDADES
Sustituye a Testimonios en la navegación. Requisitos del cliente:
- Publicaciones que se agregan **manualmente** desde el panel de administración.
- Cada publicación puede incluir **video, flyer (imagen), PDF** y texto.
- Objetivo: "mantener la página en actualización constante de información pertinente".

Diseño propuesto: `noticias.html` (índice con tarjetas filtrables) + detalle por publicación,
alimentado por `assets/data/posts.json`, y una pestaña nueva en el panel de administración
con formulario de alta/edición de publicaciones.

---

## 6. INVENTARIO DE ARCHIVOS GRÁFICOS RECIBIDOS (12)

| Archivo original | Destino en el sitio | Uso |
|---|---|---|
| Gemini_reunión ejecutiva.jpg | `img/reunion-ejecutiva.jpg` | Hero inicio |
| Gemini_siniestro empresa.jpg | `img/riesgo-operacion.jpg` | Sección riesgos (inicio) |
| Gemini_empresarioch.png | `img/asesoria-empresarial.jpg` | Retícula soluciones (inicio) |
| GeminiestrategiaSegurosch.png | `img/asesoria-personal.jpg` | Sección personales (inicio) |
| Gemini_estrategia de seguros.jpg | `img/empresas.jpg` ♻️ | Hero Empresas |
| Gemini_Almacén Seguro.jpg | `img/logistica.jpg` ♻️ | Beneficios Empresas |
| Gemini_FamiliaSeguros.png | `img/familia-hogar.jpg` | Hogar / Personales |
| Gemini_FamiliaenDesayuno.jpg | `img/familia-desayuno.jpg` | Vida y Familia |
| Gemini_SeguroAuto.jpg | `img/autos-familia.jpg` | Autos |
| Gemini_SegurosAuto.jpg | `img/autos-familia-int.jpg` | Autos |
| SimboloDecintel.png | `brand/simbolo-decintel.png` | Ícono de marca |
| LogosimboloEISegurosHorizontal.png | `brand/logo-horizontal.png` | Logo alterno |

♻️ = reemplaza una imagen generada previamente.

Imágenes generadas que **se conservan** (el cliente las mantuvo en sus maquetas):
`hogar.jpg`, `autos.jpg`, `familia-parque.jpg`, `salud.jpg`, `silk-bg*.jpg`.
Quedan sin uso: `hero-cdmx.jpg`, `familia-sala.jpg` (sustituidas).

---

## 7. PENDIENTES / DECISIONES ABIERTAS
1. **Dirección de oficina** — único dato de contacto que sigue faltando.
2. **Strip GNP / Aarco** — no aparece en las maquetas nuevas; ¿se conserva en el inicio?
3. **testimonios.html** — ¿se borra el archivo o se conserva sin enlazar?
4. **Viñetas de Hombre Clave** — redactadas por nosotros, requieren visto bueno.
5. **Nombre de la sección de noticias** — ver §5.
