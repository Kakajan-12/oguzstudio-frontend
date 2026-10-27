import { notFound } from "next/navigation";
import { useLocale } from "next-intl";
import {
  getPortfolioProjectMock,
  getPortfolioProjectsMock,
} from "../mocks/projects";
import { ProjectDetails } from "./ProjectDetails";
import { ProjectGallery } from "./ProjectGallery";
import { ProjectIntro } from "./ProjectIntro";
import { ProjectRelated } from "./ProjectRelated";

const RELATED_COUNT = 3;

export function ProjectPage({ projectId }: { projectId: string }) {
  const locale = useLocale();
  // TODO: replace mocks with API data
  const project = getPortfolioProjectMock(projectId, locale);
  if (!project) notFound();

  const related = getPortfolioProjectsMock(locale)
    .filter(
      ({ id, category }) =>
        id !== project.id && category.value === project.category.value,
    )
    .slice(0, RELATED_COUNT);

  return (
    <main className="flex-1 pb-[60px] lg:pb-[140px]">
      <ProjectIntro project={project} />
      <ProjectDetails project={project} />
      <ProjectGallery title={project.title} images={project.gallery} />
      {related.length > 0 && <ProjectRelated projects={related} />}
    </main>
  );
}
