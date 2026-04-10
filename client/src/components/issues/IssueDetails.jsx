export default function IssueDetails({ issue }) {
  return (
    <section className="issue-section">
      <h3 className="section-title">Issue Overview</h3>
      <p className="issue-description">{issue.description}</p>
      <div className="issue-meta-row">
        <p className="issue-meta">Status: {issue.status}</p>
        <p className="issue-meta">Region: {issue.region || "global"}</p>
      </div>
    </section>
  );
}
