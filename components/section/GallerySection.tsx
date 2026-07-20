"use client";

import { useMemo, useState } from "react";
import { galleryPhotos } from "@/assets/content/common/SiteContent";
import {
  GalleryCard,
  GalleryLightbox,
  Section,
  SectionHeading,
} from "@/components/ui";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";

export function GallerySection({ className }: { className?: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Newest first, so a new cohort added to the content file leads the grid
  // regardless of where in the array it was pasted.
  const photos = useMemo(
    () => [...galleryPhotos].sort((a, b) => b.date.localeCompare(a.date)),
    [],
  );

  if (photos.length === 0) return null;

  const cohorts = photos.length;

  return (
    <Section id="gallery" className={className}>
      <SectionHeading
        eyebrow="Training"
        title="Teaching what I use"
        description="Between 2026 I delivered IC3 digital-literacy certification for GovTech's Digital Program for Hotels and Homestays. These are the cohorts — 200+ participants certified across Thimphu."
      />

      <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.07}>
        {photos.map((photo, i) => (
          <StaggerItem
            key={photo.id}
            // The lead photo and the middle of the grid break the rhythm so
            // ten same-shaped tiles don't read as a contact sheet.
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
          {cohorts} cohorts · 200+ participants certified
        </p>
      </Reveal>

      <GalleryLightbox
        photos={photos}
        index={openIndex}
        onIndexChange={setOpenIndex}
        onClose={() => setOpenIndex(null)}
      />
    </Section>
  );
}
