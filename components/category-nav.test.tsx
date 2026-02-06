import { render } from "@testing-library/react";
import { CategoryNav } from "./category-nav";
import { describe, it, expect, vi } from "vitest";

describe("CategoryNav", () => {
  it("renders without crashing", () => {
    render(<CategoryNav selectedCategory={null} onSelectCategory={vi.fn()} />);
  });
});
