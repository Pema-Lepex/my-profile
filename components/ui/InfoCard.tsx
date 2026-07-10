import type { ReactNode } from "react";
import type { IconComponent } from "@/assets";
import { Card } from "./Card";

type InfoCardProps = {
  Icon: IconComponent;
  title: string;
  subtitle: string;
  detail: ReactNode;
};

/** Icon + label + value. Used for the contact grid. */
export function InfoCard({ Icon, title, subtitle, detail }: InfoCardProps) {
  return (
    <Card
      spotlight
      interactive
      className="flex flex-col items-center p-8 text-center"
    >
      <span className="rounded-2xl bg-gradient-to-br from-brand-500/15 to-accent-500/15 p-3.5 text-brand-600 ring-1 ring-brand-500/20 dark:text-brand-400">
        <Icon className="h-5 w-5" />
      </span>

      <h3 className="mt-5 font-display text-lg font-semibold text-ink">
        {title}
      </h3>
      <p className="mt-1 text-xs text-muted">{subtitle}</p>
      <div className="mt-3 text-sm font-medium">{detail}</div>
    </Card>
  );
}
