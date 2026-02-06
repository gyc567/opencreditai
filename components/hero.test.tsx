import { render } from "@testing-library/react";
import { Hero } from "./hero";
import { describe, it, expect } from "vitest";

describe("Hero", () => {
  it("renders without crashing", () => {
    render(<Hero />);
  });
});
