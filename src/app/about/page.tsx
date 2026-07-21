import Link from "next/link";
import { Flower, Sparkles, Heart, Shield, ArrowRight } from "@/components/Icons";

const values = [
  {
    icon: Flower,
    title: "Mindful Design",
    description:
      "Every piece is thoughtfully designed to transcend seasons, not just trends. We believe in fashion that respects both the person wearing it and the planet we share.",
  },
  {
    icon: Heart,
    title: "Ethical Craftsmanship",
    description:
      "We partner with artisans and manufacturers who share our commitment to fair wages, safe working conditions, and sustainable production practices.",
  },
  {
    icon: Sparkles,
    title: "Timeless Elegance",
    description:
      "Our collections blend contemporary silhouettes with classic sensibilities. We create pieces you'll reach for season after season.",
  },
  {
    icon: Shield,
    title: "Quality Promise",
    description:
      "From fabric selection to final stitching, we ensure every garment meets our rigorous quality standards. Your satisfaction is guaranteed.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-brand-warm-white">
      {/* Hero */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-pink-light/20 via-transparent to-brand-gold-light/20" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-pink/10 rounded-full text-brand-pink-dark text-xs font-medium tracking-wider mb-6">
            <Flower size={14} />
            <span>Our Story</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-brand-charcoal tracking-tight mb-6 leading-[1.1]">
            Where{" "}
            <span className="text-gradient">Mindfulness</span> Meets
            Fashion
          </h1>
          <div className="section-divider" />
          <p className="text-base md:text-lg text-brand-charcoal/60 leading-relaxed max-w-2xl mx-auto">
            Lotus Vogue was born from a simple belief: that fashion can be
            both beautiful and meaningful. We create clothing that empowers
            women to express their authentic selves while honoring the world
            around them.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-light text-brand-charcoal mb-6">
                The Lotus Philosophy
              </h2>
              <div className="space-y-4 text-brand-charcoal/60 leading-relaxed">
                <p>
                  Just as the lotus flower rises from murky waters to bloom
                  with extraordinary beauty, we believe every woman has the
                  strength to rise, transform, and flourish. Our name
                  embodies this journey of growth and self-discovery.
                </p>
                <p>
                  Founded in 2024 by a collective of designers who were tired
                  of fast fashion&apos;s disposable culture, Lotus Vogue
                  represents a return to thoughtful consumption. We design
                  with intention, produce with care, and create pieces that
                  become cherished parts of your wardrobe.
                </p>
                <p>
                  Each collection is a celebration of color, texture, and
                  form — inspired by nature, art, and the incredible women
                  who wear our clothes.
                </p>
              </div>
              <Link
                href="/products"
                className="btn-primary group mt-8 inline-flex"
              >
                Explore the Collection
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="relative">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&q=80"
                  alt="Lotus Vogue design studio"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-4">
                <p className="text-2xl font-light text-brand-pink-dark">
                  50+
                </p>
                <p className="text-xs text-brand-charcoal/50">
                Unique designs crafted
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24 bg-brand-cream/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-light text-brand-charcoal mb-4">
              What We Stand For
            </h2>
            <div className="section-divider" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <div key={value.title} className="text-center">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-pink/20 to-brand-gold-light/20 flex items-center justify-center mx-auto mb-5">
                  <value.icon size={24} className="text-brand-pink" />
                </div>
                <h3 className="text-lg font-medium text-brand-charcoal mb-3">
                  {value.title}
                </h3>
                <p className="text-sm text-brand-charcoal/60 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-brand-pink/10 to-brand-gold-light/10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-light text-brand-charcoal mb-4">
            Ready to Bloom?
          </h2>
          <p className="text-brand-charcoal/60 mb-8 max-w-md mx-auto">
            Join the Lotus Vogue community and discover fashion that
            celebrates your unique beauty.
          </p>
          <Link href="/products" className="btn-primary">
            Shop Now
          </Link>
        </div>
      </section>
    </div>
  );
}
