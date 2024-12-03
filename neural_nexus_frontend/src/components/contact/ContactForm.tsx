// src/components/contact/ContactForm.tsx
"use client";
import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";

type FormData = {
    firstName: string;
    lastName: string;
    email: string;
    company: string;
    phone: string;
    message: string;
};

type FormErrors = {
    [key in keyof FormData]?: string;
};

export default function ContactForm() {
    const [formData, setFormData] = useState<FormData>({
        firstName: "",
        lastName: "",
        email: "",
        company: "",
        phone: "",
        message: "",
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [status, setStatus] = useState<
        "idle" | "validating" | "submitting" | "success" | "error"
    >("idle");
    const [feedback, setFeedback] = useState<{
        type: "success" | "error" | "info" | null;
        message: string;
    }>({ type: null, message: "" });

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};
        let isValid = true;

        // Show validation in progress
        setStatus("validating");

        // First Name validation
        if (!formData.firstName.trim()) {
            newErrors.firstName = "First name is required";
            isValid = false;
        }

        // Last Name validation
        if (!formData.lastName.trim()) {
            newErrors.lastName = "Last name is required";
            isValid = false;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
            isValid = false;
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = "Please enter a valid email address";
            isValid = false;
        }

        // Message validation
        if (!formData.message.trim()) {
            newErrors.message = "Message is required";
            isValid = false;
        } else if (formData.message.length < 10) {
            newErrors.message = "Message must be at least 10 characters long";
            isValid = false;
        }

        // Phone validation (optional but must be valid if provided)
        if (formData.phone.trim() && !/^[\d\s\-+()]*$/.test(formData.phone)) {
            newErrors.phone = "Please enter a valid phone number";
            isValid = false;
        }

        setErrors(newErrors);
        setStatus("idle");
        return isValid;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            setFeedback({
                type: "error",
                message: "Please correct the errors before submitting.",
            });
            return;
        }

        setStatus("submitting");
        setFeedback({ type: null, message: "" });

        try {
            const response = await fetch(
                "http://localhost:8000/api/leads/contact-form/",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                },
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Something went wrong");
            }

            setStatus("success");
            setFeedback({
                type: "success",
                message: "Thank you for your message. We'll be in touch soon!",
            });
            setFormData({
                firstName: "",
                lastName: "",
                email: "",
                company: "",
                phone: "",
                message: "",
            });
        } catch (error) {
            setStatus("error");
            setFeedback({
                type: "error",
                message:
                    error instanceof Error
                        ? error.message
                        : "There was an error sending your message. Please try again.",
            });
        }
    };

    return (
        <form
            className="bg-white p-6 rounded-lg shadow-sm space-y-6"
            onSubmit={handleSubmit}
        >
            {feedback.type && (
                <Alert
                    variant={feedback.type}
                    className={
                        feedback.type === "success"
                            ? "bg-green-50"
                            : "bg-red-50"
                    }
                >
                    <AlertDescription>{feedback.message}</AlertDescription>
                </Alert>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* First Name Field */}
                <div className="relative">
                    <label
                        htmlFor="firstName"
                        className="block text-sm font-medium text-gray-700"
                    >
                        First Name *
                    </label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={(e) => {
                            setFormData((prev) => ({
                                ...prev,
                                firstName: e.target.value,
                            }));
                            if (errors.firstName) {
                                setErrors((prev) => ({
                                    ...prev,
                                    firstName: undefined,
                                }));
                            }
                        }}
                        className={`mt-1 block w-full rounded-md border
                            ${errors.firstName ? "border-red-500" : "border-gray-300"}
                            px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500
                        `}
                        required
                    />
                    {errors.firstName && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.firstName}
                        </p>
                    )}
                </div>

                {/* Last Name Field */}
                <div className="relative">
                    <label
                        htmlFor="lastName"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Last Name *
                    </label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={(e) => {
                            setFormData((prev) => ({
                                ...prev,
                                lastName: e.target.value,
                            }));
                            if (errors.lastName) {
                                setErrors((prev) => ({
                                    ...prev,
                                    lastName: undefined,
                                }));
                            }
                        }}
                        className={`mt-1 block w-full rounded-md border
                            ${errors.lastName ? "border-red-500" : "border-gray-300"}
                            px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500
                        `}
                        required
                    />
                    {errors.lastName && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.lastName}
                        </p>
                    )}
                </div>
            </div>

            {/* Email Field */}
            <div className="relative">
                <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                >
                    Email *
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) => {
                        setFormData((prev) => ({
                            ...prev,
                            email: e.target.value,
                        }));
                        if (errors.email) {
                            setErrors((prev) => ({
                                ...prev,
                                email: undefined,
                            }));
                        }
                    }}
                    className={`mt-1 block w-full rounded-md border
                        ${errors.email ? "border-red-500" : "border-gray-300"}
                        px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500
                    `}
                    required
                />
                {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
            </div>

            {/* Company Field */}
            <div className="relative">
                <label
                    htmlFor="company"
                    className="block text-sm font-medium text-gray-700"
                >
                    Company
                </label>
                <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={(e) =>
                        setFormData((prev) => ({
                            ...prev,
                            company: e.target.value,
                        }))
                    }
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
            </div>

            {/* Phone Field */}
            <div className="relative">
                <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700"
                >
                    Phone (optional)
                </label>
                <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={(e) => {
                        setFormData((prev) => ({
                            ...prev,
                            phone: e.target.value,
                        }));
                        if (errors.phone) {
                            setErrors((prev) => ({
                                ...prev,
                                phone: undefined,
                            }));
                        }
                    }}
                    className={`mt-1 block w-full rounded-md border
                        ${errors.phone ? "border-red-500" : "border-gray-300"}
                        px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500
                    `}
                />
                {errors.phone && (
                    <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                )}
            </div>

            {/* Message Field */}
            <div className="relative">
                <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700"
                >
                    Message *
                </label>
                <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={(e) => {
                        setFormData((prev) => ({
                            ...prev,
                            message: e.target.value,
                        }));
                        if (errors.message) {
                            setErrors((prev) => ({
                                ...prev,
                                message: undefined,
                            }));
                        }
                    }}
                    rows={4}
                    className={`mt-1 block w-full rounded-md border
                        ${errors.message ? "border-red-500" : "border-gray-300"}
                        px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500
                    `}
                    required
                />
                {errors.message && (
                    <p className="mt-1 text-sm text-red-600">
                        {errors.message}
                    </p>
                )}
            </div>

            <button
                type="submit"
                disabled={status === "submitting"}
                className={`w-full ${
                    status === "submitting"
                        ? "bg-blue-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700"
                } text-white px-4 py-2 rounded-md transition-colors duration-200
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
            >
                {status === "submitting" ? (
                    <span className="flex items-center justify-center">
                        <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                        </svg>
                        Sending...
                    </span>
                ) : (
                    "Send Message"
                )}
            </button>
        </form>
    );
}
