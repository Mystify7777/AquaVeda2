import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const ISSUE_STATUS_ORDER = ["OPEN", "IN_PROGRESS", "RESOLVED"];
const PROJECT_STATUS_ORDER = ["ACTIVE", "COMPLETED"];

const normalizeData = (data = []) => {
  if (!Array.isArray(data)) {
    return [];
  }

  return data.map((item) => ({
    name: item?._id || "UNKNOWN",
    count: Number(item?.count) || 0
  }));
};

const orderData = (data, title = "") => {
  const sourceOrder = title.toLowerCase().includes("issue") ? ISSUE_STATUS_ORDER : PROJECT_STATUS_ORDER;
  const orderMap = new Map(sourceOrder.map((name, index) => [name, index]));

  return [...data].sort((a, b) => {
    const left = orderMap.has(a.name) ? orderMap.get(a.name) : Number.MAX_SAFE_INTEGER;
    const right = orderMap.has(b.name) ? orderMap.get(b.name) : Number.MAX_SAFE_INTEGER;

    if (left !== right) {
      return left - right;
    }

    return a.name.localeCompare(b.name);
  });
};

export default function StatusBarChart({ title, data }) {
  const chartData = orderData(normalizeData(data), title);

  if (chartData.length === 0) {
    return (
      <div className="chart-box">
        <h3>{title}</h3>
        <p className="chart-empty">No chart data available.</p>
      </div>
    );
  }

  return (
    <div className="chart-box">
      <h3>{title}</h3>
      <div className="chart-canvas">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 8, right: 8, left: -16, bottom: 8 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" fill="#0f766e" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="chart-legend" aria-label={`${title} legend`}>
        {chartData.map((item) => (
          <span key={item.name} className="chart-legend-item">
            <span className="chart-legend-dot" aria-hidden="true" />
            {item.name}: {item.count}
          </span>
        ))}
      </div>
    </div>
  );
}
