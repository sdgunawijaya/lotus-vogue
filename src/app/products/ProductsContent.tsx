"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useAdminData } from "@/context/AdminDataContext";
import ProductCard from "@/components/ProductCard";
import { Grid, LayoutList, Search, X, SlidersHorizontal } from "@/components/Icons";

export default function ProductsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const { products, categories } = useAdminData();

  const initialCategory = searchParams.get("category") || "all";
  const initialFilter = searchParams.get("filter");
  const initialSearch = searchParams.get("search") || "";

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
  const [pageSearchQuery, setPageSearchQuery] = useState(initialSearch);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Sync search input with URL
  useEffect(() => {
    setPageSearchQuery(initialSearch);
  }, [initialSearch]);

  // Apply sale or new filter from URL param
  const effectiveProducts = useMemo(() => {
    if (initialFilter === "new") return products.filter((p) => p.isNew);
    if (initialFilter === "sale") return products.filter((p) => p.isSale);
    return products;
  }, [initialFilter, products]);

  const filteredProducts = useMemo(() => {
    let result = [...effectiveProducts];

    if (initialSearch) {
      const q = initialSearch.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.details.some((d) => d.toLowerCase().includes(q)) ||
          p.colors.some((c) => c.name.toLowerCase().includes(q))
      );
    }

    if (activeCategory !== "all") {
      result = result.filter((p) => p.category === activeCategory);
    }

    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

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
  }, [activeCategory, sortBy, priceRange, effectiveProducts, initialSearch]);

  const handlePageSearch = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (pageSearchQuery.trim()) {
      params.set("search", pageSearchQuery.trim());
    } else {
      params.delete("search");
    }
    router.push(`${pathname}?${params.toString()}`);
  }, [pageSearchQuery, searchParams, router, pathname]);

  const clearSearch = useCallback(() => {
    setPageSearchQuery("");
    const params = new URLSearchParams(searchParams.toString());
    params.delete("search");
    router.push(`${pathname}?${params.toString()}`);
  }, [searchParams, router, pathname]);

  const clearAllFilters = useCallback(() => {
    setActiveCategory("all");
    setPriceRange([0, 200]);
    setSortBy("featured");
    setPageSearchQuery("");
    router.push(pathname);
  }, [router, pathname]);

  const hasActiveFilters =
    activeCategory !== "all" ||
    priceRange[0] > 0 ||
    priceRange[1] < 200 ||
    sortBy !== "featured" ||
    !!initialSearch;

  return (
    <>
      {/* Mobile filter drawer */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-[55] md:hidden">
          <div
            className="absolute inset-0 bg-black/30 animate-fade-in"
            onClick={() => setShowMobileFilters(false)}
          />
          <div className="absolute right-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white shadow-2xl animate-slide-in-right safe-top safe-bottom">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <h3 className="text-sm font-medium text-gray-900">Filters</h3>
              <button
                onClick={() => setShowMobileFilters(false)}
                className="touch-target text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-50"
                aria-label="Close filters"
              >
                <X size={18} />
              </button>
            </div>
            <div className="overflow-y-auto p-5 space-y-6">
              {/* Category filter */}
              <div>
                <h4 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-3">
                  Category
                </h4>
                <div className="flex flex-col gap-1">
                  {["all", ...categories.map((c) => c.slug)].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`text-left px-3 py-2.5 text-sm rounded-lg touch-target transition-colors ${
                        activeCategory === cat
                          ? "bg-brand-accent text-white font-medium"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {cat === "all"
                        ? "All"
                        : cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort */}
              <div>
                <h4 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-3">
                  Sort By
                </h4>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2.5 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-brand-accent"
                >
                  <option value="featured">Featured</option>
                  <option value="newest">Newest</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>

              {/* Clear filters */}
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="w-full py-3 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg hover:border-gray-400 transition-colors touch-target"
                >
                  Clear All Filters
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Filter bar */}
      <div className="bg-white border-b border-gray-100 sticky top-14 md:top-[68px] z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category tabs - scrollable */}
          <div className="flex items-center gap-2 overflow-x-auto py-3 scrollbar-none">
            {["all", ...categories.map((c) => c.slug)].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 md:py-2 text-xs font-medium rounded-full whitespace-nowrap transition-all touch-target ${
                  activeCategory === cat
                    ? "bg-[#1a1a1a] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {cat === "all"
                  ? "All"
                  : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
            {/* Mobile filter button */}
            {isMobile && (
              <button
                onClick={() => setShowMobileFilters(true)}
                className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 rounded-full whitespace-nowrap hover:bg-gray-200 transition-colors touch-target"
              >
                <SlidersHorizontal size={12} />
                Sort
                {hasActiveFilters && (
                  <span className="w-1.5 h-1.5 bg-brand-accent rounded-full" />
                )}
              </button>
            )}
          </div>

          {/* Search and controls */}
          <div className="flex items-center gap-3 py-3 border-t border-gray-100 flex-col sm:flex-row">
            <div className="relative flex-1 w-full sm:max-w-xs">
              <Search
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search products..."
                value={pageSearchQuery}
                onChange={(e) => setPageSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handlePageSearch();
                }}
                className="w-full pl-9 pr-8 py-3 bg-gray-50 border border-gray-100 rounded-lg text-sm focus:outline-none focus:border-[#1a1a1a] focus:bg-white transition-all touch-target"
              />
              {pageSearchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute right-2 top-1/2 -translate-y-1/2 touch-target text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label="Clear search"
                >
                  <X size={12} />
                </button>
              )}
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
              {/* Desktop sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="hidden sm:block text-xs bg-transparent border border-gray-200 rounded-lg px-3 py-2 text-gray-600 focus:outline-none focus:border-[#1a1a1a] cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>

              <span className="text-xs text-gray-400 whitespace-nowrap">
                {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""}
              </span>

              {/* View toggle */}
              <div className="hidden sm:flex items-center border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`touch-target p-1.5 ${
                    viewMode === "grid"
                      ? "bg-[#1a1a1a] text-white"
                      : "text-gray-400 hover:text-gray-600"
                  } transition-colors`}
                  aria-label="Grid view"
                >
                  <Grid size={16} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`touch-target p-1.5 ${
                    viewMode === "list"
                      ? "bg-[#1a1a1a] text-white"
                      : "text-gray-400 hover:text-gray-600"
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        {filteredProducts.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">
              <Search size={24} className="text-gray-400" />
            </div>
            <p className="text-sm text-gray-500 mb-2">
              No products found matching your criteria.
            </p>
            <p className="text-xs text-gray-400 mb-6">
              Try adjusting your filters or search terms.
            </p>
            <button
              onClick={clearAllFilters}
              className="btn-secondary text-sm touch-target"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div
            className={
              viewMode === "grid"
                ? "flex flex-wrap justify-center gap-4"
                : "space-y-4"
            }
          >
            {filteredProducts.map((product, i) => (
              <div key={product.id} className="w-[calc(50%-8px)] sm:w-[calc(33.333%-10.667px)] lg:w-[calc(25%-12px)] max-w-[300px]">
                <ProductCard product={product} index={i} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Load more */}
      {filteredProducts.length > 0 && (
        <div className="text-center pb-16">
          <button className="btn-secondary text-sm touch-target">
            Load More
          </button>
        </div>
      )}

      {/* Mobile filter indicator */}
      {hasActiveFilters && !showMobileFilters && (
        <button
          onClick={() => setShowMobileFilters(true)}
          className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-30 bg-[#1a1a1a] text-white px-5 py-3 rounded-full text-xs font-medium shadow-lg hover:bg-brand-accent-dark transition-colors touch-target"
        >
          <SlidersHorizontal size={14} className="inline mr-1.5" />
          Filters Active
        </button>
      )}
    </>
  );
}
