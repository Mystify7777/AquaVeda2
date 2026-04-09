import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";

const navItems = [
  { to: "/explore", label: "Explore" },
  { to: "/learn", label: "Learn" },
  { to: "/act", label: "Act" },
  { to: "/community", label: "Community" },
  { to: "/dashboard", label: "Dashboard" }
];

export default function MainLayout() {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <div className="app-shell">
      <header className="top-nav">
        <div className="brand-block">
          <h1>AquaVeda</h1>
          <p>Decision and Action System for Water Issues</p>
        </div>

        <nav className="top-nav-links" aria-label="Primary">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="top-nav-auth">
          {isAuthenticated ? (
            <>
              <span className="user-pill">{user?.role || "USER"}</span>
              <button type="button" className="ghost-btn" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className="ghost-btn link-btn">
                Login
              </NavLink>
              <NavLink to="/register" className="primary-btn link-btn">
                Register
              </NavLink>
            </>
          )}
        </div>
      </header>

      <main className="layout-main">
        <Outlet />
      </main>
    </div>
  );
}
