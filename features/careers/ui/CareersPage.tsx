import { useLocale } from "next-intl";
import { Footer, Header } from "@/shared/ui";
import { getPositionsMock } from "../mocks/positions";
import { CareersCulture } from "./CareersCulture";
import { CareersIntro } from "./CareersIntro";
import { CareersPositions } from "./CareersPositions";

export function CareersPage() {
  const locale = useLocale();
  // TODO: replace mocks with API data
  const positions = getPositionsMock(locale);

  return (
    <div className="relative flex flex-1 flex-col">
      <main className="flex-1">
        <CareersIntro />
        <CareersCulture />
        <CareersPositions positions={positions} />
      </main>
    </div>
  );
}
