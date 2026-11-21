const assets = [
  { name: 'Cash', icon: '💵', value: 32420, change: 2.1, description: 'HDFC Savings, SBI, Wallet', color: '#14B8A6' },
  { name: 'Investments', icon: '📈', value: 48600, change: 4.3, description: 'Mutual funds, SIPs, Stocks', color: '#635BFF' },
  { name: 'Property', icon: '🏠', value: 14800, change: 0.8, description: 'Land share', color: '#60A5FA' },
  { name: 'Other assets', icon: '🧳', value: 10000, change: 0.0, description: 'Gold, vehicle', color: '#F59E0B' }
];

export default function AssetsList({ currency = '₹', total = 105820 }) {
  const formatCurrency = (value) => `${currency}${value.toLocaleString('en-IN')}`;

  return (
    <div className="assets-list">
      {assets.map((asset) => (
        <div key={asset.name} className="item">
          <div className="icon">{asset.icon}</div>
          <div>
            <b>{asset.name}</b>
            <span className="label">{asset.description}</span>
            <div className="bar">
              <i style={{ width: `${(asset.value / total) * 100}%`, background: asset.color }}></i>
            </div>
          </div>
          <div className="right">
            <b>{formatCurrency(asset.value)}</b>
            <span className={asset.change >= 0 ? 'up' : 'dn'} style={{ fontSize: 12 }}>
              {asset.change >= 0 ? '↑ +' : '↓ −'}{Math.abs(asset.change)}%
            </span>
          </div>
        </div>
      ))}

      <style>{`
        .assets-list {
          margin-top: 8px;
        }

        .item {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 13px 0;
          border-bottom: 1px solid var(--border);
        }

        .item:last-child {
          border: 0;
        }

        .icon {
          width: 38px;
          height: 38px;
          border-radius: 11px;
          background: var(--primary-soft);
          display: grid;
          place-items: center;
          font-size: 17px;
        }

        .item > div:nth-child(2) {
          flex: 1;
        }

        .item b {
          display: block;
        }

        .right {
          text-align: right;
        }

        .label {
          color: var(--text-muted);
          font-size: 13px;
        }

        .bar {
          height: 6px;
          background: var(--bg);
          border-radius: 6px;
          overflow: hidden;
          margin-top: 6px;
        }

        .bar i {
          display: block;
          height: 100%;
          border-radius: 6px;
        }

        .up {
          color: var(--success);
        }

        .dn {
          color: var(--danger);
        }
      `}</style>
    </div>
  );
}
