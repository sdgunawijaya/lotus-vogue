"use client";

import { useRef, useState, useEffect } from "react";
import { useSiteSettings } from "@/context/SiteSettingsContext";
import { useAdminData } from "@/context/AdminDataContext";
import HeroSection from "@/components/HeroSection";
import { CategoryShowcase } from "@/components/FeaturedSection";
import FeaturedSection from "@/components/FeaturedSection";
import TestimonialSection from "@/components/TestimonialSection";
import NewsletterSignup from "@/components/NewsletterSignup";

export default function Home() {
  const { settings } = useSiteSettings();
  const { categories, featuredProducts, saleProducts, testimonials } =
    useAdminData();

  return (
    <>
      {/* Hero Section */}
      <HeroSection
        title={settings.heroTitle}
        subtitle={settings.heroSubtitle}
        description={settings.heroDescription}
        ctaText={settings.heroCtaText}
        ctaHref="/products?filter=new"
        secondaryCtaText={settings.heroSecondaryCtaText}
        secondaryCtaHref="/products"
        imageUrl={settings.heroImageUrl}
      />

      {/* Brand Strip */}
      {settings.showBrandStrip && <BrandStrip />}

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
      {settings.showTestimonials && (
        <TestimonialSection testimonials={testimonials} />
      )}

      {/* Newsletter */}
      {settings.showNewsletter && <NewsletterSignup />}
    </>
  );
}

const brandItems = [
  { icon: "✦", label: "Ethically Made" },
  { icon: "♻", label: "Premium Quality" },
  { icon: "✦", label: "Timeless Design" },
  { icon: "♻", label: "Sustainable Materials" },
  { icon: "✦", label: "Free Shipping $100+" },
];

function BrandStrip() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="py-8 md:py-10 bg-gray-50 border-t border-gray-100 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-3 text-center">
          {brandItems.map((item, i) => (
            <span
              key={item.label}
              className="flex items-center gap-2 text-[10px] tracking-[0.12em] text-gray-500 uppercase"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(12px)",
                transition: `all 0.5s ease-out ${i * 0.1}s`,
              }}
            >
              <span className="text-brand-gold">{item.icon}</span>
              {item.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
