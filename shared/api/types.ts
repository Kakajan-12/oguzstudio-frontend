// Shapes of GET /api/pages/:page — fields are defined in backend/src/pages/registry.ts.
// Texts arrive already translated; image fields are absolute URLs (or null when not set).

type Image = string | null;

export type PageContent = {
  common: {
    seo: { title: string; description: string };
  };
  home: {
    hero: { title: string; description: string; image: Image; imageAlt: string };
    about: {
      label: string;
      title: string;
      paragraph1: string;
      paragraph2: string;
      image: Image;
      imageAlt: string;
    };
    services: { label: string; title: string; description: string };
    clients: { label: string; title: string; description: string };
    contact: { label: string; title: string; description: string };
  };
  about: {
    intro: { title: string; paragraph1: string; paragraph2: string };
    gallery: {
      image1: Image;
      image1Alt: string;
      image2: Image;
      image2Alt: string;
      image3: Image;
      image3Alt: string;
      image4: Image;
      image4Alt: string;
    };
    team: { title: string };
    brands: { title: string };
    careers: { title: string; description: string; image: Image; imageAlt: string };
  };
  careers: {
    intro: {
      title: string;
      image: Image;
      imageAlt: string;
      heading: string;
      paragraph1: string;
      paragraph2: string;
      paragraph3: string;
    };
    positions: { title: string };
  };
  contacts: {
    form: { title: string; subtitle: string };
  };
};

export type PageKey = keyof PageContent;

export type CompanyContacts = {
  phone: string;
  phoneHref: string;
  email: string;
  address: string;
  googleMapsUrl: string;
  /** "lat, lng" for the footer map; empty hides it */
  mapCoordinates: string;
  instagram: string;
  tiktok: string;
};
