"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { AdminDataProvider } from "@/context/AdminDataContext";
import { SiteSettingsProvider } from "@/context/SiteSettingsContext";
import {
  Flower,
  LayoutList,
  ShoppingBag,
  Folder,
  MessageSquare,
  Palette,
  X,
  Menu,
  Settings,
  LogOut,
  Lock,
} from "@/components/Icons";

const navItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutList },
  { name: "Products", href: "/admin/products", icon: ShoppingBag },
  { name: "Categories", href: "/admin/categories", icon: Folder },
  { name: "Testimonials", href: "/admin/testimonials", icon: MessageSquare },
  { name: "Design", href: "/admin/design", icon: Palette },
];

function AdminLayoutInner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, isInitialized, logout, changePassword } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showChangePw, setShowChangePw] = useState(false);
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [pwError, setPwError] = useState("");
  const [pwSuccess, setPwSuccess] = useState(false);

  const isLoginPage = pathname === "/admin/login";

  // Redirect to login if not authenticated
  useEffect(() => {
    if (isInitialized && !isAuthenticated && !isLoginPage) {
      router.replace("/admin/login");
    }
  }, [isInitialized, isAuthenticated, isLoginPage, router]);

  // Don't render admin UI on login page
  if (isLoginPage) {
    return <>{children}</>;
  }

  // Show loading while initializing
  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-brand-pink border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Don't render if not authenticated (redirect will handle it)
  if (!isAuthenticated) return null;

  const handleLogout = () => {
    logout();
    router.replace("/admin/login");
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPwError("");

    if (!currentPw || !newPw || !confirmPw) {
      setPwError("Please fill in all fields.");
      return;
    }
    if (newPw.length < 4) {
      setPwError("New password must be at least 4 characters.");
      return;
    }
    if (newPw !== confirmPw) {
      setPwError("New passwords do not match.");
      return;
    }

    const success = changePassword(currentPw, newPw);
    if (success) {
      setPwSuccess(true);
      setCurrentPw("");
      setNewPw("");
      setConfirmPw("");
      setTimeout(() => {
        setShowChangePw(false);
        setPwSuccess(false);
      }, 2000);
    } else {
      setPwError("Current password is incorrect.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-64 bg-brand-charcoal text-white flex flex-col transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Logo */}
        <div className="px-6 py-5 border-b border-white/10">
          <Link
            href="/admin"
            className="flex items-center gap-2"
          >
            <Flower size={22} className="text-brand-pink" />
            <span className="text-base font-light tracking-[0.15em]">
              LOTUS
              <span className="font-normal text-brand-gold">VOGUE</span>
            </span>
            <span className="ml-auto text-[10px] bg-brand-pink/20 text-brand-pink-light px-2 py-0.5 rounded-full">
              Admin
            </span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto">
          <div className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                    isActive
                      ? "bg-brand-pink/20 text-brand-pink-light font-medium"
                      : "text-white/60 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <item.icon size={18} />
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Sidebar section: Account */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <p className="px-3 text-[10px] text-white/30 uppercase tracking-wider mb-2">
              Account
            </p>
            <div className="space-y-1">
              <button
                onClick={() => {
                  setShowChangePw(true);
                  setPwError("");
                  setPwSuccess(false);
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/40 hover:text-white hover:bg-white/5 transition-all"
              >
                <Lock size={18} />
                Change Password
              </button>
              <Link
                href="/"
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/40 hover:text-white hover:bg-white/5 transition-all"
                target="_blank"
              >
                <Settings size={18} />
                View Site
              </Link>
              <button
                onClick={() => setShowLogoutConfirm(true)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-all"
              >
                <LogOut size={18} />
                Sign Out
              </button>
            </div>
          </div>
        </nav>
      </aside>

      {/* Logout confirmation modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setShowLogoutConfirm(false)}
          />
          <div className="relative bg-white rounded-xl shadow-xl p-6 max-w-sm w-full animate-scale-in">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-3">
                <LogOut size={20} className="text-red-500" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Sign Out
              </h3>
              <p className="text-sm text-gray-500 mb-6">
                Are you sure you want to sign out of the admin dashboard?
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowLogoutConfirm(false)}
                  className="flex-1 px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogout}
                  className="flex-1 px-4 py-2 text-sm text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Change password modal */}
      {showChangePw && !pwSuccess && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setShowChangePw(false)}
          />
          <div className="relative bg-white rounded-xl shadow-xl p-6 max-w-sm w-full animate-scale-in">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                Change Password
              </h3>
              <button
                onClick={() => setShowChangePw(false)}
                className="p-1 text-gray-400 hover:text-gray-600"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleChangePassword} className="space-y-4">
              {pwError && (
                <div className="text-sm text-red-500 bg-red-50 px-3 py-2 rounded-lg">
                  {pwError}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  value={currentPw}
                  onChange={(e) => setCurrentPw(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-pink transition-colors"
                  autoFocus
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  value={newPw}
                  onChange={(e) => setNewPw(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-pink transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={confirmPw}
                  onChange={(e) => setConfirmPw(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-pink transition-colors"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowChangePw(false)}
                  className="flex-1 px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 text-sm text-white bg-brand-pink rounded-lg hover:bg-brand-pink-dark transition-colors"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Change password success */}
      {showChangePw && pwSuccess && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => {
              setShowChangePw(false);
              setPwSuccess(false);
            }}
          />
          <div className="relative bg-white rounded-xl shadow-xl p-6 max-w-sm w-full animate-scale-in text-center">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Password Updated
            </h3>
            <p className="text-sm text-gray-500">
              Your admin password has been changed successfully.
            </p>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-white border-b border-gray-200 px-4 lg:px-8 h-14 flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 -ml-2 text-gray-600 hover:text-gray-900"
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <div className="flex-1" />
          <button
            onClick={() => setShowLogoutConfirm(true)}
            className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-red-500 transition-colors"
          >
            <LogOut size={14} />
            Sign Out
          </button>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <AdminLayoutInner>
        {children}
      </AdminLayoutInner>
    </AuthProvider>
  );
}
