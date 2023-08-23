// These styles apply to every route in the application
import AuthStatus from "@/components/auth/auth-status";
import "@/styles/globals.css";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import 'react-phone-number-input/style.css';
import "react-datepicker/dist/react-datepicker.css";
import Providers from "./providers/root";
import { Orbital } from "@/components/orbital";

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
  metadataBase: new URL("https://storefront-too.vercel.app/"),
  themeColor: "#FFF",
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
          <Orbital
            items={[
              { route: '/protected/orders', text: 'Orders' },
              { route: '/protected/payments', text: 'Payments' },
              { route: '/protected/gateway', text: 'Gateway' },
              { route: '/protected/settings', text: 'Settings' },
            ]}
            size={450}
          />
        </Providers>
      </body>
    </html>
  );
}
