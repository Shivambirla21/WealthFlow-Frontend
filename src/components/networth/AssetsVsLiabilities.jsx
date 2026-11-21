export default function AssetsVsLiabilities({ currency = '₹', assets = 105820, liabilities = 21200 }) {
  const assetsPercentage = (assets / (assets + liabilities)) * 100;
  const liabilitiesPercentage = (liabilities / (assets + liabilities)) * 100;
  const ratio = assets / liabilities;

  return (
    <div className="assets-vs-liabilities">
      <h3>Assets vs Liabilities</h3>
      <div className="subtitle">You own ₹{Math.round(ratio).toFixed(0)} for every ₹1 you owe.</div>

      <div className="vs-bar">
        <div style={{ width: `${assetsPercentage}%`, background: 'var(--success)' }}>
          Assets · {assetsPercentage.toFixed(1)}%
        </div>
        <div style={{ width: `${liabilitiesPercentage}%`, background: 'var(--danger)' }}></div>
      </div>

      <div className="legend" style={{ margin: 0 }}>
        <span><i className="dot" style={{ background: 'var(--success)' }}></i>Assets {currency}{assets.toLocaleString()}</span>
        <span><i className="dot" style={{ background: 'var(--danger)' }}></i>Liabilities {currency}{liabilities.toLocaleString()} · {liabilitiesPercentage.toFixed(1)}%</span>
      </div>

      <div className="key-3">
        <div>
          <span className="label">Debt-to-asset ratio</span>
          <span>{((liabilities / assets) * 100).toFixed(1)}%</span>
        </div>
        <div>
          <span className="label">Liquid cash coverage</span>
          <span>{(assets / liabilities).toFixed(1)}× debt</span>
        </div>
        <div>
          <span className="label">12-month growth</span>
          <span style={{ color: 'var(--success)' }}>↑ +36.1%</span>
        </div>
      </div>

      <style>{`
        .assets-vs-liabilities {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 18px;
          padding: 26px;
        }

        .assets-vs-liabilities h3 {
          font-size: 17px;
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 6px;
        }

        .subtitle {
          color: var(--text-muted);
          font-size: 13px;
        }

        .vs-bar {
          display: flex;
          height: 44px;
          border-radius: 12px;
          overflow: hidden;
          margin: 16px 0 12px;
          gap: 3px;
        }

        .vs-bar div {
          display: flex;
          align-items: center;
          padding: 0 14px;
          font-weight: 600;
          font-size: 13px;
          color: #fff;
        }

        .legend {
          display: flex;
          gap: 18px;
          font-size: 12px;
          color: var(--text-muted);
          margin-top: 8px;
        }

        .dot {
          display: inline-block;
          width: 9px;
          height: 9px;
          border-radius: 3px;
          margin-right: 6px;
        }

        .key-3 {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-top: 20px;
        }

        .key-3 > div {
          background: var(--bg);
          border-radius: 14px;
          padding: 14px 16px;
        }

        .key-3 span:first-child {
          display: block;
          font-size: 12px;
          color: var(--text-muted);
        }

        .key-3 span:last-child {
          display: block;
          font-size: 20px;
          letter-spacing: -0.5px;
          margin-top: 2px;
          font-weight: 600;
        }

        @media (max-width: 768px) {
          .key-3 {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
