"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import type { Product } from "@/data/products";

interface QuickViewContextType {
  product: Product | null;
  isOpen: boolean;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;
}

const QuickViewContext = createContext<QuickViewContextType | undefined>(
  undefined
);

export function QuickViewProvider({ children }: { children: ReactNode }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const openQuickView = useCallback((product: Product) => {
    setProduct(product);
    setIsOpen(true);
  }, []);

  const closeQuickView = useCallback(() => {
    setIsOpen(false);
    // Delay clearing product so closing animation can finish
    setTimeout(() => setProduct(null), 350);
  }, []);

  return (
    <QuickViewContext.Provider
      value={{ product, isOpen, openQuickView, closeQuickView }}
    >
      {children}
    </QuickViewContext.Provider>
  );
}

export function useQuickView(): QuickViewContextType {
  const context = useContext(QuickViewContext);
  if (!context) {
    throw new Error("useQuickView must be used within a QuickViewProvider");
  }
  return context;
}
