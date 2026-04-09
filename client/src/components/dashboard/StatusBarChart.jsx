import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const normalizeData = (data = []) => {
  if (!Array.isArray(data)) {
    return [];
  }

  return data.map((item) => ({
    name: item?._id || "UNKNOWN",
    count: Number(item?.count) || 0
  }));
};

export default function StatusBarChart({ title, data }) {
  const chartData = normalizeData(data);

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
    </div>
  );
}
