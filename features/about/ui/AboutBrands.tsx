import Image from "next/image";
import { useTranslations } from "next-intl";
import { Container } from "@/shared/ui";
import type { Brand } from "../model/types";

export function AboutBrands({ brands }: { brands: Brand[] }) {
  const t = useTranslations("AboutPage.brands");

  return (
    <section className="bg-dark py-[52px] text-white lg:py-[100px]">
      <Container className="flex flex-col gap-8 lg:flex-row lg:justify-between lg:gap-10">
        <h2 className="font-orbitron text-lg leading-[1.2] font-medium lg:text-[22px] lg:leading-[1.1]">
          {t("title")}
        </h2>
        <ul className="grid grid-cols-3 gap-x-4 gap-y-4 lg:grid-cols-[repeat(3,205px)] lg:gap-x-9 lg:gap-y-[38px]">
          {brands.map((brand) => (
            <li key={brand.id} className="relative aspect-[818/480]">
              <Image
                src={brand.logo}
                alt={brand.name}
                fill
                sizes="(min-width: 1024px) 205px, 33vw"
                className="object-contain"
              />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
