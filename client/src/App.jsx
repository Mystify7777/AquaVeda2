import { Suspense, lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext.jsx";
import MainLayout from "./layouts/MainLayout.jsx";
import ActPage from "./pages/ActPage.jsx";
import CommunityPage from "./pages/CommunityPage.jsx";
import IssueMapPage from "./pages/IssueMapPage.jsx";
import LearnPage from "./pages/LearnPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";

const DashboardPage = lazy(() => import("./pages/DashboardPage.jsx"));

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <main className="page-message">Checking session...</main>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<main style={{ fontFamily: "system-ui, sans-serif", padding: "2rem" }}>Loading dashboard...</main>}>
        <Routes>
          <Route path="/" element={<Navigate to="/explore" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/health" element={<main className="page-message">Client ready</main>} />

          <Route path="/" element={<MainLayout />}>
            <Route path="explore" element={<IssueMapPage />} />
            <Route path="issues-map" element={<Navigate to="/explore" replace />} />
            <Route path="learn" element={<LearnPage />} />
            <Route path="act" element={<ActPage />} />
            <Route path="community" element={<CommunityPage />} />
            <Route
              path="dashboard"
              element={(
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              )}
            />
          </Route>

          <Route path="*" element={<Navigate to="/explore" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}