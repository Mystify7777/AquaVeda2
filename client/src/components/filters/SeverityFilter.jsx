const severityOptions = ["", "LOW", "MEDIUM", "HIGH", "CRITICAL"];

export default function SeverityFilter({ value, onChange, counts = {} }) {
  return (
    <label className="filter-field">
      <span>Severity</span>
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        {severityOptions.map((option) => (
          <option key={option || "all-severity"} value={option}>
            {option ? `${option} (${counts[option] || 0})` : "All"}
          </option>
        ))}
      </select>
    </label>
  );
}
