import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingButtons from "@/components/ui/FloatingButtons";
import { Toaster } from "react-hot-toast";
import { CartProvider } from "@/hooks/useCart";

export const metadata: Metadata = {
  title: "Mahesh Enterprise | Hardware & Steel Fabrication Shop — Surendranagar",
  description: "Surendranagar's #1 hardware store. Hinges, Gate Rollers, Rajwadi Casting Design, Laser Cutting, Nuts, Bolts & all fabrication items. Call Maheshbhai: +91 97734 81051",
  keywords: "mahesh enterprise, steel fabrication, hardware shop, surendranagar, gate rollers, hinges, casting design, laser cutting, rajwadi design, gujarat fabrication",
  authors: [{ name: "Mahesh Enterprise" }],
  openGraph: {
    title: "Mahesh Enterprise | Hardware & Fabrication Shop",
    description: "500+ hardware & fabrication products. Surendranagar, Gujarat. Call +91 97734 81051",
    type: "website",
    locale: "en_IN",
    siteName: "Mahesh Enterprise",
  },
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Syne:wght@700;800&display=swap" rel="stylesheet" />
      </head>
      <body>
        <CartProvider>
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: "#fff",
                color: "#1a1a1a",
                border: "1px solid #e8e6e0",
                borderRadius: "10px",
                fontSize: "13px",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 600,
              },
              success: { iconTheme: { primary: "#2563eb", secondary: "#fff" } },
            }}
          />
          <Navbar />
          <main>{children}</main>
          <Footer />
          <FloatingButtons />
        </CartProvider>
      </body>
    </html>
  );
}