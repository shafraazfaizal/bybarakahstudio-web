"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL } from "@/lib/ramadan";
import { Wordmark } from "./Nav";

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["30%", "0%"]);

  return (
    <footer ref={ref} className="relative overflow-hidden bg-[#0a1118] pt-24 text-paper">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-10 border-b border-paper/10 pb-14 sm:flex-row sm:items-end">
          <div>
            <p className="swash text-3xl text-cream sm:text-4xl">Follow the journey</p>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="font-display mt-3 inline-block text-[clamp(2.2rem,6vw,4.5rem)] lowercase text-ice transition hover:text-cream"
            >
              {INSTAGRAM_HANDLE}
            </a>
          </div>
          <div className="flex flex-col gap-2 text-sm text-paper/55 sm:items-end">
            <a href="#nur" className="hover:text-paper">NUR, a journal for Ramadan</a>
            <a href="#kids" className="hover:text-paper">My Ramadan Book</a>
            <a href="#waitlist" className="hover:text-paper">Join the waitlist</a>
          </div>
        </div>
        <div className="flex flex-col justify-between gap-4 py-8 text-xs text-paper/40 sm:flex-row">
          <span>© {new Date().getFullYear()} ByBarakahStudio. Made with duas.</span>
          <a href="https://skayl.digital" target="_blank" rel="noreferrer" className="hover:text-paper/70">
            Crafted by SKAYL
          </a>
        </div>
      </div>
      <motion.div style={{ y }} aria-hidden className="pointer-events-none select-none whitespace-nowrap px-4 pb-6 text-center text-[clamp(4rem,16vw,15rem)] leading-[0.8] text-paper/[0.07]">
        <Wordmark />
      </motion.div>
    </footer>
  );
}
