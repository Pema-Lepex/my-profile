import { Mail } from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import type { SocialIcon } from "@/types/SiteProps";
import {
  FacebookIcon,
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
} from "./brand";

export { FacebookIcon, GithubIcon, InstagramIcon, LinkedinIcon };

export type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

export const socialIcons: Record<SocialIcon, IconComponent> = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  mail: Mail,
};
