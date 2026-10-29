import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { PortfolioPage } from "@/features/portfolio";
import { pageTitle } from "@/shared/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("PortfolioPage");

  return {
    title: await pageTitle(t("title"), await getLocale()),
  };
}

export default function Portfolio() {
  return <PortfolioPage />;
}
