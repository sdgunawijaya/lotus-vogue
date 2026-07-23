"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Flower, Eye, EyeOff, AlertCircle } from "@/components/Icons";

export default function AdminLoginPage() {
  const router = useRouter();
  const { isAuthenticated, isInitialized, login } = useAuth();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (isInitialized && isAuthenticated) {
      router.replace("/admin");
    }
  }, [isInitialized, isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simulate a short delay for UX
    await new Promise((r) => setTimeout(r, 400));

    const success = login(password);
    if (success) {
      router.replace("/admin");
    } else {
      setError("Invalid password. Please try again.");
      setIsLoading(false);
    }
  };

  // Don't render anything until auth is initialized
  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-brand-accent-light/20 via-brand-warm-white to-brand-gold-light/20 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-brand-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Don't render the login form if already authenticated (redirect will happen)
  if (isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-accent-light/20 via-brand-warm-white to-brand-gold-light/20 flex items-center justify-center p-4">
      {/* Decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-brand-accent-light/30 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-brand-gold-light/20 blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <Flower size={32} className="text-brand-accent" />
            <span className="text-2xl font-light tracking-[0.2em] text-brand-charcoal">
              LOTUS
              <span className="font-normal text-brand-gold">VOGUE</span>
            </span>
          </div>
          <h1 className="text-xl font-light text-brand-charcoal">
            Admin Dashboard
          </h1>
          <p className="text-sm text-brand-charcoal/50 mt-1">
            Sign in to manage your store
          </p>
        </div>

        {/* Login card */}
        <div className="bg-white rounded-2xl shadow-xl border border-brand-accent-light/20 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error message */}
            {error && (
              <div className="flex items-center gap-2.5 px-4 py-3 bg-red-50 border border-red-100 rounded-xl text-sm text-red-600 animate-fade-in">
                <AlertCircle size={16} className="flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Password field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-brand-charcoal mb-2"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  placeholder="Enter admin password"
                  autoFocus
                  autoComplete="current-password"
                  className="w-full px-4 py-3 pr-11 bg-brand-soft-rose border border-brand-accent-light/40 rounded-xl text-sm focus:outline-none focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/10 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-charcoal/40 hover:text-brand-charcoal/70 transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit button with gold shimmer */}
            <button
              type="submit"
              disabled={!password || isLoading}
              className="group relative w-full py-3 overflow-hidden bg-gradient-to-r from-brand-gold to-brand-gold-dark text-white text-sm font-medium rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-brand-gold/30 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:hover:translate-y-0"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </span>
              {/* Gold shimmer overlay */}
              <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-gold-shimmer" />
              </span>
            </button>

            {/* Hint */}
            <div className="text-center">
              <p className="text-xs text-brand-charcoal/30">
                Default password: <span className="font-mono text-brand-charcoal/50">admin123</span>
              </p>
              <p className="text-xs text-brand-charcoal/20 mt-1">
                You can change it after signing in
              </p>
            </div>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-brand-accent-light/20" />
            </div>
            <div className="relative flex justify-center">
              <span className="px-3 text-xs text-brand-charcoal/30 bg-white">
                or
              </span>
            </div>
          </div>

          {/* Back to site */}
          <a
            href="/"
            className="block text-center text-xs text-brand-charcoal/40 hover:text-brand-accent transition-colors"
          >
            ← Back to site
          </a>
        </div>
      </div>
    </div>
  );
}
