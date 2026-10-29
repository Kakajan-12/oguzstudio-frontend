import Image from "next/image";
import type { CompanyContacts } from "@/shared/api/types";
import { cn } from "@/shared/lib/cn";

const SOCIALS = [
  {
    name: "Instagram",
    key: "instagram",
    icon: "/icons/instagram.svg",
    width: 20,
    height: 20,
  },
  {
    name: "TikTok",
    key: "tiktok",
    icon: "/icons/tiktok.svg",
    width: 18,
    height: 22,
  },
] as const;

type SocialLinksProps = {
  contacts: Pick<CompanyContacts, "instagram" | "tiktok">;
  className?: string;
};

/** Links that are not set in the admin are hidden */
export function SocialLinks({ contacts, className }: SocialLinksProps) {
  return (
    <ul className={cn("flex items-center gap-3", className)}>
      {SOCIALS.filter((social) => contacts[social.key]).map((social) => (
        <li key={social.name}>
          <a
            href={contacts[social.key]}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.name}
            className="flex size-10 items-center justify-center rounded-full bg-dot transition-colors hover:bg-muted lg:size-[38px]"
          >
            <Image
              src={social.icon}
              alt=""
              width={social.width}
              height={social.height}
            />
          </a>
        </li>
      ))}
    </ul>
  );
}
