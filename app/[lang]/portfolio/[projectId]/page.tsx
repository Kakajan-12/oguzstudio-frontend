import { Suspense } from "react";
import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import {
  getPortfolioProjectIdsMock,
  getPortfolioProjectMock,
  ProjectPage,
  ProjectPageSkeleton,
} from "@/features/portfolio";

type ProjectProps = {
  params: Promise<{ projectId: string }>;
};

export function generateStaticParams() {
  return getPortfolioProjectIdsMock().map((projectId) => ({ projectId }));
}

export async function generateMetadata({
  params,
}: ProjectProps): Promise<Metadata> {
  const { projectId } = await params;
  const locale = await getLocale();
  const tMeta = await getTranslations("Metadata");
  const project = getPortfolioProjectMock(projectId, locale);

  return {
    title: project ? `${project.title} — ${tMeta("title")}` : tMeta("title"),
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
