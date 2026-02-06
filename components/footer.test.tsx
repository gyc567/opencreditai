import { render } from "@testing-library/react";
import { Footer } from "./footer";
import { describe, it, expect } from "vitest";

describe("Footer", () => {
  it("renders without crashing", () => {
    render(<Footer />);
  });
});
