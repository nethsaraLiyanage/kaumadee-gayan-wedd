/* ==========================================================================
   Kaumadee & Gayan — Wedding Invitation
   Reads window.INVITATION_CONFIG and drives the whole page.
   ========================================================================== */
(function () {
  "use strict";

  var CONFIG = window.INVITATION_CONFIG;
  if (!CONFIG) {
    console.error("[invitation] js/config.js did not load — nothing to render.");
    return;
  }

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------------------------------------------------------
   * Helpers
   * ------------------------------------------------------------ */

  /** Read "sections.rsvp.title" out of the config object. */
  function lookup(path) {
    return path.split(".").reduce(function (node, key) {
      return node == null ? undefined : node[key];
    }, CONFIG);
  }

  /** Fill every [data-bind] element from the config. */
  function applyBindings(root) {
    (root || document).querySelectorAll("[data-bind]").forEach(function (el) {
      var value = lookup(el.getAttribute("data-bind"));
      if (value != null) el.innerHTML = value;
    });
  }

  /** Hide any [data-optional] element whose config value is empty or null. */
  function applyOptional(root) {
    (root || document).querySelectorAll("[data-optional]").forEach(function (el) {
      var value = lookup(el.getAttribute("data-optional"));
      if (value == null || value === "") el.hidden = true;
    });
  }

  function pad2(n) {
    return String(n).padStart(2, "0");
  }

  /** 1 -> "1st", 2 -> "2nd", 11 -> "11th" */
  function ordinal(n) {
    var teens = n % 100;
    if (teens >= 11 && teens <= 13) return n + "th";
    return n + (["th", "st", "nd", "rd"][n % 10] || "th");
  }

  /* ---------------------------------------------------------------
   * Date + time
   * ------------------------------------------------------------ */
  var eventDate = new Date(CONFIG.event.datetime);
  var eventValid = !isNaN(eventDate.getTime());

  if (!eventValid) {
    console.warn("[invitation] event.datetime is not a valid date:", CONFIG.event.datetime);
  }

  /**
   * The hero date block is derived from event.datetime, so changing the date
   * in config.js updates the weekday, month, day and year automatically.
   */
  function renderDateBlock() {
    if (!eventValid) return;

    var parts = {
      weekday: eventDate.toLocaleDateString("en-US", { weekday: "long" }),
      month: eventDate.toLocaleDateString("en-US", { month: "long" }),
      day: String(eventDate.getDate()),
      year: String(eventDate.getFullYear()),
    };

    // "Thursday, 5 November 2026"
    parts.full = parts.weekday + ", " + parts.day + " " + parts.month + " " + parts.year;

    // "Thursday, 5th November" — the year is shown on its own line beneath it
    parts.dayline = parts.weekday + ", " + ordinal(eventDate.getDate()) + " " + parts.month;

    document.querySelectorAll("[data-date]").forEach(function (el) {
      var value = parts[el.getAttribute("data-date")];
      if (value) el.textContent = value;
    });
  }

  function formatLongDate(value) {
    var d = new Date(value);
    if (isNaN(d.getTime())) return null;
    return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  }

  /* ---------------------------------------------------------------
   * The couple — portrait, then each name under its parents'
   * ------------------------------------------------------------ */
  function renderCouple() {
    var couple = CONFIG.sections.couple || {};
    var monogram = CONFIG.couple.monogramOne + " & " + CONFIG.couple.monogramTwo;

    renderPortrait(couple.portrait, monogram);

    var host = document.getElementById("coupleUnion");
    var people = couple.people || [];
    if (!host) return;

    host.innerHTML = "";
    people.forEach(function (person, index) {
      var card = document.createElement("article");
      card.className = "person";

      [
        ["person__relation", person.relation],
        ["person__parents", person.parents],
        ["person__name", person.name],
      ].forEach(function (row) {
        if (!row[1]) return;
        var line = document.createElement("p");
        line.className = row[0];
        line.innerHTML = row[1];
        card.appendChild(line);
      });

      host.appendChild(card);

      // The medallion is what the two cards are joined by, so it only
      // belongs there when there is in fact a second name to join to.
      if (index === 0 && people.length > 1) {
        var amp = document.createElement("span");
        amp.className = "union__amp";
        amp.setAttribute("aria-hidden", "true");
        amp.textContent = "&";
        host.appendChild(amp);
      }
    });
  }

  function renderPortrait(portrait, monogram) {
    var host = document.getElementById("couplePortrait");
    if (!host || !portrait || !portrait.image) return;

    var img = document.createElement("img");
    img.src = portrait.image;
    img.alt = portrait.alt ? String(portrait.alt).replace(/&amp;/g, "&") : "";
    img.loading = "lazy";

    // If the picture has not been dropped in yet, fall back to the monogram.
    img.addEventListener("error", function () {
      host.setAttribute("data-monogram", monogram);
      host.classList.add("is-empty");
      img.remove();
    });

    host.appendChild(img);
    host.hidden = false;
  }

  /* ---------------------------------------------------------------
   * Venue link
   * ------------------------------------------------------------ */
  function renderVenue() {
    var link = document.getElementById("directionsLink");
    if (!link) return;

    if (CONFIG.event.mapsUrl) {
      link.href = CONFIG.event.mapsUrl;
    } else {
      link.hidden = true;
    }
  }

  /* ---------------------------------------------------------------
   * Embedded map
   * Built here rather than in the markup so it stays config-driven and the
   * third-party iframe is only requested when a map is actually configured.
   * ------------------------------------------------------------ */
  function renderMap() {
    var host = document.getElementById("venueMap");
    if (!host) return;

    var map = CONFIG.event.map;
    if (!map) return; // stays hidden

    // An explicit embed URL always wins; otherwise build one from coordinates.
    var src = map.embedUrl;
    if (!src) {
      if (map.lat == null || map.lng == null) return;
      src = "https://maps.google.com/maps?q=" +
        encodeURIComponent(map.lat + "," + map.lng) +
        "&z=" + (map.zoom || 16) +
        "&hl=en&output=embed";
    }

    var frame = document.createElement("iframe");
    frame.src = src;
    frame.title = map.title || "Map showing the venue";
    frame.loading = "lazy";
    frame.referrerPolicy = "no-referrer-when-downgrade";
    frame.allowFullscreen = true;
    host.appendChild(frame);

    // A text link out, for anyone who cannot use the embedded map.
    if (CONFIG.event.mapsUrl && map.linkLabel) {
      var caption = document.createElement("figcaption");
      caption.className = "map__caption";

      var link = document.createElement("a");
      link.href = CONFIG.event.mapsUrl;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = map.linkLabel;

      caption.appendChild(link);
      host.appendChild(caption);
    }

    host.hidden = false;
  }

  /* ---------------------------------------------------------------
   * RSVP
   * ------------------------------------------------------------ */
  function renderRsvp() {
    var rsvp = CONFIG.sections.rsvp || {};
    var names = CONFIG.couple.nameOne + " & " + CONFIG.couple.nameTwo;

    // Deadline line
    var deadlineEl = document.getElementById("rsvpDeadline");
    if (deadlineEl) {
      var pretty = rsvp.deadline ? formatLongDate(rsvp.deadline) : null;
      if (pretty) {
        deadlineEl.textContent = (rsvp.deadlineTemplate || "Please reply before {date}.")
          .replace("{date}", pretty);
      } else {
        deadlineEl.hidden = true;
      }
    }

    // Contact buttons — WhatsApp when a phone number is given.
    var host = document.getElementById("rsvpActions");
    if (!host) return;

    var message = (rsvp.messageTemplate || "").replace("{names}", names);

    host.innerHTML = "";
    (rsvp.contacts || []).forEach(function (contact) {
      var link = document.createElement("a");
      link.className = "btn";
      link.textContent = contact.label;

      if (contact.phone) {
        var digits = String(contact.phone).replace(/[^\d]/g, "");
        link.href = "https://wa.me/" + digits +
          (message ? "?text=" + encodeURIComponent(message) : "");
        link.target = "_blank";
        link.rel = "noopener noreferrer";
      } else if (contact.url) {
        link.href = contact.url;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
      } else {
        return;
      }

      host.appendChild(link);
    });
  }

  /* ---------------------------------------------------------------
   * Footer meta line — "14 · 02 · 2027 — HALL, VENUE CITY"
   * ------------------------------------------------------------ */
  function renderFooter() {
    var el = document.getElementById("footerMeta");
    if (!el || !eventValid) return;

    var stamp = [
      pad2(eventDate.getDate()),
      pad2(eventDate.getMonth() + 1),
      eventDate.getFullYear(),
    ].join(" · ");

    var place = [CONFIG.event.venueHall, CONFIG.event.venueName, CONFIG.event.venueCity]
      .filter(Boolean)
      .join(", ");

    el.textContent = place ? stamp + " — " + place : stamp;
  }

  /* ---------------------------------------------------------------
   * Countdown
   * ------------------------------------------------------------ */
  function startCountdown() {
    var clock = document.getElementById("clock");
    var done = document.getElementById("clockDone");
    if (!clock || !eventValid) return;

    var fields = {};
    clock.querySelectorAll("[data-clock]").forEach(function (el) {
      fields[el.getAttribute("data-clock")] = el;
    });

    var timer;

    function tick() {
      var remaining = eventDate.getTime() - Date.now();

      if (remaining <= 0) {
        clock.classList.add("is-done");
        if (done) done.hidden = false;
        clearInterval(timer);
        return;
      }

      var seconds = Math.floor(remaining / 1000);
      var values = {
        days: Math.floor(seconds / 86400),
        hours: Math.floor(seconds / 3600) % 24,
        minutes: Math.floor(seconds / 60) % 60,
        seconds: seconds % 60,
      };

      Object.keys(values).forEach(function (key) {
        if (fields[key]) fields[key].textContent = pad2(values[key]);
      });
    }

    tick();
    timer = setInterval(tick, 1000);
  }

  /* ---------------------------------------------------------------
   * Scroll reveal
   * ------------------------------------------------------------ */
  function setupReveal() {
    var targets = document.querySelectorAll(".reveal");

    if (reducedMotion || !("IntersectionObserver" in window)) {
      targets.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });

    targets.forEach(function (el) { observer.observe(el); });
  }

  /* ---------------------------------------------------------------
   * Drifting petals
   * ------------------------------------------------------------ */
  function setupPetals() {
    var host = document.getElementById("petals");
    var settings = CONFIG.effects || {};
    if (!host || !settings.petals || reducedMotion) return;

    var count = settings.petalCount || 12;

    for (var i = 0; i < count; i++) {
      var petal = document.createElement("span");
      var size = 7 + Math.random() * 9;

      petal.className = "petal";
      petal.style.left = (Math.random() * 100).toFixed(2) + "%";
      petal.style.width = size.toFixed(1) + "px";
      petal.style.height = (size * 0.8).toFixed(1) + "px";
      petal.style.setProperty("--drift", (Math.random() * 160 - 80).toFixed(0) + "px");
      petal.style.animationDuration = (11 + Math.random() * 11).toFixed(1) + "s";
      petal.style.animationDelay = (-Math.random() * 18).toFixed(1) + "s";
      petal.style.opacity = (0.35 + Math.random() * 0.4).toFixed(2);

      host.appendChild(petal);
    }
  }

  /* ---------------------------------------------------------------
   * Background music
   * ------------------------------------------------------------ */
  var music = (function () {
    var button = document.getElementById("musicButton");
    var audio = document.getElementById("musicAudio");
    var src = CONFIG.music && CONFIG.music.src;

    if (!button || !audio || !src) {
      return { enable: function () {} };
    }

    audio.src = src;
    button.hidden = false;

    function setPlaying(playing) {
      button.setAttribute("aria-pressed", playing ? "true" : "false");
    }

    function play() {
      var attempt = audio.play();
      if (attempt && attempt.catch) {
        // Browsers block autoplay until the user interacts — that is fine.
        attempt.then(function () { setPlaying(true); })
               .catch(function () { setPlaying(false); });
      } else {
        setPlaying(true);
      }
    }

    button.addEventListener("click", function () {
      if (audio.paused) {
        play();
      } else {
        audio.pause();
        setPlaying(false);
      }
    });

    return {
      // Called on the seal tap — a real user gesture, so autoplay is allowed.
      enable: function () {
        if (CONFIG.music.startMuted) return;
        play();
      },
    };
  })();

  /* ---------------------------------------------------------------
   * The card gate — tapping the seal opens the two leaves
   * ------------------------------------------------------------ */
  function setupGate() {
    var gate = document.getElementById("gate");
    var card = document.getElementById("card");
    var button = document.getElementById("sealButton");
    var invitation = document.getElementById("invitation");
    if (!gate || !card || !button || !invitation) return;

    // Applied here rather than in the markup so the page stays usable
    // when JavaScript is unavailable and the gate never appears.
    invitation.setAttribute("inert", "");

    var opened = false;

    function open() {
      if (opened) return;
      opened = true;

      card.classList.add("is-open");
      button.disabled = true;
      music.enable();

      // Let the card finish opening before handing the page over.
      var hold = reducedMotion ? 200 : 2400;

      setTimeout(function () {
        gate.classList.add("is-dismissed");
        document.body.classList.remove("is-gated");
        invitation.removeAttribute("inert");
        invitation.classList.add("is-revealed");

        // Reveal anything already in view once the gate lifts.
        window.dispatchEvent(new Event("scroll"));

        setTimeout(function () { gate.remove(); }, 1200);
      }, hold);
    }

    button.addEventListener("click", open);
  }

  /* ---------------------------------------------------------------
   * Boot
   * ------------------------------------------------------------ */
  function init() {
    document.title = CONFIG.couple.nameOne + " & " + CONFIG.couple.nameTwo + " — Wedding Invitation";

    applyBindings();
    applyOptional();
    renderDateBlock();
    renderCouple();
    renderVenue();
    renderMap();
    renderRsvp();
    renderFooter();

    setupReveal();
    setupPetals();
    startCountdown();
    setupGate();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
