import type { Locale } from "next-intl";

export type Localized<T> = Record<Locale, T>;

export type Service = {
  id: string;
  title: string;
  tags: string[];
  description: string;
  images: string[];
};

export type ClientProject = {
  id: string;
  client: string;
  project: {
    id: string;
    title: string;
    category: string;
    description: string;
    image: string;
  };
};
