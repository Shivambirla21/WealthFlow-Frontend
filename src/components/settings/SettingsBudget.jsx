import { useState } from 'react';

export default function SettingsBudget() {
  const [defaultBudget, setDefaultBudget] = useState('₹60,000');
  const [monthStart, setMonthStart] = useState('1st');
  const [alertThreshold, setAlertThreshold] = useState(80);
  const [rollover, setRollover] = useState(false);
  const [autoFill, setAutoFill] = useState(true);

  const Toggle = ({ on, onChange }) => (
    <div className={`toggle ${on ? 'on' : ''}`} onClick={() => onChange(!on)}></div>
  );

  return (
    <div className="settings-card">
      <h2>Budget preferences</h2>
      <div className="subtitle">Defaults for how budgets behave.</div>

      <div className="row">
        <div>
          <b>Default monthly budget</b>
          <span className="subtitle">Used when you create a new month</span>
        </div>
        <input type="text" className="input" value={defaultBudget} onChange={(e) => setDefaultBudget(e.target.value)} />
      </div>

      <div className="row">
        <div>
          <b>Month starts on</b>
          <span className="subtitle">Day your budget month begins</span>
        </div>
        <select className="select" value={monthStart} onChange={(e) => setMonthStart(e.target.value)}>
          <option value="1st">1st</option>
          <option value="25th">25th</option>
          <option value="28th">28th</option>
        </select>
      </div>

      <div className="row">
        <div>
          <b>Alert threshold</b>
          <span className="subtitle">Warn me when a category reaches this level</span>
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <input type="range" min="50" max="100" value={alertThreshold} onChange={(e) => setAlertThreshold(parseInt(e.target.value))} />
          <b>{alertThreshold}%</b>
        </div>
      </div>

      <div className="row">
        <div>
          <b>Roll over unused budget</b>
          <span className="subtitle">Carry what's left into next month</span>
        </div>
        <Toggle on={rollover} onChange={setRollover} />
      </div>

      <div className="row">
        <div>
          <b>Include recurring bills automatically</b>
          <span className="subtitle">Pre-fill budgets with known payments</span>
        </div>
        <Toggle on={autoFill} onChange={setAutoFill} />
      </div>

      <style>{`
        .settings-card { background: var(--surface); border: 1px solid var(--border); border-radius: 16px; padding: 26px; max-width: 820px; }
        .settings-card h2 { font-size: 20px; letter-spacing: -0.4px; margin-bottom: 4px; }
        .subtitle { color: var(--text-muted); font-size: 13px; }
        .settings-card > .subtitle { margin-bottom: 18px; }
        .row { display: flex; justify-content: space-between; align-items: center; gap: 20px; padding: 16px 0; border-top: 1px solid var(--border); }
        .row:first-of-type { border-top: 0; }
        .row b { display: block; margin-bottom: 2px; }
        .input, .select { padding: 10px 14px; border: 1px solid var(--border); border-radius: 10px; background: var(--bg); color: var(--text); font: inherit; outline: none; min-width: 240px; }
        .input:focus, .select:focus { border-color: var(--primary); box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.25); }
        .toggle { width: 42px; height: 24px; border-radius: 24px; background: var(--border); position: relative; cursor: pointer; flex: none; transition: 0.2s; }
        .toggle:after { content: ''; position: absolute; left: 3px; top: 3px; width: 18px; height: 18px; border-radius: 50%; background: #fff; transition: 0.2s; }
        .toggle.on { background: var(--primary); }
        .toggle.on:after { left: 21px; }
      `}</style>
    </div>
  );
}
