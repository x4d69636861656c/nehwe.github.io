(function () {
  "use strict";

  /* ---------- Theme toggle ---------- */
  var root = document.documentElement;
  var themeToggle = document.getElementById("theme-toggle");
  var stored = localStorage.getItem("nehwe-theme");
  if (stored) root.setAttribute("data-theme", stored);

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      var current = root.getAttribute("data-theme") === "light" ? "light" : "dark";
      var next = current === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      localStorage.setItem("nehwe-theme", next);
    });
  }

  /* ---------- Mobile nav ---------- */
  var menuToggle = document.getElementById("menu-toggle");
  var navMobile = document.getElementById("nav-mobile");
  if (menuToggle && navMobile) {
    menuToggle.addEventListener("click", function () {
      var isOpen = navMobile.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      document.body.style.overflow = isOpen ? "hidden" : "";
    });
    navMobile.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navMobile.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });
  }

  /* ---------- Portfolio filters ---------- */
  var filterBtns = document.querySelectorAll(".filter-btn");
  var projectItems = document.querySelectorAll(".project-item");
  if (filterBtns.length && projectItems.length) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        filterBtns.forEach(function (b) { b.classList.remove("active"); });
        btn.classList.add("active");
        var filter = btn.getAttribute("data-filter");
        projectItems.forEach(function (item) {
          var types = (item.getAttribute("data-types") || "").split(",");
          var match = filter === "all" || types.indexOf(filter) !== -1;
          item.classList.toggle("hidden", !match);
        });
      });
    });
  }

  /* ---------- Contact form (AJAX submit, no page reload) ---------- */
  var form = document.getElementById("lead-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var submitBtn = document.getElementById("form-submit");
      var successBox = document.getElementById("form-success");
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending…";

      fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" }
      })
        .then(function (response) {
          if (response.ok) {
            form.hidden = true;
            successBox.hidden = false;
            successBox.scrollIntoView({ behavior: "smooth", block: "start" });
          } else {
            throw new Error("Form submission failed");
          }
        })
        .catch(function () {
          submitBtn.disabled = false;
          submitBtn.textContent = "Send message →";
          alert("Something went wrong sending your message — please email hello@nehwe.tech directly.");
        });
    });
  }

  /* ---------- Header shadow on scroll ---------- */
  var header = document.getElementById("site-header");
  if (header) {
    var onScroll = function () {
      header.style.borderBottomColor = window.scrollY > 8 ? "var(--blue)" : "var(--border)";
    };
    window.addEventListener("scroll", onScroll, { passive: true });
  }
})();
