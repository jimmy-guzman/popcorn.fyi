import { seo } from "./seo";

describe("seo", () => {
  it("should generate meta tags with title only", () => {
    const result = seo({ title: "Test Title" });

    expect(result).toStrictEqual([
      { title: "Test Title" },
      { content: "Test Title", name: "twitter:title" },
      { content: "Test Title", property: "og:title" },
      { content: "website", property: "og:type" },
    ]);
  });

  it("should include description when provided", () => {
    const result = seo({
      description: "Test Description",
      title: "Test Title",
    });

    expect(result).toStrictEqual([
      { title: "Test Title" },
      { content: "Test Title", name: "twitter:title" },
      { content: "Test Title", property: "og:title" },
      { content: "website", property: "og:type" },
      { content: "Test Description", name: "description" },
      { content: "Test Description", name: "twitter:description" },
      { content: "Test Description", property: "og:description" },
    ]);
  });

  it("should include keywords when provided", () => {
    const result = seo({ keywords: "keyword1, keyword2", title: "Test Title" });

    expect(result).toStrictEqual([
      { title: "Test Title" },
      { content: "Test Title", name: "twitter:title" },
      { content: "Test Title", property: "og:title" },
      { content: "website", property: "og:type" },
      { content: "keyword1, keyword2", name: "keywords" },
    ]);
  });

  it("should include all fields when all props are provided", () => {
    const result = seo({
      description: "Test Description",
      keywords: "keyword1, keyword2",
      title: "Test Title",
    });

    expect(result).toStrictEqual([
      { title: "Test Title" },
      { content: "Test Title", name: "twitter:title" },
      { content: "Test Title", property: "og:title" },
      { content: "website", property: "og:type" },
      { content: "Test Description", name: "description" },
      { content: "Test Description", name: "twitter:description" },
      { content: "Test Description", property: "og:description" },
      { content: "keyword1, keyword2", name: "keywords" },
    ]);
  });

  it("should only include title-related tags if description and keywords are not provided", () => {
    const result = seo({ title: "Test Title" });

    expect(result).toStrictEqual([
      { title: "Test Title" },
      { content: "Test Title", name: "twitter:title" },
      { content: "Test Title", property: "og:title" },
      { content: "website", property: "og:type" },
    ]);
  });
});
