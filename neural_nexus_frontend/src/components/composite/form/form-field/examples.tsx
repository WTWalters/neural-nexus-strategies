import { FormField } from "./index";
import { Input } from "@/components/ui/input";

export function SignupForm() {
  return (
    <form className="space-y-4">
      <FormField
        label="Email"
        required
        description="We'll never share your email"
      >
        <Input type="email" placeholder="Enter your email" />
      </FormField>

      <FormField
        label="Password"
        required
        description="Must be at least 8 characters"
      >
        <Input type="password" placeholder="Enter your password" />
      </FormField>

      <FormField label="Username" error="This username is already taken">
        <Input placeholder="Choose a username" />
      </FormField>
    </form>
  );
}
