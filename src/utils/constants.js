import {
  Home, UtensilsCrossed, Car, Zap, Repeat, Landmark, Film, HeartPulse, Tag,
  Briefcase, Laptop, Store, TrendingUp, Building2, Wallet,
} from "lucide-react";
import { calcLoanEmiPerSecond } from './finance.js';

export const SCHEMA_VERSION = 2;

export const FREQS = [
  { v: 3600, label: "/ hour", short: "hr" },
  { v: 86400, label: "/ day", short: "day" },
  { v: 604800, label: "/ week", short: "wk" },
  { v: 2592000, label: "/ month", short: "mo" },
  { v: 31536000, label: "/ year", short: "yr" },
];

export const EXP_CATS = [
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

export const catOf = (id) => EXP_CATS.find((c) => c.id === id) || EXP_CATS[EXP_CATS.length - 1];

export const INC_TYPES = [
  { id: "salary", label: "Salary", icon: Briefcase, color: "#1F6F54" },
  { id: "freelance", label: "Freelance", icon: Laptop, color: "#2E8B6B" },
  { id: "business", label: "Business", icon: Store, color: "#3FA37D" },
  { id: "investment", label: "Investment", icon: TrendingUp, color: "#1B5C45" },
  { id: "rental", label: "Rental", icon: Building2, color: "#4FA98A" },
  { id: "other", label: "Other", icon: Wallet, color: "#6FAF93" },
];

export const incTypeOf = (id) => INC_TYPES.find((c) => c.id === id) || INC_TYPES[INC_TYPES.length - 1];

export const MAX_FF_SECONDS = 60 * 60 * 24 * 90;

export const TREND_RANGES = [
  { id: "1m", label: "1 min", seconds: 60 },
  { id: "5m", label: "5 min", seconds: 300 },
  { id: "15m", label: "15 min", seconds: 900 },
  { id: "1h", label: "1 hr", seconds: 3600 },
  { id: "4h", label: "4 hr", seconds: 14400 },
  { id: "1d", label: "1 day", seconds: 86400 },
];

export const PERIOD_OPTIONS = [
  { id: "today", label: "Today", seconds: 86400 },
  { id: "week", label: "This Week", seconds: 604800 },
  { id: "month", label: "This Month", seconds: 2592000 },
  { id: "quarter", label: "This Quarter", seconds: 7776000 },
  { id: "year", label: "This Year", seconds: 31536000 },
  { id: "custom", label: "Custom Range", seconds: null },
];

export const periodOf = (id) => PERIOD_OPTIONS.find((p) => p.id === id) || PERIOD_OPTIONS[2];

export const defaultIncomes = () => [
  {
    id: 1,
    name: "Salary",
    type: "salary",
    amt: 30000,
    freq: 2592000,
    ps: 30000 / 2592000,
    createdAt: Date.now(),
    tags: [],
    accountId: "default",
  },
];

export const defaultExpenses = () => [
  {
    id: 2,
    name: "Home Loan EMI",
    category: "loan",
    principal: 1000000,
    rate: 8.5,
    tenure: 240,
    ps: calcLoanEmiPerSecond(1000000, 8.5, 240),
    createdAt: Date.now(),
    tags: [],
    accountId: "default",
  },
  {
    id: 3,
    name: "Rent",
    category: "housing",
    amt: 12000,
    freq: 2592000,
    ps: 12000 / 2592000,
    createdAt: Date.now(),
    tags: [],
    accountId: "default",
  },
];
