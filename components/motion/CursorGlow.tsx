"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { SPRING } from "./config";

/**
 * A soft brand-coloured light that trails the cursor behind the page content.
 * Desktop only, and only for pointers that can actually hover — on a phone it
 * would be an invisible tax on every frame.
 */
export function CursorGlow() {
  const reduced = useReducedMotion();
  const [enabled, setEnabled] = useState(false);

  const x = useMotionValue(-500);
  const y = useMotionValue(-500);
  const sx = useSpring(x, { stiffness: 90, damping: 22, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 90, damping: 22, mass: 0.6 });

  useEffect(() => {
    const query = window.matchMedia("(pointer: fine)");
    const sync = () => setEnabled(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!enabled || reduced) return;

    const onMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [enabled, reduced, x, y]);

  if (!enabled || reduced) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed -z-10 h-[30rem] w-[30rem] rounded-full bg-brand-500/12 blur-[90px]"
      style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
      transition={SPRING}
    />
  );
}
