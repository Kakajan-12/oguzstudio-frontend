import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { CONTACTS } from "@/shared/config/contacts";
import { NAV_ITEMS } from "@/shared/config/navigation";
import { cn } from "@/shared/lib/cn";
import { Container } from "./Container";
import { SocialLinks } from "./SocialLinks";

type FooterColumnProps = {
  title: string;
  className?: string;
  children: React.ReactNode;
};

function FooterColumn({ title, className, children }: FooterColumnProps) {
  return (
    <div className={className}>
      <p className="font-orbitron text-sm leading-none font-medium lg:font-bold">
        {title}
      </p>
      <ul className="mt-6 flex flex-col gap-[18px] text-sm leading-[1.2] lg:mt-5 lg:gap-0 lg:leading-9 lg:font-bold">
        {children}
      </ul>
    </div>
  );
}

const linkClassName = "opacity-80 transition-opacity hover:opacity-100";

export function Footer({ className }: { className?: string }) {
  const t = useTranslations("Footer");
  const tNav = useTranslations("Navigation");

  return (
    <footer className={cn("bg-dark text-white", className)}>
      <Container className="pt-13 pb-6 lg:pt-25 lg:pb-3">
        <div className="flex flex-col lg:grid lg:grid-cols-[minmax(0,1fr)_203px_203px_389px]">
          <div className="flex items-center justify-between lg:items-start">
            <Link href="/" aria-label="Oguz Studio">
              <Image
                src="/logo-stacked.svg"
                alt="Oguz Studio"
                width={186}
                height={88}
                className="h-15 w-32 lg:h-22 lg:w-46.5"
              />
            </Link>
            <SocialLinks className="lg:hidden" />
          </div>

          <div className="mt-13 flex w-full max-w-73 justify-between lg:contents">
            <FooterColumn title={t("learnMore")}>
              {NAV_ITEMS.filter(({ key }) => key !== "home").map(
                ({ key, href }) => (
                  <li key={key}>
                    <Link href={href} className={linkClassName}>
                      {tNav(key)}
                    </Link>
                  </li>
                ),
              )}
            </FooterColumn>
            <FooterColumn title={t("contactUs")}>
              <li>
                <a href={CONTACTS.phoneHref} className={linkClassName}>
                  {CONTACTS.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${CONTACTS.email}`} className={linkClassName}>
                  {t("email")}
                </a>
              </li>
            </FooterColumn>
          </div>

          <div className="mt-10 lg:hidden">
            <p className="font-orbitron text-sm leading-none font-medium">
              {t("address")}
            </p>
            <address className="mt-4 text-sm leading-[1.4] not-italic opacity-80">
              {t("addressValue")}
            </address>
          </div>

          <div className="hidden lg:block">
            <div className="relative h-56 w-97 overflow-hidden">
              <Image
                src="/map.png"
                alt={t("mapAlt")}
                fill
                sizes="389px"
                className="object-cover object-[50%_65%]"
              />
              <Image
                src="/icons/map-pin.svg"
                alt=""
                width={12}
                height={15}
                className="absolute top-23 left-37"
              />
            </div>
            <address className="mt-6 text-sm leading-[1.2] font-bold text-white/60 not-italic opacity-80">
              {t("addressValue")}
            </address>
          </div>
        </div>

        <SocialLinks className="mt-4 hidden lg:flex" />

        <div className="mt-13 flex flex-col gap-2 border-t-[0.5px] border-white/60 pt-3 lg:mt-3 lg:flex-row lg:items-center lg:justify-between">
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-1 text-xs leading-[1.4] lg:gap-x-4 lg:text-sm lg:leading-[1.3] lg:font-bold">
            <li>
              <a href="#">{t("terms")}</a>
            </li>
            <li>
              <a href="#">{t("privacy")}</a>
            </li>
            <li>
              <a href="#">{t("cookies")}</a>
            </li>
          </ul>
          <div className="flex flex-col items-start gap-2 lg:flex-row lg:items-center lg:gap-4">
            <p className="text-xs leading-[1.4] lg:text-sm lg:leading-[1.3] lg:font-bold">
              {t("copyright")}
            </p>
            <a
              href={CONTACTS.hebent}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("developedBy")}
            >
              <Image
                src="/hebent.svg"
                alt=""
                width={72}
                height={18}
                className="h-6 w-25 lg:h-4.5 lg:w-18"
              />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
