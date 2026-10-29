import { notFound } from "next/navigation";
import { getLocale } from "next-intl/server";
import { getProject } from "@/shared/api/content";
import { ProjectDetails } from "./ProjectDetails";
import { ProjectGallery } from "./ProjectGallery";
import { ProjectIntro } from "./ProjectIntro";
import { ProjectRelated } from "./ProjectRelated";

const RELATED_COUNT = 3;

export async function ProjectPage({ projectId }: { projectId: string }) {
  const project = await getProject(projectId, await getLocale());
  if (!project) notFound();

  // The API returns other projects of the same category
  const related = project.related.slice(0, RELATED_COUNT);

  return (
    <main className="flex-1 pb-[60px] lg:pb-[140px]">
      <ProjectIntro project={project} />
      <ProjectDetails project={project} />
      <ProjectGallery title={project.title} images={project.gallery} />
      {related.length > 0 && <ProjectRelated projects={related} />}
    </main>
  );
}
