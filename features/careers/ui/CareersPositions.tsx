"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { CONTACTS } from "@/shared/config/contacts";
import { cn } from "@/shared/lib/cn";
import { ArrowLink, Container } from "@/shared/ui";
import type { Position } from "../model/types";

const TRANSITION = { duration: 0.4, ease: "easeOut" } as const;

function PositionMeta({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex items-center gap-2">
      <Image src="/icons/slash-small.svg" alt="" width={4} height={14} />
      {children}
    </span>
  );
}

type CareersPositionsProps = {
  positions: Position[];
};

/** "Open Positions" accordion: one vacancy expanded at a time, the first one by default */
export function CareersPositions({ positions }: CareersPositionsProps) {
  const t = useTranslations("CareersPage.positions");
  const [activeId, setActiveId] = useState<string | null>(
    positions[0]?.id ?? null,
  );

  const toggle = (id: string) => {
    setActiveId((current) => (current === id ? null : id));
  };

  return (
    <section className="pb-[60px] lg:pb-[140px]">
      <Container>
        <h2 className="font-orbitron text-[32px] leading-[1.3] font-medium tracking-[-0.64px] text-balance text-black lg:text-[50px] lg:tracking-normal">
          {t("title")}
        </h2>

        <ul className="mt-10 border-t border-line lg:mx-auto lg:mt-[52px] lg:max-w-[998px]">
          {positions.map((position) => {
            const isOpen = activeId === position.id;
            const panelId = `position-panel-${position.id}`;
            const applyHref = `mailto:${CONTACTS.email}?subject=${encodeURIComponent(position.title)}`;

            return (
              <li
                key={position.id}
                className={cn(
                  "border-b transition-colors duration-500",
                  isOpen ? "border-muted" : "border-line",
                )}
              >
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggle(position.id)}
                    className={cn(
                      "flex w-full cursor-pointer items-center justify-between gap-4 py-5 text-left font-orbitron text-lg leading-[1.2] font-bold transition-colors duration-300 lg:py-7 lg:text-[26px] lg:leading-[1.1] lg:font-semibold",
                      isOpen ? "text-black" : "text-muted hover:text-black",
                    )}
                  >
                    {position.title}
                    <span className="flex h-[15px] w-6 shrink-0 items-center justify-center lg:hidden">
                      <Image
                        src="/icons/chevron.svg"
                        alt=""
                        width={15}
                        height={24}
                        className={cn(
                          "transition-transform duration-300",
                          isOpen ? "-rotate-90" : "rotate-90",
                        )}
                      />
                    </span>
                  </button>
                </h3>

                <motion.div
                  id={panelId}
                  inert={!isOpen}
                  initial={false}
                  animate={
                    isOpen
                      ? { height: "auto", opacity: 1 }
                      : { height: 0, opacity: 0 }
                  }
                  transition={TRANSITION}
                  // Clip only vertically for the height animation, so the hovered
                  // "Apply now" arrow and underline can overflow to the right
                  className="overflow-x-visible overflow-y-clip"
                >
                  <div className="flex flex-col items-end gap-2 pb-5 lg:pb-7">
                    <div className="flex w-full flex-col gap-6">
                      <div className="flex flex-col gap-4">
                        <p className="text-justify text-base leading-[1.75] text-black lg:leading-normal lg:tracking-[0.32px]">
                          {position.description}
                        </p>

                        <div className="flex flex-col gap-3 lg:max-w-[539px]">
                          <h4 className="text-base leading-normal font-medium text-black lg:text-lg lg:tracking-[0.36px]">
                            {t("requirements")}
                          </h4>
                          <ul className="flex flex-col gap-1.5">
                            {position.requirements.map((item) => (
                              <li
                                key={item}
                                className="flex items-start gap-3 text-base leading-normal text-black lg:tracking-[0.32px]"
                              >
                                <span
                                  aria-hidden
                                  className="mt-[9.5px] size-[5px] shrink-0 rounded-full bg-black"
                                />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <p className="flex flex-wrap gap-x-10 gap-y-2 text-sm leading-normal tracking-[0.28px] text-muted">
                        <PositionMeta>{position.type}</PositionMeta>
                        <PositionMeta>{position.location}</PositionMeta>
                      </p>
                    </div>

                    <ArrowLink href={applyHref} widthClassName="w-[187px]">
                      {t("apply")}
                    </ArrowLink>
                  </div>
                </motion.div>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
