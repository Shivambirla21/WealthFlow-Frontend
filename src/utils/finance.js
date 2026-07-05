export function calcLoanEmiPerSecond(principal, annualRate, tenureMonths) {
  const monthlyRate = annualRate / 100 / 12;
  const emi = monthlyRate === 0
    ? principal / tenureMonths
    : principal * monthlyRate * ((1 + monthlyRate) ** tenureMonths) / (((1 + monthlyRate) ** tenureMonths) - 1);
  return emi / 2592000;
}

export function fmtSeconds(s) {
  s = Math.max(0, Math.floor(s));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return h > 0 ? `${h}h ${m}m ${sec}s` : `${m}m ${sec}s`;
}
