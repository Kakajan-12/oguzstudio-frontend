import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { AboutPage } from "@/features/about";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("AboutPage");
  const tMeta = await getTranslations("Metadata");

  return {
    title: `${t("title")} — ${tMeta("title")}`,
  };
}

export default function About() {
  return <AboutPage />;
}
