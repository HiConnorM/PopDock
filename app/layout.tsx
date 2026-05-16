import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Popdock — Launch your popup without the chaos",
  description:
    "Popdock helps creators plan, prep, and launch physical popups — from vintage markets to artist alleys. Your complete popup launch kit.",
  keywords: ["popup shop", "popup planning", "creator commerce", "vendor booth", "artist alley", "craft fair"],
  openGraph: {
    title: "Popdock — Launch your popup without the chaos",
    description: "Your complete popup launch kit. Checklists, layouts, shopping lists, and timelines — all in one place.",
    siteName: "Popdock",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <div className="noise-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
