"use client";

import { useState } from "react";
import { ArrowRight, BadgeCheck } from "lucide-react";
import { certificates } from "@/assets/content/common/SiteContent";
import {
  CertificateCard,
  CertificateModal,
  Section,
  SectionHeading,
} from "@/components/ui";
import { Reveal, Stagger, StaggerItem, Tilt } from "@/components/motion";
import Link from "next/link";

type CertificatesSectionProps = {
  className?: string;
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
  const latest = certificates
    .map((c) => c.year)
    .sort((a, b) => (a.match(/\d{4}/)?.[0] ?? "").localeCompare(b.match(/\d{4}/)?.[0] ?? ""))
    .at(-1);

  return (
    <Section id="certificates" width="wide" className={className}>
      <SectionHeading
        index="06"
        eyebrow="Certificates"
        title="Proof of the work"
        description={
          isPreview
            ? "Certifications and recognitions I have earned, with the documents to back them up."
            : "Certifications and recognitions I have earned. Open any card to read the document."
        }
        aside={
          <dl className="flex gap-8">
            {[
              { value: count, label: count === 1 ? "Certificate" : "Certificates" },
              { value: issuers, label: issuers === 1 ? "Issuer" : "Issuers" },
              { value: latest, label: "Most recent" },
            ].map((stat) => (
              <div key={stat.label}>
                <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                  {stat.label}
                </dt>
                <dd className="mt-1 font-display text-2xl font-semibold tracking-tight text-ink">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        }
      />

      {isPreview ? (
        <>
          {/* A ruled index rather than a boxed summary — same editorial voice
              as the contact channel list, and it names every credential
              instead of just counting them. */}
          <Stagger className="border-t border-border" stagger={0.08}>
            {certificates.map((certificate) => (
              <StaggerItem key={certificate.id} distance={16}>
                <div className="group flex items-center gap-6 border-b border-border py-6">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-brand-500/12 text-brand-600 transition-transform duration-500 group-hover:scale-110 dark:text-brand-400">
                    <BadgeCheck className="h-5 w-5" />
                  </span>

                  <div className="min-w-0 flex-1">
                    <p className="font-display text-lg font-semibold tracking-tight text-ink">
                      {certificate.title}
                    </p>
                    <p className="mt-1 text-sm text-muted">
                      {certificate.issuer}
                    </p>
                  </div>

                  <span className="shrink-0 font-mono text-xs text-muted">
                    {certificate.year}
                  </span>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal delay={0.1} className="mt-12">
            <Link
              href="/certificates"
              className="group inline-flex items-center gap-3 font-display text-lg font-semibold text-ink transition-colors hover:text-brand-700 dark:hover:text-brand-400"
            >
              View the certificates
              <span className="grid h-9 w-9 place-items-center rounded-full border border-border transition-all duration-500 group-hover:border-brand-400 group-hover:bg-brand-600 group-hover:text-white">
                <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5" />
              </span>
            </Link>
            <p className="mt-3 font-mono text-xs text-muted">
              Each one opens as the original document.
            </p>
          </Reveal>
        </>
      ) : (
        <>
          <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.09}>
            {certificates.map((certificate, i) => (
              <StaggerItem key={certificate.id} className="h-full">
                <Tilt className="h-full" max={6}>
                  <CertificateCard
                    certificate={certificate}
                    onView={() => setOpenIndex(i)}
                  />
                </Tilt>
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
