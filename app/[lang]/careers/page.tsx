import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { CareersPage } from "@/features/careers";
import { getPageContent } from "@/shared/api/content";
import { pageTitle } from "@/shared/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const { intro } = await getPageContent("careers", locale);

  return {
    title: await pageTitle(intro.title, locale),
  };
}

export default function Careers() {
  return <CareersPage />;
}
