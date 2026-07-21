"use client";

import { useAdminData } from "@/context/AdminDataContext";
import Link from "next/link";
import {
  ShoppingBag,
  Folder,
  MessageSquare,
  TrendingUp,
  DollarSign,
  Package,
  AlertCircle,
  ArrowRight,
  Star,
} from "@/components/Icons";
import { formatPrice } from "@/lib/utils";

export default function AdminDashboard() {
  const { products, categories, testimonials, featuredProducts, saleProducts } =
    useAdminData();

  const totalRevenue = products.reduce((sum, p) => sum + p.price, 0);
  const avgPrice = products.length > 0 ? totalRevenue / products.length : 0;
  const outOfSizes = products.filter(
    (p) => p.sizes.length === 0 || (p.sizes.length === 1 && p.sizes[0] === "One Size")
  );

  const stats = [
    {
      label: "Total Products",
      value: products.length,
      icon: ShoppingBag,
      color: "bg-pink-100 text-pink-600",
      href: "/admin/products",
    },
    {
      label: "Categories",
      value: categories.length,
      icon: Folder,
      color: "bg-amber-100 text-amber-600",
      href: "/admin/categories",
    },
    {
      label: "Testimonials",
      value: testimonials.length,
      icon: MessageSquare,
      color: "bg-green-100 text-green-600",
      href: "/admin/testimonials",
    },
    {
      label: "Avg. Price",
      value: formatPrice(avgPrice),
      icon: DollarSign,
      color: "bg-blue-100 text-blue-600",
      href: "/admin/products",
    },
  ];

  const recentProducts = [...products]
    .reverse()
    .slice(0, 5);

  const topRated = [...products]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">
          Overview of your store
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="bg-white rounded-xl p-5 border border-gray-100 hover:shadow-md transition-shadow group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center`}>
                <stat.icon size={20} />
              </div>
              <ArrowRight
                size={16}
                className="text-gray-300 group-hover:text-gray-500 transition-colors"
              />
            </div>
            <p className="text-2xl font-semibold text-gray-900">
              {stat.value}
            </p>
            <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div className="flex flex-wrap gap-3">
        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-brand-pink text-white text-sm font-medium rounded-lg hover:bg-brand-pink-dark transition-colors"
        >
          <ShoppingBag size={16} />
          Add Product
        </Link>
        <Link
          href="/admin/categories"
          className="inline-flex items-center gap-2 px-4 py-2 bg-brand-gold text-white text-sm font-medium rounded-lg hover:bg-brand-gold-dark transition-colors"
        >
          <Folder size={16} />
          Manage Categories
        </Link>
        <Link
          href="/admin/design"
          className="inline-flex items-center gap-2 px-4 py-2 bg-white text-gray-700 text-sm font-medium rounded-lg border border-gray-200 hover:border-brand-pink transition-colors"
        >
          <TrendingUp size={16} />
          Customize Design
        </Link>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent products */}
        <div className="bg-white rounded-xl border border-gray-100">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <h2 className="text-sm font-semibold text-gray-900">
              Recent Products
            </h2>
            <Link
              href="/admin/products"
              className="text-xs text-brand-pink hover:underline"
            >
              View all
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {recentProducts.map((product) => (
              <Link
                key={product.id}
                href={`/admin/products/${product.id}/edit`}
                className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50 transition-colors"
              >
                <div className="w-10 h-12 rounded-lg bg-brand-cream overflow-hidden flex-shrink-0">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {product.name}
                  </p>
                  <p className="text-xs text-gray-500 capitalize">
                    {product.category}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-brand-pink-dark">
                    {formatPrice(product.price)}
                  </p>
                  {product.isNew && (
                    <span className="text-[10px] text-green-600 font-medium">
                      New
                    </span>
                  )}
                </div>
              </Link>
            ))}
            {recentProducts.length === 0 && (
              <p className="px-5 py-8 text-sm text-gray-400 text-center">
                No products yet.
              </p>
            )}
          </div>
        </div>

        {/* Top rated */}
        <div className="bg-white rounded-xl border border-gray-100">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <h2 className="text-sm font-semibold text-gray-900">
              Top Rated
            </h2>
          </div>
          <div className="divide-y divide-gray-50">
            {topRated.map((product) => (
              <div
                key={product.id}
                className="flex items-center gap-3 px-5 py-3"
              >
                <div className="w-10 h-12 rounded-lg bg-brand-cream overflow-hidden flex-shrink-0">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {product.name}
                  </p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Star size={12} className="text-brand-gold fill-brand-gold" />
                    <span className="text-xs text-gray-500">
                      {product.rating} ({product.reviewCount} reviews)
                    </span>
                  </div>
                </div>
                <span className="text-sm font-medium text-brand-pink-dark">
                  {formatPrice(product.price)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <p className="text-xs text-gray-500 mb-1">New Arrivals</p>
          <p className="text-lg font-semibold text-gray-900">
            {featuredProducts.length}
          </p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <p className="text-xs text-gray-500 mb-1">Sale Items</p>
          <p className="text-lg font-semibold text-gray-900">
            {saleProducts.length}
          </p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <p className="text-xs text-gray-500 mb-1">Total Revenue (est.)</p>
          <p className="text-lg font-semibold text-gray-900">
            {formatPrice(totalRevenue)}
          </p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <p className="text-xs text-gray-500 mb-1">Products on Sale</p>
          <p className="text-lg font-semibold text-gray-900">
            {products.filter((p) => p.isSale).length}
          </p>
        </div>
      </div>
    </div>
  );
}
