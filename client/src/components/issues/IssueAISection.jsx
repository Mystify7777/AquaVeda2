import { useState } from "react";
import { getIssueRecommendations } from "../../services/api.js";

export default function IssueAISection({ issue }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [hasLoaded, setHasLoaded] = useState(false);

  const fetchAI = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await getIssueRecommendations(issue.id);
      setData(response.data || []);
      setHasLoaded(true);
      setOpen(true);
    } catch (err) {
      setError(err.message || "Failed to load suggestions");
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = async () => {
    if (open) {
      setOpen(false);
      return;
    }

    if (!hasLoaded) {
      await fetchAI();
      return;
    }

    setOpen(true);
  };

  return (
    <section className="issue-section">
      <div className="section-row">
        <h3 className="section-title">AI Suggestions</h3>
        <button type="button" className="ghost-btn" onClick={handleToggle} disabled={loading}>
          {loading ? "Fetching suggestions..." : open ? "Hide" : "Show"}
        </button>
      </div>

      {error ? <p className="error-text">{error}</p> : null}
      {!open && !loading ? <p className="panel-empty">Expand to view AI-backed guidance for this issue.</p> : null}

      {open && data.length > 0 ? (
        <ul className="issue-list issue-list-animated">
          {data.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}

      {open && !loading && data.length === 0 ? <p className="panel-empty">No suggestions available yet.</p> : null}
    </section>
  );
}
