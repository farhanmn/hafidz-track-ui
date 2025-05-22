import type { Metadata } from "next";
import "./globals.css";
import ThemeToggle from "@/components/ThemeToggle";

export const metadata: Metadata = {
  title: "Hafidz Track",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
    <head>
      <title>Hafidz-Track</title>
    </head>
    <body className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 min-h-screen">
    <div className="flex justify-end p-4">
      <ThemeToggle />
    </div>
    <main className="flex items-center justify-center py-8 px-4">{children}</main>
    </body>
    </html>
  );
}
