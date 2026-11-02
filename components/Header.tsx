"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Icon from "@/components/Icon";
import Mark from "@/components/Mark";
import { nav } from "@/lib/site";
import clsx from "@/lib/clsx";

const sectionOf = (path: string) =>
  path.startsWith("/programs") ? "programs" : path.startsWith("/partner") ? "partner" : path.startsWith("/explore") ? "explore" : "";

export default function Header() {
  const pathname = usePathname();
  const [openKey, setOpenKey] = useState<string | null>(null);
  const [drawer, setDrawer] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const progress = useRef<HTMLElement>(null);
  const closeT = useRef<ReturnType<typeof setTimeout>>(undefined);
  const active = sectionOf(pathname);

  // close menus on navigation
  useEffect(() => { setOpenKey(null); setDrawer(false); }, [pathname]);

  // scrolled / hide-on-scroll / progress — state changes only when a value flips,
  // and the page height is cached (no layout read per frame)
  useEffect(() => {
    let last = scrollY, ticking = false, max = 1, sc = false, hd = false;
    const measure = () => { max = Math.max(1, document.documentElement.scrollHeight - innerHeight); };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(document.body);
    const update = () => {
      ticking = false;
      const y = scrollY, dy = y - last;
      const nextSc = y > 8;
      if (nextSc !== sc) { sc = nextSc; setScrolled(sc); }
      if (Math.abs(dy) > 6) {
        const nextHd = dy > 0 && y > 240;
        if (nextHd !== hd) { hd = nextHd; setHidden(hd); }
        last = y;
      }
      progress.current?.style.setProperty("--p", Math.min(1, y / max).toFixed(4));
    };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
    addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => { removeEventListener("scroll", onScroll); ro.disconnect(); };
  }, []);

  // escape + outside click
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { setOpenKey(null); setDrawer(false); } };
    const onDoc = (e: MouseEvent) => { if (!(e.target as Element).closest(".nav__item")) setOpenKey(null); };
    addEventListener("keydown", onKey);
    document.addEventListener("click", onDoc);
    return () => { removeEventListener("keydown", onKey); document.removeEventListener("click", onDoc); };
  }, []);

  // lock scroll behind the mobile drawer
  useEffect(() => {
    document.documentElement.style.overflow = drawer ? "hidden" : "";
    if (drawer) window.__lenis?.stop(); else window.__lenis?.start();
  }, [drawer]);

  const isDesktop = () => matchMedia("(min-width: 1024px)").matches;
  const enter = (key: string) => (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !isDesktop()) return;
    clearTimeout(closeT.current); setOpenKey(key);
  };
  const leave = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !isDesktop()) return;
    closeT.current = setTimeout(() => setOpenKey(null), 140);
  };

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <div className="progress" aria-hidden="true"><i ref={progress} /></div>
      <header className={clsx("site-header", scrolled && "is-scrolled", hidden && !openKey && !drawer && "is-hidden", drawer && "nav-open")}>
        <div className="container header__inner">
          <Link className="brand" href="/" aria-label="Nunnari Academy — School of AI, home">
            <Mark />
            <span className="brand__text"><b>NUNNARI ACADEMY</b><small>SCHOOL OF AI</small></span>
          </Link>

          <nav className="nav" id="primary-nav" aria-label="Primary">
            <ul className="nav__list">
              {nav.map((item) =>
                item.items ? (
                  <li key={item.key} className={clsx("nav__item has-menu", openKey === item.key && "is-open")} onPointerEnter={enter(item.key)} onPointerLeave={leave}>
                    <button
                      className={clsx("nav__link", active === item.key && "is-current")}
                      type="button"
                      aria-expanded={openKey === item.key}
                      aria-controls={`m-${item.key}`}
                      onClick={() => setOpenKey((k) => (k === item.key ? null : item.key))}
                    >
                      {item.label} <Icon name="chevron" />
                    </button>
                    <div className="menu" id={`m-${item.key}`}>
                      <div>
                        {item.items.map((l) => (
                          <Link key={l.href} href={l.href} aria-current={pathname === l.href ? "page" : undefined} onClick={() => { setOpenKey(null); setDrawer(false); }}>
                            <span className="icon-chip"><Icon name={l.icon} /></span>
                            <span><b>{l.title}</b><span>{l.sub}</span></span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </li>
                ) : (
                  <li key={item.key} className="nav__item">
                    <Link className="nav__link" href={item.href!} onClick={() => setDrawer(false)}>{item.label}</Link>
                  </li>
                ),
              )}
            </ul>
            <div className="nav__mobile-cta">
              <button className="btn btn--primary btn--block btn--lg" type="button" data-enquire="Talk to us">Talk to us <Icon name="arrow" className="i--arrow" /></button>
            </div>
          </nav>

          <div className="header__cta">
            <button className="btn btn--primary" type="button" data-enquire="Talk to us" data-magnetic>Talk to us <Icon name="arrow" className="i--arrow" /></button>
            <button className="burger" type="button" aria-label="Menu" aria-expanded={drawer} aria-controls="primary-nav" onClick={() => setDrawer((d) => !d)}>
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
