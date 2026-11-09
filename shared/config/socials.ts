/** Networks the admin can pick from; the keys match the API */
export const SOCIAL_NETWORKS = {
  instagram: { name: "Instagram", icon: "/icons/instagram.svg", width: 22, height: 22 },
  tiktok: { name: "TikTok", icon: "/icons/tiktok.svg", width: 20, height: 24 },
  facebook: { name: "Facebook", icon: "/icons/facebook.svg", width: 20, height: 20 },
  youtube: { name: "YouTube", icon: "/icons/youtube.svg", width: 22, height: 22 },
  linkedin: { name: "LinkedIn", icon: "/icons/linkedin.svg", width: 20, height: 20 },
  telegram: { name: "Telegram", icon: "/icons/telegram.svg", width: 20, height: 20 },
  whatsapp: { name: "WhatsApp", icon: "/icons/whatsapp.svg", width: 20, height: 20 },
  x: { name: "X", icon: "/icons/x.svg", width: 18, height: 18 },
} as const;

export type SocialNetwork = keyof typeof SOCIAL_NETWORKS;
