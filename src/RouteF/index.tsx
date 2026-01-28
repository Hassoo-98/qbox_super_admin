import { Sidebar, LoginPage } from "../pages";
import { Routes, Route, Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

const RouteF = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <Sidebar />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export { RouteF };
