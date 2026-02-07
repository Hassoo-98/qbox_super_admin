import { type ReactNode,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, loading } = useAuthContext();
  const navigate=useNavigate()

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate("/login");
    }
  }, [loading, isAuthenticated,navigate]);

  if (loading) return <p>Loading...</p>;

  return <>{children}</>;
}
