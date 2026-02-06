import { render } from "@testing-library/react";
import { SkillsGrid } from "./skills-grid";
import { describe, it, expect } from "vitest";

describe("SkillsGrid", () => {
  it("renders without crashing", () => {
    render(<SkillsGrid />);
  });
});
