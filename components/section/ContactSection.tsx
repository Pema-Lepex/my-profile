"use client";

import { useState, type FormEvent } from "react";
import {
  AlertCircle,
  Check,
  CheckCircle2,
  Copy,
  Languages,
  Loader2,
  Mail,
  MapPin,
  Send,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { contact, profile } from "@/assets/content/common/SiteContent";
import { Button, Section, SocialLinks } from "@/components/ui";
import { EASE, Reveal, Stagger, StaggerItem, TextReveal } from "@/components/motion";

/* `border-strong`, not `border`: an input has to read as an input. The
   hairline used on cards sits at ~1.3:1, well under the 3:1 that WCAG 1.4.11
   asks of a control boundary. */
const FIELD =
  "w-full rounded-2xl border border-border-strong bg-surface-2 px-4 py-3.5 text-sm text-ink placeholder:text-muted transition-all duration-300 focus:border-brand-600 focus:bg-surface focus:outline-none focus:ring-4 focus:ring-brand-500/15 disabled:opacity-60";

const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

type Status = "idle" | "submitting" | "success" | "error";

export function ContactSection({ className }: { className?: string }) {
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");

  const copyEmail = async () => {
    await navigator.clipboard.writeText(contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!ACCESS_KEY) {
      setStatus("error");
      setError(
        "The form isn't configured yet. Set NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY and redeploy.",
      );
      return;
    }

    const form = event.currentTarget;
    const data = new FormData(form);

    setStatus("submitting");
    setError("");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
          replyto: data.get("email"),
          subject: `Portfolio enquiry from ${data.get("name")}`,
          from_name: `${profile.brand} contact form`,
          botcheck: data.get("botcheck"),
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message ?? "Something went wrong. Please try again.");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof Error
          ? err.message
          : "Couldn't send that. Please email me directly instead.",
      );
    }
  };

  const submitting = status === "submitting";

  return (
    <Section id="contact" tinted width="wide" className={className}>
      <div className="grid gap-16 lg:grid-cols-[1fr_1.05fr] lg:gap-24">
        {/* ---- Oversized call to action ----------------------------------- */}
        <div className="min-w-0">
          <Reveal direction="none" blur={false} duration={0.5}>
            <p className="mb-6 flex items-center gap-3 font-mono text-xs font-medium uppercase tracking-[0.22em] text-brand-700 dark:text-brand-400">
              <span className="text-muted">07</span>
              <span aria-hidden className="h-px w-8 bg-brand-500/50" />
              Contact
            </p>
          </Reveal>

          <h2 className="font-display font-semibold leading-[0.92] tracking-[-0.035em] text-ink">
            <span className="block text-[clamp(2.75rem,7vw,5.5rem)]">
              <TextReveal text="Let's build" by="char" stagger={0.018} />
            </span>
            <span className="block text-[clamp(2.75rem,7vw,5.5rem)] text-gradient">
              <TextReveal text="something." by="char" stagger={0.018} delay={0.12} />
            </span>
          </h2>

          <Reveal delay={0.2} className="mt-8">
            <p className="max-w-md text-lg leading-relaxed text-muted">
              Have a project in mind, or just want to say hello? It goes
              straight to my inbox and I&rsquo;ll get back to you within a day.
            </p>
          </Reveal>

          {/* Channels as a ruled list — quieter than three cards, and it lets
              the headline stay the loudest thing in the section */}
          <Stagger className="mt-12 border-t border-border" stagger={0.08}>
            {[
              {
                Icon: Mail,
                label: "Email",
                note: contact.emailNote,
                value: (
                  <button
                    type="button"
                    onClick={copyEmail}
                    className="inline-flex items-center gap-2 break-all text-brand-700 transition-colors hover:text-brand-600 dark:text-brand-400 dark:hover:text-brand-300"
                  >
                    {contact.email}
                    {copied ? (
                      <Check className="h-3.5 w-3.5 shrink-0 text-emerald-500" />
                    ) : (
                      <Copy className="h-3.5 w-3.5 shrink-0" />
                    )}
                    <span className="sr-only">
                      {copied ? "Email copied" : "Copy email address"}
                    </span>
                  </button>
                ),
              },
              {
                Icon: MapPin,
                label: "Location",
                note: contact.locationNote,
                value: (
                  <span className="text-brand-700 dark:text-brand-400">
                    {contact.location}
                  </span>
                ),
              },
              {
                Icon: Languages,
                label: "Languages",
                note: contact.languagesNote,
                value: (
                  <span className="text-brand-700 dark:text-brand-400">
                    {contact.languages.join(" · ")}
                  </span>
                ),
              },
            ].map(({ Icon, label, note, value }) => (
              <StaggerItem key={label} distance={16}>
                <div className="group flex items-start gap-5 border-b border-border py-6">
                  <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-brand-500/12 text-brand-600 transition-transform duration-500 group-hover:scale-110 dark:text-brand-400">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                      {label}
                    </p>
                    <div className="mt-1.5 text-sm font-medium">{value}</div>
                    <p className="mt-1 text-xs text-muted">{note}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal delay={0.2} className="mt-8">
            <SocialLinks />
          </Reveal>
        </div>

        {/* ---- Form ------------------------------------------------------- */}
        <Reveal direction="left" delay={0.1} className="min-w-0">
          <div className="rounded-4xl border border-border bg-surface p-8 shadow-2xl shadow-black/5 sm:p-10 lg:sticky lg:top-32">
            <h3 className="font-display text-2xl font-semibold text-ink">
              Send a message
            </h3>
            <p className="mt-2 text-sm text-muted">
              Goes straight to my inbox — no forms-to-nowhere.
            </p>

            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="mt-8 flex flex-col items-center rounded-3xl border border-emerald-500/25 bg-emerald-500/5 px-6 py-12 text-center"
                >
                  <motion.span
                    initial={{ scale: 0.6 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
                    className="grid h-14 w-14 place-items-center rounded-full bg-emerald-500/15 text-emerald-500"
                  >
                    <CheckCircle2 className="h-7 w-7" />
                  </motion.span>
                  <h4 className="mt-5 font-display text-xl font-semibold text-ink">
                    Message sent
                  </h4>
                  <p className="mt-2 max-w-sm text-sm text-muted">
                    Thanks for reaching out — it landed in my inbox and I&rsquo;ll
                    reply soon.
                  </p>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="mt-6"
                    onClick={() => setStatus("idle")}
                  >
                    Send another
                  </Button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={false}
                  exit={{ opacity: 0 }}
                  className="mt-8 space-y-5"
                >
                  <input
                    type="checkbox"
                    name="botcheck"
                    tabIndex={-1}
                    autoComplete="off"
                    className="hidden"
                    aria-hidden
                  />

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="name"
                        className="mb-2 block text-xs font-medium text-ink"
                      >
                        Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        disabled={submitting}
                        autoComplete="name"
                        placeholder="Your name"
                        className={FIELD}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="mb-2 block text-xs font-medium text-ink"
                      >
                        Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        disabled={submitting}
                        autoComplete="email"
                        placeholder="email@example.com"
                        className={FIELD}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="mb-2 block text-xs font-medium text-ink"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      disabled={submitting}
                      placeholder="Tell me about your project…"
                      className={`${FIELD} resize-none`}
                    />
                  </div>

                  {status === "error" && (
                    <p
                      role="alert"
                      className="flex items-start gap-2 rounded-2xl border border-danger-500/25 bg-danger-500/5 px-4 py-3 text-sm text-danger-600 dark:text-danger-400"
                    >
                      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                      {error}
                    </p>
                  )}

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={submitting}
                    icon={
                      submitting ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Send className="h-4 w-4" />
                      )
                    }
                  >
                    {submitting ? "Sending…" : "Send message"}
                  </Button>

                  <p aria-live="polite" className="sr-only">
                    {submitting ? "Sending your message" : ""}
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
