import Image from "next/image";
import type { SocialLink } from "@/shared/api/types";
import { cn } from "@/shared/lib/cn";
import { SOCIAL_NETWORKS } from "@/shared/config/socials";

type SocialLinksProps = {
  socials: SocialLink[];
  className?: string;
};

export function SocialLinks({ socials, className }: SocialLinksProps) {
  return (
    <ul className={cn("flex flex-wrap items-center gap-3", className)}>
      {socials.map(({ network, url }, index) => {
        const { name, icon, width, height } = SOCIAL_NETWORKS[network];
        return (
          <li key={`${network}-${index}`}>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={name}
              className="flex size-10 items-center justify-center rounded-full bg-dot! transition-colors! hover:bg-muted! lg:size-11"
            >
              <Image src={icon} alt="" width={width} height={height} />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
