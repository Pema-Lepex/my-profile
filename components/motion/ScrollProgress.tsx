"use client";

import { motion, useScroll, useSpring } from "motion/react";

/** A thin gradient bar pinned to the top of the page, tracking scroll depth. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-brand-600 via-glow-400 to-accent-400"
      aria-hidden
    />
  );
}
