"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useAdminData } from "@/context/AdminDataContext";
import { Plus, X, ArrowLeft } from "@/components/Icons";

const defaultSizes = ["XS", "S", "M", "L", "XL"];

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();
  const { products, categories, updateProduct, deleteProduct } = useAdminData();
  const product = products.find((p) => p.id === params.id);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    originalPrice: "",
    description: "",
    details: [""],
    sizes: [""],
    colors: [{ name: "", hex: "" }],
    images: [""],
    isNew: false,
    isSale: false,
    rating: "",
    reviewCount: "",
  });
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        category: product.category,
        price: product.price.toString(),
        originalPrice: product.originalPrice?.toString() || "",
        description: product.description,
        details: [...product.details],
        sizes: [...product.sizes],
        colors: product.colors.map((c) => ({ ...c })),
        images: [...product.images],
        isNew: product.isNew || false,
        isSale: product.isSale || false,
        rating: product.rating.toString(),
        reviewCount: product.reviewCount.toString(),
      });
    }
  }, [product]);

  if (!product) {
    return (
      <div className="text-center py-20">
        <h2 className="text-lg font-medium text-gray-900 mb-2">
          Product Not Found
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          The product you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          href="/admin/products"
          className="text-sm text-brand-pink hover:underline"
        >
          ← Back to products
        </Link>
      </div>
    );
  }

  const updateField = (key: string, value: any) => {
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
      updateField("details", formData.details.filter((_, i) => i !== index));
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
      updateField("images", formData.images.filter((_, i) => i !== index));
    }
  };

  const toggleSize = (size: string) => {
    if (formData.sizes.includes(size)) {
      if (formData.sizes.length > 1) {
        updateField("sizes", formData.sizes.filter((s) => s !== size));
      }
    } else {
      updateField("sizes", [...formData.sizes, size]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      updateProduct(product.id, {
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
      router.push("/admin/products");
    } catch {
      setSaving(false);
    }
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setDeleting(true);
      deleteProduct(product.id);
      router.push("/admin/products");
    }
  };

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
              Edit Product
            </h1>
            <p className="text-sm text-gray-500 mt-1">{product.name}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href={`/products/${product.slug}`}
            target="_blank"
            className="text-xs text-gray-400 hover:text-brand-pink transition-colors"
          >
            Preview on site →
          </Link>
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="px-3 py-1.5 text-xs text-red-500 hover:bg-red-50 rounded-lg transition-colors"
          >
            {deleting ? "Deleting..." : "Delete"}
          </button>
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
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-pink transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => updateField("category", e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-pink bg-white"
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
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-pink transition-colors"
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
                  onChange={(e) => updateField("originalPrice", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-pink transition-colors"
                  placeholder="Optional"
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
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-pink transition-colors resize-none"
            />
          </div>

          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isNew}
                onChange={(e) => updateField("isNew", e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-brand-pink focus:ring-brand-pink"
              />
              <span className="text-sm text-gray-700">New Arrival</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isSale}
                onChange={(e) => updateField("isSale", e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-brand-pink focus:ring-brand-pink"
              />
              <span className="text-sm text-gray-700">On Sale</span>
            </label>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Rating
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="5"
                value={formData.rating}
                onChange={(e) => updateField("rating", e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-pink transition-colors"
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
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-pink transition-colors"
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
              className="text-xs text-brand-pink hover:underline flex items-center gap-1"
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
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-pink transition-colors"
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
            Sizes
          </h2>
          <div className="flex flex-wrap gap-2">
            {defaultSizes.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => toggleSize(size)}
                className={`px-3 py-1.5 text-sm rounded-lg border transition-all ${
                  formData.sizes.includes(size)
                    ? "border-brand-pink bg-brand-pink text-white"
                    : "border-gray-200 text-gray-600 hover:border-gray-300"
                }`}
              >
                {size}
              </button>
            ))}
            <input
              type="text"
              placeholder="+Custom"
              className="w-20 px-2 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-brand-pink"
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

        {/* Colors */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-4">
          <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
            Colors
          </h2>
          <div className="space-y-2">
            {formData.colors.map((color, i) => (
              <div key={i} className="flex items-center gap-2">
                <input
                  type="color"
                  value={color.hex}
                  onChange={(e) => {
                    const newColors = [...formData.colors];
                    newColors[i] = { ...newColors[i], hex: e.target.value };
                    updateField("colors", newColors);
                  }}
                  className="w-8 h-8 rounded cursor-pointer border border-gray-200"
                />
                <input
                  type="text"
                  value={color.name}
                  onChange={(e) => {
                    const newColors = [...formData.colors];
                    newColors[i] = { ...newColors[i], name: e.target.value };
                    updateField("colors", newColors);
                  }}
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-pink"
                  placeholder="Color name"
                />
                {formData.colors.length > 1 && (
                  <button
                    type="button"
                    onClick={() => {
                      if (formData.colors.length > 1) {
                        updateField(
                          "colors",
                          formData.colors.filter((_, idx) => idx !== i)
                        );
                      }
                    }}
                    className="p-1 text-gray-300 hover:text-red-500"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                updateField("colors", [
                  ...formData.colors,
                  { name: "", hex: "#CCCCCC" },
                ])
              }
              className="text-xs text-brand-pink hover:underline flex items-center gap-1 mt-2"
            >
              <Plus size={12} />
              Add color
            </button>
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
              className="text-xs text-brand-pink hover:underline flex items-center gap-1"
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
                    <img src={img} alt="" className="w-full h-full object-cover" />
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
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-pink"
                  placeholder="Image URL"
                />
                {formData.images.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeImage(i)}
                    className="p-1 text-gray-300 hover:text-red-500"
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
            disabled={saving}
            className="px-6 py-2 bg-brand-pink text-white text-sm font-medium rounded-lg hover:bg-brand-pink-dark disabled:opacity-50 transition-colors"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
