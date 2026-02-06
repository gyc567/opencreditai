import { render } from "@testing-library/react";
import { SkillCard } from "./skill-card";
import { describe, it, expect } from "vitest";

const mockSkill = {
  id: "test-skill",
  name: "Test Skill",
  description: "A test skill for unit testing",
  author: "Test Author",
  category: "development",
  tags: ["test", "unit"],
  installs: "1.2k",
};

describe("SkillCard", () => {
  it("renders without crashing", () => {
    render(<SkillCard skill={mockSkill} />);
  });
});
