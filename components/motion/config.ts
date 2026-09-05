/**
 * Shared motion vocabulary.
 *
 * Every animation on the site pulls its easing and spring from here so the
 * whole page decelerates with the same "feel" — the thing that separates a
 * site that looks animated from one that looks designed.
 */

/** The house curve: fast out of the gate, long soft landing. */
export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Gentler cousin, for long scroll-linked moves that should not overshoot. */
export const EASE_SOFT: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** Snappy — pills, toggles, pointer follow. */
export const SPRING = { stiffness: 260, damping: 30, mass: 0.7 } as const;

/** Heavy — scroll progress bars and parallax smoothing. */
export const SPRING_SOFT = { stiffness: 90, damping: 26, mass: 1 } as const;

/** Scroll pass covering the moment an element enters until it leaves. */
export const SCROLL_PASS = ["start end", "end start"] as const;

/** Scroll pass that finishes once the element is centred. */
export const SCROLL_ENTER = ["start end", "center center"] as const;
