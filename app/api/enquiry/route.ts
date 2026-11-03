import { NextResponse } from "next/server";
import { validate, normalisePhone, type Enquiry } from "@/lib/validate";

/**
 * Receives enquiry / "Schedule A Call" submissions.
 * Set ENQUIRY_WEBHOOK_URL (Vercel → Project → Settings → Environment Variables) to forward each
 * submission as JSON to your CRM, Google Sheet (Apps Script), Zapier/Make, Slack, etc.
 * Without it, submissions are written to the server log (Vercel → Logs) so nothing is lost silently.
 */
export async function POST(req: Request) {
  let body: Partial<Enquiry> & { website?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  // honeypot: real people never fill this hidden field
  if (body.website) return NextResponse.json({ ok: true });

  const errors = validate(body);
  if (Object.keys(errors).length) return NextResponse.json({ ok: false, errors }, { status: 422 });

  const enquiry = {
    name: String(body.name).trim(),
    email: String(body.email).trim(),
    phone: normalisePhone(String(body.phone)),
    message: String(body.message || "").trim(),
    topic: String(body.topic || "General enquiry").slice(0, 160),
    page: String(body.page || "").slice(0, 200),
    receivedAt: new Date().toISOString(),
  };

  const hook = process.env.ENQUIRY_WEBHOOK_URL;
  if (hook) {
    try {
      const r = await fetch(hook, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(enquiry) });
      if (!r.ok) throw new Error(`webhook ${r.status}`);
    } catch (err) {
      console.error("[enquiry] forward failed", err, enquiry);
      return NextResponse.json({ ok: false, error: "Could not submit right now" }, { status: 502 });
    }
  } else {
    console.log("[enquiry]", JSON.stringify(enquiry));
  }
  return NextResponse.json({ ok: true });
}
