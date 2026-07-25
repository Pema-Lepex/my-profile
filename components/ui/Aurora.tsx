export function Aurora() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgb(225_29_72_/_0.12)_1px,transparent_1px)] [background-size:28px_28px]" />

      <div className="absolute -left-40 -top-40 h-[36rem] w-[36rem] animate-aurora rounded-full bg-brand-500/20 blur-[120px]" />
      <div
        className="absolute -right-40 top-1/4 h-[32rem] w-[32rem] animate-aurora rounded-full bg-brand-400/12 blur-[120px]"
        style={{ animationDelay: "-6s" }}
      />
      <div
        className="absolute bottom-0 left-1/3 h-[30rem] w-[30rem] animate-aurora rounded-full bg-brand-600/10 blur-[120px]"
        style={{ animationDelay: "-12s" }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-surface/60 via-transparent to-surface" />
    </div>
  );
}
