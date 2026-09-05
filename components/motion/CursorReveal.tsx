"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/utils/helpers/cn";

type CursorRevealProps = {
  src: string;
  poster: string;
  className?: string;
  /** Diameter of the window in px. */
  size?: number;
  /** Opacity of the footage inside the window. */
  opacity?: number;
};

/**
 * A porthole that follows the cursor and shows footage running underneath the
 * section. Nothing is revealed until the pointer arrives and the window is
 * only ever a few hundred pixels wide, so unlike a background video it cannot
 * wash out a single line of text.
 *
 * Mouse-only by construction: a coarse pointer has no hover state to track, so
 * on touch this renders nothing at all rather than a window stuck mid-screen.
 */
export function CursorReveal({
  src,
  poster,
  className,
  size = 300,
  opacity = 0.55,
}: CursorRevealProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [load, setLoad] = useState(false);

  const x = useMotionValue(-9999);
  const y = useMotionValue(-9999);
  const sx = useSpring(x, { stiffness: 260, damping: 30, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 260, damping: 30, mass: 0.6 });
  const show = useMotionValue(0);
  const sShow = useSpring(show, { stiffness: 180, damping: 26 });

  // The window itself: opaque at the centre, feathered to nothing at the rim.
  const mask = useMotionTemplate`radial-gradient(${size}px circle at ${sx}px ${sy}px, #000 0%, #000 38%, transparent 72%)`;

  useEffect(() => {
    const query = window.matchMedia("(pointer: fine)");
    const sync = () => setEnabled(query.matches && !reduced);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, [reduced]);

  useEffect(() => {
    if (!enabled) return;
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } })
      .connection;
    if (conn?.saveData) return;

    const host = hostRef.current?.parentElement;
    if (!host) return;

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const rect = host.getBoundingClientRect();
      x.set(event.clientX - rect.left);
      y.set(event.clientY - rect.top);
      show.set(1);
      setLoad(true);
    };
    const onLeave = () => show.set(0);

    host.addEventListener("pointermove", onMove, { passive: true });
    host.addEventListener("pointerleave", onLeave);
    return () => {
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled, x, y, show]);

  if (!enabled) return null;

  return (
    <div ref={hostRef} aria-hidden className="contents">
      <motion.div
        className={cn("pointer-events-none absolute inset-0 -z-10", className)}
        style={{
          opacity: sShow,
          maskImage: mask,
          WebkitMaskImage: mask,
        }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${poster})`, opacity }}
        />
        {load && (
          <video
            src={src}
            poster={poster}
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            tabIndex={-1}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ opacity }}
          />
        )}
      </motion.div>
    </div>
  );
}
