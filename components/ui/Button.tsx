"use client";

import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/utils/helpers/cn";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";
export type ButtonSize = "sm" | "md" | "lg";

const VARIANTS: Record<ButtonVariant, string> = {
  primary:
    "text-white bg-brand-600 hover:bg-brand-700 shadow-lg shadow-brand-500/25 hover:shadow-xl hover:shadow-brand-500/40 hover:-translate-y-0.5",
  secondary:
    "bg-surface-2 text-ink border border-border hover:border-brand-400 hover:-translate-y-0.5",
  outline:
    "bg-transparent text-ink border border-border hover:bg-surface-2 hover:border-brand-400",
  ghost: "bg-transparent text-muted hover:text-ink hover:bg-surface-2",
};

const SIZES: Record<ButtonSize, string> = {
  sm: "text-sm px-4 py-2 gap-1.5",
  md: "text-sm px-5 py-2.5 gap-2",
  lg: "text-base px-7 py-3.5 gap-2.5",
};

type BaseProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  /** Trailing element, usually an icon. */
  icon?: ReactNode;
};

type ButtonAsButton = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & {
    href?: never;
  };

type ButtonAsLink = BaseProps & {
  href: string;
  external?: boolean;
  /** Forces a plain <a download>. Pass the filename to offer the browser. */
  download?: string | boolean;
};

export type ButtonProps = ButtonAsButton | ButtonAsLink;

/** Renders a <button> normally, or a <Link> when `href` is passed. */
export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  icon,
  ...rest
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center rounded-full font-medium",
    "transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
    "disabled:pointer-events-none disabled:opacity-50",
    VARIANTS[variant],
    SIZES[size],
    className,
  );

  if ("href" in rest && typeof rest.href === "string") {
    const external = "external" in rest && rest.external;
    const download = "download" in rest ? rest.download : undefined;
    const targetProps = external
      ? { target: "_blank", rel: "noopener noreferrer" }
      : null;

    // A download points at a static file, not a route — skip the router.
    if (download !== undefined) {
      return (
        <a
          href={rest.href}
          download={download}
          className={classes}
          {...targetProps}
        >
          {children}
          {icon}
        </a>
      );
    }

    return (
      <Link href={rest.href} className={classes} {...targetProps}>
        {children}
        {icon}
      </Link>
    );
  }

  return (
    <button
      className={classes}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
      {icon}
    </button>
  );
}
