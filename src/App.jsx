import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import {
  Home, UtensilsCrossed, Car, Zap, Repeat, Landmark, Film, HeartPulse, Tag,
  Briefcase, Laptop, Store, TrendingUp, Building2, Wallet, Plus, Trash2,
  Moon, Sun, Pause, Play, RotateCcw, Target, X, ArrowUpRight, ArrowDownRight, Check
} from "lucide-react";
import {
  AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip,
  PieChart, Pie, Cell
} from "recharts";
import { onAuthStateChanged, getRedirectResult } from "firebase/auth";
import { auth, signInWithGoogle, signOutUser } from "./firebase";

const STORE_KEY = "wealthflow:state";
// PHASE 1: schema version gate — bump this whenever the persisted shape changes,
// and extend migrateState() below to upgrade old saves instead of discarding them.
const SCHEMA_VERSION = 2;

async function readStoredState() {
  if (typeof window === "undefined") return null;
  if (window.storage) {
    const res = await window.storage.get(STORE_KEY, false);
    return res?.value ? JSON.parse(res.value) : null;
  }
  const value = window.localStorage?.getItem(STORE_KEY);
  return value ? JSON.parse(value) : null;
}

async function writeStoredState(value) {
  if (typeof window === "undefined") return;
  const payload = JSON.stringify(value);
  if (window.storage) {
    await window.storage.set(STORE_KEY, payload, false);
    return;
  }
  window.localStorage?.setItem(STORE_KEY, payload);
}

// PHASE 1: one-way migration from any older saved shape to SCHEMA_VERSION.
// Runs once on load; already-current saves pass straight through untouched.
function migrateState(parsed) {
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

function calcLoanEmiPerSecond(principal, annualRate, tenureMonths) {
  const monthlyRate = annualRate / 100 / 12;
  const emi = monthlyRate === 0
    ? principal / tenureMonths
    : principal * monthlyRate * ((1 + monthlyRate) ** tenureMonths) / (((1 + monthlyRate) ** tenureMonths) - 1);
  return emi / 2592000;
}

const FREQS = [
  { v: 3600, label: "/ hour", short: "hr" },
  { v: 86400, label: "/ day", short: "day" },
  { v: 604800, label: "/ week", short: "wk" },
  { v: 2592000, label: "/ month", short: "mo" },
  { v: 31536000, label: "/ year", short: "yr" },
];
const EXP_CATS = [
  { id: "housing", label: "Housing & Rent", icon: Home, color: "#A8432E" },
  { id: "food", label: "Food & Groceries", icon: UtensilsCrossed, color: "#C97A3D" },
  { id: "transport", label: "Transport", icon: Car, color: "#8C6E4E" },
  { id: "utilities", label: "Utilities", icon: Zap, color: "#B8893B" },
  { id: "subscriptions", label: "Subscriptions", icon: Repeat, color: "#6E7B8B" },
  { id: "entertainment", label: "Entertainment", icon: Film, color: "#9C5B8C" },
  { id: "health", label: "Health", icon: HeartPulse, color: "#5B7A6E" },
  { id: "loan", label: "Loan / EMI", icon: Landmark, color: "#7A3E36" },
  { id: "other", label: "Other", icon: Tag, color: "#8A8378" },
];
const catOf = (id) => EXP_CATS.find((c) => c.id === id) || EXP_CATS[EXP_CATS.length - 1];

const INC_TYPES = [
  { id: "salary", label: "Salary", icon: Briefcase, color: "#1F6F54" },
  { id: "freelance", label: "Freelance", icon: Laptop, color: "#2E8B6B" },
  { id: "business", label: "Business", icon: Store, color: "#3FA37D" },
  { id: "investment", label: "Investment", icon: TrendingUp, color: "#1B5C45" },
  { id: "rental", label: "Rental", icon: Building2, color: "#4FA98A" },
  { id: "other", label: "Other", icon: Wallet, color: "#6FAF93" },
];
const incTypeOf = (id) => INC_TYPES.find((c) => c.id === id) || INC_TYPES[INC_TYPES.length - 1];

const MAX_FF_SECONDS = 60 * 60 * 24 * 90; // cap fast-forward at 90 days
const TREND_RANGES = [
  { id: "1m", label: "1 min", seconds: 60 },
  { id: "5m", label: "5 min", seconds: 300 },
  { id: "15m", label: "15 min", seconds: 900 },
  { id: "1h", label: "1 hr", seconds: 3600 },
  { id: "4h", label: "4 hr", seconds: 14400 },
  { id: "1d", label: "1 day", seconds: 86400 },
];
const MAX_TREND_HISTORY = Math.max(...TREND_RANGES.map((r) => r.seconds));

// PHASE 2: global period filter options. "seconds" is the fixed window length
// used to project rate-based totals (rate * seconds). "custom" has no fixed
// length — it's derived from the user-picked from/to dates instead.
const PERIOD_OPTIONS = [
  { id: "today", label: "Today", seconds: 86400 },
  { id: "week", label: "This Week", seconds: 604800 },
  { id: "month", label: "This Month", seconds: 2592000 },
  { id: "quarter", label: "This Quarter", seconds: 7776000 },
  { id: "year", label: "This Year", seconds: 31536000 },
  { id: "custom", label: "Custom Range", seconds: null },
];
const periodOf = (id) => PERIOD_OPTIONS.find((p) => p.id === id) || PERIOD_OPTIONS[2];

// PHASE 1: seed data now carries createdAt/tags/accountId so defaults match
// the shape every entry (old or new) is expected to have.
const defaultIncomes = () => [
  {
    id: 1, name: "Salary", type: "salary", amt: 30000, freq: 2592000, ps: 30000 / 2592000,
    createdAt: Date.now(), tags: [], accountId: "default",
  },
];
const defaultExpenses = () => [
  {
    id: 2, name: "Home Loan EMI", category: "loan",
    principal: 1000000, rate: 8.5, tenure: 240,
    ps: calcLoanEmiPerSecond(1000000, 8.5, 240),
    createdAt: Date.now(), tags: [], accountId: "default",
  },
  {
    id: 3, name: "Rent", category: "housing", amt: 12000, freq: 2592000, ps: 12000 / 2592000,
    createdAt: Date.now(), tags: [], accountId: "default",
  },
];

function fmtSeconds(s) {
  s = Math.max(0, Math.floor(s));
  const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60;
  return h > 0 ? `${h}h ${m}m ${sec}s` : `${m}m ${sec}s`;
}

export default function WealthFlow() {
  const [loaded, setLoaded] = useState(false);
  const [theme, setTheme] = useState("light");
  const [profile, setProfile] = useState({ name: "You", currency: "₹" });
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [target, setTarget] = useState("");
  // PHASE 1: new persisted domains — unused by the UI yet, wired up in later phases.
  const [goals, setGoals] = useState([]);
  const [assets, setAssets] = useState([]);
  const [liabilities, setLiabilities] = useState([]);
  const [budgets, setBudgets] = useState({});
  const [accounts, setAccounts] = useState([{ id: "default", name: "Primary Account" }]);
  const [paused, setPaused] = useState(false);
  const [acc, setAcc] = useState({ inc: 0, out: 0, net: 0 });
  const [history, setHistory] = useState([]);
  const [now, setNow] = useState(() => Date.now());
  const [trendRange, setTrendRange] = useState("1m");
  // PHASE 2: global period filter — drives the period summary cards and the
  // expense breakdown chart below. Independent of trendRange (which only
  // controls the live line chart's lookback window).
  const [periodFilter, setPeriodFilter] = useState("month");
  const [customFrom, setCustomFrom] = useState("");
  const [customTo, setCustomTo] = useState("");
  const [showProfile, setShowProfile] = useState(false);
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [showIncForm, setShowIncForm] = useState(false);
  const [showExpForm, setShowExpForm] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const [toast, setToast] = useState(null);
  const [flashKey, setFlashKey] = useState(0);

  const [incForm, setIncForm] = useState({ name: "", type: "salary", amt: "", freq: 2592000 });
  const [expForm, setExpForm] = useState({ name: "", category: "housing", amt: "", freq: 2592000, principal: "", rate: "", tenure: "240" });

  const accRef = useRef({ inc: 0, out: 0, net: 0 });
  const pausedRef = useRef(false);
  const ratesRef = useRef({ incRate: 0, outRate: 0, netRate: 0 });
  const toastTimer = useRef(null);
  const [sessionStart] = useState(() => Date.now());

  // ── rates (derived) ──
  const incRate = useMemo(() => incomes.reduce((s, i) => s + i.ps, 0), [incomes]);
  const outRate = useMemo(() => expenses.reduce((s, e) => s + e.ps, 0), [expenses]);
  const netRate = incRate - outRate;

  // PHASE 2: resolve the selected period into a concrete window length in seconds.
  // Fixed periods use their preset length; "custom" derives it from the picked dates.
  // Declared here (right after the rates) because catBreakdown below depends on it.
  const periodSeconds = useMemo(() => {
    if (periodFilter !== "custom") return periodOf(periodFilter).seconds;
    if (!customFrom || !customTo) return 0;
    const from = new Date(customFrom).getTime();
    const to = new Date(customTo).getTime();
    if (isNaN(from) || isNaN(to)) return 0;
    return Math.max(0, (to - from) / 1000);
  }, [periodFilter, customFrom, customTo]);

  const periodLabel = periodFilter === "custom"
    ? (customFrom && customTo ? `${customFrom} → ${customTo}` : "Pick a range")
    : periodOf(periodFilter).label;

  // Rate-based projection for the selected window: at current income/expense
  // rates, this is what the period would total. (Phase 3 will replace this
  // with actual elapsed-transaction sums once a discrete ledger exists.)
  const periodIncome = incRate * periodSeconds;
  const periodExpense = outRate * periodSeconds;
  const periodNet = netRate * periodSeconds;

  useEffect(() => { ratesRef.current = { incRate, outRate, netRate }; }, [incRate, outRate, netRate]);
  useEffect(() => { pausedRef.current = paused; }, [paused]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setFirebaseUser(user);
    });

    getRedirectResult(auth).catch((error) => {
      console.error("Firebase redirect sign-in error:", error?.code, error?.message);
    });

    return () => unsubscribe();
  }, []);

  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
      showToast("Signed in");
    } catch (error) {
      const message = error?.message || "Sign-in failed";
      showToast(message);
      console.error("Firebase sign-in error:", error?.code, message);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOutUser();
      showToast("Signed out");
    } catch (error) {
      showToast("Sign-out failed");
      console.error(error);
    }
  };

  // ── load + fast-forward ──
  useEffect(() => {
    let cancelled = false;
    async function init() {
      let parsed = null;
      try {
        // PHASE 1: run every saved value through the migration before hydrating state.
        parsed = migrateState(await readStoredState());
      } catch { /* nothing saved yet */ }

      const incs = parsed?.incomes || defaultIncomes();
      const exps = parsed?.expenses || defaultExpenses();
      const ir = incs.reduce((s, i) => s + i.ps, 0);
      const orr = exps.reduce((s, e) => s + e.ps, 0);
      const savedAcc = parsed?.ledger?.acc || { inc: 0, out: 0, net: 0 };
      const lastTs = parsed?.ledger?.lastTs || Date.now();
      const elapsed = Math.min(Math.max((Date.now() - lastTs) / 1000, 0), MAX_FF_SECONDS);

      accRef.current = {
        inc: savedAcc.inc + ir * elapsed,
        out: savedAcc.out + orr * elapsed,
        net: savedAcc.net + (ir - orr) * elapsed,
      };

      if (cancelled) return;
      setProfile(parsed?.profile || { name: "You", currency: "₹" });
      setIncomes(incs);
      setExpenses(exps);
      setTarget(parsed?.target || "");
      setTheme(parsed?.theme || "light");
      // PHASE 1: hydrate the new domains (empty/default when absent).
      setGoals(parsed?.goals || []);
      setAssets(parsed?.assets || []);
      setLiabilities(parsed?.liabilities || []);
      setBudgets(parsed?.budgets || {});
      setAccounts(parsed?.accounts || [{ id: "default", name: "Primary Account" }]);
      setAcc({ ...accRef.current });
      setLoaded(true);
    }
    init();
    return () => { cancelled = true; };
  }, []);

  // ── ticking ──
  useEffect(() => {
    if (!loaded) return;
    const tick = setInterval(() => {
      if (pausedRef.current) return;
      const r = ratesRef.current;
      accRef.current = {
        inc: accRef.current.inc + r.incRate * 0.1,
        out: accRef.current.out + r.outRate * 0.1,
        net: accRef.current.net + r.netRate * 0.1,
      };
      setAcc({ ...accRef.current });
    }, 100);
    const hist = setInterval(() => {
      const ts = Date.now();
      setNow(ts);
      setHistory((prev) => {
        const next = [...prev, { i: prev.length, ts, net: accRef.current.net }];
        return next.length > MAX_TREND_HISTORY ? next.slice(next.length - MAX_TREND_HISTORY) : next;
      });
    }, 1000);
    return () => { clearInterval(tick); clearInterval(hist); };
  }, [loaded]);

  // ── persistence ──
  const persist = useCallback(() => {
    const save = async () => {
      try {
        await writeStoredState({
          // PHASE 1: always stamp the current schema version and include the new domains.
          schemaVersion: SCHEMA_VERSION,
          profile, incomes, expenses, target, theme,
          goals, assets, liabilities, budgets, accounts,
          ledger: { acc: accRef.current, lastTs: Date.now() },
        });
      } catch { /* best effort */ }
    };
    save();
  }, [profile, incomes, expenses, target, theme, goals, assets, liabilities, budgets, accounts]);
  useEffect(() => {
    if (!loaded) return;
    const t = setTimeout(() => persist(), 500);
    return () => clearTimeout(t);
  }, [persist, loaded]);
  useEffect(() => {
    if (!loaded) return;
    const heartbeat = setInterval(() => persist(), 6000);
    const onHide = () => persist();
    document.addEventListener("visibilitychange", onHide);
    window.addEventListener("beforeunload", onHide);
    return () => {
      clearInterval(heartbeat);
      document.removeEventListener("visibilitychange", onHide);
      window.removeEventListener("beforeunload", onHide);
    };
  }, [persist, loaded]);

  // ── helpers ──
  const cur = profile.currency || "₹";
  const showToast = (msg) => {
    setToast(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2200);
  };
  const flash = () => setFlashKey((k) => k + 1);

  const formatTrendTime = (ts) => new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false });
  const selectedTrend = TREND_RANGES.find((r) => r.id === trendRange) || TREND_RANGES[0];
  const trendData = useMemo(() => {
    const minTs = now - selectedTrend.seconds * 1000;
    return history.filter((point) => point.ts >= minTs);
  }, [history, selectedTrend.seconds, now]);
  const renderTrendData = useMemo(() => {
    const maxPoints = 240;
    if (trendData.length <= maxPoints) return trendData;
    const step = Math.ceil(trendData.length / maxPoints);
    return trendData.filter((_, idx) => idx % step === 0);
  }, [trendData]);
  const trendDurationLabel = trendData.length > 1
    ? `${selectedTrend.label} (${Math.round((trendData[trendData.length - 1].ts - trendData[0].ts) / 1000)} sec)`
    : selectedTrend.label;

  const catBreakdown = useMemo(() => {
    const map = {};
    expenses.forEach((e) => {
      const id = e.category || "other";
      map[id] = (map[id] || 0) + e.ps * periodSeconds;
    });
    return Object.entries(map)
      .map(([id, value]) => ({ id, name: catOf(id).label, value, color: catOf(id).color }))
      .filter((c) => c.value > 0)
      .sort((a, b) => b.value - a.value);
  }, [expenses, periodSeconds]);

  // ── actions ──
  function addIncome() {
    const amt = parseFloat(incForm.amt);
    if (!incForm.name.trim()) return showToast("Name the income source");
    if (isNaN(amt) || amt <= 0) return showToast("Enter a valid amount");
    const ps = amt / incForm.freq;
    setIncomes((p) => [...p, {
      id: Date.now(), name: incForm.name.trim(), type: incForm.type, amt, freq: incForm.freq, ps,
      // PHASE 1: new entries carry metadata from day one.
      createdAt: Date.now(), tags: [], accountId: "default",
    }]);
    setIncForm({ name: "", type: "salary", amt: "", freq: 2592000 });
    setShowIncForm(false);
    flash();
    showToast(`Credited: ${incForm.name.trim()} added`);
  }
  function delIncome(id, name) {
    setIncomes((p) => p.filter((i) => i.id !== id));
    showToast(`Removed ${name}`);
  }
  function addExpense() {
    if (!expForm.name.trim()) return showToast("Name the expense");
    let ps;
    if (expForm.category === "loan") {
      const pr = parseFloat(expForm.principal), rate = parseFloat(expForm.rate), tenure = parseInt(expForm.tenure, 10);
      if (isNaN(pr) || pr <= 0 || isNaN(rate) || rate < 0 || isNaN(tenure) || tenure <= 0) return showToast("Enter valid loan details");
      ps = calcLoanEmiPerSecond(pr, rate, tenure);
      setExpenses((p) => [...p, {
        id: Date.now(), name: expForm.name.trim(), category: "loan", principal: pr, rate, tenure, ps,
        createdAt: Date.now(), tags: [], accountId: "default",
      }]);
    } else {
      const amt = parseFloat(expForm.amt);
      if (isNaN(amt) || amt <= 0) return showToast("Enter a valid amount");
      ps = amt / expForm.freq;
      setExpenses((p) => [...p, {
        id: Date.now(), name: expForm.name.trim(), category: expForm.category, amt, freq: expForm.freq, ps,
        createdAt: Date.now(), tags: [], accountId: "default",
      }]);
    }
    setExpForm({ name: "", category: "housing", amt: "", freq: 2592000, principal: "", rate: "", tenure: "240" });
    setShowExpForm(false);
    flash();
    showToast(`Debited: ${expForm.name.trim()} added`);
  }
  function delExpense(id, name) {
    setExpenses((p) => p.filter((e) => e.id !== id));
    showToast(`Removed ${name}`);
  }
  function doReset() {
    accRef.current = { inc: 0, out: 0, net: 0 };
    setAcc({ inc: 0, out: 0, net: 0 });
    setHistory([]);
    setConfirmReset(false);
    persist();
    showToast("Ledger reset to zero");
  }

  const targetNum = parseFloat(target);
  const hasTarget = !isNaN(targetNum) && targetNum > 0;
  const goalReached = hasTarget && acc.net >= targetNum;
  let goalText = "—", goalPct = 0;
  if (hasTarget) {
    goalPct = Math.max(0, Math.min(100, (acc.net / targetNum) * 100));
    if (goalReached) goalText = "Reached";
    else if (netRate > 0) goalText = fmtSeconds((targetNum - acc.net) / netRate);
    else goalText = "Not on pace";
  }

  const savingsRatio = incRate > 0 ? Math.max(0, Math.min(100, (netRate / incRate) * 100)) : 0;

  if (!loaded) {
    return (
      <div className="wf-root wf-skel-root">
        <style>{`
          .wf-skel-root { --paper:#EFEBE2; --paper2:#E4DECF; --rule:rgba(28,26,20,0.14); font-family:'Inter',sans-serif; background:var(--paper); border-radius:18px; }
          .wf-skel-cover { background:#1C1A14; height:58px; }
          .wf-skel-body { padding:20px 18px; }
          .wf-skel-block { background:var(--paper2); border-radius:10px; position:relative; overflow:hidden; }
          .wf-skel-block::after {
            content:''; position:absolute; inset:0;
            background:linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent);
            transform:translateX(-100%); animation:wfShimmer 1.6s ease-in-out infinite;
          }
          @keyframes wfShimmer { 100% { transform:translateX(100%); } }
          @media (prefers-reduced-motion: reduce) { .wf-skel-block::after { animation:none; } }
          .wf-skel-hero { height:120px; margin:20px auto 24px; max-width:280px; }
          .wf-skel-row { display:flex; gap:10px; margin-bottom:20px; }
          .wf-skel-chip { flex:1; height:56px; }
        `}</style>
        <div className="wf-skel-cover" />
        <div className="wf-skel-body">
          <div className="wf-skel-block wf-skel-hero" />
          <div className="wf-skel-row">
            <div className="wf-skel-block wf-skel-chip" />
            <div className="wf-skel-block wf-skel-chip" />
          </div>
          <div className="wf-skel-row">
            <div className="wf-skel-block wf-skel-chip" />
            <div className="wf-skel-block wf-skel-chip" />
            <div className="wf-skel-block wf-skel-chip" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div data-theme={theme} className="wf-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400..700&family=Inter:wght@400;500;600;700&display=swap');
        .wf-root {
          --paper:#EFEBE2; --paper2:#E4DECF; --ink:#1C1A14; --ink-muted:#6B6354;
          --rule:rgba(28,26,20,0.14); --rule-strong:rgba(28,26,20,0.28);
          --credit:#1F6F54; --credit-soft:rgba(31,111,84,0.10);
          --debit:#A8432E; --debit-soft:rgba(168,67,46,0.10);
          --gold:#B8893B; --gold-soft:rgba(184,137,59,0.14);
          font-family:'Inter',sans-serif; color:var(--ink); background:var(--paper);
          border-radius:18px; overflow:hidden; position:relative;
          box-shadow:0 1px 0 var(--rule-strong);
        }
        .wf-root[data-theme=dark] {
          --paper:#15171C; --paper2:#1B1F26; --ink:#EDEAE0; --ink-muted:#8B8576;
          --rule:rgba(255,255,255,0.10); --rule-strong:rgba(255,255,255,0.22);
          --credit:#4FB892; --credit-soft:rgba(79,184,146,0.14);
          --debit:#E0846A; --debit-soft:rgba(224,132,106,0.14);
          --gold:#D4AE6A; --gold-soft:rgba(212,174,106,0.16);
        }
        .wf-serif { font-family:'Fraunces',serif; }
        .wf-mono { font-family:'JetBrains Mono','Courier New',monospace; font-variant-numeric:tabular-nums; }
        .wf-root * { box-sizing:border-box; }
        .wf-cover {
          background:linear-gradient(135deg, var(--ink) 0%, #2A2620 100%); color:var(--paper);
          display:flex; align-items:center; justify-content:space-between;
          padding:14px 22px;
        }
        .wf-root[data-theme=dark] .wf-cover { background:linear-gradient(135deg, #0E1014 0%, #181C24 100%); }
        .wf-cover-left { display:flex; align-items:center; gap:10px; }
        .wf-seal {
          width:30px; height:30px; border-radius:50%;
          border:1.5px solid var(--gold); color:var(--gold);
          display:flex; align-items:center; justify-content:center; font-size:0.7rem; font-weight:700;
          flex-shrink:0;
        }
        .wf-cover-title { font-weight:700; font-size:1.02rem; letter-spacing:.2px; }
        .wf-cover-sub { font-size:0.66rem; color:rgba(239,235,226,0.55); letter-spacing:.08em; text-transform:uppercase; margin-top:1px;}
        .wf-icon-btn {
          width:32px; height:32px; border-radius:8px; border:1px solid rgba(239,235,226,0.18);
          background:transparent; color:var(--paper); display:flex; align-items:center; justify-content:center;
          cursor:pointer; transition:background .15s;
        }
        .wf-icon-btn:hover { background:rgba(239,235,226,0.10); }
        .wf-icon-btn:focus-visible, .wf-btn:focus-visible, .wf-input:focus-visible, .wf-row-del:focus-visible { outline:2px solid var(--gold); outline-offset:2px; }
        .wf-avatar {
          width:32px; height:32px; border-radius:50%; background:var(--gold); color:var(--ink);
          font-weight:700; font-size:0.8rem; display:flex; align-items:center; justify-content:center;
          cursor:pointer; flex-shrink:0;
        }
        .wf-body { padding:20px 18px 26px; }
        .wf-hero {
          text-align:center; padding:28px 18px 22px; border-bottom:1px solid var(--rule);
          margin-bottom:20px; animation: wfFadeUp .5s ease;
        }
        @media (prefers-reduced-motion: reduce) { .wf-hero, .wf-stamp, .wf-flash, .wf-flowbar::before, .wf-pulse-dot { animation:none !important; } }
        @keyframes wfFadeUp { from { opacity:0; transform:translateY(6px); } to { opacity:1; transform:none; } }
        .wf-eyebrow { font-size:0.68rem; font-weight:600; letter-spacing:.16em; text-transform:uppercase; color:var(--ink-muted); margin-bottom:8px; }
        .wf-balance { font-size:clamp(2.2rem,6.5vw,3.6rem); font-weight:700; line-height:1; letter-spacing:-1px; transition:color .3s ease; }
        .wf-flash { animation: wfFlash .4s ease; }
        @keyframes wfFlash { 0%,100%{opacity:1} 50%{opacity:.35} }
        /* PHASE 4 signature element: a thin bar with a soft light sweep, direction and
           color tied to cashflow direction — the visual stand-in for "money moving". */
        .wf-flowbar { position:relative; height:2px; max-width:320px; margin:16px auto; border-radius:2px; background:var(--rule); overflow:hidden; }
        .wf-flowbar::before {
          content:''; position:absolute; top:0; bottom:0; width:40%;
          background:linear-gradient(90deg, transparent, var(--flow-color), transparent);
          animation: wfFlowSweep 2.2s linear infinite;
        }
        .wf-flowbar-reverse::before { animation-direction: reverse; }
        .wf-flowbar-still::before { animation-play-state:paused; opacity:.4; }
        @keyframes wfFlowSweep { from { transform:translateX(-100%); } to { transform:translateX(350%); } }
        .wf-pulse-dot { width:6px; height:6px; border-radius:50%; display:inline-block; animation:wfPulseDot 1.6s ease-in-out infinite; }
        .wf-pulse-paused { animation-play-state:paused; opacity:.5; }
        @keyframes wfPulseDot { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:.4; transform:scale(0.7); } }
        .wf-rate-line { font-size:0.82rem; color:var(--ink-muted); display:flex; align-items:center; justify-content:center; gap:6px; }
        .wf-badge {
          display:inline-flex; align-items:center; gap:6px; font-size:0.72rem; font-weight:600;
          padding:4px 11px; border-radius:999px; margin-top:10px;
        }
        .wf-ratio-wrap { max-width:280px; margin:16px auto 0; }
        .wf-ratio-label { display:flex; justify-content:space-between; font-size:0.66rem; color:var(--ink-muted); margin-bottom:4px; }
        .wf-ratio-bar { height:3px; border-radius:3px; background:var(--debit-soft); overflow:hidden; }
        .wf-ratio-fill { height:100%; background:var(--gold); transition:width .5s ease; }
        .wf-stat-row { display:flex; gap:10px; flex-wrap:wrap; margin-bottom:20px; }
        .wf-stat-chip {
          flex:1; min-width:120px; background:var(--paper2); border:1px solid var(--rule); border-radius:10px; padding:11px 13px;
          transition:transform .15s ease, box-shadow .15s ease; box-shadow:0 1px 2px rgba(0,0,0,0.04);
        }
        .wf-stat-chip:hover { transform:translateY(-2px); box-shadow:0 6px 16px rgba(0,0,0,0.08); }
        .wf-stat-chip .lbl { font-size:0.64rem; font-weight:600; text-transform:uppercase; letter-spacing:.08em; color:var(--ink-muted); }
        .wf-stat-chip .val { font-size:1rem; font-weight:700; margin-top:3px; transition:color .3s ease; }
        .wf-panel {
          background:var(--paper2); border:1px solid var(--rule); border-radius:12px; margin-bottom:20px; overflow:hidden;
          box-shadow:0 1px 3px rgba(0,0,0,0.05);
        }
        .wf-panel-head { display:flex; align-items:center; justify-content:space-between; padding:13px 16px; border-bottom:1px solid var(--rule); }
        .wf-panel-title { font-weight:700; font-size:0.85rem; display:flex; align-items:center; gap:8px; }
        .wf-btn {
          border:none; border-radius:7px; padding:7px 13px; font-size:0.76rem; font-weight:600;
          cursor:pointer; display:inline-flex; align-items:center; gap:5px; min-height:32px;
          transition:opacity .15s, transform .1s, box-shadow .15s;
        }
        .wf-btn:hover { box-shadow:0 3px 10px rgba(0,0,0,0.12); }
        .wf-btn:active { transform:scale(.97); box-shadow:none; }
        .wf-btn.credit { background:var(--credit); color:#fff; }
        .wf-btn.debit { background:var(--debit); color:#fff; }
        .wf-btn.ghost { background:transparent; color:var(--ink-muted); border:1px solid var(--rule); }
        .wf-btn.ghost:hover { border-color:var(--rule-strong); color:var(--ink); }
        .wf-row {
          display:flex; align-items:center; gap:10px; padding:10px 16px; border-bottom:1px solid var(--rule); font-size:0.82rem;
          transition:background .15s ease;
        }
        .wf-row:hover { background:rgba(184,137,59,0.06); }
        .wf-row:last-child { border-bottom:none; }
        .wf-row-no { font-size:0.68rem; color:var(--ink-muted); width:24px; flex-shrink:0; }
        .wf-row-icon { width:26px; height:26px; border-radius:7px; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
        .wf-row-name { font-weight:600; }
        .wf-row-sub { font-size:0.68rem; color:var(--ink-muted); margin-top:1px; }
        .wf-row-amt { font-weight:700; font-size:0.78rem; }
        .wf-row-del {
          width:30px; height:30px; border-radius:6px; border:none; background:transparent; color:var(--ink-muted);
          cursor:pointer; display:flex; align-items:center; justify-content:center; transition:background .15s,color .15s;
        }
        .wf-row-del:hover { background:var(--debit-soft); color:var(--debit); }
        .wf-empty { padding:22px; text-align:center; color:var(--ink-muted); font-size:0.78rem; }
        .wf-form { padding:14px 16px; border-bottom:1px solid var(--rule); }
        .wf-input {
          background:var(--paper); border:1px solid var(--rule); border-radius:7px; color:var(--ink);
          padding:8px 10px; font-size:0.8rem; width:100%; outline:none; min-height:36px;
          transition:border-color .15s ease;
        }
        .wf-input:focus { border-color:var(--gold); }
        .wf-grid2 { display:grid; grid-template-columns:1fr 1fr; gap:8px; }
        .wf-target-row { display:flex; align-items:center; gap:10px; padding:14px 16px; flex-wrap:wrap; }
        .wf-stamp {
          display:inline-flex; align-items:center; gap:5px; border:2px solid var(--gold); color:var(--gold);
          font-weight:700; font-size:0.68rem; letter-spacing:.1em; text-transform:uppercase;
          padding:4px 10px; border-radius:6px; transform:rotate(-6deg); animation:wfStampIn .35s ease;
        }
        @keyframes wfStampIn { from{opacity:0; transform:rotate(-6deg) scale(1.3);} to{opacity:1; transform:rotate(-6deg) scale(1);} }
        .wf-analysis-grid { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
        @media (max-width:680px) { .wf-analysis-grid { grid-template-columns:1fr; } }
        .wf-legend-row { display:flex; align-items:center; gap:8px; padding:5px 0; font-size:0.74rem; }
        .wf-legend-dot { width:8px; height:8px; border-radius:50%; flex-shrink:0; }
        .wf-toast {
          position:fixed; bottom:18px; left:50%; transform:translateX(-50%); background:var(--ink); color:var(--paper);
          border-radius:8px; padding:8px 16px; font-size:0.78rem; font-weight:500; z-index:50;
          opacity:0; transition:opacity .2s; pointer-events:none; white-space:nowrap;
        }
        .wf-toast.show { opacity:1; }
        .wf-overlay {
          position:absolute; inset:0; background:rgba(0,0,0,0.45); display:flex; align-items:center; justify-content:center;
          z-index:60; backdrop-filter:blur(2px);
        }
        .wf-modal { background:var(--paper); border:1px solid var(--rule); border-radius:16px; padding:24px; width:300px; }
        .wf-cols { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
        @media (max-width:680px) { .wf-cols { grid-template-columns:1fr; } }
        .wf-type-row { display:flex; gap:6px; flex-wrap:wrap; margin-bottom:8px; }
        .wf-type-pill {
          font-size:0.68rem; padding:4px 9px; border-radius:999px; border:1px solid var(--rule); background:var(--paper);
          color:var(--ink-muted); cursor:pointer; display:flex; align-items:center; gap:4px;
        }
        .wf-type-pill.active { background:var(--ink); color:var(--paper); border-color:var(--ink); }
        @media (max-width:480px) {
          .wf-body { padding:16px 12px 20px; }
          .wf-cover { padding:12px 14px; }
          .wf-icon-btn { width:36px; height:36px; }
          .wf-row { padding:12px 12px; }
          .wf-panel-head { padding:12px 14px; }
        }
      `}</style>

      {/* COVER */}
      <div className="wf-cover">
        <div className="wf-cover-left">
          <div className="wf-seal">WF</div>
          <div>
            <div className="wf-cover-title wf-serif">WealthFlow Passbook</div>
            <div className="wf-cover-sub">Ledger opened {new Date(sessionStart).getHours().toString().padStart(2,"0")}:{new Date(sessionStart).getMinutes().toString().padStart(2,"0")}</div>
            {firebaseUser && (
              <div className="wf-cover-sub" style={{ marginTop: 4 }}>
                Signed in as {firebaseUser.displayName || firebaseUser.email}
              </div>
            )}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button className="wf-icon-btn" onClick={() => setPaused((p) => !p)} aria-label={paused ? "Resume" : "Pause"} title={paused ? "Resume" : "Pause"}>
            {paused ? <Play size={15} /> : <Pause size={15} />}
          </button>
          <button className="wf-icon-btn" onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))} aria-label="Toggle theme">
            {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
          </button>
          {firebaseUser ? (
            <button className="wf-btn ghost" onClick={handleSignOut} type="button">
              {firebaseUser.displayName?.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2) || firebaseUser.email?.[0]?.toUpperCase() || "U"}
            </button>
          ) : (
            <button className="wf-btn ghost" onClick={handleSignIn} type="button">
              Sign in
            </button>
          )}
        </div>
      </div>

      <div className="wf-body">
        {/* HERO */}
        <div className="wf-hero">
          <div className="wf-eyebrow">Net Balance Movement</div>
          <div key={flashKey} className={`wf-balance wf-mono ${flashKey ? "wf-flash" : ""}`} style={{ color: acc.net >= 0 ? "var(--credit)" : "var(--debit)" }}>
            {acc.net < 0 ? "-" : ""}{cur}{Math.abs(acc.net).toFixed(4)}
          </div>
          <div
            className={`wf-flowbar ${netRate < 0 ? "wf-flowbar-reverse" : ""} ${paused || netRate === 0 ? "wf-flowbar-still" : ""}`}
            style={{ "--flow-color": netRate >= 0 ? "var(--credit)" : "var(--debit)" }}
            aria-hidden="true"
          />
          <div className="wf-rate-line wf-mono">
            {netRate >= 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
            {netRate >= 0 ? "+" : "-"}{cur}{Math.abs(netRate).toFixed(6)} / sec
          </div>
          <span className="wf-badge" style={{ background: netRate >= 0 ? "var(--credit-soft)" : "var(--debit-soft)", color: netRate >= 0 ? "var(--credit)" : "var(--debit)" }}>
            <span className={`wf-pulse-dot ${paused ? "wf-pulse-paused" : ""}`} style={{ background: netRate >= 0 ? "var(--credit)" : "var(--debit)" }} />
            {netRate >= 0 ? "Credit flow positive" : "Debit flow exceeds credit"}
          </span>
          <div className="wf-ratio-wrap">
            <div className="wf-ratio-label"><span>Savings rate</span><span>{savingsRatio.toFixed(1)}%</span></div>
            <div className="wf-ratio-bar"><div className="wf-ratio-fill" style={{ width: savingsRatio + "%" }} /></div>
          </div>
          {paused && <div style={{ marginTop: 10, fontSize: "0.7rem", color: "var(--ink-muted)" }}>Ledger paused</div>}
        </div>

        {/* SUB COUNTERS */}
        <div className="wf-cols" style={{ marginBottom: 20 }}>
          <div className="wf-stat-chip">
            <div className="lbl"><ArrowUpRight size={11} style={{ display: "inline" }} /> Credited so far</div>
            <div className="val wf-mono" style={{ color: "var(--credit)" }}>{cur}{acc.inc.toFixed(4)}</div>
          </div>
          <div className="wf-stat-chip">
            <div className="lbl"><ArrowDownRight size={11} style={{ display: "inline" }} /> Debited so far</div>
            <div className="val wf-mono" style={{ color: "var(--debit)" }}>{cur}{acc.out.toFixed(4)}</div>
          </div>
        </div>

        {/* GOAL PROGRESS */}
        {hasTarget && (
          <div className="wf-cols" style={{ marginBottom: 20 }}>
            <div className="wf-stat-chip" style={{ background: "var(--gold-soft)", border: "1px solid var(--gold)" }}>
              <div className="lbl"><Target size={11} style={{ display: "inline" }} /> Net Worth Goal</div>
              <div className="val wf-mono" style={{ color: "var(--gold)" }}>{cur}{targetNum.toFixed(2)}</div>
            </div>
            <div className="wf-stat-chip">
              <div className="lbl">Progress</div>
              <div className="val wf-mono" style={{ color: goalPct >= 100 ? "var(--credit)" : "var(--gold)" }}>
                {goalPct.toFixed(1)}%
              </div>
            </div>
            <div className="wf-stat-chip">
              <div className="lbl">{goalReached ? "Goal Reached! 🎉" : "Time to reach"}</div>
              <div className="val wf-mono" style={{ color: goalReached ? "var(--credit)" : netRate > 0 ? "var(--gold)" : "var(--debit)" }}>
                {goalText}
              </div>
            </div>
          </div>
        )}

        {/* PHASE 2: PERIOD FILTER + SUMMARY */}
        <div className="wf-panel">
          <div className="wf-panel-head" style={{ flexWrap: "wrap", gap: 10 }}>
            <div className="wf-panel-title">Period summary</div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
              <select className="wf-input" value={periodFilter} onChange={(e) => setPeriodFilter(e.target.value)} style={{ width: 140, padding: "6px 8px", fontSize: 11 }}>
                {PERIOD_OPTIONS.map((p) => <option key={p.id} value={p.id}>{p.label}</option>)}
              </select>
              {periodFilter === "custom" && (
                <>
                  <input className="wf-input" type="date" value={customFrom} onChange={(e) => setCustomFrom(e.target.value)} style={{ width: 140, padding: "6px 8px", fontSize: 11 }} />
                  <span style={{ fontSize: 11, color: "var(--ink-muted)" }}>to</span>
                  <input className="wf-input" type="date" value={customTo} onChange={(e) => setCustomTo(e.target.value)} style={{ width: 140, padding: "6px 8px", fontSize: 11 }} />
                </>
              )}
            </div>
          </div>
          <div className="wf-stat-row" style={{ padding: "13px 16px", marginBottom: 0 }}>
            <div className="wf-stat-chip">
              <div className="lbl">Income · {periodLabel}</div>
              <div className="val wf-mono" style={{ color: "var(--credit)" }}>+{cur}{periodIncome.toFixed(2)}</div>
            </div>
            <div className="wf-stat-chip">
              <div className="lbl">Expenses · {periodLabel}</div>
              <div className="val wf-mono" style={{ color: "var(--debit)" }}>-{cur}{periodExpense.toFixed(2)}</div>
            </div>
            <div className="wf-stat-chip">
              <div className="lbl">Net · {periodLabel}</div>
              <div className="val wf-mono" style={{ color: periodNet >= 0 ? "var(--credit)" : "var(--debit)" }}>{periodNet >= 0 ? "+" : "-"}{cur}{Math.abs(periodNet).toFixed(2)}</div>
            </div>
          </div>
          {periodFilter === "custom" && periodSeconds === 0 && (
            <div className="wf-empty">Pick both a start and end date to see totals for that range</div>
          )}
        </div>

        {/* TARGET */}
        <div className="wf-panel">
          <div className="wf-target-row">
            <Target size={16} style={{ color: "var(--gold)" }} />
            <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--ink-muted)" }}>Net worth goal</span>
            <input className="wf-input" type="number" placeholder="e.g. 5000" value={target} onChange={(e) => setTarget(e.target.value)} style={{ maxWidth: 130 }} />
            {goalReached ? (
              <span className="wf-stamp"><Check size={12} /> Goal reached</span>
            ) : (
              <span className="wf-mono" style={{ fontWeight: 700, color: "var(--gold)" }}>{goalText}</span>
            )}
            {hasTarget && !goalReached && <span style={{ fontSize: "0.7rem", color: "var(--ink-muted)" }}>{goalPct.toFixed(1)}% there</span>}
          </div>
        </div>

        {/* INCOME / EXPENSE REGISTERS */}
        <div className="wf-cols">
          {/* INCOME */}
          <div className="wf-panel">
            <div className="wf-panel-head">
              <div className="wf-panel-title"><ArrowUpRight size={14} style={{ color: "var(--credit)" }} /> Credit Register</div>
              <button className="wf-btn credit" onClick={() => setShowIncForm((s) => !s)}><Plus size={13} /> Add</button>
            </div>
            {showIncForm && (
              <div className="wf-form">
                <input className="wf-input" placeholder="Source name" value={incForm.name} onChange={(e) => setIncForm({ ...incForm, name: e.target.value })} style={{ marginBottom: 8 }} />
                <div className="wf-type-row">
                  {INC_TYPES.map((t) => {
                    const Ico = t.icon;
                    return (
                      <button key={t.id} className={`wf-type-pill ${incForm.type === t.id ? "active" : ""}`} onClick={() => setIncForm({ ...incForm, type: t.id })}>
                        <Ico size={11} /> {t.label}
                      </button>
                    );
                  })}
                </div>
                <div className="wf-grid2" style={{ marginBottom: 8 }}>
                  <input className="wf-input" type="number" placeholder="Amount" value={incForm.amt} onChange={(e) => setIncForm({ ...incForm, amt: e.target.value })} />
                  <select className="wf-input" value={incForm.freq} onChange={(e) => setIncForm({ ...incForm, freq: Number(e.target.value) })}>
                    {FREQS.map((f) => <option key={f.v} value={f.v}>{f.label}</option>)}
                  </select>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button className="wf-btn credit" style={{ flex: 1, justifyContent: "center" }} onClick={addIncome}>Add entry</button>
                  <button className="wf-btn ghost" onClick={() => setShowIncForm(false)}>Cancel</button>
                </div>
              </div>
            )}
            {incomes.length === 0 && <div className="wf-empty">No income sources yet</div>}
            {incomes.map((inc, idx) => {
              const t = incTypeOf(inc.type); const Ico = t.icon;
              return (
                <div className="wf-row" key={inc.id}>
                  <span className="wf-row-no wf-mono">{String(idx + 1).padStart(3, "0")}</span>
                  <div className="wf-row-icon" style={{ background: t.color + "22" }}><Ico size={13} style={{ color: t.color }} /></div>
                  <div style={{ flex: 1 }}>
                    <div className="wf-row-name">{inc.name}</div>
                    <div className="wf-row-sub">{cur}{inc.amt.toLocaleString()} {FREQS.find(f=>f.v===inc.freq)?.label}</div>
                  </div>
                  <div className="wf-row-amt wf-mono" style={{ color: "var(--credit)" }}>{cur}{inc.ps.toFixed(5)}/s</div>
                  <button className="wf-row-del" onClick={() => delIncome(inc.id, inc.name)} aria-label={`Remove ${inc.name}`}><Trash2 size={13} /></button>
                </div>
              );
            })}
          </div>

          {/* EXPENSE */}
          <div className="wf-panel">
            <div className="wf-panel-head">
              <div className="wf-panel-title"><ArrowDownRight size={14} style={{ color: "var(--debit)" }} /> Debit Register</div>
              <button className="wf-btn debit" onClick={() => setShowExpForm((s) => !s)}><Plus size={13} /> Add</button>
            </div>
            {showExpForm && (
              <div className="wf-form">
                <input className="wf-input" placeholder="Expense name" value={expForm.name} onChange={(e) => setExpForm({ ...expForm, name: e.target.value })} style={{ marginBottom: 8 }} />
                <div className="wf-type-row">
                  {EXP_CATS.map((c) => {
                    const Ico = c.icon;
                    return (
                      <button key={c.id} className={`wf-type-pill ${expForm.category === c.id ? "active" : ""}`} onClick={() => setExpForm({ ...expForm, category: c.id })}>
                        <Ico size={11} /> {c.label}
                      </button>
                    );
                  })}
                </div>
                {expForm.category === "loan" ? (
                  <div className="wf-grid2" style={{ marginBottom: 8, gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))" }}>
                    <input className="wf-input" type="number" placeholder="Principal" value={expForm.principal} onChange={(e) => setExpForm({ ...expForm, principal: e.target.value })} />
                    <input className="wf-input" type="number" step="0.1" placeholder="Rate % p.a." value={expForm.rate} onChange={(e) => setExpForm({ ...expForm, rate: e.target.value })} />
                    <input className="wf-input" type="number" placeholder="Tenure months" value={expForm.tenure} onChange={(e) => setExpForm({ ...expForm, tenure: e.target.value })} />
                  </div>
                ) : (
                  <div className="wf-grid2" style={{ marginBottom: 8 }}>
                    <input className="wf-input" type="number" placeholder="Amount" value={expForm.amt} onChange={(e) => setExpForm({ ...expForm, amt: e.target.value })} />
                    <select className="wf-input" value={expForm.freq} onChange={(e) => setExpForm({ ...expForm, freq: Number(e.target.value) })}>
                      {FREQS.map((f) => <option key={f.v} value={f.v}>{f.label}</option>)}
                    </select>
                  </div>
                )}
                <div style={{ display: "flex", gap: 8 }}>
                  <button className="wf-btn debit" style={{ flex: 1, justifyContent: "center" }} onClick={addExpense}>Add entry</button>
                  <button className="wf-btn ghost" onClick={() => setShowExpForm(false)}>Cancel</button>
                </div>
              </div>
            )}
            {expenses.length === 0 && <div className="wf-empty">No expenses yet</div>}
            {expenses.map((exp, idx) => {
              const c = catOf(exp.category); const Ico = c.icon;
              const sub = exp.category === "loan"
                ? `${cur}${(exp.ps * 2592000).toFixed(0)}/mo EMI (${exp.rate}% p.a., ${exp.tenure || 240} mo)`
                : `${cur}${exp.amt.toLocaleString()} ${FREQS.find(f=>f.v===exp.freq)?.label}`;
              return (
                <div className="wf-row" key={exp.id}>
                  <span className="wf-row-no wf-mono">{String(idx + 1).padStart(3, "0")}</span>
                  <div className="wf-row-icon" style={{ background: c.color + "22" }}><Ico size={13} style={{ color: c.color }} /></div>
                  <div style={{ flex: 1 }}>
                    <div className="wf-row-name">{exp.name}</div>
                    <div className="wf-row-sub">{sub}</div>
                  </div>
                  <div className="wf-row-amt wf-mono" style={{ color: "var(--debit)" }}>{cur}{exp.ps.toFixed(5)}/s</div>
                  <button className="wf-row-del" onClick={() => delExpense(exp.id, exp.name)} aria-label={`Remove ${exp.name}`}><Trash2 size={13} /></button>
                </div>
              );
            })}
          </div>
        </div>

        {/* ANALYSIS */}
        <div className="wf-analysis-grid" style={{ marginTop: 20 }}>
          <div className="wf-panel">
            <div className="wf-panel-head" style={{ gap: 12, flexWrap: "wrap" }}>
              <div className="wf-panel-title">Live balance trend ({selectedTrend.label})</div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                <span style={{ fontSize: 11, color: "var(--ink-muted)" }}>Show:</span>
                <select className="wf-input" value={trendRange} onChange={(e) => setTrendRange(e.target.value)} style={{ width: 100, padding: "6px 8px", fontSize: 11 }}>
                  {TREND_RANGES.map((range) => (
                    <option key={range.id} value={range.id}>{range.label}</option>
                  ))}
                </select>
              </div>
            </div>
            <div style={{ padding: "10px 8px 4px", height: 160 }}>
              {trendData.length > 2 ? (
                <>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--ink-muted)", marginBottom: 6 }}>
                    <span>{formatTrendTime(trendData[0].ts)}</span>
                    <span>{trendDurationLabel}</span>
                    <span>{formatTrendTime(trendData[trendData.length - 1].ts)}</span>
                  </div>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={renderTrendData}>
                      <defs>
                        <linearGradient id="wfGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#B8893B" stopOpacity={0.35} />
                          <stop offset="100%" stopColor="#B8893B" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis
                        dataKey="ts"
                        tickFormatter={(value) => formatTrendTime(value)}
                        tick={{ fill: "var(--ink-muted)", fontSize: 10, dy: 10 }}
                        axisLine={{ stroke: "var(--rule)", strokeWidth: 1 }}
                        tickLine={false}
                        minTickGap={25}
                        label={{ value: "Time", position: "insideBottomRight", offset: -6, fill: "var(--ink-muted)", fontSize: 11 }}
                        type="number"
                        domain={["auto", "auto"]}
                      />
                      <YAxis
                        domain={["auto", "auto"]}
                        tick={{ fill: "var(--ink-muted)", fontSize: 10 }}
                        label={{ value: "Balance", angle: -90, position: "insideLeft", fill: "var(--ink-muted)", fontSize: 11 }}
                      />
                      <Tooltip formatter={(v) => [`${cur}${v.toFixed(2)}`, "Net"]} labelFormatter={(label) => formatTrendTime(label)} contentStyle={{ background: "var(--paper)", border: "1px solid var(--rule)", borderRadius: 8, fontSize: 12 }} />
                      <Area type="monotone" dataKey="net" stroke="#B8893B" strokeWidth={1.8} fill="url(#wfGrad)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </>
              ) : (
                <div className="wf-empty">Collecting data…</div>
              )}
            </div>
          </div>
          <div className="wf-panel">
            <div className="wf-panel-head"><div className="wf-panel-title">Expense breakdown · {periodLabel}</div></div>
            <div style={{ padding: "12px 16px", display: "flex", gap: 14, alignItems: "center" }}>
              {catBreakdown.length ? (
                <>
                  <div style={{ width: 110, height: 110, flexShrink: 0 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={catBreakdown} dataKey="value" nameKey="name" innerRadius={32} outerRadius={50} paddingAngle={2} stroke="none">
                          {catBreakdown.map((c) => <Cell key={c.id} fill={c.color} />)}
                        </Pie>
                        <Tooltip formatter={(v) => `${cur}${v.toFixed(0)}`} contentStyle={{ background: "var(--paper)", border: "1px solid var(--rule)", borderRadius: 8, fontSize: 12 }} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    {catBreakdown.map((c) => (
                      <div className="wf-legend-row" key={c.id}>
                        <span className="wf-legend-dot" style={{ background: c.color }} />
                        <span style={{ flex: 1, color: "var(--ink-muted)" }}>{c.name}</span>
                        <span className="wf-mono" style={{ fontWeight: 700 }}>{cur}{c.value.toFixed(0)}</span>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="wf-empty">Add an expense to see the breakdown</div>
              )}
            </div>
          </div>
        </div>

        {/* RESET */}
        <div style={{ textAlign: "center", marginTop: 22 }}>
          {!confirmReset ? (
            <button className="wf-btn ghost" onClick={() => setConfirmReset(true)}><RotateCcw size={13} /> Reset ledger</button>
          ) : (
            <span style={{ display: "inline-flex", gap: 8, alignItems: "center", fontSize: "0.78rem" }}>
              Reset accumulated totals to zero?
              <button className="wf-btn debit" onClick={doReset}>Yes, reset</button>
              <button className="wf-btn ghost" onClick={() => setConfirmReset(false)}>Cancel</button>
            </span>
          )}
        </div>
      </div>

      {/* PROFILE MODAL */}
      {showProfile && (
        <div className="wf-overlay" onClick={(e) => e.target === e.currentTarget && setShowProfile(false)}>
          <div className="wf-modal">
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
              <div style={{ fontWeight: 700 }}>Profile</div>
              <button className="wf-icon-btn" style={{ color: "var(--ink)", border: "1px solid var(--rule)" }} onClick={() => setShowProfile(false)}><X size={14} /></button>
            </div>
            <label style={{ fontSize: "0.74rem", fontWeight: 600, color: "var(--ink-muted)", display: "block", marginBottom: 5 }}>Name</label>
            <input className="wf-input" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} style={{ marginBottom: 12 }} />
            <label style={{ fontSize: "0.74rem", fontWeight: 600, color: "var(--ink-muted)", display: "block", marginBottom: 5 }}>Currency symbol</label>
            <input className="wf-input" maxLength={3} value={profile.currency} onChange={(e) => setProfile({ ...profile, currency: e.target.value })} style={{ maxWidth: 80, marginBottom: 16 }} />
            <button className="wf-btn credit" style={{ width: "100%", justifyContent: "center" }} onClick={() => setShowProfile(false)}>Done</button>
          </div>
        </div>
      )}

      {/* TOAST */}
      <div className={`wf-toast ${toast ? "show" : ""}`}>{toast}</div>
    </div>
  );
}