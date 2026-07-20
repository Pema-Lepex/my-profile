"use client";

import { useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { GalleryPhoto } from "@/types/SiteProps";
import { cn } from "@/utils/helpers/cn";
import { formatPhotoDate } from "@/utils/helpers/formatPhotoDate";
import { Modal } from "./Modal";

type GalleryLightboxProps = {
  photos: GalleryPhoto[];
  /** Index of the open photo, or null when the dialog is closed. */
  index: number | null;
  onIndexChange: (index: number) => void;
  onClose: () => void;
};

export function GalleryLightbox({
  photos,
  index,
  onIndexChange,
  onClose,
}: GalleryLightboxProps) {
  const open = index !== null;
  const current = open ? photos[index] : undefined;

  const go = useCallback(
    (delta: number) => {
      if (index === null || photos.length < 2) return;
      onIndexChange((index + delta + photos.length) % photos.length);
    },
    [index, photos.length, onIndexChange],
  );

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    },
    [go],
  );

  if (!current) {
    // Keep the dialog mounted so AnimatePresence can play the exit animation.
    return (
      <Modal open={false} onClose={onClose} label="photo" title="">
        <div />
      </Modal>
    );
  }

  const multiple = photos.length > 1;
  // `index` is non-null past the guard above, but narrowing doesn't survive
  // into the JSX callbacks — derive the position from the photo instead.
  const position = photos.indexOf(current) + 1;

  return (
    <Modal
      open={open}
      onClose={onClose}
      onKeyDown={onKeyDown}
      label="training photo"
      title={current.title}
      subtitle={`${formatPhotoDate(current.date)} · ${current.location}`}
      panelClassName="max-w-5xl"
      footer={
        <>
          <p className="min-w-0 flex-1 text-sm leading-relaxed text-muted">
            {current.note ?? current.location}
          </p>

          {multiple && (
            <div className="flex shrink-0 items-center gap-3">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous photo"
                className="rounded-full border border-border p-2 text-muted transition-colors hover:border-brand-400 hover:text-ink"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="font-mono text-xs tabular-nums text-muted">
                {position} / {photos.length}
              </span>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next photo"
                className="rounded-full border border-border p-2 text-muted transition-colors hover:border-brand-400 hover:text-ink"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </>
      }
    >
      <div className="relative grid flex-1 place-items-center overflow-hidden bg-surface-3">
        <Image
          // `key` restarts the blur-up transition when the photo changes;
          // without it React reuses the <img> and the new source pops in.
          key={current.id}
          src={current.src}
          alt={current.altText}
          placeholder="blur"
          sizes="(max-width: 1024px) 100vw, 1024px"
          className="max-h-[68svh] w-full object-contain"
        />
      </div>

      {multiple && (
        <div className="shrink-0 border-t border-border bg-surface px-4 py-3">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {photos.map((photo, i) => (
              <button
                key={photo.id}
                type="button"
                onClick={() => onIndexChange(i)}
                aria-label={`View ${photo.title}`}
                aria-current={i === index}
                className={cn(
                  "relative h-12 w-16 shrink-0 overflow-hidden rounded-lg border-2 transition-all duration-300",
                  i === index
                    ? "border-brand-500 opacity-100"
                    : "border-transparent opacity-50 hover:opacity-100",
                )}
              >
                <Image
                  src={photo.src}
                  alt=""
                  sizes="64px"
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </Modal>
  );
}
