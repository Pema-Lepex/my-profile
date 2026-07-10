import Link from "next/link";
import { profile } from "@/assets/content/common/SiteContent";
import { SocialLinks } from "@/components/ui";
import { NAV_LINKS } from "./NavMenuList";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface-2">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
          {/* Brand */}
          <div className="max-w-sm">
            <p className="font-display text-2xl font-semibold tracking-tight text-ink">
              {profile.brand}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {profile.tagline}
            </p>
            <SocialLinks className="mt-6" />
          </div>

          {/* Sitemap */}
          <nav aria-label="Footer">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
              Navigate
            </p>
            {/* Links to each section's own route, so they are reachable and
                shareable rather than only existing as anchors on the home page. */}
            <ul className="mt-4 grid grid-cols-2 gap-x-10 gap-y-2.5">
              {NAV_LINKS.map(({ id, label, href }) => (
                <li key={id}>
                  <Link
                    href={href}
                    className="text-sm text-muted transition-colors hover:text-brand-600 dark:hover:text-brand-400"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-14 flex flex-col items-center gap-4 border-t border-border pt-8 sm:flex-row sm:justify-between">
          <p className="text-xs text-muted">
            © {year} {profile.name}. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <p className="font-mono text-xs text-muted">
              Built with Next.js &amp; Tailwind
            </p>
            {/* <Link
              href="#home"
              aria-label="Back to top"
              className="group grid h-9 w-9 place-items-center rounded-full border border-border bg-surface text-muted transition-colors hover:border-brand-400 hover:text-brand-600 dark:hover:text-brand-400"
            >
              <ArrowUp className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
            </Link> */}
          </div>
        </div>
      </div>
    </footer>
  );
}
