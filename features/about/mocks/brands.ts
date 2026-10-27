import type { Brand } from "../model/types";

const BRANDS: Brand[] = Array.from({ length: 12 }, (_, index) => ({
  id: `huawei-${index}`,
  name: "Huawei",
  logo: "/huavey.png",
}));

export function getBrandsMock(): Brand[] {
  return BRANDS;
}
