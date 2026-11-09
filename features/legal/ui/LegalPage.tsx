import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { getPageContent } from "@/shared/api/content";
import type { LegalKey } from "@/shared/config/navigation";
import { Container } from "@/shared/ui";

const HEADING_PREFIX = /^#\s+/;

function LegalBody({ content }: { content: string }) {
  const blocks = content
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean);

  return (
    <div className="mt-8 flex max-w-200 flex-col gap-4 text-sm leading-[1.6] whitespace-pre-line text-dark lg:mt-12 lg:text-base">
      {blocks.map((block, index) =>
        HEADING_PREFIX.test(block) ? (
          <h2 key={index} className="mt-4 font-orbitron text-lg leading-[1.3] font-medium lg:text-2xl">
            {block.replace(HEADING_PREFIX, "")}
          </h2>
        ) : (
          <p key={index}>{block}</p>
        ),
      )}
    </div>
  );
}

export async function LegalPage({ page }: { page: LegalKey }) {
  const locale = await getLocale();
  const [t, legal] = await Promise.all([getTranslations("Footer"), getPageContent("legal", locale)]);
  const { content } = legal[page];
  if (!content) notFound();

  return (
    <div className="relative flex flex-1 flex-col">
      <main className="flex-1">
        <section className="pt-[112px] pb-[60px] lg:pt-[152px] lg:pb-[140px]">
          <Container>
            <h1 className="font-orbitron text-[32px] leading-[1.3] font-bold text-dark lg:text-[50px] lg:leading-[1.2] lg:font-semibold">
              {t(page)}
            </h1>
            <LegalBody content={content} />
          </Container>
        </section>
      </main>
    </div>
  );
}
