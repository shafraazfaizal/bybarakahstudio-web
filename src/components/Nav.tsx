"use client";

import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";
import { EASE } from "./motion";

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-baseline gap-[0.18em] leading-none ${className}`}>
      <span className="swash text-[1.05em]">by</span>
      <span className="font-display text-[0.92em] tracking-[-0.04em]">barakah</span>
      <span className="swash text-[1.05em]">studio</span>
    </span>
  );
}

export default function Nav() {
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);
  useMotionValueEvent(scrollY, "change", (v) => setSolid(v > 40));

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.2, ease: EASE, delay: 0.2 }}
      className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-8 sm:pt-5"
    >
      <nav
        className={`mx-auto flex max-w-[1400px] items-center justify-between rounded-full px-4 py-2.5 transition-all duration-700 sm:px-6 ${
          solid ? "bg-ink/55 shadow-[0_10px_40px_-20px_rgba(0,0,0,.6)] backdrop-blur-xl ring-1 ring-white/10" : "bg-transparent"
        }`}
      >
        <a href="#top" className="text-[1.35rem] text-paper sm:text-[1.5rem]" aria-label="ByBarakahStudio home">
          <Wordmark />
        </a>
        <div className="flex items-center gap-1 sm:gap-2">
          <a href="#nur" className="hidden rounded-full px-4 py-2 text-sm text-paper/80 transition hover:text-paper md:block">
            NUR
          </a>
          <a href="#kids" className="hidden rounded-full px-4 py-2 text-sm text-paper/80 transition hover:text-paper md:block">
            My Ramadan Book
          </a>
          <a
            href="#waitlist"
            className="group relative overflow-hidden rounded-full bg-cream px-4 py-2 text-[0.8rem] font-medium text-ink transition sm:px-5 sm:text-sm"
          >
            <span className="relative z-10">Join the waitlist</span>
            <span className="absolute inset-0 -translate-x-full bg-gold-2 transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-0" />
          </a>
        </div>
      </nav>
    </motion.header>
  );
}
