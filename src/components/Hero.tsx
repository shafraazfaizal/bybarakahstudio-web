"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { daysUntilRamadan } from "@/lib/ramadan";
import { ArchOutline, EASE, SplitWords, Star8 } from "./motion";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const archY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 140]);
  const archScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 0.92]);
  const cardY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -120]);
  const card2Y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -60]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 90]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const [days, setDays] = useState<number | null>(null);
  useEffect(() => setDays(daysUntilRamadan()), []);

  return (
    <section
      id="top"
      ref={ref}
      className="relative isolate min-h-[100svh] overflow-hidden bg-[radial-gradient(120%_80%_at_70%_0%,#46667a_0%,#22384a_38%,#0e1822_78%)]"
    >
      {/* drifting mashrabiya lattice */}
      <motion.div
        aria-hidden
        className="lattice absolute inset-0 -z-10 opacity-[0.06]"
        animate={reduce ? undefined : { backgroundPosition: ["0px 0px", "120px 240px"] }}
        transition={{ duration: 60, ease: "linear", repeat: Infinity }}
      />
      {/* soft lantern glow */}
      <div aria-hidden className="absolute right-[-10%] top-[8%] -z-10 h-[70vh] w-[70vh] rounded-full bg-[#e9c98a]/20 blur-[120px]" />

      <div className="mx-auto grid min-h-[100svh] max-w-[1400px] grid-cols-1 items-center gap-12 px-5 pb-20 pt-32 sm:px-8 lg:grid-cols-[1.12fr_.88fr] lg:gap-6 lg:pb-16 lg:pt-28">
        {/* copy */}
        <motion.div style={{ y: textY, opacity: fade }} className="relative z-10 order-2 lg:order-1">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.5 }}
            className="eyebrow mb-7 flex items-center gap-3 text-cream/80"
          >
            <Star8 className="h-4 w-4 text-gold-2" /> Ramadan 1448 · The waitlist is open
          </motion.p>

          <h1 className="text-ice">
            <SplitWords
              immediate
              delay={0.6}
              text="Every Ramadan"
              className="swash block text-[clamp(2.3rem,4.8vw,4.6rem)] leading-[1.02] text-cream"
            />
            <SplitWords
              immediate
              delay={0.8}
              text="deserves to be"
              className="swash block text-[clamp(2.3rem,4.8vw,4.6rem)] leading-[1.02] text-cream sm:pl-[1.2em]"
            />
            <SplitWords
              immediate
              delay={1.0}
              text="written."
              className="font-display mt-1 block text-[clamp(5.2rem,15.5vw,13.5rem)] lowercase"
            />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: EASE, delay: 1.5 }}
            className="mt-8 max-w-[34rem] text-[1.05rem] leading-relaxed text-paper/75 sm:text-lg"
          >
            Two printed journals for the most blessed month. <em className="swash text-cream not-italic">NUR</em>, a journal for Ramadan,
            and <em className="swash text-cream not-italic">My Ramadan Book</em> for little hearts. Arriving before Ramadan, <span className="arabic not-italic whitespace-nowrap">إن شاء الله</span>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: EASE, delay: 1.75 }}
            className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4"
          >
            <a
              href="#waitlist"
              className="group inline-flex items-center gap-3 rounded-full bg-cream px-7 py-4 text-[0.95rem] font-medium text-ink shadow-[0_20px_60px_-20px_rgba(239,226,184,.6)] transition hover:bg-[#f6ecc9]"
            >
              Join the waitlist
              <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
            </a>
            <a href="#collection" className="text-[0.95rem] text-paper/70 underline decoration-paper/25 underline-offset-[6px] transition hover:text-paper">
              See the journals
            </a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: days === null ? 0 : 1 }}
            transition={{ duration: 1.4, delay: 2 }}
            className="mt-12 flex items-baseline gap-3 text-paper/60"
          >
            <span className="font-display text-3xl text-cream">{days ?? "—"}</span>
            <span className="swash text-lg">days until Ramadan, <span className="arabic not-italic whitespace-nowrap text-xl">إن شاء الله</span></span>
          </motion.p>
        </motion.div>

        {/* arch window */}
        <motion.div style={{ y: archY, scale: archScale }} className="relative order-1 mx-auto w-[min(76vw,430px)] lg:order-2 lg:ml-auto lg:mr-6">
          <div className="relative aspect-[3/4]">
            <ArchOutline className="-inset-[14px] h-[calc(100%+28px)] w-[calc(100%+28px)] text-gold-2/60" delay={1.2} />
            <div className="arch absolute inset-0 overflow-hidden bg-night">
              <motion.div
                initial={{ scale: reduce ? 1 : 1.25 }}
                animate={{ scale: 1 }}
                transition={{ duration: 3.2, ease: EASE, delay: 0.3 }}
                className="absolute inset-0"
              >
                <video
                  className="h-full w-full object-cover"
                  src="/media/hero-lake.mp4"
                  poster="/media/hero-lake-poster.jpg"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  aria-label="Mist drifting over a mountain lake"
                />
              </motion.div>
              {/* curtain that lifts to open the window */}
              <motion.div
                aria-hidden
                initial={{ y: "0%" }}
                animate={{ y: "-101%" }}
                transition={{ duration: 1.8, ease: [0.76, 0, 0.24, 1], delay: 0.35 }}
                className="absolute inset-0 bg-[#1b2c3b]"
              />
              <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-[#f4f1ea]/30 to-transparent" />
              <motion.span
                initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 2, ease: EASE, delay: 1.6 }}
                className="arabic absolute inset-x-0 top-[17%] text-center text-[clamp(4.5rem,11vw,7.5rem)] leading-none text-[#1c2a3a]"
              >
                نور
              </motion.span>
            </div>

            {/* the two books, floating */}
            <motion.figure
              style={{ y: cardY }}
              initial={{ opacity: 0, x: -30, rotate: -14 }}
              animate={{ opacity: 1, x: 0, rotate: -8 }}
              transition={{ duration: 1.6, ease: EASE, delay: 1.9 }}
              className="absolute -bottom-8 -left-10 w-[38%] overflow-hidden rounded-[6px] shadow-[0_30px_60px_-15px_rgba(0,0,0,.65)] ring-1 ring-white/10 sm:-left-16"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/books/nur-cover.webp" alt="NUR, a journal for Ramadan, cover" className="block w-full" />
            </motion.figure>
            <motion.figure
              style={{ y: card2Y }}
              initial={{ opacity: 0, x: 30, rotate: 14 }}
              animate={{ opacity: 1, x: 0, rotate: 7 }}
              transition={{ duration: 1.6, ease: EASE, delay: 2.1 }}
              className="absolute -right-6 bottom-10 w-[30%] overflow-hidden rounded-[6px] shadow-[0_30px_60px_-15px_rgba(0,0,0,.65)] ring-1 ring-white/10 sm:-right-12"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/books/kids-cover.webp" alt="My Ramadan Book cover" className="block w-full" />
            </motion.figure>
          </div>
        </motion.div>
      </div>

    </section>
  );
}
