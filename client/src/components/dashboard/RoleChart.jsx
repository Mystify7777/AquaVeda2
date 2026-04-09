import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = ["#0f766e", "#0ea5e9", "#f59e0b", "#ef4444", "#6366f1"];

const normalizeData = (data = []) => {
  if (!Array.isArray(data)) {
    return [];
  }

  return data
    .map((item) => ({
      name: item?._id || "UNKNOWN",
      value: Number(item?.count) || 0
    }))
    .filter((item) => item.value > 0);
};

export default function RoleChart({ data }) {
  const chartData = normalizeData(data);

  if (chartData.length === 0) {
    return <p className="chart-empty">No role data available.</p>;
  }

  return (
    <div className="chart-box">
      <h3>Role Distribution</h3>
      <div className="chart-canvas">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={chartData} dataKey="value" nameKey="name" outerRadius={90} label>
              {chartData.map((entry, index) => (
                <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
