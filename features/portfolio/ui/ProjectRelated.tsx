import { useTranslations } from "next-intl";
import { Container } from "@/shared/ui";
import type { PortfolioProject } from "../model/types";
import { PortfolioCard } from "./PortfolioCard";

/** Other projects of the same category */
export function ProjectRelated({ projects }: { projects: PortfolioProject[] }) {
  const t = useTranslations("ProjectPage");

  return (
    <section className="mt-20 lg:mt-[140px]">
      <Container>
        <h2 className="font-orbitron text-[32px] leading-[1.3] font-medium tracking-[-0.64px] text-balance text-black lg:text-[50px] lg:tracking-normal">
          {t("related")}
        </h2>
        <div className="mt-8 grid gap-y-9 md:grid-cols-2 md:gap-x-4 lg:mt-12 lg:grid-cols-3">
          {projects.map((project) => (
            <PortfolioCard key={project.id} project={project} />
          ))}
        </div>
      </Container>
    </section>
  );
}
