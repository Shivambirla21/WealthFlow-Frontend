import { useState } from 'react';

export default function SettingsSecurity() {
  const [twoFactor, setTwoFactor] = useState(false);
  const [biometric, setBiometric] = useState(false);
  const [signInAlerts, setSignInAlerts] = useState(true);

  const sessions = [
    { icon: '💻', name: 'Chrome on Windows', location: 'Indore, India · This device', current: true },
    { icon: '📱', name: 'WealthFlow iOS app', location: 'Indore, India · 2 hours ago', current: false },
    { icon: '💻', name: 'Safari on macOS', location: 'Mumbai, India · 5 days ago', current: false },
  ];

  const Toggle = ({ on, onChange }) => (
    <div className={`toggle ${on ? 'on' : ''}`} onClick={() => onChange(!on)}></div>
  );

  return (
    <div className="settings-card">
      <h2>Security</h2>
      <div className="subtitle">Keep your account and data safe.</div>

      <div className="row">
        <div>
          <b>Password</b>
          <span className="subtitle">Last changed 3 months ago</span>
        </div>
        <button type="button" className="btn">Change password</button>
      </div>

      <div className="row">
        <div>
          <b>Two-factor authentication</b>
          <span className="subtitle">Add a second step when you sign in</span>
        </div>
        <Toggle on={twoFactor} onChange={setTwoFactor} />
      </div>

      <div className="row">
        <div>
          <b>Biometric unlock</b>
          <span className="subtitle">Use fingerprint or face on mobile</span>
        </div>
        <Toggle on={biometric} onChange={setBiometric} />
      </div>

      <div className="row">
        <div>
          <b>Sign-in alerts</b>
          <span className="subtitle">Email me when a new device signs in</span>
        </div>
        <Toggle on={signInAlerts} onChange={setSignInAlerts} />
      </div>

      <h2 style={{ marginTop: 22, fontSize: 16 }}>Active sessions</h2>
      {sessions.map((session, i) => (
        <div key={i} className="list-item">
          <div>
            <span className="icon">{session.icon}</span>
            <span>
              <b>{session.name}</b>
              <span className="subtitle">{session.location}</span>
            </span>
          </div>
          {session.current ? (
            <span className="status ok">✓ Current</span>
          ) : (
            <button type="button" className="btn">Sign out</button>
          )}
        </div>
      ))}

      <style>{`
        .settings-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 26px;
          max-width: 820px;
        }
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
        .list-item { display: flex; justify-content: space-between; align-items: center; padding: 14px 0; border-top: 1px solid var(--border); }
        .list-item:first-of-type { border-top: 0; }
        .list-item > div { display: flex; align-items: center; gap: 12px; }
        .icon { width: 38px; height: 38px; border-radius: 11px; background: var(--primary-soft); display: grid; place-items: center; font-size: 17px; }
        .list-item b { display: block; }
        .status { font-size: 11px; font-weight: 700; padding: 3px 10px; border-radius: 20px; }
        .status.ok { background: rgba(16, 185, 129, 0.14); color: var(--success); }
        .btn { padding: 10px 16px; border: 1px solid var(--border); border-radius: 10px; background: var(--surface); color: var(--text); font: 600 14px inherit; cursor: pointer; }
      `}</style>
    </div>
  );
}
