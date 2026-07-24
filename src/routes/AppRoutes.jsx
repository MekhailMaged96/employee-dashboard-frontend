import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./../layouts/MainLayout";
import DashboardPage from "../features/dashboard/pages/DashboardPage";
import EmployeesPage from "../features/employees/pages/EmployeesPage";
import UsersPage from "../features/users/pages/UsersPage";
import RolesPage from "../features/roles/pages/RolesPage";
import DepartmentsPage from "../features/departments/pages/DepartmentsPage";
import LoginPage from "../features/auth/pages/LoginPage";
import RegisterPage from "../features/auth/pages/RegisterPage";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route element={<MainLayout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/employees" element={<EmployeesPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/roles" element={<RolesPage />} />
          <Route path="/departments" element={<DepartmentsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
