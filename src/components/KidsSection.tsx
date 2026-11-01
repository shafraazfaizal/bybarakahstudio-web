"use client";

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";
import { KIDS_FILM } from "@/lib/content";
import FilmSlot from "./FilmSlot";
import { EASE, Reveal, SplitWords, Star8 } from "./motion";

const PAGES = [
  { img: "/books/kids-masjid.webp", rot: -16, x: -66 },
  { img: "/books/kids-day.webp", rot: -6, x: -24 },
  { img: "/books/kids-cover.webp", rot: 0, x: 0 },
  { img: "/books/kids-maze.webp", rot: 7, x: 24 },
  { img: "/books/kids-certificate.webp", rot: 16, x: 64 },
];

const FEATURES = [
  { t: "Light a lantern", d: "Colour in a lantern for every prayer prayed, Fajr to Isha." },
  { t: "Fasting check-in", d: "Full day, half day or no snack. Every effort counts." },
  { t: "The Qur'an tower", d: "Colour a box for every page read and watch the tower grow." },
  { t: "Something new each day", d: "Draw, colour, solve a maze or count the stars. Thirty different activities." },
  { t: "A certificate for Eid", d: "A page to celebrate finishing the month. Made to be framed." },
];

function FanPage({ p, i, progress }: { p: (typeof PAGES)[number]; i: number; progress: MotionValue<number> }) {
  const reduce = useReducedMotion();
  const rotate = useTransform(progress, [0, 1], [reduce ? p.rot : p.rot * 0.25, p.rot]);
  const x = useTransform(progress, [0, 1], [reduce ? `${p.x}%` : `${p.x * 0.2}%`, `${p.x}%`]);
  const y = useTransform(progress, [0, 1], [0, Math.abs(p.rot) * 1.6]);
  return (
    <motion.div style={{ rotate, x, y, zIndex: 10 - Math.abs(i - 2) }} className="absolute left-1/2 top-0 w-[38%] -translate-x-1/2 origin-bottom">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={p.img} alt="" loading="lazy" className="w-full rounded-[6px] shadow-[0_30px_60px_-20px_rgba(60,40,10,.45)] ring-1 ring-black/5" />
    </motion.div>
  );
}

export default function KidsSection() {
  const fanRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: fanRef, offset: ["start end", "center center"] });

  return (
    <section id="kids" className="relative isolate overflow-hidden bg-[linear-gradient(180deg,#f4ecdc_0%,#efe1c4_100%)] py-28 text-ink sm:py-40">
      <div aria-hidden className="absolute -left-40 top-20 -z-10 h-[50vh] w-[50vh] rounded-full bg-[#9fcbe0]/35 blur-[110px]" />
      <div aria-hidden className="absolute -right-40 bottom-10 -z-10 h-[50vh] w-[50vh] rounded-full bg-[#f2c46b]/30 blur-[110px]" />

      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <p className="eyebrow flex items-center gap-3 text-[#8a6a22]">
          <Star8 className="h-4 w-4" /> For children
        </p>
        <h2 className="mt-6 leading-[0.88]">
          <SplitWords text="my ramadan" className="font-display block text-[clamp(4rem,14vw,12.5rem)] lowercase" />
          <span className="flex flex-wrap items-baseline gap-x-6">
            <SplitWords text="book." delay={0.1} className="font-display block text-[clamp(4rem,14vw,12.5rem)] lowercase" />
            <SplitWords text="for little hearts." delay={0.25} className="swash block text-[clamp(2rem,4.5vw,3.8rem)] text-[#7b5a1c]" />
          </span>
        </h2>
        <Reveal className="mt-8 max-w-xl text-lg leading-relaxed text-ink/65">
          Thirty colourful days that turn Ramadan into something children look forward to. Prayer, fasting and the Qur&apos;an,
          learned through colouring, drawing and small wins they can see.
        </Reveal>

        {/* page fan */}
        <div ref={fanRef} className="relative mx-auto mt-16 aspect-[16/10] w-full max-w-5xl sm:mt-24">
          {PAGES.map((p, i) => (
            <FanPage key={p.img} p={p} i={i} progress={scrollYProgress} />
          ))}
        </div>

        {/* features */}
        <div className="mt-10 grid gap-x-16 gap-y-2 sm:mt-20 lg:grid-cols-[1fr_auto]">
          <ol className="divide-y divide-ink/10 border-y border-ink/10">
            {FEATURES.map((f, i) => (
              <motion.li
                key={f.t}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 0.9, ease: EASE, delay: i * 0.08 }}
                className="group grid grid-cols-[3rem_1fr] items-baseline gap-4 py-7 sm:grid-cols-[4rem_1fr_1.2fr]"
              >
                <span className="swash text-2xl text-[#9a7428]">0{i + 1}</span>
                <span className="font-display text-[clamp(1.6rem,3vw,2.4rem)] lowercase transition-transform duration-500 group-hover:translate-x-2">
                  {f.t}
                </span>
                <span className="col-start-2 text-ink/60 sm:col-start-3">{f.d}</span>
              </motion.li>
            ))}
          </ol>
          <div className="mt-14 lg:mt-0">
            <FilmSlot slot={KIDS_FILM} tone="light" />
          </div>
        </div>
      </div>
    </section>
  );
}
