/* EISeguros — Panel de administración (edición local + exportación)
   Sin backend: los cambios se guardan como borrador (localStorage)
   y se exportan como archivo .html listo para reemplazar el original. */
(function () {
  "use strict";

  var frame = document.getElementById("frame");
  var pageSelect = document.getElementById("pageSelect");
  var modeTextBtn = document.getElementById("modeText");
  var modeImgBtn = document.getElementById("modeImg");
  var modeBadge = document.getElementById("modeBadge");
  var imgInput = document.getElementById("imgInput");
  var toast = document.getElementById("toast");

  var mode = "text";                 // "text" | "img"
  var currentPage = "index.html";
  var pendingImg = null;             // <img> en espera de archivo
  var replacedImages = {};           // origSrc -> { dataUrl, fileName, origAttr }
  var toastTimer = null;

  function showToast(msg, ms) {
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove("show"); }, ms || 3200);
  }

  function draftKey(page) { return "eis-admin-draft:" + page; }

  /* ---------- Carga de página ---------- */
  function loadPage(page) {
    currentPage = page;
    replacedImages = {};
    frame.src = page + "?admin=" + Date.now();
  }

  frame.addEventListener("load", function () {
    var doc = frame.contentDocument;
    if (!doc) return;

    /* Borrador previo */
    var draft = localStorage.getItem(draftKey(currentPage));
    if (draft) {
      try {
        var parsed = JSON.parse(draft);
        doc.documentElement.innerHTML = parsed.html;
        replacedImages = parsed.images || {};
        Object.keys(replacedImages).forEach(function (orig) {
          var img = doc.querySelector('img[data-eis-orig="' + CSS.escape(orig) + '"]');
          if (img) img.src = replacedImages[orig].dataUrl;
        });
        showToast("Borrador restaurado. Usa 'Descartar borrador' para volver al original.");
      } catch (e) { /* borrador corrupto: ignorar */ }
    }

    /* Neutralizar navegación y envíos dentro del editor */
    doc.addEventListener("click", function (ev) {
      var a = ev.target.closest && ev.target.closest("a");
      if (a) { ev.preventDefault(); ev.stopPropagation(); }
      if (mode === "img") {
        var img = ev.target.closest && ev.target.closest("img");
        if (img) {
          ev.preventDefault(); ev.stopPropagation();
          pendingImg = img;
          imgInput.click();
        }
      }
    }, true);
    doc.addEventListener("submit", function (ev) { ev.preventDefault(); ev.stopPropagation(); }, true);

    applyMode();
  });

  /* ---------- Modos ---------- */
  function applyMode() {
    var doc = frame.contentDocument;
    if (!doc) return;
    doc.designMode = mode === "text" ? "on" : "off";
    modeBadge.textContent = mode === "text" ? "Modo: texto" : "Modo: imágenes";
    modeBadge.className = mode === "text" ? "text" : "img";
    modeTextBtn.classList.toggle("active", mode === "text");
    modeImgBtn.classList.toggle("active", mode === "img");
    doc.body.style.cursor = mode === "img" ? "crosshair" : "";
  }
  modeTextBtn.addEventListener("click", function () { mode = "text"; applyMode(); });
  modeImgBtn.addEventListener("click", function () { mode = "img"; applyMode(); });

  /* ---------- Reemplazo de imágenes ---------- */
  imgInput.addEventListener("change", function () {
    var file = imgInput.files && imgInput.files[0];
    imgInput.value = "";
    if (!file || !pendingImg) return;
    var reader = new FileReader();
    reader.onload = function () {
      var orig = pendingImg.getAttribute("data-eis-orig") || pendingImg.getAttribute("src");
      pendingImg.setAttribute("data-eis-orig", orig);
      pendingImg.src = reader.result;
      var base = orig.split("?")[0].split("/").pop();
      replacedImages[orig] = { dataUrl: reader.result, fileName: base, origAttr: orig };
      showToast("Imagen sustituida. Al exportar se descargará como '" + base + "' para colocarla en la carpeta original.");
      pendingImg = null;
    };
    reader.readAsDataURL(file);
  });

  /* ---------- Borradores ---------- */
  document.getElementById("saveDraft").addEventListener("click", function () {
    var doc = frame.contentDocument;
    if (!doc) return;
    localStorage.setItem(draftKey(currentPage), JSON.stringify({
      html: doc.documentElement.innerHTML,
      images: replacedImages,
      when: new Date().toISOString()
    }));
    showToast("Borrador guardado en este navegador.");
  });

  document.getElementById("dropDraft").addEventListener("click", function () {
    localStorage.removeItem(draftKey(currentPage));
    loadPage(currentPage);
    showToast("Borrador descartado: se volvió a cargar el archivo original.");
  });

  /* ---------- Exportación ---------- */
  function download(name, blob) {
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = name;
    document.body.appendChild(a);
    a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 400);
  }

  function dataUrlToBlob(dataUrl) {
    var parts = dataUrl.split(",");
    var mime = (parts[0].match(/data:(.*?);/) || [null, "application/octet-stream"])[1];
    var bin = atob(parts[1]);
    var arr = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
    return new Blob([arr], { type: mime });
  }

  document.getElementById("exportBtn").addEventListener("click", function () {
    var doc = frame.contentDocument;
    if (!doc) return;

    var clone = doc.documentElement.cloneNode(true);

    /* Limpiar artefactos del editor */
    clone.querySelectorAll(".reveal.in").forEach(function (el) { el.classList.remove("in"); });
    clone.querySelectorAll("[contenteditable]").forEach(function (el) { el.removeAttribute("contenteditable"); });
    var body = clone.querySelector("body");
    if (body) { body.classList.remove("nav-open"); body.style.cursor = ""; }

    /* Restaurar rutas de imágenes reemplazadas (la imagen viaja como archivo aparte) */
    clone.querySelectorAll("img[data-eis-orig]").forEach(function (img) {
      var orig = img.getAttribute("data-eis-orig");
      img.setAttribute("src", orig);
      img.removeAttribute("data-eis-orig");
    });

    /* Form reactivado si el demo lo deshabilitó */
    clone.querySelectorAll("[disabled]").forEach(function (el) { el.removeAttribute("disabled"); });

    var html = "<!DOCTYPE html>\n" + clone.outerHTML;
    download(currentPage, new Blob([html], { type: "text/html;charset=utf-8" }));

    var imgs = Object.keys(replacedImages);
    imgs.forEach(function (k, i) {
      var rep = replacedImages[k];
      setTimeout(function () { download(rep.fileName, dataUrlToBlob(rep.dataUrl)); }, 350 * (i + 1));
    });

    showToast(imgs.length
      ? "Descargado: " + currentPage + " + " + imgs.length + " imagen(es). Reemplaza los archivos originales del sitio con los descargados."
      : "Descargado: " + currentPage + ". Reemplaza el archivo original del sitio para publicar los cambios.");
  });

  /* ---------- Selector ---------- */
  pageSelect.addEventListener("change", function () { loadPage(pageSelect.value); });

  loadPage(pageSelect.value);
})();

/* ============================================================
   Novedades — gestor de publicaciones (posts.json)
   ============================================================ */
(function () {
  "use strict";

  var tabPages = document.getElementById("tabPages");
  var tabPosts = document.getElementById("tabPosts");
  if (!tabPosts) return;

  var panePages = document.getElementById("panePages");
  var panePosts = document.getElementById("panePosts");
  var pagesCtl = document.getElementById("pagesCtl");
  var postsCtl = document.getElementById("postsCtl");
  var hintPages = document.getElementById("hintPages");
  var hintPosts = document.getElementById("hintPosts");
  var listEl = document.getElementById("postList");
  var toast = document.getElementById("toast");

  var F = {
    titulo: document.getElementById("p-titulo"),
    fecha: document.getElementById("p-fecha"),
    categoria: document.getElementById("p-categoria"),
    video: document.getElementById("p-video"),
    resumen: document.getElementById("p-resumen"),
    texto: document.getElementById("p-texto"),
    imagen: document.getElementById("p-imagen"),
    pdf: document.getElementById("p-pdf"),
    pdfTitulo: document.getElementById("p-pdfTitulo")
  };

  var posts = [];
  var selId = null;
  var tt;

  function say(msg, ms) {
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(tt);
    tt = setTimeout(function () { toast.classList.remove("show"); }, ms || 3600);
  }

  function slug(s) {
    return String(s || "").toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60) || "publicacion";
  }

  function download(name, blob) {
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = name;
    document.body.appendChild(a); a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 400);
  }

  /* ---------- Pestañas ---------- */
  function showTab(which) {
    var isPosts = which === "posts";
    tabPosts.setAttribute("aria-selected", String(isPosts));
    tabPages.setAttribute("aria-selected", String(!isPosts));
    panePosts.classList.toggle("on", isPosts);
    panePages.classList.toggle("on", !isPosts);
    postsCtl.style.display = isPosts ? "contents" : "none";
    pagesCtl.style.display = isPosts ? "none" : "contents";
    hintPosts.style.display = isPosts ? "" : "none";
    hintPages.style.display = isPosts ? "none" : "";
  }
  tabPages.addEventListener("click", function () { showTab("pages"); });
  tabPosts.addEventListener("click", function () { showTab("posts"); });

  /* ---------- Lista ---------- */
  function renderList() {
    posts.sort(function (a, b) { return String(b.fecha).localeCompare(String(a.fecha)); });
    if (!posts.length) {
      listEl.innerHTML = '<p style="color:var(--soft);font-size:0.86rem;">Aún no hay publicaciones. Crea la primera con “＋ Nueva publicación”.</p>';
      return;
    }
    listEl.innerHTML = posts.map(function (p) {
      return '<div class="post-item' + (p.id === selId ? " sel" : "") + '" data-id="' + p.id + '">' +
        '<div class="t">' + (p.titulo || "(sin título)") + "</div>" +
        '<div class="d">' + (p.fecha || "") + " · " + (p.categoria || "Aviso") + "</div></div>";
    }).join("");
    listEl.querySelectorAll(".post-item").forEach(function (el) {
      el.addEventListener("click", function () { select(el.getAttribute("data-id")); });
    });
  }

  function select(id) {
    var p = posts.filter(function (x) { return x.id === id; })[0];
    if (!p) return;
    selId = id;
    Object.keys(F).forEach(function (k) { F[k].value = p[k] || ""; });
    document.getElementById("editorTitle").textContent = "Editando: " + (p.titulo || "(sin título)");
    renderList();
  }

  function blank() {
    selId = null;
    Object.keys(F).forEach(function (k) { F[k].value = ""; });
    F.fecha.value = new Date().toISOString().slice(0, 10);
    F.categoria.value = "Aviso";
    document.getElementById("editorTitle").textContent = "Nueva publicación";
    renderList();
  }

  document.getElementById("newPost").addEventListener("click", blank);

  /* ---------- Guardar ---------- */
  document.getElementById("savePost").addEventListener("click", function () {
    if (!F.titulo.value.trim()) { say("Ponle un título a la publicación."); return; }
    var data = {};
    Object.keys(F).forEach(function (k) { data[k] = F[k].value.trim(); });
    if (selId) {
      var p = posts.filter(function (x) { return x.id === selId; })[0];
      Object.keys(data).forEach(function (k) { p[k] = data[k]; });
      say("Publicación actualizada. No olvides descargar posts.json.");
    } else {
      var id = slug(data.titulo);
      var n = 2;
      while (posts.some(function (x) { return x.id === id; })) { id = slug(data.titulo) + "-" + n++; }
      data.id = id;
      posts.push(data);
      selId = id;
      say("Publicación creada. No olvides descargar posts.json.");
    }
    document.getElementById("editorTitle").textContent = "Editando: " + data.titulo;
    renderList();
  });

  document.getElementById("deletePost").addEventListener("click", function () {
    if (!selId) { say("Selecciona una publicación de la lista."); return; }
    var p = posts.filter(function (x) { return x.id === selId; })[0];
    if (!window.confirm('¿Eliminar la publicación "' + (p.titulo || selId) + '"?')) return;
    posts = posts.filter(function (x) { return x.id !== selId; });
    blank();
    say("Publicación eliminada. Descarga posts.json para aplicarlo.");
  });

  document.getElementById("previewPost").addEventListener("click", function () {
    if (!selId) { say("Selecciona una publicación primero."); return; }
    window.open("novedades.html?post=" + encodeURIComponent(selId), "_blank");
  });

  /* ---------- Adjuntos ---------- */
  function attach(inputFile, targetField, folder) {
    inputFile.addEventListener("change", function () {
      var file = inputFile.files && inputFile.files[0];
      inputFile.value = "";
      if (!file) return;
      var clean = file.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9.]+/g, "-");
      targetField.value = folder + clean;
      download(clean, file);
      say('Archivo "' + clean + '" descargado — súbelo a ' + folder + " del sitio.");
    });
  }
  attach(document.getElementById("fileImg"), F.imagen, "assets/img/");
  attach(document.getElementById("filePdf"), F.pdf, "assets/docs/");

  /* ---------- Exportar ---------- */
  document.getElementById("exportPosts").addEventListener("click", function () {
    var json = JSON.stringify({ posts: posts }, null, 2);
    download("posts.json", new Blob([json], { type: "application/json;charset=utf-8" }));
    say("posts.json descargado — colócalo en assets/data/ del sitio.");
  });

  /* ---------- Carga inicial ---------- */
  fetch("assets/data/posts.json?v=" + Date.now())
    .then(function (r) { return r.json(); })
    .then(function (d) { posts = (d && d.posts) || []; blank(); })
    .catch(function () { posts = []; blank(); say("No se pudo leer posts.json; se empieza en blanco."); });
})();
