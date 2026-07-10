"use client";

import { useState } from "react";
import { certificates } from "@/assets/content/common/SiteContent";
import {
  CertificateCard,
  CertificateModal,
  Section,
  SectionHeading,
} from "@/components/ui";
import { Stagger, StaggerItem } from "@/components/motion";

export function CertificatesSection({ className }: { className?: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (certificates.length === 0) return null;

  return (
    <Section id="certificates" tinted className={className}>
      <SectionHeading
        eyebrow="Certificates"
        title="Proof of the work"
        description="Certifications and recognitions I have earned. Click any card to read the document."
      />

      <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {certificates.map((certificate, i) => (
          <StaggerItem key={certificate.id}>
            <CertificateCard
              certificate={certificate}
              onView={() => setOpenIndex(i)}
            />
          </StaggerItem>
        ))}
      </Stagger>

      <CertificateModal
        certificates={certificates}
        index={openIndex}
        onIndexChange={setOpenIndex}
        onClose={() => setOpenIndex(null)}
      />
    </Section>
  );
}
