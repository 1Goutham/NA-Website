/* Nunnari Academy — interactions. No dependencies. */
(() => {
  "use strict";

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;
  const desktop = matchMedia("(min-width: 1024px)");

  /* ---------- Header: scrolled / hide on scroll down ---------- */
  const header = $("[data-header]");
  const progress = $("[data-progress]");
  let lastY = scrollY;
  let ticking = false;
  const onScroll = () => {
    const y = scrollY;
    if (header) {
      header.classList.toggle("is-scrolled", y > 8);
      const goingDown = y > lastY && y > 240;
      const menuOpen = header.classList.contains("nav-open") || $(".nav__item.is-open", header);
      header.classList.toggle("is-hidden", goingDown && !menuOpen);
    }
    lastY = y;
    ticking = false;
    const max = document.documentElement.scrollHeight - innerHeight;
    progress?.style.setProperty("--p", max > 0 ? (y / max).toFixed(4) : 0);
  };
  addEventListener("scroll", () => { if (!ticking) { requestAnimationFrame(onScroll); ticking = true; } }, { passive: true });
  onScroll();

  /* ---------- Nav menus ---------- */
  const items = $$(".nav__item.has-menu");
  const closeAll = (except) => items.forEach((it) => {
    if (it === except) return;
    it.classList.remove("is-open");
    $(".nav__link", it)?.setAttribute("aria-expanded", "false");
  });
  items.forEach((item) => {
    const btn = $(".nav__link", item);
    let t;
    btn.addEventListener("click", () => {
      const open = !item.classList.contains("is-open");
      closeAll(item);
      item.classList.toggle("is-open", open);
      btn.setAttribute("aria-expanded", String(open));
    });
    item.addEventListener("pointerenter", (e) => {
      if (e.pointerType !== "mouse" || !desktop.matches) return;
      clearTimeout(t); closeAll(item);
      item.classList.add("is-open"); btn.setAttribute("aria-expanded", "true");
    });
    item.addEventListener("pointerleave", (e) => {
      if (e.pointerType !== "mouse" || !desktop.matches) return;
      t = setTimeout(() => { item.classList.remove("is-open"); btn.setAttribute("aria-expanded", "false"); }, 140);
    });
    item.addEventListener("focusout", (e) => {
      if (desktop.matches && !item.contains(e.relatedTarget)) { item.classList.remove("is-open"); btn.setAttribute("aria-expanded", "false"); }
    });
  });
  document.addEventListener("click", (e) => { if (!e.target.closest(".nav__item")) closeAll(); });
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    const open = $(".nav__item.is-open");
    if (open) { closeAll(); $(".nav__link", open).focus(); }
    if (header?.classList.contains("nav-open")) toggleNav(false);
  });

  const burger = $("[data-burger]");
  const toggleNav = (force) => {
    const open = force ?? !header.classList.contains("nav-open");
    header.classList.toggle("nav-open", open);
    burger.setAttribute("aria-expanded", String(open));
    document.documentElement.style.overflow = open ? "hidden" : "";
  };
  burger?.addEventListener("click", () => toggleNav());
  $$(".nav a").forEach((a) => a.addEventListener("click", () => { if (header.classList.contains("nav-open")) toggleNav(false); closeAll(); }));
  desktop.addEventListener("change", () => { if (desktop.matches) toggleNav(false); });

  /* ---------- Split headings into words ---------- */
  $$("[data-split]").forEach((el) => {
    let wi = 0;
    const walk = (node) => {
      [...node.childNodes].forEach((n) => {
        if (n.nodeType === 3) {
          const frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach((part) => {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.append(part); return; }
            const s = document.createElement("span");
            s.className = "w"; s.style.setProperty("--wi", wi++); s.textContent = part;
            frag.append(s);
          });
          n.replaceWith(frag);
        } else if (n.nodeType === 1 && !n.classList.contains("w")) {
          if (n.classList.contains("accent")) { n.classList.add("w"); n.style.setProperty("--wi", wi++); }
          else walk(n);
        }
      });
    };
    walk(el);
    el.classList.add("split");
  });

  /* ---------- Reveal on scroll ---------- */
  const revealIO = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      en.target.classList.add("is-in");
      revealIO.unobserve(en.target);
    });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });
  $$("[data-reveal], .split, [data-inview]").forEach((el) => revealIO.observe(el));

  /* ---------- Pause looping animations when offscreen ---------- */
  const pauseIO = new IntersectionObserver((entries) => {
    entries.forEach((en) => en.target.classList.toggle("is-paused", !en.isIntersecting));
  });
  $$("[data-loop], .marquee, .art, .deco, .event__art").forEach((el) => pauseIO.observe(el));
  document.addEventListener("visibilitychange", () => document.body.classList.toggle("is-paused", document.hidden));

  /* ---------- Counters ---------- */
  const fmt = (n) => n.toLocaleString("en-IN");
  const countIO = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      countIO.unobserve(en.target);
      const el = en.target;
      const end = parseFloat(el.dataset.count);
      const prefix = el.dataset.prefix || "";
      const suffix = el.dataset.suffix || "";
      if (reduced) { el.textContent = prefix + fmt(end) + suffix; return; }
      const dur = 1600;
      const t0 = performance.now();
      const step = (t) => {
        const p = Math.min(1, (t - t0) / dur);
        const e = 1 - Math.pow(1 - p, 4);
        el.textContent = prefix + fmt(Math.round(end * e)) + suffix;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  }, { threshold: 0.6 });
  $$("[data-count]").forEach((el) => countIO.observe(el));

  /* ---------- Pointer effects (fine pointers only) ---------- */
  if (finePointer && !reduced) {
    // Spotlight that follows the cursor inside cards
    document.addEventListener("pointermove", (e) => {
      const el = e.target.closest?.(".spot");
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - r.left}px`);
      el.style.setProperty("--my", `${e.clientY - r.top}px`);
    }, { passive: true });

    // Gentle magnetic pull on key CTAs
    $$("[data-magnetic]").forEach((el) => {
      let raf;
      el.addEventListener("pointermove", (e) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) * 0.18;
        const y = (e.clientY - r.top - r.height / 2) * 0.28;
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => { el.style.transform = `translate(${x}px, ${y}px)`; });
      });
      el.addEventListener("pointerleave", () => { cancelAnimationFrame(raf); el.style.transform = ""; });
    });

    // Hero glow follows pointer
    const hero = $("[data-hero]");
    const glow = $(".hero__glow", hero || document);
    if (hero && glow) {
      hero.addEventListener("pointermove", (e) => {
        const r = hero.getBoundingClientRect();
        glow.style.setProperty("--gx", `${((e.clientX - r.left) / r.width) * 100}%`);
        glow.style.setProperty("--gy", `${((e.clientY - r.top) / r.height) * 100}%`);
      }, { passive: true });
    }

    // Parallax tilt on illustrations
    $$("[data-tilt]").forEach((el) => {
      let raf;
      el.addEventListener("pointermove", (e) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => { el.style.transform = `perspective(900px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg)`; });
      });
      el.addEventListener("pointerleave", () => { cancelAnimationFrame(raf); el.style.transform = ""; });
      el.style.transition = "transform .6s cubic-bezier(.22,1,.36,1)";
    });
  }

  /* ---------- Stacked scroll cards ---------- */
  const stack = $("[data-stack]");
  if (stack && !reduced) {
    const cards = $$(".stack-card", stack);
    let active = false;
    let sraf = 0;
    const update = () => {
      sraf = 0;
      if (!desktop.matches) { cards.forEach((c) => { c.style.transform = ""; c.style.filter = ""; }); return; }
      cards.forEach((card, i) => {
        const next = cards[i + 1];
        if (!next) { card.style.transform = ""; return; }
        const top = parseFloat(getComputedStyle(card).top);
        const r = next.getBoundingClientRect();
        const h = card.offsetHeight;
        // 0 when next card is a full card-height away, 1 when it has fully covered this one
        const p = Math.min(1, Math.max(0, 1 - (r.top - top) / h));
        const depth = cards.length - 1 - i;
        card.style.transform = `scale(${1 - p * 0.04 * Math.min(depth, 2)})`;
        card.style.filter = p > 0.02 ? `brightness(${1 - p * 0.04})` : "";
      });
    };
    new IntersectionObserver(([en]) => { active = en.isIntersecting; }).observe(stack);
    addEventListener("scroll", () => { if (active && !sraf) sraf = requestAnimationFrame(update); }, { passive: true });
    addEventListener("resize", update);
  }

  /* ---------- Tabs ---------- */
  $$("[data-tabs]").forEach((root) => {
    const tabs = $$('[role="tab"]', root);
    const select = (tab, focus) => {
      tabs.forEach((t) => {
        const on = t === tab;
        t.setAttribute("aria-selected", String(on));
        t.tabIndex = on ? 0 : -1;
        const p = document.getElementById(t.getAttribute("aria-controls"));
        if (p) { p.classList.toggle("is-active", on); p.hidden = false; p.setAttribute("aria-hidden", String(!on)); p.inert = !on; }
      });
      if (focus) tab.focus();
    };
    tabs.forEach((t, i) => {
      t.addEventListener("click", () => select(t));
      t.addEventListener("keydown", (e) => {
        const k = e.key;
        let n = null;
        if (k === "ArrowDown" || k === "ArrowRight") n = tabs[(i + 1) % tabs.length];
        if (k === "ArrowUp" || k === "ArrowLeft") n = tabs[(i - 1 + tabs.length) % tabs.length];
        if (k === "Home") n = tabs[0];
        if (k === "End") n = tabs[tabs.length - 1];
        if (n) { e.preventDefault(); select(n, true); }
      });
    });
    const fromHash = () => {
      const id = location.hash.slice(1);
      const t = tabs.find((x) => x.dataset.hash === id);
      if (t) { select(t); root.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" }); }
    };
    $$("[data-tab-link]").forEach((a) => a.addEventListener("click", (e) => {
      const t = tabs.find((x) => x.dataset.hash === a.dataset.tabLink);
      if (!t) return;
      e.preventDefault(); history.replaceState(null, "", "#" + t.dataset.hash);
      select(t); root.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
    }));
    select(tabs.find((t) => t.getAttribute("aria-selected") === "true") || tabs[0]);
    if (location.hash) setTimeout(fromHash, 60);
    addEventListener("hashchange", fromHash);
  });

  /* ---------- Carousels ---------- */
  $$("[data-carousel]").forEach((root) => {
    const track = $(".carousel__track", root);
    const prev = $("[data-prev]", root);
    const next = $("[data-next]", root);
    const dotsWrap = $(".carousel__dots", root);
    const visibleItems = () => [...track.children].filter((c) => !c.hidden);
    const pageW = () => track.clientWidth;
    let dots = [];
    const buildDots = () => {
      if (!dotsWrap) return;
      const pages = Math.max(1, Math.ceil((track.scrollWidth - 4) / pageW()));
      dotsWrap.innerHTML = "";
      dots = Array.from({ length: pages }, (_, i) => {
        const b = document.createElement("button");
        b.type = "button"; b.setAttribute("aria-label", `Go to slide ${i + 1}`);
        b.addEventListener("click", () => track.scrollTo({ left: i * pageW() }));
        dotsWrap.append(b); return b;
      });
      dotsWrap.hidden = pages < 2;
      sync();
    };
    const sync = () => {
      const max = track.scrollWidth - track.clientWidth;
      const x = track.scrollLeft;
      if (prev) prev.disabled = x <= 4;
      if (next) next.disabled = x >= max - 4;
      const idx = Math.round(x / pageW());
      dots.forEach((d, i) => d.setAttribute("aria-current", String(i === Math.min(idx, dots.length - 1))));
    };
    const step = () => {
      const it = visibleItems()[0];
      return it ? it.getBoundingClientRect().width + parseFloat(getComputedStyle(track).columnGap || 24) : pageW();
    };
    prev?.addEventListener("click", () => track.scrollBy({ left: -step() }));
    next?.addEventListener("click", () => track.scrollBy({ left: step() }));
    let sr = 0;
    track.addEventListener("scroll", () => { if (!sr) sr = requestAnimationFrame(() => { sr = 0; sync(); }); }, { passive: true });
    addEventListener("resize", buildDots);
    root.addEventListener("carousel:refresh", () => { track.scrollTo({ left: 0 }); requestAnimationFrame(buildDots); });
    buildDots();
  });

  /* ---------- Marquee: duplicate content for a seamless loop ---------- */
  $$(".marquee").forEach((m) => {
    const track = $(".marquee__track", m);
    if (!track) return;
    const clone = track.cloneNode(true);
    clone.setAttribute("aria-hidden", "true");
    $$("a, button", clone).forEach((el) => (el.tabIndex = -1));
    m.append(clone);
  });

  /* ---------- Accordions ---------- */
  $$("[data-acc]").forEach((acc) => {
    $$(".acc__btn", acc).forEach((btn) => {
      btn.addEventListener("click", () => {
        const item = btn.closest(".acc__item");
        const open = !item.classList.contains("is-open");
        $$(".acc__item.is-open", acc).forEach((o) => { if (o !== item) { o.classList.remove("is-open"); $(".acc__btn", o).setAttribute("aria-expanded", "false"); } });
        item.classList.toggle("is-open", open);
        btn.setAttribute("aria-expanded", String(open));
      });
    });
  });

  // FAQ category filter
  $$("[data-faq]").forEach((root) => {
    const cats = $$("[data-faq-cat]", root);
    const items = $$(".acc__item", root);
    cats.forEach((c) => c.addEventListener("click", () => {
      cats.forEach((x) => x.setAttribute("aria-selected", String(x === c)));
      const v = c.dataset.faqCat;
      items.forEach((it) => { it.hidden = v !== "all" && !it.dataset.cat.split(" ").includes(v); });
    }));
  });

  /* ---------- Event status from date (keeps cards honest without a rebuild) ---------- */
  const now = Date.now();
  $$("[data-date]").forEach((card) => {
    const past = new Date(card.dataset.end || card.dataset.date).getTime() + 3 * 3600e3 < now;
    if (!past) return;
    card.classList.add("is-past");
    if (card.dataset.cat !== undefined && !card.dataset.cat.includes("past")) card.dataset.cat += " past";
    const b = $("[data-status]", card);
    if (b) { b.textContent = "Completed"; b.classList.add("badge--past"); b.classList.remove("badge--dot"); }
    const fb = $("[data-featured-status]", card);
    if (fb) fb.textContent = fb.dataset.pastLabel || "Recent Workshop";
  });

  /* ---------- Filters (events) ---------- */
  $$("[data-filter-group]").forEach((group) => {
    const target = document.getElementById(group.dataset.filterGroup);
    if (!target) return;
    const btns = $$("button[data-filter]", group);
    const empty = $(`[data-empty-for="${target.id}"]`);
    btns.forEach((b) => b.addEventListener("click", () => {
      btns.forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
      const f = b.dataset.filter;
      let shown = 0;
      $$("[data-cat]", target).forEach((card) => {
        const ok = f === "all" || card.dataset.cat.split(" ").includes(f);
        card.hidden = !ok;
        if (ok) { shown++; card.classList.remove("is-filtering"); void card.offsetWidth; card.classList.add("is-filtering"); }
      });
      empty?.classList.toggle("is-shown", shown === 0);
      target.closest("[data-carousel]")?.dispatchEvent(new Event("carousel:refresh"));
    }));
  });

  /* ---------- Expandable list ("Explore all") ---------- */
  $$("[data-expand]").forEach((btn) => {
    const list = document.getElementById(btn.getAttribute("aria-controls"));
    if (!list) return;
    const label = $("[data-label]", btn);
    btn.addEventListener("click", () => {
      const open = btn.getAttribute("aria-expanded") !== "true";
      btn.setAttribute("aria-expanded", String(open));
      $$("[data-extra]", list).forEach((el, i) => {
        el.hidden = !open;
        if (open) { el.style.setProperty("--d", `${i * 60}ms`); el.classList.remove("is-in"); requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add("is-in"))); }
      });
      if (label) label.textContent = open ? btn.dataset.less : btn.dataset.more;
    });
  });

  /* ---------- Enquiry dialog (mailto fallback — wire to CRM when ready) ---------- */
  const dlg = $("#enquire");
  if (dlg) {
    const form = $("form", dlg);
    const subj = $("[name=subject]", dlg);
    const title = $("[data-dialog-title]", dlg);
    const open = (topic) => {
      subj.value = topic || "General enquiry";
      title.textContent = topic && topic !== "Talk to us" ? topic : "Talk to our team";
      if (typeof dlg.showModal === "function") dlg.showModal(); else dlg.setAttribute("open", "");
      setTimeout(() => $("input:not([type=hidden])", dlg)?.focus(), 60);
    };
    document.addEventListener("click", (e) => {
      const t = e.target.closest("[data-enquire]");
      if (!t) return;
      e.preventDefault();
      open(t.dataset.enquire);
    });
    $$("[data-close]", dlg).forEach((b) => b.addEventListener("click", () => dlg.close()));
    dlg.addEventListener("click", (e) => { if (e.target === dlg) dlg.close(); });
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const d = new FormData(form);
      const body = [`Name: ${d.get("name")}`, `Phone: ${d.get("phone")}`, `Email: ${d.get("email") || "-"}`, "", d.get("message") || ""].join("\n");
      location.href = `mailto:${form.dataset.to}?subject=${encodeURIComponent("[Website] " + d.get("subject"))}&body=${encodeURIComponent(body)}`;
      dlg.close();
    });
  }

  /* ---------- Add to calendar (.ics) ---------- */
  $$("[data-ics]").forEach((b) => b.addEventListener("click", () => {
    const { icsTitle, icsStart, icsEnd, icsDesc } = b.dataset;
    const stamp = (d) => new Date(d).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
    const ymd = (d) => `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
    let when;
    if ("icsAllday" in b.dataset) {
      // next Saturday (today if it is Saturday)
      const d = new Date(); d.setDate(d.getDate() + ((6 - d.getDay() + 7) % 7));
      const e = new Date(d); e.setDate(d.getDate() + 1);
      when = [`DTSTART;VALUE=DATE:${ymd(d)}`, `DTEND;VALUE=DATE:${ymd(e)}`];
      if ("icsWeekly" in b.dataset) when.push("RRULE:FREQ=WEEKLY;BYDAY=SA");
    } else {
      when = [`DTSTART:${stamp(icsStart)}`, `DTEND:${stamp(icsEnd)}`, "LOCATION:Online"];
    }
    const ics = [
      "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Nunnari Academy//Events//EN", "BEGIN:VEVENT",
      `UID:${Date.now()}-${icsTitle.length}@nunnari.academy`, `DTSTAMP:${stamp(Date.now())}`,
      ...when, `SUMMARY:${icsTitle}`, `DESCRIPTION:${(icsDesc || "").replace(/\n/g, "\\n")}`,
      "END:VEVENT", "END:VCALENDAR",
    ].join("\r\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));
    a.download = icsTitle.replace(/[^\w]+/g, "-").replace(/^-|-$/g, "").toLowerCase() + ".ics";
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    const lbl = $("[data-label]", b);
    if (lbl) { const o = lbl.textContent; lbl.textContent = "Added ✓"; setTimeout(() => (lbl.textContent = o), 2200); }
  }));

  /* ---------- Jump pills → apply event filter ---------- */
  $$("[data-jump]").forEach((a) => a.addEventListener("click", () => {
    $$("[data-jump]").forEach((x) => x.classList.toggle("is-active", x === a));
    $(`[data-filter-group] button[data-filter="${a.dataset.jump}"]`)?.click();
  }));

  /* ---------- Stack rail links: smooth scroll to card ---------- */
  $$(".stack-card__rail a").forEach((a) => a.addEventListener("click", (e) => {
    const t = document.querySelector(a.getAttribute("href"));
    if (!t) return;
    e.preventDefault();
    const top = t.getBoundingClientRect().top + scrollY - parseFloat(getComputedStyle(t).top || 0);
    scrollTo({ top, behavior: reduced ? "auto" : "smooth" });
  }));

  /* ---------- Misc ---------- */
  $$("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));
  $$("[data-to-top]").forEach((b) => b.addEventListener("click", () => scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" })));
})();
