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

        <div className="top-nav-tools" aria-label="Utilities">
          <label className="top-search">
            <span className="sr-only">Search</span>
            <input type="search" placeholder="Search issues, articles, projects" />
          </label>
          <button type="button" className="icon-btn" title="Notifications" aria-label="Notifications">
            Notifications
          </button>
          <button type="button" className="icon-btn" title="Profile" aria-label="Profile">
            {isAuthenticated ? user?.name?.slice(0, 1).toUpperCase() || "U" : "P"}
          </button>
        </div>

        <div className="top-nav-auth">
          {isAuthenticated ? (
            <>
              <span className="user-pill">{user?.role || "USER"}</span>
              <button type="button" className="secondary-btn" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className="secondary-btn link-btn">
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
