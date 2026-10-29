import { useTranslations } from "next-intl";
import type { PageContent } from "@/shared/api/types";
import { ArrowLink, Container, GradientFade, SectionHeading } from "@/shared/ui";

export function ContactSection({ content }: { content: PageContent["home"]["contact"] }) {
  const t = useTranslations("HomePage.contact");

  return (
    <section className="relative mt-[140px] bg-dark lg:mt-[62px]">
      <GradientFade direction="toDark" className="absolute inset-x-0 top-0" />
      <Container className="relative pt-[112px] pb-12 lg:pt-[220px] lg:pb-10">
        <SectionHeading
          theme="dark"
          label={content.label}
          title={content.title}
          titleClassName="max-w-[292px] lg:max-w-[485px]"
        />
        <p className="mt-7 lg:text-justify text-base leading-[1.75] font-[350] text-white lg:mt-10 lg:max-w-[500px] lg:leading-[1.8] lg:tracking-[0.32px]">
          {content.description}
        </p>
        <ArrowLink href="/contacts" theme="dark" className="mt-6 lg:mt-8 lg:w-[289px]">
          {t("cta")}
        </ArrowLink>
      </Container>
    </section>
  );
}
