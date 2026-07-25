import { navItems } from "@/assets/content/common/SiteContent";

export interface NavLink {
  id: string;
  label: string;
  href: string;
}

export const NAV_LINKS: NavLink[] = navItems.map(({ id, label }) => ({
  id,
  label,
  href: id === "home" ? "/" : `/${id}`,
}));

export const SECTION_IDS = NAV_LINKS.map((link) => link.id);
