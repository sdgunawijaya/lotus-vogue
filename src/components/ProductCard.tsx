"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import type { Product } from "@/data/products";
import { formatPrice, calculateDiscount } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useQuickView } from "@/context/QuickViewContext";
import { Heart, Eye, Check } from "./Icons";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addItem } = useCart();
  const { openQuickView } = useQuickView();
  const [isHovered, setIsHovered] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
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
      { threshold: 0.05 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  const discount = product.originalPrice
    ? calculateDiscount(product.originalPrice, product.price)
    : 0;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, product.sizes[0], product.colors[0]?.name || "Default");
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  return (
    <div
      ref={cardRef}
      className="group"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
        transition: `all 0.5s ease-out ${index * 0.06}s`,
      }}
    >
      <Link href={`/products/${product.slug}`} className="block">
        {/* Image */}
        <div className="relative aspect-[3/4] bg-gray-50 mb-3 overflow-hidden rounded-sm">
          {imgError ? (
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <span className="text-gray-300 text-xs tracking-widest uppercase">
                Lotus Vogue
              </span>
            </div>
          ) : (
            <>
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover transition-all duration-700 ease-out"
                loading={index < 4 ? "eager" : "lazy"}
                onError={() => setImgError(true)}
                style={{
                  transform: isHovered && product.images[1] ? "scale(1.08)" : "scale(1)",
                }}
                onMouseEnter={() => {
                  if (product.images[1]) setIsHovered(true);
                }}
                onMouseLeave={() => setIsHovered(false)}
              />
              {product.images[1] && (
                <img
                  src={product.images[1]}
                  alt={`${product.name} alternate view`}
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out"
                  loading="lazy"
                  style={{
                    opacity: isHovered ? 1 : 0,
                    transform: isHovered ? "scale(1.08)" : "scale(1)",
                  }}
                />
              )}
            </>
          )}

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.isNew && (
              <span className="px-2 py-1 bg-white text-[9px] font-semibold tracking-wider uppercase shadow-sm animate-fade-in-down">
                New
              </span>
            )}
            {product.isSale && discount > 0 && (
              <span className="px-2 py-1 bg-[#1a1a1a] text-white text-[9px] font-semibold tracking-wider uppercase shadow-sm">
                -{discount}%
              </span>
            )}
          </div>

          {/* Quick actions - always visible on mobile, hover on desktop */}
          <div
            className={`absolute top-2 right-2 flex flex-col gap-1.5 transition-all duration-300 ${
              isMobile
                ? "opacity-100 translate-x-0"
                : "opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0"
            }`}
          >
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsWishlisted(!isWishlisted);
              }}
              className="touch-target w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-all shadow-sm active:scale-90"
              aria-label="Add to wishlist"
            >
              <Heart
                size={14}
                className={
                  isWishlisted ? "fill-red-400 text-red-400" : "text-gray-600"
                }
              />
            </button>
            <button
              className="touch-target w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-all shadow-sm active:scale-90"
              aria-label="Quick view"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                openQuickView(product);
              }}
            >
              <Eye size={14} className="text-gray-600" />
            </button>
          </div>

          {/* Quick add button - always visible on mobile */}
          <div
            className={`absolute bottom-0 left-0 right-0 p-2 transition-transform duration-300 ${
              isMobile ? "translate-y-0" : "translate-y-full group-hover:translate-y-0"
            }`}
          >
            <button
              onClick={handleQuickAdd}
              className={`w-full py-2.5 text-[10px] font-semibold tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-1.5 shadow-sm rounded-sm touch-target ${
                isAdded
                  ? "bg-green-600 text-white"
                  : "bg-[#1a1a1a]/90 backdrop-blur-sm text-white hover:bg-[#1a1a1a]"
              }`}
            >
              {isAdded ? (
                <>
                  <Check size={12} />
                  Added
                </>
              ) : (
                "Quick Add"
              )}
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="space-y-1 px-0.5">
          <p className="text-[10px] text-gray-400 tracking-[0.12em] uppercase font-medium">
            {product.category}
          </p>
          <h3 className="text-sm font-medium text-gray-900 truncate group-hover:text-brand-pink transition-colors duration-200">
            {product.name}
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-gray-900">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-gray-400 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          {/* Color swatches - scrollable on mobile */}
          {product.colors.length > 0 && (
            <div className="flex items-center gap-1 pt-0.5 overflow-x-auto scrollbar-none">
              {product.colors.slice(0, 4).map((color, i) => (
                <div
                  key={color.hex}
                  className="w-3 h-3 rounded-full border border-gray-200 ring-1 ring-white transition-transform duration-200 hover:scale-125 shrink-0"
                  style={{ backgroundColor: color.hex, zIndex: 4 - i }}
                  title={color.name}
                />
              ))}
              {product.colors.length > 4 && (
                <span className="text-[9px] text-gray-400 ml-0.5 font-medium shrink-0">
                  +{product.colors.length - 4}
                </span>
              )}
            </div>
          )}
        </div>
      </Link>

    </div>
  );
}
