import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SignupForm } from "./examples"; // We'll create this file next

describe("SignupForm Integration", () => {
  it("renders all form fields", () => {
    render(<SignupForm />);

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
  });

  it("shows required indicators", () => {
    render(<SignupForm />);

    const requiredMarkers = screen.getAllByText("*");
    expect(requiredMarkers).toHaveLength(2); // Email and Password are required
  });

  it("shows field descriptions", () => {
    render(<SignupForm />);

    expect(
      screen.getByText("We'll never share your email"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Must be at least 8 characters"),
    ).toBeInTheDocument();
  });

  it("displays error state", () => {
    render(<SignupForm />);

    expect(
      screen.getByText("This username is already taken"),
    ).toBeInTheDocument();
  });
});
