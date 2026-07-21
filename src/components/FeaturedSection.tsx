"use client";

import Link from "next/link";
import type { Product, Category } from "@/data/products";
import { ArrowRight, Sparkles } from "./Icons";

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
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-pink/10 rounded-full text-brand-pink-dark text-xs font-medium tracking-wider mb-4">
            <Sparkles size={14} />
            <span>{subtitle || "Featured"}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-light text-brand-charcoal tracking-tight mb-4">
            {title}
          </h2>
          <div className="section-divider" />
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {products.slice(0, 4).map((product, i) => (
            <Link
              key={product.id}
              href={`/products/${product.slug}`}
              className="group"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="aspect-[3/4] rounded-xl overflow-hidden bg-brand-cream mb-3 relative">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                {product.isNew && (
                  <span className="absolute top-3 left-3 px-2.5 py-1 bg-white/90 backdrop-blur-sm text-brand-charcoal text-[10px] font-medium tracking-wider rounded-full">
                    NEW
                  </span>
                )}
              </div>
              <h3 className="text-sm font-medium text-brand-charcoal truncate">
                {product.name}
              </h3>
              <p className="text-sm text-brand-pink-dark font-medium">
                ${product.price.toFixed(2)}
              </p>
            </Link>
          ))}
        </div>

        {/* View all */}
        <div className="text-center mt-10">
          <Link
            href={viewAllHref}
            className="btn-secondary group"
          >
            View All
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}

export function CategoryShowcase({ categories }: { categories: Category[] }) {
  return (
    <section className="py-16 md:py-24 bg-brand-cream/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-light text-brand-charcoal tracking-tight mb-4">
            Shop by Category
          </h2>
          <div className="section-divider" />
          <p className="text-brand-charcoal/60 text-sm mt-4 max-w-md mx-auto">
            Explore our curated collections, designed to elevate every aspect
            of your wardrobe.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category, i) => (
            <Link
              key={category.id}
              href={`/products?category=${category.slug}`}
              className="group relative rounded-2xl overflow-hidden aspect-[4/5]"
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                <h3 className="text-lg md:text-xl font-light text-white mb-1">
                  {category.name}
                </h3>
                <p className="text-xs text-white/70 mb-2">
                  {category.description}
                </p>
                <span className="text-xs text-white/50">
                  {category.itemCount} items
                </span>
              </div>
              <div className="absolute top-0 right-0 m-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
                <ArrowRight size={16} className="text-white" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
