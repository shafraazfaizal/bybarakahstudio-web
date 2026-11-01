# ByBarakahStudio — waitlist landing page

Live at **https://barakah.skayl.digital**. Next.js 15 (App Router) · TypeScript · Tailwind v4 · Framer Motion · Supabase · Resend.

This project is **completely separate from SKAYL**: its own repo, its own Vercel project, its own Supabase project, its own Resend API key. The only thing it shares with skayl.digital is **one new DNS record** (`barakah`).

---

## 1. Run it locally

```bash
npm install
cp .env.example .env.local   # then fill in the values yourself
npm run dev                  # http://localhost:3000
```

Without Supabase keys, the form simulates a successful signup in dev so you can see the full flow.

## 2. Supabase (new project — don't reuse SKAYL's)

1. supabase.com → New project → name `bybarakahstudio`, region **London (eu-west-2)**.
2. SQL Editor → paste `supabase/migrations/001_waitlist.sql` → Run.
3. Project Settings → API → copy the **Project URL** and the **service_role** key into `.env.local` (and later Vercel). The service role key is only used on the server and never reaches the browser.

See signups: Table Editor → `waitlist` (Export → CSV). Totals: `select * from waitlist_summary;`

## 3. Resend (confirmation email — optional)

- If `skayl.digital` is already verified in Resend (it is, for the SKAYL contact form), you can send from any `@skayl.digital` address with **no DNS changes**, e.g. `ByBarakahStudio <barakah@skayl.digital>`.
- Create a **new API key** named `barakah-waitlist` (Sending access only), so it can be revoked without touching SKAYL's key.
- Set `WAITLIST_REPLY_TO` to an inbox you read.

## 4. Vercel (new project)

1. Vercel → Add New → Project → import `bybarakahstudio-web`. Framework: Next.js (auto). Do **not** add it to the SKAYL project.
2. Settings → Environment Variables → add everything from `.env.example` (Production + Preview).
3. Settings → Git → Production Branch: `main`. Pushing `dev` gives you preview URLs.
4. Settings → Domains → add `barakah.skayl.digital`. Vercel shows the exact CNAME value to use.

## 5. Hostinger DNS — add ONE record only

hPanel → Domains → skayl.digital → DNS / Nameservers → Add record:

| Type  | Name      | Points to / Target                     | TTL     |
| ----- | --------- | -------------------------------------- | ------- |
| CNAME | `barakah` | the value Vercel shows (e.g. `cname.vercel-dns.com`) | default |

Do **not** edit or delete any existing records (`@`, `www`, MX, SPF/DKIM/DMARC TXT). Those keep skayl.digital and hello@skayl.digital working. Vercel issues the SSL certificate automatically once the record resolves (usually a few minutes).

## Editing content

- **Videos:** drop an `.mp4` into `public/media/` and update `src/lib/content.ts`. The kids slot switches from "coming soon" to a player automatically.
- **Ramadan date / countdown:** `src/lib/ramadan.ts`.
- **Book images:** `public/books/`.
- **Fonts:** Archivo Black (display), Bodoni Moda Italic (swash), Inter Tight (body), Amiri (Arabic), all self-hosted through `@fontsource`.

## Git workflow

Work on `dev`, merge into `main` when ready. Pushing `main` deploys production.
