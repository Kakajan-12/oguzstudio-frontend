import { useTranslations } from "next-intl";
import { Container } from "@/shared/ui";

export function CareersCulture() {
  const t = useTranslations("CareersPage");

  return (
    <section className="pt-[52px] pb-[60px] lg:pt-20 lg:pb-[140px]">
      <Container className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,692px)] lg:gap-10">
        <h2 className="font-orbitron text-[32px] leading-[1.3] font-medium tracking-[-0.64px] text-balance text-black lg:text-[50px] lg:tracking-normal">
          {t("heading")}
        </h2>
        <div className="flex flex-col gap-3 text-justify text-base leading-[1.75] text-black lg:gap-4 lg:pt-3 lg:leading-[1.6] lg:tracking-[0.32px]">
          <p>{t("paragraph1")}</p>
          <p>{t("paragraph2")}</p>
          <p>{t("paragraph3")}</p>
        </div>
      </Container>
    </section>
  );
}
