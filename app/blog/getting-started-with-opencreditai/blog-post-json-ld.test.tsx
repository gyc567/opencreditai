import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { BlogPostJsonLd } from "./blog-post-json-ld";

describe("BlogPostJsonLd", () => {
  const defaultProps = {
    headline: "Test Post",
    description: "Test description",
    image: "https://example.com/image.jpg",
    datePublished: "2026-01-01",
    url: "https://example.com/post",
  };

  it("renders a script tag with ld+json type", () => {
    const { container } = render(<BlogPostJsonLd {...defaultProps} />);
    const script = container.querySelector("script");
    expect(script).not.toBeNull();
    expect(script?.getAttribute("type")).toBe("application/ld+json");
  });

  it("includes correct BlogPosting schema", () => {
    const { container } = render(<BlogPostJsonLd {...defaultProps} />);
    const script = container.querySelector("script");
    const data = JSON.parse(script?.textContent || "{}");

    expect(data["@context"]).toBe("https://schema.org");
    expect(data["@type"]).toBe("BlogPosting");
    expect(data.headline).toBe("Test Post");
    expect(data.description).toBe("Test description");
    expect(data.image).toBe("https://example.com/image.jpg");
    expect(data.datePublished).toBe("2026-01-01");
    expect(data.mainEntityOfPage["@id"]).toBe("https://example.com/post");
  });

  it("uses default author when not provided", () => {
    const { container } = render(<BlogPostJsonLd {...defaultProps} />);
    const script = container.querySelector("script");
    const data = JSON.parse(script?.textContent || "{}");

    expect(data.author.name).toBe("OpenCreditAi Team");
    expect(data.author.url).toBe("https://opencreditai.com");
  });

  it("uses custom author when provided", () => {
    const { container } = render(
      <BlogPostJsonLd
        {...defaultProps}
        author={{
          "@type": "Person",
          name: "John Doe",
          url: "https://johndoe.com",
        }}
      />,
    );
    const script = container.querySelector("script");
    const data = JSON.parse(script?.textContent || "{}");

    expect(data.author.name).toBe("John Doe");
    expect(data.author.url).toBe("https://johndoe.com");
  });

  it("uses datePublished as dateModified when not provided", () => {
    const { container } = render(<BlogPostJsonLd {...defaultProps} />);
    const script = container.querySelector("script");
    const data = JSON.parse(script?.textContent || "{}");

    expect(data.dateModified).toBe("2026-01-01");
  });

  it("uses custom dateModified when provided", () => {
    const { container } = render(
      <BlogPostJsonLd {...defaultProps} dateModified="2026-06-01" />,
    );
    const script = container.querySelector("script");
    const data = JSON.parse(script?.textContent || "{}");

    expect(data.dateModified).toBe("2026-06-01");
  });
});
