import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ContactsPage } from "@/features/contacts";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("ContactsPage");
  const tMeta = await getTranslations("Metadata");

  return {
    title: `${t("title")} — ${tMeta("title")}`,
  };
}

export default function Contacts() {
  return <ContactsPage />;
}
