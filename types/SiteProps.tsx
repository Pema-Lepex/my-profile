/**
 * Shapes for the site copy in `assets/content`. Kept here rather than beside
 * the data so `assets/icons` can name a `SocialIcon` without importing the
 * content module, which would import the icons straight back.
 */

import { StaticImageData } from "next/image";

export type NavItem = { id: string; label: string };

export type SocialIcon =
  | "github"
  | "linkedin"
  | "facebook"
  | "instagram"
  | "mail";

export type Social = { label: string; href: string; icon: SocialIcon };

export type SkillGroup = {
  label: string;
  icon: "code" | "layers" | "database" | "wrench";
  blurb: string;
  skills: { name: string; level: number }[];
};

export type Project = {
  id: string;
  title: string;
  year: string;
  category: string;
  description: string;
  imageUrl: string;
  altText: string;
  tags: string[];
  url: string;
  repoUrl?: string;
  featured?: boolean;
  /** Shown on the home page preview. The rest of the array is /projects only. */
  showcase?: boolean;

  /* ---- Detail-only fields. Rendered on /projects, never on the home page. */
  /** What I actually did on it, as opposed to what the product is. */
  role?: string;
  /** How long I worked on it, e.g. "4 months". */
  duration?: string;
  /** Who it was built for. */
  client?: string;
  /** Concrete contributions — the substance the home card has no room for. */
  highlights?: string[];
};

export type GalleryPhoto = {
  id: string;
  src: StaticImageData;
  /** Describes the photo for screen readers. Not repeated in the caption. */
  altText: string;
  /** Headline shown on hover and in the lightbox. */
  title: string;
  /** ISO date — sorted and formatted for display from this. */
  date: string;
  location: string;
  /** Optional sentence of context shown in the lightbox only. */
  note?: string;
};

export type Certificate = {
  id: string;
  title: string;
  issuer: string;
  year: string;
  /** PDF under `public/certificates/`. */
  fileUrl: string;
  img?: StaticImageData;
  /** Preview image under `public/certificates/`. Falls back to a PDF glyph. */
  thumbnailUrl?: StaticImageData;
};

export type TimelineEntry = {
  id: string;
  role: string;
  org: string;
  period: string;
  current?: boolean;
  description: string;
  highlights: string[];
  kind: "work" | "education";
};
