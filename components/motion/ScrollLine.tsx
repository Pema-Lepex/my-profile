"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { useRef } from "react";
import { cn } from "@/utils/helpers/cn";
import { SPRING_SOFT } from "./config";

type ScrollLineProps = {
  className?: string;
  /** Horizontal rule instead of vertical. */
  horizontal?: boolean;
};

/**
 * A rail that draws itself as the reader moves down the block it sits in.
 * Stretch it over a relatively-positioned parent — it measures its own box, so
 * the fill tracks that parent's height with no ref plumbing.
 */
export function ScrollLine({ className, horizontal = false }: ScrollLineProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();

  // Starts filling once the block reaches the lower third and completes just
  // before it leaves the top, so the head sits near the line being read.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 55%"],
  });
  const scale = useSpring(scrollYProgress, SPRING_SOFT);

  return (
    <span
      ref={ref}
      aria-hidden
      className={cn(
        "pointer-events-none absolute overflow-hidden bg-border",
        horizontal ? "inset-x-0 h-px" : "inset-y-0 w-px",
        className,
      )}
    >
      <motion.span
        className={cn(
          "absolute inset-0 block bg-gradient-to-b from-brand-500 to-brand-600",
          horizontal && "bg-gradient-to-r",
        )}
        style={
          reduced
            ? undefined
            : horizontal
              ? { scaleX: scale, originX: 0 }
              : { scaleY: scale, originY: 0 }
        }
      />
    </span>
  );
}
