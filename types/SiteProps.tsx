
import { StaticImageData } from "next/image";
import { Url } from "url";

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
  /** Wide screenshot or device mockup of the shipped product. */
  cover?: StaticImageData;
  /** Brand mark. Sits on the designed plate when there is no `cover`. */
  logo?: StaticImageData;
  altText: string;
  tags: string[];
  /** Omit when the build is not publicly reachable. */
  url?: string;
  repoUrl?: string;
  featured?: boolean;
  showcase?: boolean;

  role?: string;
  duration?: string;
  client?: string;
  highlights?: string[];
};

export type GalleryAlbumId = "training" | "travel" | "work" | "projects";

export type GalleryAlbum = {
  id: GalleryAlbumId;
  label: string;
  /** Sits under the album filter on the gallery page. */
  description: string;
  /** Optional tally printed under the grid. */
  note?: string;
};

export type GalleryPhoto = {
  id: string;
  album: GalleryAlbumId;
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
  verifiedUrl?: Url | undefined;
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
