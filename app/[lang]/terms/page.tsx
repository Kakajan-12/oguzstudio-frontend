import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { LegalPage } from "@/features/legal";
import { pageTitle } from "@/shared/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Footer");

  return {
    title: await pageTitle(t("terms"), await getLocale()),
  };
}

export default function Terms() {
  return <LegalPage page="terms" />;
}
