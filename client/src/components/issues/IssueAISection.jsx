import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
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

      <AnimatePresence initial={false} mode="wait">
        {!open && !loading ? (
          <motion.p
            key="ai-collapsed"
            className="panel-empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            Expand to view AI-backed guidance for this issue.
          </motion.p>
        ) : null}

        {open ? (
          <motion.div
            key="ai-expanded"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.24, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            {data.length > 0 ? (
              <ul className="issue-list">
                {data.map((item) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.18, ease: "easeInOut" }}
                  >
                    {item}
                  </motion.li>
                ))}
              </ul>
            ) : null}

            {!loading && data.length === 0 ? <p className="panel-empty">No suggestions available yet.</p> : null}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
