"use client";

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
} from "motion/react";
import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/utils/helpers/cn";

type VelocityMarqueeProps = {
  children: ReactNode;
  className?: string;
  /** Baseline drift in % of the track per second. Sign sets resting direction. */
  baseVelocity?: number;
  /** How hard scrolling pushes the belt. */
  sensitivity?: number;
};

/**
 * A marquee that answers the scroll wheel: it drifts on its own, accelerates
 * with the page, and flips direction when the reader scrolls back up. The row
 * stops being decoration and becomes feedback.
 *
 * Children are rendered four times so the belt never runs out of track at the
 * speeds a fast flick produces.
 */
export function VelocityMarquee({
  children,
  className,
  baseVelocity = 3,
  sensitivity = 4,
}: VelocityMarqueeProps) {
  const reduced = useReducedMotion();
  const baseX = useMotionValue(0);

  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(
    smoothVelocity,
    [0, 1000],
    [0, sensitivity],
    { clamp: false },
  );

  // Four copies -> one copy is 25% of the track.
  const x = useTransform(baseX, (v) => `${wrap(-25, -50, v)}%`);
  const direction = useRef(1);

  // A belt that is scrolled past should not keep burning frames.
  const hostRef = useRef<HTMLDivElement>(null);
  const onScreen = useRef(true);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const observer = new IntersectionObserver(
      (entries) => {
        onScreen.current = entries.some((e) => e.isIntersecting);
      },
      { rootMargin: "100px" },
    );
    observer.observe(host);
    return () => observer.disconnect();
  }, []);

  useAnimationFrame((_, delta) => {
    if (reduced || !onScreen.current) return;

    let moveBy = direction.current * baseVelocity * (delta / 1000);

    const factor = velocityFactor.get();
    if (factor < 0) direction.current = -1;
    else if (factor > 0) direction.current = 1;

    moveBy += direction.current * moveBy * Math.abs(factor);
    baseX.set(baseX.get() + moveBy);
  });

  if (reduced) {
    return (
      <div className={cn("mask-edges overflow-hidden", className)}>
        <div className="flex w-max gap-4">{children}</div>
      </div>
    );
  }

  // The wrap window is exactly 25% of the track, so one copy has to be exactly
  // a quarter of the width. That means NO gap on the outer flex row — the
  // trailing space lives inside each copy (`pr-4`) instead, otherwise the belt
  // jumps by three-quarters of a gap on every cycle.
  return (
    <div ref={hostRef} className={cn("mask-edges overflow-hidden", className)}>
      <motion.div className="flex w-max flex-nowrap" style={{ x }}>
        {/* aria-hidden on the clones: the belt reads once to a screen reader */}
        <div className="flex shrink-0 gap-4 pr-4">{children}</div>
        <div className="flex shrink-0 gap-4 pr-4" aria-hidden>{children}</div>
        <div className="flex shrink-0 gap-4 pr-4" aria-hidden>{children}</div>
        <div className="flex shrink-0 gap-4 pr-4" aria-hidden>{children}</div>
      </motion.div>
    </div>
  );
}
