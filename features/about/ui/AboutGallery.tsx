"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
} from "motion/react";
import { useTranslations } from "next-intl";
import { cn } from "@/shared/lib/cn";

const SLIDES = [
  { key: "essen", src: "/essen-billboard.webp", wide: false },
  { key: "workspace", src: "/workspace.webp", wide: true },
  { key: "shop", src: "/ghibli-shop.webp", wide: false },
  { key: "gallery", src: "/gallery.webp", wide: true },
] as const;

/** Pixels per second */
const SPEED = 60;

/** Full-bleed strip of photos scrolling endlessly to the left, paused on hover */
export function AboutGallery() {
  const t = useTranslations("AboutPage.gallery");
  const trackRef = useRef<HTMLUListElement>(null);
  const isPausedRef = useRef(false);
  const shouldReduceMotion = useReducedMotion();
  const x = useMotionValue(0);

  useAnimationFrame((_, delta) => {
    const track = trackRef.current;
    if (!track || isPausedRef.current || shouldReduceMotion) return;

    // The set is rendered twice, so after shifting by one set width the loop restarts seamlessly
    const setWidth = track.scrollWidth / 2;
    let next = x.get() - (SPEED * delta) / 1000;
    if (next <= -setWidth) next += setWidth;
    x.set(next);
  });

  const renderSet = (isCopy: boolean) =>
    SLIDES.map(({ key, src, wide }) => (
      <li
        key={`${key}-${isCopy ? "copy" : "original"}`}
        aria-hidden={isCopy || undefined}
        // Spacing lives on the item (not as flex gap) so both halves of the track are equal
        className="shrink-0 pr-2 lg:pr-4"
      >
        <div
          className={cn(
            "relative h-[280px] overflow-hidden rounded-[2px] lg:h-[480px]",
            wide ? "w-[320px] lg:w-[488px]" : "w-[196px] lg:w-[300px]",
          )}
        >
          <Image
            src={src}
            alt={isCopy ? "" : t(key)}
            fill
            sizes={wide ? "(min-width: 1024px) 488px, 320px" : "(min-width: 1024px) 300px, 196px"}
            className="object-cover"
          />
        </div>
      </li>
    ));

  return (
    <section
      className={cn(
        "mt-[52px] pb-[60px] lg:mt-20 lg:pb-[140px]",
        shouldReduceMotion ? "overflow-x-auto" : "overflow-hidden",
      )}
    >
      <motion.ul
        ref={trackRef}
        style={{ x }}
        onPointerEnter={() => (isPausedRef.current = true)}
        onPointerLeave={() => (isPausedRef.current = false)}
        className="flex w-max"
      >
        {renderSet(false)}
        {renderSet(true)}
      </motion.ul>
    </section>
  );
}
