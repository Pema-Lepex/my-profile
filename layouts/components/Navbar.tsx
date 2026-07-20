"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Menu, Sparkles, X } from "lucide-react";
import { profile } from "@/assets/content/common/SiteContent";
import { useActiveSection } from "@/utils/hooks";
import { Button, SocialLinks, ThemeToggle } from "@/components/ui";
import { cn } from "@/utils/helpers/cn";
import { NAV_LINKS, SECTION_IDS, type NavLink } from "./NavMenuList";
import Image from "next/image";
import { brandMark } from "@/assets";

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  // A standalone route renders only its own section, so seed the scroll-spy
  // with that id — "/projects" opens with Projects already highlighted.
  const active = useActiveSection(
    SECTION_IDS,
    isHome ? "home" : pathname.slice(1),
  );

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // The home page stacks every section, so the nav scrolls between anchors.
  // Anywhere else those anchors don't exist, and the nav navigates instead.
  const hrefFor = (link: NavLink) => (isHome ? `#${link.id}` : link.href);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close the drawer on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          scrolled ? "py-3" : "py-5",
        )}
      >
        <nav
          className={cn(
            "mx-4 flex max-w-6xl items-center justify-between rounded-full px-5 py-2.5 transition-all duration-500 sm:mx-6 lg:mx-auto",
            scrolled
              ? "glass border border-border shadow-lg shadow-black/5"
              : "border border-transparent",
          )}
        >
          {/* Brand */}
          <Link
            href={isHome ? "#home" : "/"}
            className="group flex items-center gap-2 font-display text-base font-semibold tracking-tight text-ink"
          >
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-600 text-white transition-transform duration-500 group-hover:rotate-12">
              <Image src={brandMark} alt="logo" className="rounded-lg"/>
            </span>
            {profile.brand}
          </Link>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <Link
                  href={hrefFor(link)}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    active === link.id
                      ? "text-ink"
                      : "text-muted hover:text-ink",
                  )}
                >
                  {active === link.id && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-surface-3"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 32,
                      }}
                    />
                  )}
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <ThemeToggle className="hidden sm:grid" />
            <Button
              href={isHome ? "#contact" : "/contact"}
              size="sm"
              className="hidden md:inline-flex"
            >
              Let&rsquo;s talk
            </Button>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="grid h-10 w-10 place-items-center rounded-full border border-border bg-surface-2 text-ink md:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />

            <motion.div
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex flex-col gap-2 rounded-b-4xl border-b border-border bg-surface px-6 pb-8 pt-28"
            >
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.12 + i * 0.05, duration: 0.35 }}
                >
                  <Link
                    href={hrefFor(link)}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-baseline gap-4 rounded-2xl px-4 py-3.5 font-display text-2xl font-medium transition-colors",
                      active === link.id
                        ? "bg-surface-2 text-ink"
                        : "text-muted hover:text-ink",
                    )}
                  >
                    <span className="font-mono text-xs text-brand-500">
                      0{i + 1}
                    </span>
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <div className="mt-6 flex items-center justify-between border-t border-border pt-6">
                <SocialLinks />
                <ThemeToggle />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
