
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
  image: StaticImageData;
  altText: string;
  tags: string[];
  url: string;
  repoUrl?: string;
  featured?: boolean;
  showcase?: boolean;

  role?: string;
  duration?: string;
  client?: string;
  highlights?: string[];
};

export type GalleryPhoto = {
  id: string;
  src: StaticImageData;
  altText: string;
  title: string;
  date: string;
  location: string;
  note?: string;
};

export type Certificate = {
  id: string;
  title: string;
  issuer: string;
  year: string;
  fileUrl: string;
  img?: StaticImageData;
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
