import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { ContactsPage } from "@/features/contacts";
import { pageTitle } from "@/shared/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("ContactsPage");

  return {
    title: await pageTitle(t("title"), await getLocale()),
  };
}

export default function Contacts() {
  return <ContactsPage />;
}
