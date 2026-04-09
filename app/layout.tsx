import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#10B981",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Deen OS — Islamic Prayer & Habit Tracker",
  description:
    "Track your 5 daily prayers, build Islamic habits, and grow your Akhirah Score. Your personal Islamic lifestyle operating system.",
  manifest: "/manifest.json",
  keywords: ["islamic tracker", "prayer tracker", "salah tracker", "muslim app", "quran tracker", "islamic habits", "akhirah score", "deen os"],
  authors: [{ name: "Deen OS" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Deen OS",
    title: "Deen OS — Islamic Prayer & Habit Tracker",
    description:
      "Track your 5 daily prayers, build Islamic habits, and grow your Akhirah Score. Your personal Islamic lifestyle operating system.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Deen OS — Islamic Lifestyle Tracker",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Deen OS — Islamic Prayer & Habit Tracker",
    description:
      "Track your 5 daily prayers, build Islamic habits, and grow your Akhirah Score.",
    images: ["/og-image.png"],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Deen OS",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <head>
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#111827',
              color: '#E5E7EB',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '12px',
              fontSize: '14px',
            },
          }}
        />
      </body>
    </html>
  );
}
