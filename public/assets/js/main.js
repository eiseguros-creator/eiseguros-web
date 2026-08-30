/* EISeguros — interacciones mínimas */
(function () {
  "use strict";

  /* Nav móvil */
  var toggle = document.querySelector(".nav-toggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      document.body.classList.toggle("nav-open");
      toggle.setAttribute(
        "aria-expanded",
        document.body.classList.contains("nav-open") ? "true" : "false"
      );
    });
    document.querySelectorAll(".nav-links a").forEach(function (a) {
      a.addEventListener("click", function () {
        document.body.classList.remove("nav-open");
      });
    });
  }

  /* Header: sombra al hacer scroll */
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("scrolled", window.scrollY > 30);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* Reveal on scroll */
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var items = document.querySelectorAll(".reveal");
  if (!reduced && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add("in"); });
  }

  /* Contadores de la banda de cifras */
  var nums = document.querySelectorAll("[data-count]");
  if (nums.length && !reduced && "IntersectionObserver" in window) {
    var io2 = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          io2.unobserve(e.target);
          var el = e.target;
          var target = parseFloat(el.getAttribute("data-count"));
          var suffix = el.getAttribute("data-suffix") || "";
          var dur = 1400;
          var t0 = null;
          var step = function (t) {
            if (!t0) t0 = t;
            var p = Math.min((t - t0) / dur, 1);
            var eased = 1 - Math.pow(1 - p, 3);
            el.textContent = Math.round(target * eased) + suffix;
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        });
      },
      { threshold: 0.5 }
    );
    nums.forEach(function (el) { io2.observe(el); });
  }

  /* Form de contacto: demo sin backend */
  var form = document.querySelector("[data-quote-form]");
  if (form) {
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var ok = form.querySelector(".form-ok");
      if (ok) {
        ok.hidden = false;
        ok.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      form.querySelectorAll("input, select, textarea, button").forEach(function (el) {
        el.disabled = true;
      });
    });
  }
})();
