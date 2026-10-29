import type { PageContent } from "@/shared/api/types";
import { Container, SectionHeading } from "@/shared/ui";
import type { ClientProject } from "../model/types";
import { ClientsShowcase } from "./ClientsShowcase";

type ClientsSectionProps = {
  content: PageContent["home"]["clients"];
  clients: ClientProject[];
};

export function ClientsSection({ content, clients }: ClientsSectionProps) {
  if (clients.length === 0) return null;

  return (
    <section className="mt-20 lg:mt-[140px]">
      <Container>
        <SectionHeading
          label={content.label}
          title={content.title}
          description={content.description}
          titleClassName="max-w-[292px] lg:max-w-[420px]"
        />
        <ClientsShowcase clients={clients} className="mt-16 lg:mt-[52px]" />
      </Container>
    </section>
  );
}
