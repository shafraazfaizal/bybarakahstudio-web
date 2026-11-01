import "server-only";
import { Resend } from "resend";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL } from "./ramadan";

const LABEL: Record<string, string> = { nur: "NUR", kids: "My Ramadan Book", both: "NUR and My Ramadan Book" };

export async function sendWaitlistEmail({ to, name, interest }: { to: string; name: string; interest: string }) {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.WAITLIST_FROM_EMAIL; // e.g. "ByBarakahStudio <barakah@skayl.digital>"
  if (!key || !from) return; // email is optional — signups still save without it

  const resend = new Resend(key);
  const books = LABEL[interest] ?? "our journals";
  const safeName = name.replace(/[<>&"]/g, "");

  await resend.emails.send({
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
}
