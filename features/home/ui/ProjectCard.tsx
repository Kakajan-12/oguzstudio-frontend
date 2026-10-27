import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { ClientProject } from "../model/types";

type ProjectCardProps = {
  project: ClientProject["project"];
  className?: string;
};

export function ProjectCard({ project, className }: ProjectCardProps) {
  return (
    <article className={className}>
      <Link
        href={`/portfolio/${project.id}`}
        className="group flex flex-col gap-5"
      >
        <div className="relative aspect-[592/360] w-full overflow-hidden rounded-[2px]">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(min-width: 1024px) 592px, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="font-orbitron text-lg leading-[1.4] font-semibold text-black">
            {project.title}
          </h3>
          <div className="flex flex-col gap-3">
            <p className="flex items-center gap-2 text-sm leading-[1.2] text-muted">
              <span aria-hidden className="size-[5px] rounded-full bg-muted" />
              {project.category}
            </p>
            <p className="text-justify text-base leading-normal text-black">
              {project.description}
            </p>
          </div>
        </div>
      </Link>
    </article>
  );
}
