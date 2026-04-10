import { useNavigate } from "react-router-dom";

export default function IssueActions({ issue }) {
  const navigate = useNavigate();

  return (
    <section className="issue-actions">
      <button type="button" className="primary-btn" onClick={() => navigate("/act")}> 
        Start Solution Project
      </button>
      <button type="button" className="ghost-btn" onClick={() => navigate("/community")}> 
        Join Discussion
      </button>
    </section>
  );
}
