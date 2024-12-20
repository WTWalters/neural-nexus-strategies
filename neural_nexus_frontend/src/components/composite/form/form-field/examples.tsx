// src/components/composite/form/form-field/examples.tsx
import { useForm } from "react-hook-form";
import { FormField } from "./index";
import { Input } from "@/components/ui/input";
import { Form } from "@/components/ui/form";

export function SignupForm() {
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      username: "takenuser", // Pre-filled to show error state
    },
  });

  return (
    <Form {...form}>
      <form>
        <FormField
          name="email"
          label="Email"
          required
          description="We'll never share your email"
        >
          <Input type="email" placeholder="Enter your email" />
        </FormField>

        <FormField
          name="password"
          label="Password"
          required
          description="Must be at least 8 characters"
        >
          <Input type="password" placeholder="Enter your password" />
        </FormField>

        <FormField
          name="username"
          label="Username"
          error="This username is already taken"
        >
          <Input placeholder="Choose a username" />
        </FormField>
      </form>
    </Form>
  );
}
