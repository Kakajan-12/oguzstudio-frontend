import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import type { Locale } from "next-intl";
import type { Brand, TeamMember } from "@/features/about/model/types";
import type { Position } from "@/features/careers/model/types";
import type { ClientProject, Service } from "@/features/home/model/types";
import type {
  FilterOption,
  PortfolioProject,
  PortfolioProjectDetails,
} from "@/features/portfolio/model/types";
import type { CompanyContacts, PageContent, PageKey } from "./types";

const API_URL = (process.env.API_URL ?? "http://localhost:4000").replace(/\/$/, "");

/** Tag shared by all content; the API revalidates it after every change in the admin (see app/api/revalidate) */
export const CONTENT_TAG = "content";

class NotFoundError extends Error {}

async function apiGet<T>(path: string, locale?: Locale): Promise<T> {
  const url = new URL(`${API_URL}/api${path}`);
  if (locale) url.searchParams.set("locale", locale);
  const response = await fetch(url);
  if (response.status === 404) throw new NotFoundError(path);
  if (!response.ok) {
    throw new Error(`API ${response.status} for ${url.pathname}`);
  }
  return response.json() as Promise<T>;
}

// Each getter is cached per arguments. "hours" is a safety net in case a revalidation call is missed.

export async function getPageContent<K extends PageKey>(page: K, locale: Locale) {
  "use cache";
  cacheTag(CONTENT_TAG);
  cacheLife("hours");
  return apiGet<PageContent[K]>(`/pages/${page}`, locale);
}

export async function getContacts(locale: Locale) {
  "use cache";
  cacheTag(CONTENT_TAG);
  cacheLife("hours");
  return apiGet<CompanyContacts>("/settings/contacts", locale);
}

export async function getServices(locale: Locale) {
  "use cache";
  cacheTag(CONTENT_TAG);
  cacheLife("hours");
  return apiGet<Service[]>("/services", locale);
}

/** Contact form "Category" options (services); the form adds "Other" itself */
export async function getServiceCategories(locale: Locale) {
  "use cache";
  cacheTag(CONTENT_TAG);
  cacheLife("hours");
  return apiGet<FilterOption[]>("/services/categories", locale);
}

export async function getProjects(locale: Locale) {
  "use cache";
  cacheTag(CONTENT_TAG);
  cacheLife("hours");
  return apiGet<PortfolioProject[]>("/projects", locale);
}

export async function getFeaturedProjects(locale: Locale) {
  "use cache";
  cacheTag(CONTENT_TAG);
  cacheLife("hours");
  return apiGet<ClientProject[]>("/projects/featured", locale);
}

export async function getProjectIds() {
  "use cache";
  cacheTag(CONTENT_TAG);
  cacheLife("hours");
  return apiGet<string[]>("/projects/ids");
}

export type ProjectWithRelated = PortfolioProjectDetails & { related: PortfolioProject[] };

/** null when the project doesn't exist or is hidden */
export async function getProject(id: string, locale: Locale) {
  "use cache";
  cacheTag(CONTENT_TAG);
  cacheLife("hours");
  try {
    return await apiGet<ProjectWithRelated>(`/projects/${encodeURIComponent(id)}`, locale);
  } catch (error) {
    if (error instanceof NotFoundError) return null;
    throw error;
  }
}

export async function getTeam(locale: Locale) {
  "use cache";
  cacheTag(CONTENT_TAG);
  cacheLife("hours");
  return apiGet<TeamMember[]>("/team", locale);
}

export async function getBrands() {
  "use cache";
  cacheTag(CONTENT_TAG);
  cacheLife("hours");
  return apiGet<Brand[]>("/brands");
}

export async function getPositions(locale: Locale) {
  "use cache";
  cacheTag(CONTENT_TAG);
  cacheLife("hours");
  return apiGet<Position[]>("/positions", locale);
}
