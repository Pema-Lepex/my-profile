import Link from "next/link";
import { socialIcons } from "@/assets";
import { socials } from "@/assets/content/common/SiteContent";
import { cn } from "@/utils/helpers/cn";

type SocialLinksProps = {
  className?: string;
  iconClassName?: string;
};

export function SocialLinks({ className, iconClassName }: SocialLinksProps) {
  return (
    <ul className={cn("flex items-center gap-2", className)}>
      {socials.map(({ label, href, icon }) => {
        const Icon = socialIcons[icon];
        const isMail = href.startsWith("mailto:");

        return (
          <li key={label}>
            <Link
              href={href}
              aria-label={label}
              {...(isMail
                ? null
                : { target: "_blank", rel: "noopener noreferrer" })}
              className={cn(
                "grid h-10 w-10 place-items-center rounded-full border border-border bg-surface-2 text-muted",
                "transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-400 hover:text-brand-600 dark:hover:text-brand-400",
                iconClassName,
              )}
            >
              <Icon className="h-[18px] w-[18px]" />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
