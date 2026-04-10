export default function IssueDetails({ issue }) {
  return (
    <section className="issue-section">
      <h3>Details</h3>
      <p>{issue.description}</p>
      <p className="issue-meta">Status: {issue.status}</p>
      <p className="issue-meta">Region: {issue.region || "global"}</p>
    </section>
  );
}
