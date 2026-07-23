"use client";

import { useState, useRef, useEffect } from "react";
import { ArrowRight, Check, Mail, Sparkles } from "./Icons";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-20 bg-gradient-to-b from-white to-gray-50 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="max-w-lg mx-auto text-center"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(24px)",
            transition: "all 0.6s ease-out",
          }}
        >
          {/* Icon */}
          <div
            className="inline-flex items-center justify-center w-12 h-12 bg-brand-accent-light/30 rounded-full mb-4"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "scale(1)" : "scale(0.8)",
              transition: "all 0.5s ease-out 0.1s",
            }}
          >
            <Mail size={20} className="text-brand-accent" />
          </div>

          {/* Heading */}
          <h2 className="text-2xl md:text-3xl font-light text-[#1a1a1a] mb-2">
            Stay in the Loop
          </h2>
          <div
            className="section-divider"
            style={{
              width: isVisible ? "48px" : "0",
              transition: "width 0.6s ease-out 0.2s",
            }}
          />
          <p className="text-sm text-gray-500 mb-7">
            Subscribe for early access to new collections and exclusive offers.
          </p>

          {/* Form */}
          {isSubscribed ? (
            <div
              className="flex items-center justify-center gap-2 text-green-700 bg-green-50 px-4 py-3 animate-scale-in-up"
              style={{
                opacity: isVisible ? 1 : 0,
                transition: "opacity 0.4s ease-out 0.3s",
              }}
            >
              <Check size={16} />
              <span className="text-sm font-medium">
                You&apos;re subscribed!
              </span>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex gap-2"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(12px)",
                transition: "all 0.5s ease-out 0.3s",
              }}
            >
              <div className="relative flex-1">
                <Mail
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 text-sm focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent/20 transition-all duration-200"
                />
              </div>
              <button
                type="submit"
                className="touch-target px-5 py-2.5 bg-[#1a1a1a] text-white text-xs font-semibold tracking-wider uppercase hover:bg-brand-accent-dark transition-all duration-300 flex items-center gap-1.5"
              >
                Subscribe
                <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            </form>
          )}

          {/* Footer note */}
          <p
            className="text-[11px] text-gray-400 mt-3 flex items-center justify-center gap-1"
            style={{
              opacity: isVisible ? 1 : 0,
              transition: "opacity 0.5s ease-out 0.4s",
            }}
          >
            <Sparkles size={10} />
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
}
