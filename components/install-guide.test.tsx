import { render } from "@testing-library/react";
import { InstallGuide } from "./install-guide";
import { describe, it, expect } from "vitest";

describe("InstallGuide", () => {
  it("renders without crashing", () => {
    render(<InstallGuide />);
  });
});
