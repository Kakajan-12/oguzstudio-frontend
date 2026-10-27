import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PortfolioPage } from "@/features/portfolio";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("PortfolioPage");
  const tMeta = await getTranslations("Metadata");

  return {
    title: `${t("title")} — ${tMeta("title")}`,
  };
}

export default function Portfolio() {
  return <PortfolioPage />;
}
