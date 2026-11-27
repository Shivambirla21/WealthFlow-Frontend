import GlobalHeader from '../components/layout/GlobalHeader.jsx';
import NetWorthHero from '../components/networth/NetWorthHero';
import NetWorthChart from '../components/networth/NetWorthChart';
import AssetsList from '../components/networth/AssetsList';
import LiabilitiesList from '../components/networth/LiabilitiesList';
import AssetsVsLiabilities from '../components/networth/AssetsVsLiabilities';
import { useAuth } from '../context/AuthContext.jsx';

export default function NetWorthPage() {
  const { toggleTheme } = useAuth();

  const handleThemeToggle = () => {
    const html = document.documentElement;
    html.dataset.theme = html.dataset.theme === 'dark' ? 'light' : 'dark';
  };

  const handleAddAsset = () => {
    console.log('Add asset clicked');
  };

  return (
    <>
      <main className="networth-main">
        <GlobalHeader
          title="Net Worth"
          subtitle="Your total wealth at a glance"
          showSearch={false}
          showAddButton={true}
          addButtonText="Add asset"
          onAddClick={handleAddAsset}
          onThemeToggle={handleThemeToggle}
        />

        <NetWorthHero />

        <div className="chart-container">
          <NetWorthChart />
        </div>

        <div className="two-column">
          <div className="card">
            <h3>Assets <span style={{ color: 'var(--success)' }}>₹1,05,820</span></h3>
            <div className="subtitle">Everything you own</div>
            <AssetsList />
          </div>
          <div className="card">
            <h3>Liabilities <span style={{ color: 'var(--danger)' }}>₹21,200</span></h3>
            <div className="subtitle">Everything you owe</div>
            <LiabilitiesList />
          </div>
        </div>

        <AssetsVsLiabilities />
      </main>

      <style>{`
        .networth-main {
          flex: 1;
          min-width: 0;
          padding: 28px 40px 56px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .chart-container {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 18px;
          padding: 26px;
        }

        .two-column {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 18px;
          padding: 26px;
        }

        .card h3 {
          font-size: 17px;
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 6px;
        }

        .card h3 span {
          font-size: 20px;
          letter-spacing: -0.5px;
        }

        .subtitle {
          color: var(--text-muted);
          font-size: 13px;
        }

        @media (max-width: 1400px) {
          .networth-main {
            padding: 20px 24px;
          }
        }

        @media (max-width: 768px) {
          .networth-main {
            padding: 16px;
          }

          .two-column {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}
