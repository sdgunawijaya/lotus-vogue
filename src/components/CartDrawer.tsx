"use client";

import { useEffect } from "react";
import Link from "next/link";
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
} from "./Icons";

export default function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    subtotal,
    clearCart,
  } = useCart();

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
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

      {/* Drawer */}
      <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-brand-warm-white shadow-2xl cart-drawer flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-brand-pink-light/30">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} className="text-brand-pink" />
            <h2 className="text-lg font-medium text-brand-charcoal">
              Shopping Bag
            </h2>
            {items.length > 0 && (
              <span className="text-sm text-brand-charcoal/50">
                ({items.length} {items.length === 1 ? "item" : "items"})
              </span>
            )}
          </div>
          <button
            onClick={closeCart}
            className="p-2 hover:bg-brand-pink-light/30 rounded-full transition-colors"
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>

        {/* Free shipping bar */}
        {subtotal < shippingThreshold ? (
          <div className="px-6 py-3 bg-brand-soft-rose">
            <div className="flex items-center justify-between text-xs text-brand-charcoal/60 mb-2">
              <span>
                <Truck size={14} className="inline mr-1" />
                Add {formatPrice(remainingForFree)} more for free shipping
              </span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="w-full h-1.5 bg-white rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-brand-pink to-brand-gold rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        ) : (
          <div className="px-6 py-3 bg-green-50 text-green-700 text-xs flex items-center gap-2">
            <Truck size={14} />
            You qualify for free shipping!
          </div>
        )}

        {/* Cart items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-16 h-16 rounded-full bg-brand-pink-light/30 flex items-center justify-center mb-4">
                <ShoppingBag size={28} className="text-brand-pink/50" />
              </div>
              <p className="text-brand-charcoal/60 text-sm mb-2">
                Your bag is empty
              </p>
              <p className="text-brand-charcoal/40 text-xs mb-6">
                Looks like you haven&apos;t added anything yet
              </p>
              <button
                onClick={closeCart}
                className="btn-primary text-sm"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3 bg-white rounded-xl animate-scale-in"
                >
                  {/* Image */}
                  <div className="w-20 h-24 rounded-lg overflow-hidden bg-brand-cream flex-shrink-0">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-brand-charcoal truncate">
                          {item.product.name}
                        </h3>
                        <p className="text-xs text-brand-charcoal/50 mt-0.5">
                          {item.color} / {item.size}
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-1 hover:text-red-500 transition-colors flex-shrink-0"
                        aria-label="Remove item"
                      >
                        <Trash size={14} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity controls */}
                      <div className="flex items-center border border-brand-pink-light/40 rounded-lg">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="p-1.5 hover:text-brand-pink transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="px-3 text-xs font-medium min-w-[20px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="p-1.5 hover:text-brand-pink transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <span className="text-sm font-medium text-brand-pink-dark">
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
          <div className="border-t border-brand-pink-light/30 px-6 py-5 space-y-4">
            {/* Subtotal */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-brand-charcoal/60">Subtotal</span>
              <span className="text-lg font-medium text-brand-charcoal">
                {formatPrice(subtotal)}
              </span>
            </div>

            {/* Trust badges */}
            <div className="flex items-center justify-center gap-4 text-[11px] text-brand-charcoal/40">
              <span className="flex items-center gap-1">
                <Shield size={12} />
                Secure checkout
              </span>
              <span className="flex items-center gap-1">
                <Truck size={12} />
                Free shipping $100+
              </span>
            </div>

            {/* Actions */}
            <div className="space-y-2">
              <Link
                href="/cart"
                onClick={closeCart}
                className="btn-primary w-full justify-center text-sm"
              >
                View Cart & Checkout
                <ArrowRight size={16} />
              </Link>
              <button
                onClick={closeCart}
                className="w-full text-center text-xs text-brand-charcoal/50 hover:text-brand-pink transition-colors py-2"
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
