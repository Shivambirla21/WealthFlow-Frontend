import { useState } from 'react';

export default function SettingsAppearance() {
  const [theme, setTheme] = useState('dark');
  const [density, setDensity] = useState('comfortable');
  const [accentColor, setAccentColor] = useState('#635BFF');
  const [smoothCharts, setSmoothCharts] = useState(true);
  const [gridlines, setGridlines] = useState(true);
  const [animate, setAnimate] = useState(true);

  const colors = ['#635BFF', '#0EA5E9', '#14B8A6', '#F59E0B', '#EC4899'];

  const handleThemeChange = (mode) => {
    setTheme(mode);
    const html = document.documentElement;
    if (mode === 'system') {
      html.dataset.theme = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    } else {
      html.dataset.theme = mode;
    }
  };

  const handleColorChange = (color) => {
    setAccentColor(color);
    document.documentElement.style.setProperty('--primary', color);
  };

  const OptionButtons = ({ options, selected, onSelect, smallLabels }) => (
    <div className="options">
      {options.map((opt, i) => (
        <div
          key={i}
          className={selected === i ? 'on' : ''}
          onClick={() => onSelect(i)}
        >
          {opt[0]}
          {opt[1] && <small>{opt[1]}</small>}
        </div>
      ))}
    </div>
  );

  const Toggle = ({ on, onChange }) => (
    <div className={`toggle ${on ? 'on' : ''}`} onClick={() => onChange(!on)}></div>
  );

  return (
    <div className="settings-card">
      <h2>Appearance</h2>
      <div className="subtitle">Make WealthFlow feel like yours. Changes apply instantly.</div>

      <div className="row">
        <div>
          <b>Theme</b>
          <span className="subtitle">Light, dark or follow your device</span>
        </div>
        <OptionButtons
          options={[['☀ Light'], ['🌙 Dark'], ['◐ System']]}
          selected={theme === 'light' ? 0 : theme === 'dark' ? 1 : 2}
          onSelect={handleThemeChange}
        />
      </div>

      <div className="row">
        <div>
          <b>Dashboard density</b>
          <span className="subtitle">How much space between elements</span>
        </div>
        <OptionButtons
          options={[['Comfortable', 'More space'], ['Compact', 'More data']]}
          selected={density === 'comfortable' ? 0 : 1}
          onSelect={(i) => setDensity(i === 0 ? 'comfortable' : 'compact')}
        />
      </div>

      <div className="row">
        <div>
          <b>Accent color</b>
          <span className="subtitle">Used for buttons and highlights</span>
        </div>
        <div className="swatches">
          {colors.map((c) => (
            <i
              key={c}
              className={c === accentColor ? 'on' : ''}
              style={{ background: c }}
              onClick={() => handleColorChange(c)}
            >
              {c === accentColor ? '✓' : ''}
            </i>
          ))}
        </div>
      </div>

      <div className="row">
        <div>
          <b>Smooth chart lines</b>
          <span className="subtitle">Curved lines instead of straight segments</span>
        </div>
        <Toggle on={smoothCharts} onChange={setSmoothCharts} />
      </div>

      <div className="row">
        <div>
          <b>Chart gridlines</b>
          <span className="subtitle">Show faint guides behind charts</span>
        </div>
        <Toggle on={gridlines} onChange={setGridlines} />
      </div>

      <div className="row">
        <div>
          <b>Animate numbers and charts</b>
          <span className="subtitle">Count-up and progress animations</span>
        </div>
        <Toggle on={animate} onChange={setAnimate} />
      </div>

      <div className="preview">
        <div>
          <div className="subtitle">Preview</div>
          <b>₹84,620</b>
          <span style={{ color: 'var(--success)', fontWeight: 600, fontSize: 13 }}>▲ +8.4%</span>
        </div>
        <span className="bar"></span>
        <button type="button" className="btn primary">Button</button>
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

        .options {
          display: flex;
          gap: 10px;
        }

        .options div {
          padding: 12px 16px;
          border: 1px solid var(--border);
          border-radius: 12px;
          cursor: pointer;
          text-align: center;
          min-width: 104px;
          font-weight: 600;
          font-size: 13px;
          color: var(--text-muted);
        }

        .options div.on {
          border-color: var(--primary);
          background: var(--primary-soft);
          color: var(--text);
          box-shadow: 0 0 0 1px var(--primary);
        }

        .options small {
          display: block;
          font-weight: 500;
          margin-top: 2px;
          font-size: 11px;
        }

        .swatches {
          display: flex;
          gap: 10px;
        }

        .swatches i {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          cursor: pointer;
          display: grid;
          place-items: center;
          color: #fff;
          font-style: normal;
          font-size: 13px;
          border: 2px solid transparent;
        }

        .swatches i.on {
          border-color: var(--text);
        }

        .toggle {
          width: 42px;
          height: 24px;
          border-radius: 24px;
          background: var(--border);
          position: relative;
          cursor: pointer;
          flex: none;
          transition: 0.2s;
        }

        .toggle:after {
          content: '';
          position: absolute;
          left: 3px;
          top: 3px;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #fff;
          transition: 0.2s;
        }

        .toggle.on {
          background: var(--primary);
        }

        .toggle.on:after {
          left: 21px;
        }

        .preview {
          margin-top: 14px;
          padding: 16px;
          border: 1px dashed var(--border);
          border-radius: 12px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .preview b {
          font-size: 24px;
          letter-spacing: -0.8px;
        }

        .bar {
          display: inline-block;
          height: 6px;
          border-radius: 6px;
          background: var(--primary);
          width: 120px;
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
      `}</style>
    </div>
  );
}
