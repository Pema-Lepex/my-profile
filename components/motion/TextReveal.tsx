"use client";

import { Fragment } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { cn } from "@/utils/helpers/cn";
import { EASE } from "./config";

type TextRevealProps = {
  text: string;
  className?: string;
  stagger?: number;
  delay?: number;
  /**
   * `char` is for short, poster-scale strings — a name, a two-word CTA. Long
   * multi-word headings should stay on `word`: 25+ independently animated
   * letters is visual noise, and every one of them is a box the line breaker
   * has to place.
   */
  by?: "word" | "char";
  /** Fire on mount rather than on scroll — for above-the-fold headlines. */
  immediate?: boolean;
};

/**
 * Type that rises out of a clipped line box, one unit at a time.
 *
 * Layout is deliberately plain inline flow, NOT flexbox. An earlier flex
 * version let the line breaker put a single letter on each line once the
 * container got narrow, because flex items with `overflow: hidden` get an
 * automatic minimum size of zero and will happily shrink to nothing. Normal
 * inline flow wraps between words the way text is supposed to, and
 * `whitespace-nowrap` on each word makes breaking inside a word impossible.
 */
export function TextReveal({
  text,
  className,
  stagger = 0.055,
  delay = 0,
  by = "word",
  immediate = false,
}: TextRevealProps) {
  const reduced = useReducedMotion();
  const words = text.split(" ");

  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };

  const unit: Variants = {
    hidden: { y: reduced ? 0 : "115%", opacity: reduced ? 0 : 1 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: EASE },
    },
  };

  const animationProps = immediate
    ? { animate: "visible" as const }
    : {
        whileInView: "visible" as const,
        viewport: { once: true, margin: "-60px" },
      };

  return (
    <motion.span
      // `text-wrap:normal` cancels the `balance` that headings inherit from
      // globals.css. Balancing a line made of atomic inline boxes gives the
      // browser nothing useful to do and skews the break points.
      className={cn("[text-wrap:normal]", className)}
      variants={container}
      initial="hidden"
      {...animationProps}
      aria-label={text}
    >
      {words.map((word, wi) => (
        <Fragment key={`${word}-${wi}`}>
          <span
            /* inline-block => one atomic, unbreakable box per word.
               pb/-mb pair gives descenders room inside the clip window
               without inflating the line height. */
            className="inline-block overflow-hidden whitespace-nowrap pb-[0.14em] -mb-[0.14em] align-bottom"
            aria-hidden
          >
            {by === "char" ? (
              word.split("").map((char, ci) => (
                <motion.span
                  key={`${char}-${ci}`}
                  className="inline-block"
                  variants={unit}
                >
                  {char}
                </motion.span>
              ))
            ) : (
              <motion.span className="inline-block" variants={unit}>
                {word}
              </motion.span>
            )}
          </span>
          {/* A real space, so the line breaker and copy-paste both behave */}
          {wi < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </motion.span>
  );
}
