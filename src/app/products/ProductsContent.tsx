"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { products, categories } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { Grid, LayoutList } from "@/components/Icons";

export default function ProductsContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";
  const initialFilter = searchParams.get("filter");

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState(
    initialFilter === "new"
      ? "newest"
      : initialFilter === "sale"
      ? "featured"
      : "featured"
  );
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);

  // Apply sale or new filter from URL param
  const effectiveProducts = useMemo(() => {
    if (initialFilter === "new") {
      return products.filter((p) => p.isNew);
    }
    if (initialFilter === "sale") {
      return products.filter((p) => p.isSale);
    }
    return products;
  }, [initialFilter]);

  const filteredProducts = useMemo(() => {
    let result = [...effectiveProducts];

    // Filter by category
    if (activeCategory !== "all") {
      result = result.filter((p) => p.category === activeCategory);
    }

    // Filter by price
    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    // Sort
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        result.sort((a, b) => (a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1));
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return result;
  }, [activeCategory, sortBy, priceRange, effectiveProducts]);

  return (
    <>
      {/* Filter bar */}
      <div className="bg-white border-b border-brand-pink-light/10 sticky top-[72px] md:top-[80px] z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category tabs */}
          <div className="flex items-center gap-2 overflow-x-auto py-3 scrollbar-none">
            {["all", ...categories.map((c) => c.slug)].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 text-xs font-medium rounded-full whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? "bg-brand-pink text-white"
                    : "bg-brand-pink-light/20 text-brand-charcoal/60 hover:bg-brand-pink-light/40"
                }`}
              >
                {cat === "all"
                  ? "All"
                  : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>

          {/* Sort and view controls */}
          <div className="flex items-center justify-between py-3 border-t border-brand-pink-light/10">
            <div className="flex items-center gap-3">
              <span className="text-xs text-brand-charcoal/50">
                {filteredProducts.length} products
              </span>
            </div>
            <div className="flex items-center gap-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-xs bg-transparent border border-brand-pink-light/30 rounded-lg px-3 py-1.5 text-brand-charcoal/70 focus:outline-none focus:border-brand-pink cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>

              <div className="hidden sm:flex items-center border border-brand-pink-light/30 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-1.5 ${
                    viewMode === "grid"
                      ? "bg-brand-pink text-white"
                      : "text-brand-charcoal/40 hover:text-brand-charcoal"
                  } transition-colors`}
                  aria-label="Grid view"
                >
                  <Grid size={16} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-1.5 ${
                    viewMode === "list"
                      ? "bg-brand-pink text-white"
                      : "text-brand-charcoal/40 hover:text-brand-charcoal"
                  } transition-colors`}
                  aria-label="List view"
                >
                  <LayoutList size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-brand-charcoal/50 text-sm">
              No products found matching your criteria.
            </p>
            <button
              onClick={() => {
                setActiveCategory("all");
                setPriceRange([0, 200]);
              }}
              className="btn-secondary mt-4 text-sm"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
                : "space-y-4"
            }
          >
            {filteredProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        )}
      </div>

      {/* Load more */}
      {filteredProducts.length > 0 && (
        <div className="text-center pb-16">
          <button className="btn-secondary text-sm">Load More</button>
        </div>
      )}
    </>
  );
}
