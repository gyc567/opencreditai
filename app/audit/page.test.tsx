import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import AuditPage from "./page";

// Mock Navbar and Footer
vi.mock("@/components/navbar", () => ({
  Navbar: () => <nav data-testid="navbar">Navbar</nav>,
}));

vi.mock("@/components/footer", () => ({
  Footer: () => <footer data-testid="footer">Footer</footer>,
}));

// Mock UI components
vi.mock("@/components/ui/button", () => ({
  Button: ({ children, ...props }: { children: React.ReactNode }) => (
    <button data-testid="button" {...props}>{children}</button>
  ),
}));

vi.mock("@/components/ui/input", () => ({
  Input: (props: React.InputHTMLAttributes<HTMLInputElement>) => (
    <input data-testid="input" {...props} />
  ),
}));

describe("AuditPage", () => {
  it("renders without crashing", () => {
    render(<AuditPage />);
    expect(screen.getByText("Skill Audit Service")).toBeInTheDocument();
  });

  it("renders Navbar component", () => {
    render(<AuditPage />);
    expect(screen.getByTestId("navbar")).toBeInTheDocument();
  });

  it("renders Footer component", () => {
    render(<AuditPage />);
    expect(screen.getByTestId("footer")).toBeInTheDocument();
  });

  it("displays correct page title", () => {
    render(<AuditPage />);
    expect(screen.getByText("Skill Audit Service")).toBeInTheDocument();
  });

  it("displays page description", () => {
    render(<AuditPage />);
    expect(
      screen.getByText(/Upload your skill files and get a comprehensive audit report/)
    ).toBeInTheDocument();
  });

  it("displays all three steps", () => {
    render(<AuditPage />);
    expect(screen.getByText("Step 1")).toBeInTheDocument();
    expect(screen.getByText("Step 2")).toBeInTheDocument();
    expect(screen.getByText("Step 3")).toBeInTheDocument();
    expect(screen.getByText("Upload Skill File")).toBeInTheDocument();
    expect(screen.getByText("Pay $10 Securely")).toBeInTheDocument();
    expect(screen.getByText("Get Report by Email")).toBeInTheDocument();
  });

  it("displays $10 pricing", () => {
    render(<AuditPage />);
    expect(screen.getByText(/Continue to Payment — \$10/)).toBeInTheDocument();
  });

  it("renders email input field", () => {
    render(<AuditPage />);
    const emailInput = screen.getByPlaceholderText("you@example.com");
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute("type", "email");
  });

  it("renders file upload section", () => {
    render(<AuditPage />);
    expect(screen.getByText("Skill File")).toBeInTheDocument();
    expect(screen.getByText(/Drag and drop your file here/)).toBeInTheDocument();
  });

  it("displays supported file formats", () => {
    render(<AuditPage />);
    expect(
      screen.getByText(/Accepted formats: \.zip, \.js, \.ts, \.json, \.md/)
    ).toBeInTheDocument();
  });

  it("displays What's Included section", () => {
    render(<AuditPage />);
    expect(screen.getByText("What's Included")).toBeInTheDocument();
    expect(screen.getByText("Code Quality Review")).toBeInTheDocument();
    expect(screen.getByText("Security Assessment")).toBeInTheDocument();
    expect(screen.getByText("Performance Analysis")).toBeInTheDocument();
  });

  it("displays Privacy & Security section", () => {
    render(<AuditPage />);
    expect(screen.getByText("Privacy & Security")).toBeInTheDocument();
  });

  it("displays FAQ section", () => {
    render(<AuditPage />);
    expect(screen.getByText("Frequently Asked Questions")).toBeInTheDocument();
    expect(screen.getByText("What files can I upload?")).toBeInTheDocument();
    expect(screen.getByText("How long does it take?")).toBeInTheDocument();
  });

  it("renders submit button", () => {
    render(<AuditPage />);
    const submitButton = screen.getByText(/Continue to Payment — \$10/);
    expect(submitButton).toBeInTheDocument();
  });

  it("has correct page structure with main element", () => {
    const { container } = render(<AuditPage />);
    const main = container.querySelector("main");
    expect(main).toBeInTheDocument();
    expect(main).toHaveClass("min-h-screen", "bg-background");
  });
});
