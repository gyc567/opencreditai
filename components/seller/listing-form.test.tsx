import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { ListingForm } from "./listing-form";

describe("ListingForm", () => {
  const mockOnSubmit = vi.fn().mockResolvedValue(undefined);

  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  it("renders form title", () => {
    render(<ListingForm onSubmit={mockOnSubmit} />);
    expect(screen.getByText("Create New Listing")).toBeInTheDocument();
  });

  it("renders skill name input", () => {
    render(<ListingForm onSubmit={mockOnSubmit} />);
    expect(screen.getByLabelText("Skill Name *")).toBeInTheDocument();
  });

  it("renders description textarea", () => {
    render(<ListingForm onSubmit={mockOnSubmit} />);
    expect(screen.getByLabelText("Description *")).toBeInTheDocument();
  });

  it("renders category select", () => {
    render(<ListingForm onSubmit={mockOnSubmit} />);
    expect(screen.getByLabelText("Category")).toBeInTheDocument();
  });

  it("renders price input", () => {
    render(<ListingForm onSubmit={mockOnSubmit} />);
    expect(screen.getByLabelText("Price (USD) *")).toBeInTheDocument();
  });

  it("renders version input", () => {
    render(<ListingForm onSubmit={mockOnSubmit} />);
    expect(screen.getByLabelText("Version")).toBeInTheDocument();
  });

  it("renders package URL input", () => {
    render(<ListingForm onSubmit={mockOnSubmit} />);
    expect(screen.getByLabelText("Package URL *")).toBeInTheDocument();
  });

  it("renders tags input", () => {
    render(<ListingForm onSubmit={mockOnSubmit} />);
    expect(screen.getByPlaceholderText("Add a tag...")).toBeInTheDocument();
  });

  it("renders submit button", () => {
    render(<ListingForm onSubmit={mockOnSubmit} />);
    expect(screen.getByRole("button", { name: "Create Listing" })).toBeInTheDocument();
  });

  it("shows loading state", () => {
    render(<ListingForm onSubmit={mockOnSubmit} isLoading={true} />);
    expect(screen.getByText("Creating...")).toBeInTheDocument();
  });

  it("disables submit button when loading", () => {
    render(<ListingForm onSubmit={mockOnSubmit} isLoading={true} />);
    const button = screen.getByRole("button", { name: /creating/i });
    expect(button).toBeDisabled();
  });

  it("renders category options", () => {
    render(<ListingForm onSubmit={mockOnSubmit} />);
    expect(screen.getByText("Web & Frontend")).toBeInTheDocument();
  });
});
