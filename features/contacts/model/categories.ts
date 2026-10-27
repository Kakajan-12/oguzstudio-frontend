export const PROJECT_CATEGORIES = [
  "design",
  "exhibitionStands",
  "outdoor",
  "indoor",
  "branding",
  "production",
  "installation",
  "eventDecoration",
  "other",
] as const;

export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];
