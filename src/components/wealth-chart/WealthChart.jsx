import { useMemo, useState } from 'react';
import { formatCandleDate, formatFullDate, formatINR, getMovingAverage } from './chartData.js';

const CHART = { width: 900, height: 440, left: 8, right: 78, top: 16, plotHeight: 292, volumeTop: 330, volumeHeight: 60 };

export default function WealthChart({
  candles,
  timeframe,
  chartType,
  showAverage,
  showEvents,
}) {
  const [activeIndex, setActiveIndex] = useState(null);
  const { min, x, y, candleWidth, averagePath, linePath, areaPath } = useMemo(() => {
    const high = Math.max(...candles.map((item) => item.high));
    const low = Math.min(...candles.map((item) => item.low));
    const padding = (high - low) * 0.08 || 1;
    const upper = high + padding;
    const lower = low - padding;
    const plotWidth = CHART.width - CHART.left - CHART.right;
    const xPoint = (index) => CHART.left + (index + 0.5) * plotWidth / candles.length;
    const yPoint = (value) => CHART.top + (CHART.plotHeight - CHART.top) * (upper - value) / (upper - lower);
    const path = candles.map((item, index) => `${index ? 'L' : 'M'} ${xPoint(index)} ${yPoint(item.close)}`).join(' ');
    const averagePoints = candles.map((_, index) => getMovingAverage(candles, index))
      .map((value, index) => value === null ? null : [xPoint(index), yPoint(value)])
      .filter(Boolean);
    const avg = averagePoints.map(([pointX, pointY], index) =>
      `${index ? 'L' : 'M'} ${pointX} ${pointY}`,
    ).join(' ');

    return {
      min: lower,
      max: upper,
      x: xPoint,
      y: yPoint,
      candleWidth: plotWidth / candles.length * 0.62,
      linePath: path,
      areaPath: `${path} L ${xPoint(candles.length - 1)} ${CHART.plotHeight} L ${xPoint(0)} ${CHART.plotHeight} Z`,
      averagePath: avg,
    };
  }, [candles]);

  const handlePointerMove = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const position = ((event.clientX - bounds.left) / bounds.width) * CHART.width;
    const plotWidth = CHART.width - CHART.left - CHART.right;
    const index = Math.floor((position - CHART.left) / (plotWidth / candles.length));
    setActiveIndex(Math.max(0, Math.min(candles.length - 1, index)));
  };

  const active = activeIndex === null ? null : candles[activeIndex];
  const activeChange = active ? ((active.close - active.open) / active.open) * 100 : 0;
  const maxVolume = Math.max(...candles.map((item) => item.volume));
  const last = candles[candles.length - 1];
  const labels = Array.from({ length: 6 }, (_, index) => Math.round(index * (candles.length - 1) / 5));

  return (
    <div className="wealth-chart-wrap" onMouseMove={handlePointerMove} onMouseLeave={() => setActiveIndex(null)}>
      <svg className="wealth-chart-svg" viewBox={`0 0 ${CHART.width} ${CHART.height}`} role="img" aria-label={`Wealth ${chartType} chart`}>
        {Array.from({ length: 6 }, (_, index) => {
          const value = min + (max - min) * index / 5;
          const yPosition = y(value);
          return (
            <g key={index}>
              <line x1="0" x2={CHART.width - CHART.right} y1={yPosition} y2={yPosition} stroke="var(--border)" />
              <text x={CHART.width - CHART.right + 8} y={yPosition + 4} fill="var(--text-muted)" fontSize="11">₹{formatINR(value)}</text>
            </g>
          );
        })}

        {chartType === 'candles' ? candles.map((candle, index) => {
          const rising = candle.close >= candle.open;
          const color = rising ? 'var(--success)' : 'var(--danger)';
          const top = y(Math.max(candle.open, candle.close));
          const bottom = y(Math.min(candle.open, candle.close));
          return (
            <g key={candle.date.toISOString()}>
              <line x1={x(index)} x2={x(index)} y1={y(candle.high)} y2={y(candle.low)} stroke={color} strokeWidth="1.6" />
              <rect
                x={x(index) - candleWidth / 2}
                y={top}
                width={candleWidth}
                height={Math.max(2, bottom - top)}
                rx="1.5"
                fill={color}
                fillOpacity={timeframe === '1M' || timeframe === '1Y' ? 0.28 : 1}
                stroke={color}
                strokeWidth="1.5"
                strokeDasharray={timeframe === '1M' || timeframe === '1Y' ? '3 2' : undefined}
              />
            </g>
          );
        }) : (
          <>
            {chartType === 'area' && <path d={areaPath} fill="url(#wealth-area-gradient)" />}
            <path d={linePath} fill="none" stroke="var(--primary)" strokeWidth="2.6" />
            <defs>
              <linearGradient id="wealth-area-gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--primary)" stopOpacity=".35" />
                <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
              </linearGradient>
            </defs>
          </>
        )}

        {showAverage && <path d={averagePath} fill="none" stroke="var(--warning)" strokeWidth="2" strokeDasharray="5 4" />}
        {showEvents && timeframe === '1D' && candles.map((candle, index) => {
          const day = candle.date.getDate();
          const event = day === 27 ? { symbol: '▲', label: 'Salary credited', color: 'var(--success)' }
            : day === 5 ? { symbol: '◆', label: 'Rent & EMI paid', color: 'var(--primary-muted)' }
              : index === candles.length - 14 ? { symbol: '●', label: 'Large purchase ₹10,400', color: 'var(--danger)' }
                : null;
          return event ? (
            <g key={event.label + index}>
              <title>{formatFullDate(candle.date, timeframe)}: {event.label}</title>
              <text x={x(index)} y={y(candle.low) + 17} textAnchor="middle" fill={event.color} fontSize="12">{event.symbol}</text>
            </g>
          ) : null;
        })}

        <line x1="0" x2={CHART.width - CHART.right} y1={y(last.close)} y2={y(last.close)} stroke={last.close >= last.open ? 'var(--success)' : 'var(--danger)'} strokeDasharray="4 4" />
        <rect x={CHART.width - CHART.right + 2} y={y(last.close) - 11} width="66" height="22" rx="5" fill={last.close >= last.open ? 'var(--success)' : 'var(--danger)'} />
        <text x={CHART.width - CHART.right + 35} y={y(last.close) + 4} textAnchor="middle" fill="#fff" fontSize="11" fontWeight="700">₹{formatINR(last.close)}</text>

        {candles.map((candle, index) => (
          <rect
            key={`volume-${candle.date.toISOString()}`}
            x={x(index) - candleWidth / 2}
            y={CHART.volumeTop + CHART.volumeHeight - CHART.volumeHeight * candle.volume / maxVolume}
            width={candleWidth}
            height={CHART.volumeHeight * candle.volume / maxVolume}
            rx="1.5"
            fill={candle.close >= candle.open ? 'var(--success)' : 'var(--danger)'}
            opacity=".4"
          />
        ))}
        <text x={CHART.left} y={CHART.volumeTop - 6} fill="var(--text-muted)" fontSize="10.5">SPENDING VOLUME</text>

        {labels.map((index) => (
          <text key={index} x={x(index)} y={CHART.height - 14} textAnchor="middle" fill="var(--text-muted)" fontSize="11">
            {formatCandleDate(candles[index].date, timeframe)}
          </text>
        ))}

        {active && (
          <>
            <line x1={x(activeIndex)} x2={x(activeIndex)} y1={CHART.top} y2={CHART.volumeTop + CHART.volumeHeight} stroke="var(--text-muted)" strokeDasharray="3 3" />
            <circle cx={x(activeIndex)} cy={y(active.close)} r="4" fill="var(--surface)" stroke="var(--primary)" strokeWidth="2" />
          </>
        )}
      </svg>

      {active && (
        <div className="wealth-chart-tooltip">
          <span>{formatFullDate(active.date, timeframe)}</span>
          <div><span>Open</span><b>₹{formatINR(active.open)}</b></div>
          <div><span>High</span><b>₹{formatINR(active.high)}</b></div>
          <div><span>Low</span><b>₹{formatINR(active.low)}</b></div>
          <div><span>Close</span><b>₹{formatINR(active.close)}</b></div>
          <div><span>Change</span><b className={activeChange >= 0 ? 'is-positive' : 'is-negative'}>{activeChange >= 0 ? '▲ +' : '▼ −'}{Math.abs(activeChange).toFixed(2)}%</b></div>
        </div>
      )}
    </div>
  );
}
