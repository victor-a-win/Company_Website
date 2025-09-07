import { ThemeModeScript } from "flowbite-react";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { ThemeInit } from "../../.flowbite-react/init";
import "./globals.css";
import { Toaster } from "sonner";
import AppNavbar from "@/components/navbar/app.navbar";
import { AuthProvider } from "@/context/auth.context";
import CustomFooter from "@/components/footer/footer";

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My Bus",
  description: "A My Bus company site built with Next.js and Flowbite",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeModeScript />
      </head>
      <body
        className={`${poppins.variable} flex min-h-screen flex-col overscroll-none antialiased`}
      >
        <ThemeInit />
        <AuthProvider>
          <AppNavbar />
          {children}
        </AuthProvider>
        <Toaster richColors />
        <CustomFooter />
      </body>
    </html>
  );
}
