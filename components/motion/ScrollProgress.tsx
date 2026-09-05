"use client";

import { motion, useScroll, useSpring, useTransform } from "motion/react";

/**
 * Reading-progress rail across the top of the viewport. It fades in only once
 * the reader has actually left the hero, so it does not sit there at zero.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });
  const opacity = useTransform(scrollYProgress, [0, 0.02], [0, 1]);

  return (
    <motion.div
      style={{ scaleX, opacity }}
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-brand-500 via-brand-600 to-brand-400"
      aria-hidden
    />
  );
}
