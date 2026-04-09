import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage.jsx";
import IssueMapPage from "./pages/IssueMapPage.jsx";

function Home() {
  return (
    <main style={{ fontFamily: "system-ui, sans-serif", padding: "2rem" }}>
      <h1>Aquaveda</h1>
      <p>Geo-intelligent water conservation platform foundation is live.</p>
      <div style={{ display: "flex", gap: "1rem" }}>
        <Link to="/health">Check health</Link>
        <Link to="/issues-map">Open issues map</Link>
        <Link to="/dashboard">Open dashboard</Link>
      </div>
    </main>
  );
}

function Health() {
  return (
    <main style={{ fontFamily: "system-ui, sans-serif", padding: "2rem" }}>
      <h1>Client Ready</h1>
      <p>The frontend scaffold is running.</p>
    </main>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/health" element={<Health />} />
        <Route path="/issues-map" element={<IssueMapPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </BrowserRouter>
  );
}