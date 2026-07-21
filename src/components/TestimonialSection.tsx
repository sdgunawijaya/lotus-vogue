"use client";

import { Star, Flower } from "./Icons";
import type { Testimonial } from "@/data/products";

interface TestimonialSectionProps {
  testimonials: Testimonial[];
}

export default function TestimonialSection({
  testimonials,
}: TestimonialSectionProps) {
  return (
    <section className="py-16 md:py-24 bg-brand-warm-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-gold-light/20 rounded-full text-brand-gold-dark text-xs font-medium tracking-wider mb-4">
            <Flower size={14} />
            <span>Loved by Customers</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-light text-brand-charcoal tracking-tight mb-4">
            What Our Community Says
          </h2>
          <div className="section-divider" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, i) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-2xl p-6 shadow-sm border border-brand-pink-light/20 hover:shadow-md transition-all duration-300"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {/* Stars */}
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className="text-brand-gold fill-brand-gold"
                  />
                ))}
              </div>

              {/* Text */}
              <p className="text-sm text-brand-charcoal/70 leading-relaxed mb-6">
                &ldquo;{testimonial.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-brand-pink-light/20">
                <div className="w-9 h-9 rounded-full bg-brand-pink-light/40 flex items-center justify-center text-brand-pink-dark text-xs font-medium">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="text-sm font-medium text-brand-charcoal">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-brand-charcoal/40">
                    {testimonial.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
