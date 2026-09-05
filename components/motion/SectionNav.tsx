"use client";

import { useMemo } from "react";
import { motion } from "motion/react";
import { useActiveSection } from "@/utils/hooks";
import { cn } from "@/utils/helpers/cn";

type SectionNavProps = {
  sections: { id: string; label: string }[];
};

/**
 * A fixed rail of markers showing where the reader is in the page and letting
 * them jump. Only rendered on the long single-scroll home page, and only on
 * screens wide enough that it does not crowd the content.
 */
export function SectionNav({ sections }: SectionNavProps) {
  // useActiveSection rebuilds its IntersectionObserver whenever this array
  // changes identity, so it has to be stable across renders.
  const ids = useMemo(() => sections.map((s) => s.id), [sections]);
  const active = useActiveSection(ids, ids[0]);

  return (
    <nav
      aria-label="Page sections"
      className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 xl:block"
    >
      <ul className="flex flex-col items-end gap-1">
        {sections.map(({ id, label }) => {
          const isActive = active === id;
          return (
            <li key={id}>
              <a
                href={`#${id}`}
                aria-current={isActive ? "true" : undefined}
                className="group flex items-center justify-end gap-3 py-1.5"
              >
                <span
                  className={cn(
                    "font-mono text-[10px] uppercase tracking-[0.16em] transition-all duration-300",
                    isActive
                      ? "text-ink opacity-100"
                      : "text-muted opacity-0 group-hover:opacity-100",
                  )}
                >
                  {label}
                </span>

                <span className="relative grid h-3 w-3 place-items-center">
                  <span
                    className={cn(
                      "block rounded-full transition-all duration-300",
                      isActive
                        ? "h-1.5 w-1.5 bg-brand-600"
                        : "h-1 w-1 bg-muted/50 group-hover:bg-muted",
                    )}
                  />
                  {isActive && (
                    <motion.span
                      layoutId="section-dot-ring"
                      className="absolute inset-0 rounded-full ring-1 ring-brand-500/60"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
