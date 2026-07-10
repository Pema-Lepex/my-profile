import { useEffect, useState } from "react";

/**
 * Tracks which section id is currently the most visible in the viewport,
 * so the nav can highlight it. Falls back to the first id.
 *
 * `initialId` seeds the value for the first paint. A standalone section route
 * renders only its own section, so without it the nav would briefly highlight
 * "Home" before the observer fires.
 */
export function useActiveSection(ids: string[], initialId?: string) {
  const [active, setActive] = useState(initialId ?? ids[0] ?? "");

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const visibility = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visibility.set(entry.target.id, entry.intersectionRatio);
        }

        let best = "";
        let bestRatio = 0;
        for (const [id, ratio] of visibility) {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            best = id;
          }
        }
        if (best) setActive(best);
      },
      {
        // Discount the sticky header, and sample at many thresholds so tall
        // sections still report a meaningful ratio.
        rootMargin: "-80px 0px -40% 0px",
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}
