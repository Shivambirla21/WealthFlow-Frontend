const TIMEFRAMES = {
  '1m': { count: 60, label: '1-minute', step: 60_000, volatility: 0.0004, drift: 0.00002 },
  '5m': { count: 60, label: '5-minute', step: 300_000, volatility: 0.0008, drift: 0.0001 },
  '1H': { count: 48, label: '1-hour', step: 3_600_000, volatility: 0.002, drift: 0.0004 },
  '1D': { count: 60, label: '1-day', step: 86_400_000, volatility: 0.006, drift: 0.0025 },
  '1M': { count: 36, label: '1-month', step: 2_592_000_000, volatility: 0.03, drift: 0.02 },
  '1Y': { count: 6, label: '1-year', step: 31_536_000_000, volatility: 0.12, drift: 0.16 },
};

const seededRandom = (seed) => {
  let value = seed;
  return () => {
    value |= 0;
    value = (value + 0x6D2B79F5) | 0;
    let next = Math.imul(value ^ (value >>> 15), 1 | value);
    next = (next + Math.imul(next ^ (next >>> 7), 61 | next)) ^ next;
    return ((next ^ (next >>> 14)) >>> 0) / 4294967296;
  };
};

const movement = (random) => (random() + random() + random() + random() - 2) * 1.7;

export const formatINR = (value, digits = 0) =>
  Math.abs(value).toLocaleString('en-IN', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });

export const formatCandleDate = (date, timeframe) => {
  if (['1m', '5m', '1H'].includes(timeframe)) {
    return date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
  }
  if (timeframe === '1D') {
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
  }
  if (timeframe === '1M') {
    return date.toLocaleDateString('en-IN', { month: 'short', year: '2-digit' });
  }
  return String(date.getFullYear());
};

export const formatFullDate = (date, timeframe) =>
  date.toLocaleString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    ...( ['1D', '1M', '1Y'].includes(timeframe)
      ? {}
      : { hour: '2-digit', minute: '2-digit' }),
  });

export const createWealthSeries = (timeframe, series) => {
  const config = TIMEFRAMES[timeframe];
  const seed = timeframe.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0)
    + (series === 'n' ? 1 : series === 'a' ? 2 : 3);
  const random = seededRandom(seed * 31 + timeframe.length * 7);
  const candles = [];
  let previousClose = 100;
  const now = Date.now();

  for (let index = 0; index < config.count; index += 1) {
    const open = previousClose;
    const close = open * (1 + config.drift + config.volatility * movement(random));
    const high = Math.max(open, close) * (1 + Math.abs(movement(random)) * config.volatility * 0.5);
    const low = Math.min(open, close) * (1 - Math.abs(movement(random)) * config.volatility * 0.5);
    candles.push({
      open,
      high,
      low,
      close,
      volume: 0.4 + random() * 0.6,
      date: new Date(now - (config.count - 1 - index) * config.step),
    });
    previousClose = close;
  }

  const scale = 84620 / candles[candles.length - 1].close;
  candles.forEach((candle) => {
    candle.open *= scale;
    candle.high *= scale;
    candle.low *= scale;
    candle.close *= scale;
  });

  if (series === 'a') {
    candles.forEach((candle, index) => {
      const offset = 21200 + (config.count - 1 - index) * (timeframe === '1D' ? 40 : timeframe === '1M' ? 600 : timeframe === '1Y' ? 4000 : 8);
      candle.open += offset;
      candle.high += offset;
      candle.low += offset;
      candle.close += offset;
    });
  }

  if (series === 'l') {
    const liabilityRandom = seededRandom(9);
    let previous = 21200 + (config.count - 1) * (timeframe === '1D' ? 40 : timeframe === '1M' ? 600 : timeframe === '1Y' ? 4000 : 8);
    candles.forEach((candle, index) => {
      const offset = 21200 + (config.count - 1 - index) * (timeframe === '1D' ? 40 : timeframe === '1M' ? 600 : timeframe === '1Y' ? 4000 : 8);
      candle.open = previous;
      candle.close = offset * (1 + movement(liabilityRandom) * 0.002);
      candle.high = Math.max(candle.open, candle.close) * 1.002;
      candle.low = Math.min(candle.open, candle.close) * 0.998;
      previous = candle.close;
    });
  }

  return candles;
};

export const getMovingAverage = (candles, index, period = 7) => {
  if (index < period - 1) return null;
  const total = candles.slice(index - period + 1, index + 1)
    .reduce((sum, candle) => sum + candle.close, 0);
  return total / period;
};

export const getTimeframeLabel = (timeframe) => TIMEFRAMES[timeframe].label;
