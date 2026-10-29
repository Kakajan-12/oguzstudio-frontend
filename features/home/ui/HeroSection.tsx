import { useTranslations } from "next-intl";
import type { PageContent } from "@/shared/api/types";
import { Container, GradientFade, LinkButton } from "@/shared/ui";
import { ContentImage } from "@/shared/ui/ContentImage";

export function HeroSection({ content }: { content: PageContent["home"]["hero"] }) {
  const t = useTranslations("HomePage.hero");

  return (
    <section>
      <div className="relative bg-dark pt-15 lg:min-h-187.5 lg:pt-0">
        {content.image && (
          <div className="relative h-70 lg:hidden">
            <ContentImage
              src={content.image}
              alt={content.imageAlt}
              fill
              loading="eager"
              sizes="100vw"
              className="object-cover object-bottom"
            />
            <div className="absolute inset-x-0 top-5 -bottom-5 bg-[linear-gradient(0deg,#0f0f0f_0%,rgba(15,15,15,0.99)_9.34%,rgba(15,15,15,0.875)_22.52%,rgba(15,15,15,0.66)_28.03%,rgba(15,15,15,0)_37.37%)]" />
          </div>
        )}

        {content.image && (
          <div className="absolute top-0 right-0 bottom-2.5 left-[calc(50%-60px)] hidden lg:block">
            <ContentImage
              src={content.image}
              alt={content.imageAlt}
              fill
              loading="eager"
              fetchPriority="high"
              sizes="55vw"
              className="object-cover object-[33%_center]"
            />
            <div className="absolute inset-0 bg-black/10" />
          </div>
        )}

        <Container className="relative pt-19 pb-1 lg:pt-69 lg:pb-27.5">
          <div className="flex flex-col gap-8 lg:max-w-[min(492px,calc(50%-100px))] lg:gap-7">
            <div className="flex flex-col gap-2 text-white lg:gap-3">
              <h1 className="max-w-82 font-orbitron text-4xl lg:max-w-none lg:text-5xl font-semibold xl:text-[56px]">
                {content.title}
              </h1>
              <p className="lg:text-justify text-base lg:max-w-105">
                {content.description}
              </p>
            </div>
            <div className="flex flex-col gap-2 lg:flex-row lg:gap-4">
              <LinkButton href="/contacts">{t("consultation")}</LinkButton>
              <LinkButton href="/portfolio" variant="outline">
                {t("explore")}
              </LinkButton>
            </div>
          </div>
        </Container>
      </div>
      <GradientFade direction="toLight" />
    </section>
  );
}
