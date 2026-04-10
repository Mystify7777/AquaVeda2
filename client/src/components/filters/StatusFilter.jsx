const statusOptions = ["", "OPEN", "IN_PROGRESS", "RESOLVED"];

export default function StatusFilter({ value, onChange }) {
  return (
    <label className="filter-field">
      <span>Status</span>
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        {statusOptions.map((option) => (
          <option key={option || "all-status"} value={option}>
            {option || "All"}
          </option>
        ))}
      </select>
    </label>
  );
}
