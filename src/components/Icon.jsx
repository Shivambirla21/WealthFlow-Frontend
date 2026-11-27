import * as LucideIcons from 'lucide-react';

// Re-export all Lucide icons for direct import
export * from 'lucide-react';

// Common icon mappings for easy access
export const Icon = ({ name, size = 20, className = '', ...props }) => {
  const IconComponent = LucideIcons[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in lucide-react`);
    return null;
  }

  return <IconComponent size={size} className={className} {...props} />;
};

// Pre-configured icon sets for common use cases
export const NavigationIcons = {
  Overview: LucideIcons.LayoutDashboard,
  Transactions: LucideIcons.ArrowLeftRight,
  Budgets: LucideIcons.PiggyBank,
  CashFlow: LucideIcons.TrendingUp,
  Goals: LucideIcons.Target,
  NetWorth: LucideIcons.Scale,
  Investments: LucideIcons.LineChart,
  Assets: LucideIcons.Wallet,
  Liabilities: LucideIcons.CreditCard,
  Recurring: LucideIcons.RefreshCw,
  Reports: LucideIcons.FileText,
  Insights: LucideIcons.Lightbulb,
  Help: LucideIcons.HelpCircle,
  Settings: LucideIcons.Settings,
};

export const ActionIcons = {
  Add: LucideIcons.Plus,
  Edit: LucideIcons.Pencil,
  Delete: LucideIcons.Trash2,
  Save: LucideIcons.Save,
  Cancel: LucideIcons.X,
  Search: LucideIcons.Search,
  Filter: LucideIcons.Filter,
  Sort: LucideIcons.ArrowUpDown,
  More: LucideIcons.MoreVertical,
  Download: LucideIcons.Download,
  Upload: LucideIcons.Upload,
  Share: LucideIcons.Share2,
  Copy: LucideIcons.Copy,
  Check: LucideIcons.Check,
  Close: LucideIcons.X,
};

export const StatusIcons = {
  Success: LucideIcons.CheckCircle,
  Error: LucideIcons.XCircle,
  Warning: LucideIcons.AlertTriangle,
  Info: LucideIcons.Info,
  Loading: LucideIcons.Loader2,
};

export const ThemeIcons = {
  Sun: LucideIcons.Sun,
  Moon: LucideIcons.Moon,
  Theme: LucideIcons.Palette,
};

export const UserIcons = {
  User: LucideIcons.User,
  Users: LucideIcons.Users,
  LogOut: LucideIcons.LogOut,
  LogIn: LucideIcons.LogIn,
  Bell: LucideIcons.Bell,
  Calendar: LucideIcons.Calendar,
  Clock: LucideIcons.Clock,
};

export const FinancialIcons = {
  Rupee: LucideIcons.IndianRupee,
  Dollar: LucideIcons.DollarSign,
  Euro: LucideIcons.Euro,
  Bank: LucideIcons.Building2,
  CreditCard: LucideIcons.CreditCard,
  Wallet: LucideIcons.Wallet,
  TrendingUp: LucideIcons.TrendingUp,
  TrendingDown: LucideIcons.TrendingDown,
  ArrowUp: LucideIcons.ArrowUp,
  ArrowDown: LucideIcons.ArrowDown,
  Percent: LucideIcons.Percent,
};

export default Icon;
