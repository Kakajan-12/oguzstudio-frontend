import type { Locale } from "next-intl";
import type { Localized } from "@/features/home/model/types";
import type { Position } from "../model/types";

type PositionMock = {
  id: string;
  title: Localized<string>;
  description: Localized<string>;
  requirements: Localized<string[]>;
  type: Localized<string>;
  location: Localized<string>;
};

const FULL_TIME: Localized<string> = {
  en: "Full-time",
  ru: "Полная занятость",
  tk: "Doly iş güni",
};

const ASHGABAT: Localized<string> = {
  en: "Ashgabat, Turkmenistan",
  ru: "Ашхабад, Туркменистан",
  tk: "Aşgabat, Türkmenistan",
};

// TODO: replace with API data once the vacancies endpoint is ready
const POSITIONS: PositionMock[] = [
  {
    id: "3d-designer",
    title: {
      en: "3D Designer",
      ru: "3D-дизайнер",
      tk: "3D dizaýner",
    },
    description: {
      en: "We’re looking for a creative 3D Designer to turn ideas and concepts into clear, detailed, and visually compelling 3D designs. You’ll work on a variety of projects, developing visuals from initial concepts through to final presentation.",
      ru: "Мы ищем креативного 3D-дизайнера, который будет превращать идеи и концепции в понятные, детализированные и визуально выразительные 3D-проекты. Вы будете работать над разными проектами, развивая визуализации от первых концепций до финальной презентации.",
      tk: "Pikirleri we konsepsiýalary düşnükli, jikme-jik we wizual taýdan täsirli 3D dizaýnlara öwürjek döredijilikli 3D dizaýner gözleýäris. Dürli taslamalaryň üstünde işläp, wizuallary ilkinji konsepsiýadan soňky prezentasiýa çenli ösdürersiňiz.",
    },
    requirements: {
      en: [
        "Proficiency in 3D modeling and visualization software",
        "Strong understanding of modeling, materials, lighting, and composition",
        "Experience creating realistic and presentation-ready 3D visuals",
        "Good sense of design, proportion, and attention to detail",
        "Ability to work independently and meet project deadlines",
        "Portfolio demonstrating relevant 3D work",
      ],
      ru: [
        "Уверенное владение программами для 3D-моделирования и визуализации",
        "Глубокое понимание моделирования, материалов, освещения и композиции",
        "Опыт создания реалистичных, готовых к презентации 3D-визуализаций",
        "Хорошее чувство дизайна и пропорций, внимание к деталям",
        "Умение работать самостоятельно и соблюдать сроки проектов",
        "Портфолио с релевантными 3D-работами",
      ],
      tk: [
        "3D modelirleme we wizualizasiýa programmalaryny ynamly bilmek",
        "Modelirleme, materiallar, yşyklandyryş we kompozisiýa boýunça çuň düşünje",
        "Realistik we prezentasiýa taýýar 3D wizuallary döretmek tejribesi",
        "Dizaýn we proporsiýa duýgusy, jikme-jikliklere üns",
        "Özbaşdak işlemek we taslama möhletlerini berjaý etmek ukyby",
        "Degişli 3D işlerini görkezýän portfolio",
      ],
    },
    type: FULL_TIME,
    location: ASHGABAT,
  },
  {
    id: "graphic-designer",
    title: {
      en: "Graphic Designer",
      ru: "Графический дизайнер",
      tk: "Grafiki dizaýner",
    },
    description: {
      en: "We’re looking for a Graphic Designer to create brand identities, print materials, and visual concepts for exhibition stands and advertising. You’ll take projects from the first sketch to print-ready files.",
      ru: "Мы ищем графического дизайнера для разработки фирменного стиля, печатных материалов и визуальных концепций для выставочных стендов и рекламы. Вы будете вести проекты от первого эскиза до готовых к печати макетов.",
      tk: "Brend şahsyýetini, çap materiallaryny hem-de sergi stendleri we mahabat üçin wizual konsepsiýalary döretjek grafiki dizaýner gözleýäris. Taslamalary ilkinji eskizden çapa taýýar faýllara çenli alyp bararsyňyz.",
    },
    requirements: {
      en: [
        "Proficiency in Adobe Illustrator, Photoshop, and InDesign",
        "Strong typography, layout, and color skills",
        "Experience preparing files for large-format printing",
        "Ability to manage several projects at once",
        "Portfolio of branding and print work",
      ],
      ru: [
        "Уверенное владение Adobe Illustrator, Photoshop и InDesign",
        "Сильные навыки типографики, вёрстки и работы с цветом",
        "Опыт подготовки макетов к широкоформатной печати",
        "Умение вести несколько проектов одновременно",
        "Портфолио с работами по брендингу и полиграфии",
      ],
      tk: [
        "Adobe Illustrator, Photoshop we InDesign programmalaryny ynamly bilmek",
        "Tipografiýa, ýerleşdirme we reňk bilen işlemek boýunça güýçli başarnyklar",
        "Uly formatly çap üçin faýllary taýýarlamak tejribesi",
        "Birbada birnäçe taslamany alyp barmak ukyby",
        "Brending we çap işlerinden ybarat portfolio",
      ],
    },
    type: FULL_TIME,
    location: ASHGABAT,
  },
  {
    id: "project-manager",
    title: {
      en: "Project Manager",
      ru: "Проектный менеджер",
      tk: "Taslama menejeri",
    },
    description: {
      en: "We’re looking for a Project Manager to lead exhibition and advertising projects from brief to on-site installation. You’ll coordinate designers, production, and clients to deliver every project on time.",
      ru: "Мы ищем проектного менеджера, который будет вести выставочные и рекламные проекты от брифа до монтажа на площадке. Вы будете координировать дизайнеров, производство и клиентов, чтобы сдавать каждый проект в срок.",
      tk: "Sergi we mahabat taslamalaryny brifden ýerinde gurnamaga çenli alyp barjak taslama menejerini gözleýäris. Her taslamany öz wagtynda tabşyrmak üçin dizaýnerleri, önümçiligi we müşderileri utgaşdyrarsyňyz.",
    },
    requirements: {
      en: [
        "Experience managing production or event projects",
        "Strong planning, budgeting, and communication skills",
        "Ability to work with multiple contractors and suppliers",
        "Attention to detail and a hands-on attitude",
        "Readiness to travel to project sites",
      ],
      ru: [
        "Опыт управления производственными или событийными проектами",
        "Сильные навыки планирования, бюджетирования и коммуникации",
        "Умение работать с несколькими подрядчиками и поставщиками",
        "Внимание к деталям и готовность включаться в процесс",
        "Готовность выезжать на объекты",
      ],
      tk: [
        "Önümçilik ýa-da çäre taslamalaryny dolandyrmak tejribesi",
        "Meýilleşdirme, býujet düzmek we aragatnaşyk boýunça güýçli başarnyklar",
        "Birnäçe potratçy we üpjün ediji bilen işlemek ukyby",
        "Jikme-jikliklere üns we işe işjeň gatnaşmaga taýýarlyk",
        "Taslama obýektlerine gitmäge taýýarlyk",
      ],
    },
    type: FULL_TIME,
    location: ASHGABAT,
  },
];

export function getPositionsMock(locale: Locale): Position[] {
  return POSITIONS.map(
    ({ id, title, description, requirements, type, location }) => ({
      id,
      title: title[locale],
      description: description[locale],
      requirements: requirements[locale],
      type: type[locale],
      location: location[locale],
    }),
  );
}
