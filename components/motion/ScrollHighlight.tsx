"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useRef, type CSSProperties } from "react";
import { cn } from "@/utils/helpers/cn";

type ScrollHighlightProps = {
  text: string;
  className?: string;
  /** Scroll distance the pinned reveal occupies, in viewport heights. */
  distance?: number;
  /** Optional lead-in above the sentence. */
  eyebrow?: string;
};

/**
 * Pins a statement and lights it word by word as the reader scrolls — the
 * effect earns its keep on a single sentence you want people to actually read,
 * so use it once per page.
 *
 * Progress is read off the tall outer track, which means the reveal is locked
 * to the scrollbar rather than played back on a timer.
 */
export function ScrollHighlight({
  text,
  className,
  distance = 2.2,
  eyebrow,
}: ScrollHighlightProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const words = text.split(" ");

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  if (reduced) {
    return (
      <div className={cn("mx-auto max-w-5xl px-6 py-24", className)}>
        {eyebrow && (
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-brand-700 dark:text-brand-400">
            {eyebrow}
          </p>
        )}
        <p className="font-display text-3xl font-semibold leading-[1.2] tracking-tight text-ink sm:text-4xl md:text-5xl">
          {text}
        </p>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      data-pin-track
      style={{ "--pin-distance": distance } as CSSProperties}
      className="relative"
    >
      <div className="sticky top-0 flex h-svh items-center overflow-hidden">
        <div className={cn("mx-auto w-full max-w-5xl px-6", className)}>
          {eyebrow && (
            <p className="mb-8 font-mono text-xs uppercase tracking-[0.2em] text-brand-700 dark:text-brand-400">
              {eyebrow}
            </p>
          )}

          <p
            className="flex flex-wrap font-display text-3xl font-semibold leading-[1.25] tracking-tight sm:text-4xl md:text-5xl lg:text-6xl"
            aria-label={text}
          >
            {words.map((word, i) => {
              // Each word owns a slice of the track, with the slices
              // overlapping slightly so the sentence reads as a sweep.
              const start = i / words.length;
              const end = (i + 1) / words.length;
              return (
                <Word key={`${word}-${i}`} progress={scrollYProgress} range={[start, end]}>
                  {word}
                </Word>
              );
            })}
          </p>
        </div>
      </div>
    </div>
  );
}

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  // Words settle by 85% of the track so the last one is not still lighting up
  // as the section unpins.
  const [start, end] = range;
  const opacity = useTransform(progress, [start * 0.85, end * 0.85], [0.14, 1]);
  const y = useTransform(progress, [start * 0.85, end * 0.85], [8, 0]);
  const blur = useTransform(progress, [start * 0.85, end * 0.85], [6, 0]);
  const filter = useTransform(blur, (v) => `blur(${v}px)`);

  return (
    <span className="relative mr-[0.28em] mt-[0.12em]" aria-hidden>
      <motion.span
        className="inline-block text-ink"
        style={{ opacity, y, filter }}
      >
        {children}
      </motion.span>
    </span>
  );
}
