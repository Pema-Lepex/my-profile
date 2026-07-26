import Image from "next/image";
import type { Project } from "@/types/SiteProps";
import { cn } from "@/utils/helpers/cn";

type ProjectMediaProps = {
  project: Project;
  /** Type scale of the designed plate shown when a project has no cover. */
  size?: "sm" | "lg";
  /**
   * Pin the brand mark onto the cover when a project supplies both a `cover`
   * and a `logo`. Turn it off for covers that already show the mark. Has no
   * effect on the designed plate, where the mark is the whole point.
   */
  showLogo?: boolean;
  sizes?: string;
  eager?: boolean;
  className?: string;
};

/* A faint blueprint grid. Kept in `style` rather than an arbitrary utility so
   the two gradients and the tile size stay readable as one unit. */
const GRID = {
  backgroundImage:
    "linear-gradient(to right, rgb(255 255 255 / 0.22) 1px, transparent 1px), linear-gradient(to bottom, rgb(255 255 255 / 0.22) 1px, transparent 1px)",
  backgroundSize: "34px 34px",
};

function monogram(title: string) {
  return title
    .replace(/[^\p{L} ]/gu, " ")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");
}

/**
 * The visual half of a project card. Renders the product shot when there is
 * one, and otherwise a designed plate — brand glow, blueprint grid, mark, and
 * the project name — so a project without a screenshot still looks deliberate.
 */
export function ProjectMedia({
  project,
  size = "sm",
  showLogo = true,
  sizes = "(max-width: 768px) 100vw, 50vw",
  eager = false,
  className,
}: ProjectMediaProps) {
  const { cover, logo, altText, title } = project;

  if (cover) {
    return (
      <div className={cn("relative h-full w-full overflow-hidden bg-surface-3", className)}>
        <Image
          src={cover}
          alt={altText}
          placeholder="blur"
          sizes={sizes}
          loading={eager ? "eager" : "lazy"}
          className="h-full w-full object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
        />
        {/* Keeps the year chip and card edge legible over a bright mockup */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-ink/10 via-transparent to-ink/10 opacity-60"
        />

        {showLogo && logo && (
          <span
            className={cn(
              "absolute left-4 top-4 z-10 grid place-items-center rounded-2xl bg-white/95 shadow-lg shadow-black/15 ring-1 ring-black/5 backdrop-blur transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-0.5",
              size === "lg"
                ? "h-12 w-12 p-2 sm:h-14 sm:w-14 sm:p-2.5"
                : "h-11 w-11 p-1.5 sm:h-12 sm:w-12 sm:p-2",
            )}
          >
            <Image
              src={logo}
              alt=""
              aria-hidden
              className="h-full w-full object-contain"
            />
          </span>
        )}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative h-full w-full overflow-hidden bg-[linear-gradient(150deg,#141b31_0%,#0a0f1e_45%,#06090f_100%)]",
        className,
      )}
    >
      {/* Brand light falls from the top-left, where the mark sits */}
      <div
        aria-hidden
        className="absolute -left-[20%] -top-[60%] h-[150%] w-[85%] rounded-full bg-brand-600/35 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute -bottom-[70%] -right-[15%] h-[140%] w-[75%] rounded-full bg-brand-500/15 blur-3xl"
      />
      <div aria-hidden style={GRID} className="absolute inset-0 opacity-[0.09]" />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/25"
      />

      <div
        className={cn(
          "relative flex h-full w-full flex-col justify-between gap-4",
          size === "lg" ? "p-5 sm:p-7 lg:p-9" : "p-5 sm:p-6",
        )}
      >
        {logo ? (
          <span
            className={cn(
              "grid shrink-0 place-items-center rounded-2xl bg-white shadow-lg shadow-black/20 ring-1 ring-white/20 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1",
              size === "lg"
                ? "h-14 w-14 p-2 sm:h-16 sm:w-16 sm:p-2.5 lg:h-20 lg:w-20 lg:p-3"
                : "h-12 w-12 p-1.5 sm:h-16 sm:w-16 sm:p-2.5",
            )}
          >
            <Image
              src={logo}
              alt=""
              aria-hidden
              className="h-full w-full object-contain"
            />
          </span>
        ) : (
          <span
            className={cn(
              "grid shrink-0 place-items-center rounded-2xl border border-white/15 bg-white/10 font-display font-semibold tracking-tight text-white backdrop-blur transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1",
              size === "lg"
                ? "h-14 w-14 text-lg sm:h-16 sm:w-16 sm:text-xl lg:h-20 lg:w-20 lg:text-2xl"
                : "h-12 w-12 text-base sm:h-16 sm:w-16 sm:text-xl",
            )}
          >
            {monogram(title)}
          </span>
        )}

        {/* Name only — the card body right below already carries the category */}
        <div className="max-w-[92%]">
          <p
            className={cn(
              "font-display font-semibold leading-tight tracking-tight text-white line-clamp-3",
              size === "lg"
                ? "text-xl sm:text-2xl lg:text-3xl xl:text-4xl"
                : "mt-1.5 text-lg sm:text-xl",
            )}
          >
            {title}
          </p>
          <span
            aria-hidden
            className={cn(
              "mt-4 block h-px w-12 bg-brand-500 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-20",
            )}
          />
        </div>
      </div>
    </div>
  );
}
