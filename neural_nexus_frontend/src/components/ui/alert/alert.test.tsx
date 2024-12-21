// File: src/components/ui/alert/alert.test.tsx
import { render, screen } from '@testing-library/react';
import { Alert, AlertDescription } from './index';

describe('Alert', () => {
  it('renders with default variant', () => {
    render(<Alert>Test alert</Alert>);
    const alert = screen.getByRole('alert');
    expect(alert).toHaveClass('bg-[var(--colors-alert-info-background)]');
    expect(alert).toHaveClass('text-[var(--colors-alert-info-foreground)]');
    expect(alert).toHaveTextContent('Test alert');
  });

  it('renders with destructive variant', () => {
    render(<Alert variant="destructive">Error alert</Alert>);
    const alert = screen.getByRole('alert');
    expect(alert).toHaveClass('bg-[var(--colors-alert-error-background)]');
    expect(alert).toHaveClass('text-[var(--colors-alert-error-foreground)]');
  });

  it('renders with success variant', () => {
    render(<Alert variant="success">Success alert</Alert>);
    const alert = screen.getByRole('alert');
    expect(alert).toHaveClass('bg-[var(--colors-alert-success-background)]');
    expect(alert).toHaveClass('text-[var(--colors-alert-success-foreground)]');
  });

  it('applies additional className when provided', () => {
    render(<Alert className="custom-class">Test alert</Alert>);
    const alert = screen.getByRole('alert');
    expect(alert).toHaveClass('custom-class');
  });

  it('renders AlertDescription correctly', () => {
    render(
      <Alert>
        Alert text
        <AlertDescription>Description text</AlertDescription>
      </Alert>
    );
    expect(screen.getByText('Description text')).toHaveClass('mt-1');
  });
});
