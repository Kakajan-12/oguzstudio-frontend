"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/shared/lib/cn";
import type { ClientProject } from "../model/types";
import { ProjectCard } from "./ProjectCard";

const TRANSITION = { duration: 0.4, ease: "easeOut" } as const;

type ClientsShowcaseProps = {
  clients: ClientProject[];
  className?: string;
};

/** Desktop: project card on the left follows the hovered client. Mobile: the list expands the card inline */
export function ClientsShowcase({ clients, className }: ClientsShowcaseProps) {
  const [desktopActiveId, setDesktopActiveId] = useState(clients[0]?.id);
  const [mobileActiveId, setMobileActiveId] = useState<string | null>(null);
  const activeClient =
    clients.find(({ id }) => id === desktopActiveId) ?? clients[0];

  const select = (id: string) => {
    setDesktopActiveId(id);
    setMobileActiveId((current) => (current === id ? null : id));
  };

  return (
    <div
      className={cn(
        "lg:grid lg:grid-cols-[minmax(0,592px)_minmax(0,492px)] lg:justify-between lg:gap-x-10",
        className,
      )}
    >
      {activeClient && (
        <div className="relative hidden lg:block">
          {/* popLayout takes the outgoing card out of flow so both cards crossfade in place */}
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={activeClient.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={TRANSITION}
            >
              <ProjectCard project={activeClient.project} />
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      <ul className="lg:pt-6">
        {clients.map((client) => {
          const isDesktopActive = client.id === activeClient?.id;
          const isMobileOpen = client.id === mobileActiveId;
          const panelId = `client-project-${client.id}`;

          return (
            <li
              key={client.id}
              onMouseEnter={() => setDesktopActiveId(client.id)}
              onFocus={() => setDesktopActiveId(client.id)}
              className={cn(
                "border-b border-line py-6 transition-colors duration-500 first:pt-0",
                isDesktopActive && "lg:border-muted",
              )}
            >
              <button
                type="button"
                aria-expanded={isMobileOpen || isDesktopActive}
                aria-controls={panelId}
                onClick={() => select(client.id)}
                className="flex w-full cursor-pointer items-center text-left"
              >
                {/* Width + margin animate instead of display so the title slides rather than jumps */}
                <motion.span
                  initial={false}
                  animate={
                    isDesktopActive
                      ? { width: 17, marginRight: 24, opacity: 1 }
                      : { width: 0, marginRight: 0, opacity: 0 }
                  }
                  transition={TRANSITION}
                  className="hidden shrink-0 overflow-hidden lg:block"
                >
                  <Image
                    src="/icons/double-chevron.svg"
                    alt=""
                    width={17}
                    height={19}
                    className="max-w-none"
                  />
                </motion.span>
                <span
                  className={cn(
                    "font-orbitron text-lg leading-[1.2] font-bold transition-colors duration-500 lg:text-[22px] lg:leading-[1.1] lg:font-semibold",
                    isMobileOpen ? "text-black" : "text-muted",
                    isDesktopActive ? "lg:text-black" : "lg:text-muted",
                  )}
                >
                  {client.client}
                </span>
              </button>

              {/* Mobile panel, height-animated on tap; the top gap lives inside so it collapses too */}
              <motion.div
                id={panelId}
                inert={!isMobileOpen}
                initial={false}
                animate={
                  isMobileOpen
                    ? { height: "auto", opacity: 1 }
                    : { height: 0, opacity: 0 }
                }
                transition={TRANSITION}
                className="overflow-hidden lg:hidden"
              >
                <ProjectCard project={client.project} className="pt-6" />
              </motion.div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
