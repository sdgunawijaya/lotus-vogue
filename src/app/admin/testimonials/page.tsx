"use client";

import { useState } from "react";
import { useAdminData } from "@/context/AdminDataContext";
import {
  Plus,
  Trash,
  Edit,
  Star,
  X,
  Check,
  AlertCircle,
} from "@/components/Icons";

export default function AdminTestimonialsPage() {
  const { testimonials, addTestimonial, updateTestimonial, deleteTestimonial } =
    useAdminData();
  const [isAdding, setIsAdding] = useState(false);
  const [editing, setEditing] = useState<number | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    avatar: "",
    text: "",
    rating: 5,
  });

  const handleAdd = () => {
    if (!formData.name.trim() || !formData.text.trim()) return;
    addTestimonial({
      name: formData.name,
      location: formData.location,
      avatar: formData.avatar || formData.name.substring(0, 2).toUpperCase(),
      text: formData.text,
      rating: formData.rating,
    });
    setFormData({ name: "", location: "", avatar: "", text: "", rating: 5 });
    setIsAdding(false);
  };

  const startEdit = (id: number) => {
    const t = testimonials.find((t) => t.id === id);
    if (t) {
      setFormData({
        name: t.name,
        location: t.location,
        avatar: t.avatar,
        text: t.text,
        rating: t.rating,
      });
      setEditing(id);
    }
  };

  const handleUpdate = () => {
    if (editing === null) return;
    updateTestimonial(editing, {
      name: formData.name,
      location: formData.location,
      avatar: formData.avatar || formData.name.substring(0, 2).toUpperCase(),
      text: formData.text,
      rating: formData.rating,
    });
    setEditing(null);
    setFormData({ name: "", location: "", avatar: "", text: "", rating: 5 });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Testimonials</h1>
          <p className="text-sm text-gray-500 mt-1">
            {testimonials.length} testimonials
          </p>
        </div>
        {!isAdding && editing === null && (
          <button
            onClick={() => setIsAdding(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-brand-pink text-white text-sm font-medium rounded-lg hover:bg-brand-pink-dark transition-colors"
          >
            <Plus size={16} />
            Add Testimonial
          </button>
        )}
      </div>

      {/* Add/Edit Form */}
      {(isAdding || editing !== null) && (
        <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-4">
          <h2 className="text-sm font-semibold text-gray-900">
            {editing !== null ? "Edit Testimonial" : "New Testimonial"}
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-pink"
                placeholder="Customer name"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-pink"
                placeholder="e.g., New York, NY"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Testimonial
            </label>
            <textarea
              rows={3}
              value={formData.text}
              onChange={(e) =>
                setFormData({ ...formData, text: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-pink resize-none"
              placeholder="What they said..."
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Rating (1-5)
            </label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setFormData({ ...formData, rating: star })}
                  className="focus:outline-none"
                >
                  <Star
                    size={20}
                    className={
                      star <= formData.rating
                        ? "text-brand-gold fill-brand-gold"
                        : "text-gray-200"
                    }
                  />
                </button>
              ))}
              <span className="text-sm text-gray-500 ml-2">
                {formData.rating}/5
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 justify-end">
            <button
              onClick={() => {
                setIsAdding(false);
                setEditing(null);
                setFormData({
                  name: "",
                  location: "",
                  avatar: "",
                  text: "",
                  rating: 5,
                });
              }}
              className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              onClick={editing !== null ? handleUpdate : handleAdd}
              disabled={!formData.name.trim() || !formData.text.trim()}
              className="px-4 py-1.5 bg-brand-pink text-white text-sm font-medium rounded-lg hover:bg-brand-pink-dark disabled:opacity-50"
            >
              {editing !== null ? "Update" : "Add"}
            </button>
          </div>
        </div>
      )}

      {/* Testimonials list */}
      <div className="space-y-4">
        {testimonials.map((t) => (
          <div
            key={t.id}
            className="bg-white rounded-xl border border-gray-100 p-5"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-pink-light/40 flex items-center justify-center text-brand-pink-dark text-sm font-medium">
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {t.name}
                  </p>
                  <p className="text-xs text-gray-500">{t.location}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {editing === t.id ? null : (
                  <>
                    <button
                      onClick={() => startEdit(t.id)}
                      className="p-1.5 text-gray-400 hover:text-brand-pink transition-colors"
                    >
                      <Edit size={14} />
                    </button>
                    {confirmDelete === t.id ? (
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => {
                            deleteTestimonial(t.id);
                            setConfirmDelete(null);
                          }}
                          className="p-1 text-red-500 hover:bg-red-50 rounded text-xs"
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => setConfirmDelete(null)}
                          className="p-1 text-gray-400"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setConfirmDelete(t.id)}
                        className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash size={14} />
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Stars */}
            <div className="flex items-center gap-0.5 mt-3">
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className="text-brand-gold fill-brand-gold"
                />
              ))}
            </div>

            <p className="text-sm text-gray-600 mt-2 leading-relaxed">
              &ldquo;{t.text}&rdquo;
            </p>
          </div>
        ))}
      </div>

      {testimonials.length === 0 && (
        <div className="text-center py-12">
          <AlertCircle size={32} className="mx-auto text-gray-300 mb-3" />
          <p className="text-sm text-gray-500">No testimonials yet.</p>
        </div>
      )}
    </div>
  );
}
