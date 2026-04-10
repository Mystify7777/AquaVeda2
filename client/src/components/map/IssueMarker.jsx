import { CircleMarker } from "react-leaflet";

const severityColors = {
  LOW: "#16a34a",
  MEDIUM: "#eab308",
  HIGH: "#f97316",
  CRITICAL: "#dc2626"
};

export default function IssueMarker({ issue, isSelected, onSelectIssue }) {
  return (
    <CircleMarker
      center={[issue.coordinates[1], issue.coordinates[0]]}
      radius={isSelected ? 10 : 8}
      pathOptions={{
        color: severityColors[issue.severity] || "#2563eb",
        fillColor: severityColors[issue.severity] || "#2563eb",
        fillOpacity: isSelected ? 0.95 : 0.8,
        weight: isSelected ? 3 : 2
      }}
      eventHandlers={{
        click: () => onSelectIssue(issue)
      }}
    />
  );
}
