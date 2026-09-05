"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { ArrowDown, FileText, Mail } from "lucide-react";
import { profile, stats, techMarquee } from "@/assets/content/common/SiteContent";
import { useTypewriter } from "@/utils/hooks";
import { Badge, Button, ResumeModal, SocialLinks } from "@/components/ui";
import {
  Counter,
  Magnetic,
  Parallax,
  Reveal,
  TextReveal,
  VelocityMarquee,
} from "@/components/motion";

export function HeroSection() {
  const typed = useTypewriter(profile.roles);
  const [resumeOpen, setResumeOpen] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  // The hero recedes as the reader leaves it rather than simply scrolling off
  // — it hands the page over instead of being dragged away.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 90]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, reduced ? 1 : 0]);
  const contentScale = useTransform(scrollYProgress, [0, 1], [1, reduced ? 1 : 0.95]);

  return (
    <section
      ref={ref}
      id="home"
      className="relative flex min-h-svh scroll-mt-24 flex-col justify-center overflow-hidden pt-36 pb-20"
    >
      <motion.div
        style={{ y: contentY, opacity: contentOpacity, scale: contentScale }}
        className="mx-auto w-full max-w-[88rem] px-6 lg:px-10"
      >
        <div className="grid items-center gap-14 lg:grid-cols-[1.35fr_1fr] lg:gap-20">
          {/* ---------------------------------------------------------- */}
          {/* Editorial column                                            */}
          {/* ---------------------------------------------------------- */}
          <div className="min-w-0">
            <Reveal direction="none" blur={false} duration={0.6}>
              {profile.available && (
                <Badge variant="dot">{profile.availability}</Badge>
              )}
            </Reveal>

            {/* Name is the poster element: clamped so it fills the column at
                every width without ever forcing a horizontal scrollbar. */}
            <h1 className="mt-8 font-display font-semibold leading-[0.86] tracking-[-0.045em] text-ink">
              <span className="block text-[clamp(1rem,2.2vw,1.4rem)] font-normal tracking-[0.02em] text-muted">
                Hi, I&rsquo;m
              </span>
              <span className="mt-3 block text-[clamp(3.2rem,10.5vw,9rem)]">
                <TextReveal
                  text="Pema"
                  by="char"
                  immediate
                  stagger={0.035}
                  delay={0.15}
                />
              </span>
              <span className="block text-[clamp(3.2rem,10.5vw,9rem)] text-gradient">
                <TextReveal
                  text="Lepcha"
                  by="char"
                  immediate
                  stagger={0.035}
                  delay={0.3}
                />
              </span>
            </h1>

            <Reveal delay={0.6} className="mt-8">
              <p className="flex min-h-[2rem] items-center font-mono text-base text-ink-soft sm:text-lg">
                <span className="mr-2 text-brand-500">&gt;</span>
                <span aria-live="polite">{typed}</span>
                <span
                  aria-hidden
                  className="ml-0.5 inline-block h-5 w-[2px] animate-blink bg-brand-500"
                />
              </p>
            </Reveal>

            <Reveal delay={0.7} className="mt-7">
              <p className="max-w-xl text-base leading-relaxed text-muted sm:text-lg">
                {profile.bio}
              </p>
            </Reveal>

            <Reveal delay={0.8} className="mt-10">
              <div className="flex flex-wrap items-center gap-4">
                <Magnetic>
                  <Button
                    href="#contact"
                    size="lg"
                    icon={<Mail className="h-4 w-4" />}
                  >
                    Get in touch
                  </Button>
                </Magnetic>

                <Magnetic>
                  <Button
                    variant="secondary"
                    size="lg"
                    onClick={() => setResumeOpen(true)}
                    aria-haspopup="dialog"
                    icon={<FileText className="h-4 w-4" />}
                  >
                    Resume
                  </Button>
                </Magnetic>

                <SocialLinks className="ml-1" />
              </div>
            </Reveal>
          </div>

          {/* ---------------------------------------------------------- */}
          {/* Portrait — drifts against the copy to open up depth          */}
          {/* ---------------------------------------------------------- */}
          <Reveal direction="left" delay={0.35} duration={1} className="min-w-0">
            <Parallax y={-38} className="relative mx-auto w-full max-w-md">
              <motion.div
                aria-hidden
                animate={reduced ? undefined : { rotate: 360 }}
                transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
                className="absolute inset-4 rounded-full bg-[conic-gradient(from_0deg,var(--color-brand-500),transparent_35%,transparent_65%,var(--color-brand-500))] opacity-35 blur-2xl"
              />

              <div className="relative aspect-square overflow-hidden rounded-full border border-border bg-surface-2 shadow-2xl shadow-brand-500/10">
                <Image
                  src={profile.avatar}
                  alt={profile.name}
                  fill
                  preload
                  sizes="(max-width: 1024px) 80vw, 460px"
                  className="object-cover object-top"
                />
              </div>

              <motion.div
                animate={reduced ? undefined : { y: [0, -12, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                className="glass absolute -left-4 top-10 hidden rounded-2xl border border-border px-4 py-3 shadow-lg sm:block"
              >
                <p className="font-display text-lg font-semibold text-ink">
                  {profile.location}
                </p>
                <p className="font-mono text-[10px] text-muted">
                  {profile.timezone}
                </p>
              </motion.div>

              <motion.div
                animate={reduced ? undefined : { y: [0, 12, 0] }}
                transition={{
                  duration: 5.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.6,
                }}
                className="glass absolute -right-4 bottom-14 hidden rounded-2xl border border-border px-4 py-3 shadow-lg sm:block"
              >
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
                  Currently
                </p>
                <p className="font-display text-sm font-semibold text-ink">
                  Building with Next.js
                </p>
              </motion.div>
            </Parallax>
          </Reveal>
        </div>

        {/* ------------------------------------------------------------ */}
        {/* Stat band — hairline rules instead of boxes reads more        */}
        {/* editorial than the card grid it replaces                      */}
        {/* ------------------------------------------------------------ */}
        <Reveal delay={0.3} className="mt-20 lg:mt-24">
          <dl className="grid grid-cols-2 border-t border-border sm:grid-cols-4">
            {stats.map(({ value, suffix, label }, i) => (
              <div
                key={label}
                className="border-b border-border px-2 py-8 sm:border-b-0 sm:px-6 [&:not(:nth-child(2n))]:border-r sm:[&:not(:last-child)]:border-r"
              >
                <dt className="sr-only">{label}</dt>
                <dd>
                  <Counter
                    to={value}
                    suffix={suffix}
                    duration={1.4 + i * 0.15}
                    className="font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl"
                  />
                  <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                    {label}
                  </p>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </motion.div>

      {/* Belt runs edge to edge — the one full-bleed element in the hero */}
      <Reveal delay={0.35} className="mt-14 w-full">
        <VelocityMarquee baseVelocity={2}>
          {techMarquee.map((item) => (
            <span
              key={item}
              className="shrink-0 rounded-full border border-border bg-surface px-5 py-2.5 font-mono text-xs text-muted"
            >
              {item}
            </span>
          ))}
        </VelocityMarquee>
      </Reveal>

      <motion.a
        href="#about"
        aria-label="Scroll to about section"
        animate={reduced ? undefined : { y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="mx-auto mt-12 hidden items-center gap-2 font-mono text-xs text-muted transition-colors hover:text-ink md:flex"
      >
        Scroll <ArrowDown className="h-3.5 w-3.5" />
      </motion.a>

      <ResumeModal
        open={resumeOpen}
        onClose={() => setResumeOpen(false)}
        fileUrl={profile.resumeUrl}
        fileName={profile.resumeFileName}
      />
    </section>
  );
}
