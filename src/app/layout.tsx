import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lotus Vogue — Mindful Elegance | Premium Fashion",
  description:
    "Discover Lotus Vogue: Where mindful elegance meets modern fashion. Explore our curated collection of ethically crafted dresses, tops, bottoms, and accessories. Free shipping on orders over $100.",
  keywords: [
    "fashion",
    "clothing",
    "womens fashion",
    "sustainable fashion",
    "lotus vogue",
    "ethical clothing",
  ],
  openGraph: {
    title: "Lotus Vogue — Mindful Elegance",
    description:
      "Discover premium fashion with purpose. Ethically crafted, beautifully designed.",
    type: "website",
    locale: "en_US",
    siteName: "Lotus Vogue",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
