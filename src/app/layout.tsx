import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { SiteSettingsProvider } from "@/context/SiteSettingsContext";
import { AdminDataProvider } from "@/context/AdminDataContext";
import { QuickViewProvider } from "@/context/QuickViewContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import QuickViewModal from "@/components/QuickViewModal";
import PageTransition from "@/components/PageTransition";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
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
      className={`${poppins.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <SiteSettingsProvider>
          <AdminDataProvider>
            <CartProvider>
              <QuickViewProvider>
                <Header />
                <main className="flex-1"><PageTransition>{children}</PageTransition></main>
                <Footer />
                <CartDrawer />
                <QuickViewModal />
              </QuickViewProvider>
            </CartProvider>
          </AdminDataProvider>
        </SiteSettingsProvider>
      </body>
    </html>
  );
}
