import { SCHEMA_VERSION } from "./constants.js";
import { calcLoanEmiPerSecond } from "./finance.js";

export async function readStoredState() {
  if (typeof window === "undefined") return null;
  if (window.storage) {
    const res = await window.storage.get("wealthflow:state", false);
    return res?.value ? JSON.parse(res.value) : null;
  }
  const value = window.localStorage?.getItem("wealthflow:state");
  return value ? JSON.parse(value) : null;
}

export async function writeStoredState(value) {
  if (typeof window === "undefined") return;
  const payload = JSON.stringify(value);
  if (window.storage) {
    await window.storage.set("wealthflow:state", payload, false);
    return;
  }
  window.localStorage?.setItem("wealthflow:state", payload);
}

export function migrateState(parsed) {
  if (!parsed) return null;
  if ((parsed.schemaVersion || 1) >= SCHEMA_VERSION) return parsed;

  const withMeta = (arr) => (arr || []).map((item) => ({
    createdAt: item.createdAt || item.id || Date.now(),
    tags: item.tags || [],
    accountId: item.accountId || "default",
    ...item,
  }));

  const goals = parsed.goals || (parsed.target
    ? [{ id: 1, label: "Primary Goal", amount: parseFloat(parsed.target) || 0, createdAt: Date.now() }]
    : []);

  return {
    ...parsed,
    schemaVersion: SCHEMA_VERSION,
    incomes: withMeta(parsed.incomes),
    expenses: withMeta(parsed.expenses),
    goals,
    assets: parsed.assets || [],
    liabilities: parsed.liabilities || [],
    budgets: parsed.budgets || {},
    accounts: parsed.accounts || [{ id: "default", name: "Primary Account" }],
  };
}
