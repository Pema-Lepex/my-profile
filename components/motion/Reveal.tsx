"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ElementType, ReactNode } from "react";
import { EASE } from "./config";

type Direction = "up" | "down" | "left" | "right" | "none";

const AXIS: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 1 },
  down: { x: 0, y: -1 },
  left: { x: 1, y: 0 },
  right: { x: -1, y: 0 },
  none: { x: 0, y: 0 },
};

type RevealProps = {
  children: ReactNode;
  className?: string;
  direction?: Direction;
  delay?: number;
  duration?: number;
  as?: ElementType;
  repeat?: boolean;
  /** Travel distance in px. */
  distance?: number;
  /** Blur-up entrance — the depth-of-field pull modern sites open with. */
  blur?: number | false;
  /** Start scale; 0.96 gives a subtle "settle into place". */
  scale?: number;
  /** How far into the viewport before it fires. */
  margin?: string;
};

export function Reveal({
  children,
  className,
  direction = "up",
  delay = 0,
  duration = 0.7,
  as = "div",
  repeat = false,
  distance = 32,
  blur = 8,
  scale,
  margin = "-80px",
}: RevealProps) {
  const reduced = useReducedMotion();
  const axis = reduced ? AXIS.none : AXIS[direction];
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  const blurPx = reduced || blur === false ? 0 : blur;

  const variants: Variants = {
    hidden: {
      opacity: 0,
      x: axis.x * distance,
      y: axis.y * distance,
      scale: reduced ? 1 : (scale ?? 1),
      filter: blurPx ? `blur(${blurPx}px)` : "blur(0px)",
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: { duration, delay, ease: EASE },
    },
  };

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: !repeat, margin }}
    >
      {children}
    </MotionTag>
  );
}

type MaskRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  /** Direction the covering wipe travels away in. */
  from?: "bottom" | "top" | "left" | "right";
};

const CLIP: Record<string, string> = {
  bottom: "inset(100% 0% 0% 0%)",
  top: "inset(0% 0% 100% 0%)",
  left: "inset(0% 100% 0% 0%)",
  right: "inset(0% 0% 0% 100%)",
};

/**
 * Wipes content into view behind a moving edge instead of fading it. Reads as
 * more deliberate than opacity for images and headline blocks.
 */
export function MaskReveal({
  children,
  className,
  delay = 0,
  duration = 1,
  from = "bottom",
}: MaskRevealProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={{ clipPath: reduced ? "inset(0% 0% 0% 0%)" : CLIP[from] }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
      // `amount: 0` with no negative margin: this wipe hides real content
      // (project screenshots), so it must uncover on the first pixel of
      // intersection. A delayed trigger here does not read as a subtler
      // animation, it reads as a missing image.
      viewport={{ once: true, amount: 0 }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
