import { getLocale } from "next-intl/server";
import { getPageContent, getPositions } from "@/shared/api/content";
import { CareersCulture } from "./CareersCulture";
import { CareersIntro } from "./CareersIntro";
import { CareersPositions } from "./CareersPositions";

export async function CareersPage() {
  const locale = await getLocale();
  const [content, positions] = await Promise.all([
    getPageContent("careers", locale),
    getPositions(locale),
  ]);

  return (
    <div className="relative flex flex-1 flex-col">
      <main className="flex-1">
        <CareersIntro content={content.intro} />
        <CareersCulture content={content.intro} />
        {positions.length > 0 && (
          <CareersPositions title={content.positions.title} positions={positions} />
        )}
      </main>
    </div>
  );
}
