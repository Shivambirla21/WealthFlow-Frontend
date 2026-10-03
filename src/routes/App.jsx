import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { AuthProvider, useAuth } from '../context/AuthContext.jsx';
import LandingPage from '../pages/LandingPage.jsx';
import LoginPage from '../pages/LoginPage.jsx';
import DashboardPage from '../pages/DashboardPage.jsx';
import TransactionsPage from '../pages/TransactionsPage.jsx';
import SectionPage from '../pages/SectionPage.jsx';
import GlobalSidebar from '../pages/layout/GlobalSidebar.jsx';

function GuestOnly() {
  const { ready, currentUser } = useAuth();
  if (!ready) return null;
  if (currentUser) return <Navigate to="/dashboard" replace />;
  return <Outlet />;
}

function RequireAuth() {
  const { ready, currentUser } = useAuth();
  if (!ready) return null;
  if (!currentUser) return <Navigate to="/login" replace />;
  return <Outlet />;
}

function AppLayout() {
  return (
    <div className="app-shell">
      <GlobalSidebar />
      <Outlet />
      <style>{`
        .app-shell {
          display: flex;
          width: 100%;
          min-height: 100vh;
          background: var(--color-bg);
          color: var(--color-text);
          font-family: Inter, ui-sans-serif, system-ui, sans-serif;
          font-size: 14px;
          line-height: 1.5;
          font-variant-numeric: tabular-nums;
        }
      `}</style>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<GuestOnly />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage mode="login" />} />
            <Route path="/signup" element={<LoginPage mode="signup" />} />
          </Route>

          <Route element={<RequireAuth />}>
            <Route element={<AppLayout />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/transactions" element={<TransactionsPage />} />
              <Route path="/budgets" element={<SectionPage title="Budgets" />} />
              <Route path="/cash-flow" element={<SectionPage title="Cash Flow" />} />
              <Route path="/goals" element={<SectionPage title="Goals" />} />
              <Route path="/net-worth" element={<SectionPage title="Net Worth" />} />
              <Route path="/investments" element={<SectionPage title="Investments" />} />
              <Route path="/assets" element={<SectionPage title="Assets" />} />
              <Route path="/liabilities" element={<SectionPage title="Liabilities" />} />
              <Route path="/recurring" element={<SectionPage title="Recurring" />} />
              <Route path="/reports" element={<SectionPage title="Reports" />} />
              <Route path="/insights" element={<SectionPage title="Insights" />} />
              <Route path="/help" element={<SectionPage title="Help" />} />
              <Route path="/settings" element={<SectionPage title="Settings" />} />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
