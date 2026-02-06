import { render } from "@testing-library/react";
import { Navbar } from "./navbar";
import { describe, it, expect } from "vitest";

describe("Navbar", () => {
  it("renders without crashing", () => {
    render(<Navbar />);
  });
});
