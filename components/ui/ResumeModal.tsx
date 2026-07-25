"use client";

import { useEffect, useRef, useState } from "react";
import { Download, ExternalLink, Loader2 } from "lucide-react";
import { Button } from "./Button";
import { Modal } from "./Modal";

type ResumeModalProps = {
  open: boolean;
  onClose: () => void;
  fileUrl: string;
  fileName: string;
};

type Status = "loading" | "ready" | "error";

export function ResumeModal({
  open,
  onClose,
  fileUrl,
  fileName,
}: ResumeModalProps) {
  const [status, setStatus] = useState<Status>("loading");
  const viewportRef = useRef<HTMLDivElement>(null);

  const [wasOpen, setWasOpen] = useState(open);
  if (open !== wasOpen) {
    setWasOpen(open);
    if (open) setStatus("loading");
  }

  useEffect(() => {
    if (!open) return;

    let cancelled = false;

    (async () => {
      try {
        const [{ renderAsync }, response] = await Promise.all([
          import("docx-preview"),
          fetch(fileUrl),
        ]);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const blob = await response.blob();
        const container = viewportRef.current;
        if (cancelled || !container) return;

        container.replaceChildren();
        await renderAsync(blob, container, undefined, {
          className: "docx",
          inWrapper: true,
          ignoreWidth: false,
          ignoreHeight: true,
          breakPages: true,
          renderHeaders: true,
          renderFooters: true,
        });

        if (!cancelled) setStatus("ready");
      } catch {
        if (!cancelled) setStatus("error");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [open, fileUrl]);

  useEffect(() => {
    if (!open || status !== "ready") return;

    const container = viewportRef.current;
    const wrapper = container?.querySelector<HTMLElement>(".docx-wrapper");
    const page = container?.querySelector<HTMLElement>("section.docx");
    if (!container || !wrapper || !page) return;

    const pageWidth = page.offsetWidth;
    if (!pageWidth) return;

    const fit = () => {
      const available = container.clientWidth;
      wrapper.style.zoom = `${Math.min(1, available / pageWidth)}`;
    };

    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(container);
    return () => observer.disconnect();
  }, [open, status]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      label="résumé preview"
      title="Résumé"
      subtitle={fileName}
      actions={
        <Button
          href={fileUrl}
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
            href={fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-mono text-xs text-muted transition-colors hover:text-ink"
          >
            Open in new tab
             <ExternalLink className="h-3.5 w-3.5" />
          </a>

          <Button
            href={fileUrl}
            size="sm"
            className="sm:hidden"
            icon={<Download className="h-4 w-4" />}
            download={fileName}
          >
            Download
          </Button>
        </>
      }
    >
      <div className="relative flex-1 overflow-y-auto overscroll-contain bg-surface-3 p-4 sm:p-8">
        {status === "loading" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <Loader2 className="h-6 w-6 animate-spin text-brand-500" />
            <p className="font-mono text-xs text-muted">Rendering résumé…</p>
          </div>
        )}

        {status === "error" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center">
            <p className="text-sm text-ink-soft">
              The preview couldn&rsquo;t be rendered in your browser.
            </p>
            <Button
              href={fileUrl}
              size="sm"
              icon={<Download className="h-4 w-4" />}
              download={fileName}
            >
              Download instead
            </Button>
          </div>
        )}

        <div
          ref={viewportRef}
          data-resume-viewport
          className={status === "ready" ? "" : "invisible"}
        />
      </div>
    </Modal>
  );
}
