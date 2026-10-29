import type { Locale } from "next-intl";
import { getPageContent } from "@/shared/api/content";

/** "<page> — <site title>", with the site title from the admin (Общее → SEO) */
export async function pageTitle(title: string, locale: Locale) {
  const { seo } = await getPageContent("common", locale);
  return title ? `${title} — ${seo.title}` : seo.title;
}
