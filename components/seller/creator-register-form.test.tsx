import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { CreatorRegisterForm } from "./creator-register-form";

describe("CreatorRegisterForm", () => {
  const mockOnSubmit = vi.fn().mockResolvedValue(undefined);

  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  it("renders wallet connection message when no wallet address", () => {
    render(
      <CreatorRegisterForm
        walletAddress={undefined}
        onSubmit={mockOnSubmit}
      />
    );
    expect(screen.getByText("Connect your wallet to become a seller")).toBeInTheDocument();
  });

  it("renders form when wallet address is provided", () => {
    render(
      <CreatorRegisterForm
        walletAddress="0x1234567890123456789012345678901234567890"
        onSubmit={mockOnSubmit}
      />
    );
    expect(screen.getByText("Become a Seller")).toBeInTheDocument();
    expect(screen.getByText("Create Seller Profile")).toBeInTheDocument();
  });

  it("renders username input", () => {
    render(
      <CreatorRegisterForm
        walletAddress="0x1234567890123456789012345678901234567890"
        onSubmit={mockOnSubmit}
      />
    );
    expect(screen.getByLabelText("Username *")).toBeInTheDocument();
  });

  it("renders display name input", () => {
    render(
      <CreatorRegisterForm
        walletAddress="0x1234567890123456789012345678901234567890"
        onSubmit={mockOnSubmit}
      />
    );
    expect(screen.getByLabelText("Display Name")).toBeInTheDocument();
  });

  it("renders category select", () => {
    render(
      <CreatorRegisterForm
        walletAddress="0x1234567890123456789012345678901234567890"
        onSubmit={mockOnSubmit}
      />
    );
    expect(screen.getByLabelText("Category")).toBeInTheDocument();
    expect(screen.getByText("General")).toBeInTheDocument();
    expect(screen.getByText("Development")).toBeInTheDocument();
  });

  it("renders bio textarea", () => {
    render(
      <CreatorRegisterForm
        walletAddress="0x1234567890123456789012345678901234567890"
        onSubmit={mockOnSubmit}
      />
    );
    expect(screen.getByLabelText("Bio")).toBeInTheDocument();
  });

  it("shows loading state", () => {
    render(
      <CreatorRegisterForm
        walletAddress="0x1234567890123456789012345678901234567890"
        onSubmit={mockOnSubmit}
        isLoading={true}
      />
    );
    expect(screen.getByText("Creating...")).toBeInTheDocument();
  });

  it("disables submit button when loading", () => {
    render(
      <CreatorRegisterForm
        walletAddress="0x1234567890123456789012345678901234567890"
        onSubmit={mockOnSubmit}
        isLoading={true}
      />
    );
    const button = screen.getByRole("button", { name: /creating/i });
    expect(button).toBeDisabled();
  });
});
