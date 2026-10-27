import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowLink, SectionHeading } from "@/shared/ui";

export function AboutSection() {
  const t = useTranslations("HomePage.about");

  return (
    <section className="mt-13 grid lg:mt-15 lg:grid-cols-[minmax(0,1fr)_minmax(0,592px)] lg:items-center lg:gap-x-[clamp(32px,8vw,116px)] lg:pr-[max(16px,calc((100%-1200px)/2))]">
      <SectionHeading
        label={t("label")}
        title={t("title")}
        className="px-4 lg:col-start-2 lg:row-start-1 lg:px-0"
      />

      <div className="relative mt-7 h-60 sm:h-80 md:h-96 overflow-hidden rounded-r-xs lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:mt-0 lg:h-110">
        <Image
          src="/adelaide-banner.webp"
          alt={t("imageAlt")}
          fill
          sizes="(min-width: 1024px) 45vw, 100vw"
          className="object-cover object-[50%_45%] lg:object-[50%_54%]"
        />
      </div>

      <div className="mt-5 px-4 lg:col-start-2 lg:row-start-2 lg:mt-10 lg:px-0">
        <div className="flex flex-col gap-3 text-justify text-base lg:gap-4 lg:leading-[1.6] lg:tracking-[0.32px]">
          <p>{t("paragraph1")}</p>
          <p>{t("paragraph2")}</p>
        </div>
        <ArrowLink href="/about" className="mt-6 lg:mt-8">
          {t("readMore")}
        </ArrowLink>
      </div>
    </section>
  );
}
