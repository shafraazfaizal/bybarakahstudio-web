"use client";

import { motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import { useRef, type ReactNode } from "react";

export const EASE = [0.22, 1, 0.36, 1] as const;

/** Fade-and-rise when scrolled into view. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "p" | "span" | "li";
}) {
  const reduce = useReducedMotion();
  const M = motion[as];
  return (
    <M
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : y, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={{ duration: 1.1, ease: EASE, delay }}
    >
      {children}
    </M>
  );
}

const wordParent: Variants = { show: { transition: { staggerChildren: 0.07 } } };
const wordChild: Variants = {
  hidden: { y: "105%", rotate: 3 },
  show: { y: "0%", rotate: 0, transition: { duration: 1.05, ease: EASE } },
};

/** Each word rises out of a mask, like a page being written. */
export function SplitWords({
  text,
  className,
  wordClassName,
  delay = 0,
  immediate = false,
}: {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  immediate?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduce = useReducedMotion();
  const show = immediate || inView;
  return (
    <motion.span
      ref={ref}
      className={className}
      variants={wordParent}
      initial={reduce ? "show" : "hidden"}
      animate={show ? "show" : "hidden"}
      transition={{ delayChildren: delay }}
      aria-label={text}
    >
      {text.split(" ").map((w, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
          <motion.span variants={wordChild} className={`inline-block will-change-transform ${wordClassName ?? ""}`}>
            {w}
            {i < text.split(" ").length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

/** Thin outline that traces the pointed arch. Sits over an element using the #arch clip path. */
export function ArchOutline({ className, delay = 0.3, color = "currentColor" }: { className?: string; delay?: number; color?: string }) {
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className={`pointer-events-none absolute ${className ?? "inset-0 h-full w-full"}`} aria-hidden>
      <motion.path
        d="M0.4,100 L0.4,36 C0.4,17.2 20,7.4 50,0.5 C80,7.4 99.6,17.2 99.6,36 L99.6,100"
        fill="none"
        stroke={color}
        strokeWidth={1}
        vectorEffect="non-scaling-stroke"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2.2, ease: EASE, delay }}
      />
    </svg>
  );
}

/** Eight-point star (Rub el Hizb) used as a small ornament. */
export function Star8({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <g fill="none" stroke="currentColor" strokeWidth="1.2">
        <rect x="6" y="6" width="12" height="12" />
        <rect x="6" y="6" width="12" height="12" transform="rotate(45 12 12)" />
      </g>
    </svg>
  );
}
