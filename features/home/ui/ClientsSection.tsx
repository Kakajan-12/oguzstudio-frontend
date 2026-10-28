import { useTranslations } from "next-intl";
import { Container, SectionHeading } from "@/shared/ui";
import type { ClientProject } from "../model/types";
import { ClientsShowcase } from "./ClientsShowcase";

export function ClientsSection({ clients }: { clients: ClientProject[] }) {
  const t = useTranslations("HomePage.clients");

  return (
    <section className="mt-20 lg:mt-35">
      <Container>
        <SectionHeading
          label={t("label")}
          title={t("title")}
          description={t("description")}
          titleClassName="max-w-76 lg:max-w-[420px]"
        />
        <ClientsShowcase clients={clients} className="mt-16 lg:mt-13" />
      </Container>
    </section>
  );
}
