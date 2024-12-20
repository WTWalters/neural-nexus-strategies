// src/test/utils/form.tsx
import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { render } from "@testing-library/react";

export function renderWithForm(ui: React.ReactElement) {
  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    const methods = useForm({
      defaultValues: {
        email: "",
        password: "",
        username: "",
      },
    });
    return <FormProvider {...methods}>{children}</FormProvider>;
  };

  return render(ui, { wrapper: Wrapper });
}
