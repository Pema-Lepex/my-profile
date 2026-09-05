"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { useRef, type ReactNode } from "react";
import { cn } from "@/utils/helpers/cn";
import { SPRING } from "./config";

type TiltProps = {
  children: ReactNode;
  className?: string;
  /** Max rotation in degrees at the corners. */
  max?: number;
  /** Perspective depth — lower is a more dramatic 3D. */
  perspective?: number;
  /** Sweep a light across the surface as the pointer moves. */
  glare?: boolean;
  /** Lift toward the viewer on hover. */
  lift?: number;
};

/**
 * Pointer-tracked 3D tilt. The card leans toward the cursor and springs back
 * on exit; on touch and reduced-motion it renders as a plain box so nobody
 * gets a card stuck mid-rotation.
 */
export function Tilt({
  children,
  className,
  max = 9,
  perspective = 1000,
  glare = true,
  lift = 8,
}: TiltProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  // -0.5 … 0.5 across the card in each axis.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const hover = useMotionValue(0);

  const sx = useSpring(px, SPRING);
  const sy = useSpring(py, SPRING);
  const sHover = useSpring(hover, SPRING);

  const rotateX = useTransform(sy, [-0.5, 0.5], [max, -max]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-max, max]);
  const z = useTransform(sHover, [0, 1], [0, lift]);

  const glareX = useTransform(sx, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(sy, [-0.5, 0.5], ["0%", "100%"]);
  const glareOpacity = useTransform(sHover, [0, 1], [0, 0.5]);
  const glareBg = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgb(255 255 255 / 0.22), transparent 55%)`;

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      // The radius lives on the root so the glare's `rounded-[inherit]`
      // has something to inherit; callers can override it via className.
      className={cn("relative rounded-3xl [transform-style:preserve-3d]", className)}
      style={{ perspective, rotateX, rotateY, z }}
      onPointerMove={(event) => {
        // Coarse pointers report a move on tap; tilting on touch feels broken.
        if (event.pointerType !== "mouse") return;
        const rect = event.currentTarget.getBoundingClientRect();
        px.set((event.clientX - rect.left) / rect.width - 0.5);
        py.set((event.clientY - rect.top) / rect.height - 0.5);
        hover.set(1);
      }}
      onPointerLeave={() => {
        px.set(0);
        py.set(0);
        hover.set(0);
      }}
    >
      {children}

      {glare && (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] mix-blend-overlay"
          style={{ background: glareBg, opacity: glareOpacity }}
        />
      )}
    </motion.div>
  );
}
