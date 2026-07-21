"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "./Icons";
import { useEffect, useRef, useState } from "react";

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
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  // Desktop parallax only
  useEffect(() => {
    if (isMobile) return;
    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setMousePos({
          x: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
          y: ((e.clientY - rect.top) / rect.height - 0.5) * 20,
        });
      }
    };
    const section = sectionRef.current;
    if (section) section.addEventListener("mousemove", handleMouseMove);
    return () => section?.removeEventListener("mousemove", handleMouseMove);
  }, [isMobile]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[80vh] md:min-h-[90vh] flex items-center bg-white overflow-hidden"
    >
      {/* Mobile background image */}
      <div className="md:hidden absolute inset-0">
        <img
          src={imageUrl || "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80"}
          alt=""
          className="w-full h-full object-cover opacity-20"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/60 to-white" />
      </div>

      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none hidden md:block">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-pink-light/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-brand-gold-light/10 rounded-full blur-3xl" />
        <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-brand-pink/30 rounded-full animate-float" />
        <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-brand-gold/20 rounded-full animate-float" style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-1/3 left-1/4 w-1 h-1 bg-brand-pink/20 rounded-full animate-float" style={{ animationDelay: "2s" }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 w-full">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text content */}
          <div className="max-w-lg order-2 md:order-1">
            <div
              className={`transition-all duration-700 delay-100 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <span className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.2em] uppercase text-brand-pink font-medium bg-brand-pink-light/30 px-3 py-1.5 rounded-full">
                <Sparkles size={10} />
                {subtitle}
              </span>
            </div>

            <h1
              className={`transition-all duration-700 delay-200 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              } text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-light text-[#1a1a1a] leading-[1.05] tracking-tight mt-5 mb-5`}
            >
              {title.split(" ").map((word, i, arr) =>
                i === arr.length - 1 ? (
                  <span key={i}>
                    <span className="bg-gradient-to-r from-brand-pink to-brand-gold bg-clip-text text-transparent">
                      {word}
                    </span>
                  </span>
                ) : (
                  <span key={i}>{word} </span>
                )
              )}
            </h1>

            <p
              className={`transition-all duration-700 delay-300 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              } text-sm md:text-base text-gray-500 leading-relaxed mb-8 max-w-md`}
            >
              {description}
            </p>

            <div
              className={`transition-all duration-700 delay-400 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              } flex flex-col sm:flex-row gap-3`}
            >
              <Link
                href={ctaHref}
                className="group relative inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 bg-[#1a1a1a] text-white text-xs font-semibold tracking-[0.08em] uppercase overflow-hidden transition-all duration-300 hover:bg-brand-pink-dark touch-target"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {ctaText}
                  <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-brand-pink-dark to-brand-pink opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
              {secondaryCtaText && secondaryCtaHref && (
                <Link
                  href={secondaryCtaHref}
                  className="group inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 text-xs font-semibold tracking-[0.08em] uppercase text-[#1a1a1a] border border-gray-200 hover:border-[#1a1a1a] transition-all duration-300 touch-target"
                >
                  {secondaryCtaText}
                </Link>
              )}
            </div>

            {/* Trust badges - horizontal scroll on mobile */}
            <div
              className={`transition-all duration-700 delay-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              } flex items-center gap-4 md:gap-6 mt-8 pt-6 border-t border-gray-100 overflow-x-auto scrollbar-none`}
            >
              {[
                { label: "Ethically Made", icon: "✦" },
                { label: "Sustainable", icon: "♻" },
                { label: "Free Shipping $100+", icon: "✈" },
              ].map((item) => (
                <span
                  key={item.label}
                  className="flex items-center gap-1.5 text-[10px] tracking-[0.05em] uppercase text-gray-400 whitespace-nowrap"
                >
                  <span className="text-brand-pink">{item.icon}</span>
                  {item.label}
                </span>
              ))}
            </div>
          </div>

          {/* Image with parallax - hidden on mobile (shown as bg instead) */}
          <div
            className={`hidden md:block order-2 transition-all duration-700 delay-150 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
            style={{
              transform: !isMobile
                ? `perspective(1000px) rotateY(${mousePos.x * 0.02}deg) rotateX(${-mousePos.y * 0.02}deg)`
                : undefined,
            }}
          >
            <div className="relative">
              <div className="absolute -top-3 -right-3 w-full h-full border-2 border-brand-pink-light/40 rounded-sm" />
              <div className="relative aspect-[4/5] bg-gray-50 overflow-hidden rounded-sm">
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent z-10" />
                <div
                  className={`absolute inset-0 bg-white z-20 transition-all duration-1000 delay-500 ${
                    isVisible ? "translate-y-full" : "translate-y-0"
                  }`}
                />
                <img
                  src={imageUrl || "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80"}
                  alt="Lotus Vogue Collection"
                  className="w-full h-full object-cover transition-transform duration-[7000ms] hover:scale-105"
                  loading="eager"
                  style={{
                    transform: !isMobile
                      ? `scale(${1 + mousePos.y * 0.001}) translate(${mousePos.x * 0.05}px, ${mousePos.y * 0.05}px)`
                      : undefined,
                    transition: "transform 0.2s ease-out",
                  }}
                />
                <div className="absolute bottom-4 left-4 z-30 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-sm animate-fade-in-up stagger-5">
                  <p className="text-[10px] tracking-[0.1em] uppercase text-gray-500">New Collection</p>
                  <p className="text-xs font-medium text-[#1a1a1a] mt-0.5">Spring/Summer 2026</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator - hidden on mobile */}
      <div className="hidden md:block absolute bottom-6 left-1/2 -translate-x-1/2 z-10 animate-float">
        <div className="flex flex-col items-center gap-1.5 text-[9px] tracking-[0.15em] uppercase text-gray-300">
          <span>Scroll</span>
          <div className="w-5 h-8 border border-gray-200 rounded-full flex justify-center pt-1.5">
            <div className="w-0.5 h-2 bg-gray-300 rounded-full animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}
