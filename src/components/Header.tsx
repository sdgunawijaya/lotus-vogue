"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useSiteSettings } from "@/context/SiteSettingsContext";
import { ShoppingBag, X, Search, User, Heart } from "./Icons";

const navLinks = [
  { name: "New In", href: "/products?filter=new" },
  { name: "Dresses", href: "/products?category=dresses" },
  { name: "Tops", href: "/products?category=tops" },
  { name: "Bottoms", href: "/products?category=bottoms" },
  { name: "Accessories", href: "/products?category=accessories" },
  { name: "Sale", href: "/products?filter=sale" },
];

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { itemCount, openCart } = useCart();
  const { settings } = useSiteSettings();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartBounce, setCartBounce] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);

  if (pathname.startsWith("/admin")) return null;

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Cart bounce animation
  useEffect(() => {
    if (itemCount > 0) {
      setCartBounce(true);
      const timer = setTimeout(() => setCartBounce(false), 400);
      return () => clearTimeout(timer);
    }
  }, [itemCount]);

  // Lock body scroll when menu or search is open
  useEffect(() => {
    const shouldLock = isMenuOpen || isSearchOpen;
    document.body.style.overflow = shouldLock ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen, isSearchOpen]);

  // Focus search input when opened
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  // Close mobile menu on route change (including browser back)
  useEffect(() => {
    setIsMenuOpen(false);
    setIsSearchOpen(false);
  }, [pathname]);

  // Touch swipe to close menu
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      const diff = touchStartX.current - e.changedTouches[0].clientX;
      if (diff > 80) setIsMenuOpen(false); // Swipe left to close
    },
    []
  );

  const handleSearch = useCallback(
    (q: string) => {
      const trimmed = q.trim();
      if (trimmed) {
        router.push(`/products?search=${encodeURIComponent(trimmed)}`);
        setIsSearchOpen(false);
        setSearchQuery("");
      }
    },
    [router]
  );

  return (
    <>
      {/* Announcement bar */}
      {settings.announcementEnabled && (
        <div className="bg-[#1a1a1a] text-white text-[11px] text-center py-2.5 px-4 tracking-[0.08em] uppercase relative overflow-hidden">
          <div className="animate-marquee whitespace-nowrap">
            <span className="mx-8">{settings.announcementText}</span>
            <span className="mx-8">{settings.announcementText}</span>
            <span className="mx-8">{settings.announcementText}</span>
          </div>
        </div>
      )}

      {/* Main header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-lg shadow-[0_1px_3px_rgba(0,0,0,0.06)]"
            : "bg-white"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 md:h-[68px]">
            {/* Mobile menu button - 44px touch target */}
            <button
              className="md:hidden touch-target rounded-lg text-gray-700 hover:text-black transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              <div className="relative w-5 h-5">
                <span
                  className={`absolute left-0 top-1/2 -translate-y-1/2 block w-5 h-0.5 bg-current rounded-full transition-all duration-300 ${
                    isMenuOpen ? "rotate-45" : "-translate-y-[5px]"
                  }`}
                />
                <span
                  className={`absolute left-0 top-1/2 -translate-y-1/2 block w-5 h-0.5 bg-current rounded-full transition-all duration-300 ${
                    isMenuOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`absolute left-0 top-1/2 -translate-y-1/2 block w-5 h-0.5 bg-current rounded-full transition-all duration-300 ${
                    isMenuOpen ? "-rotate-45" : "translate-y-[5px]"
                  }`}
                />
              </div>
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0 touch-target py-2">
              <span className="text-lg md:text-xl font-light tracking-[0.15em] text-[#1a1a1a]">
                LOTUS
                <span className="font-medium text-brand-accent">VOGUE</span>
              </span>
            </Link>

            {/* Desktop navigation */}
            <nav className="hidden md:flex items-center justify-center flex-1 gap-1 lg:gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="relative px-3 py-2 text-[11px] tracking-[0.1em] uppercase text-gray-600 hover:text-black transition-all duration-300 group touch-target"
                >
                  <span className="relative z-10">{link.name}</span>
                  <span className="absolute inset-x-2 bottom-0 h-[2px] bg-brand-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full" />
                </Link>
              ))}
            </nav>

            {/* Actions - 44px touch targets */}
            <div className="flex items-center gap-0.5 sm:gap-1">
              <button
                className="touch-target text-gray-600 hover:text-black transition-all duration-200 hover:bg-gray-50 rounded-lg group"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                aria-label="Search"
              >
                <Search size={18} className="transition-transform duration-200 group-hover:scale-110" />
              </button>
              <Link
                href="/about"
                className="hidden sm:inline-flex touch-target text-gray-600 hover:text-black transition-all duration-200 hover:bg-gray-50 rounded-lg group"
                aria-label="Account"
              >
                <User size={18} className="transition-transform duration-200 group-hover:scale-110" />
              </Link>
              <Link
                href="/about"
                className="hidden sm:inline-flex touch-target text-gray-600 hover:text-black transition-all duration-200 hover:bg-gray-50 rounded-lg group"
                aria-label="Wishlist"
              >
                <Heart size={18} className="transition-transform duration-200 group-hover:scale-110" />
              </Link>
              <button
                className="relative touch-target text-gray-600 hover:text-black transition-all duration-200 hover:bg-gray-50 rounded-lg group"
                onClick={openCart}
                aria-label="Open cart"
              >
                <ShoppingBag
                  size={18}
                  className={`transition-transform duration-200 group-hover:scale-110 ${
                    cartBounce ? "animate-cart-bounce" : ""
                  }`}
                />
                {itemCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-[#1a1a1a] text-white text-[9px] font-semibold w-4 h-4 rounded-full flex items-center justify-center animate-scale-in">
                    {itemCount > 9 ? "9+" : itemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Search bar - full width, mobile friendly */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isSearchOpen ? "max-h-[280px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="border-t border-gray-100 bg-gray-50/50 safe-bottom">
            <div className="max-w-3xl mx-auto px-4 py-4 md:py-5">
              <div className="relative group">
                <Search
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-accent transition-colors duration-200"
                />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSearch(searchQuery);
                    if (e.key === "Escape") {
                      setIsSearchOpen(false);
                      setSearchQuery("");
                    }
                  }}
                  className="w-full pl-10 pr-24 py-3 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/10 transition-all duration-200"
                  autoFocus
                />
                {searchQuery && (
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                    <button
                      className="touch-target text-gray-400 hover:text-gray-600 transition-colors rounded-md hover:bg-gray-100"
                      onClick={() => setSearchQuery("")}
                      aria-label="Clear search"
                    >
                      <X size={14} />
                    </button>
                    <button
                      className="touch-target text-white bg-[#1a1a1a] hover:bg-brand-accent-dark transition-colors rounded-md"
                      onClick={() => handleSearch(searchQuery)}
                      aria-label="Submit search"
                    >
                      <Search size={14} />
                    </button>
                  </div>
                )}
              </div>
              {/* Popular search terms */}
              <div className="flex items-center gap-2 mt-3 text-xs text-gray-400 overflow-x-auto scrollbar-none">
                <span className="shrink-0">Popular:</span>
                {["Dresses", "Tops", "New Arrivals", "Sale"].map((term) => (
                  <button
                    key={term}
                    onClick={() => {
                      setSearchQuery(term);
                      handleSearch(term);
                    }}
                    className="shrink-0 px-3 py-1.5 bg-white border border-gray-100 rounded-full hover:border-gray-200 hover:text-gray-600 transition-all active:scale-95"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fade-in" />
          <div
            ref={menuRef}
            className="absolute left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white shadow-2xl animate-slide-in-left safe-top safe-bottom"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50">
              <span className="text-sm font-light tracking-[0.15em]">
                LOTUS<span className="font-medium text-brand-accent">VOGUE</span>
              </span>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="touch-target text-gray-400 hover:text-black transition-colors rounded-lg hover:bg-gray-50"
                aria-label="Close menu"
              >
                <X size={18} />
              </button>
            </div>

            <div className="py-4 px-6 overflow-y-auto" style={{ maxHeight: "calc(100vh - 120px)" }}>
              <nav className="flex flex-col gap-0.5" aria-label="Mobile navigation">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="group flex items-center justify-between py-3.5 px-3 text-sm tracking-wide text-gray-700 hover:text-black hover:bg-gray-50 rounded-lg transition-all duration-200 active:bg-gray-100"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="font-medium">{link.name}</span>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-gray-300 group-hover:text-brand-accent transition-colors"
                    >
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </Link>
                ))}
              </nav>

              <div className="mt-6 pt-4 border-t border-gray-100 space-y-1">
                <Link
                  href="/about"
                  className="flex items-center gap-3 py-3 px-3 text-sm text-gray-500 hover:text-black hover:bg-gray-50 rounded-lg transition-all active:bg-gray-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User size={16} />
                  My Account
                </Link>
                <Link
                  href="/about"
                  className="flex items-center gap-3 py-3 px-3 text-sm text-gray-500 hover:text-black hover:bg-gray-50 rounded-lg transition-all active:bg-gray-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Heart size={16} />
                  Wishlist
                </Link>
                <Link
                  href="/contact"
                  className="flex items-center gap-3 py-3 px-3 text-sm text-gray-500 hover:text-black hover:bg-gray-50 rounded-lg transition-all active:bg-gray-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  Contact Us
                </Link>
              </div>
            </div>

            {/* Bottom gradient fade */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none" />
          </div>
        </div>
      )}
    </>
  );
}
