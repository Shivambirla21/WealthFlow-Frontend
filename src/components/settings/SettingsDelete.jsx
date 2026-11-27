import { useState } from 'react';

export default function SettingsDelete() {
  const [showModal, setShowModal] = useState(false);
  const [deleteText, setDeleteText] = useState('');

  const handleDeleteClick = () => {
    setDeleteText('');
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleConfirmDelete = () => {
    if (deleteText === 'DELETE') {
      handleCloseModal();
      console.log('Demo only — nothing was deleted');
    }
  };

  return (
    <>
      <div className="settings-card danger">
        <h2 style={{ color: 'var(--danger)' }}>Delete account</h2>
        <div className="subtitle">Permanently delete your WealthFlow account and all associated data. This can't be undone.</div>
        <div className="row">
          <div>
            <b>Before you go</b>
            <span className="subtitle">Export your data first. Deleted accounts can't be recovered.</span>
          </div>
          <button type="button" className="btn danger" onClick={handleDeleteClick}>Delete account…</button>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Delete your account?</h3>
            <div className="subtitle">This permanently removes your profile, accounts and history. Type <b style={{ color: 'var(--text)' }}>DELETE</b> to confirm.</div>
            <input
              type="text"
              className="input"
              placeholder="Type DELETE"
              value={deleteText}
              onChange={(e) => setDeleteText(e.target.value)}
            />
            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
              <button type="button" className="btn" onClick={handleCloseModal}>Cancel</button>
              <button
                type="button"
                className={`btn danger ${deleteText === 'DELETE' ? 'filled' : ''}`}
                onClick={handleConfirmDelete}
                disabled={deleteText !== 'DELETE'}
              >
                Delete account
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .settings-card { background: var(--surface); border: 1px solid var(--border); border-radius: 16px; padding: 26px; max-width: 820px; }
        .settings-card.danger { border-color: rgba(242, 107, 91, 0.5); }
        .settings-card h2 { font-size: 20px; letter-spacing: -0.4px; margin-bottom: 4px; }
        .subtitle { color: var(--text-muted); font-size: 13px; }
        .settings-card > .subtitle { margin-bottom: 18px; }
        .row { display: flex; justify-content: space-between; align-items: center; gap: 20px; padding: 16px 0; border-top: 1px solid var(--border); }
        .row:first-of-type { border-top: 0; }
        .row b { display: block; margin-bottom: 2px; }
        .btn { padding: 10px 16px; border: 1px solid var(--border); border-radius: 10px; background: var(--surface); color: var(--text); font: 600 14px inherit; cursor: pointer; }
        .btn.danger { border-color: var(--danger); color: var(--danger); }
        .btn.danger.filled { background: var(--danger); color: #fff; }
        .modal-overlay { position: fixed; inset: 0; background: rgba(5, 6, 10, 0.65); display: grid; place-items: center; z-index: 20; }
        .modal { width: 420px; background: var(--surface); border: 1px solid var(--border); border-radius: 20px; padding: 26px; box-shadow: 0 30px 80px rgba(0, 0, 0, 0.1); }
        .modal h3 { margin-bottom: 8px; font-size: 18px; }
        .input { width: 100%; padding: 10px 14px; border: 1px solid var(--border); border-radius: 10px; background: var(--bg); color: var(--text); font: inherit; outline: none; margin: 14px 0; }
        .input:focus { border-color: var(--primary); box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.25); }
      `}</style>
    </>
  );
}
