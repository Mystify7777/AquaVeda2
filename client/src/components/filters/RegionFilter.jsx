export default function RegionFilter({ value, onChange }) {
  return (
    <label className="filter-field">
      <span>Region</span>
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="e.g. west-zone"
      />
    </label>
  );
}
