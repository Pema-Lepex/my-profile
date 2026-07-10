import type { ReactNode } from "react";
import { cn } from "@/utils/helpers/cn";
import { Reveal } from "@/components/motion";

type SectionProps = {
  id: string;
  children: ReactNode;
  className?: string;
  /** Tints the section background to separate it from its neighbours. */
  tinted?: boolean;
};

/** A full-width page section with a consistent max width and vertical rhythm. */
export function Section({ id, children, className, tinted }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative scroll-mt-24 py-20 sm:py-28",
        tinted && "bg-surface-2",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-6xl px-6">{children}</div>
    </section>
  );
}

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        "mb-14 max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <p className="mb-3 font-mono text-xs font-medium uppercase tracking-[0.2em] text-brand-600 dark:text-brand-400">
        {eyebrow}
      </p>
      <h2 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-muted">{description}</p>
      )}
    </Reveal>
  );
}
