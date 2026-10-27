import Image from "next/image";
import { useTranslations } from "next-intl";
import { Container } from "@/shared/ui";
import type { TeamMember } from "../model/types";

export function AboutTeam({ members }: { members: TeamMember[] }) {
  const t = useTranslations("AboutPage.team");

  return (
    <section className="mt-20 pb-20 lg:mt-[140px] lg:pb-[140px]">
      <Container>
        <h2 className="max-w-[292px] font-orbitron text-[32px] leading-[1.3] font-medium tracking-[-0.64px] text-balance text-black lg:max-w-[600px] lg:text-[50px] lg:tracking-normal">
          {t("title")}
        </h2>
        <ul className="mt-10 grid grid-cols-2 gap-x-3 gap-y-8 lg:mt-[52px] lg:grid-cols-4 lg:gap-x-4 lg:gap-y-10">
          {members.map((member) => (
            <li key={member.id}>
              <div className="relative aspect-[287/334] overflow-hidden rounded-[2px]">
                <Image
                  src={member.photo}
                  alt={member.name}
                  fill
                  sizes="(min-width: 1024px) 288px, 50vw"
                  className="object-cover"
                />
              </div>
              <p className="mt-3 font-orbitron text-sm leading-[1.2] font-semibold text-black lg:mt-4 lg:text-base">
                {member.name}
              </p>
              <p className="mt-1 text-xs leading-[1.4] text-muted lg:text-sm">
                {member.role}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
