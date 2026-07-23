"use client";

import Link from "next/link";
import type { Product, Category } from "@/data/products";
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles, Eye } from "./Icons";
import { useEffect, useRef, useState, useCallback } from "react";
import { useQuickView } from "@/context/QuickViewContext";

interface FeaturedSectionProps {
  title: string;
  subtitle?: string;
  products: Product[];
  viewAllHref: string;
}

export default function FeaturedSection({
  title,
  subtitle,
  products,
  viewAllHref,
}: FeaturedSectionProps) {
  const { openQuickView } = useQuickView();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const dragStartX = useRef(0);
  const dragScrollLeft = useRef(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const updateScrollButtons = useCallback(() => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
    }
  }, []);

  const scroll = useCallback((direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.75;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  }, []);

  // Mouse drag to scroll
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    dragStartX.current = e.pageX - scrollRef.current.offsetLeft;
    dragScrollLeft.current = scrollRef.current.scrollLeft;
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging || !scrollRef.current) return;
      e.preventDefault();
      const x = e.pageX - scrollRef.current.offsetLeft;
      const walk = (x - dragStartX.current) * 1.5;
      scrollRef.current.scrollLeft = dragScrollLeft.current - walk;
    },
    [isDragging]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-20 bg-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={`flex items-end justify-between mb-8 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div>
            {subtitle && (
              <span className="text-[10px] tracking-[0.2em] uppercase text-brand-gold font-medium flex items-center gap-1.5">
                <Sparkles size={10} />
                {subtitle}
              </span>
            )}
            <h2 className="text-2xl md:text-3xl font-light text-[#1a1a1a] tracking-tight mt-2">
              {title}
            </h2>
            <div className="section-divider !ml-0" />
          </div>

          {/* Scroll buttons - larger touch targets */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className={`touch-target border border-gray-200 rounded-full transition-all duration-200 ${
                canScrollLeft
                  ? "hover:border-[#1a1a1a] hover:bg-gray-50 text-gray-700"
                  : "opacity-30 cursor-not-allowed text-gray-300"
              }`}
              aria-label="Scroll left"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className={`touch-target border border-gray-200 rounded-full transition-all duration-200 ${
                canScrollRight
                  ? "hover:border-[#1a1a1a] hover:bg-gray-50 text-gray-700"
                  : "opacity-30 cursor-not-allowed text-gray-300"
              }`}
              aria-label="Scroll right"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Product carousel */}
      <div className="relative group/carousel">
        {/* Gradient edges */}
        <div className="absolute left-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div
          ref={scrollRef}
          onScroll={updateScrollButtons}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className={`flex gap-4 md:gap-5 overflow-x-auto px-4 sm:px-8 lg:px-[calc((100vw-80rem)/2+2rem)] pb-4 scrollbar-none snap-x snap-mandatory ${
            isDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
          style={{ scrollBehavior: isDragging ? "auto" : "smooth" }}
        >
          {products.slice(0, 8).map((product, i) => (
            <Link
              key={product.id}
              href={`/products/${product.slug}`}
              className={`group flex-shrink-0 w-[170px] sm:w-[220px] md:w-[260px] snap-start transition-all duration-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 0.06}s` }}
            >
              <div className="aspect-[3/4] bg-gray-50 mb-3 relative overflow-hidden rounded-sm">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-300" />

                {/* Quick View eye button */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    openQuickView(product);
                  }}
                  className="absolute top-2 right-2 z-10 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-all shadow-sm flex items-center justify-center opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 duration-200 active:scale-90"
                  aria-label="Quick view"
                >
                  <Eye size={14} className="text-gray-600" />
                </button>

                {/* Badges */}
                <div className="absolute top-2 left-2 flex flex-col gap-1">
                  {product.isNew && (
                    <span className="px-2 py-1 bg-white text-[9px] font-medium tracking-wider uppercase shadow-sm animate-fade-in-down">
                      New
                    </span>
                  )}
                  {product.isSale && product.originalPrice && (
                    <span className="px-2 py-1 bg-[#1a1a1a] text-white text-[9px] font-medium tracking-wider uppercase shadow-sm">
                      -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                    </span>
                  )}
                </div>

                {/* Quick view + quick add */}
                <div className="absolute bottom-0 left-0 right-0 p-2 md:p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex gap-1.5">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      openQuickView(product);
                    }}
                    className="flex-1 py-2.5 bg-white/90 backdrop-blur-sm text-[10px] font-medium tracking-wider uppercase text-center text-[#1a1a1a] shadow-sm hover:bg-white transition-colors touch-target rounded-sm"
                  >
                    Quick View
                  </button>
                </div>
              </div>

              <div className="space-y-1.5 px-0.5">
                <p className="text-[9px] text-gray-400 tracking-[0.12em] uppercase font-medium">
                  {product.category}
                </p>
                <h3 className="text-sm font-medium text-gray-900 truncate group-hover:text-brand-gold transition-colors">
                  {product.name}
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-gray-900">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xs text-gray-400 line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>
                {/* Color swatches */}
                {product.colors.length > 0 && (
                  <div className="flex items-center gap-1 pt-0.5 overflow-x-auto scrollbar-none">
                    {product.colors.slice(0, 5).map((color) => (
                      <div
                        key={color.hex}
                        className="w-2.5 h-2.5 rounded-full border border-gray-200 ring-1 ring-white shrink-0"
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                      />
                    ))}
                    {product.colors.length > 5 && (
                      <span className="text-[9px] text-gray-400 ml-0.5 shrink-0">
                        +{product.colors.length - 5}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* View all */}
      <div
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 text-center transition-all duration-700 delay-300 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <Link
          href={viewAllHref}
          className="group inline-flex items-center gap-2 text-xs font-medium tracking-[0.08em] uppercase text-gray-600 hover:text-[#1a1a1a] transition-colors touch-target"
        >
          View All
          <span className="w-8 h-[1px] bg-gray-300 group-hover:bg-[#1a1a1a] transition-colors" />
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </section>
  );
}

export function CategoryShowcase({ categories }: { categories: Category[] }) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  if (categories.length === 0) return null;

  return (
    <section ref={sectionRef} className="py-16 md:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center mb-10 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <h2 className="text-2xl md:text-3xl font-light text-[#1a1a1a] tracking-tight mb-2">
            Shop by Category
          </h2>
          <div className="section-divider" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
          {categories.map((category, i) => (
            <Link
              key={category.id}
              href={`/products?category=${category.slug}`}
              className={`group relative overflow-hidden aspect-[4/5] rounded-sm transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                <h3 className="text-base md:text-lg font-light text-white mb-0.5 group-hover:translate-x-1 transition-transform duration-300">
                  {category.name}
                </h3>
                <p className="text-[11px] text-white/70">
                  {category.itemCount} items
                </p>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
