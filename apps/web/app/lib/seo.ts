interface SeoProps {
  description?: string;
  keywords?: string;
  title: string;
}

export const seo = ({ description, keywords, title }: SeoProps) => {
  return [
    { title },
    { content: description, name: "description" },
    { content: keywords, name: "keywords" },
    { content: title, name: "twitter:title" },
    { content: description, name: "twitter:description" },
    { content: "website", property: "og:type" },
    { content: title, property: "og:title" },
    { content: description, property: "og:description" },
  ];
};
