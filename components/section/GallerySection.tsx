"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import {
  galleryAlbums,
  galleryPhotos,
  type GalleryAlbumId,
} from "@/assets/content/common/SiteContent";
import {
  GalleryCard,
  GalleryLightbox,
  Section,
  SectionHeading,
} from "@/components/ui";
import { cn } from "@/utils/helpers/cn";
import { Parallax, Reveal, Stagger, StaggerItem } from "@/components/motion";
import { formatPhotoRange } from "@/utils/helpers/formatPhotoDate";

type GallerySectionProps = {
  className?: string;
  variant?: "preview" | "full";
};

type Filter = GalleryAlbumId | "all";

const PREVIEW_COUNT = 5;

/** The page opens on the first album that has photos in it, not on "All". */
const DEFAULT_FILTER: Filter =
  galleryAlbums.find((album) =>
    galleryPhotos.some((photo) => photo.album === album.id),
  )?.id ?? "all";

/**
 * Editorial rhythm on a 6-column grid: two wide tiles, then three narrow, then
 * repeat. Rows always total six, so nothing is left hanging, and the eye never
 * settles into scanning a uniform table.
 */
function tile(index: number) {
  const step = index % 5;
  return step === 0 || step === 1
    ? { className: "sm:col-span-2 lg:col-span-3", wide: true }
    : { className: "lg:col-span-2", wide: false };
}

export function GallerySection({
  className,
  variant = "preview",
}: GallerySectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [filter, setFilter] = useState<Filter>(DEFAULT_FILTER);

  const photos = useMemo(
    () => [...galleryPhotos].sort((a, b) => b.date.localeCompare(a.date)),
    [],
  );

  /* An album only exists once something is in it */
  const albums = useMemo(
    () => galleryAlbums.filter((album) => photos.some((p) => p.album === album.id)),
    [photos],
  );

  const visible = useMemo(
    () => (filter === "all" ? photos : photos.filter((p) => p.album === filter)),
    [photos, filter],
  );

  if (photos.length === 0) return null;

  const isPreview = variant === "preview";

  /* With a single album there is nothing to switch between, so its own copy
     stands in for the "all" view. */
  const activeAlbum =
    filter === "all"
      ? albums.length === 1
        ? albums[0]
        : null
      : (albums.find((album) => album.id === filter) ?? null);

  const range =
    visible.length > 0
      ? formatPhotoRange(visible.at(-1)!.date, visible[0].date)
      : "";

  /* ---------------------------------------------------------------- */
  /* Preview — a mosaic that reads as a spread, not a card             */
  /* ---------------------------------------------------------------- */
  if (isPreview) {
    const tiles = photos.slice(0, PREVIEW_COUNT);
    const remaining = photos.length - tiles.length;

    return (
      <Section id="gallery" tinted width="wide" className={className}>
        <SectionHeading
          index="05"
          eyebrow="Gallery"
          title="Photos from the work"
          description="Moments from around the job, kept in albums. Training cohorts to start with — travel, work, and project albums as I add them."
          aside={
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted">
              {photos.length} photos
              <span className="mx-2 text-border">/</span>
              {albums.length} {albums.length === 1 ? "album" : "albums"}
            </p>
          }
        />

        <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6" stagger={0.08}>
          {tiles.map((photo, index) => {
            const { className: span, wide } = tile(index);
            const isLast = index === tiles.length - 1;

            return (
              <StaggerItem key={photo.id} className={span}>
                {/* Alternating drift gives the mosaic depth as it scrolls */}
                <Parallax y={index % 2 === 0 ? -14 : 10}>
                  <Link
                    href="/gallery"
                    aria-label={`Open the gallery — ${photo.title}`}
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
                      sizes={wide ? "(max-width: 1024px) 100vw, 640px" : "(max-width: 1024px) 50vw, 380px"}
                      className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                    />

                    <span
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/15 to-transparent"
                    />

                    {isLast && remaining > 0 ? (
                      <span className="absolute inset-0 grid place-items-center bg-ink/60 backdrop-blur-[2px]">
                        <span className="font-display text-3xl font-semibold text-white">
                          +{remaining}
                        </span>
                      </span>
                    ) : (
                      <span className="absolute inset-x-0 bottom-0 p-5 text-left">
                        <span className="block font-display text-base font-semibold tracking-tight text-white">
                          {photo.title}
                        </span>
                      </span>
                    )}
                  </Link>
                </Parallax>
              </StaggerItem>
            );
          })}
        </Stagger>

        <Reveal delay={0.1} className="mt-12">
          <Link
            href="/gallery"
            className="group inline-flex items-center gap-3 font-display text-lg font-semibold text-ink transition-colors hover:text-brand-700 dark:hover:text-brand-400"
          >
            Open the photo gallery
            <span className="grid h-9 w-9 place-items-center rounded-full border border-border transition-all duration-500 group-hover:border-brand-400 group-hover:bg-brand-600 group-hover:text-white">
              <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5" />
            </span>
          </Link>
          <p className="mt-3 font-mono text-xs text-muted">
            Grouped by album, every photo opens full size.
          </p>
        </Reveal>
      </Section>
    );
  }

  /* ---------------------------------------------------------------- */
  /* Full page                                                        */
  /* ---------------------------------------------------------------- */
  return (
    <Section id="gallery" tinted width="wide" className={className}>
      <SectionHeading
        index="05"
        eyebrow="Gallery"
        title="Photos from the work"
        description="Photographs from around the job, grouped into albums. Pick one below, or open any photo full size."
        aside={
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted">
            {visible.length} showing
            <span className="mx-2 text-border">/</span>
            {range}
          </p>
        }
      />

      {albums.length > 1 && (
        <Reveal className="mb-10">
          {/* A filter set, not tabs: `role="tab"` needs owned tabpanels and
              arrow-key roving focus, neither of which exists here. Toggle
              buttons with aria-pressed describe this control honestly. */}
          <div
            role="group"
            aria-label="Filter photos by album"
            className="flex flex-wrap gap-2"
          >
            {([...albums, { id: "all", label: "All" }] as const).map((album) => {
              const id = album.id as Filter;
              const count =
                id === "all"
                  ? photos.length
                  : photos.filter((p) => p.album === id).length;
              const active = filter === id;

              return (
                <button
                  key={id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => {
                    setFilter(id);
                    setOpenIndex(null);
                  }}
                  className={cn(
                    "relative inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition-colors duration-300",
                    active
                      ? "border-transparent text-white"
                      : "border-border bg-surface text-muted hover:border-brand-400 hover:text-ink",
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="gallery-filter-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-brand-600"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  {album.label}
                  <span
                    className={cn(
                      "font-mono text-[11px]",
                      active ? "text-white/70" : "text-muted",
                    )}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {activeAlbum && (
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted">
              {activeAlbum.description}
            </p>
          )}
        </Reveal>
      )}

      {/* key={filter} remounts the list so a new album staggers in */}
      <Stagger
        key={filter}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6"
        stagger={0.06}
      >
        {visible.map((photo, i) => {
          const { className: span, wide } = tile(i);
          return (
            <StaggerItem key={photo.id} className={span}>
              <GalleryCard
                photo={photo}
                index={i}
                wide={wide}
                onOpen={() => setOpenIndex(i)}
              />
            </StaggerItem>
          );
        })}
      </Stagger>

      {activeAlbum?.note && (
        <Reveal className="mt-10">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
            {activeAlbum.note}
          </p>
        </Reveal>
      )}

      <GalleryLightbox
        photos={visible}
        index={openIndex}
        onIndexChange={setOpenIndex}
        onClose={() => setOpenIndex(null)}
      />
    </Section>
  );
}
