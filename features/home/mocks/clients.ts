import type { Locale } from "next-intl";
import type { ClientProject, Localized } from "../model/types";

type ClientProjectMock = {
  id: string;
  /** Portfolio project the card links to */
  projectId: string;
  client: string;
  image: string;
  title: Localized<string>;
  category: Localized<string>;
  description: Localized<string>;
};

const CLIENT_PROJECTS: ClientProjectMock[] = [
  {
    id: "huawei",
    projectId: "huawei-ashgabat",
    client: "Huawei",
    image: "/huawei-booth.webp",
    title: {
      en: "Huawei Exhibition Stand",
      ru: "Выставочный стенд Huawei",
      tk: "Huawei sergi stendi",
    },
    category: {
      en: "Exhibition Stands",
      ru: "Выставочные стенды",
      tk: "Sergi stendleri",
    },
    description: {
      en: "A modular stand with a wooden frame, a branded media wall and a reception desk. We handled the concept, 3D visualization, production and on-site installation.",
      ru: "Модульный стенд с деревянным каркасом, брендированной медиастеной и стойкой ресепшен. Мы отвечали за концепцию, 3D-визуализацию, производство и монтаж на площадке.",
      tk: "Agaç karkasly, brendli media diwarly we kabulhana stoly bolan modully stend. Konsepsiýa, 3D wizualizasiýa, önümçilik we ýerinde gurnama biziň tarapymyzdan ýerine ýetirildi.",
    },
  },
  {
    id: "adelaide",
    projectId: "adelaide-anniversary",
    client: "University of Adelaide",
    image: "/adelaide-banner.webp",
    title: {
      en: "150 Years Anniversary",
      ru: "150 лет университету",
      tk: "Uniwersitetiň 150 ýyllygy",
    },
    category: {
      en: "Outdoor Advertising",
      ru: "Наружная реклама",
      tk: "Daşky mahabat",
    },
    description: {
      en: "A series of street banners for the university’s anniversary campaign, designed to stay readable among the trees of the campus.",
      ru: "Серия уличных баннеров для юбилейной кампании университета, которые хорошо читаются среди деревьев кампуса.",
      tk: "Uniwersitetiň ýubileý kampaniýasy üçin kampusyň agaçlarynyň arasynda-da aýdyň görünýän köçe bannerleriniň toplumy.",
    },
  },
  {
    id: "essen",
    projectId: "essen-billboard",
    client: "Essen",
    image: "/essen-billboard.webp",
    title: {
      en: "City Billboard",
      ru: "Городской билборд",
      tk: "Şäher bilbordy",
    },
    category: {
      en: "Outdoor Advertising",
      ru: "Наружная реклама",
      tk: "Daşky mahabat",
    },
    description: {
      en: "A typographic billboard on a building facade: from the layout and large-format print to mounting at height.",
      ru: "Типографический билборд на фасаде здания: от макета и широкоформатной печати до монтажа на высоте.",
      tk: "Binanyň fasadyndaky tipografik bilbord: maketden we uly formatly çapdan başlap beýiklikde gurnamaga çenli.",
    },
  },
  {
    id: "ghibli",
    projectId: "ghibli-store",
    client: "Ghibli Store",
    image: "/ghibli-shop.webp",
    title: {
      en: "Store Interior",
      ru: "Оформление магазина",
      tk: "Dükanyň bezegi",
    },
    category: {
      en: "Indoor Advertising",
      ru: "Интерьерная реклама",
      tk: "Içki mahabat",
    },
    description: {
      en: "Shelving decor, signage and POS materials that turn the store into a part of the brand’s story.",
      ru: "Декор стеллажей, вывески и POS-материалы, которые делают магазин частью истории бренда.",
      tk: "Dükany brendiň taryhynyň bir bölegine öwürýän tekjeleriň bezegi, ýazgylar we POS materiallary.",
    },
  },
  {
    id: "gallery",
    projectId: "art-gallery",
    client: "Art Gallery",
    image: "/gallery.webp",
    title: {
      en: "Exhibition Space",
      ru: "Выставочное пространство",
      tk: "Sergi giňişligi",
    },
    category: {
      en: "Event Decoration",
      ru: "Оформление мероприятий",
      tk: "Çäreleri bezemek",
    },
    description: {
      en: "Zoning, lighting and exposition design for a contemporary art exhibition in a minimalist white space.",
      ru: "Зонирование, свет и дизайн экспозиции для выставки современного искусства в минималистичном белом пространстве.",
      tk: "Minimalistik ak giňişlikde häzirki zaman sungatynyň sergisi üçin zolaklara bölmek, yşyklandyryş we ekspozisiýa dizaýny.",
    },
  },
];

export function getClientProjectsMock(locale: Locale): ClientProject[] {
  return CLIENT_PROJECTS.map(
    ({ id, projectId, client, image, title, category, description }) => ({
      id,
      client,
      project: {
        id: projectId,
        title: title[locale],
        category: category[locale],
        description: description[locale],
        image,
      },
    }),
  );
}
