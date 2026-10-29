"use client";

import { useTransition } from "react";
import { hasLocale, useLocale, useTranslations, type Locale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/shared/lib/cn";

type LanguageSwitcherProps = {
  /** `compact` for the desktop header (styled like the nav links), `inline` for the mobile menu */
  variant?: "compact" | "inline";
  theme?: "light" | "dark";
  className?: string;
  onChange?: () => void;
};

/** All three locales are always visible: one click to switch, no dropdown */
export function LanguageSwitcher({
  variant = "compact",
  theme = "light",
  className,
  onChange,
}: LanguageSwitcherProps) {
  const locale = useLocale();
  const t = useTranslations("Languages");
  const tNav = useTranslations("Navigation");
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const changeLocale = (next: Locale) => {
    if (!hasLocale(routing.locales, next) || next === locale) return;
    onChange?.();
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  };

  const isDark = theme === "dark";

  return (
    <div
      role="group"
      aria-label={tNav("language")}
      aria-busy={isPending || undefined}
      className={cn(
        "flex items-center",
        variant === "compact" ? "gap-1" : "gap-2",
        isPending && "opacity-60",
        className,
      )}
    >
      {routing.locales.map((item: Locale) => {
        const isActive = item === locale;
        return (
          <button
            key={item}
            type="button"
            lang={item}
            aria-pressed={isActive}
            title={t(item)}
            disabled={isPending}
            onClick={() => changeLocale(item)}
            className={cn(
              "text-sm leading-none font-medium uppercase tracking-[0.28px] transition-colors",
              variant === "compact"
                ? cn(
                    "relative cursor-pointer rounded-[2px] px-2 py-2.5",
                    isDark
                      ? "text-white hover:bg-white hover:text-dark"
                      : "text-dark hover:bg-dark hover:text-white",
                    isActive
                      ? "after:absolute after:inset-x-2 after:bottom-1 after:h-px after:bg-current"
                      : "opacity-45 hover:opacity-100",
                  )
                : cn(
                    "h-10 min-w-12 cursor-pointer rounded-[2px] border px-3",
                    isActive
                      ? "border-white bg-white text-dark"
                      : "border-white/40 text-white hover:border-white",
                  ),
            )}
          >
            {item}
          </button>
        );
      })}
    </div>
  );
}
