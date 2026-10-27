import { useTranslations } from "next-intl";
import { Container, SectionHeading } from "@/shared/ui";
import type { ClientProject } from "../model/types";
import { ClientsShowcase } from "./ClientsShowcase";

export function ClientsSection({ clients }: { clients: ClientProject[] }) {
  const t = useTranslations("HomePage.clients");

  return (
    <section className="mt-20 lg:mt-[140px]">
      <Container>
        <SectionHeading
          label={t("label")}
          title={t("title")}
          description={t("description")}
          titleClassName="max-w-[292px] lg:max-w-[420px]"
        />
        <ClientsShowcase clients={clients} className="mt-16 lg:mt-[52px]" />
      </Container>
    </section>
  );
}
