import { useTranslations } from "next-intl";
import { Container } from "@/shared/ui";
import type { PortfolioProjectDetails } from "../model/types";

/** Project story on the left, a client / category / location / year table on the right */
export function ProjectDetails({ project }: { project: PortfolioProjectDetails }) {
  const t = useTranslations("ProjectPage.info");

  const rows = [
    { key: "client", value: project.client },
    { key: "category", value: project.category.label },
    { key: "location", value: project.location },
    { key: "year", value: project.year },
  ] as const;

  return (
    <section className="mt-10 lg:mt-14">
      <Container className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-20">
        <div className="flex flex-col gap-4 text-sm leading-normal text-dark lg:text-base">
          {project.content.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
        <dl className="self-start border-t border-line">
          {rows.map(({ key, value }) => (
            <div
              key={key}
              className="grid grid-cols-[120px_minmax(0,1fr)] gap-4 border-b border-line py-4 text-sm leading-normal"
            >
              <dt className="font-medium text-black">{t(key)}</dt>
              <dd className="text-muted">{value}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
