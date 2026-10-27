import type { FilterOption, PortfolioProject } from "./types";

export const FILTER_KEYS = ["category", "country", "year"] as const;

export type FilterKey = (typeof FILTER_KEYS)[number];

/** Only one filter is applied at a time: picking an option swaps the dropdowns for a removable chip */
export type ActiveFilter = {
  key: FilterKey;
  option: FilterOption;
};

function getOption(project: PortfolioProject, key: FilterKey): FilterOption {
  if (key === "year") {
    const year = String(project.year);
    return { value: year, label: year };
  }
  return project[key];
}

/** Unique options present in the projects: newest years first, the rest alphabetically */
export function getFilterOptions(
  projects: PortfolioProject[],
  key: FilterKey,
): FilterOption[] {
  const options = new Map<string, FilterOption>();
  for (const project of projects) {
    const option = getOption(project, key);
    options.set(option.value, option);
  }

  return [...options.values()].sort((a, b) =>
    key === "year"
      ? Number(b.value) - Number(a.value)
      : a.label.localeCompare(b.label),
  );
}

export function matchesFilter(
  project: PortfolioProject,
  filter: ActiveFilter | null,
) {
  return !filter || getOption(project, filter.key).value === filter.option.value;
}
