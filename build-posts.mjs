/**
 * Genera public/assets/data/posts.json a partir de las publicaciones
 * que Enrique crea desde el panel /admin/ (carpeta content/tips/).
 *
 * Netlify lo ejecuta en cada despliegue. No requiere dependencias.
 */
import { readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join } from "node:path";

const ORIGEN = "content/tips";
const DESTINO_DIR = "public/assets/data";
const DESTINO = join(DESTINO_DIR, "posts.json");

const posts = [];

if (existsSync(ORIGEN)) {
  for (const archivo of readdirSync(ORIGEN).filter((f) => f.endsWith(".json"))) {
    try {
      const datos = JSON.parse(readFileSync(join(ORIGEN, archivo), "utf8"));
      posts.push({
        id: archivo.replace(/\.json$/, ""),
        fecha: datos.fecha || "",
        categoria: datos.categoria || "Aviso",
        titulo: datos.titulo || "",
        resumen: datos.resumen || "",
        texto: datos.texto || "",
        imagen: datos.imagen || "",
        video: datos.video || "",
        pdf: datos.pdf || "",
        pdfTitulo: datos.pdfTitulo || "",
      });
    } catch (e) {
      console.error(`  ✗ No se pudo leer ${archivo}: ${e.message}`);
    }
  }
}

// Más recientes primero
posts.sort((a, b) => String(b.fecha).localeCompare(String(a.fecha)));

mkdirSync(DESTINO_DIR, { recursive: true });
writeFileSync(DESTINO, JSON.stringify({ posts }, null, 2) + "\n", "utf8");

console.log(`posts.json generado con ${posts.length} publicación(es) de TipSeguros.`);
