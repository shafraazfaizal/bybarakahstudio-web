import "server-only";
import { Resend } from "resend";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL } from "./ramadan";

const LABEL: Record<string, string> = { nur: "NUR", kids: "My Ramadan Book", both: "NUR and My Ramadan Book" };

export async function sendWaitlistEmail({ to, name, interest }: { to: string; name: string; interest: string }) {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.WAITLIST_FROM_EMAIL; // e.g. "ByBarakahStudio <barakah@skayl.digital>"
  if (!key || !from) {
    console.warn("[waitlist] confirmation email skipped: RESEND_API_KEY or WAITLIST_FROM_EMAIL is not set");
    return;
  }

  const resend = new Resend(key);
  const books = LABEL[interest] ?? "our journals";
  const safeName = name.replace(/[<>&"]/g, "");

  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: process.env.WAITLIST_REPLY_TO || undefined,
    subject: "You're on the list, إن شاء الله",
    text: `Assalamu alaikum ${safeName},\n\nJazakAllahu khayran for joining the ByBarakahStudio waitlist for ${books}.\n\nWe'll email you about three weeks before Ramadan, when orders open, إن شاء الله. Nothing else, no spam.\n\nUntil then, follow along on Instagram: ${INSTAGRAM_HANDLE} (${INSTAGRAM_URL})\n\nWith duas,\nByBarakahStudio`,
    html: `<!doctype html><html><body style="margin:0;background:#0e1822;padding:40px 16px;font-family:Helvetica,Arial,sans-serif">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center">
<table role="presentation" width="100%" style="max-width:520px;background:#f4efe5;border-radius:24px 24px 8px 8px;padding:44px 36px;color:#0e1822">
<tr><td style="font-family:Georgia,serif;font-style:italic;font-size:15px;color:#7b5a1c;letter-spacing:.5px">by barakah studio</td></tr>
<tr><td style="padding-top:26px;font-size:34px;line-height:1;font-weight:900;letter-spacing:-1.5px">you're on the list.</td></tr>
<tr><td style="padding-top:22px;font-size:16px;line-height:1.6;color:#2f475a">Assalamu alaikum ${safeName},<br><br>
JazakAllahu khayran for joining the waitlist for <strong>${books}</strong>.<br><br>
We'll email you about three weeks before Ramadan, when orders open, إن شاء الله. Nothing else, no spam.</td></tr>
<tr><td style="padding-top:28px"><a href="${INSTAGRAM_URL}" style="display:inline-block;background:#0e1822;color:#efe2b8;text-decoration:none;border-radius:999px;padding:13px 24px;font-size:14px">Follow ${INSTAGRAM_HANDLE}</a></td></tr>
<tr><td style="padding-top:34px;font-family:Georgia,serif;font-style:italic;font-size:15px;color:#7b5a1c">With duas,<br>ByBarakahStudio</td></tr>
</table></td></tr></table></body></html>`,
  });
  if (error) throw new Error(`Resend rejected confirmation email: ${error.message}`);
}

const COUNTRY: Record<string, string> = { uk: "United Kingdom", sri_lanka: "Sri Lanka", elsewhere: "Elsewhere" };

/** Tells you (the owner) that someone joined. Sent to WAITLIST_NOTIFY_EMAIL. */
export async function sendOwnerNotification(s: { name: string; email: string; interest: string; country: string }) {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.WAITLIST_FROM_EMAIL;
  const notify = process.env.WAITLIST_NOTIFY_EMAIL; // e.g. bybarakahstudio@gmail.com
  if (!key || !from || !notify) {
    console.warn("[waitlist] owner notification skipped: RESEND_API_KEY, WAITLIST_FROM_EMAIL or WAITLIST_NOTIFY_EMAIL is not set");
    return;
  }
  const clean = (v: string) => v.replace(/[<>&"]/g, "");
  const rows: [string, string][] = [
    ["Name", clean(s.name)],
    ["Email", clean(s.email)],
    ["Journal", LABEL[s.interest] ?? s.interest],
    ["Location", COUNTRY[s.country] ?? s.country],
    ["Time", new Date().toLocaleString("en-GB", { timeZone: "Europe/London" })],
  ];
  const { error } = await new Resend(key).emails.send({
    from,
    to: notify,
    replyTo: s.email,
    subject: `New waitlist signup: ${clean(s.name)} (${LABEL[s.interest] ?? s.interest})`,
    text: rows.map(([k, v]) => `${k}: ${v}`).join("\n"),
    html: `<div style="font-family:Helvetica,Arial,sans-serif;font-size:15px;color:#0e1822"><p style="font-size:18px;font-weight:700">New waitlist signup</p><table cellpadding="6" style="border-collapse:collapse">${rows
      .map(([k, v]) => `<tr><td style="color:#7b5a1c">${k}</td><td><strong>${v}</strong></td></tr>`)
      .join("")}</table></div>`,
  });
  if (error) throw new Error(`Resend rejected owner notification: ${error.message}`);
}
