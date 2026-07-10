"use client";

import { motion, useReducedMotion } from "motion/react";

type SkillBarProps = {
  name: string;
  /** Percentage, 0–100. */
  level: number;
  index?: number;
};

/** A labelled proficiency meter that fills when it scrolls into view. */
export function SkillBar({ name, level, index = 0 }: SkillBarProps) {
  const reduced = useReducedMotion();

  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between">
        <span className="text-sm font-medium text-ink">{name}</span>
        <span className="font-mono text-xs text-muted">{level}%</span>
      </div>

      <div
        className="h-1.5 w-full overflow-hidden rounded-full bg-surface-3"
        role="meter"
        aria-valuenow={level}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${name} proficiency`}
      >
        <motion.div
          className="h-full rounded-full bg-brand-600"
          initial={{ width: reduced ? `${level}%` : 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{
            duration: 1.1,
            delay: index * 0.08,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      </div>
    </div>
  );
}
