import { Suspense } from "react";
import ProductsContent from "./ProductsContent";

function ProductsLoading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-brand-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-sm text-brand-charcoal/60">Loading products...</p>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-brand-warm-white">
      {/* Page header */}
      <div className="bg-white border-b border-brand-accent-light/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-light text-brand-charcoal tracking-tight mb-3">
              Our Collection
            </h1>
            <div className="section-divider" />
            <p className="text-sm text-brand-charcoal/60 max-w-md mx-auto">
              Curated pieces designed to elevate your everyday style.
            </p>
          </div>
        </div>
      </div>

      <Suspense fallback={<ProductsLoading />}>
        <ProductsContent />
      </Suspense>
    </div>
  );
}
