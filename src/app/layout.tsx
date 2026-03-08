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
  metadataBase: new URL("https://airtwo-store.com"),
  title: "Airtwo Store",
  description: "متجر إيرتو - بيع وصيانة أجهزة التكييف. أفضل المنتجات بأسعار مميزة.",
  keywords: ["تكييف", "صيانة تكييفات", "بيع تكييف", "متجر إيرتو", "Airtwo Store", "أجهزة تكييف", "تبريد وتكييف", "مصر"],
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
  openGraph: {
    title: "Airtwo Store | متجر إيرتو",
    description: "متجر إيرتو لبيع وصيانة أجهزة التكييف. تسوق أفضل أجهزة التكييف بأسعار مميزة.",
    url: "https://airtwo-store.com",
    siteName: "Airtwo Store",
    locale: "ar_EG",
    type: "website",
    images: [
      {
        url: "/assets/logo-1.png",
        width: 1200,
        height: 630,
        alt: "Airtwo Store Logo",
      },
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
