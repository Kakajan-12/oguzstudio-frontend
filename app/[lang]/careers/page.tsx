import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { CareersPage } from "@/features/careers";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("CareersPage");
  const tMeta = await getTranslations("Metadata");

  return {
    title: `${t("title")} — ${tMeta("title")}`,
  };
}

export default function Careers() {
  return <CareersPage />;
}
