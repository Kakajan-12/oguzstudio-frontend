export const NAV_ITEMS = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "portfolio", href: "/portfolio" },
  { key: "careers", href: "/careers" },
  { key: "contacts", href: "/contacts" },
] as const;

export type NavItem = (typeof NAV_ITEMS)[number];

/** Documents linked from the footer; the texts come from the admin */
export const LEGAL_ITEMS = [
  { key: "terms", href: "/terms" },
  { key: "privacy", href: "/privacy" },
  { key: "cookies", href: "/cookies" },
] as const;

export type LegalKey = (typeof LEGAL_ITEMS)[number]["key"];
