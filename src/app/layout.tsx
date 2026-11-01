import type { Metadata, Viewport } from "next";
import "./globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://barakah.skayl.digital";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "ByBarakahStudio · NUR & My Ramadan Book",
  description:
    "Two journals for Ramadan 1448. NUR, a journal for Ramadan, and My Ramadan Book for little hearts. Join the waitlist and be first to know when orders open.",
  openGraph: {
    title: "ByBarakahStudio · Join the waitlist",
    description: "NUR, a journal for Ramadan, and My Ramadan Book for little hearts. Coming before Ramadan 1448.",
    url: SITE_URL,
    siteName: "ByBarakahStudio",
    images: [{ url: "/og.jpg", width: 1200, height: 630 }],
    locale: "en_GB",
    type: "website",
  },
  twitter: { card: "summary_large_image", images: ["/og.jpg"] },
};

export const viewport: Viewport = { themeColor: "#0e1822" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB">
      <body className="grain">
        {/* Shared pointed-arch (mihrab) clip path used across the site */}
        <svg width="0" height="0" aria-hidden className="absolute">
          <defs>
            <clipPath id="arch" clipPathUnits="objectBoundingBox">
              <path d="M0,1 L0,0.36 C0,0.17 0.2,0.07 0.5,0 C0.8,0.07 1,0.17 1,0.36 L1,1 Z" />
            </clipPath>
          </defs>
        </svg>
        {children}
      </body>
    </html>
  );
}
