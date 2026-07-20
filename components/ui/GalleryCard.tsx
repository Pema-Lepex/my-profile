"use client";

import Image from "next/image";
import { Expand } from "lucide-react";
import type { GalleryPhoto } from "@/types/SiteProps";
import { cn } from "@/utils/helpers/cn";
import { formatPhotoDate } from "@/utils/helpers/formatPhotoDate";

type GalleryCardProps = {
  photo: GalleryPhoto;
  onOpen: () => void;
  /** Feature tiles run wider, so they get a wider aspect ratio to match.
      The column span itself lives on the grid child in GallerySection. */
  wide?: boolean;
  /** Position in the grid, used for the loading strategy. */
  index: number;
};

export function GalleryCard({ photo, onOpen, wide, index }: GalleryCardProps) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`View photo: ${photo.title}, ${formatPhotoDate(photo.date)}`}
      className={cn(
        "group relative block w-full overflow-hidden rounded-3xl border border-border bg-surface-2",
        "transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
        "hover:-translate-y-1 hover:border-brand-400/60 hover:shadow-2xl hover:shadow-brand-500/10",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500",
        wide ? "aspect-16/10" : "aspect-4/3",
      )}
    >
      <Image
        src={photo.src}
        alt={photo.altText}
        placeholder="blur"
        // The grid is 1 column on mobile, 2 on sm, 3 on lg inside a 6xl shell.
        sizes={
          wide
            ? "(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 768px"
            : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 384px"
        }
        // The first row is likely above the fold; the rest can wait.
        loading={index < 3 ? "eager" : "lazy"}
        className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
      />

      {/* Scrim: always faintly present so the caption stays legible, and
          deepened on hover. Sits under the caption, over the photo. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100"
      />

      <span
        aria-hidden
        className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-white/15 text-white opacity-0 backdrop-blur-md transition-all duration-500 group-hover:opacity-100 group-focus-visible:opacity-100"
      >
        <Expand className="h-4 w-4" />
      </span>

      <div className="absolute inset-x-0 bottom-0 p-5 text-left">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/70">
          {formatPhotoDate(photo.date)}
        </p>
        <h3 className="mt-1.5 font-display text-lg font-semibold tracking-tight text-white">
          {photo.title}
        </h3>
        {/* Revealed on hover — keeps the resting grid calm. */}
        <p className="mt-1 max-h-0 overflow-hidden text-sm text-white/75 opacity-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:max-h-12 group-hover:opacity-100">
          {photo.location}
        </p>
      </div>
    </button>
  );
}
