"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { cn } from "@/utils/helpers/cn";

type VideoTypeProps = {
  /** The word(s) the footage shows through. Short and wide works best. */
  text: string;
  src: string;
  poster: string;
  className?: string;
  /** Tailwind text-* class supplying the knockout colour (the page behind). */
  plate?: string;
};

const VIEW_W = 1200;
const PAD = 36;

/**
 * Display type with video playing inside the letterforms.
 *
 * The mechanism is a knockout, not a fill: an opaque plate covers the footage
 * everywhere EXCEPT the glyphs, so what shows through the letters is the video
 * underneath. That is the one approach that works with a live <video> —
 * `background-clip: text` cannot take a video as its image.
 *
 * `textLength` pins the word to an exact width, so the layout does not depend
 * on font metrics and cannot reflow when the display face finishes loading.
 */
export function VideoType({
  text,
  src,
  poster,
  className,
  plate = "text-surface",
}: VideoTypeProps) {
  const rawId = useId().replace(/[:]/g, "");
  const maskId = `videotype-${rawId}`;
  const reduced = useReducedMotion();
  const hostRef = useRef<HTMLDivElement>(null);
  const [load, setLoad] = useState(false);

  // Size the glyphs so their natural width lands near the target; textLength
  // then removes the remaining error without visibly distorting them.
  const target = VIEW_W - PAD * 2;
  const fontSize = Math.round(target / (Math.max(text.length, 4) * 0.6));
  const viewH = Math.round(fontSize * 1.18);

  useEffect(() => {
    if (reduced) return;
    if (!window.matchMedia("(min-width: 640px)").matches) return;
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } })
      .connection;
    if (conn?.saveData) return;

    const host = hostRef.current;
    if (!host) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px" },
    );
    observer.observe(host);
    return () => observer.disconnect();
  }, [reduced]);

  return (
    <div ref={hostRef} className={cn("relative w-full overflow-hidden", className)}>
      {/* Real heading for assistive tech and search — the SVG carries none */}
      <h2 className="sr-only">{text}</h2>

      {/* Footage sits underneath; the poster alone is a perfectly good
          still-filled-type treatment when the video is withheld. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${poster})` }}
      />
      {load && (
        <video
          aria-hidden
          src={src}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          tabIndex={-1}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}

      {/* The plate: opaque everywhere the mask is white, cut away at the glyphs */}
      <svg
        aria-hidden
        viewBox={`0 0 ${VIEW_W} ${viewH}`}
        className={cn("relative block w-full", plate)}
        role="presentation"
      >
        <defs>
          <mask id={maskId}>
            <rect width={VIEW_W} height={viewH} fill="white" />
            <text
              x={VIEW_W / 2}
              y={viewH / 2}
              textAnchor="middle"
              dominantBaseline="central"
              textLength={target}
              lengthAdjust="spacingAndGlyphs"
              fontSize={fontSize}
              fontWeight={700}
              letterSpacing="-0.03em"
              style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}
              fill="black"
            >
              {text}
            </text>
          </mask>
        </defs>
        <rect
          width={VIEW_W}
          height={viewH}
          fill="currentColor"
          mask={`url(#${maskId})`}
        />
      </svg>
    </div>
  );
}
