import { useMemo, useState } from "react";
import { getAdminDashboard, getUserDashboard } from "../services/api.js";

const tokenStorageKey = "token";

const Card = ({ label, value }) => {
  return (
    <article className="dashboard-card">
      <h3>{label}</h3>
      <p>{value}</p>
    </article>
  );
};

export default function DashboardPage() {
  const [token, setToken] = useState(localStorage.getItem(tokenStorageKey) || "");
  const [mode, setMode] = useState("user");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dashboard, setDashboard] = useState(null);

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
    if (!dashboard?.stats) {
      return [];
    }

    const { users, issues, wiki, projects, comments } = dashboard.stats;

    return [
      { label: "Users", value: users.total },
      { label: "Issues", value: issues.total },
      { label: "Open Issues", value: issues.open },
      { label: "In Progress", value: issues.inProgress },
      { label: "Resolved", value: issues.resolved },
      { label: "Wiki Articles", value: wiki.total },
      { label: "Wiki Pending", value: wiki.pending },
      { label: "Projects", value: projects.total },
      { label: "Active Projects", value: projects.active },
      { label: "Completed Projects", value: projects.completed },
      { label: "Comments", value: comments.total }
    ];
  }, [dashboard]);

  const cards = mode === "admin" ? adminCards : userCards;

  const loadDashboard = async () => {
    try {
      setLoading(true);
      setError("");

      localStorage.setItem(tokenStorageKey, token);

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
        <p>Use your JWT token to load user or admin platform metrics.</p>
      </header>

      <section className="dashboard-toolbar">
        <label>
          <span>Token</span>
          <textarea
            value={token}
            onChange={(event) => setToken(event.target.value)}
            placeholder="Paste Bearer token value"
            rows={3}
          />
        </label>

        <label>
          <span>Mode</span>
          <select value={mode} onChange={(event) => setMode(event.target.value)}>
            <option value="user">User dashboard</option>
            <option value="admin">Admin dashboard</option>
          </select>
        </label>

        <button type="button" className="dashboard-load-btn" onClick={loadDashboard} disabled={loading || !token.trim()}>
          {loading ? "Loading..." : "Load dashboard"}
        </button>
      </section>

      {error ? <p className="error-text">{error}</p> : null}

      {dashboard && mode === "user" ? (
        <section className="dashboard-profile">
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

      {dashboard && mode === "admin" ? (
        <section className="dashboard-extra">
          <h2>User Roles</h2>
          <pre>{JSON.stringify(dashboard.stats.users.byRole, null, 2)}</pre>
        </section>
      ) : null}
    </main>
  );
}
