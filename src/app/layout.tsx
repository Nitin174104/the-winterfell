import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google"; // Import Inter and Montserrat
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VibeBite - Mood to Meal",
  description: "Discover food that matches your mood.",
};

import { AuthProvider } from "@/components/providers";

// ... (imports)

// ... (metadata)

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${montserrat.variable} antialiased bg-background text-foreground`}
      >
        <AuthProvider>
            {children}
        </AuthProvider>
      </body>
    </html>
  );
}
