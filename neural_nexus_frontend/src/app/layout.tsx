// Path: neural_nexus_frontend/src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TrackingProvider from "@/components/providers/TrackingProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Neural Nexus Strategies",
  description: "Data and AI Consulting Services",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TrackingProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </TrackingProvider>
      </body>
    </html>
  );
}
