"use client";

import { useTransition } from "react";
import { ConfigProvider, Segmented, type ThemeConfig } from "antd";
import { useLocale, useTranslations, type Locale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

type SwitcherTheme = "light" | "muted" | "dark";

const SWITCHER_LOCALES = ["en", "ru"] satisfies Locale[];

type SegmentedTokens = NonNullable<
  NonNullable<ThemeConfig["components"]>["Segmented"]
>;

const BASE_TOKENS: SegmentedTokens = {
  controlHeight: 36,
  trackPadding: 4,
  borderRadius: 10,
  borderRadiusSM: 8,
  boxShadowTertiary: "none",
  itemSelectedBg: "#ffffff",
  itemSelectedColor: "#111111",
};

const LIGHT_TOKENS: SegmentedTokens = {
  ...BASE_TOKENS,
  trackBg: "#FFFFFFCC",
  itemColor: "#111111B2",
  itemHoverColor: "#0f0f0f",
  itemHoverBg: "rgba(15, 15, 15, 0.05)",
  itemActiveBg: "rgba(15, 15, 15, 0.1)",
};

const THEME_TOKENS: Record<SwitcherTheme, SegmentedTokens> = {
  light: LIGHT_TOKENS,
  muted: { ...LIGHT_TOKENS, trackBg: "#F0F0F0" },
  dark: {
    ...BASE_TOKENS,
    trackBg: "#212121",
    itemColor: "#FFFFFFB2",
    itemHoverColor: "#ffffff",
    itemHoverBg: "rgba(255, 255, 255, 0.08)",
    itemActiveBg: "rgba(255, 255, 255, 0.16)",
    colorPrimaryBorder: "rgba(255, 255, 255, 0.5)",
  },
};

type LanguageSwitcherProps = {
  theme?: SwitcherTheme;
  className?: string;
  onChange?: () => void;
};

export function LanguageSwitcher({
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
    if (isPending || next === locale) return;
    onChange?.();
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  };

  return (
    <ConfigProvider theme={{ components: { Segmented: THEME_TOKENS[theme] } }}>
      <Segmented<Locale>
        value={locale}
        onChange={changeLocale}
        aria-label={tNav("language")}
        aria-busy={isPending}
        className={className}
        classNames={{
          item: "min-w-9",
          label: "font-medium tracking-[0.28px]",
        }}
        options={SWITCHER_LOCALES.map((item) => ({
          value: item,
          label: item.toUpperCase(),
          title: t(item),
        }))}
      />
    </ConfigProvider>
  );
}
