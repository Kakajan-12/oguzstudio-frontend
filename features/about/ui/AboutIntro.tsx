import type { PageContent } from "@/shared/api/types";
import { Container } from "@/shared/ui";

export function AboutIntro({ content }: { content: PageContent["about"]["intro"] }) {
  return (
    <section className="pt-[112px] lg:pt-[152px]">
      <Container className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,692px)] lg:gap-10">
        <h1 className="font-orbitron text-[36px] leading-[1.3] font-bold tracking-[0.72px] text-dark lg:text-[56px] lg:leading-[1.2] lg:font-semibold lg:tracking-normal">
          {content.title}
        </h1>
        <div className="flex flex-col gap-3 lg:text-justify text-base leading-[1.75] text-black lg:gap-4 lg:pt-10 lg:leading-[1.6] lg:tracking-[0.32px]">
          {content.paragraph1 && <p>{content.paragraph1}</p>}
          {content.paragraph2 && <p>{content.paragraph2}</p>}
        </div>
      </Container>
    </section>
  );
}
