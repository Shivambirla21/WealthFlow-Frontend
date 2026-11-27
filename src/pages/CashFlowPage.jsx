import GlobalHeader from '../components/layout/GlobalHeader.jsx';
import CashFlowSummary from '../components/cashflow/CashFlowSummary';
import IncomeVsExpenses from '../components/cashflow/IncomeVsExpenses';
import CashFlowTrend from '../components/cashflow/CashFlowTrend';
import CashFlowByCategory from '../components/cashflow/CashFlowByCategory';
import MonthlyComparison from '../components/cashflow/MonthlyComparison';
import { useAuth } from '../context/AuthContext.jsx';

export default function CashFlowPage() {
  const { toggleTheme } = useAuth();

  const handleThemeToggle = () => {
    const html = document.documentElement;
    html.dataset.theme = html.dataset.theme === 'dark' ? 'light' : 'dark';
  };

  const handleAdd = () => {
    console.log('Add clicked');
  };

  return (
    <>
      <main className="cashflow-main">
        <GlobalHeader
          title="Cash Flow"
          subtitle="Money in, money out, and what's left"
          showSearch={false}
          showAddButton={true}
          addButtonText="Add"
          onAddClick={handleAdd}
          onThemeToggle={handleThemeToggle}
        />

        <CashFlowSummary />

        <IncomeVsExpenses />

        <div className="cashflow-row equal">
          <CashFlowTrend />
          <CashFlowByCategory />
        </div>

        <MonthlyComparison />
      </main>

      <style>{`
        .cashflow-main {
          flex: 1;
          min-width: 0;
          padding: 28px 40px 48px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .cashflow-row {
          display: grid;
          gap: 20px;
        }

        .cashflow-row.equal {
          grid-template-columns: 1fr 1fr;
        }

        @media (max-width: 1400px) {
          .cashflow-main {
            padding: 20px 24px;
          }
        }

        @media (max-width: 768px) {
          .cashflow-main {
            padding: 16px;
          }

          .cashflow-row {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
}
