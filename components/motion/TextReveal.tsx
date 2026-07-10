"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { cn } from "@/utils/helpers/cn";

type TextRevealProps = {
  text: string;
  className?: string;
  /** Seconds between each word. */
  stagger?: number;
  delay?: number;
};

/** Reveals a headline word by word, each rising out of a clipped line. */
export function TextReveal({
  text,
  className,
  stagger = 0.06,
  delay = 0,
}: TextRevealProps) {
  const reduced = useReducedMotion();
  const words = text.split(" ");

  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };

  const word: Variants = {
    hidden: { y: reduced ? 0 : "110%", opacity: reduced ? 0 : 1 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.span
      className={cn("inline-flex flex-wrap", className)}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      aria-label={text}
    >
      {words.map((w, i) => (
        <span key={`${w}-${i}`} className="overflow-hidden py-[0.1em]" aria-hidden>
          <motion.span className="inline-block pr-[0.25em]" variants={word}>
            {w}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
