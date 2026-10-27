import { useLocale } from "next-intl";
import { Footer, Header } from "@/shared/ui";
import { getClientProjectsMock } from "../mocks/clients";
import { getServicesMock } from "../mocks/services";
import { AboutSection } from "./AboutSection";
import { ClientsSection } from "./ClientsSection";
import { ContactSection } from "./ContactSection";
import { HeroSection } from "./HeroSection";
import { ServicesSection } from "./ServicesSection";

export function HomePage() {
  const locale = useLocale();
  // TODO: replace mocks with API data
  const services = getServicesMock(locale);
  const clients = getClientProjectsMock(locale);

  return (
    <div className="relative flex flex-1 flex-col">
      <main className="flex-1 ">
        <HeroSection />
        <AboutSection />
        <ServicesSection services={services} />
        <ClientsSection clients={clients} />
        <ContactSection />
      </main>
    </div>
  );
}
