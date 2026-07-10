import { navItems } from "@/assets/content/common/SiteContent";

export interface NavLink {
  /** The section's DOM id — what the home page scroll-spy matches on. */
  id: string;
  label: string;
  /** The section's standalone route. */
  href: string;
}

export const NAV_LINKS: NavLink[] = navItems.map(({ id, label }) => ({
  id,
  label,
  href: id === "home" ? "/" : `/${id}`,
}));

export const SECTION_IDS = NAV_LINKS.map((link) => link.id);
