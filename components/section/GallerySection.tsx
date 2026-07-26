"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  galleryAlbums,
  galleryPhotos,
  type GalleryAlbumId,
} from "@/assets/content/common/SiteContent";
import {
  Card,
  GalleryCard,
  GalleryLightbox,
  Section,
  SectionHeading,
} from "@/components/ui";
import { cn } from "@/utils/helpers/cn";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { formatPhotoRange } from "@/utils/helpers/formatPhotoDate";

type GallerySectionProps = {
  className?: string;
  variant?: "preview" | "full";
};

type Filter = GalleryAlbumId | "all";

const PREVIEW_COUNT = 4;

/** The page opens on the first album that has photos in it, not on "All". */
const DEFAULT_FILTER: Filter =
  galleryAlbums.find((album) =>
    galleryPhotos.some((photo) => photo.album === album.id),
  )?.id ?? "all";

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

  if (isPreview) {
    const tiles = photos.slice(0, PREVIEW_COUNT);
    const remaining = photos.length - tiles.length;

    return (
      <Section id="gallery" tinted className={className}>
        <SectionHeading
          eyebrow="Gallery"
          title="Photos from the work"
          description="Moments from around the job, kept in albums. Training cohorts to start with — travel, work, and project albums as I add them."
        />

        <Reveal>
          <Link
            href="/gallery"
            aria-label={`Open the gallery page — ${photos.length} photos`}
            className="group mx-auto block max-w-4xl focus-visible:outline-none"
          >
            <Card spotlight interactive className="overflow-hidden">
              <div className="grid grid-cols-2 gap-px bg-border sm:grid-cols-4">
                {tiles.map((photo, index) => (
                  <div
                    key={photo.id}
                    className="relative aspect-4/3 overflow-hidden bg-surface-2"
                  >
                    <Image
                      src={photo.src}
                      alt={photo.altText}
                      placeholder="blur"
                      sizes="(max-width: 640px) 50vw, 240px"
                      className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                    />
                    {index === tiles.length - 1 && remaining > 0 && (
                      <span className="absolute inset-0 grid place-items-center bg-ink/65 font-display text-xl font-semibold text-white backdrop-blur-[2px]">
                        +{remaining}
                      </span>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-5 border-t border-border p-6 sm:p-7">
                <div className="min-w-0">
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-600 dark:text-brand-400">
                    {albums.map((album) => album.label).join(" · ")} ·{" "}
                    {photos.length} photos
                  </p>
                  <p className="mt-2 font-display text-lg font-semibold tracking-tight text-ink">
                    Open the photo gallery
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-muted">
                    Takes you to the gallery page, where the photos are grouped
                    by album and open full size.
                  </p>
                </div>

                <span className="inline-flex shrink-0 items-center gap-2 rounded-full bg-brand-600 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-brand-500/25 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-0.5 group-hover:bg-brand-700 group-hover:shadow-xl group-hover:shadow-brand-500/40">
                  View the gallery
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </span>
              </div>
            </Card>
          </Link>
        </Reveal>
      </Section>
    );
  }

  return (
    <Section id="gallery" tinted className={className}>
      <SectionHeading
        eyebrow="Gallery"
        title="Photos from the work"
        description="Photographs from around the job, grouped into albums. Pick one below, or open any photo full size."
      />

      <Reveal className="mb-12">
        {albums.length > 1 && (
          <div
            role="tablist"
            aria-label="Photo albums"
            className="mb-6 flex flex-wrap justify-center gap-2"
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
                  role="tab"
                  aria-selected={active}
                  onClick={() => {
                    setFilter(id);
                    setOpenIndex(null);
                  }}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    active
                      ? "border-brand-600 bg-brand-600 text-white shadow-lg shadow-brand-500/25"
                      : "border-border bg-surface text-muted hover:border-brand-400 hover:text-ink",
                  )}
                >
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
        )}

        <div className="mx-auto max-w-2xl text-center">
          {activeAlbum && (
            <>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-600 dark:text-brand-400">
                {activeAlbum.label}
              </p>
              <p className="mt-3 text-base leading-relaxed text-muted">
                {activeAlbum.description}
              </p>
            </>
          )}
          <p className="mt-4 font-mono text-xs uppercase tracking-[0.18em] text-muted">
            {visible.length} photos · {range}
          </p>
        </div>
      </Reveal>

      <Stagger
        key={filter}
        className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        stagger={0.07}
      >
        {visible.map((photo, i) => (
          <StaggerItem
            key={photo.id}
            className={i === 0 || i === 5 ? "sm:col-span-2" : undefined}
          >
            <GalleryCard
              photo={photo}
              index={i}
              wide={i === 0 || i === 5}
              onOpen={() => setOpenIndex(i)}
            />
          </StaggerItem>
        ))}
      </Stagger>

      {activeAlbum?.note && (
        <Reveal className="mt-10 text-center">
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
