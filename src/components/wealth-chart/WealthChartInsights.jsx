import { formatFullDate, formatINR, getMovingAverage } from './chartData.js';

export function WealthPatterns({ candles, timeframe }) {
  const greenStreak = (() => {
    let count = 0;
    for (let index = candles.length - 1; index >= 0 && candles[index].close >= candles[index].open; index -= 1) count += 1;
    return count;
  })();
  const currentAverage = getMovingAverage(candles, candles.length - 1);
  const previousAverage = getMovingAverage(candles, candles.length - 8);
  const trend = currentAverage && previousAverage ? ((currentAverage - previousAverage) / previousAverage) * 100 : 0;
  const biggestDip = candles.reduce((lowest, candle) => {
    const change = (candle.close - candle.open) / candle.open;
    return change < lowest.change ? { change, date: candle.date } : lowest;
  }, { change: 0, date: null });

  return (
    <section className="wealth-side-card">
      <h2>Patterns spotted</h2>
      <div className="wealth-pattern">
        <span>{greenStreak >= 3 ? '🟢' : '⚪'}</span>
        <div>
          <b>{greenStreak} green candle{greenStreak === 1 ? '' : 's'} in a row</b>
          <p>{greenStreak >= 3 ? 'Momentum is building. Your wealth has risen in each recent period.' : 'No long streak right now.'}</p>
        </div>
      </div>
      <div className="wealth-pattern">
        <span>{trend >= 0 ? '📈' : '📉'}</span>
        <div>
          <b>{trend >= 0 ? 'Uptrend' : 'Downtrend'} · {trend >= 0 ? '+' : '−'}{Math.abs(trend).toFixed(2)}%</b>
          <p>The 7-candle average moved this much over the recent candles.</p>
        </div>
      </div>
      <div className="wealth-pattern">
        <span>🔻</span>
        <div>
          <b>Biggest dip: {(biggestDip.change * 100).toFixed(2)}%</b>
          <p>{biggestDip.date ? `${formatFullDate(biggestDip.date, timeframe)}. Check what you spent or which market fell.` : 'No red candles in this range.'}</p>
        </div>
      </div>
    </section>
  );
}

export function WealthCandleStats({ candles }) {
  const greenCount = candles.filter((candle) => candle.close >= candle.open).length;
  const high = Math.max(...candles.map((candle) => candle.high));
  const low = Math.min(...candles.map((candle) => candle.low));

  return (
    <section className="wealth-side-card">
      <h2>Candle stats</h2>
      <div className="wealth-stat-grid">
        <div><span>Green candles</span><b className="is-positive">{Math.round(greenCount / candles.length * 100)}%</b></div>
        <div><span>Red candles</span><b className="is-negative">{Math.round((candles.length - greenCount) / candles.length * 100)}%</b></div>
        <div><span>Range high</span><b>₹{formatINR(high)}</b></div>
        <div><span>Range low</span><b>₹{formatINR(low)}</b></div>
      </div>
    </section>
  );
}

export function WealthMarketSnapshot() {
  return (
    <section className="wealth-side-card">
      <h2>Markets today <span className="wealth-sample-label">sample</span></h2>
      <div className="wealth-market-row"><span>Nifty 50</span><b className="is-positive">▲ +0.42%</b></div>
      <div className="wealth-market-row"><span>Sensex</span><b className="is-positive">▲ +0.38%</b></div>
      <div className="wealth-market-row"><span>Gold</span><b className="is-negative">▼ −0.21%</b></div>
      <div className="wealth-market-row"><span>USD / INR</span><b className="is-positive">▲ +0.05%</b></div>
      <p className="wealth-market-note">Your investments follow these markets, which moves your net worth candle by candle.</p>
    </section>
  );
}
