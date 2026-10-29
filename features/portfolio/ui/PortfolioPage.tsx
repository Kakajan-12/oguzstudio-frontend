import { getLocale } from "next-intl/server";
import { getProjects } from "@/shared/api/content";
import { PortfolioSection } from "./PortfolioSection";

export async function PortfolioPage() {
  const projects = await getProjects(await getLocale());

  return (
    <div className="relative flex flex-1 flex-col">
      <main className="flex-1">
        <PortfolioSection projects={projects} />
      </main>
    </div>
  );
}
