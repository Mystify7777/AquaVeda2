export default function IssueHeader({ issue }) {
  return (
    <div className="issue-header">
      <h2>{issue.title}</h2>
      <span className={`badge ${(issue.severity || "LOW").toLowerCase()}`}>
        {issue.severity}
      </span>
    </div>
  );
}
