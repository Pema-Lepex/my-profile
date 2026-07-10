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
