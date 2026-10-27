export const NAV_ITEMS = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "portfolio", href: "/portfolio" },
  { key: "careers", href: "/careers" },
  { key: "contacts", href: "/contacts" },
] as const;

export type NavItem = (typeof NAV_ITEMS)[number];
