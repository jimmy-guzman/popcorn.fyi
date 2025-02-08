/**
 * Props for configuring SEO meta tags.
 */
interface SeoProps {
  /**
   * The description of the page for SEO and social sharing.
   */
  description?: string;

  /**
   * A comma-separated list of keywords for SEO.
   */
  keywords?: string;

  /**
   * The title of the page.
   */
  title: string;
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
export const seo = ({ description, keywords, title }: SeoProps) => {
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

  return meta;
};
