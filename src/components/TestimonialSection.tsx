"use client";

import { useRef, useState, useEffect } from "react";
import { Star, Sparkles, ChevronLeft, ChevronRight } from "./Icons";
import type { Testimonial } from "@/data/products";

interface TestimonialSectionProps {
  testimonials: Testimonial[];
}

export default function TestimonialSection({
  testimonials,
}: TestimonialSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Auto-rotate the featured testimonial
  useEffect(() => {
    if (!isVisible || testimonials.length <= 1) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isVisible, testimonials.length]);

  if (testimonials.length === 0) return null;

  const active = testimonials[activeIndex];

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-20 bg-[#fafafa] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={`text-center mb-10 transition-all duration-700 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
        >
          <span className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.2em] uppercase text-brand-accent font-medium">
            <Sparkles size={10} />
            Loved by Customers
          </span>
          <h2 className="text-2xl md:text-3xl font-light text-[#1a1a1a] tracking-tight mt-2 mb-3">
            What Our Community Says
          </h2>
          <div className="section-divider" />
        </div>

        {/* Desktop grid */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-5">
          {testimonials.map((testimonial, i) => (
            <div
              key={testimonial.id}
              className="bg-white p-6 rounded-sm shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] transition-all duration-300"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(20px)",
                transition: `all 0.5s ease-out ${i * 0.1}s`,
              }}
            >
              {/* Stars */}
              <div className="flex items-center gap-0.5 mb-3">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star
                    key={s}
                    size={11}
                    className={
                      s < testimonial.rating
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-200"
                    }
                  />
                ))}
              </div>

              <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-4">
                &ldquo;{testimonial.text}&rdquo;
              </p>

              <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-gold-dark to-brand-gold flex items-center justify-center text-white text-[11px] font-semibold">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-gray-400">
                    {testimonial.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile/Tablet featured card */}
        <div className="lg:hidden">
          <div
            className="bg-white p-6 md:p-8 rounded-sm shadow-[0_1px_3px_rgba(0,0,0,0.04)] max-w-lg mx-auto transition-all duration-500"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(20px)",
              transition: `all 0.5s ease-out 0.1s`,
            }}
          >
            <div className="flex items-center gap-0.5 mb-3">
              {Array.from({ length: 5 }).map((_, s) => (
                <Star
                  key={s}
                  size={14}
                  className={
                    s < active.rating
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-200"
                  }
                />
              ))}
            </div>

            <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-5 italic transition-all duration-300">
              &ldquo;{active.text}&rdquo;
            </p>

            <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-gold-dark to-brand-gold flex items-center justify-center text-white text-xs font-semibold">
                {active.avatar}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  {active.name}
                </p>
                <p className="text-xs text-gray-400">{active.location}</p>
              </div>
            </div>

            {/* Navigation dots */}
            {testimonials.length > 1 && (
              <div className="flex items-center justify-center gap-2 mt-5 pt-4 border-t border-gray-100">
                <button
                  onClick={() =>
                    setActiveIndex(
                      (prev) =>
                        (prev - 1 + testimonials.length) % testimonials.length
                    )
                  }
                  className="touch-target p-1.5 text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft size={16} />
                </button>
                <div className="flex items-center gap-1.5">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveIndex(i)}
                      className={`transition-all duration-300 rounded-full ${
                        i === activeIndex
                          ? "w-5 h-1.5 bg-brand-accent"
                          : "w-1.5 h-1.5 bg-gray-300 hover:bg-gray-400"
                      }`}
                      aria-label={`Go to testimonial ${i + 1}`}
                    />
                  ))}
                </div>
                <button
                  onClick={() =>
                    setActiveIndex((prev) => (prev + 1) % testimonials.length)
                  }
                  className="touch-target p-1.5 text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label="Next testimonial"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
