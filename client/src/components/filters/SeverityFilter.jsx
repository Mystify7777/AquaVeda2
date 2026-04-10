const severityOptions = ["", "LOW", "MEDIUM", "HIGH", "CRITICAL"];

export default function SeverityFilter({ value, onChange }) {
  return (
    <label className="filter-field">
      <span>Severity</span>
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        {severityOptions.map((option) => (
          <option key={option || "all-severity"} value={option}>
            {option || "All"}
          </option>
        ))}
      </select>
    </label>
  );
}
