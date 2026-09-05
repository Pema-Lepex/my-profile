export function Aurora() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle,var(--dot)_1px,transparent_1px)] [background-size:28px_28px]" />

      <div className="absolute -left-40 -top-40 h-[22rem] w-[22rem] animate-aurora rounded-full bg-brand-500/20 blur-[70px] sm:h-[36rem] sm:w-[36rem] sm:blur-[120px]" />
      <div
        className="absolute -right-40 top-1/4 h-[20rem] w-[20rem] animate-aurora rounded-full bg-brand-400/12 blur-[70px] sm:h-[32rem] sm:w-[32rem] sm:blur-[120px]"
        style={{ animationDelay: "-6s" }}
      />
      <div
        className="absolute bottom-0 left-1/3 h-[18rem] w-[18rem] animate-aurora rounded-full bg-brand-600/10 blur-[70px] sm:h-[30rem] sm:w-[30rem] sm:blur-[120px]"
        style={{ animationDelay: "-12s" }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-surface/60 via-transparent to-surface" />
    </div>
  );
}
