"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useAdminData } from "@/context/AdminDataContext";
import { formatPrice, calculateDiscount } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import ProductCard from "@/components/ProductCard";
import SizeGuideModal from "@/components/SizeGuideModal";
import {
  Star,
  ShoppingBag,
  Heart,
  ChevronLeft,
  ChevronRight,
  Truck,
  Shield,
  RefreshCw,
  Check,
} from "@/components/Icons";

export default function ProductDetailPage() {
  const params = useParams();
  const { addItem } = useCart();
  const { getProductBySlug, getRelatedProducts } = useAdminData();
  const product = getProductBySlug(params.slug as string);

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [currentImage, setCurrentImage] = useState(0);
  const [isAdded, setIsAdded] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-2xl font-light text-brand-charcoal mb-4">
          Product Not Found
        </h1>
        <p className="text-brand-charcoal/60 text-sm mb-6">
          The product you&apos;re looking for doesn&apos;t exist or has been removed.
        </p>
        <Link href="/products" className="btn-primary">
          Browse Collection
        </Link>
      </div>
    );
  }

  const relatedProducts = getRelatedProducts(product);
  const discount = product.originalPrice
    ? calculateDiscount(product.originalPrice, product.price)
    : 0;

  const handleAddToCart = () => {
    const size = selectedSize || product.sizes[0];
    const color = selectedColor || product.colors[0].name;
    addItem(product, size, color);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="min-h-screen bg-brand-warm-white">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-brand-pink-light/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-2 text-xs text-brand-charcoal/50">
            <Link href="/" className="hover:text-brand-pink transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link
              href={`/products?category=${product.category}`}
              className="hover:text-brand-pink transition-colors capitalize"
            >
              {product.category}
            </Link>
            <span>/</span>
            <span className="text-brand-charcoal/70 truncate max-w-[200px]">
              {product.name}
            </span>
          </div>
        </div>
      </div>

      {/* Product */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Image gallery */}
          <div className="space-y-4">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-brand-cream group">
              <img
                src={product.images[currentImage]}
                alt={product.name}
                className="w-full h-full object-cover transition-opacity duration-500"
              />

              {/* Nav arrows */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setCurrentImage((prev) =>
                        prev === 0 ? product.images.length - 1 : prev - 1
                      )
                    }
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-white"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={() =>
                      setCurrentImage((prev) =>
                        prev === product.images.length - 1 ? 0 : prev + 1
                      )
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-white"
                  >
                    <ChevronRight size={18} />
                  </button>
                </>
              )}

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.isNew && (
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-brand-charcoal text-xs font-medium rounded-full">
                    New Arrival
                  </span>
                )}
                {product.isSale && (
                  <span className="px-3 py-1 bg-brand-pink text-white text-xs font-medium rounded-full">
                    -{discount}% Off
                  </span>
                )}
              </div>

              {/* Wishlist button */}
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-all"
              >
                <Heart
                  size={18}
                  className={
                    isWishlisted ? "fill-red-500 text-red-500" : ""
                  }
                />
              </button>
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImage(i)}
                    className={`w-16 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      currentImage === i
                        ? "border-brand-pink"
                        : "border-transparent hover:border-brand-pink/50"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} view ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product info */}
          <div className="space-y-6">
            <div>
              <p className="text-xs tracking-wider text-brand-charcoal/40 uppercase mb-2">
                {product.category}
              </p>
              <h1 className="text-3xl md:text-4xl font-light text-brand-charcoal leading-tight">
                {product.name}
              </h1>
              <div className="flex items-center gap-4 mt-3">
                {/* Rating */}
                <div className="flex items-center gap-1.5">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={
                          i < Math.floor(product.rating)
                            ? "text-brand-gold fill-brand-gold"
                            : "text-gray-200"
                        }
                      />
                    ))}
                  </div>
                  <span className="text-xs text-brand-charcoal/50">
                    {product.rating} ({product.reviewCount} reviews)
                  </span>
                </div>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-2xl font-medium text-brand-pink-dark">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-base text-brand-charcoal/40 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                  <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-0.5 rounded-full">
                    Save {formatPrice(product.originalPrice - product.price)}
                  </span>
                </>
              )}
            </div>

            {/* Description */}
            <p className="text-sm text-brand-charcoal/70 leading-relaxed">
              {product.description}
            </p>

            {/* Color picker */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-brand-charcoal">
                  Color:{" "}
                  <span className="text-brand-charcoal/60 font-normal">
                    {selectedColor || product.colors[0].name}
                  </span>
                </span>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {product.colors.map((color) => (
                  <button
                    key={color.hex}
                    onClick={() => setSelectedColor(color.name)}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${
                      (selectedColor || product.colors[0].name) === color.name
                        ? "border-brand-pink scale-110 shadow-md"
                        : "border-white/50 hover:scale-105"
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                    aria-label={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Size picker */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-brand-charcoal">
                  Size:{" "}
                  <span className="text-brand-charcoal/60 font-normal">
                    {selectedSize || product.sizes[0]}
                  </span>
                </span>
                <button
                  onClick={() => setShowSizeGuide(true)}
                  className="text-xs text-brand-pink hover:underline"
                >
                  Size Guide
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 text-sm rounded-lg border transition-all ${
                      (selectedSize || product.sizes[0]) === size
                        ? "border-brand-pink bg-brand-pink text-white"
                        : "border-brand-pink-light/40 text-brand-charcoal/70 hover:border-brand-pink"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to cart */}
            <div className="space-y-3 pt-4">
              <button
                onClick={handleAddToCart}
                className={`w-full py-3.5 rounded-full text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                  isAdded
                    ? "bg-green-500 text-white"
                    : "btn-primary"
                }`}
              >
                {isAdded ? (
                  <>
                    <Check size={18} />
                    Added to Bag!
                  </>
                ) : (
                  <>
                    <ShoppingBag size={18} />
                    Add to Cart — {formatPrice(product.price)}
                  </>
                )}
              </button>
              <button className="w-full py-3 rounded-full text-sm font-medium border border-brand-pink-light/40 text-brand-charcoal/70 hover:bg-brand-pink-light/20 transition-all">
                Buy with PayPal
              </button>
            </div>

            {/* Product details */}
            <div className="space-y-4 pt-6 border-t border-brand-pink-light/20">
              <div>
                <h3 className="text-sm font-medium text-brand-charcoal mb-2">
                  Details
                </h3>
                <ul className="space-y-1.5">
                  {product.details.map((detail, i) => (
                    <li
                      key={i}
                      className="text-sm text-brand-charcoal/60 flex items-center gap-2"
                    >
                      <span className="w-1 h-1 rounded-full bg-brand-pink flex-shrink-0" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-brand-pink-light/20">
              {[
                { icon: Truck, label: "Free Shipping", desc: "On orders $100+" },
                { icon: Shield, label: "Secure", desc: "Protected checkout" },
                { icon: RefreshCw, label: "Easy Returns", desc: "30-day returns" },
              ].map((item) => (
                <div key={item.label} className="text-center">
                  <item.icon
                    size={18}
                    className="mx-auto text-brand-pink mb-1"
                  />
                  <p className="text-[11px] font-medium text-brand-charcoal">
                    {item.label}
                  </p>
                  <p className="text-[10px] text-brand-charcoal/40">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 md:mt-24">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-light text-brand-charcoal mb-3">
                Complete the Look
              </h2>
              <div className="section-divider" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map((related, i) => (
                <ProductCard
                  key={related.id}
                  product={related}
                  index={i}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Size guide modal */}
      <SizeGuideModal
        isOpen={showSizeGuide}
        onClose={() => setShowSizeGuide(false)}
      />
    </div>
  );
}
