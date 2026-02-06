import { render } from "@testing-library/react";
import { FAQ } from "./faq";
import { describe, it, expect } from "vitest";

describe("FAQ", () => {
  it("renders without crashing", () => {
    render(<FAQ />);
  });
});
