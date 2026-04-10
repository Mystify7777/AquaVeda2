import { Suspense, lazy, useEffect, useMemo, useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext.jsx";
import { getAdminDashboard, getUserDashboard } from "../services/api.js";

const RoleChart = lazy(() => import("../components/dashboard/RoleChart.jsx"));
const StatusBarChart = lazy(() => import("../components/dashboard/StatusBarChart.jsx"));

const Card = ({ label, value }) => {
  return (
    <article className="dashboard-card">
      <h3>{label}</h3>
      <p>{value}</p>
    </article>
  );
};

export default function DashboardPage() {
  const { token, user } = useAuth();
  const [mode, setMode] = useState("user");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dashboard, setDashboard] = useState(null);
  const [shouldRenderCharts, setShouldRenderCharts] = useState(false);
  const chartSectionRef = useRef(null);

  const canViewAdmin = user?.role === "ADMIN";

  const userCards = useMemo(() => {
    if (!dashboard?.stats) {
      return [];
    }

    return [
      { label: "Issues Reported", value: dashboard.stats.issuesReported },
      { label: "Issues Resolved", value: dashboard.stats.resolvedIssues },
      { label: "Wiki Articles", value: dashboard.stats.wikiArticles },
      { label: "Approved Wiki", value: dashboard.stats.approvedWikiArticles },
      { label: "Projects Created", value: dashboard.stats.projectsCreated },
      { label: "Projects Joined", value: dashboard.stats.projectsContributing },
      { label: "Comments Posted", value: dashboard.stats.commentsPosted }
    ];
  }, [dashboard]);

  const adminCards = useMemo(() => {
    if (!dashboard) {
      return [];
    }

    return [
      { label: "Users", value: dashboard.users ?? 0 },
      { label: "Issues", value: dashboard.issues ?? 0 },
      { label: "Projects", value: dashboard.projects ?? 0 },
      { label: "Pending Articles", value: dashboard.pendingArticles ?? 0 }
    ];
  }, [dashboard]);

  const cards = mode === "admin" ? adminCards : userCards;

  useEffect(() => {
    setShouldRenderCharts(false);
  }, [mode]);

  useEffect(() => {
    if (!dashboard || mode !== "admin" || !canViewAdmin) {
      return;
    }

    if (shouldRenderCharts) {
      return;
    }

    const target = chartSectionRef.current;
    if (!target) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRenderCharts(true);
          observer.disconnect();
        }
      },
      {
        root: null,
        rootMargin: "120px",
        threshold: 0.15
      }
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [dashboard, mode, canViewAdmin, shouldRenderCharts]);

  const loadDashboard = async () => {
    try {
      setLoading(true);
      setError("");

      const response = mode === "admin" ? await getAdminDashboard(token) : await getUserDashboard(token);
      setDashboard(response.data);
    } catch (err) {
      setDashboard(null);
      setError(err.message || "Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="dashboard-page">
      <header className="dashboard-header">
        <h1>Impact Dashboard</h1>
        <p>Track measurable outcomes and contribution intelligence.</p>
      </header>

      <section className="dashboard-toolbar">
        <label>
          <span>Mode</span>
          <select
            value={mode}
            onChange={(event) => setMode(event.target.value)}
            disabled={!canViewAdmin}
          >
            <option value="user">User dashboard</option>
            {canViewAdmin ? <option value="admin">Admin dashboard</option> : null}
          </select>
        </label>

        <button type="button" className="primary-btn dashboard-load-btn" onClick={loadDashboard} disabled={loading || !token}>
          {loading ? "Loading..." : "Load dashboard"}
        </button>
      </section>

      {!canViewAdmin ? <p className="dashboard-note">Admin analytics are visible to ADMIN role only.</p> : null}

      {error ? <p className="error-text">{error}</p> : null}

      {dashboard && mode === "user" ? (
        <section className="dashboard-profile card">
          <h2>{dashboard.profile?.name || "User"}</h2>
          <p>{dashboard.profile?.email || ""}</p>
          <p>
            Role: <strong>{dashboard.profile?.role || "-"}</strong> | Reputation: <strong>{dashboard.profile?.reputation ?? 0}</strong>
          </p>
        </section>
      ) : null}

      {cards.length > 0 ? (
        <section className="dashboard-grid">
          {cards.map((item) => (
            <Card key={item.label} label={item.label} value={item.value} />
          ))}
        </section>
      ) : (
        <p className="dashboard-empty">No dashboard data loaded yet.</p>
      )}

      {dashboard && mode === "admin" && canViewAdmin ? (
        <section className="dashboard-extra" ref={chartSectionRef}>
          <h2>Analytics Overview</h2>
          {shouldRenderCharts ? (
            <Suspense fallback={<p className="chart-empty">Loading analytics visualizations...</p>}>
              <div className="charts">
                <RoleChart data={dashboard.roleSplit} />
                <StatusBarChart title="Issue Status Distribution" data={dashboard.issueStatus} />
                <StatusBarChart title="Project Progress Overview" data={dashboard.projectStatus} />
              </div>
            </Suspense>
          ) : (
            <p className="chart-empty">Scroll to analytics to load chart visualizations.</p>
          )}
        </section>
      ) : null}
    </main>
  );
}
