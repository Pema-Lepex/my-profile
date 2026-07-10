import { ArrowLeft } from "lucide-react";
import { Aurora, Button } from "@/components/ui";

export const metadata = {
  title: "404 — Page not found",
};

export default function NotFound() {
  return (
    <>
      <Aurora />

      <main className="grid min-h-svh place-items-center px-6">
        <div className="text-center">
          <p className="font-display text-[clamp(6rem,20vw,12rem)] font-semibold leading-none text-gradient">
            404
          </p>
          <h1 className="mt-4 font-display text-2xl font-semibold text-ink sm:text-3xl">
            This page wandered off
          </h1>
          <p className="mx-auto mt-3 max-w-sm text-sm text-muted">
            The link may be broken, or the page may have moved somewhere else.
          </p>

          <Button
            href="/"
            size="lg"
            className="mt-8"
            icon={<ArrowLeft className="h-4 w-4" />}
          >
            Back home
          </Button>
        </div>
      </main>
    </>
  );
}
