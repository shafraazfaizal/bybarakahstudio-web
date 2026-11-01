"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { NUR_FILM } from "@/lib/content";
import FilmSlot from "./FilmSlot";
import { EASE, Reveal, SplitWords, Star8 } from "./motion";

// Regions on the daily page, as % of the page (x, y, w, h).
const FEATURES = [
  { n: "01", title: "Day & date", body: "Count the day of Ramadan, write the date, and circle the day of the week. A small ritual to begin.", r: [64.8, 1.2, 29.4, 11.6] },
  { n: "02", title: "Spiritual reminder", body: "One short line on every page to carry with you through the fast.", r: [64.8, 14.6, 29.4, 10.8] },
  { n: "03", title: "To-do list", body: "Four priorities that balance your dunya with your akhirah. Small, honest, doable.", r: [61.2, 27.6, 36.6, 15.8] },
  { n: "04", title: "Prayer tracker", body: "Tahajjud to Witr, with space for your sunnah. Consistency you can actually see.", r: [61.2, 44.8, 36.6, 26.6] },
  { n: "05", title: "Qur'anic reflection", body: "The surah and ayah that stopped you, and what it means for your life. A gentle push towards tafsir.", r: [61.2, 72.8, 36.6, 21.2] },
  { n: "06", title: "Daily ayah", body: "A verse at the foot of the page to anchor the day.", r: [14.5, 79, 44.5, 11.5] },
  { n: "07", title: "Muhasabah", body: "A lined page for honest self-reflection. The heart of the journal: write what your heart needs to let go of.", r: [2, 3.2, 57.4, 75.2] },
];

function Feature({ f, i, onActive }: { f: (typeof FEATURES)[number]; i: number; onActive: (i: number) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });
  useEffect(() => {
    if (inView) onActive(i);
  }, [inView, i, onActive]);
  return (
    <div ref={ref} className="flex min-h-[46svh] items-center lg:min-h-[78vh]">
      <motion.div
        animate={{ opacity: inView ? 1 : 0.25 }}
        transition={{ duration: 0.6 }}
        className="max-w-md"
      >
        <span className="swash text-2xl text-gold-2">{f.n}</span>
        <h3 className="font-display mt-2 text-[clamp(2.4rem,5vw,4rem)] lowercase text-ice">{f.title}</h3>
        <p className="mt-4 text-lg leading-relaxed text-paper/70">{f.body}</p>
      </motion.div>
    </div>
  );
}

function DailyPage({ active }: { active: number }) {
  const [x, y, w, h] = FEATURES[active].r;
  const t = { duration: 1.1, ease: EASE };
  return (
    <div className="relative mx-auto aspect-[1096/1552] h-full max-h-full max-w-full">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/books/nur-daily-filled.webp" alt="A filled-in daily page of NUR" className="absolute inset-0 h-full w-full rounded-[4px] object-cover shadow-[0_40px_90px_-30px_rgba(0,0,0,.8)]" />
      <div className="absolute inset-0 rounded-[4px] bg-ink/55" />
      {/* the section that lifts off the page */}
      <motion.div
        className="absolute overflow-hidden rounded-[10px] shadow-[0_30px_60px_-12px_rgba(0,0,0,.65),0_0_0_1px_rgba(212,181,106,.55)]"
        initial={false}
        animate={{ left: `${x}%`, top: `${y}%`, width: `${w}%`, height: `${h}%`, scale: 1.05 }}
        transition={t}
      >
        <motion.img
          src="/books/nur-daily-filled.webp"
          alt=""
          className="absolute max-w-none"
          initial={false}
          animate={{ width: `${(100 / w) * 100}%`, height: `${(100 / h) * 100}%`, left: `${(-x / w) * 100}%`, top: `${(-y / h) * 100}%` }}
          transition={t}
        />
      </motion.div>
    </div>
  );
}

const ALSO = [
  { img: "/books/nur-how-to.webp", t: "How to use", d: "A guide to every section" },
  { img: "/books/nur-quran-tracker.webp", t: "Qur'an tracker", d: "The four page rule, after every salah" },
  { img: "/books/nur-duas.webp", t: "Duas", d: "Four pages of duas for the month" },
];

export default function NurSection() {
  const [active, setActive] = useState(0);
  return (
    <section id="nur" className="relative isolate overflow-x-clip bg-ink py-28 sm:py-40">
      <div aria-hidden className="lattice absolute inset-0 -z-10 opacity-[0.035]" />
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        {/* title */}
        <div className="relative">
          <p className="eyebrow flex items-center gap-3 text-cream/70">
            <Star8 className="h-4 w-4 text-gold-2" /> For teens & adults
          </p>
          <div className="mt-6 flex flex-wrap items-end gap-x-8 gap-y-2">
            <h2 className="font-display text-[clamp(6rem,22vw,19rem)] lowercase text-ice">
              <SplitWords text="nur." />
            </h2>
            <Reveal delay={0.3} className="arabic mb-[0.25em] text-[clamp(4rem,12vw,10rem)] leading-none text-gold-2">
              نور
            </Reveal>
          </div>
          <div className="mt-6 grid gap-8 lg:grid-cols-2">
            <SplitWords text="A journal for Ramadan." className="swash block text-[clamp(2rem,4.4vw,3.6rem)] leading-tight text-cream" />
            <Reveal className="max-w-xl text-lg leading-relaxed text-paper/70 lg:justify-self-end">
              Thirty daily pages for the month that changes everything. Track your salah, reflect on what you recite, and keep an
              honest account with yourself, so you understand the Qur&apos;an and not only read it.
            </Reveal>
          </div>
        </div>

        {/* anatomy of a page */}
        <div className="mt-24 sm:mt-32">
          <Reveal className="eyebrow text-cream/60">Inside every daily page</Reveal>
          <div className="relative mt-6 lg:grid lg:grid-cols-2 lg:gap-16">
            <div className="sticky top-16 z-10 h-[50svh] bg-ink pb-4 pt-4 lg:order-2 lg:top-[11vh] lg:h-[78vh] lg:bg-transparent lg:p-0">
              <DailyPage active={active} />
            </div>
            <div className="relative lg:order-1">
              {FEATURES.map((f, i) => (
                <Feature key={f.n} f={f} i={i} onActive={setActive} />
              ))}
            </div>
          </div>
        </div>

        {/* also inside */}
        <div className="mt-24 sm:mt-36">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <h3 className="leading-none">
              <span className="swash block text-[clamp(1.8rem,3.6vw,3rem)] text-cream">Also inside,</span>
              <span className="font-display block text-[clamp(3rem,7vw,6rem)] lowercase text-ice">before day one.</span>
            </h3>
            <Reveal className="max-w-sm text-paper/60">Plus a page for the year, so it becomes a keepsake you return to.</Reveal>
          </div>
          <div className="mt-14 grid gap-8 sm:grid-cols-3">
            {ALSO.map((a, i) => (
              <motion.figure
                key={a.t}
                initial={{ opacity: 0, y: 60, rotate: i === 1 ? 0 : i === 0 ? -4 : 4 }}
                whileInView={{ opacity: 1, y: 0, rotate: i === 1 ? 0 : i === 0 ? -2 : 2 }}
                whileHover={{ rotate: 0, y: -10 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 1.1, ease: EASE, delay: i * 0.12 }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={a.img} alt={a.t} loading="lazy" className="w-full rounded-[4px] shadow-[0_30px_70px_-25px_rgba(0,0,0,.8)] ring-1 ring-white/10" />
                <figcaption className="mt-5">
                  <span className="swash text-2xl text-cream">{a.t}</span>
                  <span className="mt-1 block text-sm text-paper/55">{a.d}</span>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>

        {/* film */}
        <div className="mt-28 grid items-center gap-14 sm:mt-40 lg:grid-cols-2">
          <div>
            <h3 className="leading-[0.95]">
              <SplitWords text="Watch it" className="swash block text-[clamp(2rem,4vw,3.4rem)] text-cream" />
              <SplitWords text="come alive." delay={0.1} className="font-display block text-[clamp(3.4rem,8vw,7rem)] lowercase text-ice" />
            </h3>
            <Reveal className="mt-6 max-w-md text-lg leading-relaxed text-paper/65">
              From the first page to the last line of muhasabah. One day of Ramadan, written.
            </Reveal>
            <Reveal delay={0.1}>
              <a href="#waitlist" className="mt-10 inline-flex items-center gap-3 rounded-full border border-cream/30 px-6 py-3.5 text-cream transition hover:bg-cream hover:text-ink">
                Reserve NUR on the waitlist →
              </a>
            </Reveal>
          </div>
          <FilmSlot slot={NUR_FILM} />
        </div>
      </div>
    </section>
  );
}
