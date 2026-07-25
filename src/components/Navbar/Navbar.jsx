import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";

// roles: undefined => visible to any authenticated user.
const NAV_LINKS = [
  { to: "/", label: "Dashboard" },
  { to: "/employees", label: "Employees" },
  { to: "/departments", label: "Departments" },
  { to: "/roles", label: "Roles", roles: ["ADMIN"] },
  { to: "/users", label: "Users", roles: ["ADMIN"] },
];

function Navbar() {
  const navigate = useNavigate();
  const { isAuthenticated, hasAnyRole, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    toast.success("Logged out.");
    navigate("/login");
  };

  const visibleLinks = NAV_LINKS.filter(
    (link) => !link.roles || hasAnyRole(link.roles)
  );

  const linkClass = ({ isActive }) =>
    `rounded-md px-3 py-2 text-sm font-medium transition-colors ${
      isActive
        ? "bg-white/20 text-white"
        : "text-blue-100 hover:bg-white/10 hover:text-white"
    }`;

  return (
    <nav className="bg-blue-600 shadow-md">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Brand */}
          <Link to="/" className="text-lg font-bold text-white">
            Employee Dashboard
          </Link>

          {/* Desktop links */}
          <div className="hidden items-center gap-1 md:flex">
            {isAuthenticated &&
              visibleLinks.map(({ to, label }) => (
                <NavLink key={to} to={to} end={to === "/"} className={linkClass}>
                  {label}
                </NavLink>
              ))}
          </div>

          {/* Desktop auth actions */}
          <div className="hidden items-center gap-2 md:flex">
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="rounded-md border border-white/40 px-4 py-1.5 text-sm font-medium text-white hover:bg-white/10"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="rounded-md border border-white/40 px-4 py-1.5 text-sm font-medium text-white hover:bg-white/10"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="rounded-md bg-white px-4 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-50"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-white/10 md:hidden"
            aria-expanded={isOpen}
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="space-y-1 pb-4 md:hidden">
            {isAuthenticated &&
              visibleLinks.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === "/"}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `block rounded-md px-3 py-2 text-sm font-medium ${
                      isActive ? "bg-white/20 text-white" : "text-blue-100 hover:bg-white/10"
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}

            <div className="mt-2 flex flex-col gap-2 border-t border-white/20 pt-3">
              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className="rounded-md border border-white/40 px-4 py-2 text-sm font-medium text-white hover:bg-white/10"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="rounded-md border border-white/40 px-4 py-2 text-center text-sm font-medium text-white hover:bg-white/10"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsOpen(false)}
                    className="rounded-md bg-white px-4 py-2 text-center text-sm font-medium text-blue-600 hover:bg-blue-50"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
