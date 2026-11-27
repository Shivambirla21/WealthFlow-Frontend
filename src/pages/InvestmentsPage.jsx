import { useState } from 'react';
import GlobalHeader from '../components/layout/GlobalHeader.jsx';
import InvestmentsSummary from '../components/investments/InvestmentsSummary.jsx';
import PortfolioPerformance from '../components/investments/PortfolioPerformance.jsx';
import InvestmentReturns from '../components/investments/InvestmentReturns.jsx';
import AssetAllocation from '../components/investments/AssetAllocation.jsx';
import HoldingsTable from '../components/investments/HoldingsTable.jsx';

export default function InvestmentsPage() {
  const [assetFilter, setAssetFilter] = useState('All');

  const handleThemeToggle = () => {
    const html = document.documentElement;
    html.dataset.theme = html.dataset.theme === 'dark' ? 'light' : 'dark';
  };

  const handleFilterChange = (filter) => {
    setAssetFilter(filter);
  };

  return (
    <div className="investments-page">
      <GlobalHeader
        title="Investments"
        subtitle="How are your investments performing?"
        showSearch={true}
        showAddButton={true}
        addButtonText="Add investment"
        onThemeToggle={handleThemeToggle}
      />
      <InvestmentsSummary />
      <div className="two-column">
        <PortfolioPerformance />
        <InvestmentReturns />
      </div>
      <AssetAllocation onFilterChange={handleFilterChange} />
      <HoldingsTable assetFilter={assetFilter} />
      <style>{`
        .investments-page {
          flex: 1;
          min-width: 0;
          padding: 28px 40px 56px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .two-column {
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: 20px;
        }

        @media (max-width: 1200px) {
          .two-column {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
