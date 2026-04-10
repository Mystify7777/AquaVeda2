import { useState } from "react";
import { CircleMarker, Tooltip } from "react-leaflet";

const severityColors = {
  LOW: "#16a34a",
  MEDIUM: "#eab308",
  HIGH: "#f97316",
  CRITICAL: "#dc2626"
};

export default function IssueMarker({ issue, isSelected, onSelectIssue }) {
  const [hovered, setHovered] = useState(false);
  const markerRadius = isSelected ? 11 : hovered ? 9 : 8;

  return (
    <CircleMarker
      center={[issue.coordinates[1], issue.coordinates[0]]}
      radius={markerRadius}
      pathOptions={{
        color: isSelected ? "#1e3a8a" : severityColors[issue.severity] || "#2563eb",
        fillColor: severityColors[issue.severity] || "#2563eb",
        fillOpacity: isSelected ? 0.95 : hovered ? 0.9 : 0.8,
        weight: isSelected ? 3 : hovered ? 2.5 : 2,
        className: `issue-marker severity-${(issue.severity || "LOW").toLowerCase()} ${isSelected ? "selected" : ""}`
      }}
      eventHandlers={{
        click: () => onSelectIssue(issue),
        mouseover: () => setHovered(true),
        mouseout: () => setHovered(false)
      }}
    >
      <Tooltip direction="top" offset={[0, -8]} opacity={0.95}>
        {issue.title}
      </Tooltip>
    </CircleMarker>
  );
}
