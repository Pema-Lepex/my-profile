"use client";

import { useMemo, useState } from "react";
import { ArrowRight, Images } from "lucide-react";
import { galleryPhotos } from "@/assets/content/common/SiteContent";
import {
  Button,
  Card,
  GalleryCard,
  GalleryLightbox,
  Section,
  SectionHeading,
} from "@/components/ui";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { formatPhotoRange } from "@/utils/helpers/formatPhotoDate";

type GallerySectionProps = {
  className?: string;
  /**
   * "preview" — the home page: a link through to /gallery, deliberately
   * without the photos. "full" — the /gallery route: the grid and lightbox.
   */
  variant?: "preview" | "full";
};

export function GallerySection({
  className,
  variant = "preview",
}: GallerySectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Newest first, so a new cohort added to the content file leads the grid
  // regardless of where in the array it was pasted.
  const photos = useMemo(
    () => [...galleryPhotos].sort((a, b) => b.date.localeCompare(a.date)),
    [],
  );

  if (photos.length === 0) return null;

  const isPreview = variant === "preview";
  const range = formatPhotoRange(photos.at(-1)!.date, photos[0].date);

  return (
    <Section id="gallery" className={className}>
      <SectionHeading
        eyebrow="Training"
        title="Teaching what I use"
        description={
          isPreview
            ? "Alongside building software I trained 200+ people to IC3 digital-literacy certification for GovTech's Digital Program for Hotels and Homestays."
            : "Between 2026 I delivered IC3 digital-literacy certification for GovTech's Digital Program for Hotels and Homestays. These are the cohorts — 200+ participants certified across Thimphu."
        }
      />

      {isPreview ? (
        <Reveal>
          <Card
            spotlight
            interactive
            className="mx-auto max-w-3xl overflow-hidden p-8 text-center sm:p-12"
          >
            <span
              aria-hidden
              className="mx-auto grid h-14 w-14 place-items-center rounded-2xl border border-border bg-surface-2 text-brand-600 dark:text-brand-400"
            >
              <Images className="h-6 w-6" />
            </span>

            <dl className="mt-8 grid grid-cols-3 gap-4">
              {[
                { value: photos.length, label: "Cohorts" },
                { value: "200+", label: "Certified" },
                { value: range, label: "Delivered" },
              ].map((stat) => (
                <div key={stat.label}>
                  <dt className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                    {stat.value}
                  </dt>
                  <dd className="mt-1 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                    {stat.label}
                  </dd>
                </div>
              ))}
            </dl>

            <p className="mx-auto mt-8 max-w-md text-sm leading-relaxed text-muted">
              Photos from every cohort — group shots from certification day
              across Thimphu.
            </p>

            <Button
              href="/gallery"
              size="lg"
              className="mt-7"
              icon={<ArrowRight className="h-4 w-4" />}
            >
              View the gallery
            </Button>
          </Card>
        </Reveal>
      ) : (
        <>
          <Stagger
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
            stagger={0.07}
          >
            {photos.map((photo, i) => (
              <StaggerItem
                key={photo.id}
                // The lead photo and the middle of the grid break the rhythm
                // so ten same-shaped tiles don't read as a contact sheet.
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

          <Reveal className="mt-10 text-center">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
              {photos.length} cohorts · 200+ participants certified
            </p>
          </Reveal>

          <GalleryLightbox
            photos={photos}
            index={openIndex}
            onIndexChange={setOpenIndex}
            onClose={() => setOpenIndex(null)}
          />
        </>
      )}
    </Section>
  );
}
