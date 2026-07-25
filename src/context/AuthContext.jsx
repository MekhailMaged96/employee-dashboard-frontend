import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from "react";
import { decodeToken, extractRoles, isExpired } from "../utils/jwt";

const AuthContext = createContext(null);

function buildUser(token) {
  const payload = decodeToken(token);
  if (!payload || isExpired(payload)) return null;

  return {
    token,
    username: payload.sub ?? payload.username ?? null,
    fullName: payload.fullName ?? payload.name ?? null,
    email: payload.email ?? null,
    roles: extractRoles(payload),
    payload,
  };
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("token");
    const u = buildUser(token);
    if (!u && token) localStorage.removeItem("token"); // clear stale/expired
    return u;
  });

  const login = useCallback((token) => {
    localStorage.setItem("token", token);
    setUser(buildUser(token));
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setUser(null);
  }, []);

  const hasRole = useCallback((role) => !!user?.roles.includes(role), [user]);

  const hasAnyRole = useCallback(
    (roles = []) => roles.some((r) => user?.roles.includes(r)),
    [user],
  );

  const value = useMemo(
    () => ({
      user,
      roles: user?.roles ?? [],
      isAuthenticated: !!user,
      login,
      logout,
      hasRole,
      hasAnyRole,
    }),
    [user, login, logout, hasRole, hasAnyRole],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
