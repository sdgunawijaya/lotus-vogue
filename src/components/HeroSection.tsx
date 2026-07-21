"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, Flower } from "./Icons";
import { useEffect, useRef } from "react";

interface HeroSectionProps {
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  ctaHref: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  imageUrl?: string;
}

export default function HeroSection({
  title,
  subtitle,
  description,
  ctaText,
  ctaHref,
  secondaryCtaText,
  secondaryCtaHref,
  imageUrl,
}: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll(".animate-on-scroll");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[85vh] md:min-h-[90vh] flex items-center overflow-hidden bg-brand-soft-rose"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-brand-pink-light/30 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-brand-gold-light/20 blur-3xl" />
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-brand-pink/40 rounded-full animate-float" style={{ animationDelay: "0s" }} />
        <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-brand-gold/30 rounded-full animate-float" style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-1/3 left-1/2 w-1.5 h-1.5 bg-brand-pink-dark/30 rounded-full animate-float" style={{ animationDelay: "2s" }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <div className="max-w-xl">
            <div className="animate-on-scroll opacity-0 stagger-1">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-pink/10 rounded-full text-brand-pink-dark text-xs font-medium tracking-wider mb-6">
                <Sparkles size={14} />
                <span>{subtitle}</span>
              </div>
            </div>

            <h1 className="animate-on-scroll opacity-0 stagger-2 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-brand-charcoal leading-[1.1] mb-6">
              {title.split(" ").map((word, i) =>
                word.toLowerCase() === "bloom" ? (
                  <span key={i}>
                    <span className="text-gradient">{word}</span>{" "}
                  </span>
                ) : (
                  <span key={i}>{word}{" "}</span>
                )
              )}
            </h1>

            <p className="animate-on-scroll opacity-0 stagger-3 text-base md:text-lg text-brand-charcoal/60 leading-relaxed mb-8 max-w-md">
              {description}
            </p>

            <div className="animate-on-scroll opacity-0 stagger-4 flex flex-col sm:flex-row gap-3">
              <Link
                href={ctaHref}
                className="btn-primary group"
              >
                {ctaText}
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
              {secondaryCtaText && secondaryCtaHref && (
                <Link
                  href={secondaryCtaHref}
                  className="btn-secondary"
                >
                  {secondaryCtaText}
                </Link>
              )}
            </div>

            {/* Trust badges */}
            <div className="animate-on-scroll opacity-0 stagger-5 flex items-center gap-6 mt-12 pt-8 border-t border-brand-pink-light/30">
              <div className="flex items-center gap-2">
                <Flower size={16} className="text-brand-pink" />
                <span className="text-xs text-brand-charcoal/50">Ethically Made</span>
              </div>
              <div className="flex items-center gap-2">
                <Flower size={16} className="text-brand-pink" />
                <span className="text-xs text-brand-charcoal/50">Sustainably Sourced</span>
              </div>
              <div className="flex items-center gap-2">
                <Flower size={16} className="text-brand-pink" />
                <span className="text-xs text-brand-charcoal/50">Free Shipping $100+</span>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="hidden md:block animate-on-scroll opacity-0 stagger-3">
            <div className="relative">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl relative">
                <div
                  className="absolute inset-0 bg-gradient-to-br from-brand-pink-light/20 via-transparent to-brand-gold-light/20 z-10"
                />
                <img
                  src={imageUrl || "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80"}
                  alt="Lotus Vogue Collection"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>
              {/* Floating card */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-4 animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-pink-light flex items-center justify-center">
                    <Sparkles size={18} className="text-brand-pink-dark" />
                  </div>
                  <div>
                    <p className="text-xs text-brand-charcoal/50">New Collection</p>
                    <p className="text-sm font-medium text-brand-charcoal">Spring/Summer 2026</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
