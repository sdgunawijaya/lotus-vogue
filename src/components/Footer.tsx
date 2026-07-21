"use client";

import Link from "next/link";
import { Flower, Instagram, Facebook, Pinterest } from "./Icons";
import { TikTok } from "./Icons";

const footerLinks = {
  Shop: [
    { name: "New In", href: "/products?filter=new" },
    { name: "Dresses", href: "/products?category=dresses" },
    { name: "Tops", href: "/products?category=tops" },
    { name: "Bottoms", href: "/products?category=bottoms" },
    { name: "Accessories", href: "/products?category=accessories" },
    { name: "Sale", href: "/products?filter=sale" },
  ],
  Company: [
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Careers", href: "#" },
    { name: "Press", href: "#" },
  ],
  Support: [
    { name: "Shipping & Returns", href: "#" },
    { name: "Size Guide", href: "#" },
    { name: "FAQ", href: "#" },
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-brand-charcoal text-white">
      {/* Newsletter section */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="max-w-xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-light tracking-wide mb-3">
              Join the Lotus Vogue Circle
            </h3>
            <div className="section-divider !bg-gradient-to-r !from-brand-pink !to-brand-gold" />
            <p className="text-white/60 text-sm mb-6">
              Be the first to know about new collections, exclusive offers,
              and style inspiration.
            </p>
            <form
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-5 py-3 bg-white/10 border border-white/20 rounded-full text-sm text-white placeholder-white/40 focus:outline-none focus:border-brand-pink transition-colors"
              />
              <button
                type="submit"
                className="btn-primary whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Flower
                size={24}
                className="text-brand-pink"
              />
              <span className="text-lg font-light tracking-[0.2em]">
                LOTUS
                <span className="font-normal text-brand-gold">VOGUE</span>
              </span>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed mb-6 max-w-xs">
              Mindful elegance for the modern wardrobe. Timeless pieces
              designed to inspire confidence and celebrate individuality.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-pink transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={16} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-pink transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={16} />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-pink transition-colors"
                aria-label="TikTok"
              >
                <TikTok size={16} />
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-pink transition-colors"
                aria-label="Pinterest"
              >
                <Pinterest size={16} />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-medium tracking-wider text-brand-pink mb-4 uppercase">
                {title}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/50 hover:text-brand-pink-light transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/40">
            <p>
              &copy; {new Date().getFullYear()} Lotus Vogue. All rights
              reserved.
            </p>
            <div className="flex items-center gap-6">
              <span>Privacy Policy</span>
              <span>Terms of Service</span>
              <span>Cookie Policy</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
