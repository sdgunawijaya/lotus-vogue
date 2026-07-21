"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Product } from "@/data/products";
import { formatPrice, calculateDiscount } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { ShoppingBag, Heart, Star, Eye } from "./Icons";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const router = useRouter();
  const { addItem, openCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const discount = product.originalPrice
    ? calculateDiscount(product.originalPrice, product.price)
    : 0;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, product.sizes[0], product.colors[0].name);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  return (
    <div
      className="product-card group"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <Link href={`/products/${product.slug}`} className="block">
        {/* Image */}
        <div className="product-image-wrapper relative aspect-[3/4] rounded-xl overflow-hidden bg-brand-cream mb-3">
          {imgError ? (
            <div className="w-full h-full flex items-center justify-center bg-brand-pink-light/20">
              <span className="text-brand-pink/40 text-sm">Lotus Vogue</span>
            </div>
          ) : (
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover"
              loading="lazy"
              onError={() => setImgError(true)}
              onMouseEnter={() => {
                if (product.images[1]) {
                  setIsHovered(true);
                }
              }}
              onMouseLeave={() => setIsHovered(false)}
              style={{
                transform: isHovered ? "scale(1.08)" : "scale(1)",
              }}
            />
          )}

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.isNew && (
              <span className="px-2.5 py-1 bg-white/90 backdrop-blur-sm text-brand-charcoal text-[10px] font-medium tracking-wider rounded-full">
                NEW
              </span>
            )}
            {product.isSale && discount > 0 && (
              <span className="px-2.5 py-1 bg-brand-pink text-white text-[10px] font-medium tracking-wider rounded-full">
                -{discount}%
              </span>
            )}
          </div>

          {/* Quick actions */}
          <div className="absolute top-3 right-3 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
            <button
              className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-brand-pink hover:text-white transition-all"
              aria-label="Add to wishlist"
              onClick={(e) => e.preventDefault()}
            >
              <Heart size={14} />
            </button>
            <button
              className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-brand-pink hover:text-white transition-all"
              aria-label="Quick view"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                router.push(`/products/${product.slug}`);
              }}
            >
              <Eye size={14} />
            </button>
          </div>

          {/* Quick add button */}
          <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <button
              onClick={handleQuickAdd}
              className={`w-full py-2.5 text-xs font-medium rounded-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                isAdded
                  ? "bg-green-500 text-white"
                  : "bg-brand-charcoal text-white hover:bg-brand-pink"
              }`}
            >
              {isAdded ? (
                <>✦ Added to Bag</>
              ) : (
                <>
                  <ShoppingBag size={14} />
                  Quick Add
                </>
              )}
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="space-y-1 px-0.5">
          <div className="flex items-center gap-2">
            <p className="text-[11px] text-brand-charcoal/40 tracking-wider uppercase">
              {product.category}
            </p>
            <div className="flex items-center gap-1">
              <Star size={10} className="text-brand-gold fill-brand-gold" />
              <span className="text-[11px] text-brand-charcoal/50">
                {product.rating}
              </span>
            </div>
          </div>
          <h3 className="text-sm font-medium text-brand-charcoal truncate">
            {product.name}
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-brand-pink-dark">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-brand-charcoal/40 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Color swatches */}
          <div className="flex items-center gap-1.5 pt-1">
            {product.colors.slice(0, 4).map((color) => (
              <div
                key={color.hex}
                className="w-3.5 h-3.5 rounded-full border border-white/50 shadow-sm"
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
            {product.colors.length > 4 && (
              <span className="text-[10px] text-brand-charcoal/40">
                +{product.colors.length - 4}
              </span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
