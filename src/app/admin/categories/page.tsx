"use client";

import { useState } from "react";
import { useAdminData } from "@/context/AdminDataContext";
import { Plus, Trash, Edit, X, Check, AlertCircle } from "@/components/Icons";

interface EditingCategory {
  id: string;
  name: string;
  description: string;
  image: string;
}

export default function AdminCategoriesPage() {
  const { categories, addCategory, updateCategory, deleteCategory } =
    useAdminData();
  const [editing, setEditing] = useState<EditingCategory | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
    image: "",
  });
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const handleAdd = () => {
    if (!newCategory.name.trim()) return;
    addCategory({
      name: newCategory.name,
      description: newCategory.description,
      image:
        newCategory.image ||
        "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&q=80",
      itemCount: 0,
    });
    setNewCategory({ name: "", description: "", image: "" });
    setIsAdding(false);
  };

  const handleUpdate = () => {
    if (!editing || !editing.name.trim()) return;
    updateCategory(editing.id, {
      name: editing.name,
      description: editing.description,
      image: editing.image,
    });
    setEditing(null);
  };

  const handleDelete = (id: string) => {
    deleteCategory(id);
    setConfirmDelete(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Categories</h1>
          <p className="text-sm text-gray-500 mt-1">
            {categories.length} categories
          </p>
        </div>
        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-brand-pink text-white text-sm font-medium rounded-lg hover:bg-brand-pink-dark transition-colors"
          >
            <Plus size={16} />
            Add Category
          </button>
        )}
      </div>

      {/* Add form */}
      {isAdding && (
        <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-4">
          <h2 className="text-sm font-semibold text-gray-900">New Category</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Name
              </label>
              <input
                type="text"
                value={newCategory.name}
                onChange={(e) =>
                  setNewCategory({ ...newCategory, name: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-pink"
                placeholder="Category name"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Description
              </label>
              <input
                type="text"
                value={newCategory.description}
                onChange={(e) =>
                  setNewCategory({
                    ...newCategory,
                    description: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-pink"
                placeholder="Short description"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Image URL
              </label>
              <input
                type="url"
                value={newCategory.image}
                onChange={(e) =>
                  setNewCategory({ ...newCategory, image: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-pink"
                placeholder="Image URL (optional)"
              />
            </div>
          </div>
          <div className="flex items-center gap-2 justify-end">
            <button
              onClick={() => {
                setIsAdding(false);
                setNewCategory({ name: "", description: "", image: "" });
              }}
              className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              onClick={handleAdd}
              disabled={!newCategory.name.trim()}
              className="px-4 py-1.5 bg-brand-pink text-white text-sm font-medium rounded-lg hover:bg-brand-pink-dark disabled:opacity-50"
            >
              Add
            </button>
          </div>
        </div>
      )}

      {/* Categories grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="bg-white rounded-xl border border-gray-100 overflow-hidden group"
          >
            {/* Image */}
            <div className="aspect-[3/2] bg-gray-100 relative overflow-hidden">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3">
                <h3 className="text-white font-medium text-sm">{cat.name}</h3>
                <p className="text-white/70 text-xs">{cat.itemCount} items</p>
              </div>
            </div>

            {/* Actions */}
            <div className="p-3 flex items-center justify-between">
              {editing?.id === cat.id ? (
                <div className="flex-1 space-y-2">
                  <input
                    type="text"
                    value={editing.name}
                    onChange={(e) =>
                      setEditing({ ...editing, name: e.target.value })
                    }
                    className="w-full px-2 py-1 text-sm border border-gray-200 rounded focus:outline-none focus:border-brand-pink"
                  />
                  <input
                    type="text"
                    value={editing.description}
                    onChange={(e) =>
                      setEditing({ ...editing, description: e.target.value })
                    }
                    className="w-full px-2 py-1 text-sm border border-gray-200 rounded focus:outline-none focus:border-brand-pink"
                    placeholder="Description"
                  />
                  <input
                    type="url"
                    value={editing.image}
                    onChange={(e) =>
                      setEditing({ ...editing, image: e.target.value })
                    }
                    className="w-full px-2 py-1 text-sm border border-gray-200 rounded focus:outline-none focus:border-brand-pink"
                    placeholder="Image URL"
                  />
                  <div className="flex items-center gap-1">
                    <button
                      onClick={handleUpdate}
                      className="p-1 text-green-500 hover:bg-green-50 rounded"
                    >
                      <Check size={14} />
                    </button>
                    <button
                      onClick={() => setEditing(null)}
                      className="p-1 text-gray-400 hover:bg-gray-100 rounded"
                    >
                      <X size={14} />
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <p className="text-xs text-gray-500 truncate flex-1">
                    {cat.description}
                  </p>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() =>
                        setEditing({
                          id: cat.id,
                          name: cat.name,
                          description: cat.description,
                          image: cat.image,
                        })
                      }
                      className="p-1.5 text-gray-400 hover:text-brand-pink transition-colors"
                    >
                      <Edit size={14} />
                    </button>
                    {confirmDelete === cat.id ? (
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleDelete(cat.id)}
                          className="p-1 text-red-500 hover:bg-red-50 rounded text-xs"
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => setConfirmDelete(null)}
                          className="p-1 text-gray-400 hover:bg-gray-100 rounded"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setConfirmDelete(cat.id)}
                        className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash size={14} />
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {categories.length === 0 && (
        <div className="text-center py-12">
          <AlertCircle size={32} className="mx-auto text-gray-300 mb-3" />
          <p className="text-sm text-gray-500">No categories yet.</p>
        </div>
      )}
    </div>
  );
}
