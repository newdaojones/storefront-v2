// These styles apply to every route in the application
import AuthStatus from "@/components/auth/auth-status";
import { OrbitalMenu } from "@/components/orbital";
import "@/styles/globals.css";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Toaster } from "react-hot-toast";
import 'react-phone-number-input/style.css';
import Providers from "./providers/root";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const title = "Storefront Self Banking";
const description =
  "Storefront is the self banking future of your business. Our tools can't make your day perfect, but they can make your money smile.";

export const metadata: Metadata = {
  title,
  description,
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  metadataBase: new URL("https://storefront.network/"),
  themeColor: "#1f1f1f",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <Toaster />
        <Suspense fallback="Loading...">
          <AuthStatus />
        </Suspense>
        <Providers>
          {children}
          <OrbitalMenu />
        </Providers>
      </body>
    </html>
  );
}
