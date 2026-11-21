import { useState } from 'react';
import AssetsHeader from '../components/assets/AssetsHeader.jsx';
import AssetsSummary from '../components/assets/AssetsSummary.jsx';
import AssetAllocation from '../components/assets/AssetAllocation.jsx';
import AssetsList from '../components/assets/AssetsList.jsx';
import AssetModal from '../components/assets/AssetModal.jsx';

export default function AssetsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editAssetIndex, setEditAssetIndex] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showUndo, setShowUndo] = useState(false);
  const [lastDeleted, setLastDeleted] = useState(null);

  const categories = [
    { name: 'Bank accounts', icon: '🏦', color: '#635BFF' },
    { name: 'Cash', icon: '💵', color: '#14B8A6' },
    { name: 'Investments', icon: '📈', color: '#A78BFA' },
    { name: 'Property', icon: '🏠', color: '#60A5FA' },
    { name: 'Vehicles', icon: '🚗', color: '#F59E0B' },
    { name: 'Other', icon: '💎', color: '#9CA3AF' }
  ];

  const [assets, setAssets] = useState([
    { name: 'HDFC Savings', categoryIndex: 0, value: 125000, purchaseValue: 119800, status: 'Savings · Synced today' },
    { name: 'SBI Salary Account', categoryIndex: 0, value: 48200, purchaseValue: 46000, status: 'Savings · Synced today' },
    { name: 'Axis Savings', categoryIndex: 0, value: 22600, purchaseValue: 22600, status: 'Savings · Synced 2 days ago' },
    { name: 'Cash in hand', categoryIndex: 1, value: 8500, purchaseValue: 8500, status: 'Manual' },
    { name: 'Paytm Wallet', categoryIndex: 1, value: 2400, purchaseValue: 2000, status: 'Wallet' },
    { name: 'Equity portfolio', categoryIndex: 2, value: 440000, purchaseValue: 368000, status: 'Stocks · Zerodha' },
    { name: 'Mutual funds', categoryIndex: 2, value: 385000, purchaseValue: 327000, status: 'SIPs · Groww' },
    { name: 'Sovereign Gold Bonds', categoryIndex: 2, value: 82800, purchaseValue: 69600, status: 'Gold · 12 units' },
    { name: 'Land plot, Indore', categoryIndex: 3, value: 1850000, purchaseValue: 1500000, status: 'Property · Purchased 2021' },
    { name: 'Honda Activa (2021)', categoryIndex: 4, value: 52000, purchaseValue: 78000, status: 'Vehicle · Depreciating' },
    { name: 'Gold jewellery', categoryIndex: 5, value: 120000, purchaseValue: 95000, status: 'Other · Family' }
  ]);

  const handleThemeToggle = () => {
    const html = document.documentElement;
    html.dataset.theme = html.dataset.theme === 'dark' ? 'light' : 'dark';
  };

  const handleAddAsset = () => {
    setEditAssetIndex(null);
    setIsModalOpen(true);
  };

  const handleEditAsset = (index) => {
    setEditAssetIndex(index);
    setIsModalOpen(true);
  };

  const handleSaveAsset = (assetData) => {
    if (editAssetIndex !== null) {
      const updated = [...assets];
      updated[editAssetIndex] = { ...updated[editAssetIndex], ...assetData };
      setAssets(updated);
      showToastMessage('✓ Asset updated');
    } else {
      setAssets([...assets, assetData]);
      showToastMessage('✓ Asset added');
    }
  };

  const handleDeleteAsset = (index) => {
    const deleted = assets[index];
    setLastDeleted({ index, asset: deleted });
    const updated = assets.filter((_, i) => i !== index);
    setAssets(updated);
    showToastMessage('Asset deleted', true);
  };

  const handleUndo = () => {
    if (lastDeleted) {
      const updated = [...assets];
      updated.splice(lastDeleted.index, 0, lastDeleted.asset);
      setAssets(updated);
      setLastDeleted(null);
      setShowToast(false);
    }
  };

  const showToastMessage = (message, withUndo = false) => {
    setToastMessage(message);
    setShowUndo(withUndo);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3500);
  };

  const editAsset = editAssetIndex !== null ? assets[editAssetIndex] : null;

  return (
    <div className="assets-page">
      <AssetsHeader onThemeToggle={handleThemeToggle} onAddAsset={handleAddAsset} />
      <AssetsSummary assets={assets} />
      <AssetAllocation assets={assets} categories={categories} />
      <AssetsList
        assets={assets}
        categories={categories}
        onEdit={handleEditAsset}
        onDelete={handleDeleteAsset}
      />
      <AssetModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveAsset}
        categories={categories}
        editAsset={editAsset}
      />
      {showToast && (
        <div className={`toast ${showToast ? 'show' : ''}`}>
          <span>{toastMessage}</span>
          {showUndo && <u onClick={handleUndo}>Undo</u>}
        </div>
      )}
      <style>{`
        .assets-page {
          flex: 1;
          min-width: 0;
          padding: 28px 40px 56px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .toast {
          position: fixed;
          right: 28px;
          bottom: 28px;
          background: var(--surface);
          border: 1px solid var(--success);
          padding: 12px 18px;
          border-radius: 12px;
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.25);
          opacity: 0;
          transform: translateY(10px);
          transition: 0.3s;
          pointer-events: none;
          display: flex;
          gap: 14px;
        }

        .toast.show {
          opacity: 1;
          transform: none;
          pointer-events: auto;
        }

        .toast u {
          color: #A5A0FF;
          cursor: pointer;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}
