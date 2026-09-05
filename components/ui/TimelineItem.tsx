"use client";

import { Briefcase, GraduationCap } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import type { TimelineEntry } from "@/assets/content/common/SiteContent";
import { cn } from "@/utils/helpers/cn";
import { EASE } from "@/components/motion";
import { Badge } from "./Badge";

type TimelineItemProps = {
  entry: TimelineEntry;
  last?: boolean;
};

/**
 * One stop on the timeline. The connecting rail is drawn by the parent's
 * <ScrollLine> so it can fill continuously with the reader's position rather
 * than restarting at every entry.
 */
export function TimelineItem({ entry, last }: TimelineItemProps) {
  const { role, org, period, current, description, highlights, kind } = entry;
  const Icon = kind === "education" ? GraduationCap : Briefcase;
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={cn("relative flex gap-6", last ? "pb-0" : "pb-14")}
      initial={{ opacity: 0, y: reduced ? 0 : 30, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-90px" }}
      transition={{ duration: 0.7, ease: EASE }}
    >
      {/* Node sits on top of the rail, so it needs the surface fill */}
      <motion.span
        className="relative z-10 grid h-11 w-11 shrink-0 place-items-center rounded-full border border-border bg-surface text-brand-700 dark:text-brand-400"
        initial={{ scale: reduced ? 1 : 0.4 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "-90px" }}
        transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
      >
        <Icon className="h-[18px] w-[18px]" />
        {current && (
          <span className="absolute -right-0.5 -top-0.5 flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-surface" />
          </span>
        )}
      </motion.span>

      <div className="flex-1 pt-1">
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="font-display text-xl font-semibold tracking-tight text-ink">
            {role}
          </h3>
          {current && <Badge variant="brand">Current</Badge>}
        </div>

        <p className="mt-1.5 text-sm text-muted">
          <span className="font-medium text-ink-soft">{org}</span>
          <span className="mx-2 text-border">•</span>
          <span className="font-mono text-xs">{period}</span>
        </p>

        <p className="mt-4 text-[15px] leading-relaxed text-muted">
          {description}
        </p>

        <ul className="mt-5 space-y-2.5">
          {highlights.map((item, i) => (
            <motion.li
              key={item}
              className="flex gap-3 text-sm text-muted"
              initial={{ opacity: 0, x: reduced ? 0 : -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45, delay: 0.15 + i * 0.07, ease: EASE }}
            >
              <span
                aria-hidden
                className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-brand-600"
              />
              {item}
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
