/**
 * Props for configuring SEO meta tags.
 */
interface SeoProps {
  /**
   * The description of the page for SEO and social sharing.
   */
  description?: string;
  /**
   * The image URL for Open Graph previews.
   */
  image?: string;
  /**
   * A comma-separated list of keywords for SEO.
   */
  keywords?: string;
  /**
   * The title of the page.
   */
  title: string;
  /**
   * The full URL of the page for Open Graph (og:url).
   */
  url?: string;
}

/**
 * Represents a meta tag object.
 */
interface MetaTag {
  /**
   * The content of the meta tag.
   */
  content?: string;

  /**
   * The name attribute of the meta tag (used for standard SEO tags).
   */
  name?: string;

  /**
   * The property attribute of the meta tag (used for Open Graph tags).
   */
  property?: string;

  /**
   * The title of the page (used in the document head).
   */
  title?: string;
}

/**
 * Generates an array of meta tag objects for SEO and social media integration.
 * @returns An array of meta tag objects.
 */
export const seo = ({ description, image, keywords, title, url }: SeoProps) => {
  const meta = [
    { title },
    { content: title, name: "twitter:title" },
    { content: title, property: "og:title" },
    { content: "website", property: "og:type" },
  ] satisfies MetaTag[];

  if (description) {
    meta.push(
      { content: description, name: "description" },
      { content: description, name: "twitter:description" },
      { content: description, property: "og:description" },
    );
  }

  if (keywords) {
    meta.push({ content: keywords, name: "keywords" });
  }

  if (url) {
    meta.push({ content: url, property: "og:url" });
  }

  if (image) {
    meta.push({ content: image, property: "og:image" });
  }

  return meta;
};
