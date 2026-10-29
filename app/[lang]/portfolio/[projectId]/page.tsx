import { Suspense } from "react";
import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { ProjectPage, ProjectPageSkeleton } from "@/features/portfolio";
import { getProject, getProjectIds } from "@/shared/api/content";
import { pageTitle } from "@/shared/lib/metadata";

type ProjectProps = {
  params: Promise<{ projectId: string }>;
};

// Projects added later in the admin are rendered on first visit
export async function generateStaticParams() {
  const ids = await getProjectIds();
  return ids.map((projectId) => ({ projectId }));
}

export async function generateMetadata({
  params,
}: ProjectProps): Promise<Metadata> {
  const { projectId } = await params;
  const locale = await getLocale();
  const project = await getProject(projectId, locale);

  return {
    title: await pageTitle(project?.title ?? "", locale),
    description: project?.description,
  };
}

// params are URL data: reading them inside Suspense lets navigation show the skeleton instantly
export default function Project({ params }: ProjectProps) {
  return (
    <Suspense fallback={<ProjectPageSkeleton />}>
      {params.then(({ projectId }) => (
        <ProjectPage projectId={projectId} />
      ))}
    </Suspense>
  );
}
