# Icon System Guide

This project uses **lucide-react** icons with a centralized icon system for consistency.

## Installation
Already installed: `lucide-react@^0.453.0`

## Usage

### 1. Direct Import (Most Common)
Import any Lucide icon directly:

```jsx
import { Home, User, Settings, Search } from 'lucide-react';

function MyComponent() {
  return (
    <div>
      <Home size={24} />
      <User className="text-blue-500" />
      <Settings strokeWidth={2} />
      <Search />
    </div>
  );
}
```

### 2. Using the Icon Component
Use the generic Icon component when you need dynamic icon names:

```jsx
import Icon from '../components/Icon';

function MyComponent() {
  return (
    <div>
      <Icon name="Home" size={24} />
      <Icon name="User" className="text-blue-500" />
    </div>
  );
}
```

### 3. Using Pre-configured Icon Sets
Use pre-configured icon sets for common use cases:

```jsx
import { NavigationIcons, ActionIcons, StatusIcons } from '../components/Icon';

function MyComponent() {
  const OverviewIcon = NavigationIcons.Overview;
  const AddIcon = ActionIcons.Add;
  const SuccessIcon = StatusIcons.Success;

  return (
    <div>
      <OverviewIcon size={20} />
      <AddIcon />
      <SuccessIcon className="text-green-500" />
    </div>
  );
}
```

## Available Icon Sets

### NavigationIcons
- Overview (LayoutDashboard)
- Transactions (ArrowLeftRight)
- Budgets (PiggyBank)
- CashFlow (TrendingUp)
- Goals (Target)
- NetWorth (Scale)
- Investments (LineChart)
- Assets (Wallet)
- Liabilities (CreditCard)
- Recurring (RefreshCw)
- Reports (FileText)
- Insights (Lightbulb)
- Help (HelpCircle)
- Settings (Settings)

### ActionIcons
- Add (Plus)
- Edit (Pencil)
- Delete (Trash2)
- Save (Save)
- Cancel (X)
- Search (Search)
- Filter (Filter)
- Sort (ArrowUpDown)
- More (MoreVertical)
- Download (Download)
- Upload (Upload)
- Share (Share2)
- Copy (Copy)
- Check (Check)
- Close (X)

### StatusIcons
- Success (CheckCircle)
- Error (XCircle)
- Warning (AlertTriangle)
- Info (Info)
- Loading (Loader2)

### ThemeIcons
- Sun (Sun)
- Moon (Moon)
- Theme (Palette)

### UserIcons
- User (User)
- Users (Users)
- LogOut (LogOut)
- LogIn (LogIn)
- Bell (Bell)
- Calendar (Calendar)
- Clock (Clock)

### FinancialIcons
- Rupee (IndianRupee)
- Dollar (DollarSign)
- Euro (Euro)
- Bank (Building2)
- CreditCard (CreditCard)
- Wallet (Wallet)
- TrendingUp (TrendingUp)
- TrendingDown (TrendingDown)
- ArrowUp (ArrowUp)
- ArrowDown (ArrowDown)
- Percent (Percent)

## Common Props

All Lucide icons support these props:

- `size` - Icon size in pixels (default: 24)
- `strokeWidth` - Stroke width (default: 2)
- `color` - Icon color
- `className` - CSS class name
- `absoluteStrokeWidth` - Preserve stroke width when scaling

Example:
```jsx
<Home size={32} strokeWidth={2.5} color="#635BFF" className="my-icon" />
```

## Finding Icons

Browse all available icons at: https://lucide.dev/icons/

## Migration Notes

Replace emoji icons with Lucide icons for a more professional look:

**Before:**
```jsx
<span>🏦</span>
<span>💳</span>
<span>📈</span>
```

**After:**
```jsx
import { Building2, CreditCard, TrendingUp } from 'lucide-react';

<Building2 size={20} />
<CreditCard size={20} />
<TrendingUp size={20} />
```

## Best Practices

1. **Use direct imports** for static icons (better tree-shaking)
2. **Use Icon component** only when icon name is dynamic
3. **Use pre-configured sets** for consistent icon mapping
4. **Keep size consistent** within the same context (e.g., all sidebar icons: 20px)
5. **Add meaningful class names** for styling and accessibility
