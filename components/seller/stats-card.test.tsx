import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { StatsCard } from "./stats-card";

describe("StatsCard", () => {
  it("renders title correctly", () => {
    render(<StatsCard title="Total Sales" value={100} icon="dollar" />);
    expect(screen.getByText("Total Sales")).toBeInTheDocument();
  });

  it("renders numeric value correctly", () => {
    render(<StatsCard title="Total Sales" value={100} icon="dollar" />);
    expect(screen.getByText("100")).toBeInTheDocument();
  });

  it("renders string value correctly", () => {
    render(<StatsCard title="Status" value="Active" icon="star" />);
    expect(screen.getByText("Active")).toBeInTheDocument();
  });

  it("renders trend when provided", () => {
    render(<StatsCard title="Sales" value={10} icon="cart" trend="+20%" />);
    expect(screen.getByText("+20%")).toBeInTheDocument();
  });

  it("does not render trend when not provided", () => {
    render(<StatsCard title="Sales" value={10} icon="cart" />);
    expect(screen.queryByText("+20%")).not.toBeInTheDocument();
  });
});
