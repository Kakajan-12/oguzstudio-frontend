import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/shared/ui";
import type { PortfolioProjectDetails } from "../model/types";

/** Back link, project title and the cover photo */
export function ProjectIntro({ project }: { project: PortfolioProjectDetails }) {
  const t = useTranslations("ProjectPage");

  return (
    <section className="pt-[92px] lg:pt-[120px]">
      <Container>
        <Link
          href="/portfolio"
          className="group inline-flex items-center gap-2 text-sm leading-none font-medium tracking-[0.28px] text-black"
        >
          <Image
            src="/icons/chevron-small.svg"
            alt=""
            width={9}
            height={12}
            className="h-2.5 w-[7px] rotate-180 transition-transform duration-300 group-hover:-translate-x-0.5"
          />
          {t("back")}
        </Link>
        <h1 className="mt-5 font-orbitron text-[36px] leading-[1.3] font-bold tracking-[0.72px] text-dark lg:mt-8 lg:text-[56px] lg:leading-[1.2] lg:font-semibold lg:tracking-normal">
          {project.title}
        </h1>
        <div className="relative mt-8 aspect-[358/240] w-full overflow-hidden rounded-[2px] lg:mt-12 lg:aspect-[1200/800]">
          <Image
            src={project.image}
            alt={project.title}
            fill
            priority
            sizes="(min-width: 1232px) 1200px, 100vw"
            className="object-cover"
          />
        </div>
      </Container>
    </section>
  );
}
