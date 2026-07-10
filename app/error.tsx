"use client";

import { useEffect } from "react";
import { RotateCw } from "lucide-react";
import { Aurora, Button } from "@/components/ui";

/**
 * Replaces the Pages Router's `_error.tsx`. The App Router routes 404s to
 * `not-found.tsx`, so this boundary only ever sees runtime errors — there is
 * no status code to map to a message.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <>
      <Aurora />

      <main className="grid min-h-svh place-items-center px-6">
        <div className="text-center">
          <p className="font-display text-[clamp(4rem,14vw,8rem)] font-semibold leading-none text-gradient">
            Oops
          </p>
          <h1 className="mt-4 font-display text-2xl font-semibold text-ink sm:text-3xl">
            Something went wrong
          </h1>
          <p className="mx-auto mt-3 max-w-sm text-sm text-muted">
            An unexpected error occurred on our end. Try again, and if it keeps
            happening, let me know.
          </p>

          {error.digest && (
            <p className="mt-4 font-mono text-xs text-muted">
              Reference: {error.digest}
            </p>
          )}

          <Button
            size="lg"
            className="mt-8"
            onClick={reset}
            icon={<RotateCw className="h-4 w-4" />}
          >
            Try again
          </Button>
        </div>
      </main>
    </>
  );
}
