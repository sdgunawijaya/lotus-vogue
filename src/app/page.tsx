import HeroSection from "@/components/HeroSection";
import { CategoryShowcase } from "@/components/FeaturedSection";
import FeaturedSection from "@/components/FeaturedSection";
import TestimonialSection from "@/components/TestimonialSection";
import NewsletterSignup from "@/components/NewsletterSignup";
import {
  categories,
  featuredProducts,
  saleProducts,
  testimonials,
} from "@/data/products";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <HeroSection
        title="Bloom in Style This Season"
        subtitle="Spring/Summer 2026 Collection"
        description="Discover our latest collection where delicate lotus-inspired design meets contemporary fashion. Each piece is thoughtfully crafted for the modern woman who values both elegance and purpose."
        ctaText="Shop New Arrivals"
        ctaHref="/products?filter=new"
        secondaryCtaText="Explore Collections"
        secondaryCtaHref="/products"
        imageUrl="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80"
      />

      {/* Brand Story Strip */}
      <section className="py-10 bg-white border-y border-brand-pink-light/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 text-center">
            {[
              { icon: "✧", label: "Ethically Made" },
              { icon: "✦", label: "Premium Quality" },
              { icon: "✧", label: "Timeless Design" },
              { icon: "✦", label: "Sustainable Materials" },
              { icon: "✧", label: "Free Shipping $100+" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <span className="text-brand-pink text-lg">{item.icon}</span>
                <span className="text-xs tracking-wider text-brand-charcoal/60 uppercase">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured New Arrivals */}
      <FeaturedSection
        title="New Arrivals"
        subtitle="Fresh from the atelier"
        products={featuredProducts}
        viewAllHref="/products?filter=new"
      />

      {/* Shop by Category */}
      <CategoryShowcase categories={categories} />

      {/* Sale Section */}
      <FeaturedSection
        title="Sale"
        subtitle="Limited time offers"
        products={saleProducts}
        viewAllHref="/products?filter=sale"
      />

      {/* Testimonials */}
      <TestimonialSection testimonials={testimonials} />

      {/* Newsletter */}
      <NewsletterSignup />
    </>
  );
}
