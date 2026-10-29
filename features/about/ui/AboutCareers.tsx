import { useTranslations } from "next-intl";
import type { PageContent } from "@/shared/api/types";
import { ArrowLink } from "@/shared/ui";
import { ContentImage } from "@/shared/ui/ContentImage";

export function AboutCareers({ content }: { content: PageContent["about"]["careers"] }) {
  const t = useTranslations("AboutPage.careers");

  return (
    // Desktop: the image bleeds to the right viewport edge, the text column aligns with the 1200px container
    <section className="grid py-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,680px)] lg:items-center lg:gap-x-[clamp(32px,8vw,120px)] lg:py-[140px] lg:pl-[max(16px,calc((100%-1200px)/2))]">
      <div className="px-4 lg:px-0">
        <h2 className="max-w-[292px] font-orbitron text-[32px] leading-[1.3] font-medium tracking-[-0.64px] text-balance text-black lg:max-w-[520px] lg:text-[50px] lg:tracking-normal">
          {content.title}
        </h2>
        <p className="mt-5 lg:text-justify text-base leading-[1.75] text-black lg:mt-10 lg:max-w-[520px] lg:leading-[1.6] lg:tracking-[0.32px]">
          {content.description}
        </p>
        <ArrowLink href="/careers" className="mt-6 lg:mt-8">
          {t("link")}
        </ArrowLink>
      </div>

      <div className="relative mt-10 h-[240px] overflow-hidden rounded-l-[2px] lg:mt-0 lg:h-[518px]">
        {content.image && (
          <ContentImage
            src={content.image}
            alt={content.imageAlt}
            fill
            sizes="(min-width: 1024px) 680px, 100vw"
            className="object-cover"
          />
        )}
      </div>
    </section>
  );
}
