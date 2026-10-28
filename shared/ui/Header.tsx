"use client";

import { useState } from "react";
import Image from "next/image";
import { Drawer } from "antd";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { NAV_ITEMS } from "@/shared/config/navigation";
import { cn } from "@/shared/lib/cn";
import { useMediaQuery } from "@/shared/lib/useMediaQuery";
import { useScrolled } from "@/shared/lib/useScrolled";
import { Container } from "./Container";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { SocialLinks } from "./SocialLinks";

function isActivePath(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

type HeaderProps = {
  className?: string;
};
export function Header({ className }: HeaderProps) {
  const t = useTranslations("Navigation");
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);
  const isHomePage = pathname === "/";
  // Matches Tailwind's `lg` breakpoint, where the desktop nav replaces the burger
  // const isDesktop = useMediaQuery("(min-width: 64rem)");
  const isScrolled = useScrolled(50);
  // Home opens with a dark hero: header stays transparent with white logo until scrolled
  const isOverHero = isHomePage && !isScrolled;

  const renderLogo = (src: string) => (
    <Link href="/" aria-label="Oguz Studio" onClick={closeMenu}>
      <Image
        src={src}
        alt="Oguz Studio"
        width={232}
        height={24}
        loading="eager"
        className="h-4.5 w-42 lg:h-6 lg:w-58"
      />
    </Link>
  );

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-20 transition-colors duration-300",
        isScrolled ? "bg-white/80 backdrop-blur-md" : "bg-transparent",
        className,
      )}
    >
      <Container className="flex h-15 items-center justify-between lg:h-auto lg:py-4">
        {renderLogo(isOverHero ? "/logo.svg" : "/logo-dark.svg")}

        <nav className="hidden items-center gap-10 lg:flex">
          <ul className="flex items-center gap-10">
            {NAV_ITEMS.map(({ key, href }) => {
              const isActive = isActivePath(pathname, href);
              return (
                <li key={key}>
                  <Link
                    href={href}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "relative block text-sm leading-none uppercase tracking-[0.28px] text-dark transition-opacity",
                      isActive
                        ? "font-medium after:absolute after:inset-x-1 after:-bottom-2 after:h-px after:bg-dark"
                        : "hover:opacity-70",
                    )}
                  >
                    {t(key)}
                  </Link>
                </li>
              );
            })}
          </ul>
          <LanguageSwitcher />
        </nav>

        <button
          type="button"
          aria-label={t("openMenu")}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen(true)}
          className="-mr-2 p-2 lg:hidden"
        >
          <Image
            src="/icons/burger.svg"
            alt=""
            width={24}
            height={14}
            className={cn(!isOverHero && "invert")}
          />
        </button>
      </Container>

      <Drawer
        open={isMenuOpen}
        onClose={closeMenu}
        placement="right"
        size="100%"
        closable={false}
        rootClassName="lg:hidden"
        styles={{
          section: { background: "#0f0f0f" },
          header: { display: "none" },
          body: { padding: 0 },
        }}
      >
        <div className="flex min-h-full flex-col">
          <div className="flex h-[60px] shrink-0 items-center justify-between px-4">
            {renderLogo("/logo.svg")}
            <button
              type="button"
              aria-label={t("closeMenu")}
              onClick={closeMenu}
              className="relative -mr-2 size-10"
            >
              <span className="absolute top-1/2 left-2 h-0.5 w-6 rotate-45 rounded-full bg-white" />
              <span className="absolute top-1/2 left-2 h-0.5 w-6 -rotate-45 rounded-full bg-white" />
            </button>
          </div>

          <nav className="flex-1 px-4 pt-10">
            <ul className="flex flex-col">
              {NAV_ITEMS.map(({ key, href }) => {
                const isActive = isActivePath(pathname, href);
                return (
                  <li key={key} className="border-b border-white/20!">
                    <Link
                      href={href}
                      onClick={closeMenu}
                      aria-current={isActive ? "page" : undefined}
                      className={cn(
                        "block py-5 font-orbitron text-2xl leading-tight font-medium",
                        isActive ? "text-white!" : "text-white/60!",
                      )}
                    >
                      {t(key)}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="px-4 py-8 flex justify-between items-center">
            <SocialLinks className=" lg:hidden" />

            <LanguageSwitcher theme="dark" onChange={closeMenu} />
          </div>
        </div>
      </Drawer>
    </header>
  );
}
