import { profile } from "@/assets/content/common/SiteContent";
import { VideoType } from "@/components/ui";

/**
 * A full-width breath between chapters: the name at poster scale with footage
 * running inside the letters. One instance only — the device stops being a
 * moment the second it repeats.
 */
export function IdentityBand() {
  return (
    <section
      aria-label={profile.name}
      className="relative overflow-hidden bg-surface py-6 sm:py-10"
    >
      <VideoType
        text={profile.name.toUpperCase()}
        src="/videos/type-loop.mp4"
        poster="/videos/type-loop-poster.jpg"
        plate="text-surface"
      />
    </section>
  );
}
