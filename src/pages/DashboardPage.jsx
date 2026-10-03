import DashboardHeader from '../components/dashboard/DashboardHeader';
import StatCards from '../components/dashboard/StatCards';
import NetWorthChart from '../components/dashboard/NetWorthChart';
import CashFlowChart from '../components/dashboard/CashFlowChart';
import SpendingBreakdown from '../components/dashboard/SpendingBreakdown';
import BudgetHealth from '../components/dashboard/BudgetHealth';
import RecentTransactions from '../components/dashboard/RecentTransactions';
import UpcomingPayments from '../components/dashboard/UpcomingPayments';
import FinancialInsights from '../components/dashboard/FinancialInsights';
import GoalsProgress from '../components/dashboard/GoalsProgress';
import { useAuth } from '../context/AuthContext.jsx';

export default function DashboardPage({ currency = '₹' }) {
  const { userName, toggleTheme, signOut } = useAuth();

  return (
    <>
      <main className="dashboard-main">
        <DashboardHeader userName={userName.split(' ')[0]} onThemeToggle={toggleTheme} onSignOut={signOut} />

        <StatCards currency={currency} />

        <div className="dashboard-row" style={{ gridTemplateColumns: '2fr 1fr' }}>
          <NetWorthChart currency={currency} />
          <CashFlowChart currency={currency} />
        </div>

        <div className="dashboard-row" style={{ gridTemplateColumns: '1.2fr 1fr' }}>
          <SpendingBreakdown currency={currency} />
          <BudgetHealth currency={currency} />
        </div>

        <div className="dashboard-row" style={{ gridTemplateColumns: '1.6fr 1fr' }}>
          <RecentTransactions currency={currency} />
          <UpcomingPayments currency={currency} />
        </div>

        <div className="dashboard-row" style={{ gridTemplateColumns: '1fr 1fr' }}>
          <FinancialInsights />
          <GoalsProgress currency={currency} />
        </div>
      </main>

      <style>{`
        html[data-theme="dark"] .chart-card {
          box-shadow: none;
        }

        .dashboard-container {
          display: flex;
          width: 100%;
          min-width: 1100px;
        }

        .dashboard-main {
          flex: 1;
          min-width: 0;
          padding: 28px 40px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .dashboard-row {
          display: grid;
          gap: 20px;
        }

        @media (max-width: 1400px) {
          .dashboard-container {
            min-width: 100%;
          }

          .dashboard-main {
            padding: 20px 24px;
          }
        }

        @media (max-width: 1200px) {
          .dashboard-row[style*="2fr 1fr"] {
            grid-template-columns: 1fr !important;
          }

          .dashboard-row[style*="1.6fr 1fr"] {
            grid-template-columns: 1fr !important;
          }

          .dashboard-row[style*="1.2fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }

        @media (max-width: 768px) {
          .dashboard-container {
            flex-direction: column;
          }

          .dashboard-main {
            padding: 16px;
          }

          .dashboard-row {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
}
