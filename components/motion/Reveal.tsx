"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ElementType, ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "none";

const OFFSET: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 28 },
  down: { x: 0, y: -28 },
  left: { x: 28, y: 0 },
  right: { x: -28, y: 0 },
  none: { x: 0, y: 0 },
};

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Which way the element travels in from. */
  direction?: Direction;
  delay?: number;
  duration?: number;
  /** Render as a different tag — useful for <li>, <section>, etc. */
  as?: ElementType;
  /** Replay the animation every time it scrolls into view. */
  repeat?: boolean;
};

/**
 * Fades and slides its children in when they scroll into view.
 * Collapses to a plain fade when the user prefers reduced motion.
 */
export function Reveal({
  children,
  className,
  direction = "up",
  delay = 0,
  duration = 0.6,
  as = "div",
  repeat = false,
}: RevealProps) {
  const reduced = useReducedMotion();
  const offset = reduced ? OFFSET.none : OFFSET[direction];
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  const variants: Variants = {
    hidden: { opacity: 0, ...offset },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration, delay, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: !repeat, margin: "-80px" }}
    >
      {children}
    </MotionTag>
  );
}
