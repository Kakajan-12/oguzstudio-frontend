import { useLocale } from "next-intl";
import { Footer, Header } from "@/shared/ui";
import { getPortfolioProjectsMock } from "../mocks/projects";
import { PortfolioSection } from "./PortfolioSection";

export function PortfolioPage() {
  const locale = useLocale();
  // TODO: replace mocks with API data
  const projects = getPortfolioProjectsMock(locale);

  return (
    <div className="relative flex flex-1 flex-col">
      <main className="flex-1">
        <PortfolioSection projects={projects} />
      </main>
    </div>
  );
}
