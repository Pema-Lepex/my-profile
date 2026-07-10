"use client";

import { useEffect, useRef, useSyncExternalStore, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { cn } from "@/utils/helpers/cn";

/** `true` only after hydration — createPortal needs a real document. */
const subscribeToNothing = () => () => {};
const useIsMounted = () =>
  useSyncExternalStore(
    subscribeToNothing,
    () => true,
    () => false,
  );

type ModalProps = {
  open: boolean;
  onClose: () => void;
  /** Accessible name for the dialog. */
  label: string;
  title: ReactNode;
  subtitle?: ReactNode;
  /** Buttons rendered in the header, left of the close button. */
  actions?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
  panelClassName?: string;
  /** Extra key handler, e.g. arrow-key navigation. Escape is already handled. */
  onKeyDown?: (e: KeyboardEvent) => void;
};

/**
 * Portal dialog: backdrop click and Escape close it, body scroll is locked
 * while it is open, and focus moves to the close button on open.
 */
export function Modal({
  open,
  onClose,
  label,
  title,
  subtitle,
  actions,
  footer,
  children,
  panelClassName,
  onKeyDown,
}: ModalProps) {
  const mounted = useIsMounted();
  const closeRef = useRef<HTMLButtonElement>(null);

  // Escape, scroll lock, and initial focus. Deliberately kept free of
  // `onKeyDown`: re-running this effect while open would capture the already
  // locked "hidden" as `previousOverflow` and never restore page scroll.
  useEffect(() => {
    if (!open) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  // Caller-supplied keys re-subscribe freely — this effect owns no state.
  useEffect(() => {
    if (!open || !onKeyDown) return;
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onKeyDown]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6">
          <motion.div
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={label}
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "relative flex max-h-[90svh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-border bg-surface shadow-2xl",
              panelClassName,
            )}
          >
            <div className="flex shrink-0 items-center justify-between gap-4 border-b border-border px-6 py-4">
              <div className="min-w-0">
                <h2 className="truncate font-display text-lg font-semibold text-ink">
                  {title}
                </h2>
                {subtitle && (
                  <p className="truncate font-mono text-xs text-muted">
                    {subtitle}
                  </p>
                )}
              </div>

              <div className="flex shrink-0 items-center gap-2">
                {actions}
                <button
                  ref={closeRef}
                  type="button"
                  onClick={onClose}
                  aria-label={`Close ${label}`}
                  className="rounded-full p-2 text-muted transition-colors hover:bg-surface-2 hover:text-ink"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {children}

            {footer && (
              <div className="flex shrink-0 items-center justify-between gap-4 border-t border-border px-6 py-4">
                {footer}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
