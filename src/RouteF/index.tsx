import { Sidebar, LoginPage } from "../pages";
import { Routes, Route} from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";

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
