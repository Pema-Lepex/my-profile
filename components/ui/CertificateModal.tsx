"use client";

import { useCallback, useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  ExternalLink,
  FileWarning,
} from "lucide-react";
import type { Certificate } from "@/types/SiteProps";
import { Button } from "./Button";
import { Modal } from "./Modal";

type CertificateModalProps = {
  certificates: Certificate[];
  /** Index of the open certificate, or null when the dialog is closed. */
  index: number | null;
  onIndexChange: (index: number) => void;
  onClose: () => void;
};

export function CertificateModal({
  certificates,
  index,
  onIndexChange,
  onClose,
}: CertificateModalProps) {
  const open = index !== null;
  const current = open ? certificates[index] : undefined;

  // "checking"  — confirming the PDF exists before embedding it
  // "missing"   — the file 404s; embedding it would render the site's own
  //               404 page inside the viewer, which reads as a broken preview
  // "stalled"   — the iframe never reported a load. Some browsers (notably
  //               iOS Safari) refuse to render PDFs inline and fire nothing.
  type Phase = "checking" | "loading" | "loaded" | "stalled" | "missing";
  const [phase, setPhase] = useState<Phase>("checking");

  const go = useCallback(
    (delta: number) => {
      if (index === null || certificates.length < 2) return;
      onIndexChange((index + delta + certificates.length) % certificates.length);
    },
    [index, certificates.length, onIndexChange],
  );

  const fileUrl = current?.fileUrl;

  // Restart the check whenever the dialog shows a different file. Adjusting
  // state during render keeps `phase` in step with `fileUrl` — an effect would
  // let one frame paint with the previous certificate's phase.
  const [checkedUrl, setCheckedUrl] = useState(fileUrl);
  if (fileUrl && fileUrl !== checkedUrl) {
    setCheckedUrl(fileUrl);
    setPhase("checking");
  }

  // A 404 response still fires the iframe's `load` event, so the file has to be
  // verified *before* it is embedded rather than raced against onLoad.
  useEffect(() => {
    if (!open || !fileUrl || phase !== "checking") return;

    let cancelled = false;
    fetch(fileUrl, { method: "HEAD" })
      .then((r) => {
        if (!cancelled) setPhase(r.ok ? "loading" : "missing");
      })
      .catch(() => {
        if (!cancelled) setPhase("missing");
      });

    return () => {
      cancelled = true;
    };
  }, [open, fileUrl, phase]);

  useEffect(() => {
    if (!open || phase !== "loading") return;
    const timer = setTimeout(() => setPhase("stalled"), 2500);
    return () => clearTimeout(timer);
  }, [open, phase]);

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
      <Modal open={false} onClose={onClose} label="certificate" title="">
        <div />
      </Modal>
    );
  }

  const fileName = `${current.title}.pdf`;
  const multiple = certificates.length > 1;
  const position = certificates.indexOf(current) + 1;

  return (
    <Modal
      open={open}
      onClose={onClose}
      onKeyDown={onKeyDown}
      label="certificate preview"
      title={current.title}
      subtitle={`${current.issuer} · ${current.year}`}
      panelClassName="max-w-5xl"
      actions={
        <Button
          href={current.fileUrl}
          size="sm"
          className="hidden sm:inline-flex"
          icon={<Download className="h-4 w-4" />}
          download={fileName}
        >
          Download
        </Button>
      }
      footer={
        <>
          <a
            href={current.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-mono text-xs text-muted transition-colors hover:text-ink"
          >
            Open in new tab <ExternalLink className="h-3.5 w-3.5" />
          </a>

          {multiple && (
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous certificate"
                className="rounded-full border border-border p-2 text-muted transition-colors hover:border-brand-400 hover:text-ink"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="font-mono text-xs tabular-nums text-muted">
                {position} / {certificates.length}
              </span>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next certificate"
                className="rounded-full border border-border p-2 text-muted transition-colors hover:border-brand-400 hover:text-ink"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </>
      }
    >
      {/* min-height keeps the panel from collapsing when no iframe renders */}
      <div className="relative min-h-[70svh] flex-1 overflow-hidden bg-surface-3">
        {/* Sits *behind* the iframe. A browser that renders the PDF paints
            over it; one that cannot leaves this showing. Never covers the
            preview, so a missing load event can't hide the document. */}
        {phase !== "loaded" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center">
            {phase === "missing" && (
              <>
                <FileWarning className="h-7 w-7 text-muted" aria-hidden />
                <p className="text-sm text-ink-soft">
                  This certificate isn&rsquo;t available right now.
                </p>
                <p className="max-w-sm font-mono text-[11px] text-muted">
                  {current.fileUrl}
                </p>
              </>
            )}

            {phase === "stalled" && (
              <>
                <p className="text-sm text-ink-soft">
                  Your browser can&rsquo;t show PDFs inline.
                </p>
                <Button
                  href={current.fileUrl}
                  size="sm"
                  icon={<Download className="h-4 w-4" />}
                  download={fileName}
                >
                  Download to view
                </Button>
              </>
            )}

            {(phase === "checking" || phase === "loading") && (
              <p className="font-mono text-xs text-muted">
                Loading certificate…
              </p>
            )}
          </div>
        )}

        {/* Browsers render PDFs natively. `key` forces a reload when the
            certificate changes, and #view=FitH fits the page to the width.
            Rendered only once the file is known to exist — a 404 response
            would otherwise embed the site's own 404 page and fire onLoad. */}
        {phase !== "checking" && phase !== "missing" && (
          <iframe
            key={current.fileUrl}
            src={`${current.fileUrl}#view=FitH`}
            title={`${current.title} certificate`}
            onLoad={() => setPhase("loaded")}
            className="relative z-10 h-[70svh] w-full border-0"
          />
        )}
      </div>
    </Modal>
  );
}
