"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSiteSettings } from "@/context/SiteSettingsContext";
import { Instagram, Facebook, Pinterest, ChevronDown } from "./Icons";
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
  ],
  Support: [
    { name: "Shipping & Returns", href: "#" },
    { name: "Size Guide", href: "#" },
    { name: "FAQ", href: "#" },
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
  ],
};

function FooterLinkColumn({
  title,
  links,
}: {
  title: string;
  links: { name: string; href: string }[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const headingId = `footer-${title.toLowerCase()}-heading`;

  return (
    <div className="border-b border-gray-800 md:border-0">
      {/* Mobile accordion button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden flex items-center justify-between w-full py-3.5 text-xs font-semibold tracking-wider text-white uppercase min-h-[44px]"
        aria-expanded={isOpen}
        aria-controls={`footer-${title.toLowerCase()}-panel`}
        id={headingId}
      >
        {title}
        <ChevronDown
          size={14}
          className={`text-gray-500 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {/* Desktop heading */}
      <h4
        className="hidden md:block text-xs font-semibold tracking-wider text-white uppercase mt-0 mb-3"
        id={`${headingId}-desktop`}
      >
        {title}
      </h4>
      {/* Links list */}
      <ul
        id={`footer-${title.toLowerCase()}-panel`}
        role="region"
        aria-labelledby={headingId}
        className={`list-none p-0 m-0 space-y-1 overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-80 pb-3" : "max-h-0 md:!max-h-full md:!pb-0"
        }`}
      >
        {links.map((link) => (
          <li key={link.name}>
            <Link
              href={link.href}
              className="block py-3 text-xs text-gray-400 hover:text-white transition-all duration-200 hover:translate-x-1"
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  const pathname = usePathname();
  const { settings } = useSiteSettings();

  if (pathname.startsWith("/admin")) return null;

  return (
    <footer className="bg-[#1a1a1a] text-gray-400">
      {/* Newsletter section */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-sm font-medium text-white tracking-wide">
                Join the Lotus Vogue Community
              </h3>
              <p className="text-xs text-gray-500 mt-1 max-w-sm">
                Subscribe for exclusive offers, new arrivals, and style inspiration.
              </p>
            </div>
            <div className="flex w-full md:w-auto md:min-w-[420px]">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-brand-accent transition-colors min-h-[44px]"
              />
              <button className="px-6 py-3 bg-white text-[11px] font-semibold text-[#1a1a1a] tracking-wider uppercase hover:bg-brand-accent hover:text-white transition-all duration-300 touch-target whitespace-nowrap min-h-[44px]">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-6 lg:gap-10">
          {/* Brand column */}
          <div className="md:col-span-5 lg:col-span-4 text-center md:text-left">
            <Link href="/" className="inline-block mb-4 py-2 min-h-[44px]">
              <span className="text-base font-light tracking-[0.15em] text-white">
                LOTUS
                <span className="font-medium text-brand-accent">VOGUE</span>
              </span>
            </Link>
            <p className="text-xs leading-relaxed text-gray-500 mb-6 max-w-sm mx-auto md:mx-0">
              {settings.footerTagline}
            </p>
            <div className="flex items-center justify-center md:justify-start gap-3">
              {[
                { icon: Instagram, label: "Instagram" },
                { icon: Facebook, label: "Facebook" },
                { icon: TikTok, label: "TikTok" },
                { icon: Pinterest, label: "Pinterest" },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href={`https://${label.toLowerCase()}.com`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="touch-target w-10 h-10 border border-gray-700 rounded-sm hover:border-brand-accent hover:text-brand-accent transition-all duration-200"
                  aria-label={label}
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns - mobile accordion, desktop static */}
          <div className="md:col-span-7 lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {Object.entries(footerLinks).map(([title, links]) => (
              <FooterLinkColumn key={title} title={title} links={links} />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-gray-600">
            <p className="text-center md:text-left">
              &copy; {new Date().getFullYear()} Lotus Vogue. All rights reserved.
            </p>
            <div className="flex items-center gap-5 md:gap-6 flex-wrap justify-center">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
                (item) => (
                  <button
                    key={item}
                    className="hover:text-white transition-colors duration-200 py-1"
                  >
                    {item}
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
