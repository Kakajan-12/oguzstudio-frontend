import { useTranslations } from "next-intl";
import { Container, SectionHeading } from "@/shared/ui";
import type { Service } from "../model/types";
import { ServicesAccordion } from "./ServicesAccordion";

export function ServicesSection({ services }: { services: Service[] }) {
  const t = useTranslations("HomePage.services");

  return (
    <section className="mt-20 lg:mt-[200px]">
      <Container>
        <SectionHeading
          label={t("label")}
          title={t("title")}
          description={t("description")}
          titleClassName="max-w-[292px] lg:max-w-[440px]"
        />
        <ServicesAccordion services={services} className="mt-10 lg:mt-[52px]" />
      </Container>
    </section>
  );
}
