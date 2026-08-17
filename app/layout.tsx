import type { Metadata, Viewport } from "next";
import Providers from "./providers";

import "../styles/globals.css";
import "animate.css";
import "nprogress/nprogress.css";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const title = "Haru Fashion";
const desc =
  "Haru Fashion e-commerce developed with Next.JS. Coded with 🖤 by Sat Naing (satnaing.dev).";
const keywords = "Haru Fashion, Online Shop, E-commerce, Sat Naing, NextJS";

export const metadata: Metadata = {
  metadataBase: new URL("https://haru-fashion.vercel.app"),
  title: {
    default: title,
    template: "%s | Haru Fashion",
  },
  description: desc,
  keywords: keywords.split(", "),
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicons/favicon.ico" },
      { url: "/favicons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/favicons/apple-touch-icon.png",
  },
  manifest: "/favicons/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://haru-fashion.vercel.app",
    siteName: "Haru Fashion",
    title: title,
    description: desc,
    images: [
      {
        url: "https://haru-fashion.vercel.app/og.png",
        width: 1200,
        height: 630,
        alt: "Haru Fashion Store",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@satnaing.dev",
    title: title,
    description: desc,
    images: ["https://haru-fashion.vercel.app/og.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#282828",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
