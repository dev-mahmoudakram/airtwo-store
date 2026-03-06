import type { Metadata } from "next";
import { Cairo, Montserrat, Outfit } from "next/font/google";
import "./tailwind.css";
import "./globals.scss";
import SiteLayout from "@/components/layout/SiteLayout";

// Primary font — Arabic + Latin (RTL site)
const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: "variable",
  display: "swap",
});

// Secondary display font — Latin headings / brand accents
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: "variable",
  display: "swap",
});

// Utility / UI font — numbers, labels, tags
const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: "variable",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Airtwo Store",
  description: "متجر إيرتو - أفضل المنتجات بأسعار مميزة",
  icons: {
    icon: [
      { url: "/favicon/favicon.ico" },
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/favicon/apple-touch-icon.png",
    other: [
      { rel: "manifest", url: "/favicon/site.webmanifest" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${cairo.variable} ${montserrat.variable} ${outfit.variable}`}
    >
      <body>
        <SiteLayout>{children}</SiteLayout>
      </body>
    </html>
  );
}
