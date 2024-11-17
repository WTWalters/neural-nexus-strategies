import { render, screen } from "@testing-library/react";

describe("Simple Test", () => {
    it("test environment is working", () => {
        render(<div>Hello Test</div>);
        expect(screen.getByText("Hello Test")).toBeInTheDocument();
    });
});
