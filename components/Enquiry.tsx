"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import Icon from "@/components/Icon";
import { site } from "@/lib/site";
import { validate, type Errors } from "@/lib/validate";

type Ctx = { open: (topic?: string) => void };
const EnquiryContext = createContext<Ctx>({ open: () => {} });
export const useEnquiry = () => useContext(EnquiryContext);

type Status = "idle" | "sending" | "done" | "error";
const EMPTY = { name: "", email: "", phone: "", message: "" };

/**
 * Site-wide contact form (doc 1.2): Name, Email, Phone (required) and an optional message,
 * validated with regex, submitted with "Schedule A Call". After a successful submission it shows
 * "Our Experts will reach you within 24-48 hours" and then returns to its original state.
 * Any element with data-enquire="Topic" opens it (Talk to us, Enroll Now, Become a Partner, Register…).
 */
export default function EnquiryProvider({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null);
  const pathname = usePathname();
  const [topic, setTopic] = useState("General enquiry");
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<Status>("idle");
  const resetT = useRef<ReturnType<typeof setTimeout>>(undefined);

  const reset = useCallback(() => {
    setValues(EMPTY); setErrors({}); setTouched({}); setStatus("idle");
  }, []);

  const open = useCallback((t?: string) => {
    clearTimeout(resetT.current);
    reset();
    setTopic(t || "General enquiry");
    ref.current?.showModal();
    window.__lenis?.stop();
    setTimeout(() => ref.current?.querySelector<HTMLInputElement>("input[name=name]")?.focus(), 60);
  }, [reset]);

  const close = useCallback(() => ref.current?.close(), []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const t = (e.target as Element)?.closest?.<HTMLElement>("[data-enquire]");
      if (!t || (t as HTMLButtonElement).disabled) return;
      e.preventDefault();
      open(t.dataset.enquire);
    };
    document.addEventListener("click", onClick);
    const d = ref.current;
    const onClose = () => { window.__lenis?.start(); clearTimeout(resetT.current); setTimeout(reset, 300); };
    d?.addEventListener("close", onClose);
    return () => { document.removeEventListener("click", onClick); d?.removeEventListener("close", onClose); };
  }, [open, reset]);

  const set = (k: keyof typeof EMPTY) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const next = { ...values, [k]: e.target.value };
    setValues(next);
    if (touched[k]) setErrors(validate(next));
  };
  const blur = (k: keyof typeof EMPTY) => () => { setTouched((t) => ({ ...t, [k]: true })); setErrors(validate(values)); };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errs = validate(values);
    setErrors(errs);
    setTouched({ name: true, email: true, phone: true, message: true });
    if (Object.keys(errs).length) {
      ref.current?.querySelector<HTMLInputElement>(`[name=${Object.keys(errs)[0]}]`)?.focus();
      return;
    }
    setStatus("sending");
    const website = (e.currentTarget.elements.namedItem("website") as HTMLInputElement | null)?.value;
    try {
      const r = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...values, topic, page: pathname, website }),
      });
      const data = await r.json().catch(() => ({}));
      if (!r.ok || !data.ok) {
        if (data.errors) { setErrors(data.errors); setStatus("idle"); return; }
        throw new Error("failed");
      }
      setStatus("done");
      // show the confirmation, then return the form to its original state
      resetT.current = setTimeout(() => { close(); }, 4000);
    } catch {
      setStatus("error");
    }
  };

  const title = topic && !["Talk to us", "General enquiry"].includes(topic) ? topic : "Talk to our team";
  const err = (k: keyof Errors) => (touched[k] && errors[k] ? errors[k] : undefined);

  return (
    <EnquiryContext.Provider value={{ open }}>
      {children}
      <dialog ref={ref} className="modal" aria-labelledby="enquire-title" onClick={(e) => { if (e.target === ref.current) close(); }}>
        <form className="modal__inner" onSubmit={submit} noValidate>
          <div className="modal__head">
            <div>
              <span className="eyebrow eyebrow--violet">Nunnari Academy</span>
              <h2 className="h4" id="enquire-title" style={{ fontSize: "1.5rem", marginTop: 8 }}>{title}</h2>
            </div>
            <button className="modal__close" type="button" aria-label="Close" onClick={close}><Icon name="close" /></button>
          </div>

          {status === "done" ? (
            <div className="modal__sent" role="status" aria-live="polite">
              <span className="modal__tick"><Icon name="check" /></span>
              <p className="modal__sent-title">Thank you, {values.name.split(" ")[0] || "there"}!</p>
              <p>Our Experts will reach you within 24-48 hours.</p>
            </div>
          ) : (
            <>
              <div className={`field${err("name") ? " field--error" : ""}`}>
                <label htmlFor="f-name">Name <span aria-hidden="true">*</span></label>
                <input id="f-name" name="name" autoComplete="name" required value={values.name} onChange={set("name")} onBlur={blur("name")}
                  aria-invalid={!!err("name")} aria-describedby={err("name") ? "e-name" : undefined} />
                {err("name") && <small className="field__error" id="e-name">{err("name")}</small>}
              </div>
              <div className={`field${err("email") ? " field--error" : ""}`}>
                <label htmlFor="f-email">Email <span aria-hidden="true">*</span></label>
                <input id="f-email" name="email" type="email" autoComplete="email" inputMode="email" required value={values.email} onChange={set("email")} onBlur={blur("email")}
                  aria-invalid={!!err("email")} aria-describedby={err("email") ? "e-email" : undefined} />
                {err("email") && <small className="field__error" id="e-email">{err("email")}</small>}
              </div>
              <div className={`field${err("phone") ? " field--error" : ""}`}>
                <label htmlFor="f-phone">Phone Number <span aria-hidden="true">*</span></label>
                <input id="f-phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" required placeholder="e.g. 90033 13175" value={values.phone} onChange={set("phone")} onBlur={blur("phone")}
                  aria-invalid={!!err("phone")} aria-describedby={err("phone") ? "e-phone" : undefined} />
                {err("phone") && <small className="field__error" id="e-phone">{err("phone")}</small>}
              </div>
              <div className={`field${err("message") ? " field--error" : ""}`}>
                <label htmlFor="f-msg">A short message to us <span className="muted">(optional)</span></label>
                <textarea id="f-msg" name="message" value={values.message} onChange={set("message")} onBlur={blur("message")} maxLength={1000} />
                {err("message") && <small className="field__error">{err("message")}</small>}
              </div>
              {/* honeypot */}
              <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hp" aria-hidden="true" />

              {status === "error" && (
                <p className="field__error" role="alert">
                  Something went wrong. Please try again, or call us on <a href={site.phone.href}>{site.phone.label}</a>.
                </p>
              )}
              <button className="btn btn--primary btn--lg btn--block" type="submit" disabled={status === "sending"}>
                {status === "sending" ? "Scheduling…" : "Schedule A Call"} <Icon name="arrow" className="i--arrow" />
              </button>
              <p className="modal__note"><Icon name="clock" /> Our Experts will reach you within 24-48 hours.</p>
            </>
          )}
        </form>
      </dialog>
    </EnquiryContext.Provider>
  );
}
