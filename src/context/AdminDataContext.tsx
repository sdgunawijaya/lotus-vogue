"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import type { Product, Category, Testimonial } from "@/data/products";
import {
  products as defaultProducts,
  categories as defaultCategories,
  testimonials as defaultTestimonials,
} from "@/data/products";
import { generateId, slugify } from "@/lib/utils";

// ─── Types ───

interface AdminDataContextType {
  products: Product[];
  categories: Category[];
  testimonials: Testimonial[];

  // Product CRUD
  addProduct: (product: Omit<Product, "id" | "slug">) => Product;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;

  // Category CRUD
  addCategory: (category: Omit<Category, "id" | "slug">) => Category;
  updateCategory: (id: string, updates: Partial<Category>) => void;
  deleteCategory: (id: string) => void;

  // Testimonial CRUD
  addTestimonial: (testimonial: Omit<Testimonial, "id">) => Testimonial;
  updateTestimonial: (id: number, updates: Partial<Testimonial>) => void;
  deleteTestimonial: (id: number) => void;

  // Derived
  featuredProducts: Product[];
  saleProducts: Product[];
  getProductBySlug: (slug: string) => Product | undefined;
  getProductsByCategory: (category: string) => Product[];
  getRelatedProducts: (product: Product) => Product[];

  hasChanges: boolean;
  resetToDefaults: () => void;
  exportData: () => string;
  importData: (json: string) => boolean;
}

// ─── Storage ───

const STORAGE_KEY = "lotus-vogue-admin-data";

function loadFromStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function saveToStorage<T>(key: string, data: T) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch {
    // ignore
  }
}

// ─── Helpers ───

function generateProductId(name: string): string {
  return slugify(name) + "-" + Math.random().toString(36).substring(2, 6);
}

// ─── Context ───

const AdminDataContext = createContext<AdminDataContextType | undefined>(
  undefined
);

export function AdminDataProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(defaultProducts);
  const [categories, setCategories] =
    useState<Category[]>(defaultCategories);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(
    defaultTestimonials as Testimonial[]
  );
  const [hasChanges, setHasChanges] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = loadFromStorage<{
      products?: Product[];
      categories?: Category[];
      testimonials?: Testimonial[];
    }>(STORAGE_KEY, {});
    if (stored.products) setProducts(stored.products);
    if (stored.categories) setCategories(stored.categories);
    if (stored.testimonials) setTestimonials(stored.testimonials);
    setIsInitialized(true);
  }, []);

  // Persist to localStorage on changes (after initialization)
  useEffect(() => {
    if (!isInitialized) return;
    saveToStorage(STORAGE_KEY, { products, categories, testimonials });
    setHasChanges(true);
  }, [products, categories, testimonials, isInitialized]);

  // ─── Product CRUD ───

  const addProduct = useCallback(
    (data: Omit<Product, "id" | "slug">): Product => {
      const slug = slugify(data.name);
      const baseSlug = slug;
      let finalSlug = baseSlug;
      let counter = 1;
      while (products.some((p) => p.slug === finalSlug)) {
        finalSlug = `${baseSlug}-${counter}`;
        counter++;
      }
      const product: Product = {
        ...data,
        id: generateProductId(data.name),
        slug: finalSlug,
      };
      setProducts((prev) => [...prev, product]);
      return product;
    },
    [products]
  );

  const updateProduct = useCallback(
    (id: string, updates: Partial<Product>) => {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === id
            ? {
                ...p,
                ...updates,
                slug: updates.name
                  ? slugify(updates.name)
                  : p.slug,
              }
            : p
        )
      );
    },
    []
  );

  const deleteProduct = useCallback((id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }, []);

  // ─── Category CRUD ───

  const addCategory = useCallback(
    (data: Omit<Category, "id" | "slug">): Category => {
      const slug = slugify(data.name);
      const category: Category = {
        ...data,
        id: slug,
        slug,
      };
      setCategories((prev) => [...prev, category]);
      return category;
    },
    []
  );

  const updateCategory = useCallback(
    (id: string, updates: Partial<Category>) => {
      setCategories((prev) =>
        prev.map((c) =>
          c.id === id
            ? { ...c, ...updates, slug: updates.name ? slugify(updates.name) : c.slug }
            : c
        )
      );
    },
    []
  );

  const deleteCategory = useCallback((id: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
  }, []);

  // ─── Testimonial CRUD ───

  const addTestimonial = useCallback(
    (data: Omit<Testimonial, "id">): Testimonial => {
      const maxId = testimonials.reduce(
        (max, t) => Math.max(max, t.id),
        0
      );
      const testimonial: Testimonial = { ...data, id: maxId + 1 };
      setTestimonials((prev) => [...prev, testimonial]);
      return testimonial;
    },
    [testimonials]
  );

  const updateTestimonial = useCallback(
    (id: number, updates: Partial<Testimonial>) => {
      setTestimonials((prev) =>
        prev.map((t) => (t.id === id ? { ...t, ...updates } : t))
      );
    },
    []
  );

  const deleteTestimonial = useCallback((id: number) => {
    setTestimonials((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // ─── Derived ───

  const featuredProducts = products.filter((p) => p.isNew);
  const saleProducts = products.filter((p) => p.isSale);

  const getProductBySlug = useCallback(
    (slug: string) => products.find((p) => p.slug === slug),
    [products]
  );

  const getProductsByCategory = useCallback(
    (category: string) => products.filter((p) => p.category === category),
    [products]
  );

  const getRelatedProducts = useCallback(
    (product: Product) =>
      products
        .filter(
          (p) => p.category === product.category && p.id !== product.id
        )
        .slice(0, 4),
    [products]
  );

  // ─── Utilities ───

  const resetToDefaults = useCallback(() => {
    setProducts(defaultProducts);
    setCategories(defaultCategories);
    setTestimonials(defaultTestimonials as Testimonial[]);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const exportData = useCallback(() => {
    return JSON.stringify({ products, categories, testimonials }, null, 2);
  }, [products, categories, testimonials]);

  const importData = useCallback((json: string): boolean => {
    try {
      const data = JSON.parse(json);
      if (data.products) setProducts(data.products);
      if (data.categories) setCategories(data.categories);
      if (data.testimonials) setTestimonials(data.testimonials);
      return true;
    } catch {
      return false;
    }
  }, []);

  return (
    <AdminDataContext.Provider
      value={{
        products,
        categories,
        testimonials,
        addProduct,
        updateProduct,
        deleteProduct,
        addCategory,
        updateCategory,
        deleteCategory,
        addTestimonial,
        updateTestimonial,
        deleteTestimonial,
        featuredProducts,
        saleProducts,
        getProductBySlug,
        getProductsByCategory,
        getRelatedProducts,
        hasChanges,
        resetToDefaults,
        exportData,
        importData,
      }}
    >
      {children}
    </AdminDataContext.Provider>
  );
}

export function useAdminData(): AdminDataContextType {
  const context = useContext(AdminDataContext);
  if (!context) {
    throw new Error("useAdminData must be used within an AdminDataProvider");
  }
  return context;
}
