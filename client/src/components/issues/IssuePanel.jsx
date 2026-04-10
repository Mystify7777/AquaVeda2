import IssueActions from "./IssueActions.jsx";
import IssueAISection from "./IssueAISection.jsx";
import IssueCommentsPreview from "./IssueCommentsPreview.jsx";
import IssueDetails from "./IssueDetails.jsx";
import IssueHeader from "./IssueHeader.jsx";

export default function IssuePanel({ issue }) {
  if (!issue) {
    return (
      <div className="issue-panel-empty">
        <h2>No Issue Selected</h2>
        <p>Select an issue marker on the map to inspect details and take action.</p>
      </div>
    );
  }

  return (
    <div className="issue-panel">
      <IssueHeader issue={issue} />
      <IssueDetails issue={issue} />
      <IssueAISection issue={issue} />
      <IssueCommentsPreview issue={issue} />
      <IssueActions issue={issue} />
    </div>
  );
}
