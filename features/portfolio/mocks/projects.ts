import type { Locale } from "next-intl";
import type {
  PortfolioProject,
  PortfolioProjectDetails,
} from "../model/types";

type Localized<T> = Record<Locale, T>;

const CATEGORIES = {
  exhibition: {
    en: "Exhibition Stands",
    ru: "Выставочные стенды",
    tk: "Sergi stendleri",
  },
  outdoor: {
    en: "Outdoor Advertising",
    ru: "Наружная реклама",
    tk: "Daşky mahabat",
  },
  indoor: {
    en: "Indoor Advertising",
    ru: "Интерьерная реклама",
    tk: "Içki mahabat",
  },
  events: {
    en: "Event Decoration",
    ru: "Оформление мероприятий",
    tk: "Çäreleri bezemek",
  },
} satisfies Record<string, Localized<string>>;

const COUNTRIES = {
  turkmenistan: { en: "Turkmenistan", ru: "Туркменистан", tk: "Türkmenistan" },
  australia: { en: "Australia", ru: "Австралия", tk: "Awstraliýa" },
  germany: { en: "Germany", ru: "Германия", tk: "Germaniýa" },
  japan: { en: "Japan", ru: "Япония", tk: "Ýaponiýa" },
  uae: { en: "UAE", ru: "ОАЭ", tk: "BAE" },
  turkey: { en: "Türkiye", ru: "Турция", tk: "Türkiýe" },
} satisfies Record<string, Localized<string>>;

type PortfolioProjectMock = {
  id: string;
  image: string;
  category: keyof typeof CATEGORIES;
  country: keyof typeof COUNTRIES;
  year: number;
  title: Localized<string>;
  description: Localized<string>;
};

const PROJECTS: PortfolioProjectMock[] = [
  {
    id: "huawei-ashgabat",
    image: "/huawei-booth.webp",
    category: "exhibition",
    country: "turkmenistan",
    year: 2025,
    title: {
      en: "Huawei Stand, Ashgabat 2025",
      ru: "Стенд Huawei, Ашхабад 2025",
      tk: "Huawei stendi, Aşgabat 2025",
    },
    description: {
      en: "A modular stand with a wooden frame, a branded media wall and a reception desk — from the concept to on-site installation.",
      ru: "Модульный стенд с деревянным каркасом, брендированной медиастеной и стойкой ресепшен — от концепции до монтажа на площадке.",
      tk: "Agaç karkasly, brendli media diwarly we kabulhana stoly bolan modully stend — konsepsiýadan ýerinde gurnama çenli.",
    },
  },
  {
    id: "adelaide-anniversary",
    image: "/adelaide-banner.webp",
    category: "outdoor",
    country: "australia",
    year: 2024,
    title: {
      en: "University of Adelaide, Adelaide 2024",
      ru: "Университет Аделаиды, Аделаида 2024",
      tk: "Adelaida uniwersiteti, Adelaida 2024",
    },
    description: {
      en: "Street banners for the university’s 150th anniversary campaign, designed to stay readable among the trees of the campus.",
      ru: "Уличные баннеры к 150-летию университета, которые хорошо читаются среди деревьев кампуса.",
      tk: "Uniwersitetiň 150 ýyllygy üçin kampusyň agaçlarynyň arasynda-da aýdyň görünýän köçe bannerleri.",
    },
  },
  {
    id: "essen-billboard",
    image: "/essen-billboard.webp",
    category: "outdoor",
    country: "germany",
    year: 2024,
    title: {
      en: "City Billboard, Essen 2024",
      ru: "Городской билборд, Эссен 2024",
      tk: "Şäher bilbordy, Essen 2024",
    },
    description: {
      en: "A typographic billboard on a building facade: from the layout and large-format print to mounting at height.",
      ru: "Типографический билборд на фасаде здания: от макета и широкоформатной печати до монтажа на высоте.",
      tk: "Binanyň fasadyndaky tipografik bilbord: maketden we uly formatly çapdan beýiklikde gurnamaga çenli.",
    },
  },
  {
    id: "ghibli-store",
    image: "/ghibli-shop.webp",
    category: "indoor",
    country: "japan",
    year: 2023,
    title: {
      en: "Ghibli Store Interior, Tokyo 2023",
      ru: "Магазин Ghibli, Токио 2023",
      tk: "Ghibli dükany, Tokio 2023",
    },
    description: {
      en: "Shelving decor, signage and POS materials that turn the store into a part of the brand’s story.",
      ru: "Декор стеллажей, вывески и POS-материалы, которые делают магазин частью истории бренда.",
      tk: "Dükany brendiň taryhynyň bir bölegine öwürýän tekjeleriň bezegi, ýazgylar we POS materiallary.",
    },
  },
  {
    id: "art-gallery",
    image: "/gallery.webp",
    category: "events",
    country: "turkmenistan",
    year: 2025,
    title: {
      en: "Contemporary Art Exhibition, Ashgabat 2025",
      ru: "Выставка современного искусства, Ашхабад 2025",
      tk: "Häzirki zaman sungat sergisi, Aşgabat 2025",
    },
    description: {
      en: "Zoning, lighting and exposition design for a contemporary art exhibition in a minimalist white space.",
      ru: "Зонирование, свет и дизайн экспозиции для выставки в минималистичном белом пространстве.",
      tk: "Minimalistik ak giňişlikdäki sergi üçin zolaklara bölmek, yşyklandyryş we ekspozisiýa dizaýny.",
    },
  },
  {
    id: "creative-office",
    image: "/workspace.webp",
    category: "indoor",
    country: "turkmenistan",
    year: 2024,
    title: {
      en: "Creative Office Branding, Ashgabat 2024",
      ru: "Брендинг креативного офиса, Ашхабад 2024",
      tk: "Döredijilik ofisiniň brendingi, Aşgabat 2024",
    },
    description: {
      en: "Wall graphics, wayfinding and branded zones that make a workspace feel like the company it belongs to.",
      ru: "Настенная графика, навигация и брендированные зоны, благодаря которым офис отражает характер компании.",
      tk: "Iş ýerini kompaniýanyň häsiýetine laýyk edýän diwar grafikasy, ugrukdyryjy belgiler we brendli zolaklar.",
    },
  },
  {
    id: "business-forum",
    image: "/team-meeting.webp",
    category: "events",
    country: "uae",
    year: 2025,
    title: {
      en: "Business Forum, Dubai 2025",
      ru: "Бизнес-форум, Дубай 2025",
      tk: "Işewür forumy, Dubaý 2025",
    },
    description: {
      en: "Stage design, press wall and branded meeting areas for a two-day international business forum.",
      ru: "Оформление сцены, пресс-волл и брендированные зоны переговоров для двухдневного международного форума.",
      tk: "Iki günlük halkara forumy üçin sahna bezegi, press-wol we brendli gepleşik zolaklary.",
    },
  },
  {
    id: "tech-pavilion",
    image: "/gallery.webp",
    category: "exhibition",
    country: "uae",
    year: 2023,
    title: {
      en: "Tech Pavilion, Dubai 2023",
      ru: "Технологический павильон, Дубай 2023",
      tk: "Tehnologiýa pawilýony, Dubaý 2023",
    },
    description: {
      en: "An open-plan pavilion with demo zones and a lightbox ceiling, built and installed in under two weeks.",
      ru: "Павильон открытой планировки с демо-зонами и световым потолком, построенный и смонтированный меньше чем за две недели.",
      tk: "Demo zolakly we yşykly potolokly açyk meýilnamaly pawilýon, iki hepdä ýetmedik wagtda guruldy.",
    },
  },
  {
    id: "textile-fair",
    image: "/ghibli-shop.webp",
    category: "exhibition",
    country: "turkey",
    year: 2024,
    title: {
      en: "Textile Fair Stand, Istanbul 2024",
      ru: "Стенд на текстильной выставке, Стамбул 2024",
      tk: "Dokma sergisindäki stend, Stambul 2024",
    },
    description: {
      en: "A light, airy stand with fabric installations that let visitors see and touch the collection.",
      ru: "Лёгкий стенд с текстильными инсталляциями, где посетители могут увидеть и потрогать коллекцию.",
      tk: "Myhmanlaryň kolleksiýany görüp we elläp bilýän mata gurnamaly ýeňil stendi.",
    },
  },
  {
    id: "bookstore-concept",
    image: "/essen-billboard.webp",
    category: "indoor",
    country: "turkey",
    year: 2025,
    title: {
      en: "Bookstore Concept, Istanbul 2025",
      ru: "Концепция книжного магазина, Стамбул 2025",
      tk: "Kitap dükanynyň konsepsiýasy, Stambul 2025",
    },
    description: {
      en: "Themed shelving, window displays and in-store signage for a family bookstore.",
      ru: "Тематические стеллажи, витрины и навигация для семейного книжного магазина.",
      tk: "Maşgala kitap dükany üçin tematiki tekjeler, witrinalar we içerki ýazgylar.",
    },
  },
  {
    id: "mall-campaign",
    image: "/ghibli-shop.webp",
    category: "outdoor",
    country: "turkmenistan",
    year: 2025,
    title: {
      en: "Shopping Mall Campaign, Ashgabat 2025",
      ru: "Кампания для торгового центра, Ашхабад 2025",
      tk: "Söwda merkezi üçin kampaniýa, Aşgabat 2025",
    },
    description: {
      en: "Facade banners and roadside billboards for a seasonal campaign across the city.",
      ru: "Фасадные баннеры и придорожные билборды для сезонной кампании по всему городу.",
      tk: "Şäheriň dürli ýerlerinde möwsümleýin kampaniýa üçin fasad bannerleri we ýol boýundaky bilbordlar.",
    },
  },
  {
    id: "spring-festival",
    image: "/adelaide-banner.webp",
    category: "events",
    country: "turkmenistan",
    year: 2023,
    title: {
      en: "Spring Festival, Ashgabat 2023",
      ru: "Весенний фестиваль, Ашхабад 2023",
      tk: "Bahar baýramy, Aşgabat 2023",
    },
    description: {
      en: "Banners, photo zones and stage decor for an open-air city festival.",
      ru: "Баннеры, фотозоны и оформление сцены для городского фестиваля под открытым небом.",
      tk: "Açyk howadaky şäher baýramy üçin bannerler, surat zolaklary we sahna bezegi.",
    },
  },
  {
    id: "partner-conference",
    image: "/huawei-booth.webp",
    category: "events",
    country: "germany",
    year: 2023,
    title: {
      en: "Partner Conference, Berlin 2023",
      ru: "Партнёрская конференция, Берлин 2023",
      tk: "Hyzmatdaşlar maslahaty, Berlin 2023",
    },
    description: {
      en: "Hall branding, speaker stage and printed materials for an annual partner conference.",
      ru: "Брендирование зала, сцена для спикеров и полиграфия для ежегодной партнёрской конференции.",
      tk: "Ýyllyk hyzmatdaşlar maslahaty üçin zalyň brendingi, çykyş sahnasy we çap önümleri.",
    },
  },
  {
    id: "auto-show",
    image: "/workspace.webp",
    category: "exhibition",
    country: "germany",
    year: 2025,
    title: {
      en: "Auto Show Stand, Frankfurt 2025",
      ru: "Стенд на автосалоне, Франкфурт 2025",
      tk: "Awtosalondaky stend, Frankfurt 2025",
    },
    description: {
      en: "A two-level stand with a rotating podium, LED screens and a lounge for partner meetings.",
      ru: "Двухуровневый стенд с поворотным подиумом, LED-экранами и лаунж-зоной для встреч с партнёрами.",
      tk: "Aýlanýan podiumly, LED ekranly we hyzmatdaşlar bilen duşuşyk üçin lauňj zolakly iki gatly stend.",
    },
  },
  {
    id: "airport-lightboxes",
    image: "/huawei-booth.webp",
    category: "outdoor",
    country: "uae",
    year: 2024,
    title: {
      en: "Airport Lightboxes, Abu Dhabi 2024",
      ru: "Лайтбоксы в аэропорту, Абу-Даби 2024",
      tk: "Howa menzilindäki laýtbokslar, Abu-Dabi 2024",
    },
    description: {
      en: "Backlit advertising panels for the arrivals hall, produced to airport safety standards.",
      ru: "Рекламные панели с подсветкой для зоны прилёта, изготовленные по стандартам безопасности аэропорта.",
      tk: "Howa menziliniň howpsuzlyk ölçeglerine laýyklykda taýýarlanan gelýänler zaly üçin yşykly mahabat panelleri.",
    },
  },
  {
    id: "coworking-interior",
    image: "/team-meeting.webp",
    category: "indoor",
    country: "australia",
    year: 2023,
    title: {
      en: "Coworking Interior, Adelaide 2023",
      ru: "Интерьер коворкинга, Аделаида 2023",
      tk: "Kowerking interýeri, Adelaida 2023",
    },
    description: {
      en: "Glass graphics, zoning signage and a branded reception for a new coworking space.",
      ru: "Графика на стекле, навигация по зонам и брендированный ресепшен для нового коворкинга.",
      tk: "Täze kowerking üçin äýnek grafikasy, zolak belgileri we brendli kabulhana.",
    },
  },
];

const CITIES = {
  ashgabat: { en: "Ashgabat", ru: "Ашхабад", tk: "Aşgabat" },
  adelaide: { en: "Adelaide", ru: "Аделаида", tk: "Adelaida" },
  essen: { en: "Essen", ru: "Эссен", tk: "Essen" },
  tokyo: { en: "Tokyo", ru: "Токио", tk: "Tokio" },
  dubai: { en: "Dubai", ru: "Дубай", tk: "Dubaý" },
  istanbul: { en: "Istanbul", ru: "Стамбул", tk: "Stambul" },
  berlin: { en: "Berlin", ru: "Берлин", tk: "Berlin" },
  frankfurt: { en: "Frankfurt", ru: "Франкфурт", tk: "Frankfurt" },
  abuDhabi: { en: "Abu Dhabi", ru: "Абу-Даби", tk: "Abu-Dabi" },
} satisfies Record<string, Localized<string>>;

const PROJECT_DETAILS: Record<
  string,
  { client: string; city: keyof typeof CITIES }
> = {
  "huawei-ashgabat": { client: "Huawei", city: "ashgabat" },
  "adelaide-anniversary": { client: "University of Adelaide", city: "adelaide" },
  "essen-billboard": { client: "Essen Marketing", city: "essen" },
  "ghibli-store": { client: "Studio Ghibli", city: "tokyo" },
  "art-gallery": { client: "Ashgabat Art Center", city: "ashgabat" },
  "creative-office": { client: "Nova Workspace", city: "ashgabat" },
  "business-forum": { client: "Gulf Business Forum", city: "dubai" },
  "tech-pavilion": { client: "Dubai Tech Week", city: "dubai" },
  "textile-fair": { client: "Istanbul Textile Fair", city: "istanbul" },
  "bookstore-concept": { client: "Pages Family Books", city: "istanbul" },
  "mall-campaign": { client: "Berkarar Mall", city: "ashgabat" },
  "spring-festival": { client: "Ashgabat City Hall", city: "ashgabat" },
  "partner-conference": { client: "Partner Summit", city: "berlin" },
  "auto-show": { client: "IAA Mobility", city: "frankfurt" },
  "airport-lightboxes": { client: "Abu Dhabi Airports", city: "abuDhabi" },
  "coworking-interior": { client: "Hub Adelaide", city: "adelaide" },
};

// The same process text follows every project description until the API provides real content
const PROCESS_PARAGRAPHS: Localized<string>[] = [
  {
    en: "Our team started with the brief and the venue: we studied how visitors would approach the space, what they should notice first and where the brand message works best. Several concepts were prepared in 3D, so the client could see the result before production began.",
    ru: "Работа началась с брифа и площадки: мы изучили, как посетители будут подходить к пространству, что они должны заметить первым и где сообщение бренда сработает лучше всего. Мы подготовили несколько концепций в 3D, чтобы клиент увидел результат ещё до начала производства.",
    tk: "Iş brifden we meýdançadan başlandy: myhmanlaryň giňişlige nähili ýakynlaşjakdygyny, ilki näme görmelidigini we brendiň habarynyň nirede has gowy işleýändigini öwrendik. Müşderi önümçilik başlamazdan öň netijäni görer ýaly birnäçe 3D konsepsiýa taýýarladyk.",
  },
  {
    en: "After approval, everything was produced in our own workshop — from structures and large-format print to lighting. The installation team assembled the project on site within the agreed schedule and handed it over ready to use.",
    ru: "После утверждения всё было изготовлено в нашем собственном цеху — от конструкций и широкоформатной печати до освещения. Монтажная команда собрала проект на месте в согласованные сроки и сдала его полностью готовым.",
    tk: "Tassyklanandan soň hemme zat öz ussahanamyzda — konstruksiýalardan we uly formatly çapdan yşyklandyryşa çenli taýýarlandy. Gurnama topary taslamany ylalaşylan möhletde ýerinde gurnady we doly taýýar görnüşde tabşyrdy.",
  },
];

const GALLERY_IMAGES = [
  "/adelaide-banner.webp",
  "/huawei-booth.webp",
  "/essen-billboard.webp",
  "/ghibli-shop.webp",
  "/gallery.webp",
  "/workspace.webp",
  "/team-meeting.webp",
];

const GALLERY_SIZE = 6;

function localizeProject(
  { id, image, category, country, year, title, description }: PortfolioProjectMock,
  locale: Locale,
): PortfolioProject {
  return {
    id,
    image,
    year,
    title: title[locale],
    description: description[locale],
    category: { value: category, label: CATEGORIES[category][locale] },
    country: { value: country, label: COUNTRIES[country][locale] },
  };
}

export function getPortfolioProjectsMock(locale: Locale): PortfolioProject[] {
  return PROJECTS.map((project) => localizeProject(project, locale));
}

export function getPortfolioProjectIdsMock(): string[] {
  return PROJECTS.map(({ id }) => id);
}

export function getPortfolioProjectMock(
  id: string,
  locale: Locale,
): PortfolioProjectDetails | null {
  const mock = PROJECTS.find((project) => project.id === id);
  if (!mock) return null;

  const project = localizeProject(mock, locale);
  const { client, city } = PROJECT_DETAILS[id];

  return {
    ...project,
    client,
    location: `${CITIES[city][locale]}, ${project.country.label}`,
    content: [
      project.description,
      ...PROCESS_PARAGRAPHS.map((paragraph) => paragraph[locale]),
    ],
    // The cover opens the gallery, followed by the rest of the stock photos
    gallery: [
      project.image,
      ...GALLERY_IMAGES.filter((src) => src !== project.image),
    ].slice(0, GALLERY_SIZE),
  };
}
