import { useState } from 'react';

export default function SettingsPrivacy() {
  const [hideBalances, setHideBalances] = useState(false);
  const [personalizedInsights, setPersonalizedInsights] = useState(true);
  const [anonymousData, setAnonymousData] = useState(false);

  const Toggle = ({ on, onChange }) => (
    <div className={`toggle ${on ? 'on' : ''}`} onClick={() => onChange(!on)}></div>
  );

  return (
    <div className="settings-card">
      <h2>Data & Privacy</h2>
      <div className="subtitle">You decide how your information is used.</div>

      <div className="row">
        <div>
          <b>Hide balances on launch</b>
          <span className="subtitle">Mask amounts until you tap to reveal</span>
        </div>
        <Toggle on={hideBalances} onChange={setHideBalances} />
      </div>

      <div className="row">
        <div>
          <b>Personalized insights</b>
          <span className="subtitle">Use your data to generate tips inside the app</span>
        </div>
        <Toggle on={personalizedInsights} onChange={setPersonalizedInsights} />
      </div>

      <div className="row">
        <div>
          <b>Share anonymous usage data</b>
          <span className="subtitle">Helps improve WealthFlow. Never includes your transactions</span>
        </div>
        <Toggle on={anonymousData} onChange={setAnonymousData} />
      </div>

      <div className="row">
        <div>
          <b>Read-only account access</b>
          <span className="subtitle">WealthFlow can view but never move your money</span>
        </div>
        <span className="status ok">✓ Always on</span>
      </div>

      <div className="row">
        <div>
          <b>Your data is never sold</b>
          <span className="subtitle">We don't sell or share your financial data with advertisers</span>
        </div>
        <span className="status ok">✓ Guaranteed</span>
      </div>

      <style>{`
        .settings-card { background: var(--surface); border: 1px solid var(--border); border-radius: 16px; padding: 26px; max-width: 820px; }
        .settings-card h2 { font-size: 20px; letter-spacing: -0.4px; margin-bottom: 4px; }
        .subtitle { color: var(--text-muted); font-size: 13px; }
        .settings-card > .subtitle { margin-bottom: 18px; }
        .row { display: flex; justify-content: space-between; align-items: center; gap: 20px; padding: 16px 0; border-top: 1px solid var(--border); }
        .row:first-of-type { border-top: 0; }
        .row b { display: block; margin-bottom: 2px; }
        .toggle { width: 42px; height: 24px; border-radius: 24px; background: var(--border); position: relative; cursor: pointer; flex: none; transition: 0.2s; }
        .toggle:after { content: ''; position: absolute; left: 3px; top: 3px; width: 18px; height: 18px; border-radius: 50%; background: #fff; transition: 0.2s; }
        .toggle.on { background: var(--primary); }
        .toggle.on:after { left: 21px; }
        .status { font-size: 11px; font-weight: 700; padding: 3px 10px; border-radius: 20px; }
        .status.ok { background: rgba(16, 185, 129, 0.14); color: var(--success); }
      `}</style>
    </div>
  );
}
