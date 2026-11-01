"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Reveal, SplitWords } from "./motion";

const WORDS = [
  { en: "light", ar: "نور" },
  { en: "intention", ar: "نيّة" },
  { en: "patience", ar: "صبر" },
  { en: "gratitude", ar: "شكر" },
  { en: "reflection", ar: "محاسبة" },
  { en: "blessing", ar: "بركة" },
];

export function Marquee() {
  const reduce = useReducedMotion();
  const row = [...WORDS, ...WORDS];
  return (
    <div className="relative overflow-hidden border-y border-cream/10 bg-night py-6" aria-hidden>
      <motion.div
        className="flex w-max items-center gap-10 whitespace-nowrap pr-10"
        animate={reduce ? undefined : { x: ["0%", "-50%"] }}
        transition={{ duration: 46, ease: "linear", repeat: Infinity }}
      >
        {[...row, ...row].map((w, i) => (
          <span key={i} className="flex items-center gap-10">
            <span className="swash text-3xl text-cream/85 sm:text-4xl">{w.en}</span>
            <span className="arabic text-3xl text-gold-2/80 sm:text-4xl">{w.ar}</span>
            <span className="text-gold-2/40">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default function Manifesto() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bigX = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["6%", "-6%"]);
  const ghostY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-12%", "12%"]);

  return (
    <section
      ref={ref}
      className="relative isolate overflow-hidden bg-[linear-gradient(160deg,#36505f_0%,#2b4352_45%,#203544_100%)] py-28 sm:py-40"
    >
      <motion.span
        aria-hidden
        style={{ y: ghostY }}
        className="arabic pointer-events-none absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 select-none text-[52vw] leading-none text-white/[0.035] sm:text-[34vw]"
      >
        نيّة
      </motion.span>

      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <Reveal className="mx-auto max-w-5xl text-center text-[clamp(1rem,2vw,1.45rem)] font-medium text-ice/90 sm:pl-[8%] sm:text-left">
          Before every blessed month, there is an
        </Reveal>

        <motion.div style={{ x: bigX }} className="relative mt-2 text-center">
          <h2 className="font-display inline-flex items-end text-[clamp(4.6rem,19vw,17rem)] lowercase text-ice">
            <SplitWords text="intention." />
            <span className="mb-[0.2em] ml-3 hidden h-[0.17em] w-[0.17em] items-center justify-center bg-ice text-[0.11em] text-[#2b4352] sm:inline-flex">
              <span className="arabic leading-none">ن</span>
            </span>
          </h2>
        </motion.div>

        <Reveal delay={0.2} className="mx-auto mt-4 max-w-5xl text-center text-[clamp(1rem,2vw,1.45rem)] font-medium text-ice/90 sm:pr-[8%] sm:text-right">
          A quiet pause where the heart decides who it wants to become.
        </Reveal>

        <div className="mx-auto mt-20 grid max-w-5xl gap-10 text-paper/75 sm:mt-28 sm:grid-cols-2 sm:gap-16">
          <Reveal className="text-lg leading-relaxed">
            <span className="swash text-2xl text-cream">We made these journals</span> for the moments between the prayers. The quiet
            after Fajr, the pause before iftar, the last thoughts before sleep.
          </Reveal>
          <Reveal delay={0.15} className="text-lg leading-relaxed">
            Thirty days to track your salah, sit with the Qur&apos;an, and write honestly to yourself. One page at a time, so the
            month leaves something written on your heart.
          </Reveal>
        </div>
      </div>
    </section>
  );
}
