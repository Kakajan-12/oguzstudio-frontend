import { Footer, Header } from "@/shared/ui";
import { AboutBrands } from "./AboutBrands";
import { AboutCareers } from "./AboutCareers";
import { AboutGallery } from "./AboutGallery";
import { AboutIntro } from "./AboutIntro";
import { AboutTeam } from "./AboutTeam";
import { ServicesAccordion } from "@/features/home/ui/ServicesAccordion";
import { getServicesMock } from "@/features/home/mocks/services";
import { getBrandsMock } from "../mocks/brands";
import { getTeamMock } from "../mocks/team";
import { useLocale } from "next-intl";

export function AboutPage() {
  const locale = useLocale();

  const services = getServicesMock(locale);
  const team = getTeamMock(locale);
  const brands = getBrandsMock();

  return (
    <div className="relative flex flex-1 flex-col">
      <main className="flex-1">
        <AboutIntro />
        <AboutGallery />
        <ServicesAccordion services={services} className="mt-10 lg:mt-[52px]" />
        <AboutTeam members={team} />
        <AboutBrands brands={brands} />
        <AboutCareers />
      </main>
    </div>
  );
}
