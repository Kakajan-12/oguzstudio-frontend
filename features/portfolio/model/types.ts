export type FilterOption = {
  value: string;
  label: string;
};

export type PortfolioProject = {
  id: string;
  title: string;
  description: string;
  image: string;
  category: FilterOption;
  country: FilterOption;
  year: number;
};

export type PortfolioProjectDetails = PortfolioProject & {
  client: string;
  location: string;
  content: string[];
  gallery: string[];
};
