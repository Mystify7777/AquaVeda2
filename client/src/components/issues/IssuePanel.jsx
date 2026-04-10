import IssueActions from "./IssueActions.jsx";
import IssueAISection from "./IssueAISection.jsx";
import IssueCommentsPreview from "./IssueCommentsPreview.jsx";
import IssueDetails from "./IssueDetails.jsx";
import IssueHeader from "./IssueHeader.jsx";

export default function IssuePanel({ issue }) {
  if (!issue) {
    return (
      <div className="issue-panel-empty card">
        <h2>Select an issue to view details</h2>
        <p>Click any marker on the map to open context, insights, and actions.</p>
      </div>
    );
  }

  return (
    <div className="issue-panel card">
      <IssueHeader issue={issue} />
      <IssueDetails issue={issue} />

      <p className="issue-group-label">Insights</p>
      <IssueAISection issue={issue} />

      <p className="issue-group-label">Community</p>
      <IssueCommentsPreview issue={issue} />

      <p className="issue-group-label">Action</p>
      <IssueActions issue={issue} />
    </div>
  );
}
