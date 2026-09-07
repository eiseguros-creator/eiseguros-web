/* EISeguros — Novedades: listado, filtros y detalle de publicaciones
   Los datos viven en assets/data/posts.json (editable desde el panel admin). */
(function () {
  "use strict";

  var grid = document.getElementById("grid");
  var filters = document.getElementById("filters");
  var empty = document.getElementById("empty");
  var detail = document.getElementById("detail");
  var detailBody = document.getElementById("detailBody");
  if (!grid) return;

  var posts = [];
  var activeCat = "Todas";

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function fechaLarga(iso) {
    var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || "");
    if (!m) return esc(iso || "");
    var meses = ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"];
    return Number(m[3]) + " de " + meses[Number(m[2]) - 1] + " de " + m[1];
  }

  /* Convierte una URL de YouTube/Vimeo en URL embebible */
  function embedUrl(url) {
    if (!url) return "";
    var yt = /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{6,})/.exec(url);
    if (yt) return "https://www.youtube.com/embed/" + yt[1];
    var vm = /vimeo\.com\/(?:video\/)?(\d+)/.exec(url);
    if (vm) return "https://player.vimeo.com/video/" + vm[1];
    return url;
  }

  function badges(p) {
    var b = "";
    if (p.video) b += '<span class="kind-badge">▶ Video</span>';
    if (p.pdf) b += '<span class="kind-badge">PDF</span>';
    if (p.imagen && !p.video) b += '<span class="kind-badge">Flyer</span>';
    return b ? '<span class="kind-badges">' + b + "</span>" : "";
  }

  function cardHTML(p) {
    var thumb = p.imagen
      ? '<img src="' + esc(p.imagen) + '" alt="' + esc(p.titulo) + '" loading="lazy">'
      : '<span class="ph" aria-hidden="true">' + (p.video ? "▶" : p.pdf ? "PDF" : "★") + "</span>";
    return (
      '<a class="glass post-card reveal" href="?post=' + encodeURIComponent(p.id) + '">' +
        '<div class="post-thumb">' + thumb + "</div>" +
        '<div class="post-body">' +
          '<div class="post-meta">' +
            '<span class="post-tag">' + esc(p.categoria || "Aviso") + "</span>" +
            "<span>" + fechaLarga(p.fecha) + "</span>" +
            badges(p) +
          "</div>" +
          "<h3>" + esc(p.titulo) + "</h3>" +
          "<p>" + esc(p.resumen || "") + "</p>" +
          '<span class="more">Leer más →</span>' +
        "</div>" +
      "</a>"
    );
  }

  function render() {
    var list = posts.slice().sort(function (a, b) {
      return String(b.fecha).localeCompare(String(a.fecha));
    });
    if (activeCat !== "Todas") {
      list = list.filter(function (p) { return (p.categoria || "Aviso") === activeCat; });
    }
    grid.innerHTML = list.map(cardHTML).join("");
    empty.hidden = list.length > 0;
    grid.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("in"); });
  }

  function renderFilters() {
    var cats = ["Todas"];
    posts.forEach(function (p) {
      var c = p.categoria || "Aviso";
      if (cats.indexOf(c) === -1) cats.push(c);
    });
    filters.innerHTML = cats
      .map(function (c) {
        return '<button class="chip" type="button" aria-pressed="' + (c === activeCat) + '">' + esc(c) + "</button>";
      })
      .join("");
    filters.querySelectorAll(".chip").forEach(function (btn) {
      btn.addEventListener("click", function () {
        activeCat = btn.textContent;
        filters.querySelectorAll(".chip").forEach(function (b) {
          b.setAttribute("aria-pressed", String(b === btn));
        });
        render();
      });
    });
  }

  function renderDetail(p) {
    document.querySelectorAll("section").forEach(function (s) {
      if (s !== detail && !s.querySelector(".cta-band")) s.hidden = true;
    });
    detail.hidden = false;
    document.title = p.titulo + " — TipSeguros | EISeguros";

    var html =
      '<div class="post-meta" style="margin-bottom:1rem;">' +
        '<span class="post-tag">' + esc(p.categoria || "Aviso") + "</span>" +
        "<span>" + fechaLarga(p.fecha) + "</span>" +
      "</div>" +
      "<h1 style=\"font-size:clamp(1.9rem,4vw,2.8rem);\">" + esc(p.titulo) + "</h1>";

    if (p.video) {
      html += '<div class="video-wrap"><iframe src="' + esc(embedUrl(p.video)) +
        '" title="' + esc(p.titulo) + '" allowfullscreen loading="lazy" ' +
        'allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe></div>';
    } else if (p.imagen) {
      html += '<img class="flyer" src="' + esc(p.imagen) + '" alt="' + esc(p.titulo) + '">';
    }

    if (p.resumen) html += '<p class="lead">' + esc(p.resumen) + "</p>";
    if (p.texto) html += '<div class="post-text">' + esc(p.texto) + "</div>";

    if (p.video && p.imagen) {
      html += '<img class="flyer" src="' + esc(p.imagen) + '" alt="' + esc(p.titulo) + '">';
    }

    var attach = "";
    if (p.pdf) {
      attach += '<a class="btn btn-primary" href="' + esc(p.pdf) + '" target="_blank" rel="noopener">⬇ ' +
        esc(p.pdfTitulo || "Descargar documento (PDF)") + "</a>";
    }
    attach += '<a class="btn btn-ghost" href="contacto.html">Quiero asesoría <span class="arrow">→</span></a>';
    html += '<div class="attach-row">' + attach + "</div>";

    detailBody.innerHTML = html;
  }

  function boot(data) {
    posts = (data && data.posts) || [];
    var id = new URLSearchParams(location.search).get("post");
    if (id) {
      var p = posts.filter(function (x) { return x.id === id; })[0];
      if (p) { renderDetail(p); return; }
    }
    renderFilters();
    render();
  }

  fetch("assets/data/posts.json?v=" + Date.now())
    .then(function (r) { return r.json(); })
    .then(boot)
    .catch(function () {
      grid.innerHTML = "";
      empty.hidden = false;
      empty.innerHTML = "<p>No se pudieron cargar las publicaciones.</p>";
    });
})();
