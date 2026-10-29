import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { AboutPage } from "@/features/about";
import { getPageContent } from "@/shared/api/content";
import { pageTitle } from "@/shared/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const { intro } = await getPageContent("about", locale);

  return {
    title: await pageTitle(intro.title, locale),
  };
}

export default function About() {
  return <AboutPage />;
}
