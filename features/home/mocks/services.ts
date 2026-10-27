import type { Locale } from "next-intl";
import type { Localized, Service } from "../model/types";

type ServiceMock = {
  id: string;
  images: string[];
  title: Localized<string>;
  tags: Localized<string[]>;
  description: Localized<string>;
};

const SERVICES: ServiceMock[] = [
  {
    id: "design",
    images: ["/adelaide-banner.webp", "/huawei-booth.webp"],
    title: {
      en: "2D & 3D Design",
      ru: "2D и 3D дизайн",
      tk: "2D & 3D dizaýn",
    },
    tags: {
      en: ["Graphic Design", "Visualization", "Stand Concepts"],
      ru: ["Графический дизайн", "Визуализация", "Концепции стендов"],
      tk: ["Grafiki dizaýn", "Wizualizasiýa", "Stend konsepsiýalary"],
    },
    description: {
      en: "From the first concept to the final visualization, we develop creative solutions that turn ideas into clear and compelling visual experiences.",
      ru: "От первой идеи до финальной визуализации — мы разрабатываем креативные решения, которые превращают замыслы в понятный и выразительный визуальный опыт.",
      tk: "Ilkinji konsepsiýadan soňky wizualizasiýa çenli pikirleri düşnükli we täsirli wizual tejribä öwürýän döredijilikli çözgütleri işläp düzýäris.",
    },
  },
  {
    id: "exhibition-stands",
    images: ["/huawei-booth.webp", "/gallery.webp"],
    title: {
      en: "Exhibition Stands",
      ru: "Выставочные стенды",
      tk: "Sergi stendleri",
    },
    tags: {
      en: ["Design", "Production", "Installation"],
      ru: ["Дизайн", "Производство", "Монтаж"],
      tk: ["Dizaýn", "Önümçilik", "Gurnama"],
    },
    description: {
      en: "We deliver turnkey exhibition stands — from the first sketch to on-site installation — so your brand stands out at every event.",
      ru: "Создаём выставочные стенды под ключ — от первого эскиза до монтажа на площадке, чтобы ваш бренд выделялся на любом событии.",
      tk: "Sergi stendlerini ilkinji eskizden başlap ýerinde gurnamaga çenli doly taýýarlaýarys, brendiňiz islendik çärede tapawutlanar ýaly.",
    },
  },
  {
    id: "outdoor-advertising",
    images: ["/essen-billboard.webp", "/adelaide-banner.webp"],
    title: {
      en: "Outdoor Advertising",
      ru: "Наружная реклама",
      tk: "Daşky mahabat",
    },
    tags: {
      en: ["Billboards", "Banners", "Light Boxes"],
      ru: ["Билборды", "Баннеры", "Лайтбоксы"],
      tk: ["Bilbordlar", "Bannerler", "Ýagtylyk gutulary"],
    },
    description: {
      en: "We design, produce and place large-scale outdoor advertising that is impossible to overlook.",
      ru: "Разрабатываем, производим и размещаем масштабную наружную рекламу, которую невозможно не заметить.",
      tk: "Gözden salyp bolmajak uly göwrümli daşky mahabaty dizaýn edýäris, öndürýäris we ýerleşdirýäris.",
    },
  },
  {
    id: "indoor-advertising",
    images: ["/ghibli-shop.webp", "/gallery.webp"],
    title: {
      en: "Indoor Advertising",
      ru: "Интерьерная реклама",
      tk: "Içki mahabat",
    },
    tags: {
      en: ["Signage", "Wayfinding", "POS Materials"],
      ru: ["Вывески", "Навигация", "POS-материалы"],
      tk: ["Ýazgylar", "Ugur görkezijiler", "POS materiallary"],
    },
    description: {
      en: "We create indoor advertising for retail, office and public spaces that guides and engages visitors.",
      ru: "Создаём интерьерную рекламу для магазинов, офисов и общественных пространств, которая направляет и вовлекает посетителей.",
      tk: "Dükanlar, ofisler we jemgyýetçilik ýerleri üçin myhmanlary ugrukdyrýan we özüne çekýän içki mahabaty döredýäris.",
    },
  },
  {
    id: "branding",
    images: ["/workspace.webp", "/team-meeting.webp"],
    title: {
      en: "Branding",
      ru: "Брендинг",
      tk: "Brending",
    },
    tags: {
      en: ["Logo", "Brand Identity", "Guidelines"],
      ru: ["Логотип", "Фирменный стиль", "Брендбук"],
      tk: ["Logotip", "Korporatiw stil", "Brend gollanmasy"],
    },
    description: {
      en: "We build visual identities that reflect your brand’s character and stay consistent across every channel.",
      ru: "Создаём визуальную айдентику, которая отражает характер бренда и одинаково узнаваема во всех каналах коммуникации.",
      tk: "Brendiňiziň häsiýetini görkezýän we ähli aragatnaşyk kanallarynda bitewi görünýän wizual şahsyýeti döredýäris.",
    },
  },
  {
    id: "production",
    images: ["/essen-billboard.webp", "/ghibli-shop.webp"],
    title: {
      en: "Print & Production",
      ru: "Печать и производство",
      tk: "Çap we önümçilik",
    },
    tags: {
      en: ["Large Format", "Printing", "Materials"],
      ru: ["Широкоформатная печать", "Полиграфия", "Материалы"],
      tk: ["Uly formatly çap", "Poligrafiýa", "Materiallar"],
    },
    description: {
      en: "We produce print materials and advertising structures of any scale using modern equipment.",
      ru: "Производим печатную продукцию и рекламные конструкции любого масштаба на современном оборудовании.",
      tk: "Häzirki zaman enjamlarynda islendik göwrümdäki çap önümlerini we mahabat konstruksiýalaryny öndürýäris.",
    },
  },
  {
    id: "installation",
    images: ["/huawei-booth.webp", "/workspace.webp"],
    title: {
      en: "Installation",
      ru: "Монтаж",
      tk: "Gurnama",
    },
    tags: {
      en: ["Logistics", "Mounting", "Dismantling"],
      ru: ["Логистика", "Монтаж", "Демонтаж"],
      tk: ["Logistika", "Montaž", "Sökmek"],
    },
    description: {
      en: "We take care of everything — from delivering structures to the site to installation and dismantling.",
      ru: "Берём на себя все работы — от доставки конструкций на объект до монтажа и демонтажа.",
      tk: "Konstruksiýalary obýekte eltmekden başlap gurnamaga we sökmäge çenli ähli işleri öz üstümize alýarys.",
    },
  },
  {
    id: "event-decoration",
    images: ["/gallery.webp", "/team-meeting.webp"],
    title: {
      en: "Event Decoration",
      ru: "Оформление мероприятий",
      tk: "Çäreleri bezemek",
    },
    tags: {
      en: ["Scenography", "Stage Design", "Decor"],
      ru: ["Сценография", "Дизайн сцены", "Декор"],
      tk: ["Ssenografiýa", "Sahna dizaýny", "Bezeg"],
    },
    description: {
      en: "We create memorable spaces for conferences, exhibitions and celebrations.",
      ru: "Создаём запоминающиеся пространства для конференций, выставок и праздничных событий.",
      tk: "Konferensiýalar, sergiler we baýramçylyk çäreleri üçin ýatda galyjy giňişlikleri döredýäris.",
    },
  },
];

export function getServicesMock(locale: Locale): Service[] {
  return SERVICES.map(({ title, tags, description, ...rest }) => ({
    ...rest,
    title: title[locale],
    tags: tags[locale],
    description: description[locale],
  }));
}
