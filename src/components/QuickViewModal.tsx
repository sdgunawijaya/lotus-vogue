"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { formatPrice, calculateDiscount } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useQuickView } from "@/context/QuickViewContext";
import {
  X,
  Heart,
  Check,
  Star,
  Minus,
  Plus,
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  Ruler,
  Truck,
  Shield,
  RefreshCw,
} from "./Icons";

export default function QuickViewModal() {
  const { addItem } = useCart();
  const { product, isOpen, closeQuickView } = useQuickView();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Reset state when product changes or modal re-opens
  useEffect(() => {
    if (product && isOpen) {
      setCurrentImageIndex(0);
      setSelectedSize(product.sizes[0] || "");
      setSelectedColor(product.colors[0]?.name || "");
      setQuantity(1);
      setIsAdded(false);
      setIsWishlisted(false);
      setImageLoaded(false);
      setIsClosing(false);
    }
  }, [product, isOpen]);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      closeQuickView();
    }, 300);
  }, [closeQuickView]);

  // Focus close button when modal opens
  useEffect(() => {
    if (isOpen && closeBtnRef.current) {
      closeBtnRef.current.focus();
    }
  }, [isOpen]);

  // Handle escape key & body scroll lock
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleClose]);

  const handleAddToCart = useCallback(() => {
    if (!product) return;
    addItem(product, selectedSize, selectedColor);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  }, [product, selectedSize, selectedColor, addItem]);

  const discount = product?.originalPrice
    ? calculateDiscount(product.originalPrice, product.price)
    : 0;

  if (!isOpen || !product) return null;

  const hasMultipleImages = product.images.length > 1;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-3 sm:p-4 md:p-6">
      {/* Overlay with strong blur */}
      <div
        className={`absolute inset-0 bg-black/50 backdrop-blur-md transition-all duration-300 ${
          isClosing ? "opacity-0" : "opacity-100"
        }`}
        onClick={handleClose}
      />

      {/* Modal - centered popup on all devices */}
      <div
        ref={modalRef}
        className={`relative bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-lg shadow-2xl transition-all duration-300 animate-scale-in ${
          isClosing
            ? "opacity-0 scale-95 translate-y-4"
            : "opacity-100 scale-100 translate-y-0"
        }`}
      >
        {/* Close button */}
        <button
          ref={closeBtnRef}
          onClick={handleClose}
          className="absolute top-3 right-3 z-20 w-9 h-9 bg-white/90 backdrop-blur-sm flex items-center justify-center rounded-full hover:bg-white hover:shadow-md transition-all shadow-sm"
          aria-label="Close quick view"
        >
          <X size={16} className="text-gray-600" />
        </button>

        <div className="grid md:grid-cols-2 gap-0">
          {/* ─── Left: Image Gallery ─── */}
          <div className="relative bg-gray-50 rounded-t-lg md:rounded-l-lg md:rounded-t-none overflow-hidden">
            <div className="aspect-square md:aspect-[4/5] relative overflow-hidden">
              <img
                src={product.images[currentImageIndex] || product.images[0] || "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&q=80"}
                alt={`${product.name} - View ${currentImageIndex + 1}`}
                className={`w-full h-full object-cover transition-all duration-700 ${
                  imageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
                }`}
                onLoad={() => setImageLoaded(true)}
              />

              {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 border-2 border-gray-200 border-t-brand-accent rounded-full animate-spin" />
                </div>
              )}

              {/* Badges */}
              <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
                {product.isNew && (
                  <span className="px-2.5 py-1 bg-white text-[10px] font-semibold tracking-wider uppercase shadow-sm animate-fade-in-down">
                    New
                  </span>
                )}
                {discount > 0 && (
                  <span className="px-2.5 py-1 bg-[#1a1a1a] text-white text-[10px] font-semibold tracking-wider uppercase shadow-sm">
                    -{discount}%
                  </span>
                )}
              </div>

              {/* Wishlist button */}
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className="absolute top-3 right-3 z-10 w-9 h-9 bg-white/90 backdrop-blur-sm flex items-center justify-center rounded-full hover:bg-white transition-all shadow-sm"
                aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart
                  size={15}
                  className={
                    isWishlisted
                      ? "fill-red-400 text-red-400"
                      : "text-gray-600"
                  }
                />
              </button>

              {/* Navigation arrows */}
              {hasMultipleImages && (
                <>
                  {currentImageIndex > 0 && (
                    <button
                      onClick={() => {
                        setCurrentImageIndex((i) => i - 1);
                        setImageLoaded(false);
                      }}
                      className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 backdrop-blur-sm flex items-center justify-center rounded-full hover:bg-white transition-all shadow-sm z-10"
                      aria-label="Previous image"
                    >
                      <ChevronLeft size={16} className="text-gray-600" />
                    </button>
                  )}
                  {currentImageIndex < product.images.length - 1 && (
                    <button
                      onClick={() => {
                        setCurrentImageIndex((i) => i + 1);
                        setImageLoaded(false);
                      }}
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 backdrop-blur-sm flex items-center justify-center rounded-full hover:bg-white transition-all shadow-sm z-10"
                      aria-label="Next image"
                    >
                      <ChevronRight size={16} className="text-gray-600" />
                    </button>
                  )}
                </>
              )}

              {/* Image counter */}
              {hasMultipleImages && (
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10">
                  {product.images.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setCurrentImageIndex(i);
                        setImageLoaded(false);
                      }}
                      className={`transition-all duration-300 rounded-full ${
                        i === currentImageIndex
                          ? "w-6 h-1.5 bg-white shadow-sm"
                          : "w-1.5 h-1.5 bg-white/60 hover:bg-white/80"
                      }`}
                      aria-label={`View image ${i + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {hasMultipleImages && (
              <div className="hidden md:flex gap-2 p-3 overflow-x-auto scrollbar-none">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setCurrentImageIndex(i);
                      setImageLoaded(false);
                    }}
                    className={`flex-shrink-0 w-14 h-16 overflow-hidden border-2 transition-all duration-200 rounded-sm ${
                      i === currentImageIndex
                        ? "border-[#1a1a1a] opacity-100"
                        : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} thumbnail ${i + 1}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ─── Right: Product Details ─── */}
          <div className="flex flex-col p-5 sm:p-6 md:p-8 overflow-y-auto max-h-none">
            {/* Breadcrumb */}
            <div className="flex items-center gap-1.5 text-[10px] text-gray-400 uppercase tracking-wider mb-3">
              <Link href="/" className="hover:text-gray-600 transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link
                href={`/products?category=${product.category}`}
                className="hover:text-gray-600 transition-colors"
              >
                {product.category}
              </Link>
            </div>

            <h2 className="text-lg sm:text-xl md:text-2xl font-light text-[#1a1a1a] leading-tight">
              {product.name}
            </h2>

            <div className="flex items-center gap-3 mt-2 flex-wrap">
              <span className="text-xl font-semibold text-[#1a1a1a]">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-gray-400 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
              {discount > 0 && (
                <span className="text-[10px] font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded">
                  Save {discount}%
                </span>
              )}
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={12}
                    className={
                      star <= Math.round(product.rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-200"
                    }
                  />
                ))}
              </div>
              <span className="text-xs text-gray-500">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-500 leading-relaxed mt-4 line-clamp-3">
              {product.description}
            </p>

            {/* Color Selection */}
            {product.colors.length > 0 && (
              <div className="mt-5">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[11px] font-medium text-[#1a1a1a] uppercase tracking-wider">
                    Color:{" "}
                    <span className="text-gray-500 font-normal normal-case">
                      {selectedColor}
                    </span>
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color.hex}
                      onClick={() => setSelectedColor(color.name)}
                      className={`relative w-9 h-9 rounded-full transition-all duration-200 ${
                        selectedColor === color.name
                          ? "ring-2 ring-[#1a1a1a] ring-offset-2 scale-110"
                          : "ring-1 ring-gray-200 hover:ring-gray-400"
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                      aria-label={`Select ${color.name} color`}
                    >
                      {selectedColor === color.name && (
                        <span className="absolute inset-0 flex items-center justify-center">
                          <Check
                            size={12}
                            className={
                              color.hex === "#1A1A1A" ||
                              color.hex === "#2D2D2D" ||
                              color.hex === "#2B4162"
                                ? "text-white"
                                : "text-[#1a1a1a]"
                            }
                          />
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {product.sizes.length > 0 && (
              <div className="mt-5">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[11px] font-medium text-[#1a1a1a] uppercase tracking-wider">
                    Size:{" "}
                    <span className="text-gray-500 font-normal normal-case">
                      {selectedSize}
                    </span>
                  </span>
                  <button
                    className="text-[10px] text-gray-400 hover:text-[#1a1a1a] flex items-center gap-1 transition-colors"
                    aria-label="Open size guide"
                  >
                    <Ruler size={12} />
                    Size Guide
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2.5 text-xs font-medium transition-all duration-200 rounded-sm ${
                        selectedSize === size
                          ? "bg-[#1a1a1a] text-white"
                          : "bg-gray-50 text-gray-600 border border-gray-200 hover:border-gray-400"
                      }`}
                      aria-label={`Select size ${size}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity & Add to Cart */}
            <div className="mt-6 space-y-3">
              {/* Quantity selector */}
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-medium text-[#1a1a1a] uppercase tracking-wider">
                  Qty
                </span>
                <div className="flex items-center border border-gray-200 rounded-sm">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="p-2 hover:bg-gray-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={12} />
                  </button>
                  <span className="w-10 text-center text-sm font-medium">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(10, quantity + 1))}
                    disabled={quantity >= 10}
                    className="p-2 hover:bg-gray-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    aria-label="Increase quantity"
                  >
                    <Plus size={12} />
                  </button>
                </div>
              </div>

              {/* Add to cart button */}
              <button
                onClick={handleAddToCart}
                className={`w-full py-3.5 text-xs font-semibold tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 rounded-sm ${
                  isAdded
                    ? "bg-green-600 text-white"
                    : "bg-[#1a1a1a] text-white hover:bg-brand-accent-dark"
                }`}
              >
                {isAdded ? (
                  <>
                    <Check size={14} />
                    Added to Bag!
                  </>
                ) : (
                  <>
                    <ShoppingBag size={14} />
                    Add to Bag — {formatPrice(product.price * quantity)}
                  </>
                )}
              </button>

              {/* Wishlist button */}
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className="w-full py-3 text-[11px] font-medium tracking-wider uppercase border border-gray-200 hover:border-gray-400 transition-all duration-200 flex items-center justify-center gap-2 text-gray-600 hover:text-[#1a1a1a] rounded-sm"
              >
                <Heart
                  size={13}
                  className={
                    isWishlisted
                      ? "fill-red-400 text-red-400"
                      : "text-gray-500"
                  }
                />
                {isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
              </button>
            </div>

            {/* Product Details */}
            <div className="mt-5 pt-4 border-t border-gray-100">
              <h4 className="text-[10px] font-semibold text-[#1a1a1a] uppercase tracking-wider mb-2">
                Product Details
              </h4>
              <ul className="space-y-1">
                {product.details.slice(0, 4).map((detail, i) => (
                  <li
                    key={i}
                    className="text-xs text-gray-500 flex items-start gap-2"
                  >
                    <span className="text-gray-300 mt-0.5 flex-shrink-0">•</span>
                    {detail}
                  </li>
                ))}
                {product.details.length > 4 && (
                  <li className="text-xs text-brand-accent">
                    +{product.details.length - 4} more details
                  </li>
                )}
              </ul>
            </div>

            {/* Trust badges */}
            <div className="mt-5 pt-4 border-t border-gray-100">
              <div className="grid grid-cols-3 gap-2">
                {[
                  { icon: <Truck size={14} />, label: "Free Shipping", sub: "On orders $100+" },
                  { icon: <Shield size={14} />, label: "Secure", sub: "Protected checkout" },
                  { icon: <RefreshCw size={14} />, label: "Returns", sub: "30-day returns" },
                ].map((badge) => (
                  <div
                    key={badge.label}
                    className="flex flex-col items-center text-center gap-1 p-2 bg-gray-50 rounded-sm"
                  >
                    <span className="text-gray-400">{badge.icon}</span>
                    <span className="text-[10px] font-medium text-gray-600">
                      {badge.label}
                    </span>
                    <span className="text-[9px] text-gray-400">{badge.sub}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* View full details */}
            <div className="mt-5 pt-4 border-t border-gray-100 text-center">
              <Link
                href={`/products/${product.slug}`}
                onClick={closeQuickView}
                className="text-xs text-gray-500 hover:text-[#1a1a1a] transition-colors inline-flex items-center gap-1 py-2"
              >
                View Full Product Details
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
