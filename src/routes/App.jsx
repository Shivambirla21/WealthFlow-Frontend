import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { AuthProvider, useAuth } from '../context/AuthContext.jsx';
import LandingPage from '../pages/LandingPage.jsx';
import LoginPage from '../pages/LoginPage.jsx';
import DashboardPage from '../pages/DashboardPage.jsx';
import SpeedometerPage from '../pages/SpeedometerPage.jsx';
import WealthChartPage from '../pages/WealthChartPage.jsx';
import TransactionsPage from '../pages/TransactionsPage.jsx';
import BudgetsPage from '../pages/BudgetsPage.jsx';
import CashFlowPage from '../pages/CashFlowPage.jsx';
import GoalsPage from '../pages/GoalsPage.jsx';
import NetWorthPage from '../pages/NetWorthPage.jsx';
import InvestmentsPage from '../pages/InvestmentsPage.jsx';
import AssetsPage from '../pages/AssetsPage.jsx';
import LiabilitiesPage from '../pages/LiabilitiesPage.jsx';
import RecurringPage from '../pages/RecurringPage.jsx';
import ReportsPage from '../pages/ReportsPage.jsx';
import InsightsPage from '../pages/InsightsPage.jsx';
import SettingsPage from '../pages/SettingsPage.jsx';
import SectionPage from '../pages/SectionPage.jsx';
import GlobalSidebar from '../components/layout/GlobalSidebar.jsx';

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
              <Route path="/speedometer" element={<SpeedometerPage />} />
              <Route path="/wealth-chart" element={<WealthChartPage />} />
              <Route path="/transactions" element={<TransactionsPage />} />
              <Route path="/budgets" element={<BudgetsPage />} />
              <Route path="/cash-flow" element={<CashFlowPage />} />
              <Route path="/goals" element={<GoalsPage />} />
              <Route path="/net-worth" element={<NetWorthPage />} />
              <Route path="/investments" element={<InvestmentsPage />} />
              <Route path="/assets" element={<AssetsPage />} />
              <Route path="/liabilities" element={<LiabilitiesPage />} />
              <Route path="/recurring" element={<RecurringPage />} />
              <Route path="/reports" element={<ReportsPage />} />
              <Route path="/insights" element={<InsightsPage />} />
              <Route path="/help" element={<SectionPage title="Help" />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
