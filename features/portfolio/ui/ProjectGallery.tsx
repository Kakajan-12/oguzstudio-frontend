"use client";

import { useState } from "react";
import { ContentImage as Image } from "@/shared/ui/ContentImage";
import { Modal } from "antd";
import { useTranslations } from "next-intl";
import { Container } from "@/shared/ui";
import { cn } from "@/shared/lib/cn";

const DESKTOP_QUERY = "(min-width: 1024px)";

type ProjectGalleryProps = {
  title: string;
  images: string[];
};

function formatIndex(index: number) {
  return String(index).padStart(2, "0");
}

/**
 * Row of narrow photos. On desktop a click widens the photo to half of the screen (a second click collapses it),
 * on mobile the photo opens in a fullscreen viewer instead
 */
export function ProjectGallery({ title, images }: ProjectGalleryProps) {
  const t = useTranslations("ProjectPage.gallery");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);
  const total = formatIndex(images.length);

  const getAlt = (index: number) => t("imageAlt", { title, index: index + 1 });

  const handleClick = (index: number) => {
    if (window.matchMedia(DESKTOP_QUERY).matches) {
      setActiveIndex((current) => (current === index ? null : index));
    } else {
      setPreviewIndex(index);
    }
  };

  const closePreview = () => setPreviewIndex(null);

  return (
    <section className="mt-14 lg:mt-20">
      <Container>
        {/* Below lg a swipeable strip: squeezing every photo into one row leaves unreadable slivers */}
        <ul className="-mx-4 flex h-[360px] snap-x snap-mandatory scroll-px-4 gap-2 overflow-x-auto px-4 [scrollbar-width:none] lg:mx-0 lg:h-[640px] lg:snap-none lg:gap-3 lg:overflow-visible lg:px-0">
          {images.map((src, index) => {
            const isActive = index === activeIndex;
            const number = index + 1;

            return (
              <li
                key={`${src}-${index}`}
                className={cn(
                  "w-[78%] shrink-0 snap-start sm:w-[45%]",
                  "lg:w-auto lg:min-w-0 lg:flex-[1_1_0%] lg:transition-[flex-grow,flex-basis] lg:duration-500 lg:ease-out motion-reduce:transition-none",
                  isActive && "lg:flex-[0_0_50vw]",
                )}
              >
                <button
                  type="button"
                  aria-expanded={isActive}
                  aria-label={t(isActive ? "collapse" : "expand", { index: number })}
                  onClick={() => handleClick(index)}
                  className={cn(
                    "group relative block size-full overflow-hidden rounded-[2px]",
                    isActive ? "lg:cursor-zoom-out" : "lg:cursor-zoom-in",
                  )}
                >
                  <Image
                    src={src}
                    alt={getAlt(index)}
                    fill
                    sizes="(min-width: 1024px) 50vw, 80vw"
                    className="object-cover"
                  />
                  <span className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
                  <span className="absolute bottom-3 left-3 font-numeric text-xs leading-none font-medium whitespace-nowrap text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.65)] lg:bottom-4 lg:left-4 lg:text-sm">
                    {formatIndex(number)} / {total}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </Container>

      <Modal
        open={previewIndex !== null}
        onCancel={closePreview}
        footer={null}
        closable={false}
        centered
        destroyOnHidden
        width="fit-content"
        rootClassName="lg:hidden"
        styles={{
          mask: { background: "rgba(15, 15, 15, 0.8)" },
          container: { padding: 0, background: "transparent", boxShadow: "none" },
          body: { padding: 0 },
        }}
      >
        {previewIndex !== null && (
          <div className="flex flex-col items-end gap-5">
            <button
              type="button"
              aria-label={t("close")}
              onClick={closePreview}
              className="relative -mr-1.5 size-7"
            >
              <span className="absolute top-1/2 left-0.5 h-0.5 w-6 rotate-45 rounded-full bg-white" />
              <span className="absolute top-1/2 left-0.5 h-0.5 w-6 -rotate-45 rounded-full bg-white" />
            </button>
            <div className="relative aspect-[2/3] w-[min(calc(100vw-104px),calc((100dvh-160px)*2/3))] overflow-hidden rounded-[2px]">
              <Image
                src={images[previewIndex]}
                alt={getAlt(previewIndex)}
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
