(function () {
  "use strict";

  var CONFIG = {
    formAction: "https://formspree.io/f/your-form-id"
  };

  // ---------- Focus / Services tabs ----------

  function initFocus() {
    var items = Array.prototype.slice.call(document.querySelectorAll(".focus-item"));
    var panel = document.querySelector(".focus-panel");
    var panelNo = document.querySelector(".focus-panel-copy .no");
    var panelTitle = document.querySelector(".focus-panel-copy .title");
    var panelBody = document.querySelector(".focus-panel-copy .body");
    if (!items.length || !panel) return;

    function activate(index) {
      items.forEach(function (item, i) {
        item.classList.toggle("active", i === index);
      });
      var data = items[index].dataset;
      panel.style.backgroundImage = "url(" + data.img + ")";
      panelNo.textContent = data.no + "  /  07";
      panelTitle.textContent = data.title;
      panelBody.textContent = data.body;
    }

    items.forEach(function (item, i) {
      item.addEventListener("click", function () { activate(i); });
      item.addEventListener("mouseenter", function () { activate(i); });
    });

    activate(0);
  }

  // ---------- Experiences rail ----------

  function initRail() {
    var rail = document.querySelector(".rail");
    var prev = document.querySelector(".rail-btn.prev");
    var next = document.querySelector(".rail-btn.next");
    if (!rail) return;

    function scrollRail(dir) {
      rail.scrollBy({ left: dir * Math.max(260, rail.clientWidth * 0.62), behavior: "smooth" });
    }

    if (prev) prev.addEventListener("click", function () { scrollRail(-1); });
    if (next) next.addEventListener("click", function () { scrollRail(1); });
  }

  // ---------- Mobile nav ----------

  function initMobileNav() {
    var toggle = document.querySelector(".nav-toggle");
    var menu = document.querySelector(".mobile-menu");
    if (!toggle || !menu) return;

    function setOpen(open) {
      toggle.classList.toggle("open", open);
      menu.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    }

    toggle.addEventListener("click", function () {
      setOpen(!menu.classList.contains("open"));
    });

    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () { setOpen(false); });
    });
  }

  // ---------- Contact form ----------

  function initContactForm() {
    var form = document.querySelector(".contact-form");
    if (!form) return;

    var chips = Array.prototype.slice.call(form.querySelectorAll(".chip"));
    var interestsInput = form.querySelector('input[name="interests"]');
    var sentMessage = form.querySelector(".form-sent");
    var picked = [];

    function syncInterests() {
      interestsInput.value = picked.join(", ");
    }

    chips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        var label = chip.dataset.label;
        var idx = picked.indexOf(label);
        if (idx > -1) {
          picked.splice(idx, 1);
          chip.classList.remove("active");
        } else {
          picked.push(label);
          chip.classList.add("active");
        }
        syncInterests();
      });
    });

    form.addEventListener("submit", function (e) {
      if (!CONFIG.formAction || CONFIG.formAction.indexOf("your-form-id") > -1) {
        e.preventDefault();
        if (sentMessage) sentMessage.classList.add("visible");
        form.reset();
        chips.forEach(function (chip) { chip.classList.remove("active"); });
        picked = [];
        syncInterests();
      }
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initFocus();
    initRail();
    initMobileNav();
    initContactForm();
  });
})();
