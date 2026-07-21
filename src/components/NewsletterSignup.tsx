"use client";

import { useState } from "react";
import { Mail, Check, ArrowRight, Flower } from "./Icons";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-brand-pink-light/30 via-brand-warm-white to-brand-gold-light/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-brand-pink-light/30 blur-2xl" />
          <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-brand-gold-light/20 blur-2xl" />

          <div className="relative z-10 px-6 py-12 md:py-16 md:px-16 text-center">
            <div className="max-w-2xl mx-auto">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-pink to-brand-gold flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Flower size={24} className="text-white" />
              </div>

              <h2 className="text-3xl md:text-4xl font-light text-brand-charcoal mb-3">
                Stay in the Vogue
              </h2>
              <div className="section-divider" />
              <p className="text-brand-charcoal/60 text-sm md:text-base mb-8 max-w-md mx-auto">
                Subscribe for exclusive early access to new collections,
                members-only pricing, and style inspiration delivered to your
                inbox.
              </p>

              {isSubscribed ? (
                <div className="flex items-center justify-center gap-2 text-green-600 bg-green-50 rounded-full px-6 py-3 mx-auto max-w-sm">
                  <Check size={18} />
                  <span className="text-sm font-medium">
                    You&apos;re subscribed! Welcome to the circle.
                  </span>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                >
                  <div className="flex-1 relative">
                    <Mail
                      size={16}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-charcoal/30"
                    />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email address"
                      required
                      className="w-full pl-11 pr-4 py-3 bg-brand-soft-rose border border-brand-pink-light/40 rounded-full text-sm focus:outline-none focus:border-brand-pink transition-colors"
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn-primary group whitespace-nowrap"
                  >
                    Subscribe
                    <ArrowRight
                      size={16}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </button>
                </form>
              )}

              <p className="text-xs text-brand-charcoal/40 mt-4">
                No spam, ever. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
