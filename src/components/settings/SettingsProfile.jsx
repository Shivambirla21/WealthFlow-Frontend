import { useState } from 'react';

export default function SettingsProfile() {
  const [fullName, setFullName] = useState('Shivam Birla');
  const [email, setEmail] = useState('shivam@example.com');
  const [currency, setCurrency] = useState('INR');
  const [timezone, setTimezone] = useState('IST');
  const [financialYear, setFinancialYear] = useState('apr-mar');
  const [financialGoal, setFinancialGoal] = useState('savings');

  const handleSave = () => {
    console.log('Profile saved');
  };

  return (
    <div className="settings-card">
      <h2>Profile</h2>
      <div className="subtitle">Your personal details.</div>

      <div className="row">
        <div style={{ display: 'flex', gap: 18, alignItems: 'center' }}>
          <div className="avatar">SB</div>
          <div>
            <b>Profile photo</b>
            <span className="subtitle">JPG or PNG, up to 2 MB</span>
          </div>
        </div>
        <div>
          <button type="button" className="btn">Upload</button>
          <button type="button" className="btn">Remove</button>
        </div>
      </div>

      <div className="row">
        <div>
          <b>Full name</b>
          <span className="subtitle">Shown across WealthFlow</span>
        </div>
        <input
          type="text"
          className="input"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
      </div>

      <div className="row">
        <div>
          <b>Email</b>
          <span className="subtitle">Used to sign in and for alerts</span>
        </div>
        <input
          type="email"
          className="input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="row">
        <div>
          <b>Currency</b>
          <span className="subtitle">Default currency for amounts</span>
        </div>
        <select className="select" value={currency} onChange={(e) => setCurrency(e.target.value)}>
          <option value="INR">₹ Indian Rupee (INR)</option>
          <option value="USD">$ US Dollar (USD)</option>
          <option value="EUR">€ Euro (EUR)</option>
          <option value="GBP">£ British Pound (GBP)</option>
        </select>
      </div>

      <div className="row">
        <div>
          <b>Timezone</b>
          <span className="subtitle">Used for due dates and reports</span>
        </div>
        <select className="select" value={timezone} onChange={(e) => setTimezone(e.target.value)}>
          <option value="IST">(GMT+5:30) India Standard Time</option>
          <option value="GMT">(GMT+0:00) London</option>
          <option value="EST">(GMT−5:00) New York</option>
        </select>
      </div>

      <div className="row">
        <div>
          <b>Financial year</b>
          <span className="subtitle">Used for tax reports</span>
        </div>
        <select className="select" value={financialYear} onChange={(e) => setFinancialYear(e.target.value)}>
          <option value="apr-mar">April – March</option>
          <option value="jan-dec">January – December</option>
        </select>
      </div>

      <div className="row">
        <div>
          <b>Primary financial goal</b>
          <span className="subtitle">Helps tailor your insights</span>
        </div>
        <select className="select" value={financialGoal} onChange={(e) => setFinancialGoal(e.target.value)}>
          <option value="savings">Build savings</option>
          <option value="debt">Manage debt</option>
          <option value="investments">Grow investments</option>
          <option value="networth">Understand net worth</option>
        </select>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 10 }}>
        <button type="button" className="btn">Cancel</button>
        <button type="button" className="btn primary" onClick={handleSave}>Save changes</button>
      </div>

      <style>{`
        .settings-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 26px;
          max-width: 820px;
        }

        .settings-card h2 {
          font-size: 20px;
          letter-spacing: -0.4px;
          margin-bottom: 4px;
        }

        .subtitle {
          color: var(--text-muted);
          font-size: 13px;
        }

        .settings-card > .subtitle {
          margin-bottom: 18px;
        }

        .row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          padding: 16px 0;
          border-top: 1px solid var(--border);
        }

        .row:first-of-type {
          border-top: 0;
        }

        .row b {
          display: block;
          margin-bottom: 2px;
        }

        .avatar {
          width: 76px;
          height: 76px;
          border-radius: 50%;
          background: var(--primary);
          color: #fff;
          display: grid;
          place-items: center;
          font-size: 26px;
          font-weight: 700;
          flex: none;
        }

        .input,
        .select {
          padding: 10px 14px;
          border: 1px solid var(--border);
          border-radius: 10px;
          background: var(--bg);
          color: var(--text);
          font: inherit;
          outline: none;
          min-width: 240px;
        }

        .input:focus,
        .select:focus {
          border-color: var(--primary);
          box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.25);
        }

        .btn {
          padding: 10px 16px;
          border: 1px solid var(--border);
          border-radius: 10px;
          background: var(--surface);
          color: var(--text);
          font: 600 14px inherit;
          cursor: pointer;
        }

        .btn.primary {
          background: var(--primary);
          border-color: var(--primary);
          color: #fff;
        }

        .btn.primary:hover {
          background: #7468FF;
        }
      `}</style>
    </div>
  );
}
