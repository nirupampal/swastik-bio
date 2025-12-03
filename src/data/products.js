import en from "../translations/en.json";
import hi from "../translations/hi.json";

export const getProductsFor = (locale="en") => {
  const messages = locale === "hi" ? hi : en;
  const p = messages.products;
  return [
    { id: "bio_prom", ...p.bio_prom },
    { id: "bio_char", ...p.bio_char },
    { id: "bio_potash", ...p.bio_potash },
    { id: "bio_npk", ...p.bio_npk }
  ];
};
