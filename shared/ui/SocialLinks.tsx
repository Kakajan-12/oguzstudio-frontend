import Image from "next/image";
import { CONTACTS } from "@/shared/config/contacts";
import { cn } from "@/shared/lib/cn";

const SOCIALS = [
  {
    name: "Instagram",
    href: CONTACTS.instagram,
    icon: "/icons/instagram.svg",
    width: 20,
    height: 20,
  },
  {
    name: "TikTok",
    href: CONTACTS.tiktok,
    icon: "/icons/tiktok.svg",
    width: 18,
    height: 22,
  },
] as const;

export function SocialLinks({ className }: { className?: string }) {
  return (
    <ul className={cn("flex items-center gap-3", className)}>
      {SOCIALS.map((social) => (
        <li key={social.name}>
          <a
            href={social.href}
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
