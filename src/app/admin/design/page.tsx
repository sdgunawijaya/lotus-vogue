"use client";

import { useState } from "react";
import { useSiteSettings } from "@/context/SiteSettingsContext";
import type { SiteSettings } from "@/context/SiteSettingsContext";
import {
  Palette,
  Download,
  Upload,
  RotateCcw,
  Eye,
  Check,
  Info,
} from "@/components/Icons";

type Section = "colors" | "hero" | "announcement" | "layout" | "export";

const sections: { id: Section; label: string; icon: any }[] = [
  { id: "colors", label: "Brand Colors", icon: Palette },
  { id: "hero", label: "Hero Section", icon: Eye },
  { id: "announcement", label: "Announcement Bar", icon: Info },
  { id: "layout", label: "Layout", icon: Eye },
  { id: "export", label: "Export / Import", icon: Download },
];

const colorLabels: Record<keyof SiteSettings, string> = {
  brandAccent: "Accent",
  brandAccentLight: "Accent Light",
  brandAccentDark: "Accent Dark",
  brandGold: "Gold",
  brandGoldLight: "Gold Light",
  brandGoldDark: "Gold Dark",
  brandWarmWhite: "Warm White",
  brandCharcoal: "Charcoal",
  brandSoftRose: "Soft Rose",
  brandCream: "Cream",
  announcementText: "",
  announcementEnabled: false as any,
  heroTitle: "",
  heroSubtitle: "",
  heroDescription: "",
  heroCtaText: "",
  heroSecondaryCtaText: "",
  heroImageUrl: "",
  showBrandStrip: false as any,
  showNewsletter: false as any,
  showTestimonials: false as any,
  footerTagline: "",
  footerNewsletterEnabled: false as any,
  fontFamily: "",
} as any;

const colorKeys: (keyof SiteSettings)[] = [
  "brandAccent",
  "brandAccentLight",
  "brandAccentDark",
  "brandGold",
  "brandGoldLight",
  "brandGoldDark",
  "brandWarmWhite",
  "brandCharcoal",
  "brandSoftRose",
  "brandCream",
];

export default function AdminDesignPage() {
  const { settings, updateSettings, resetSettings, exportSettings, importSettings } =
    useSiteSettings();
  const [activeSection, setActiveSection] = useState<Section>("colors");
  const [importJson, setImportJson] = useState("");
  const [importStatus, setImportStatus] = useState<"idle" | "success" | "error">("idle");
  const [copied, setCopied] = useState(false);

  const handleExport = () => {
    const data = exportSettings();
    navigator.clipboard.writeText(data).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleImport = () => {
    const success = importSettings(importJson);
    setImportStatus(success ? "success" : "error");
    setTimeout(() => setImportStatus("idle"), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Design Settings</h1>
        <p className="text-sm text-gray-500 mt-1">
          Customize the look and feel of your store
        </p>
      </div>

      <div className="flex gap-6 lg:gap-8 flex-col lg:flex-row">
        {/* Sidebar tabs */}
        <div className="lg:w-48 flex-shrink-0">
          <nav className="flex lg:flex-col gap-1 overflow-x-auto">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveSection(s.id)}
                className={`flex items-center gap-2 px-3 py-2 text-sm rounded-lg whitespace-nowrap transition-colors ${
                  activeSection === s.id
                    ? "bg-brand-accent/10 text-brand-accent-dark font-medium"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <s.icon size={16} />
                {s.label}
              </button>
            ))}
            <button
              onClick={resetSettings}
              className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg text-red-500 hover:bg-red-50 transition-colors mt-2"
            >
              <RotateCcw size={16} />
              Reset All
            </button>
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="bg-white rounded-xl border border-gray-100 p-6">
            {/* Colors */}
            {activeSection === "colors" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-1">
                    Brand Colors
                  </h2>
                  <p className="text-sm text-gray-500">
                    These colors are applied across your entire store as CSS
                    custom properties. Changes take effect immediately.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  {colorKeys.map((key) => (
                    <div key={key} className="flex items-center gap-3">
                      <input
                        type="color"
                        value={settings[key] as string}
                        onChange={(e) =>
                          updateSettings({ [key]: e.target.value })
                        }
                        className="w-10 h-10 rounded-lg cursor-pointer border border-gray-200 flex-shrink-0"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-700">
                          {colorLabels[key]}
                        </p>
                        <input
                          type="text"
                          value={settings[key] as string}
                          onChange={(e) =>
                            updateSettings({ [key]: e.target.value })
                          }
                          className="w-full mt-0.5 px-2 py-1 text-xs border border-gray-200 rounded focus:outline-none focus:border-brand-accent font-mono"
                        />
                      </div>
                      <div
                        className="w-8 h-8 rounded-full border-2 border-white shadow-sm flex-shrink-0"
                        style={{ backgroundColor: settings[key] as string }}
                      />
                    </div>
                  ))}
                </div>

                {/* Live preview */}
                <div className="mt-6 p-4 rounded-xl border border-gray-200">
                  <p className="text-xs text-gray-500 mb-3 flex items-center gap-1">
                    <Eye size={12} />
                    Live preview
                  </p>
                  <div className="flex items-center gap-4 flex-wrap">
                    <button className="btn-primary text-xs px-4 py-2">
                      Primary Button
                    </button>
                    <button className="btn-secondary text-xs px-4 py-2">
                      Secondary Button
                    </button>
                    <div className="section-divider !m-0" />
                    <span className="text-xs text-gradient font-medium">
                      Gradient Text
                    </span>
                    <span className="text-xs glass px-3 py-1.5 rounded-full">
                      Glass Effect
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Hero */}
            {activeSection === "hero" && (
              <div className="space-y-5">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-1">
                    Hero Section
                  </h2>
                  <p className="text-sm text-gray-500">
                    Customize the main hero banner content.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      value={settings.heroTitle}
                      onChange={(e) =>
                        updateSettings({ heroTitle: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-accent"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Subtitle Badge
                      </label>
                      <input
                        type="text"
                        value={settings.heroSubtitle}
                        onChange={(e) =>
                          updateSettings({ heroSubtitle: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-accent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <input
                        type="text"
                        value={settings.heroDescription}
                        onChange={(e) =>
                          updateSettings({ heroDescription: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-accent"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        CTA Text
                      </label>
                      <input
                        type="text"
                        value={settings.heroCtaText}
                        onChange={(e) =>
                          updateSettings({ heroCtaText: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-accent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Secondary CTA Text
                      </label>
                      <input
                        type="text"
                        value={settings.heroSecondaryCtaText}
                        onChange={(e) =>
                          updateSettings({
                            heroSecondaryCtaText: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-accent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Hero Image URL
                    </label>
                    <input
                      type="url"
                      value={settings.heroImageUrl}
                      onChange={(e) =>
                        updateSettings({ heroImageUrl: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-accent"
                    />
                    <div className="mt-2 w-full h-32 rounded-lg overflow-hidden bg-gray-100">
                      <img
                        src={settings.heroImageUrl}
                        alt="Hero preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Announcement */}
            {activeSection === "announcement" && (
              <div className="space-y-5">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-1">
                    Announcement Bar
                  </h2>
                  <p className="text-sm text-gray-500">
                    The announcement bar appears at the top of every page.
                  </p>
                </div>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.announcementEnabled}
                    onChange={(e) =>
                      updateSettings({ announcementEnabled: e.target.checked })
                    }
                    className="w-4 h-4 rounded border-gray-300 text-brand-accent focus:ring-brand-accent"
                  />
                  <span className="text-sm text-gray-700">
                    Show announcement bar
                  </span>
                </label>

                {settings.announcementEnabled && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Announcement text
                    </label>
                    <input
                      type="text"
                      value={settings.announcementText}
                      onChange={(e) =>
                        updateSettings({ announcementText: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-accent"
                    />
                    <div className="mt-3 px-4 py-2 bg-brand-charcoal text-white text-xs text-center rounded-lg tracking-wider">
                      {settings.announcementText}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Layout */}
            {activeSection === "layout" && (
              <div className="space-y-5">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-1">
                    Layout Toggles
                  </h2>
                  <p className="text-sm text-gray-500">
                    Show or hide sections across your store.
                  </p>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      key: "showBrandStrip" as const,
                      label: "Brand Strip",
                      desc: "Trust badges below hero (Ethically Made, Premium Quality, etc.)",
                    },
                    {
                      key: "showNewsletter" as const,
                      label: "Newsletter Signup",
                      desc: "Email newsletter CTA section on the homepage",
                    },
                    {
                      key: "showTestimonials" as const,
                      label: "Testimonials",
                      desc: "Customer testimonials section on the homepage",
                    },
                    {
                      key: "footerNewsletterEnabled" as const,
                      label: "Footer Newsletter",
                      desc: "Newsletter signup form in the footer",
                    },
                  ].map((item) => (
                    <label
                      key={item.key}
                      className="flex items-start gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={settings[item.key] as boolean}
                        onChange={(e) =>
                          updateSettings({ [item.key]: e.target.checked })
                        }
                        className="w-4 h-4 rounded border-gray-300 text-brand-accent focus:ring-brand-accent mt-0.5"
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-700">
                          {item.label}
                        </p>
                        <p className="text-xs text-gray-500">{item.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Footer Tagline
                  </label>
                  <input
                    type="text"
                    value={settings.footerTagline}
                    onChange={(e) =>
                      updateSettings({ footerTagline: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-accent"
                  />
                </div>
              </div>
            )}

            {/* Export/Import */}
            {activeSection === "export" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-1">
                    Export / Import
                  </h2>
                  <p className="text-sm text-gray-500">
                    Export your design settings as JSON or import previously
                    exported settings.
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">
                    Export
                  </h3>
                  <button
                    onClick={handleExport}
                    className="group relative inline-flex items-center gap-2 px-4 py-2 text-sm rounded-lg overflow-hidden transition-all duration-300"
                  >
                    <span className="absolute inset-0 bg-brand-accent transition-colors duration-300 group-hover:bg-brand-accent-dark" />
                    <span className="relative z-10 flex items-center gap-2 text-white">
                      {copied ? (
                        <>
                          <Check size={16} />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Download size={16} />
                          Copy Settings JSON
                        </>
                      )}
                    </span>
                    <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-gold-shimmer" />
                    </span>
                  </button>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">
                    Import
                  </h3>
                  <textarea
                    rows={6}
                    value={importJson}
                    onChange={(e) => setImportJson(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm font-mono focus:outline-none focus:border-brand-accent"
                    placeholder='{"brandPink": "#E8A0BF", ...}'
                  />
                  <button
                    onClick={handleImport}
                    disabled={!importJson.trim()}
                    className="inline-flex items-center gap-2 px-4 py-2 mt-2 bg-brand-gold text-white text-sm rounded-lg hover:bg-brand-gold-dark disabled:opacity-50 transition-colors"
                  >
                    <Upload size={16} />
                    Import Settings
                  </button>
                  {importStatus === "success" && (
                    <p className="text-sm text-green-600 mt-2">
                      ✓ Settings imported successfully!
                    </p>
                  )}
                  {importStatus === "error" && (
                    <p className="text-sm text-red-500 mt-2">
                      Invalid JSON. Please check your data.
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
