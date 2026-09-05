"use client";

import { usePathname } from "next/navigation";
import { navItems } from "@/assets/content/common/SiteContent";
import { SectionNav } from "@/components/motion";

/* Hoisted: SectionNav feeds this straight into an IntersectionObserver, which
   would be rebuilt on every render if the array changed identity. */
const SECTIONS = navItems.map(({ id, label }) => ({ id, label }));

/**
 * The section rail only makes sense on the single-scroll home page — every
 * other route renders one section, so there is nothing to navigate between.
 */
export default function PageRail() {
  const pathname = usePathname();
  if (pathname !== "/") return null;

  return <SectionNav sections={SECTIONS} />;
}
