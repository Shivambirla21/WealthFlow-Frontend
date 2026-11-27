import { useState } from 'react';

export default function SettingsCurrency() {
  const [selectedCurrency, setSelectedCurrency] = useState(0);
  const [numberFormat, setNumberFormat] = useState('indian');

  const currencies = [
    { symbol: '₹', code: 'INR' },
    { symbol: '$', code: 'USD' },
    { symbol: '€', code: 'EUR' },
    { symbol: '£', code: 'GBP' },
  ];

  const OptionButtons = ({ options, selected, onSelect }) => (
    <div className="options">
      {options.map((opt, i) => (
        <div key={i} className={selected === i ? 'on' : ''} onClick={() => onSelect(i)}>
          {opt[0]}
          {opt[1] && <small>{opt[1]}</small>}
        </div>
      ))}
    </div>
  );

  return (
    <div className="settings-card">
      <h2>Currency</h2>
      <div className="subtitle">Choose how amounts are shown across WealthFlow.</div>

      <div className="currency-grid">
        {currencies.map((c, i) => (
          <div key={i} className={selectedCurrency === i ? 'on' : ''} onClick={() => setSelectedCurrency(i)}>
            <b>{c.symbol}</b>
            <span>{c.code}</span>
          </div>
        ))}
      </div>

      <div className="row">
        <div>
          <b>Number format</b>
          <span className="subtitle">How large numbers are grouped</span>
        </div>
        <OptionButtons
          options={[['Indian', '12,84,000'], ['International', '1,284,000']]}
          selected={numberFormat === 'indian' ? 0 : 1}
          onSelect={(i) => setNumberFormat(i === 0 ? 'indian' : 'international')}
        />
      </div>

      <div className="preview">
        <div>
          <div className="subtitle">Example</div>
          <b>{currencies[selectedCurrency].symbol}{numberFormat === 'indian' ? '12,84,000' : '1,284,000'}</b>
        </div>
        <span className="subtitle">Portfolio value</span>
      </div>

      <style>{`
        .settings-card { background: var(--surface); border: 1px solid var(--border); border-radius: 16px; padding: 26px; max-width: 820px; }
        .settings-card h2 { font-size: 20px; letter-spacing: -0.4px; margin-bottom: 4px; }
        .subtitle { color: var(--text-muted); font-size: 13px; }
        .settings-card > .subtitle { margin-bottom: 18px; }
        .row { display: flex; justify-content: space-between; align-items: center; gap: 20px; padding: 16px 0; border-top: 1px solid var(--border); }
        .row b { display: block; margin-bottom: 2px; }
        .currency-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; }
        .currency-grid div { border: 1px solid var(--border); border-radius: 12px; padding: 14px; cursor: pointer; text-align: center; }
        .currency-grid div.on { border-color: var(--primary); background: var(--primary-soft); box-shadow: 0 0 0 1px var(--primary); }
        .currency-grid b { font-size: 22px; display: block; }
        .currency-grid span { color: var(--text-muted); font-size: 12px; }
        .options { display: flex; gap: 10px; }
        .options div { padding: 12px 16px; border: 1px solid var(--border); border-radius: 12px; cursor: pointer; text-align: center; min-width: 104px; font-weight: 600; font-size: 13px; color: var(--text-muted); }
        .options div.on { border-color: var(--primary); background: var(--primary-soft); color: var(--text); box-shadow: 0 0 0 1px var(--primary); }
        .options small { display: block; font-weight: 500; margin-top: 2px; font-size: 11px; }
        .preview { margin-top: 14px; padding: 16px; border: 1px dashed var(--border); border-radius: 12px; display: flex; justify-content: space-between; align-items: center; }
        .preview b { font-size: 24px; letter-spacing: -0.8px; }
      `}</style>
    </div>
  );
}
