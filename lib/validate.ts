/** Shared by the enquiry form (client) and /api/enquiry (server). */
export const EMAIL_RE = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
// Indian mobile (optional +91 / 91 / 0 prefix) or any international number in E.164 form
export const PHONE_IN_RE = /^(?:\+?91|0)?[6-9]\d{9}$/;
export const PHONE_INTL_RE = /^\+[1-9]\d{7,14}$/;

export type Enquiry = { name: string; email: string; phone: string; message?: string; topic?: string; page?: string };
export type Errors = Partial<Record<"name" | "email" | "phone" | "message", string>>;

export const normalisePhone = (p: string) => p.replace(/[\s()-]/g, "");

export function validate(e: Partial<Enquiry>): Errors {
  const errors: Errors = {};
  const name = (e.name || "").trim();
  const email = (e.email || "").trim();
  const phone = normalisePhone(e.phone || "");
  if (name.length < 2) errors.name = "Please enter your name.";
  else if (name.length > 80) errors.name = "Name is too long.";
  if (!email) errors.email = "Please enter your email.";
  else if (!EMAIL_RE.test(email)) errors.email = "Please enter a valid email address.";
  if (!phone) errors.phone = "Please enter your phone number.";
  else if (!PHONE_IN_RE.test(phone) && !PHONE_INTL_RE.test(phone)) errors.phone = "Please enter a valid phone number (e.g. 90033 13175 or +61 4xx xxx xxx).";
  if ((e.message || "").length > 1000) errors.message = "Please keep the message under 1000 characters.";
  return errors;
}
