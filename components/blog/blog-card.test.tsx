import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BlogCard } from "./blog-card";

const mockPost = {
  id: "1",
  title: "Getting Started with ClawSkillStore",
  excerpt: "Learn how to browse and install AI skills from the marketplace.",
  date: "March 9, 2026",
  readTime: "8 min read",
  imageUrl: "https://example.com/image.jpg",
  slug: "getting-started",
  category: "Getting Started",
};

describe("BlogCard", () => {
  it("renders post title", () => {
    render(<BlogCard post={mockPost} />);
    expect(screen.getByText("Getting Started with ClawSkillStore")).toBeInTheDocument();
  });

  it("renders post excerpt", () => {
    render(<BlogCard post={mockPost} />);
    expect(screen.getByText(/Learn how to browse/)).toBeInTheDocument();
  });

  it("renders post date and read time", () => {
    render(<BlogCard post={mockPost} />);
    expect(screen.getByText(/March 9, 2026/)).toBeInTheDocument();
    expect(screen.getByText(/8 min read/)).toBeInTheDocument();
  });

  it("renders category", () => {
    render(<BlogCard post={mockPost} />);
    expect(screen.getByText("Getting Started")).toBeInTheDocument();
  });

  it("renders read article link", () => {
    render(<BlogCard post={mockPost} />);
    expect(screen.getByText("Read article →")).toBeInTheDocument();
  });

  it("renders image with alt text", () => {
    render(<BlogCard post={mockPost} />);
    const img = screen.getByAltText("Getting Started with ClawSkillStore");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "https://example.com/image.jpg");
  });

  it("has correct link href", () => {
    render(<BlogCard post={mockPost} />);
    const link = screen.getByRole("link", { name: /read article/i });
    expect(link).toHaveAttribute("href", "/blog/getting-started");
  });
});
