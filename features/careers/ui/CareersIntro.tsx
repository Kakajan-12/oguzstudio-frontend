import Image from "next/image";
import { useTranslations } from "next-intl";
import { Container } from "@/shared/ui";

export function CareersIntro() {
  const t = useTranslations("CareersPage");

  return (
    <section className="pt-[112px] lg:pt-[152px]">
      <Container>
        <h1 className="font-orbitron text-[36px] leading-[1.3] font-bold tracking-[0.72px] text-dark lg:text-[56px] lg:leading-[1.2] lg:font-semibold lg:tracking-normal">
          {t("title")}
        </h1>
      </Container>
      <div className="relative mt-[52px] h-[280px] w-full lg:mt-20 lg:h-[640px]">
        <Image
          src="/team-meeting.webp"
          alt={t("imageAlt")}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>
    </section>
  );
}
