"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Container } from "@/shared/ui";
import { cn } from "@/shared/lib/cn";
import {
  FILTER_KEYS,
  getFilterOptions,
  matchesFilter,
  type ActiveFilter,
  type FilterKey,
} from "../model/filters";
import type { PortfolioProject } from "../model/types";
import { PortfolioCard } from "./PortfolioCard";
import { PortfolioFilter, PortfolioFilterChip } from "./PortfolioFilter";

const FILTER_WIDTHS: Record<FilterKey, string> = {
  category: "lg:w-[200px]",
  country: "lg:w-[168px]",
  year: "lg:w-[108px]",
};

// The desktop grid repeats a 16-card pattern: [wide, narrow], 3 rows of 3, [narrow, wide], 3 rows of 3
const PATTERN_SIZE = 16;
const FEATURED_POSITIONS = [0, 9];

const DESKTOP_PAGE_SIZE = PATTERN_SIZE;
const MOBILE_PAGE_SIZE = 6;

export function PortfolioSection({ projects }: { projects: PortfolioProject[] }) {
  const t = useTranslations("PortfolioPage");
  const [filter, setFilter] = useState<ActiveFilter | null>(null);
  const [pages, setPages] = useState(1);

  const filteredProjects = projects.filter((project) =>
    matchesFilter(project, filter),
  );
  const mobileCount = pages * MOBILE_PAGE_SIZE;
  const desktopCount = pages * DESKTOP_PAGE_SIZE;
  const hasMoreMobile = filteredProjects.length > mobileCount;
  const hasMoreDesktop = filteredProjects.length > desktopCount;

  const changeFilter = (next: ActiveFilter | null) => {
    setFilter(next);
    setPages(1);
  };

  return (
    <section className="pt-[112px] pb-[60px] lg:pt-[152px] lg:pb-[140px]">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
          <h1 className="font-orbitron text-[36px] leading-[1.3] font-bold tracking-[0.72px] text-dark lg:text-[56px] lg:leading-[1.2] lg:font-semibold lg:tracking-normal">
            {t("title")}
          </h1>
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:gap-7">
            <p className="text-sm leading-none font-bold tracking-[0.28px] text-black uppercase">
              {t("filter")}
            </p>
            {filter ? (
              <PortfolioFilterChip
                label={filter.option.label}
                clearLabel={t("filters.clear")}
                onClear={() => changeFilter(null)}
              />
            ) : (
              <div className="grid grid-cols-[126fr_120fr_96fr] gap-2 lg:flex lg:gap-3">
                {FILTER_KEYS.map((key) => (
                  <PortfolioFilter
                    key={key}
                    label={t(`filters.${key}`)}
                    options={getFilterOptions(projects, key)}
                    onSelect={(option) => changeFilter({ key, option })}
                    className={FILTER_WIDTHS[key]}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {filteredProjects.length > 0 ? (
          <div className="mt-[52px] grid gap-y-9 md:grid-cols-2 md:gap-x-4 lg:mt-20 lg:grid-cols-3 lg:gap-y-14">
            {filteredProjects.slice(0, desktopCount).map((project, index) => (
              <PortfolioCard
                key={project.id}
                project={project}
                // Filtered results are shown as an even grid without the wide cards
                featured={
                  !filter &&
                  FEATURED_POSITIONS.includes(index % PATTERN_SIZE)
                }
                className={cn(index >= mobileCount && "max-lg:hidden")}
              />
            ))}
          </div>
        ) : (
          <p className="mt-[52px] text-base leading-normal text-muted lg:mt-20">
            {t("empty")}
          </p>
        )}

        {(hasMoreMobile || hasMoreDesktop) && (
          <button
            type="button"
            onClick={() => setPages((current) => current + 1)}
            className={cn(
              "group mt-9 flex w-full cursor-pointer flex-col items-center gap-3 lg:mx-auto lg:mt-14 lg:w-[288px]",
              !hasMoreMobile && "max-lg:hidden",
              !hasMoreDesktop && "lg:hidden",
            )}
          >
            <span className="flex items-center gap-3 text-base leading-none font-semibold tracking-[0.32px] text-black">
              {t("showMore")}
              <Image
                src="/icons/plus.svg"
                alt=""
                width={16}
                height={16}
                className="size-4 transition-transform duration-300 group-hover:rotate-90"
              />
            </span>
            <span className="h-0.5 w-full bg-black" />
          </button>
        )}
      </Container>
    </section>
  );
}
