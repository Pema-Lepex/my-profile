import type { ReactNode } from "react";
import { cn } from "@/utils/helpers/cn";
import { Spotlight } from "@/components/motion";

type CardProps = {
  children: ReactNode;
  className?: string;
  /** Adds the cursor-following radial glow. */
  spotlight?: boolean;
  /** Lifts the card and brightens its border on hover. */
  interactive?: boolean;
};

/** The base surface every panel on the site is built from. */
export function Card({
  children,
  className,
  spotlight = false,
  interactive = false,
}: CardProps) {
  const classes = cn(
    "rounded-3xl border border-border bg-surface",
    interactive &&
      "transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-brand-400/60 hover:shadow-2xl hover:shadow-brand-500/10",
    className,
  );

  if (spotlight) {
    return <Spotlight className={classes}>{children}</Spotlight>;
  }

  return <div className={classes}>{children}</div>;
}
