import { Container } from "@/shared/ui";

/** Placeholder with the layout of the project intro, shown while the project id is resolved */
export function ProjectPageSkeleton() {
  return (
    <main aria-busy className="flex-1 pb-[60px] lg:pb-[140px]">
      <section className="pt-[92px] lg:pt-[120px]">
        <Container className="animate-pulse">
          <div className="h-3.5 w-32 rounded-[2px] bg-line" />
          <div className="mt-5 h-[47px] w-3/4 rounded-[2px] bg-line lg:mt-8 lg:h-[67px] lg:w-1/2" />
          <div className="mt-8 aspect-[358/240] w-full rounded-[2px] bg-line lg:mt-12 lg:aspect-[1200/800]" />
        </Container>
      </section>
    </main>
  );
}
