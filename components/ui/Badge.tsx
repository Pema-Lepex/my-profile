import type { ReactNode } from "react";
import { cn } from "@/utils/helpers/cn";

type BadgeProps = {
  children: ReactNode;
  className?: string;
  variant?: "default" | "brand" | "dot";
};

/** Small pill label. `dot` adds a pulsing indicator, for "available" states. */
export function Badge({ children, className, variant = "default" }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium",
        variant === "brand"
          ? "border-brand-500/30 bg-brand-500/10 text-brand-600 dark:text-brand-300"
          : "border-border bg-surface-2 text-muted",
        className,
      )}
    >
      {variant === "dot" && (
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
        </span>
      )}
      {children}
    </span>
  );
}
