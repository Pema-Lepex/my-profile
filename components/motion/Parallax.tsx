"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useRef, type ReactNode } from "react";
import { SPRING_SOFT } from "./config";

type ParallaxProps = {
  children: ReactNode;
  className?: string;
  /**
   * Vertical travel in px across the element's full scroll pass. Negative
   * drifts upward (reads as "closer" than the page), positive drags behind.
   */
  y?: number;
  /** Horizontal drift in px, same convention. */
  x?: number;
  /** Scale at the start of the pass; settles at 1 by the centre. */
  scaleFrom?: number;
  /** Degrees of rotation across the pass. */
  rotate?: number;
  /** Fade in on approach and back out on exit. */
  fade?: boolean;
  /** Spring-smooth the scroll input. Off = locked to the scrollbar. */
  smooth?: boolean;
  /** Never clip the transformed child. */
  as?: "div" | "span";
};

/**
 * Ties a child's transform to how far the element has travelled through the
 * viewport, rather than firing once on entry. This is the difference between
 * "things fade in" and the depth you feel on a well-built marketing page.
 */
export function Parallax({
  children,
  className,
  y = 0,
  x = 0,
  scaleFrom,
  rotate = 0,
  fade = false,
  smooth = true,
  as = "div",
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Spring the raw 0→1 so fast flicks glide instead of snapping.
  const smoothed = useSpring(scrollYProgress, SPRING_SOFT);
  const progress = smooth ? smoothed : scrollYProgress;

  const off = reduced ? 0 : 1;

  const ty = useTransform(progress, [0, 1], [y * off, -y * off]);
  const tx = useTransform(progress, [0, 1], [x * off, -x * off]);
  const rot = useTransform(progress, [0, 1], [rotate * off, -rotate * off]);
  const scale = useTransform(
    progress,
    [0, 0.5, 1],
    scaleFrom && !reduced ? [scaleFrom, 1, scaleFrom] : [1, 1, 1],
  );
  const opacity = useTransform(
    progress,
    [0, 0.22, 0.78, 1],
    fade && !reduced ? [0, 1, 1, 0] : [1, 1, 1, 1],
  );

  const MotionTag = as === "span" ? motion.span : motion.div;

  return (
    <MotionTag
      ref={ref}
      className={className}
      style={{ y: ty, x: tx, rotate: rot, scale, opacity }}
    >
      {children}
    </MotionTag>
  );
}
