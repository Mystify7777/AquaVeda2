import { Suspense, lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext.jsx";
import MainLayout from "./layouts/MainLayout.jsx";

const DashboardPage = lazy(() => import("./pages/DashboardPage.jsx"));
const ExplorePage = lazy(() => import("./pages/ExplorePage.jsx"));
const LearnPage = lazy(() => import("./pages/LearnPage.jsx"));
const ActPage = lazy(() => import("./pages/ActPage.jsx"));
const CommunityPage = lazy(() => import("./pages/CommunityPage.jsx"));
const LoginPage = lazy(() => import("./pages/LoginPage.jsx"));
const RegisterPage = lazy(() => import("./pages/RegisterPage.jsx"));

function RouteFallback() {
  return <main className="page-message">Loading page...</main>;
}

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
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/" element={<Navigate to="/explore" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/health" element={<main className="page-message">Client ready</main>} />

          <Route path="/" element={<MainLayout />}>
            <Route path="explore" element={<ExplorePage />} />
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