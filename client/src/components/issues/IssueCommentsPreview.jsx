import { useEffect, useState } from "react";
import { getComments } from "../../services/api.js";

export default function IssueCommentsPreview({ issue }) {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadComments = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await getComments("ISSUE", issue.id);
        const comments = response.data || [];
        const topLevel = comments.filter((comment) => !comment.parentComment);
        setItems(topLevel.slice(0, 3));
      } catch (err) {
        setError(err.message || "Failed to load comments");
      } finally {
        setLoading(false);
      }
    };

    loadComments();
  }, [issue.id]);

  return (
    <section className="issue-section">
      <h3 className="section-title">Comments</h3>
      {loading ? <p className="panel-empty">Loading comments...</p> : null}
      {error ? <p className="error-text">{error}</p> : null}

      {!loading && !error && items.length === 0 ? <p className="panel-empty">No comments yet. Start the discussion.</p> : null}

      {!loading && !error && items.length > 0 ? (
        <ul className="issue-list">
          {items.map((comment) => (
            <li key={comment._id} className="comment-preview-item">
              <strong>{comment.user?.name || "User"}:</strong>{" "}
              <span>{comment.content.length > 110 ? `${comment.content.slice(0, 110)}...` : comment.content}</span>
            </li>
          ))}
        </ul>
      ) : null}

      <button type="button" className="ghost-btn issue-link-btn">
        View all discussions {"->"}
      </button>
    </section>
  );
}
