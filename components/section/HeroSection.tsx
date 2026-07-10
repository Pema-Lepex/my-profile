"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ArrowDown, Download, Mail } from "lucide-react";
import { profile, stats, techMarquee } from "@/assets/content/common/SiteContent";
import { useTypewriter } from "@/utils/hooks";
import { Badge, Button, Marquee, SocialLinks } from "@/components/ui";
import { Counter, Magnetic, Reveal } from "@/components/motion";

export function HeroSection() {
  const typed = useTypewriter(profile.roles);

  return (
    <section
      id="home"
      className="relative flex min-h-svh scroll-mt-24 flex-col justify-center overflow-hidden pt-32 pb-16"
    >
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="grid items-center gap-16 lg:grid-cols-[1.15fr_1fr]">
          {/* ---------------------------------------------------------- */}
          {/* Copy                                                        */}
          {/* ---------------------------------------------------------- */}
          <div>
            <Reveal direction="none" duration={0.8}>
              {profile.available && (
                <Badge variant="dot">{profile.availability}</Badge>
              )}
            </Reveal>

            <Reveal delay={0.1}>
              <h1 className="mt-6 font-display text-5xl font-semibold leading-[0.95] tracking-tight text-ink sm:text-6xl lg:text-7xl">
                Hi, I&rsquo;m
                <br />
                <span className="text-gradient">{profile.name}</span>
              </h1>
            </Reveal>

            {/* Typewriter role — reserve a line box so nothing shifts */}
            <Reveal delay={0.2}>
              <p className="mt-6 flex min-h-[2rem] items-center font-mono text-base text-ink-soft sm:text-lg">
                <span className="mr-2 text-brand-500">&gt;</span>
                <span aria-live="polite">{typed}</span>
                <span
                  aria-hidden
                  className="ml-0.5 inline-block h-5 w-[2px] animate-blink bg-brand-500"
                />
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-muted">
                {profile.bio}
              </p>
            </Reveal>

            <Reveal delay={0.4}>
              <div className="mt-10 flex flex-wrap items-center gap-4">
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
                    href={profile.resumeUrl}
                    variant="secondary"
                    size="lg"
                    external
                    icon={<Download className="h-4 w-4" />}
                  >
                    Résumé
                  </Button>
                </Magnetic>

                <SocialLinks className="ml-2" />
              </div>
            </Reveal>
          </div>

          {/* ---------------------------------------------------------- */}
          {/* Portrait                                                    */}
          {/* ---------------------------------------------------------- */}
          <Reveal direction="left" delay={0.25} duration={0.9}>
            <div className="relative mx-auto w-full max-w-md">
              {/* Rotating conic halo */}
              <motion.div
                aria-hidden
                animate={{ rotate: 360 }}
                transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
                className="absolute inset-6 rounded-full bg-[conic-gradient(from_0deg,var(--color-brand-500),var(--color-accent-500),var(--color-glow-400),var(--color-brand-500))] opacity-25 blur-2xl"
              />

              <div className="relative aspect-square overflow-hidden rounded-full border border-border bg-surface-2">
                <Image
                  src={profile.avatar}
                  alt={profile.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 80vw, 420px"
                  className="object-cover object-top"
                />
              </div>

              {/* Floating chips */}
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                className="glass absolute -left-6 top-12 hidden rounded-2xl border border-border px-4 py-3 shadow-lg sm:block"
              >
                <p className="font-display text-lg font-semibold text-ink">
                  {profile.location}
                </p>
                <p className="font-mono text-[10px] text-muted">
                  {profile.timezone}
                </p>
              </motion.div>

              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{
                  duration: 5.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.6,
                }}
                className="glass absolute -right-6 bottom-16 hidden rounded-2xl border border-border px-4 py-3 shadow-lg sm:block"
              >
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
                  Currently
                </p>
                <p className="font-display text-sm font-semibold text-ink">
                  Building with Next.js
                </p>
              </motion.div>
            </div>
          </Reveal>
        </div>

        {/* ------------------------------------------------------------ */}
        {/* Stats                                                         */}
        {/* ------------------------------------------------------------ */}
        <Reveal delay={0.2} className="mt-20">
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-4">
            {stats.map(({ value, suffix, label }) => (
              <div key={label} className="bg-surface px-6 py-7 text-center">
                <dt className="sr-only">{label}</dt>
                <dd>
                  <Counter
                    to={value}
                    suffix={suffix}
                    className="font-display text-3xl font-semibold text-gradient sm:text-4xl"
                  />
                  <p className="mt-1.5 text-xs text-muted">{label}</p>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        {/* Tech marquee */}
        <Reveal delay={0.3} className="mt-10">
          <Marquee items={techMarquee} />
        </Reveal>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        aria-label="Scroll to about section"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="mx-auto mt-14 hidden items-center gap-2 font-mono text-xs text-muted transition-colors hover:text-ink md:flex"
      >
        Scroll <ArrowDown className="h-3.5 w-3.5" />
      </motion.a>
    </section>
  );
}
