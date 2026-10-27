import type { Locale } from "next-intl";
import type { Localized } from "@/features/home/model/types";
import type { TeamMember } from "../model/types";

type TeamMemberMock = {
  name: string;
  photo: string;
  role: Localized<string>;
};

const CEO: TeamMemberMock = {
  name: "Isa Meredov",
  photo: "/isa.jpg",
  role: { en: "CEO", ru: "CEO", tk: "CEO" },
};

const TEAM: TeamMemberMock[] = Array.from({ length: 8 }, () => CEO);

export function getTeamMock(locale: Locale): TeamMember[] {
  return TEAM.map(({ name, photo, role }, index) => ({
    id: `member-${index}`,
    name,
    photo,
    role: role[locale],
  }));
}
