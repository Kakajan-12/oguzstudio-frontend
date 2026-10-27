import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { cn } from "@/shared/lib/cn";
import type { PortfolioProject } from "../model/types";

type PortfolioCardProps = {
  project: PortfolioProject;
  /** Featured cards span two columns with a taller image */
  featured?: boolean;
  className?: string;
};

export function PortfolioCard({
  project,
  featured = false,
  className,
}: PortfolioCardProps) {
  return (
    <article className={cn(featured && "md:col-span-2", className)}>
      <Link
        href={`/portfolio/${project.id}`}
        className="group flex flex-col gap-3 lg:gap-4"
      >
        <div
          className={cn(
            "relative aspect-[358/232] w-full overflow-hidden rounded-[2px]",
            featured ? "lg:aspect-[794/460]" : "lg:aspect-[390/280]",
          )}
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes={
              featured
                ? "(min-width: 1024px) 794px, 100vw"
                : "(min-width: 1024px) 390px, (min-width: 768px) 50vw, 100vw"
            }
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="font-orbitron text-base leading-[1.2] font-semibold text-black lg:text-lg lg:leading-[1.4]">
            {project.title}
          </h2>
          <p className="text-sm leading-normal text-muted lg:text-base">
            {project.description}
          </p>
        </div>
      </Link>
    </article>
  );
}
