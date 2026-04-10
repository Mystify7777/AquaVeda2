import RegionFilter from "./RegionFilter.jsx";
import SeverityFilter from "./SeverityFilter.jsx";
import StatusFilter from "./StatusFilter.jsx";
import { AnimatePresence, motion } from "framer-motion";

export default function FilterPanel({ filters, onChange, issues = [] }) {
  const severityCounts = issues.reduce((acc, issue) => {
    const key = issue.severity || "LOW";
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  const statusCounts = issues.reduce((acc, issue) => {
    const key = issue.status || "OPEN";
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  const activeFilters = [
    filters.severity ? { key: "severity", label: filters.severity } : null,
    filters.status ? { key: "status", label: filters.status } : null,
    filters.region ? { key: "region", label: `Region: ${filters.region}` } : null
  ].filter(Boolean);

  const clearFilter = (key) => {
    onChange({ ...filters, [key]: "" });
  };

  const resetFilters = () => {
    onChange({ severity: "", status: "", region: "" });
  };

  return (
    <div className="filter-panel">
      <h3>Filters</h3>
      <p>Narrow the map to focus on high-impact issues first.</p>

      {activeFilters.length > 0 ? (
        <div className="filter-chip-list">
          <AnimatePresence>
            {activeFilters.map((item) => (
              <motion.button
                type="button"
                key={item.key}
                className="filter-chip"
                onClick={() => clearFilter(item.key)}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.16, ease: "easeInOut" }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.95 }}
                layout
              >
                {item.label} x
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <p className="panel-empty">No active filters.</p>
      )}

      <SeverityFilter
        value={filters.severity}
        counts={severityCounts}
        onChange={(severity) => onChange({ ...filters, severity })}
      />

      <StatusFilter
        value={filters.status}
        counts={statusCounts}
        onChange={(status) => onChange({ ...filters, status })}
      />

      <RegionFilter
        value={filters.region}
        onChange={(region) => onChange({ ...filters, region })}
      />

      <button type="button" className="ghost-btn filter-reset-btn" onClick={resetFilters}>
        Reset Filters
      </button>
    </div>
  );
}
