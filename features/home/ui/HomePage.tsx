import { getLocale } from "next-intl/server";
import {
  getFeaturedProjects,
  getPageContent,
  getServices,
} from "@/shared/api/content";
import { AboutSection } from "./AboutSection";
import { ClientsSection } from "./ClientsSection";
import { ContactSection } from "./ContactSection";
import { HeroSection } from "./HeroSection";
import { ServicesSection } from "./ServicesSection";

export async function HomePage() {
  const locale = await getLocale();
  const [content, services, clients] = await Promise.all([
    getPageContent("home", locale),
    getServices(locale),
    getFeaturedProjects(locale),
  ]);

  return (
    <div className="relative flex flex-1 flex-col">
      <main className="flex-1 ">
        <HeroSection content={content.hero} />
        <AboutSection content={content.about} />
        <ServicesSection content={content.services} services={services} />
        <ClientsSection content={content.clients} clients={clients} />
        <ContactSection content={content.contact} />
      </main>
    </div>
  );
}
