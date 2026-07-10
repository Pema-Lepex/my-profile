"use client";

import { useState } from "react";
import Image from "next/image";
import { Eye, FileText } from "lucide-react";
import type { Certificate } from "@/types/SiteProps";
import { Card } from "./Card";

type CertificateCardProps = {
  certificate: Certificate;
  onView: () => void;
};

export function CertificateCard({
  certificate,
  onView,
}: CertificateCardProps) {
  const { title, issuer, year, thumbnailUrl } = certificate;
  const [imageFailed, setImageFailed] = useState(false);
  const showImage = Boolean(thumbnailUrl) && !imageFailed;

  return (
    <Card spotlight interactive className="group h-full overflow-hidden">
      <button
        type="button"
        onClick={onView}
        aria-haspopup="dialog"
        aria-label={`View ${title} certificate`}
        className="flex h-full w-full flex-col text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
      >
        {/* Preview */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface-2">
          {showImage ? (
            <Image
              src={thumbnailUrl!}
              alt={`${title} certificate preview`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
              className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
              onError={() => setImageFailed(true)}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-brand-500/10 to-accent-500/10">
              <FileText
                className="h-10 w-10 text-brand-600/70 dark:text-brand-400/70"
                aria-hidden
              />
            </div>
          )}

          {/* Hover veil */}
          <div className="absolute inset-0 flex items-center justify-center bg-ink/50 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
            <span className="inline-flex items-center gap-2 rounded-full bg-surface px-4 py-2 font-mono text-xs font-medium text-ink shadow-lg">
              <Eye className="h-3.5 w-3.5" /> View
            </span>
          </div>

          <span className="absolute left-3 top-3 rounded-md bg-surface/90 px-2 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-muted">
            PDF
          </span>
        </div>

        {/* Meta */}
        <div className="flex flex-1 flex-col p-5">
          <p className="font-display text-sm font-semibold leading-snug text-ink">
            {title}
          </p>
          <p className="mt-1 text-xs text-muted">{issuer}</p>
          <p className="mt-auto pt-3 font-mono text-[11px] text-muted">{year}</p>
        </div>
      </button>
    </Card>
  );
}
