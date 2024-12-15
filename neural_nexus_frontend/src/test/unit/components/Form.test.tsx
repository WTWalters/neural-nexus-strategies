// src/__tests__/unit/components/Form.test.tsx
import { render, screen, waitFor } from "@/test/test-utils";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

describe("Form Component", () => {
  const TestForm = () => (
    <Form onSubmit={jest.fn()}>
      <Input name="email" placeholder="Email" />
      <Input name="password" type="password" placeholder="Password" />
      <Button type="submit">Submit</Button>
    </Form>
  );

  it("renders form elements correctly", () => {
    render(<TestForm />);
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button")).toHaveTextContent("Submit");
  });

  it("handles form submission", async () => {
    const handleSubmit = jest.fn();
    const { user } = render(
      <Form onSubmit={handleSubmit}>
        <Input name="email" placeholder="Email" />
        <Button type="submit">Submit</Button>
      </Form>,
    );

    await user.type(screen.getByPlaceholderText("Email"), "test@example.com");
    await user.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalled();
    });
  });
});
