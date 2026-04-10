import { MapContainer, TileLayer } from "react-leaflet";
import MarkerLayer from "./MarkerLayer.jsx";
import "leaflet/dist/leaflet.css";

export default function MapCanvas({ issues, selectedIssueId, onSelectIssue }) {
  return (
    <MapContainer center={[23.5, 87.3]} zoom={10} className="explore-map-canvas">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MarkerLayer
        issues={issues}
        selectedIssueId={selectedIssueId}
        onSelectIssue={onSelectIssue}
      />
    </MapContainer>
  );
}
