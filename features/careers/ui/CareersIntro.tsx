import type { PageContent } from "@/shared/api/types";
import { Container } from "@/shared/ui";
import { ContentImage } from "@/shared/ui/ContentImage";

export function CareersIntro({ content }: { content: PageContent["careers"]["intro"] }) {
  return (
    <section className="pt-[112px] lg:pt-[152px]">
      <Container>
        <h1 className="font-orbitron text-[36px] leading-[1.3] font-bold tracking-[0.72px] text-dark lg:text-[56px] lg:leading-[1.2] lg:font-semibold lg:tracking-normal">
          {content.title}
        </h1>
      </Container>
      {content.image && (
        <div className="relative mt-[52px] h-[280px] w-full lg:mt-20 lg:h-[640px]">
          <ContentImage
            src={content.image}
            alt={content.imageAlt}
            fill
            preload
            sizes="100vw"
            className="object-cover"
          />
        </div>
      )}
    </section>
  );
}
