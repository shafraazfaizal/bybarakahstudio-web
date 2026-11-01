"use client";

import { motion } from "framer-motion";
import { ArchOutline, EASE, Reveal, SplitWords } from "./motion";

const BOOKS = [
  {
    id: "nur",
    for: "For teens & adults",
    title: "NUR",
    arabic: "نور",
    line: "A journal for Ramadan.",
    note: "30 daily pages · Qur'an tracker · Duas · Muhasabah",
    img: "/books/nur-cover.webp",
    bg: "bg-[linear-gradient(180deg,#d9dfe3_0%,#9fb0bb_100%)]",
  },
  {
    id: "kids",
    for: "For children",
    title: "My Ramadan Book",
    arabic: "رمضان",
    line: "For little hearts.",
    note: "Lantern prayer tracker · Qur'an tower · Daily activities",
    img: "/books/kids-cover.webp",
    bg: "bg-[linear-gradient(180deg,#f3e6c4_0%,#e2c98d_100%)]",
  },
];

export default function Collection() {
  return (
    <section id="collection" className="relative bg-paper py-28 text-ink sm:py-40">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <h2 className="leading-none">
            <SplitWords text="The collection," className="swash block text-[clamp(2rem,4.5vw,3.8rem)] text-slate" />
            <SplitWords text="two journals." delay={0.15} className="font-display block text-[clamp(3.6rem,10vw,8.5rem)] lowercase" />
          </h2>
          <Reveal className="max-w-sm text-base leading-relaxed text-ink/65 sm:text-right">
            One for you, one for the little ones. Printed, made to be written in, and arriving before Ramadan 1448.
          </Reveal>
        </div>

        <div className="mt-16 grid gap-16 sm:mt-24 md:grid-cols-2 md:gap-10 lg:gap-20">
          {BOOKS.map((b, i) => (
            <motion.a
              key={b.id}
              href={`#${b.id}`}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 1.3, ease: EASE, delay: i * 0.15 }}
              className={`group block ${i === 1 ? "md:mt-32" : ""}`}
            >
              <div className="relative mx-auto aspect-[4/5] w-full max-w-[540px]">
                <ArchOutline className="-inset-3 h-[calc(100%+24px)] w-[calc(100%+24px)] text-gold" delay={0.4 + i * 0.2} />
                <div className={`arch absolute inset-0 overflow-hidden ${b.bg}`}>
                  <span
                    aria-hidden
                    className="arabic absolute inset-x-0 top-[9%] text-center text-[clamp(4rem,9vw,7rem)] leading-none text-ink/10 transition-colors duration-700 group-hover:text-ink/20"
                  >
                    {b.arabic}
                  </span>
                  <div className="absolute inset-x-0 bottom-0 flex justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={b.img}
                      alt={`${b.title} cover`}
                      loading="lazy"
                      className="mb-[-6%] w-[62%] rounded-[4px] shadow-[0_40px_70px_-20px_rgba(14,24,34,.6)] transition-transform duration-[1.2s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-6 group-hover:rotate-[-2deg]"
                    />
                  </div>
                </div>
              </div>
              <div className="mx-auto mt-8 flex max-w-[540px] items-end justify-between gap-6">
                <div>
                  <p className="eyebrow text-gold">{b.for}</p>
                  <h3 className="font-display mt-3 text-4xl lowercase sm:text-5xl">{b.title}</h3>
                  <p className="swash mt-1 text-2xl text-slate">{b.line}</p>
                  <p className="mt-3 text-sm text-ink/55">{b.note}</p>
                </div>
                <span className="mb-2 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-ink/20 text-xl transition duration-500 group-hover:bg-ink group-hover:text-paper">
                  ↓
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
