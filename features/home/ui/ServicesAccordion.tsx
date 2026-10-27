"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { cn } from "@/shared/lib/cn";
import { DotList } from "@/shared/ui";
import type { Service } from "../model/types";

const TRANSITION = { duration: 0.4, ease: "easeOut" } as const;

function ServiceImages({ service, className }: { service: Service; className?: string }) {
  return (
    <div className={cn("grid grid-cols-2 gap-3 lg:flex", className)}>
      {service.images.map((image, index) => (
        <div
          key={`${image}-${index}`}
          className="relative aspect-[252/180] overflow-hidden rounded-[2px] lg:aspect-auto lg:h-[180px] lg:w-[252px]"
        >
          <Image
            src={image}
            alt={service.title}
            fill
            sizes="(min-width: 1024px) 252px, 50vw"
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
}

type ServicesAccordionProps = {
  services: Service[];
  className?: string;
};

export function ServicesAccordion({ services, className }: ServicesAccordionProps) {
  // Desktop expands the hovered (or keyboard-focused) row, mobile toggles on tap
  const [desktopActiveId, setDesktopActiveId] = useState<string | null>(null);
  const [mobileActiveId, setMobileActiveId] = useState<string | null>(null);

  const select = (id: string) => {
    setMobileActiveId((current) => (current === id ? null : id));
  };

  return (
    <ul className={cn("border-t border-line", className)}>
      {services.map((service, index) => {
        const isDesktopOpen = desktopActiveId === service.id;
        const isMobileOpen = mobileActiveId === service.id;
        const panelId = `service-panel-${service.id}`;

        return (
          <li
            key={service.id}
            onMouseEnter={() => setDesktopActiveId(service.id)}
            onMouseLeave={() => setDesktopActiveId(null)}
            onFocus={() => setDesktopActiveId(service.id)}
            onBlur={() => setDesktopActiveId(null)}
            className={cn(
              "relative border-b border-line transition-colors duration-500",
              isDesktopOpen && "lg:border-muted",
            )}
          >
            <div className="py-6 lg:grid lg:grid-cols-[516px_minmax(0,552px)] lg:gap-x-[52px] lg:px-10">
              {/* Stretches to the row height, so the number sits at the top while the
                  text column stays centered as the images grow */}
              <div className="relative hidden lg:block">
                <motion.span
                  initial={false}
                  animate={{ opacity: isDesktopOpen ? 0 : 1 }}
                  transition={TRANSITION}
                  className="absolute top-0 left-0 font-numeric text-[22px] leading-[1.1] font-medium text-muted"
                >
                  {String(index + 1).padStart(2, "0")}
                </motion.span>
                <motion.div
                  initial={false}
                  animate={
                    isDesktopOpen
                      ? { height: 180, opacity: 1 }
                      : { height: 0, opacity: 0 }
                  }
                  transition={TRANSITION}
                  className="overflow-hidden"
                >
                  <ServiceImages service={service} />
                </motion.div>
              </div>

              <div className="lg:self-center">
                <h3>
                  {/* The ::after overlay stretches the button over the whole row */}
                  <button
                    type="button"
                    aria-expanded={isDesktopOpen || isMobileOpen}
                    aria-controls={panelId}
                    onClick={() => select(service.id)}
                    className="flex w-full cursor-pointer items-center justify-between gap-4 text-left after:absolute after:inset-0"
                  >
                    <span className="font-orbitron text-lg leading-[1.2] font-bold text-black lg:text-[22px] lg:leading-[1.1] lg:font-semibold">
                      {service.title}
                    </span>
                    <span className="flex h-[15px] w-6 shrink-0 items-center justify-center lg:hidden">
                      <Image
                        src="/icons/chevron.svg"
                        alt=""
                        width={15}
                        height={24}
                        className={cn(
                          "transition-transform duration-300",
                          isMobileOpen ? "-rotate-90" : "rotate-90",
                        )}
                      />
                    </span>
                  </button>
                </h3>

                <DotList
                  items={service.tags}
                  className={cn("mt-3", !isMobileOpen && "hidden lg:flex")}
                />

                <div id={panelId} className={cn("lg:hidden", !isMobileOpen && "hidden")}>
                  <ServiceImages service={service} className="mt-4" />
                  <p className="mt-4 text-justify text-base leading-normal tracking-[0.32px] text-black">
                    {service.description}
                  </p>
                </div>

                {/* Desktop copy of the description, height-animated on hover */}
                <motion.div
                  initial={false}
                  animate={
                    isDesktopOpen
                      ? { height: "auto", opacity: 1 }
                      : { height: 0, opacity: 0 }
                  }
                  transition={TRANSITION}
                  className="hidden overflow-hidden lg:block"
                >
                  <p className="pt-4 text-justify text-base leading-normal tracking-[0.32px] text-black">
                    {service.description}
                  </p>
                </motion.div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
