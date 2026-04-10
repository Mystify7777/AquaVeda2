import { useState } from "react";
import { getIssueRecommendations } from "../../services/api.js";

export default function IssueAISection({ issue }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  const fetchAI = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await getIssueRecommendations(issue.id);
      setData(response.data || []);
      setOpen(true);
    } catch (err) {
      setError(err.message || "Failed to load suggestions");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="issue-section">
      <div className="section-row">
        <h3>AI Suggestions</h3>
        <button type="button" className="ghost-btn" onClick={fetchAI} disabled={loading}>
          {loading ? "Loading..." : "Get AI Suggestions"}
        </button>
      </div>

      {error ? <p className="error-text">{error}</p> : null}

      {open && data.length > 0 ? (
        <ul className="issue-list">
          {data.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}

      {open && !loading && data.length === 0 ? <p className="panel-empty">No suggestions available yet.</p> : null}
    </section>
  );
}
