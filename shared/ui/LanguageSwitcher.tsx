"use client";

import { useTransition } from "react";
import { ConfigProvider, Segmented, type ThemeConfig } from "antd";
import { useLocale, useTranslations, type Locale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

type SwitcherTheme = "light" | "dark";

/** Only these locales are offered in the switcher; `tk` stays reachable by URL */
const SWITCHER_LOCALES = ["en", "ru"] satisfies Locale[];

type SegmentedTokens = NonNullable<
  NonNullable<ThemeConfig["components"]>["Segmented"]
>;

// 36px pill: 4px inset track, so the flat white thumb comes out 28px tall
const BASE_TOKENS: SegmentedTokens = {
  controlHeight: 36,
  trackPadding: 4,
  borderRadius: 10,
  borderRadiusSM: 8,
  boxShadowTertiary: "none",
  itemSelectedBg: "#ffffff",
  itemSelectedColor: "#0f0f0f",
};

const THEME_TOKENS: Record<SwitcherTheme, SegmentedTokens> = {
  light: {
    ...BASE_TOKENS,
    trackBg: "#eeeeee",
    itemColor: "#0f0f0f",
    itemHoverColor: "#0f0f0f",
    itemHoverBg: "rgba(15, 15, 15, 0.05)",
    itemActiveBg: "rgba(15, 15, 15, 0.1)",
  },
  // Sits on the #0f0f0f drawer, mirrors its white/60 inactive nav links
  dark: {
    ...BASE_TOKENS,
    trackBg: "rgba(255, 255, 255, 0.12)",
    itemColor: "rgba(255, 255, 255, 0.6)",
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
          item: "min-w-12",
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
