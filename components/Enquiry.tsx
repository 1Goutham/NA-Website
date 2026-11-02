"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import Icon from "@/components/Icon";
import { site } from "@/lib/site";

type Ctx = { open: (topic?: string) => void };
const EnquiryContext = createContext<Ctx>({ open: () => {} });
export const useEnquiry = () => useContext(EnquiryContext);

/**
 * One enquiry dialog for the whole site. Any element with data-enquire="Topic"
 * opens it (event delegation keeps server components free of client code).
 * Submission currently opens a pre-filled email; swap `submit` for a CRM / API call.
 */
export default function EnquiryProvider({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [topic, setTopic] = useState("General enquiry");
  const [sent, setSent] = useState(false);

  const open = useCallback((t?: string) => {
    setTopic(t || "General enquiry");
    setSent(false);
    ref.current?.showModal();
    window.__lenis?.stop();
    setTimeout(() => ref.current?.querySelector<HTMLInputElement>("input[name=name]")?.focus(), 60);
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const t = (e.target as Element)?.closest?.<HTMLElement>("[data-enquire]");
      if (!t) return;
      e.preventDefault();
      open(t.dataset.enquire);
    };
    document.addEventListener("click", onClick);
    const d = ref.current;
    const onClose = () => window.__lenis?.start();
    d?.addEventListener("close", onClose);
    return () => { document.removeEventListener("click", onClick); d?.removeEventListener("close", onClose); };
  }, [open]);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const body = [`Name: ${f.get("name")}`, `Phone: ${f.get("phone")}`, `Email: ${f.get("email") || "-"}`, "", String(f.get("message") || "")].join("\n");
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent("[Website] " + topic)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const title = topic && topic !== "Talk to us" && topic !== "General enquiry" ? topic : "Talk to our team";

  return (
    <EnquiryContext.Provider value={{ open }}>
      {children}
      <dialog ref={ref} className="modal" aria-labelledby="enquire-title" onClick={(e) => { if (e.target === ref.current) ref.current?.close(); }}>
        <form className="modal__inner" onSubmit={submit}>
          <div className="modal__head">
            <div>
              <span className="eyebrow eyebrow--violet">Nunnari Academy</span>
              <h2 className="h4" id="enquire-title" style={{ fontSize: "1.5rem", marginTop: 8 }}>{title}</h2>
            </div>
            <button className="modal__close" type="button" aria-label="Close" onClick={() => ref.current?.close()}><Icon name="close" /></button>
          </div>
          {sent ? (
            <div className="modal__sent">
              <span className="icon-chip icon-chip--lg"><Icon name="check" /></span>
              <p><b>Your email app should open with your request.</b><br />Send it and our team will connect with you within 24 – 48 hrs.</p>
              <button className="btn btn--ghost" type="button" onClick={() => ref.current?.close()}>Done</button>
            </div>
          ) : (
            <>
              <div className="field"><label htmlFor="f-name">Name</label><input id="f-name" name="name" autoComplete="name" required /></div>
              <div className="field"><label htmlFor="f-phone">Phone</label><input id="f-phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" required /></div>
              <div className="field"><label htmlFor="f-email">Email <span className="muted">(optional)</span></label><input id="f-email" name="email" type="email" autoComplete="email" /></div>
              <div className="field"><label htmlFor="f-msg">Message <span className="muted">(optional)</span></label><textarea id="f-msg" name="message" /></div>
              <button className="btn btn--primary btn--lg btn--block" type="submit">Send request <Icon name="arrow" className="i--arrow" /></button>
              <p className="modal__note"><Icon name="clock" /> Our team will connect you within 24 – 48 hrs.</p>
            </>
          )}
        </form>
      </dialog>
    </EnquiryContext.Provider>
  );
}
