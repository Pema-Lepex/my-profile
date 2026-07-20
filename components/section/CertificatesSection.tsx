"use client";

import { useState } from "react";
import { ArrowRight, BadgeCheck } from "lucide-react";
import { certificates } from "@/assets/content/common/SiteContent";
import {
  Button,
  Card,
  CertificateCard,
  CertificateModal,
  Section,
  SectionHeading,
} from "@/components/ui";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";

type CertificatesSectionProps = {
  className?: string;
  /**
   * "preview" — the home page: a link through to /certificates, without the
   * documents themselves. "full" — the /certificates route: cards and viewer.
   */
  variant?: "preview" | "full";
};

export function CertificatesSection({
  className,
  variant = "preview",
}: CertificatesSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (certificates.length === 0) return null;

  const isPreview = variant === "preview";
  const count = certificates.length;
  const issuers = new Set(certificates.map((c) => c.issuer)).size;
  // `year` is a free-text field ("2024", "Sept 2023"), so sort on the trailing
  // four digits rather than the whole string.
  const latest = certificates
    .map((c) => c.year)
    .sort((a, b) => (a.match(/\d{4}/)?.[0] ?? "").localeCompare(b.match(/\d{4}/)?.[0] ?? ""))
    .at(-1);

  return (
    <Section id="certificates" className={className}>
      <SectionHeading
        eyebrow="Certificates"
        title="Proof of the work"
        description={
          isPreview
            ? "Certifications and recognitions I have earned, with the documents to back them up."
            : "Certifications and recognitions I have earned. Click any card to read the document."
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
              <BadgeCheck className="h-6 w-6" />
            </span>

            <dl className="mt-8 grid grid-cols-3 gap-4">
              {[
                {
                  value: count,
                  label: count === 1 ? "Certificate" : "Certificates",
                },
                { value: issuers, label: issuers === 1 ? "Issuer" : "Issuers" },
                { value: latest, label: "Most recent" },
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

            {/* Names only — the documents themselves live on /certificates. */}
            <ul className="mx-auto mt-8 max-w-md space-y-1.5">
              {certificates.map((certificate) => (
                <li
                  key={certificate.id}
                  className="text-sm leading-relaxed text-muted"
                >
                  <span className="text-ink-soft">{certificate.title}</span>
                  {" — "}
                  {certificate.issuer}
                </li>
              ))}
            </ul>

            <Button
              href="/certificates"
              size="lg"
              className="mt-7"
              icon={<ArrowRight className="h-4 w-4" />}
            >
              View certificates
            </Button>
          </Card>
        </Reveal>
      ) : (
        <>
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
        </>
      )}
    </Section>
  );
}
