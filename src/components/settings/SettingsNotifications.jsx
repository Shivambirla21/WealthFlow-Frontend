import { useState } from 'react';

export default function SettingsNotifications() {
  const [quietHours, setQuietHours] = useState(true);
  const notificationTypes = [
    { name: 'Budget warnings', desc: 'When a category nears or passes its limit', email: true, push: true, inApp: true },
    { name: 'Upcoming payments', desc: 'Bills and EMIs due in the next 3 days', email: true, push: true, inApp: true },
    { name: 'Goal milestones', desc: 'When you reach 25%, 50%, 75% and 100%', email: true, push: true, inApp: true },
    { name: 'Large transactions', desc: 'Single transactions above ₹10,000', email: false, push: true, inApp: true },
    { name: 'Unusual spending', desc: 'Spending that differs from your pattern', email: false, push: true, inApp: true },
    { name: 'Account sync', desc: 'When a connected account fails to sync', email: true, push: false, inApp: true },
    { name: 'System', desc: 'Product updates and security notices', email: false, push: false, inApp: true },
  ];

  const Toggle = ({ on, onChange }) => (
    <div className={`toggle ${on ? 'on' : ''}`} onClick={() => onChange(!on)}></div>
  );

  return (
    <div className="settings-card">
      <h2>Notifications</h2>
      <div className="subtitle">Choose what you hear about and where.</div>

      <div className="matrix header">
        <span></span>
        <span>Email</span>
        <span>Push</span>
        <span>In-app</span>
      </div>

      {notificationTypes.map((item, i) => (
        <div key={i} className="matrix">
          <div>
            <b>{item.name}</b>
            <span className="subtitle">{item.desc}</span>
          </div>
          <Toggle on={item.email} onChange={() => {}} />
          <Toggle on={item.push} onChange={() => {}} />
          <Toggle on={item.inApp} onChange={() => {}} />
        </div>
      ))}

      <div className="row">
        <div>
          <b>Quiet hours</b>
          <span className="subtitle">Pause push alerts overnight (10 PM – 7 AM)</span>
        </div>
        <Toggle on={quietHours} onChange={setQuietHours} />
      </div>

      <style>{`
        .settings-card { background: var(--surface); border: 1px solid var(--border); border-radius: 16px; padding: 26px; max-width: 820px; }
        .settings-card h2 { font-size: 20px; letter-spacing: -0.4px; margin-bottom: 4px; }
        .subtitle { color: var(--text-muted); font-size: 13px; }
        .settings-card > .subtitle { margin-bottom: 18px; }
        .row { display: flex; justify-content: space-between; align-items: center; gap: 20px; padding: 16px 0; border-top: 1px solid var(--border); }
        .row b { display: block; margin-bottom: 2px; }
        .matrix { display: grid; grid-template-columns: 1fr 70px 70px 70px; align-items: center; gap: 10px; padding: 13px 0; border-top: 1px solid var(--border); }
        .matrix.header { color: var(--text-muted); font-size: 12px; border: 0; padding: 0 0 8px; }
        .matrix.header span:not(:first-child) { text-align: center; }
        .toggle { width: 42px; height: 24px; border-radius: 24px; background: var(--border); position: relative; cursor: pointer; margin: auto; transition: 0.2s; }
        .toggle:after { content: ''; position: absolute; left: 3px; top: 3px; width: 18px; height: 18px; border-radius: 50%; background: #fff; transition: 0.2s; }
        .toggle.on { background: var(--primary); }
        .toggle.on:after { left: 21px; }
      `}</style>
    </div>
  );
}
