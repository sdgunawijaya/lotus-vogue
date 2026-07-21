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

interface AuthContextType {
  isAuthenticated: boolean;
  isInitialized: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  changePassword: (currentPassword: string, newPassword: string) => boolean;
}

// ─── Storage ───

const AUTH_KEY = "lotus-vogue-admin-auth";

interface AuthData {
  passwordHash: string;
  isLoggedIn: boolean;
}

const DEFAULT_PASSWORD = "admin123";

function hashPassword(password: string): string {
  // Simple base64 encoding as a basic obfuscation layer.
  // In a production app, use a proper backend auth system.
  let hash = btoa(password);
  // Add a simple salt-like transformation
  hash = hash.split("").reverse().join("") + "lv";
  return btoa(hash);
}

function verifyPassword(password: string, storedHash: string): boolean {
  return hashPassword(password) === storedHash;
}

function loadAuth(): AuthData {
  if (typeof window === "undefined") {
    return { passwordHash: hashPassword(DEFAULT_PASSWORD), isLoggedIn: false };
  }
  try {
    const stored = localStorage.getItem(AUTH_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {
    // ignore
  }
  // Initialize with default password
  const defaultAuth: AuthData = {
    passwordHash: hashPassword(DEFAULT_PASSWORD),
    isLoggedIn: false,
  };
  try {
    localStorage.setItem(AUTH_KEY, JSON.stringify(defaultAuth));
  } catch {
    // ignore
  }
  return defaultAuth;
}

function saveAuth(data: AuthData) {
  try {
    localStorage.setItem(AUTH_KEY, JSON.stringify(data));
  } catch {
    // ignore
  }
}

// ─── Context ───

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const auth = loadAuth();
    setIsAuthenticated(auth.isLoggedIn);
    setIsInitialized(true);
  }, []);

  const login = useCallback((password: string): boolean => {
    const auth = loadAuth();
    if (verifyPassword(password, auth.passwordHash)) {
      auth.isLoggedIn = true;
      saveAuth(auth);
      setIsAuthenticated(true);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    const auth = loadAuth();
    auth.isLoggedIn = false;
    saveAuth(auth);
    setIsAuthenticated(false);
  }, []);

  const changePassword = useCallback(
    (currentPassword: string, newPassword: string): boolean => {
      const auth = loadAuth();
      if (!verifyPassword(currentPassword, auth.passwordHash)) {
        return false;
      }
      auth.passwordHash = hashPassword(newPassword);
      saveAuth(auth);
      return true;
    },
    []
  );

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isInitialized,
        login,
        logout,
        changePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
