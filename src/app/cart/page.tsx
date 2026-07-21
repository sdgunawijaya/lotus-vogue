"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import {
  Minus,
  Plus,
  Trash,
  ShoppingBag,
  ArrowLeft,
  ArrowRight,
  Shield,
  Truck,
  RefreshCw,
} from "@/components/Icons";

export default function CartPage() {
  const {
    items,
    removeItem,
    updateQuantity,
    subtotal,
    clearCart,
  } = useCart();

  const shipping = subtotal >= 100 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;
  const shippingProgress = Math.min((subtotal / 100) * 100, 100);
  const remainingForFree = 100 - subtotal;

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <div className="w-20 h-20 rounded-full bg-brand-pink-light/30 flex items-center justify-center mb-6">
          <ShoppingBag size={36} className="text-brand-pink/50" />
        </div>
        <h1 className="text-2xl font-light text-brand-charcoal mb-2">
          Your Bag is Empty
        </h1>
        <p className="text-brand-charcoal/60 text-sm mb-8 max-w-sm">
          Looks like you haven&apos;t found your perfect piece yet. Explore our
          collection and discover something beautiful.
        </p>
        <Link
          href="/products"
          className="btn-primary group"
        >
          <ArrowLeft size={18} />
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-warm-white">
      {/* Header */}
      <div className="bg-white border-b border-brand-pink-light/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-light text-brand-charcoal">
                Shopping Bag
              </h1>
              <p className="text-sm text-brand-charcoal/50 mt-1">
                {items.length} {items.length === 1 ? "item" : "items"}
              </p>
            </div>
            <Link
              href="/products"
              className="hidden sm:flex items-center gap-2 text-sm text-brand-charcoal/60 hover:text-brand-pink transition-colors"
            >
              <ArrowLeft size={16} />
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart items */}
          <div className="lg:col-span-2 space-y-4">
            {/* Free shipping progress */}
            <div className="bg-white rounded-xl p-4 border border-brand-pink-light/20">
              {subtotal < 100 ? (
                <div>
                  <div className="flex items-center justify-between text-sm text-brand-charcoal/60 mb-2">
                    <span className="flex items-center gap-1.5">
                      <Truck size={16} className="text-brand-pink" />
                      Add {formatPrice(remainingForFree)} more for free shipping
                    </span>
                    <span className="text-brand-pink-dark font-medium">
                      {formatPrice(subtotal)}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-brand-pink-light/20 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-brand-pink to-brand-gold rounded-full transition-all duration-500"
                      style={{ width: `${shippingProgress}%` }}
                    />
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-green-600 text-sm">
                  <Truck size={16} />
                  You&apos;ve earned free shipping!
                </div>
              )}
            </div>

            {/* Items */}
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl p-4 border border-brand-pink-light/20 flex gap-4 animate-fade-in"
              >
                {/* Image */}
                <Link
                  href={`/products/${item.product.slug}`}
                  className="w-24 h-28 md:w-28 md:h-32 rounded-lg overflow-hidden bg-brand-cream flex-shrink-0"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </Link>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <Link
                        href={`/products/${item.product.slug}`}
                        className="text-sm font-medium text-brand-charcoal hover:text-brand-pink transition-colors"
                      >
                        {item.product.name}
                      </Link>
                      <p className="text-xs text-brand-charcoal/50 mt-0.5">
                        {item.color} / {item.size}
                      </p>
                    </div>
                    <span className="text-sm font-medium text-brand-pink-dark whitespace-nowrap ml-4">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    {/* Quantity */}
                    <div className="flex items-center border border-brand-pink-light/30 rounded-lg overflow-hidden">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="p-2 hover:bg-brand-pink-light/20 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="px-4 text-sm font-medium min-w-[30px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="p-2 hover:bg-brand-pink-light/20 transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="flex items-center gap-1.5 text-xs text-brand-charcoal/40 hover:text-red-500 transition-colors"
                    >
                      <Trash size={14} />
                      Remove
                    </button>
                  </div>

                  {/* Unit price */}
                  <p className="text-xs text-brand-charcoal/40 mt-2">
                    {formatPrice(item.product.price)} each
                  </p>
                </div>
              </div>
            ))}

            {/* Clear cart */}
            <div className="flex justify-end">
              <button
                onClick={clearCart}
                className="flex items-center gap-1.5 text-xs text-brand-charcoal/40 hover:text-red-500 transition-colors"
              >
                <Trash size={14} />
                Clear Bag
              </button>
            </div>
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 border border-brand-pink-light/20 sticky top-[88px]">
              <h2 className="text-lg font-medium text-brand-charcoal mb-6">
                Order Summary
              </h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-brand-charcoal/70">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-brand-charcoal/70">
                  <span>Shipping</span>
                  <span>
                    {shipping === 0 ? (
                      <span className="text-green-600">Free</span>
                    ) : (
                      formatPrice(shipping)
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-brand-charcoal/70">
                  <span>Estimated Tax</span>
                  <span>{formatPrice(tax)}</span>
                </div>
                <div className="border-t border-brand-pink-light/20 pt-3">
                  <div className="flex justify-between font-medium text-brand-charcoal">
                    <span>Total</span>
                    <span className="text-lg text-brand-pink-dark">
                      {formatPrice(total)}
                    </span>
                  </div>
                </div>
              </div>

              <button className="btn-primary w-full justify-center mt-6 mb-3">
                Checkout
                <ArrowRight size={18} />
              </button>

              {/* Trust badges */}
              <div className="space-y-2 mt-4 pt-4 border-t border-brand-pink-light/20">
                <div className="flex items-center gap-2 text-xs text-brand-charcoal/50">
                  <Shield size={14} className="text-brand-pink" />
                  Secure checkout with SSL encryption
                </div>
                <div className="flex items-center gap-2 text-xs text-brand-charcoal/50">
                  <RefreshCw size={14} className="text-brand-pink" />
                  Free 30-day returns
                </div>
              </div>

              {/* Payment methods */}
              <div className="mt-4 pt-4 border-t border-brand-pink-light/20">
                <p className="text-xs text-brand-charcoal/40 text-center mb-3">
                  We accept
                </p>
                <div className="flex justify-center gap-3">
                  {["Visa", "MC", "Amex", "PayPal", "Apple"].map((method) => (
                    <span
                      key={method}
                      className="text-[10px] px-2 py-1 bg-brand-charcoal/5 rounded text-brand-charcoal/40 font-medium"
                    >
                      {method}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
