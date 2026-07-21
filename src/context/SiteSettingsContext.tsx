"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";

// ─── Types ───

export interface SiteSettings {
  // Brand colors
  brandPink: string;
  brandPinkLight: string;
  brandPinkDark: string;
  brandGold: string;
  brandGoldLight: string;
  brandGoldDark: string;
  brandWarmWhite: string;
  brandCharcoal: string;
  brandSoftRose: string;
  brandCream: string;

  // Announcement bar
  announcementText: string;
  announcementEnabled: boolean;

  // Hero section
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  heroCtaText: string;
  heroSecondaryCtaText: string;
  heroImageUrl: string;

  // Layout toggles
  showBrandStrip: boolean;
  showNewsletter: boolean;
  showTestimonials: boolean;

  // Footer
  footerTagline: string;
  footerNewsletterEnabled: boolean;

  // Font
  fontFamily: string;
}

const DEFAULT_SETTINGS: SiteSettings = {
  brandPink: "#E8A0BF",
  brandPinkLight: "#F5D6E0",
  brandPinkDark: "#D4729A",
  brandGold: "#C9A84C",
  brandGoldLight: "#E8D48B",
  brandGoldDark: "#A68A30",
  brandWarmWhite: "#FAF7F2",
  brandCharcoal: "#2D2D2D",
  brandSoftRose: "#FDF0F5",
  brandCream: "#F5F0E8",

  announcementText: "✦ Free shipping on orders over $100 ✦",
  announcementEnabled: true,

  heroTitle: "Bloom in Style This Season",
  heroSubtitle: "Spring/Summer 2026 Collection",
  heroDescription:
    "Discover our latest collection where delicate lotus-inspired design meets contemporary fashion. Each piece is thoughtfully crafted for the modern woman who values both elegance and purpose.",
  heroCtaText: "Shop New Arrivals",
  heroSecondaryCtaText: "Explore Collections",
  heroImageUrl:
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80",

  showBrandStrip: true,
  showNewsletter: true,
  showTestimonials: true,

  footerTagline:
    "Mindful elegance for the modern wardrobe. Timeless pieces designed to inspire confidence and celebrate individuality.",
  footerNewsletterEnabled: true,

  fontFamily: "var(--font-geist-sans)",
};

interface SiteSettingsContextType {
  settings: SiteSettings;
  updateSettings: (updates: Partial<SiteSettings>) => void;
  resetSettings: () => void;
  exportSettings: () => string;
  importSettings: (json: string) => boolean;
}

const STORAGE_KEY = "lotus-vogue-site-settings";

const SiteSettingsContext = createContext<
  SiteSettingsContextType | undefined
>(undefined);

export function SiteSettingsProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SETTINGS);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setSettings({ ...DEFAULT_SETTINGS, ...parsed });
      }
    } catch {
      // ignore
    }
    setIsInitialized(true);
  }, []);

  // Apply CSS variables to document root
  useEffect(() => {
    if (!isInitialized) return;
    const root = document.documentElement;
    root.style.setProperty("--brand-pink", settings.brandPink);
    root.style.setProperty("--brand-pink-light", settings.brandPinkLight);
    root.style.setProperty("--brand-pink-dark", settings.brandPinkDark);
    root.style.setProperty("--brand-gold", settings.brandGold);
    root.style.setProperty("--brand-gold-light", settings.brandGoldLight);
    root.style.setProperty("--brand-gold-dark", settings.brandGoldDark);
    root.style.setProperty(
      "--brand-warm-white",
      settings.brandWarmWhite
    );
    root.style.setProperty("--brand-charcoal", settings.brandCharcoal);
    root.style.setProperty("--brand-soft-rose", settings.brandSoftRose);
    root.style.setProperty("--brand-cream", settings.brandCream);
    root.style.setProperty("--background", settings.brandWarmWhite);
    root.style.setProperty("--foreground", settings.brandCharcoal);
  }, [settings, isInitialized]);

  // Persist to localStorage
  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {
      // ignore
    }
  }, [settings, isInitialized]);

  const updateSettings = useCallback(
    (updates: Partial<SiteSettings>) => {
      setSettings((prev) => ({ ...prev, ...updates }));
    },
    []
  );

  const resetSettings = useCallback(() => {
    setSettings(DEFAULT_SETTINGS);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const exportSettings = useCallback(() => {
    return JSON.stringify(settings, null, 2);
  }, [settings]);

  const importSettings = useCallback((json: string): boolean => {
    try {
      const data = JSON.parse(json);
      setSettings((prev) => ({ ...prev, ...data }));
      return true;
    } catch {
      return false;
    }
  }, []);

  return (
    <SiteSettingsContext.Provider
      value={{
        settings,
        updateSettings,
        resetSettings,
        exportSettings,
        importSettings,
      }}
    >
      {children}
    </SiteSettingsContext.Provider>
  );
}

export function useSiteSettings(): SiteSettingsContextType {
  const context = useContext(SiteSettingsContext);
  if (!context) {
    throw new Error(
      "useSiteSettings must be used within a SiteSettingsProvider"
    );
  }
  return context;
}

export { DEFAULT_SETTINGS };
