import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getCurrentUser, loginUser, registerUser } from "../services/api.js";

const tokenStorageKey = "token";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem(tokenStorageKey) || "");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const hydrateUser = async () => {
      if (!token) {
        setUser(null);
        return;
      }

      try {
        setLoading(true);
        const payload = await getCurrentUser(token);
        setUser(payload.data || null);
      } catch {
        localStorage.removeItem(tokenStorageKey);
        setToken("");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    hydrateUser();
  }, [token]);

  const login = async (credentials) => {
    const payload = await loginUser(credentials);
    const nextToken = payload.data?.token || "";
    const nextUser = payload.data?.user || null;

    localStorage.setItem(tokenStorageKey, nextToken);
    setToken(nextToken);
    setUser(nextUser);

    return payload;
  };

  const register = async (body) => {
    return registerUser(body);
  };

  const logout = () => {
    localStorage.removeItem(tokenStorageKey);
    setToken("");
    setUser(null);
  };

  const value = useMemo(
    () => ({
      token,
      user,
      loading,
      isAuthenticated: Boolean(token),
      login,
      register,
      logout
    }),
    [token, user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
};
