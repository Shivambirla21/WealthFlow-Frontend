import GlobalHeader from '../components/layout/GlobalHeader.jsx';
import CashFlowSummary from '../components/cash-flow/CashFlowSummary';
import IncomeVsExpenses from '../components/cash-flow/IncomeVsExpenses';
import CashFlowTrend from '../components/cash-flow/CashFlowTrend';
import CashFlowByCategory from '../components/cash-flow/CashFlowByCategory';
import MonthlyComparison from '../components/cash-flow/MonthlyComparison';
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
