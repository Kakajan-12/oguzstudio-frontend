import { getLocale } from "next-intl/server";
import { ServicesAccordion } from "@/features/home/ui/ServicesAccordion";
import { getBrands, getPageContent, getServices, getTeam } from "@/shared/api/content";
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

  const { gallery } = content;
  // Even slots are the wide photos
  const slides: GallerySlide[] = [
    { src: gallery.image1, alt: gallery.image1Alt, wide: false },
    { src: gallery.image2, alt: gallery.image2Alt, wide: true },
    { src: gallery.image3, alt: gallery.image3Alt, wide: false },
    { src: gallery.image4, alt: gallery.image4Alt, wide: true },
  ].filter((slide): slide is GallerySlide => Boolean(slide.src));

  return (
    <div className="relative flex flex-1 flex-col">
      <main className="flex-1">
        <AboutIntro content={content.intro} />
        {slides.length > 0 && <AboutGallery slides={slides} />}
        <ServicesAccordion services={services} className="mt-10 lg:mt-[52px]" />
        {team.length > 0 && <AboutTeam title={content.team.title} members={team} />}
        {brands.length > 0 && <AboutBrands title={content.brands.title} brands={brands} />}
        <AboutCareers content={content.careers} />
      </main>
    </div>
  );
}
