import type { PageContent } from "@/shared/api/types";
import { Container, SectionHeading } from "@/shared/ui";
import type { Service } from "../model/types";
import { ServicesAccordion } from "./ServicesAccordion";

type ServicesSectionProps = {
  content: PageContent["home"]["services"];
  services: Service[];
};

export function ServicesSection({ content, services }: ServicesSectionProps) {
  return (
    <section className="mt-20 lg:mt-[200px]">
      <Container>
        <SectionHeading
          label={content.label}
          title={content.title}
          description={content.description}
          titleClassName="max-w-[292px] lg:max-w-[440px]"
        />
        <ServicesAccordion services={services} className="mt-10 lg:mt-[52px]" />
      </Container>
    </section>
  );
}
