const statusOptions = ["", "OPEN", "IN_PROGRESS", "RESOLVED"];

export default function StatusFilter({ value, onChange, counts = {} }) {
  return (
    <label className="filter-field">
      <span>Status</span>
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        {statusOptions.map((option) => (
          <option key={option || "all-status"} value={option}>
            {option ? `${option} (${counts[option] || 0})` : "All"}
          </option>
        ))}
      </select>
    </label>
  );
}
