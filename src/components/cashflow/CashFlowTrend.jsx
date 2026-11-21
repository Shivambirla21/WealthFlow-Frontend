const netCashFlow = [26000, 24500, 29000, 24500, 27500, 28420];
const months = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];

export default function CashFlowTrend({ currency = '₹' }) {
  const width = 520;
  const height = 220;
  const margin = { top: 30, right: 30, bottom: 40, left: 30 };
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;
  const minValue = 22000;
  const maxValue = 30000;

  const getY = (value) => {
    return margin.top + chartHeight - ((value - minValue) / (maxValue - minValue)) * chartHeight;
  };

  const points = netCashFlow.map((v, i) => [
    margin.left + (i * chartWidth) / (netCashFlow.length - 1),
    getY(v)
  ]);

  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0]} ${p[1]}`).join(' ');
  const areaPath = `${pathD} L${points[points.length - 1][0]} ${margin.top + chartHeight} L${points[0][0]} ${margin.top + chartHeight} Z`;

  return (
    <div className="cashflow-trend">
      <h3>Cash flow trend</h3>
      <div className="subtitle">Net cash flow, last 6 months</div>

      <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} style={{ marginTop: 12 }}>
        <defs>
          <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#635BFF" stopOpacity="0.3" />
            <stop offset="1" stopColor="#635BFF" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Area fill */}
        <path d={areaPath} fill="url(#trendGradient)" />

        {/* Line */}
        <path d={pathD} fill="none" stroke="#635BFF" strokeWidth={3} />

        {/* Data points */}
        {points.map((p, i) => (
          <g key={i}>
            <circle
              cx={p[0]}
              cy={p[1]}
              r={i === points.length - 1 ? 6 : 4}
              fill={i === points.length - 1 ? '#fff' : '#635BFF'}
              stroke="#635BFF"
              strokeWidth={3}
            />
            <text
              x={p[0]}
              y={height - 8}
              fontSize="11"
              textAnchor="middle"
              fill="#9CA3AF"
            >
              {months[i]}
            </text>
            <text
              x={p[0]}
              y={p[1] - 12}
              fontSize="11"
              textAnchor="middle"
              fill="#9CA3AF"
            >
              {(netCashFlow[i] / 1000).toFixed(1)}k
            </text>
          </g>
        ))}

        {/* Best month annotation */}
        <text
          x={points[2][0] + 10}
          y={points[2][1] - 30}
          fontSize="11"
          fill="var(--success)"
        >
          ★ Best month
        </text>
      </svg>

      <style>{`
        .cashflow-trend {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 22px;
        }

        .cashflow-trend h3 {
          font-size: 16px;
          margin: 0 0 2px 0;
          color: var(--text);
        }

        .subtitle {
          color: var(--text-muted);
          font-size: 13px;
        }

        @media (max-width: 768px) {
          .cashflow-trend svg {
            height: 160px;
          }
        }
      `}</style>
    </div>
  );
}
