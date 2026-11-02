"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useActionState, useEffect, useState } from "react";
import { joinWaitlist, type WaitlistState } from "@/app/actions";
import { daysUntilRamadan, INSTAGRAM_HANDLE, INSTAGRAM_URL } from "@/lib/ramadan";
import { EASE, Reveal, SplitWords } from "./motion";

const INTERESTS = [
  { v: "nur", l: "NUR" },
  { v: "kids", l: "My Ramadan Book" },
  { v: "both", l: "Both" },
];
const COUNTRIES = [
  { v: "uk", l: "United Kingdom" },
  { v: "sri_lanka", l: "Sri Lanka" },
  { v: "elsewhere", l: "Elsewhere" },
];

function Choice({ name, options, def }: { name: string; options: { v: string; l: string }[]; def: string }) {
  const [val, setVal] = useState(def);
  return (
    <div className="flex flex-wrap gap-2" role="radiogroup">
      {options.map((o) => (
        <label
          key={o.v}
          className={`relative cursor-pointer rounded-full px-4 py-2.5 text-sm transition ${
            val === o.v ? "text-ink" : "text-paper/75 ring-1 ring-paper/20 hover:ring-paper/45"
          }`}
        >
          <input type="radio" name={name} value={o.v} checked={val === o.v} onChange={() => setVal(o.v)} className="sr-only" />
          {val === o.v && (
            <motion.span layoutId={`pill-${name}`} className="absolute inset-0 rounded-full bg-cream" transition={{ duration: 0.5, ease: EASE }} />
          )}
          <span className="relative">{o.l}</span>
        </label>
      ))}
    </div>
  );
}

function Crescent() {
  return (
    <svg viewBox="0 0 120 120" className="h-28 w-28 text-cream" aria-hidden>
      <motion.path
        d="M78 18 A44 44 0 1 0 78 102 A36 36 0 1 1 78 18 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2.2, ease: EASE }}
      />
      <motion.path
        d="M88 34 l2.6 6 6.4.6 -4.9 4.2 1.5 6.3 -5.6-3.4 -5.6 3.4 1.5-6.3 -4.9-4.2 6.4-.6z"
        fill="#d4b56a"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8, ease: EASE }}
        style={{ transformOrigin: "88px 42px" }}
      />
    </svg>
  );
}

export default function Waitlist() {
  const [state, action, pending] = useActionState<WaitlistState, FormData>(joinWaitlist, { status: "idle" });
  const [days, setDays] = useState<number | null>(null);
  useEffect(() => setDays(daysUntilRamadan()), []);

  const field =
    "w-full border-b border-paper/25 bg-transparent py-3 text-lg text-paper placeholder:text-paper/35 outline-none transition focus:border-cream";

  return (
    <section id="waitlist" className="relative isolate overflow-hidden bg-[radial-gradient(90%_70%_at_20%_10%,#2c4556_0%,#142231_45%,#0b141d_100%)] py-28 sm:py-40">
      <div aria-hidden className="lattice absolute inset-0 -z-10 opacity-[0.05]" />
      <div aria-hidden className="absolute bottom-[-20%] right-[-10%] -z-10 h-[70vh] w-[70vh] rounded-full bg-[#e9c98a]/12 blur-[130px]" />

      <div className="mx-auto grid max-w-[1400px] gap-16 px-5 sm:px-8 lg:grid-cols-[1fr_minmax(0,560px)] lg:gap-24">
        <div>
          <h2 className="leading-[0.9]">
            <SplitWords text="Be the first" className="swash block text-[clamp(2.2rem,5vw,4.2rem)] text-cream" />
            <SplitWords text="to know." delay={0.1} className="font-display block text-[clamp(4.4rem,12vw,10.5rem)] lowercase text-ice" />
          </h2>
          <Reveal className="mt-8 max-w-md text-lg leading-relaxed text-paper/70">
            Orders open about three weeks before Ramadan. Join the waitlist and we&apos;ll send you one message when it&apos;s time,{" "}
            <span className="arabic whitespace-nowrap">إن شاء الله</span>. No spam, ever.
          </Reveal>
          <Reveal delay={0.15} className="mt-14 flex items-end gap-5 border-t border-paper/15 pt-8">
            <span className="font-display text-[clamp(4rem,9vw,7rem)] leading-none text-cream">{days ?? "—"}</span>
            <span className="pb-2">
              <span className="swash block text-2xl text-paper">days until Ramadan</span>
              <span className="mt-1 block text-sm text-paper/45">Expected around 8 February 2027, subject to moon sighting</span>
            </span>
          </Reveal>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 1.3, ease: EASE }}
          className="relative overflow-hidden rounded-b-[24px] rounded-t-[300px] bg-white/[0.04] px-6 pb-10 pt-28 ring-1 ring-cream/15 backdrop-blur-xl sm:px-12 sm:pb-14 sm:pt-32"
        >
          <span aria-hidden className="arabic absolute inset-x-0 top-10 text-center text-5xl text-gold-2/80">بركة</span>
          <AnimatePresence mode="wait">
            {state.status === "success" ? (
              <motion.div
                key="done"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: EASE }}
                className="flex min-h-[420px] flex-col items-center justify-center text-center"
              >
                <Crescent />
                <p className="swash mt-6 text-3xl text-cream">JazakAllahu khayran, {state.name}.</p>
                <p className="font-display mt-3 text-4xl lowercase text-ice">
                  {state.message === "already" ? "you're already in." : "you're on the list."}
                </p>
                <p className="mt-5 max-w-sm text-paper/65">
                  We&apos;ll be in touch before Ramadan. Until then, follow along on{" "}
                  <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="text-cream underline underline-offset-4">
                    {INSTAGRAM_HANDLE}
                  </a>
                  .
                </p>
                {state.email && state.message !== "already" && (
                  <p className="mt-6 max-w-sm border-t border-paper/10 pt-5 text-sm leading-relaxed text-paper/50">
                    We&apos;ve sent a confirmation to <span className="text-paper/80">{state.email}</span>. Can&apos;t see it? Check
                    your Promotions or Spam folder.
                  </p>
                )}
              </motion.div>
            ) : (
              <motion.form key={`form-${state.values?.email ?? ""}`} action={action} exit={{ opacity: 0, y: -20 }} className="space-y-8">
                <div className="grid gap-8 sm:grid-cols-2">
                  <label className="block">
                    <span className="eyebrow text-paper/50">Your name</span>
                    <input name="name" required autoComplete="name" placeholder="Aisha" defaultValue={state.values?.name} className={field} />
                  </label>
                  <label className="block">
                    <span className="eyebrow text-paper/50">Email</span>
                    <input name="email" type="email" required autoComplete="email" placeholder="you@email.com" defaultValue={state.values?.email} className={field} />
                  </label>
                </div>
                <div>
                  <span className="eyebrow mb-3 block text-paper/50">Which journal?</span>
                  <Choice name="interest" options={INTERESTS} def="both" />
                </div>
                <div>
                  <span className="eyebrow mb-3 block text-paper/50">Where are you?</span>
                  <Choice name="country" options={COUNTRIES} def="uk" />
                </div>
                {/* honeypot */}
                <input name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
                <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-paper/60">
                  <input name="consent" type="checkbox" required className="mt-1 h-4 w-4 shrink-0 accent-[#efe2b8]" />
                  <span>Email me when orders open. I can unsubscribe at any time, and my details are only used for this.</span>
                </label>
                {state.status === "error" && <p className="text-sm text-[#f0a58a]">{state.message}</p>}
                <button
                  type="submit"
                  disabled={pending}
                  className="group flex w-full items-center justify-center gap-3 rounded-full bg-cream py-4 text-base font-medium text-ink transition hover:bg-[#f6ecc9] disabled:opacity-60"
                >
                  {pending ? "Adding you…" : "Join the waitlist"}
                  {!pending && <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
