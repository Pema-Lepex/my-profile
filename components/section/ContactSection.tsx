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
import {
  Button,
  Card,
  InfoCard,
  Section,
  SectionHeading,
} from "@/components/ui";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";

const FIELD =
  "w-full rounded-2xl border border-border bg-surface px-4 py-3 text-sm text-ink placeholder:text-muted transition-colors focus:border-brand-400 focus:outline-none disabled:opacity-60";

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

  /**
   * Posts straight to Web3Forms, which relays the message to `contact.email`.
   * The access key is public by design — it only authorises submissions to the
   * inbox it was issued for, and can't be used to read anything.
   */
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
          // Lets you hit "Reply" in Gmail and reach the sender directly.
          replyto: data.get("email"),
          subject: `Portfolio enquiry from ${data.get("name")}`,
          from_name: `${profile.brand} contact form`,
          // Honeypot: bots fill hidden fields, humans can't see this one.
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
    <Section id="contact" tinted className={className}>
      <SectionHeading
        eyebrow="Contact"
        title="Let's build something"
        description="Have a project in mind, or just want to say hello? I'm always here to chat."
      />

      {/* Contact details */}
      <Stagger className="grid gap-6 md:grid-cols-3">
        <StaggerItem>
          <InfoCard
            Icon={Mail}
            title="Email"
            subtitle={contact.emailNote}
            detail={
              <button
                type="button"
                onClick={copyEmail}
                className="inline-flex items-center gap-2 break-all text-brand-600 transition-colors hover:text-brand-500 dark:text-brand-400"
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
            }
          />
        </StaggerItem>

        <StaggerItem>
          <InfoCard
            Icon={MapPin}
            title="Location"
            subtitle={contact.locationNote}
            detail={
              <span className="text-brand-600 dark:text-brand-400">
                {contact.location}
              </span>
            }
          />
        </StaggerItem>

        <StaggerItem>
          <InfoCard
            Icon={Languages}
            title="Languages"
            subtitle={contact.languagesNote}
            detail={
              <span className="text-brand-600 dark:text-brand-400">
                {contact.languages.join(" · ")}
              </span>
            }
          />
        </StaggerItem>
      </Stagger>

      {/* Message form */}
      <Reveal delay={0.15} className="mx-auto mt-16 max-w-2xl">
        <Card className="p-8 sm:p-10">
          <h3 className="font-display text-2xl font-semibold text-ink">
            Send a message
          </h3>
          <p className="mt-2 text-sm text-muted">
            Goes straight to my inbox. I&rsquo;ll get back to you within a day.
          </p>

          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="mt-8 flex flex-col items-center rounded-2xl border border-emerald-500/25 bg-emerald-500/5 px-6 py-12 text-center"
              >
                <span className="grid h-14 w-14 place-items-center rounded-full bg-emerald-500/15 text-emerald-500">
                  <CheckCircle2 className="h-7 w-7" />
                </span>
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
                {/* Honeypot — visually hidden, never focusable by a human */}
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
                      placeholder="Jane Doe"
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
                      placeholder="jane@example.com"
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
                    className="flex items-start gap-2 rounded-2xl border border-accent-500/25 bg-accent-500/5 px-4 py-3 text-sm text-accent-600 dark:text-accent-400"
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
        </Card>
      </Reveal>

      <Reveal delay={0.2} className="mt-10 text-center">
        <p className="text-sm text-muted">
          Prefer something else? Find me as{" "}
          <span className="font-medium text-ink">{profile.brand}</span> on the
          socials above.
        </p>
      </Reveal>
    </Section>
  );
}
