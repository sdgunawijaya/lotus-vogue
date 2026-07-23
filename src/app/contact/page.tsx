"use client";

import { useState } from "react";
import { Mail, MapPin, Phone, Send, Check, Flower } from "@/components/Icons";
import RevealOnScroll from "@/components/RevealOnScroll";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-brand-warm-white">
      {/* Header */}
      <RevealOnScroll animation="fade" className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-accent/10 rounded-full text-brand-accent-dark text-xs font-medium tracking-wider mb-6">
            <Flower size={14} />
            <span>Get in Touch</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-light text-brand-charcoal tracking-tight mb-4">
            We&apos;d Love to Hear from You
          </h1>
          <div className="section-divider" />
          <p className="text-base text-brand-charcoal/60 max-w-lg mx-auto">
            Have a question about sizing, styling, or your order? Our team is
            here to help.
          </p>
        </div>
      </RevealOnScroll>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact info */}
          <RevealOnScroll animation="up" className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-lg font-medium text-brand-charcoal mb-6">
                Contact Information
              </h2>
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-accent-light/30 flex items-center justify-center flex-shrink-0">
                    <Mail size={18} className="text-brand-accent-dark" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-brand-charcoal">
                      Email
                    </p>
                    <a
                      href="mailto:hello@lotusvogue.com"
                      className="text-sm text-brand-charcoal/60 hover:text-brand-accent transition-colors"
                    >
                      hello@lotusvogue.com
                    </a>
                    <p className="text-xs text-brand-charcoal/40 mt-0.5">
                      We respond within 24 hours
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-accent-light/30 flex items-center justify-center flex-shrink-0">
                    <Phone size={18} className="text-brand-accent-dark" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-brand-charcoal">
                      Phone
                    </p>
                    <a
                      href="tel:+12125551234"
                      className="text-sm text-brand-charcoal/60 hover:text-brand-accent transition-colors"
                    >
                      +1 (212) 555-1234
                    </a>
                    <p className="text-xs text-brand-charcoal/40 mt-0.5">
                      Mon-Fri, 9AM-6PM EST
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-accent-light/30 flex items-center justify-center flex-shrink-0">
                    <MapPin size={18} className="text-brand-accent-dark" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-brand-charcoal">
                      Studio
                    </p>
                    <p className="text-sm text-brand-charcoal/60">
                      245 Fashion Avenue, Suite 200
                    </p>
                    <p className="text-sm text-brand-charcoal/60">
                      New York, NY 10012
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <RevealOnScroll animation="up" delay={100} className="bg-brand-soft-rose rounded-2xl p-6">
              <h3 className="text-sm font-medium text-brand-charcoal mb-3">
                Frequently Asked Questions
              </h3>
              <ul className="space-y-2">
                {[
                  "What is your return policy?",
                  "How long does shipping take?",
                  "How do I find my size?",
                  "Do you ship internationally?",
                ].map((q) => (
                  <li key={q}>
                    <button className="text-sm text-brand-accent hover:text-brand-accent-dark transition-colors">
                      {q}
                    </button>
                  </li>
                ))}
              </ul>
            </RevealOnScroll>
          </RevealOnScroll>

          {/* Contact form */}
          <RevealOnScroll animation="up" delay={150} className="lg:col-span-3">
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-brand-accent-light/20">
              <h2 className="text-lg font-medium text-brand-charcoal mb-6">
                Send Us a Message
              </h2>

              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mb-4">
                    <Check size={24} className="text-green-600" />
                  </div>
                  <h3 className="text-lg font-medium text-brand-charcoal mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-sm text-brand-charcoal/60">
                    Thank you for reaching out. We&apos;ll get back to you within 24
                    hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-brand-charcoal mb-1.5"
                      >
                        Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full px-4 py-3 bg-brand-soft-rose border border-brand-accent-light/40 rounded-xl text-sm focus:outline-none focus:border-brand-accent transition-colors min-h-[44px]"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-brand-charcoal mb-1.5"
                      >
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full px-4 py-3 bg-brand-soft-rose border border-brand-accent-light/40 rounded-xl text-sm focus:outline-none focus:border-brand-accent transition-colors min-h-[44px]"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-brand-charcoal mb-1.5"
                    >
                      Subject
                    </label>
                    <select
                      id="subject"
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-brand-soft-rose border border-brand-accent-light/40 rounded-xl text-sm focus:outline-none focus:border-brand-accent transition-colors min-h-[44px]"
                    >
                      <option value="">Select a topic...</option>
                      <option value="order">Order Inquiry</option>
                      <option value="shipping">Shipping Question</option>
                      <option value="returns">Returns & Exchanges</option>
                      <option value="product">Product Question</option>
                      <option value="collaboration">Collaboration</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-brand-charcoal mb-1.5"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-brand-soft-rose border border-brand-accent-light/40 rounded-xl text-sm focus:outline-none focus:border-brand-accent transition-colors resize-none min-h-[44px]"
                      placeholder="How can we help you?"
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn-primary inline-flex"
                  >
                    <Send size={16} />
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </div>
  );
}
