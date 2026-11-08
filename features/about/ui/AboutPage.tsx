import { getLocale } from "next-intl/server";
import { ServicesAccordion } from "@/features/home/ui/ServicesAccordion";
import { getBrands, getPageContent, getServices, getTeam } from "@/shared/api/content";
import { Container } from "@/shared/ui";
import { AboutBrands } from "./AboutBrands";
import { AboutCareers } from "./AboutCareers";
import { AboutGallery, type GallerySlide } from "./AboutGallery";
import { AboutIntro } from "./AboutIntro";
import { AboutTeam } from "./AboutTeam";

export async function AboutPage() {
  const locale = await getLocale();
  const [content, services, team, brands] = await Promise.all([
    getPageContent("about", locale),
    getServices(locale),
    getTeam(locale),
    getBrands(),
  ]);

  // Every second photo is wide
  const slides: GallerySlide[] = content.gallery.images.map((src, index) => ({
    src,
    alt: `Oguz Studio — ${content.intro.title}`,
    wide: index % 2 === 1,
  }));

  return (
    <div className="relative flex flex-1 flex-col">
      <main className="flex-1">
        <AboutIntro content={content.intro} />
        {slides.length > 0 && <AboutGallery slides={slides} />}
        <Container>
          <ServicesAccordion services={services} className="mt-10 lg:mt-[52px]" />
        </Container>
        {team.length > 0 && <AboutTeam title={content.team.title} members={team} />}
        {brands.length > 0 && <AboutBrands title={content.brands.title} brands={brands} />}
        <AboutCareers content={content.careers} />
      </main>
    </div>
  );
}
