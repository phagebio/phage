import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Use Google Font
import { Toaster as Sonner } from "sonner";
import { ThemeProvider } from "@/components/themeprovider";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/lib/auth";
import { ConvexProvider } from "@/lib/convex";
import "./globals.css";

// Security initialization wrapper for client-side
import SecurityInit from "@/components/SecurityInit";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  ),
  title: {
    default: "Phage - Molecular Dynamics Simulation Platform",
    template: "%s | Phage",
  },
  description:
    "Advanced Molecular Dynamics Simulation Platform for researchers and scientists.",
  keywords: [
    "Molecular Dynamics",
    "Simulation",
    "Science",
    "Research",
    "Proteins",
    "Ligands",
  ],
  authors: [{ name: "Your Company" }],
  creator: "Your Company",
  icons: {
    icon: "/phagedesign.png",
    shortcut: "/phagedesign.png",
    apple: "/phagedesign.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: "Phage",
    title: "Phage - Molecular Dynamics Simulation Platform",
    description:
      "Advanced Molecular Dynamics Simulation Platform for researchers and scientists.",
    images: [
      {
        url: "/phagedesign.png",
        width: 1200,
        height: 630,
        alt: "Phage Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Phage - Molecular Dynamics Simulation Platform",
    description:
      "Advanced Molecular Dynamics Simulation Platform for researchers and scientists.",
    images: ["/phagedesign.png"],
    creator: "@yourtwitterhandle",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ConvexProvider>
          <AuthProvider>
            <ThemeProvider>
              <TooltipProvider>
                <SecurityInit />
                {children}
                <Toaster />
                <Sonner />
              </TooltipProvider>
            </ThemeProvider>
          </AuthProvider>
        </ConvexProvider>
      </body>
    </html>
  );
}
