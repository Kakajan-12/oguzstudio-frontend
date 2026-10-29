import type { PageContent } from "@/shared/api/types";
import { Container } from "@/shared/ui";

export function CareersCulture({ content }: { content: PageContent["careers"]["intro"] }) {
  const paragraphs = [content.paragraph1, content.paragraph2, content.paragraph3].filter(Boolean);

  return (
    <section className="pt-[52px] pb-[60px] lg:pt-20 lg:pb-[140px]">
      <Container className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,692px)] lg:gap-10">
        <h2 className="font-orbitron text-[32px] leading-[1.3] font-medium tracking-[-0.64px] text-balance text-black lg:text-[50px] lg:tracking-normal">
          {content.heading}
        </h2>
        <div className="flex flex-col gap-3 lg:text-justify text-base leading-[1.75] text-black lg:gap-4 lg:pt-3 lg:leading-[1.6] lg:tracking-[0.32px]">
          {paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </Container>
    </section>
  );
}
