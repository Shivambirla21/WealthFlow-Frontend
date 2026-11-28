import { useEffect, useMemo, useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import GlobalHeader from '../components/layout/GlobalHeader.jsx';
import WealthChart from '../components/wealth-chart/WealthChart.jsx';
import { WealthCandleStats, WealthMarketSnapshot, WealthPatterns } from '../components/wealth-chart/WealthChartInsights.jsx';
import { createWealthSeries, formatINR, getTimeframeLabel } from '../components/wealth-chart/chartData.js';

const TIMEFRAMES = ['1m', '5m', '1H', '1D', '1M', '1Y'];
const SERIES = [
  { id: 'n', label: 'Net worth' },
  { id: 'a', label: 'Assets' },
  { id: 'l', label: 'Liabilities' },
];
const CHART_TYPES = [
  { id: 'candles', label: '▮ Candles' },
  { id: 'line', label: '∿ Line' },
  { id: 'area', label: '◢ Area' },
];

export default function WealthChartPage() {
  const { toggleTheme } = useAuth();
  const [timeframe, setTimeframe] = useState('1D');
  const [series, setSeries] = useState('n');
  const [chartType, setChartType] = useState('candles');
  const [showAverage, setShowAverage] = useState(false);
  const [showEvents, setShowEvents] = useState(true);
  const [paused, setPaused] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const [error, setError] = useState(null);

  const handleThemeToggle = () => {
    const html = document.documentElement;
    html.dataset.theme = html.dataset.theme === 'dark' ? 'light' : 'dark';
  };

  const baseCandles = useMemo(() => {
    try {
      console.log('Creating wealth series for:', timeframe, series);
      const result = createWealthSeries(timeframe, series);
      console.log('Wealth series created:', result.length, 'candles');
      return result;
    } catch (e) {
      console.error('Error creating wealth series:', e);
      setError(e.message);
      return [];
    }
  }, [timeframe, series]);
  const candles = useMemo(() => {
    if (!baseCandles || baseCandles.length === 0) return [];
    try {
      const nextCandles = baseCandles.map((candle) => ({ ...candle }));
      const latest = nextCandles[nextCandles.length - 1];
      const baseClose = latest.close;
      latest.close = baseClose * (1 + refresh * 0.000005);
      latest.high = Math.max(latest.high, latest.close);
      latest.low = Math.min(latest.low, latest.close);
      return nextCandles;
    } catch (e) {
      console.error('Error processing candles:', e);
      setError(e.message);
      return [];
    }
  }, [baseCandles, refresh]);
  const current = candles[candles.length - 1];
  const first = candles[0];
  const rangeChange = current && first ? ((current.close - first.open) / first.open) * 100 : 0;
  const amountChange = current && first ? current.close - first.open : 0;
  const seriesLabel = SERIES.find((item) => item.id === series)?.label || 'Net worth';

  useEffect(() => {
    if (paused) return undefined;
    const timer = window.setInterval(() => setRefresh((value) => value + 1), 1000);
    return () => window.clearInterval(timer);
  }, [paused, timeframe, series]);

  return (
    <main className="wealth-chart-page">
      {error && (
        <div style={{ padding: '20px', background: 'var(--danger)', color: 'white', borderRadius: '10px', marginBottom: '20px' }}>
          Error: {error}
        </div>
      )}
      <GlobalHeader
        title="Live Wealth Chart"
        subtitle="Your net worth as market candles. Spot the patterns in your money."
        showSearch={false}
        showAddButton={false}
        onThemeToggle={handleThemeToggle}
        additionalActions={
          <button className={`wealth-control-button${paused ? ' is-active' : ''}`} type="button" onClick={() => setPaused((value) => !value)}>
            {paused ? '▶ Resume live' : '❚❚ Pause live'}
          </button>
        }
      />

      <section className="wealth-chart-layout">
        <div className="wealth-chart-main">
          <div className="wealth-chart-card">
            <div className="wealth-chart-card-header">
              <div className="wealth-chart-summary">
                <div className="wealth-live-label">
                  <span className={`wealth-live-dot${paused ? ' is-paused' : ''}`} />
                  <span>{paused ? 'PAUSED' : 'LIVE'}</span>
                  <span>·</span>
                  <span>{seriesLabel}</span>
                  <span>·</span>
                  <span>{getTimeframeLabel(timeframe)} candles</span>
                </div>
                <div className="wealth-current-value">₹{current ? formatINR(current.close, 2) : 'Loading...'}</div>
                <div className={`wealth-range-change ${rangeChange >= 0 ? 'is-positive' : 'is-negative'}`}>
                  {current ? `${rangeChange >= 0 ? '▲ +' : '▼ −'}₹{formatINR(amountChange)} (${Math.abs(rangeChange).toFixed(2)}%)` : 'Loading...'}
                  <span> this range</span>
                </div>
              </div>

              <div className="wealth-chart-selectors">
                <div className="wealth-segmented-control" aria-label="Chart timeframe">
                  {TIMEFRAMES.map((item) => (
                    <button key={item} type="button" className={timeframe === item ? 'is-selected' : ''} onClick={() => setTimeframe(item)}>{item}</button>
                  ))}
                </div>
                <div className="wealth-segmented-control" aria-label="Wealth series">
                  {SERIES.map((item) => (
                    <button key={item.id} type="button" className={series === item.id ? 'is-selected' : ''} onClick={() => setSeries(item.id)}>{item.label}</button>
                  ))}
                </div>
              </div>
            </div>

            <div className="wealth-chart-toolbar">
              <div className="wealth-segmented-control" aria-label="Chart style">
                {CHART_TYPES.map((item) => (
                  <button key={item.id} type="button" className={chartType === item.id ? 'is-selected' : ''} onClick={() => setChartType(item.id)}>{item.label}</button>
                ))}
              </div>
              <button type="button" className={`wealth-control-button${showAverage ? ' is-active' : ''}`} onClick={() => setShowAverage((value) => !value)}>MA 7</button>
              <button type="button" className={`wealth-control-button${showEvents ? ' is-active' : ''}`} onClick={() => setShowEvents((value) => !value)}>▲ Events</button>
              <span className="wealth-hover-values" aria-live="polite" />
            </div>

            <WealthChart
              candles={candles || []}
              timeframe={timeframe}
              chartType={chartType}
              showAverage={showAverage}
              showEvents={showEvents}
            />

            <div className="wealth-chart-legend">
              <span><i className="legend-up" />Up candle (grew)</span>
              <span><i className="legend-down" />Down candle (fell)</span>
              {showAverage && <span><i className="legend-average" />7-candle average</span>}
              {showEvents && timeframe === '1D' && <><span className="legend-salary">▲ Salary</span><span className="legend-rent">◆ Rent &amp; EMI</span><span className="legend-purchase">● Large purchase</span></>}
              {['1M', '1Y'].includes(timeframe) && <span>Hollow = includes estimates</span>}
            </div>
          </div>
        </div>

        <aside className="wealth-chart-sidebar">
          <WealthPatterns candles={candles} timeframe={timeframe} />
          <WealthCandleStats candles={candles} />
          <WealthMarketSnapshot />
        </aside>
      </section>

      <p className="wealth-chart-disclaimer">
        Each candle shows where your net worth opened, peaked, dipped and closed in that period.
        Illustrative data only. Hollow dashed candles include estimated values for property and vehicles.
      </p>

      <style>{`
        .wealth-chart-page {
          flex: 1;
          min-width: 0;
          padding: 28px 40px 56px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          color: var(--text);
        }

        .wealth-chart-layout {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 310px;
          gap: 20px;
          align-items: start;
          min-width: 0;
        }

        .wealth-chart-card,
        .wealth-side-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 18px;
          padding: 22px;
          min-width: 0;
        }

        .wealth-chart-card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 16px;
          flex-wrap: wrap;
        }

        .wealth-chart-summary {
          min-width: 0;
        }

        .wealth-live-label {
          display: flex;
          align-items: center;
          gap: 7px;
          color: var(--text-muted);
          font-size: 12px;
        }

        .wealth-live-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--success);
          animation: wealth-pulse 1.6s infinite;
        }

        .wealth-live-dot.is-paused {
          background: var(--text-muted);
          animation: none;
        }

        @keyframes wealth-pulse {
          50% {
            opacity: 0.3;
          }
        }

        .wealth-current-value {
          font-size: 38px;
          font-weight: 700;
          letter-spacing: -1.5px;
          line-height: 1.2;
          margin-top: 5px;
        }

        .wealth-range-change {
          font-size: 13px;
          font-weight: 600;
          margin-top: 3px;
        }

        .wealth-range-change span {
          color: var(--text-muted);
          font-weight: 400;
        }

        .is-positive {
          color: var(--success) !important;
        }

        .is-negative {
          color: var(--danger) !important;
        }

        .wealth-chart-selectors {
          display: flex;
          flex-direction: column;
          gap: 10px;
          align-items: flex-end;
        }

        .wealth-segmented-control {
          display: inline-flex;
          gap: 2px;
          flex-wrap: wrap;
          background: var(--bg);
          padding: 3px;
          border-radius: 10px;
        }

        .wealth-segmented-control button {
          border: 0;
          border-radius: 8px;
          background: transparent;
          color: var(--text-muted);
          padding: 6px 11px;
          font-family: inherit;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          white-space: nowrap;
        }

        .wealth-segmented-control button.is-selected {
          background: var(--surface);
          color: var(--text);
          box-shadow: 0 1px 3px #0005;
        }

        .wealth-chart-toolbar {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
          margin: 16px 0 8px;
        }

        .wealth-control-button {
          border: 1px solid var(--border);
          border-radius: 10px;
          background: var(--surface);
          color: var(--text);
          padding: 8px 12px;
          font-family: inherit;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          white-space: nowrap;
        }

        .wealth-control-button:hover,
        .wealth-control-button.is-active {
          background: var(--primary-soft);
          border-color: var(--primary);
          color: var(--primary-muted);
        }

        .wealth-hover-values {
          flex: 1;
        }

        .wealth-chart-wrap {
          position: relative;
          min-width: 0;
        }

        .wealth-chart-svg {
          display: block;
          width: 100%;
          height: auto;
          overflow: visible;
        }

        .wealth-chart-tooltip {
          position: absolute;
          top: 20px;
          left: 12px;
          z-index: 2;
          min-width: 190px;
          padding: 10px 14px;
          border: 1px solid var(--border);
          border-radius: 12px;
          background: var(--surface);
          box-shadow: 0 12px 30px #0005;
          font-size: 12px;
          line-height: 1.7;
          pointer-events: none;
        }

        .wealth-chart-tooltip > span {
          display: block;
          color: var(--text-muted);
          margin-bottom: 3px;
        }

        .wealth-chart-tooltip div {
          display: flex;
          justify-content: space-between;
          gap: 18px;
        }

        .wealth-chart-legend {
          display: flex;
          gap: 18px;
          flex-wrap: wrap;
          align-items: center;
          margin-top: 10px;
          color: var(--text-muted);
          font-size: 12px;
        }

        .wealth-chart-legend i {
          display: inline-block;
          width: 10px;
          height: 10px;
          border-radius: 2px;
          margin-right: 6px;
          vertical-align: -1px;
        }

        .legend-up {
          background: var(--success);
        }

        .legend-down {
          background: var(--danger);
        }

        .legend-average {
          background: var(--warning);
        }

        .legend-salary {
          color: var(--success);
        }

        .legend-rent {
          color: var(--primary-muted);
        }

        .legend-purchase {
          color: var(--danger);
        }

        .wealth-chart-sidebar {
          display: flex;
          flex-direction: column;
          gap: 16px;
          min-width: 0;
        }

        .wealth-side-card {
          padding: 20px;
        }

        .wealth-side-card h2 {
          font-size: 15px;
          margin: 0 0 10px;
          color: var(--text);
        }

        .wealth-pattern {
          display: flex;
          gap: 12px;
          padding: 11px 0;
          border-top: 1px solid var(--border);
        }

        .wealth-pattern:first-of-type {
          border-top: 0;
        }

        .wealth-pattern > span {
          flex: none;
        }

        .wealth-pattern b {
          display: block;
          font-size: 13px;
          margin-bottom: 2px;
        }

        .wealth-pattern p,
        .wealth-market-note {
          color: var(--text-muted);
          font-size: 12px;
          line-height: 1.5;
          margin: 0;
        }

        .wealth-stat-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .wealth-stat-grid div {
          background: var(--bg);
          border-radius: 12px;
          padding: 10px 12px;
          min-width: 0;
        }

        .wealth-stat-grid span {
          display: block;
          color: var(--text-muted);
          font-size: 12px;
        }

        .wealth-stat-grid b {
          display: block;
          font-size: 16px;
          margin-top: 2px;
          overflow-wrap: anywhere;
        }

        .wealth-market-row {
          display: flex;
          justify-content: space-between;
          gap: 10px;
          padding: 9px 0;
          border-top: 1px solid var(--border);
          font-size: 13px;
        }

        .wealth-market-row:first-of-type {
          border-top: 0;
        }

        .wealth-market-row b {
          white-space: nowrap;
        }

        .wealth-sample-label {
          font-size: 11px;
          color: var(--text-muted);
          font-weight: 500;
        }

        .wealth-market-note {
          margin-top: 8px;
        }

        .wealth-chart-disclaimer {
          color: var(--text-muted);
          font-size: 12px;
          line-height: 1.6;
        }

        @media (max-width: 1250px) {
          .wealth-chart-page {
            padding: 22px 24px 44px;
          }

          .wealth-chart-layout {
            grid-template-columns: minmax(0, 1fr);
          }

          .wealth-chart-sidebar {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }

        @media (max-width: 900px) {
          .wealth-chart-sidebar {
            grid-template-columns: 1fr 1fr;
          }

          .wealth-chart-sidebar .wealth-side-card:last-child {
            grid-column: 1 / -1;
          }
        }

        @media (max-width: 768px) {
          .wealth-chart-page {
            padding: 16px;
            gap: 16px;
          }

          .wealth-chart-card {
            padding: 16px;
          }

          .wealth-chart-selectors {
            align-items: stretch;
            width: 100%;
          }

          .wealth-segmented-control {
            justify-content: space-between;
          }

          .wealth-segmented-control button {
            padding: 6px 8px;
          }

          .wealth-chart-sidebar {
            grid-template-columns: 1fr;
          }

          .wealth-chart-sidebar .wealth-side-card:last-child {
            grid-column: auto;
          }

          .wealth-current-value {
            font-size: 32px;
          }

          .wealth-chart-legend {
            gap: 10px;
            font-size: 11px;
          }
        }
      `}</style>
    </main>
  );
}
