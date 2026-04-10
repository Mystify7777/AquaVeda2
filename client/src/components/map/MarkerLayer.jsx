import IssueMarker from "./IssueMarker.jsx";

export default function MarkerLayer({ issues, selectedIssueId, onSelectIssue }) {
  return (
    <>
      {issues.map((issue) => (
        <IssueMarker
          key={issue.id}
          issue={issue}
          isSelected={selectedIssueId === issue.id}
          onSelectIssue={onSelectIssue}
        />
      ))}
    </>
  );
}
