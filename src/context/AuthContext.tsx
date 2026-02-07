import { createContext, useContext, type ReactNode } from "react";
import { useAuth } from "../hooks/useAuth";

const AuthContext = createContext<ReturnType<typeof useAuth> | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const {user}=useAuth()
  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}
  
export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuthContext must be used inside AuthProvider");
  }
  return ctx;
}
