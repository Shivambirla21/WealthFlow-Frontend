import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import GlobalHeader from '../components/layout/GlobalHeader.jsx';
import SourceBreakdown from '../components/speedometer/SourceBreakdown.jsx';
import VelocityGauge from '../components/speedometer/VelocityGauge.jsx';

const periods = {
  min: ['Minute', 'min', 1 / 43200, 2],
  hr: ['Hour', 'hr', 1 / 720, 2],
  day: ['Day', 'day', 1 / 30, 0],
  mo: ['Month', 'mo', 1, 0],
  yr: ['Year', 'yr', 12, 0],
};

const monthlyVelocity = 87000 - 58580 - 16590 + 9100 + 9250 - 650 + 700;

const formatAmount = (value, digits = 0) =>
  Math.abs(value).toLocaleString('en-IN', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });

const formatSignedAmount = (value, digits = 2) =>
  `${value >= 0 ? '+₹' : '−₹'}${formatAmount(value, digits)}`;

export default function SpeedometerPage() {
  const { toggleTheme } = useAuth();
  const [period, setPeriod] = useState('day');
  const [paused, setPaused] = useState(false);
  const [calm, setCalm] = useState(false);
  const [netWorth, setNetWorth] = useState(84620);
  const [sinceMidnight, setSinceMidnight] = useState(0);

  const selectedPeriod = periods[period];
  const velocity = monthlyVelocity * selectedPeriod[2];
  const minuteVelocity = monthlyVelocity * periods.min[2];

  useEffect(() => {
    if (paused) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      const now = new Date();
      const secondsSinceMidnight =
        now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();

      setNetWorth((currentValue) => currentValue + monthlyVelocity / 2592000);
      setSinceMidnight((monthlyVelocity / 2592000) * secondsSinceMidnight);
    }, 1000);

    return () => window.clearInterval(timer);
  }, [paused]);

  return (
    <main className="speedometer-page">
      <GlobalHeader
        title="Wealth Speedometer"
        subtitle="How fast your wealth is moving, right now."
        showSearch={false}
        showAddButton={false}
        onThemeToggle={toggleTheme}
        additionalActions={
          <>
            <span className={`speed-live-pill${paused ? ' paused' : ''}`}>
              <i />
              {paused ? 'PAUSED' : 'LIVE'}
              <b>{formatSignedAmount(minuteVelocity)} / min</b>
            </span>
            <button
              className="speed-action"
              type="button"
              onClick={() => setPaused((currentValue) => !currentValue)}
            >
              {paused ? '▶ Resume live' : '❚❚ Pause live'}
            </button>
            <button
              className={`speed-action${calm ? ' selected' : ''}`}
              type="button"
              onClick={() => setCalm((currentValue) => !currentValue)}
            >
              ☾ Calm mode
            </button>
          </>
        }
      />

      <section className="speed-hero">
        <div className="speed-card velocity-card">
          <div className="speed-heading velocity-heading">
            <h2>Net worth velocity</h2>
            <div className="speed-periods">
              {Object.entries(periods).map(([key, item]) => (
                <button
                  className={period === key ? 'active' : ''}
                  key={key}
                  type="button"
                  onClick={() => setPeriod(key)}
                >
                  {item[0]}
                </button>
              ))}
            </div>
          </div>

          <VelocityGauge
            value={velocity}
            max={Math.max(1, 2 * Math.abs(monthlyVelocity) * selectedPeriod[2])}
            calm={calm}
          />

          <div className="speed-gauge-value">
            <b className={velocity >= 0 ? 'positive' : 'negative'}>
              {formatSignedAmount(velocity, selectedPeriod[3])}
            </b>
            <span>per {selectedPeriod[0].toLowerCase()}</span>
          </div>

          <div className="speed-net-worth">
            <span>Net worth, {paused ? 'paused' : 'live'}</span>
            <strong>₹{formatAmount(netWorth, calm ? 0 : 2)}</strong>
            <small>▲ {formatSignedAmount(sinceMidnight)} since midnight</small>
          </div>
        </div>

        <SourceBreakdown
          multiplier={selectedPeriod[2]}
          unit={selectedPeriod[0].toLowerCase()}
          digits={selectedPeriod[3]}
        />
      </section>

      <section className="speed-metrics">
        <article className="speed-card metric">
          <span>🔥 Burn rate</span>
          <b className="negative">
            ₹{formatAmount(75170 * selectedPeriod[2], selectedPeriod[3])} / {selectedPeriod[1]}
          </b>
          <p>Your living costs and loan interest, even while you sleep.</p>
        </article>

        <article className="speed-card metric">
          <span>🏦 Loan interest ticking</span>
          <b className="negative">
            ₹{formatAmount(16590 * selectedPeriod[2], selectedPeriod[3])} / {selectedPeriod[1]}
          </b>
          <p>Across your home, personal, vehicle and card loans.</p>
          <small>
            That's ₹{formatAmount(16590 * periods.hr[2], 2)} an hour, or ₹
            {formatAmount(16590 * periods.day[2], 0)} a day.
          </small>
        </article>

        <article className="speed-card metric">
          <span>⏳ Freedom clock</span>
          <b>{((500000 - netWorth) / monthlyVelocity).toFixed(1)} months</b>
          <div className="freedom-track">
            <i />
          </div>
          <p>
            to reach ₹5,00,000 net worth at your current speed (16.9% there).
          </p>
        </article>
      </section>

      <p className="speed-disclaimer">
        Income and spending are spread evenly across the month. Live items follow market
        prices and estimated items use average growth rates, so the speed is an estimate,
        not a bank figure. Illustrative numbers only.
      </p>

      <style>{`
        .speedometer-page {
          display: flex;
          min-width: 0;
          flex: 1;
          flex-direction: column;
          gap: 20px;
          padding: 28px 40px 56px;
          color: var(--text);
        }

        .speed-hero {
          display: grid;
          min-width: 0;
          grid-template-columns: 1.25fr 1fr;
          gap: 20px;
        }

        .speed-card {
          min-width: 0;
          padding: 24px;
          border: 1px solid var(--border);
          border-radius: 18px;
          background: var(--surface);
        }

        .speed-heading {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        .speed-heading h2 {
          margin: 0;
          font-size: 16px;
        }

        .muted {
          color: var(--text-muted);
          font-size: 12px;
        }

        .speed-periods {
          display: flex;
          flex-wrap: wrap;
          gap: 2px;
          padding: 3px;
          border-radius: 10px;
          background: var(--bg);
        }

        .speed-periods button {
          padding: 6px 10px;
          border: 0;
          border-radius: 8px;
          background: transparent;
          color: var(--text-muted);
          font-family: inherit;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
        }

        .speed-periods button.active {
          background: var(--surface);
          color: var(--text);
          box-shadow: 0 1px 3px #0005;
        }

        .speed-gauge-value {
          position: relative;
          margin-top: -30px;
          text-align: center;
        }

        .speed-gauge-value b {
          display: block;
          font-size: 34px;
          letter-spacing: -1px;
        }

        .speed-gauge-value span {
          color: var(--text-muted);
          font-size: 12px;
        }

        .positive {
          color: var(--success);
        }

        .negative {
          color: var(--danger);
        }

        .speed-net-worth {
          display: flex;
          flex-direction: column;
          gap: 4px;
          margin-top: 16px;
          text-align: center;
        }

        .speed-net-worth span,
        .speed-net-worth small {
          color: var(--text-muted);
          font-size: 12px;
        }

        .speed-net-worth strong {
          font-size: 40px;
          line-height: 1.1;
          letter-spacing: -1.5px;
        }

        .speed-metrics {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 16px;
        }

        .metric {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          padding: 20px;
        }

        .metric > span {
          color: var(--text-muted);
          font-size: 13px;
        }

        .metric b {
          margin: 6px 0 4px;
          font-size: 27px;
          letter-spacing: -1px;
        }

        .metric p,
        .metric small {
          color: var(--text-muted);
          font-size: 12px;
          line-height: 1.6;
        }

        .metric small {
          margin-top: 6px;
        }

        .freedom-track {
          width: 100%;
          height: 8px;
          margin: 10px 0 6px;
          overflow: hidden;
          border-radius: 8px;
          background: var(--bg);
        }

        .freedom-track i {
          display: block;
          width: 16.9%;
          height: 100%;
          background: var(--primary);
        }

        .speed-disclaimer {
          color: var(--text-muted);
          font-size: 11px;
          line-height: 1.6;
        }

        .speed-live-pill {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 8px 12px;
          border: 1px solid var(--border);
          border-radius: 20px;
          background: var(--surface);
          font-size: 11px;
          font-weight: 700;
          white-space: nowrap;
        }

        .speed-live-pill i {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--success);
          animation: speed-blink 1.6s infinite;
        }

        .speed-live-pill.paused i {
          background: var(--text-muted);
          animation: none;
        }

        .speed-live-pill b {
          color: var(--success);
        }

        .speed-live-pill.paused b {
          color: var(--text-muted);
        }

        @keyframes speed-blink {
          50% {
            opacity: 0.3;
          }
        }

        .speed-action {
          padding: 9px 11px;
          border: 1px solid var(--border);
          border-radius: 10px;
          background: var(--surface);
          color: var(--text);
          font-family: inherit;
          font-size: 12px;
          font-weight: 600;
          white-space: nowrap;
          cursor: pointer;
        }

        .speed-action:hover,
        .speed-action.selected {
          border-color: var(--primary);
          background: var(--primary-soft);
        }

        @media (max-width: 1250px) {
          .speedometer-page {
            padding: 22px 24px 44px;
          }

          .speed-hero {
            grid-template-columns: 1fr;
          }

          .speed-gauge {
            max-width: 480px;
          }
        }

        @media (max-width: 1024px) {
          .speedometer-page .header-right {
            flex-wrap: wrap;
          }
        }

        @media (max-width: 900px) {
          .speed-metrics {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (max-width: 768px) {
          .speedometer-page {
            gap: 16px;
            padding: 16px;
          }

          .speed-metrics {
            grid-template-columns: 1fr;
          }

          .speed-card {
            padding: 18px;
          }

          .velocity-heading {
            align-items: flex-start;
            flex-direction: column;
          }

          .speed-periods {
            width: 100%;
            justify-content: space-between;
          }

          .speed-periods button {
            padding: 6px 7px;
          }

          .speed-live-pill {
            display: none;
          }
        }
      `}</style>
    </main>
  );
}
