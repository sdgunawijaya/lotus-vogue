"use client";

import { useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import {
  X,
  Minus,
  Plus,
  Trash,
  ShoppingBag,
  ArrowRight,
  Truck,
  Shield,
  RefreshCw,
} from "./Icons";

export default function CartDrawer() {
  const pathname = usePathname();
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    subtotal,
  } = useCart();
  const drawerRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef(0);
  const touchDeltaY = useRef(0);
  const isDragging = useRef(false);

  if (pathname.startsWith("/admin")) return null;

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // ESC key to close
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [closeCart]);

  // Swipe down to dismiss (mobile)
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (window.innerWidth < 768) {
      touchStartY.current = e.touches[0].clientY;
      isDragging.current = true;
      touchDeltaY.current = 0;
    }
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging.current) return;
    touchDeltaY.current = e.touches[0].clientY - touchStartY.current;
    if (touchDeltaY.current > 0 && drawerRef.current) {
      drawerRef.current.style.transform = `translateY(${Math.min(
        touchDeltaY.current,
        200
      )}px)`;
      drawerRef.current.style.transition = "none";
    }
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;
    if (touchDeltaY.current > 100) {
      closeCart();
    } else if (drawerRef.current) {
      drawerRef.current.style.transform = "";
      drawerRef.current.style.transition = "";
    }
    touchDeltaY.current = 0;
  }, [closeCart]);

  const shippingThreshold = 100;
  const remainingForFree = shippingThreshold - subtotal;
  const progress = Math.min((subtotal / shippingThreshold) * 100, 100);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60]">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/30 cart-overlay"
        onClick={closeCart}
      />

      {/* Drawer - full-screen mobile, side drawer desktop */}
      <div
        ref={drawerRef}
        className="absolute right-0 top-0 bottom-0 w-full sm:max-w-md bg-white shadow-2xl cart-drawer flex flex-col safe-top safe-bottom"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Drag handle (mobile) */}
        <div className="sm:hidden flex justify-center pt-2 pb-1">
          <div className="w-10 h-1 bg-gray-300 rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <ShoppingBag size={18} className="text-gray-900" />
            <h2 className="text-sm font-medium text-gray-900">
              Shopping Bag
            </h2>
            {items.length > 0 && (
              <span className="text-xs text-gray-400">
                ({items.length} {items.length === 1 ? "item" : "items"})
              </span>
            )}
          </div>
          <button
            onClick={closeCart}
            className="touch-target text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-50"
            aria-label="Close cart"
          >
            <X size={18} />
          </button>
        </div>

        {/* Free shipping bar */}
        {subtotal < shippingThreshold ? (
          <div className="px-5 py-3 bg-gray-50 border-b border-gray-100">
            <div className="flex items-center justify-between text-xs text-gray-500 mb-1.5">
              <span className="flex items-center gap-1">
                <Truck size={14} />
                <span className="hidden xs:inline">Add </span>
                {formatPrice(remainingForFree)}
                <span className="hidden xs:inline"> more</span> for free shipping
              </span>
              <span className="font-medium">{formatPrice(subtotal)}</span>
            </div>
            <div className="w-full h-1.5 bg-gray-200 overflow-hidden rounded-full">
              <div
                className="h-full bg-[#1a1a1a] transition-all duration-500 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        ) : (
          <div className="px-5 py-3 bg-green-50 text-green-700 text-xs flex items-center gap-1.5 border-b border-gray-100">
            <Truck size={14} />
            <span className="font-medium">You qualify for free shipping!</span>
          </div>
        )}

        {/* Cart items */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="empty-state h-full">
              <div className="empty-state-icon">
                <ShoppingBag size={24} className="text-gray-400" />
              </div>
              <p className="text-sm text-gray-500 mb-1">Your bag is empty</p>
              <p className="text-xs text-gray-400 mb-6">
                Looks like you haven&apos;t added anything yet
              </p>
              <button
                onClick={closeCart}
                className="btn-primary text-sm touch-target"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 p-3 bg-gray-50 rounded-sm animate-fade-in"
                >
                  {/* Image */}
                  <div className="w-20 h-24 md:w-24 md:h-28 bg-gray-100 overflow-hidden flex-shrink-0 rounded-sm">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <h3 className="text-sm font-medium text-gray-900 truncate">
                          {item.product.name}
                        </h3>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {item.color} / {item.size}
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="touch-target text-gray-300 hover:text-red-500 transition-colors flex-shrink-0 rounded-lg hover:bg-red-50"
                        aria-label={`Remove ${item.product.name} from cart`}
                      >
                        <Trash size={14} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      {/* Quantity selector - larger touch targets */}
                      <div className="flex items-center border border-gray-200 rounded-sm">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          disabled={item.quantity <= 1}
                          className="touch-target p-1.5 hover:bg-gray-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-8 text-center text-xs font-medium min-w-[24px]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="touch-target p-1.5 hover:bg-gray-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                          aria-label="Increase quantity"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <span className="text-sm font-semibold text-gray-900">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-100 px-5 py-4 space-y-3 bg-white safe-bottom">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Subtotal</span>
              <span className="text-base font-semibold text-gray-900">
                {formatPrice(subtotal)}
              </span>
            </div>

            {/* Trust badges - scrollable on mobile */}
            <div className="flex items-center justify-center gap-3 md:gap-4 text-[10px] text-gray-400 overflow-x-auto scrollbar-none py-1">
              <span className="flex items-center gap-1 whitespace-nowrap">
                <Shield size={12} />
                Secure checkout
              </span>
              <span className="flex items-center gap-1 whitespace-nowrap">
                <Truck size={12} />
                Free ship $100+
              </span>
              <span className="flex items-center gap-1 whitespace-nowrap">
                <RefreshCw size={12} />
                30-day returns
              </span>
            </div>

            <div className="space-y-2">
              <Link
                href="/cart"
                onClick={closeCart}
                className="btn-primary w-full justify-center text-sm py-3"
              >
                View Cart & Checkout
                <ArrowRight size={14} />
              </Link>
              <button
                onClick={closeCart}
                className="w-full text-center text-sm text-gray-400 hover:text-gray-600 transition-colors py-3 touch-target"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
