/**
 * Fixed, non-interactive page backdrop: a faint dot grid plus three slowly
 * drifting colour blobs. Sits behind everything at z-index -10.
 */
export function Aurora() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Dot grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgb(37_99_235_/_0.12)_1px,transparent_1px)] [background-size:28px_28px]" />

      {/* Drifting blobs */}
      <div className="absolute -left-40 -top-40 h-[36rem] w-[36rem] animate-aurora rounded-full bg-brand-500/20 blur-[120px]" />
      <div
        className="absolute -right-40 top-1/4 h-[32rem] w-[32rem] animate-aurora rounded-full bg-accent-400/12 blur-[120px]"
        style={{ animationDelay: "-6s" }}
      />
      <div
        className="absolute bottom-0 left-1/3 h-[30rem] w-[30rem] animate-aurora rounded-full bg-glow-400/10 blur-[120px]"
        style={{ animationDelay: "-12s" }}
      />

      {/* Vignette so content stays legible over the blobs */}
      <div className="absolute inset-0 bg-gradient-to-b from-surface/60 via-transparent to-surface" />
    </div>
  );
}
