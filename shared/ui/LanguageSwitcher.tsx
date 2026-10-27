"use client";

import { useTransition } from "react";
import { Dropdown, type MenuProps } from "antd";
import { hasLocale, useLocale, useTranslations, type Locale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/shared/lib/cn";

type LanguageSwitcherProps = {
  /** `dropdown` for the desktop header, `inline` lists every locale as a button */
  variant?: "dropdown" | "inline";
  theme?: "light" | "dark";
  className?: string;
  onChange?: () => void;
};

export function LanguageSwitcher({
  variant = "dropdown",
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

  const changeLocale = (next: string) => {
    if (!hasLocale(routing.locales, next) || next === locale) return;
    onChange?.();
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  };

  const textColor = theme === "dark" ? "text-white" : "text-dark";

  if (variant === "inline") {
    return (
      <div
        role="group"
        aria-label={tNav("language")}
        className={cn("flex items-center gap-2", className)}
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
                "h-10 min-w-12 rounded-[2px] border px-3 text-sm font-medium uppercase tracking-[0.28px] transition-colors",
                isActive
                  ? "border-white bg-white text-dark"
                  : "border-white/40 text-white hover:border-white",
              )}
            >
              {item}
            </button>
          );
        })}
      </div>
    );
  }

  const items: MenuProps["items"] = routing.locales.map((item) => ({
    key: item,
    label: <span lang={item}>{t(item)}</span>,
  }));

  return (
    <Dropdown
      trigger={["click"]}
      placement="bottomRight"
      menu={{
        items,
        selectable: true,
        selectedKeys: [locale],
        onClick: ({ key }) => changeLocale(key),
      }}
    >
      <button
        type="button"
        aria-label={tNav("language")}
        disabled={isPending}
        className={cn(
          "flex items-center gap-2 text-sm leading-none font-medium uppercase tracking-[0.28px] transition-opacity hover:opacity-70",
          textColor,
          className,
        )}
      >
        {locale}
        <span
          aria-hidden
          className="mb-0.5 size-1.5 rotate-45 border-r border-b border-current"
        />
      </button>
    </Dropdown>
  );
}
