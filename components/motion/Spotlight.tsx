"use client";

import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/utils/helpers/cn";

type SpotlightProps = {
  children: ReactNode;
  className?: string;
  /** Radius of the glow, in pixels. */
  size?: number;
};

/**
 * A card surface with a soft radial glow that follows the cursor.
 * The glow is a sibling layer, so it never repaints the content beneath it.
 */
export function Spotlight({ children, className, size = 380 }: SpotlightProps) {
  const mouseX = useMotionValue(-9999);
  const mouseY = useMotionValue(-9999);

  const background = useMotionTemplate`radial-gradient(${size}px circle at ${mouseX}px ${mouseY}px, rgb(37 99 235 / 0.14), transparent 70%)`;

  return (
    <div
      className={cn("group relative overflow-hidden", className)}
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        mouseX.set(event.clientX - rect.left);
        mouseY.set(event.clientY - rect.top);
      }}
      onPointerLeave={() => {
        mouseX.set(-9999);
        mouseY.set(-9999);
      }}
    >
      <motion.div
        aria-hidden
        style={{ background }}
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />
      {children}
    </div>
  );
}
