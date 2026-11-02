/* Nunnari Academy — scene engine: pointer parallax, hero constellation, dotted globe. */
(() => {
  "use strict";
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
  const DPR = Math.min(2, window.devicePixelRatio || 1);

  /* run a frame loop only while the element is on screen */
  const whenVisible = (el, start, stop) => {
    new IntersectionObserver(([en]) => (en.isIntersecting ? start() : stop()), { rootMargin: "80px" }).observe(el);
    document.addEventListener("visibilitychange", () => (document.hidden ? stop() : el.getBoundingClientRect().bottom > 0 && start()));
  };

  /* ---------- Pointer parallax for .gs scenes ---------- */
  if (fine && !reduced) {
    document.querySelectorAll("[data-scene]").forEach((sc) => {
      let raf = 0, tx = 0, ty = 0;
      const host = sc.closest("section") || sc;
      host.addEventListener("pointermove", (e) => {
        const r = sc.getBoundingClientRect();
        tx = Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width - 0.5) * 2));
        ty = Math.max(-1, Math.min(1, ((e.clientY - r.top) / r.height - 0.5) * 2));
        if (!raf) raf = requestAnimationFrame(() => { raf = 0; sc.style.setProperty("--mx", tx.toFixed(3)); sc.style.setProperty("--my", ty.toFixed(3)); });
      }, { passive: true });
      host.addEventListener("pointerleave", () => { sc.style.setProperty("--mx", 0); sc.style.setProperty("--my", 0); });
    });
  }

  /* ---------- Hero constellation (built from the Nunnari mark) ---------- */
  const hero = document.querySelector("[data-constellation]");
  if (hero) {
    const cv = document.createElement("canvas");
    cv.className = "hero__canvas"; cv.setAttribute("aria-hidden", "true");
    cv.style.cssText = "position:absolute;inset:0;width:100%;height:100%;pointer-events:none";
    hero.prepend(cv);
    const ctx = cv.getContext("2d");
    let W = 0, H = 0, pts = [], mark = [], zig = [], raf = 0, t = 0;
    const mouse = { x: -9999, y: -9999 };

    const build = () => {
      const r = hero.getBoundingClientRect();
      W = r.width; H = r.height;
      cv.width = W * DPR; cv.height = H * DPR; ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      // logo diamond: a 5x5 grid rotated 45°, placed at both sides of the headline
      mark = []; zig = [];
      const s = Math.min(46, W / 26);
      const centres = W > 900 ? [[W * 0.085, H * 0.44], [W * 0.915, H * 0.4]] : [[W * 0.5, H * 0.13]];
      const bigs = ["1,4", "1,3", "1,2", "2,2", "3,2", "3,1", "3,0"]; // the mark's zigzag nodes on its 5x5 grid
      centres.forEach(([cx, cy]) => {
        const scale = W > 900 ? 1 : 0.62;
        const z = new Array(7);
        for (let i = 0; i < 5; i++) for (let j = 0; j < 5; j++) {
          const gx = (i - 2) * s * scale, gy = (j - 2) * s * scale;
          const x = cx + (gx - gy) * 0.7071, y = cy + (gx + gy) * 0.7071;
          const k = bigs.indexOf(i + "," + j);
          const p = { hx: x, hy: y, x: x + (Math.random() - 0.5) * 300, y: y + (Math.random() - 0.5) * 300, vx: 0, vy: 0, r: k >= 0 ? 3.6 : 1.8, big: k >= 0 };
          mark.push(p); if (k >= 0) z[k] = p;
        }
        zig.push(z);
      });
      // ambient particles
      const n = Math.round(Math.min(70, (W * H) / 16000));
      pts = Array.from({ length: n }, () => ({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25, r: Math.random() * 1.4 + 0.6 }));
    };

    const draw = () => {
      t += 0.012;
      ctx.clearRect(0, 0, W, H);
      const all = pts.concat(mark);
      // move
      for (const p of pts) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
      }
      for (const p of mark) {
        const wob = Math.sin(t + p.hx * 0.02) * 2.4;
        let fx = (p.hx - p.x) * 0.04, fy = (p.hy + wob - p.y) * 0.04;
        const dx = p.x - mouse.x, dy = p.y - mouse.y, d2 = dx * dx + dy * dy;
        if (d2 < 14000) { const f = (14000 - d2) / 14000; fx += dx * f * 0.08; fy += dy * f * 0.08; }
        p.vx = (p.vx + fx) * 0.82; p.vy = (p.vy + fy) * 0.82; p.x += p.vx; p.y += p.vy;
      }
      // links
      ctx.lineWidth = 1;
      for (let i = 0; i < all.length; i++) {
        const a = all[i];
        for (let j = i + 1; j < all.length; j++) {
          const b = all[j], dx = a.x - b.x, dy = a.y - b.y, d = dx * dx + dy * dy;
          if (d < 9000) {
            ctx.strokeStyle = `rgba(139,108,255,${(1 - d / 9000) * 0.22})`;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
        const mx = a.x - mouse.x, my = a.y - mouse.y, md = mx * mx + my * my;
        if (md < 26000) {
          ctx.strokeStyle = `rgba(108,59,255,${(1 - md / 26000) * 0.45})`;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
        }
      }
      // zigzag
      zig.forEach((z) => {
        ctx.lineWidth = 2.2; ctx.strokeStyle = "rgba(108,59,255,.55)";
        ctx.beginPath(); [0, 2, 4, 6].forEach((k, i) => (i ? ctx.lineTo(z[k].x, z[k].y) : ctx.moveTo(z[k].x, z[k].y))); ctx.stroke();
      });
      // dots
      for (const p of all) {
        ctx.fillStyle = p.big ? "rgba(108,59,255,.9)" : p.hx !== undefined ? "rgba(108,59,255,.5)" : "rgba(139,108,255,.45)";
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.283); ctx.fill();
        if (p.big) { ctx.fillStyle = "rgba(139,108,255,.15)"; ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 3 + Math.sin(t * 2 + p.hx) * 1.5, 0, 6.283); ctx.fill(); }
      }
      raf = requestAnimationFrame(draw);
    };
    build();
    let lastW = 0, lastH = 0;
    new ResizeObserver(() => {
      const r = hero.getBoundingClientRect();
      if (Math.abs(r.width - lastW) < 2 && Math.abs(r.height - lastH) < 2) return;
      lastW = r.width; lastH = r.height; build();
      if (reduced) draw1();
    }).observe(hero);
    hero.addEventListener("pointermove", (e) => { const r = hero.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; }, { passive: true });
    hero.addEventListener("pointerleave", () => { mouse.x = mouse.y = -9999; });
    const draw1 = () => { draw(); cancelAnimationFrame(raf); };
    if (reduced) draw1();
    else whenVisible(hero, () => { if (!raf) raf = requestAnimationFrame(draw); }, () => { cancelAnimationFrame(raf); raf = 0; });
  }

  /* ---------- Dotted globe with travelling arcs ---------- */
  document.querySelectorAll("[data-globe]").forEach((host) => {
    const cv = document.createElement("canvas");
    cv.className = "globe-canvas"; cv.setAttribute("aria-hidden", "true");
    cv.style.cssText = "position:absolute;inset:0;width:100%;height:100%";
    host.prepend(cv);
    const ctx = cv.getContext("2d");
    const N = 1100, pts = [];
    for (let i = 0; i < N; i++) { // fibonacci sphere
      const y = 1 - (i / (N - 1)) * 2, rad = Math.sqrt(1 - y * y), th = i * 2.39996;
      pts.push([Math.cos(th) * rad, y, Math.sin(th) * rad]);
    }
    const ll = (lat, lon) => { const a = (lat * Math.PI) / 180, b = (-lon * Math.PI) / 180; return [Math.cos(a) * Math.cos(b), Math.sin(a), Math.cos(a) * Math.sin(b)]; };
    const home = ll(11, 77); // Coimbatore
    const dests = [ll(-33.9, 151.2), ll(51.5, -0.1), ll(37.8, -122.4), ll(1.35, 103.8), ll(25.2, 55.3), ll(35.7, 139.7), ll(52.5, 13.4)];
    const slerp = (a, b, t) => {
      const d = Math.acos(Math.max(-1, Math.min(1, a[0] * b[0] + a[1] * b[1] + a[2] * b[2])));
      const s = Math.sin(d) || 1, k1 = Math.sin((1 - t) * d) / s, k2 = Math.sin(t * d) / s;
      const lift = 1 + Math.sin(t * Math.PI) * 0.18 * d;
      return [(a[0] * k1 + b[0] * k2) * lift, (a[1] * k1 + b[1] * k2) * lift, (a[2] * k1 + b[2] * k2) * lift];
    };
    let W, H, R, cx, cy, rot = -1.6, raf = 0, t0 = performance.now();
    const tilt = 0.32, ct = Math.cos(tilt), st = Math.sin(tilt);
    const size = () => { const r = host.getBoundingClientRect(); W = r.width; H = r.height; cv.width = W * DPR; cv.height = H * DPR; ctx.setTransform(DPR, 0, 0, DPR, 0, 0); R = Math.min(W, H) * 0.36; cx = W / 2; cy = H / 2; };
    const proj = ([x, y, z]) => {
      const cr = Math.cos(rot), sr = Math.sin(rot);
      const x1 = x * cr - z * sr, z1 = x * sr + z * cr;
      const y2 = y * ct - z1 * st, z2 = y * st + z1 * ct;
      return [cx + x1 * R, cy - y2 * R, z2];
    };
    const frame = (now) => {
      const el = (now - t0) / 1000;
      rot += 0.0026;
      ctx.clearRect(0, 0, W, H);
      // halo
      const g = ctx.createRadialGradient(cx, cy, R * 0.6, cx, cy, R * 1.35);
      g.addColorStop(0, "rgba(139,108,255,.20)"); g.addColorStop(1, "rgba(139,108,255,0)");
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, R * 1.35, 0, 6.283); ctx.fill();
      // body
      const b = ctx.createRadialGradient(cx - R * 0.35, cy - R * 0.4, R * 0.1, cx, cy, R);
      b.addColorStop(0, "rgba(255,255,255,.95)"); b.addColorStop(0.55, "rgba(237,231,255,.75)"); b.addColorStop(1, "rgba(196,181,253,.55)");
      ctx.fillStyle = b; ctx.beginPath(); ctx.arc(cx, cy, R, 0, 6.283); ctx.fill();
      // dots
      for (const p of pts) {
        const [x, y, z] = proj(p);
        if (z < -0.15) continue;
        const a = z < 0 ? 0.08 : 0.25 + z * 0.65;
        ctx.fillStyle = `rgba(108,59,255,${a})`;
        ctx.fillRect(x - 0.9, y - 0.9, 1.8 + z * 0.6, 1.8 + z * 0.6);
      }
      // arcs
      dests.forEach((d, i) => {
        const ph = ((el * 0.35 + i / dests.length) % 1);
        const head = Math.min(1, ph * 1.6), tail = Math.max(0, ph * 1.6 - 0.45);
        ctx.lineWidth = 2; ctx.lineCap = "round";
        let prev = null;
        for (let k = 0; k <= 24; k++) {
          const tt = tail + (head - tail) * (k / 24);
          const q = proj(slerp(home, d, tt));
          if (prev && q[2] > 0 && prev[2] > 0) {
            ctx.strokeStyle = `rgba(108,59,255,${(k / 24) * 0.9})`;
            ctx.beginPath(); ctx.moveTo(prev[0], prev[1]); ctx.lineTo(q[0], q[1]); ctx.stroke();
          }
          prev = q;
        }
        const e = proj(d);
        if (e[2] > 0 && head >= 1) { ctx.fillStyle = "rgba(108,59,255,.9)"; ctx.beginPath(); ctx.arc(e[0], e[1], 3, 0, 6.283); ctx.fill(); }
      });
      // home beacon
      const h = proj(home);
      if (h[2] > 0) {
        const pr = (el % 1.6) / 1.6;
        ctx.strokeStyle = `rgba(108,59,255,${1 - pr})`; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.arc(h[0], h[1], 4 + pr * 16, 0, 6.283); ctx.stroke();
        ctx.fillStyle = "#6c3bff"; ctx.beginPath(); ctx.arc(h[0], h[1], 4.5, 0, 6.283); ctx.fill();
      }
      // rim light
      ctx.strokeStyle = "rgba(255,255,255,.9)"; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.arc(cx, cy, R, 3.6, 5.4); ctx.stroke();
      if (!reduced) raf = requestAnimationFrame(frame);
    };
    size(); new ResizeObserver(size).observe(host);
    if (reduced) frame(performance.now());
    else whenVisible(host, () => { if (!raf) raf = requestAnimationFrame(frame); }, () => { cancelAnimationFrame(raf); raf = 0; });
  });
})();
