import { useState } from 'react';
import GlobalHeader from '../components/layout/GlobalHeader.jsx';
import BudgetSummary from '../components/budgets/BudgetSummary';
import BudgetFilters from '../components/budgets/BudgetFilters';
import BudgetCard from '../components/budgets/BudgetCard';
import BudgetVsActual from '../components/budgets/BudgetVsActual';
import BudgetAlerts from '../components/budgets/BudgetAlerts';
import MonthlySpending from '../components/budgets/MonthlySpending';
import BudgetUtilization from '../components/budgets/BudgetUtilization';
import { useAuth } from '../context/AuthContext.jsx';

export default function BudgetsPage() {
  const { toggleTheme } = useAuth();
  const [filter, setFilter] = useState('all');

  const handleThemeToggle = () => {
    const html = document.documentElement;
    html.dataset.theme = html.dataset.theme === 'dark' ? 'light' : 'dark';
  };

  const handleCreateBudget = () => {
    console.log('Create budget clicked');
  };

  return (
    <>
      <main className="budgets-main">
        <GlobalHeader
          title="Budgets"
          subtitle="Plan your spending and stay on track"
          showSearch={false}
          showAddButton={true}
          addButtonText="Create budget"
          onAddClick={handleCreateBudget}
          onThemeToggle={handleThemeToggle}
        />

        <BudgetSummary />

        <BudgetFilters activeFilter={filter} onFilterChange={setFilter} />

        <BudgetCard filter={filter} />

        <div className="budgets-row" style={{ gridTemplateColumns: '1.5fr 1fr' }}>
          <BudgetVsActual />
          <BudgetAlerts />
        </div>

        <div className="budgets-row" style={{ gridTemplateColumns: '1fr 1fr' }}>
          <MonthlySpending />
          <BudgetUtilization />
        </div>
      </main>

      <style>{`
        .budgets-main {
          flex: 1;
          min-width: 0;
          padding: 28px 40px 48px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .budgets-row {
          display: grid;
          gap: 20px;
        }

        @media (max-width: 1400px) {
          .budgets-main {
            padding: 20px 24px;
          }
        }

        @media (max-width: 1200px) {
          .budgets-row[style*="1.5fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }

        @media (max-width: 768px) {
          .budgets-main {
            padding: 16px;
          }

          .budgets-row {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
}
