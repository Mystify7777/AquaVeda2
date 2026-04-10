import RegionFilter from "./RegionFilter.jsx";
import SeverityFilter from "./SeverityFilter.jsx";
import StatusFilter from "./StatusFilter.jsx";

export default function FilterPanel({ filters, onChange }) {
  return (
    <div className="filter-panel">
      <h3>Filters</h3>
      <p>Narrow the map to focus on high-impact issues first.</p>

      <SeverityFilter
        value={filters.severity}
        onChange={(severity) => onChange({ ...filters, severity })}
      />

      <StatusFilter
        value={filters.status}
        onChange={(status) => onChange({ ...filters, status })}
      />

      <RegionFilter
        value={filters.region}
        onChange={(region) => onChange({ ...filters, region })}
      />
    </div>
  );
}
