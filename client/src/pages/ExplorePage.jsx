import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FilterPanel from "../components/filters/FilterPanel.jsx";
import IssuePanel from "../components/issues/IssuePanel.jsx";
import MapCanvas from "../components/map/MapCanvas.jsx";
import { getIssueMapData } from "../services/api.js";

export default function ExplorePage() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    severity: "",
    status: "",
    region: ""
  });
  const [issues, setIssues] = useState([]);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadIssues = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await getIssueMapData(filters);
        const nextIssues = response.data || [];

        setIssues(nextIssues);

        if (!nextIssues.some((issue) => issue.id === selectedIssue?.id)) {
          setSelectedIssue(nextIssues[0] || null);
        }
      } catch (err) {
        setError(err.message || "Failed to load issues");
      } finally {
        setLoading(false);
      }
    };

    loadIssues();
  }, [filters]);

  return (
    <section className="explore-page">
      <div className="explore-layout">
        <aside className="explore-sidebar">
          <FilterPanel filters={filters} onChange={setFilters} />
        </aside>

        <main className="explore-map" aria-label="Map workspace">
          {loading ? <p className="panel-empty map-message">Loading map data...</p> : null}
          {error ? <p className="error-text">{error}</p> : null}
          {!loading && !error && issues.length > 0 ? (
            <MapCanvas
              issues={issues}
              selectedIssueId={selectedIssue?.id || ""}
              onSelectIssue={setSelectedIssue}
            />
          ) : null}

          {!loading && !error && issues.length === 0 ? (
            <div className="map-empty-state">
              <h2>No issues found in this area</h2>
              <p>Try widening your search, changing filters, or report a new issue.</p>
              <button type="button" className="primary-btn" onClick={() => navigate("/act")}>Report Issue</button>
            </div>
          ) : null}
        </main>

        <section className="explore-panel">
          <IssuePanel issue={selectedIssue} />
        </section>
      </div>
    </section>
  );
}
