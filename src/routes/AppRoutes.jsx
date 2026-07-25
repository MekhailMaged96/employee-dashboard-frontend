import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./../layouts/MainLayout";
import ProtectedRoute from "./guards/ProtectedRoute";
import DashboardPage from "../features/dashboard/pages/DashboardPage";
import EmployeesPage from "../features/employees/pages/EmployeesPage";
import UsersPage from "../features/users/pages/UsersPage";
import RolesPage from "../features/roles/pages/RolesPage";
import DepartmentsPage from "../features/departments/pages/DepartmentsPage";
import LoginPage from "../features/auth/pages/LoginPage";
import RegisterPage from "../features/auth/pages/RegisterPage";
import ForbiddenPage from "../features/auth/pages/ForbiddenPage";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forbidden" element={<ForbiddenPage />} />

        {/* Authenticated (any role) */}
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/employees" element={<EmployeesPage />} />
            <Route path="/departments" element={<DepartmentsPage />} />
          </Route>
        </Route>

        {/* Admin-only */}
        <Route element={<ProtectedRoute roles={["ADMIN"]} />}>
          <Route element={<MainLayout />}>
            <Route path="/users" element={<UsersPage />} />
            <Route path="/roles" element={<RolesPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
