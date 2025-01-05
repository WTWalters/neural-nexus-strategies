// src/test/unit/components/Form.test.tsx
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeProvider } from "@/components/theme-provider";

describe("Form Component", () => {
  const TestForm = ({ onSubmit }: { onSubmit: (data: any) => void }) => (
    <ThemeProvider>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(e);
        }}
      >
        <Input name="email" placeholder="Email" />
        <Input name="password" type="password" placeholder="Password" />
        <Button type="submit">Submit</Button>
      </form>
    </ThemeProvider>
  );

  it("renders form elements correctly", () => {
    render(<TestForm onSubmit={jest.fn()} />);
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument();
  });

  it("handles form submission", async () => {
    const handleSubmit = jest.fn((e) => e.preventDefault());
    const user = userEvent.setup();

    render(<TestForm onSubmit={handleSubmit} />);

    await user.type(screen.getByPlaceholderText("Email"), "test@example.com");
    await user.type(screen.getByPlaceholderText("Password"), "password123");
    await user.click(screen.getByRole("button", { name: "Submit" }));

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalled();
    });
  });
});
