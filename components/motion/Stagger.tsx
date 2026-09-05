"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ElementType, ReactNode } from "react";
import { EASE } from "./config";

type StaggerProps = {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  as?: ElementType;
  /** Deal the last item first — useful for right-aligned rows. */
  reverse?: boolean;
};

export function Stagger({
  children,
  className,
  stagger = 0.09,
  delay = 0,
  as = "div",
  reverse = false,
}: StaggerProps) {
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  const variants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
        staggerDirection: reverse ? -1 : 1,
      },
    },
  };

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
    >
      {children}
    </MotionTag>
  );
}

type StaggerItemProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  /** Travel distance in px. */
  distance?: number;
  /** Blur-up radius; false to keep edges crisp. */
  blur?: number | false;
};

export function StaggerItem({
  children,
  className,
  as = "div",
  distance = 28,
  blur = 8,
}: StaggerItemProps) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;
  const blurPx = reduced || blur === false ? 0 : blur;

  const variants: Variants = {
    hidden: {
      opacity: 0,
      y: reduced ? 0 : distance,
      scale: reduced ? 1 : 0.98,
      filter: blurPx ? `blur(${blurPx}px)` : "blur(0px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: { duration: 0.65, ease: EASE },
    },
  };

  return (
    <MotionTag className={className} variants={variants}>
      {children}
    </MotionTag>
  );
}
