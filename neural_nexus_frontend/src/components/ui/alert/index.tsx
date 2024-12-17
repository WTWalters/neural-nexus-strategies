// src/components/ui/alert.tsx
interface AlertProps {
    children: React.ReactNode;
    variant?: "default" | "destructive" | "success";
    className?: string;
}

export function Alert({
    children,
    variant = "default",
    className = "",
}: AlertProps) {
    const baseStyles = "rounded-lg p-4 mb-4 text-sm";

    const variantStyles = {
        default: "bg-blue-50 text-blue-800",
        destructive: "bg-red-50 text-red-800",
        success: "bg-green-50 text-green-800",
    };

    return (
        <div
            className={`${baseStyles} ${variantStyles[variant]} ${className}`}
            role="alert"
        >
            {children}
        </div>
    );
}

export function AlertDescription({ children }: { children: React.ReactNode }) {
    return <div className="mt-1">{children}</div>;
}
