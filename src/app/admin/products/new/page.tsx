"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAdminData } from "@/context/AdminDataContext";
import { Plus, X, ArrowLeft } from "@/components/Icons";

const defaultColors = [
  { name: "Blush Pink", hex: "#E8A0BF" },
  { name: "Ivory", hex: "#FAF7F2" },
  { name: "Black", hex: "#1A1A1A" },
  { name: "Charcoal", hex: "#2D2D2D" },
  { name: "Gold", hex: "#C9A84C" },
  { name: "Sage", hex: "#B5C9B5" },
  { name: "Cream", hex: "#F5F0E8" },
];

const defaultSizes = ["XS", "S", "M", "L", "XL"];

interface ProductFormData {
  name: string;
  category: string;
  price: string;
  originalPrice: string;
  description: string;
  details: string[];
  sizes: string[];
  colors: { name: string; hex: string }[];
  images: string[];
  isNew: boolean;
  isSale: boolean;
  rating: string;
  reviewCount: string;
}

export default function NewProductPage() {
  const router = useRouter();
  const { categories, addProduct } = useAdminData();

  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    category: categories[0]?.slug || "",
    price: "",
    originalPrice: "",
    description: "",
    details: [""],
    sizes: ["S", "M", "L"],
    colors: [{ name: "Blush Pink", hex: "#E8A0BF" }],
    images: [""],
    isNew: false,
    isSale: false,
    rating: "4.5",
    reviewCount: "0",
  });
  const [saving, setSaving] = useState(false);

  const updateField = <K extends keyof ProductFormData>(
    key: K,
    value: ProductFormData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleDetailChange = (index: number, value: string) => {
    const newDetails = [...formData.details];
    newDetails[index] = value;
    updateField("details", newDetails);
  };

  const addDetail = () => {
    updateField("details", [...formData.details, ""]);
  };

  const removeDetail = (index: number) => {
    if (formData.details.length > 1) {
      updateField(
        "details",
        formData.details.filter((_, i) => i !== index)
      );
    }
  };

  const handleImageChange = (index: number, value: string) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    updateField("images", newImages);
  };

  const addImage = () => {
    updateField("images", [...formData.images, ""]);
  };

  const removeImage = (index: number) => {
    if (formData.images.length > 1) {
      updateField(
        "images",
        formData.images.filter((_, i) => i !== index)
      );
    }
  };

  const addColor = () => {
    const unused = defaultColors.find(
      (dc) => !formData.colors.some((c) => c.hex === dc.hex)
    );
    if (unused) {
      updateField("colors", [...formData.colors, unused]);
    } else {
      updateField("colors", [
        ...formData.colors,
        { name: "Custom", hex: "#CCCCCC" },
      ]);
    }
  };

  const removeColor = (index: number) => {
    if (formData.colors.length > 1) {
      updateField(
        "colors",
        formData.colors.filter((_, i) => i !== index)
      );
    }
  };

  const toggleSize = (size: string) => {
    if (formData.sizes.includes(size)) {
      if (formData.sizes.length > 1) {
        updateField(
          "sizes",
          formData.sizes.filter((s) => s !== size)
        );
      }
    } else {
      updateField("sizes", [...formData.sizes, size]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const product = addProduct({
        name: formData.name,
        category: formData.category,
        price: parseFloat(formData.price) || 0,
        originalPrice: formData.originalPrice
          ? parseFloat(formData.originalPrice)
          : undefined,
        description: formData.description,
        details: formData.details.filter((d) => d.trim()),
        sizes: formData.sizes,
        colors: formData.colors,
        images: formData.images.filter((img) => img.trim()),
        isNew: formData.isNew,
        isSale: formData.isSale,
        rating: parseFloat(formData.rating) || 0,
        reviewCount: parseInt(formData.reviewCount) || 0,
      });
      router.push(`/admin/products/${product.id}/edit`);
    } catch {
      setSaving(false);
    }
  };

  const hasUnsavedChanges =
    formData.name ||
    formData.price ||
    formData.description;

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/products"
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              New Product
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Add a new product to your catalog
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic info */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-5">
          <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
            Basic Information
          </h2>

          <div className="grid sm:grid-cols-2 gap-5">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Product Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => updateField("name", e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-accent transition-colors"
                placeholder="e.g., Lotus Floral Midi Dress"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => updateField("category", e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-accent bg-white"
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.slug}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Price ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  required
                  value={formData.price}
                  onChange={(e) => updateField("price", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-accent transition-colors"
                  placeholder="89.00"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Original Price ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.originalPrice}
                  onChange={(e) =>
                    updateField("originalPrice", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-accent transition-colors"
                  placeholder="129.00 (optional)"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Description
            </label>
            <textarea
              required
              rows={4}
              value={formData.description}
              onChange={(e) => updateField("description", e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-accent transition-colors resize-none"
              placeholder="Product description..."
            />
          </div>

          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isNew}
                onChange={(e) => updateField("isNew", e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-brand-accent focus:ring-brand-accent"
              />
              <span className="text-sm text-gray-700">New Arrival</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isSale}
                onChange={(e) => updateField("isSale", e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-brand-accent focus:ring-brand-accent"
              />
              <span className="text-sm text-gray-700">On Sale</span>
            </label>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Rating (1-5)
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="5"
                value={formData.rating}
                onChange={(e) => updateField("rating", e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-accent transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Review Count
              </label>
              <input
                type="number"
                min="0"
                value={formData.reviewCount}
                onChange={(e) => updateField("reviewCount", e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-accent transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
              Product Details
            </h2>
            <button
              type="button"
              onClick={addDetail}
              className="text-xs text-brand-accent hover:underline flex items-center gap-1"
            >
              <Plus size={12} />
              Add detail
            </button>
          </div>
          <div className="space-y-2">
            {formData.details.map((detail, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-gray-300">•</span>
                <input
                  type="text"
                  value={detail}
                  onChange={(e) => handleDetailChange(i, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-accent transition-colors"
                  placeholder="e.g., Flowing A-line silhouette"
                />
                {formData.details.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeDetail(i)}
                    className="p-1 text-gray-300 hover:text-red-500 transition-colors"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Sizes */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-4">
          <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
            Available Sizes
          </h2>
          <div className="flex flex-wrap gap-2">
            {defaultSizes.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => toggleSize(size)}
                className={`px-3 py-1.5 text-sm rounded-lg border transition-all ${
                  formData.sizes.includes(size)
                    ? "border-brand-accent bg-brand-accent text-white"
                    : "border-gray-200 text-gray-600 hover:border-gray-300"
                }`}
              >
                {size}
              </button>
            ))}
            <div className="flex items-center gap-1">
              <input
                type="text"
                placeholder="Custom"
                className="w-16 px-2 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-brand-accent"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    const val = (e.target as HTMLInputElement).value.trim();
                    if (val && !formData.sizes.includes(val)) {
                      updateField("sizes", [...formData.sizes, val]);
                      (e.target as HTMLInputElement).value = "";
                    }
                  }
                }}
              />
            </div>
          </div>
          <p className="text-xs text-gray-400">
            Click to toggle. Type a custom size and press Enter.
          </p>
        </div>

        {/* Colors */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
              Colors
            </h2>
            <button
              type="button"
              onClick={addColor}
              className="text-xs text-brand-accent hover:underline flex items-center gap-1"
            >
              <Plus size={12} />
              Add color
            </button>
          </div>
          <div className="flex flex-wrap gap-3">
            {formData.colors.map((color, i) => (
              <div
                key={i}
                className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2"
              >
                <div
                  className="w-5 h-5 rounded-full border border-white/50 shadow-sm"
                  style={{ backgroundColor: color.hex }}
                />
                <span className="text-sm text-gray-700">{color.name}</span>
                {formData.colors.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeColor(i)}
                    className="text-gray-300 hover:text-red-500 transition-colors"
                  >
                    <X size={12} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Images */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
              Images
            </h2>
            <button
              type="button"
              onClick={addImage}
              className="text-xs text-brand-accent hover:underline flex items-center gap-1"
            >
              <Plus size={12} />
              Add image
            </button>
          </div>
          <div className="space-y-3">
            {formData.images.map((img, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-14 h-16 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
                  {img ? (
                    <img
                      src={img}
                      alt={`Image ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300 text-[10px]">
                      No img
                    </div>
                  )}
                </div>
                <input
                  type="url"
                  value={img}
                  onChange={(e) => handleImageChange(i, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-accent transition-colors"
                  placeholder="https://images.unsplash.com/..."
                />
                {formData.images.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeImage(i)}
                    className="p-1 text-gray-300 hover:text-red-500 transition-colors"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pb-8">
          <Link
            href="/admin/products"
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={saving || !formData.name || !formData.price}
            className="group relative px-6 py-2 text-sm font-medium rounded-lg overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          >
            <span className="absolute inset-0 bg-brand-accent transition-colors duration-300 group-hover:bg-brand-accent-dark" />
            <span className="relative z-10 text-white">{saving ? "Creating..." : "Create Product"}</span>
            <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-gold-shimmer" />
            </span>
          </button>
        </div>
      </form>
    </div>
  );
}
