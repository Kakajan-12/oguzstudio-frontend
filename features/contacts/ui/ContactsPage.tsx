import { getLocale, getTranslations } from "next-intl/server";
import { getContacts, getPageContent, getServiceCategories } from "@/shared/api/content";
import { Container } from "@/shared/ui";
import { ContactForm } from "./ContactForm";
import { ContactsInfo } from "./ContactsInfo";

export async function ContactsPage() {
  const locale = await getLocale();
  const [t, content, contacts, categories] = await Promise.all([
    getTranslations("ContactsPage"),
    getPageContent("contacts", locale),
    getContacts(locale),
    getServiceCategories(locale),
  ]);

  return (
    <div className="relative flex flex-1 flex-col">
      <main className="flex-1">
        <section className="pt-[112px] lg:pt-[152px]">
          <Container>
            <h1 className="font-orbitron text-[36px] leading-[1.3] font-bold tracking-[0.72px] text-dark lg:text-[56px] lg:leading-[1.2] lg:font-semibold lg:tracking-normal">
              {t("title")}
            </h1>
            <ContactsInfo contacts={contacts} className="mt-8 lg:mt-20" />
          </Container>
        </section>

        <section className="pt-[100px] pb-[60px] lg:pt-[140px] lg:pb-[140px]">
          <Container>
            <h2 className="text-center font-orbitron text-[32px] leading-[1.3] font-medium tracking-[-0.64px] text-balance text-black lg:text-[50px] lg:tracking-normal">
              {content.form.title}
            </h2>
            <p className="mx-auto mt-4 max-w-[840px] text-center text-sm leading-[1.4] text-black lg:mt-6 lg:text-base lg:leading-normal">
              {content.form.subtitle}
            </p>
            <ContactForm categories={categories} className="mx-auto mt-10 max-w-[996px] lg:mt-24" />
          </Container>
        </section>
      </main>
    </div>
  );
}
