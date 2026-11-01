"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { VideoSlot } from "@/lib/content";
import { EASE } from "./motion";

/** Tall arched video frame. Autoplays muted when on screen; tap for sound. Shows "coming soon" when no src. */
export default function FilmSlot({ slot, tone = "dark" }: { slot: VideoSlot; tone?: "dark" | "light" }) {
  const ref = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const inView = useInView(ref, { margin: "-20% 0px" });
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const v = video.current;
    if (!v) return;
    if (inView) v.play().catch(() => {});
    else v.pause();
  }, [inView]);

  const ring = tone === "dark" ? "ring-cream/15" : "ring-ink/10";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1.3, ease: EASE }}
      className="relative mx-auto w-[min(82vw,380px)]"
    >
      <div className={`relative aspect-[9/16] overflow-hidden rounded-b-[28px] rounded-t-[999px] bg-night shadow-[0_50px_100px_-30px_rgba(0,0,0,.7)] ring-1 ${ring}`}>
        {slot.src ? (
          <>
            <video
              ref={video}
              className="h-full w-full object-cover"
              src={slot.src}
              poster={slot.poster}
              muted={muted}
              loop
              playsInline
              preload="metadata"
              aria-label={slot.caption}
            />
            <button
              onClick={() => {
                setMuted((m) => !m);
                video.current?.play().catch(() => {});
              }}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-ink/60 px-4 py-2 text-xs tracking-wide text-paper backdrop-blur-md ring-1 ring-white/15 transition hover:bg-ink/80"
            >
              {muted ? "Tap for sound" : "Mute"}
            </button>
          </>
        ) : (
          <div className="relative h-full w-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={slot.poster} alt="" className="h-full w-full scale-110 object-cover blur-[6px] brightness-[.55]" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center text-paper">
              <span className="eyebrow text-cream/80">Film</span>
              <span className="swash text-3xl">coming soon</span>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
