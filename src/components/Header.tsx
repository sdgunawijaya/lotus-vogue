"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import {
  ShoppingBag,
  Menu,
  X,
  Heart,
  User,
  Search,
  Flower,
} from "./Icons";

const navLinks = [
  { name: "New In", href: "/products?filter=new" },
  { name: "Dresses", href: "/products?category=dresses" },
  { name: "Tops", href: "/products?category=tops" },
  { name: "Bottoms", href: "/products?category=bottoms" },
  { name: "Accessories", href: "/products?category=accessories" },
  { name: "Sale", href: "/products?filter=sale" },
];

export default function Header() {
  const { itemCount, openCart } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <>
      {/* Top announcement bar */}
      <div className="bg-brand-charcoal text-white text-xs text-center py-2 px-4 tracking-wider">
        <span className="animate-fade-in inline-block">
          ✦ Free shipping on orders over $100 ✦
        </span>
      </div>

      {/* Main header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "glass shadow-sm"
            : "bg-brand-warm-white"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 -ml-2 text-brand-charcoal hover:text-brand-pink transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            {/* Desktop navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.slice(0, 3).map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm tracking-wide text-brand-charcoal/80 hover:text-brand-pink transition-colors relative group"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-pink transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </nav>

            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 group"
            >
              <Flower
                size={28}
                className="text-brand-pink group-hover:scale-110 transition-transform duration-300"
              />
              <span className="text-xl md:text-2xl font-light tracking-[0.2em] text-brand-charcoal">
                LOTUS
                <span className="font-normal text-brand-gold">VOGUE</span>
              </span>
            </Link>

            {/* Desktop navigation right */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.slice(3).map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm tracking-wide text-brand-charcoal/80 hover:text-brand-pink transition-colors relative group"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-pink transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-3 md:gap-4">
              <button
                className="p-2 text-brand-charcoal/70 hover:text-brand-pink transition-colors"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                aria-label="Search"
              >
                <Search size={20} />
              </button>
              <Link
                href="/about"
                className="hidden sm:block p-2 text-brand-charcoal/70 hover:text-brand-pink transition-colors"
                aria-label="Account"
              >
                <User size={20} />
              </Link>
              <Link
                href="/about"
                className="p-2 text-brand-charcoal/70 hover:text-brand-pink transition-colors"
                aria-label="Wishlist"
              >
                <Heart size={20} />
              </Link>
              <button
                className="p-2 text-brand-charcoal/70 hover:text-brand-pink transition-colors relative"
                onClick={openCart}
                aria-label="Open cart"
              >
                <ShoppingBag size={20} />
                {itemCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-brand-pink text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {itemCount > 9 ? "9+" : itemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Search bar */}
        <div
          className={`overflow-hidden transition-all duration-300 ${
            isSearchOpen ? "max-h-16 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="border-t border-brand-pink-light/50">
            <div className="max-w-3xl mx-auto px-4 py-3">
              <div className="relative">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-charcoal/40"
                />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-brand-pink-light/50 rounded-full text-sm focus:outline-none focus:border-brand-pink transition-colors"
                  autoFocus
                />
                {searchQuery && (
                  <button
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-charcoal/40 hover:text-brand-charcoal"
                    onClick={() => setSearchQuery("")}
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        >
          <div
            className="absolute left-0 top-0 bottom-0 w-72 bg-brand-warm-white shadow-xl animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="pt-20 pb-8 px-6">
              <div className="flex flex-col gap-2">
                {navLinks.map((link, i) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="py-3 text-base tracking-wide text-brand-charcoal/80 hover:text-brand-pink transition-colors border-b border-brand-pink-light/20"
                    style={{ animationDelay: `${i * 0.05}s` }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
              <div className="mt-8 pt-6 border-t border-brand-pink-light/30">
                <Link
                  href="/about"
                  className="block py-2 text-sm text-brand-charcoal/60 hover:text-brand-pink transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About Us
                </Link>
                <Link
                  href="/contact"
                  className="block py-2 text-sm text-brand-charcoal/60 hover:text-brand-pink transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
