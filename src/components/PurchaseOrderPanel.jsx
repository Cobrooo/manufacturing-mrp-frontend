import { useEffect, useState } from 'react';
import {
  getPendingPurchaseOrders,
  approvePurchaseOrder,
  rejectPurchaseOrder,
} from '../api/mrpApi';

function PurchaseOrderPanel() {
  const [pendingOrders, setPendingOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const fetchPendingOrders = () => {
    setLoading(true);
    getPendingPurchaseOrders()
      .then((response) => setPendingOrders(response.data))
      .catch(() => showMessage('Failed to load purchase orders.', 'error'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchPendingOrders();
  }, []);

  const showMessage = (text, type) => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => setMessage(''), 3000);
  };

  const handleApprove = (id, itemName) => {
    approvePurchaseOrder(id)
      .then(() => {
        showMessage(`✅ PO for ${itemName} approved successfully.`, 'success');
        fetchPendingOrders();
      })
      .catch(() => showMessage('Failed to approve PO.', 'error'));
  };

  const handleReject = (id, itemName) => {
    rejectPurchaseOrder(id)
      .then(() => {
        showMessage(`❌ PO for ${itemName} rejected.`, 'error');
        fetchPendingOrders();
      })
      .catch(() => showMessage('Failed to reject PO.', 'error'));
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.heading}>Purchase Orders — Pending Approval</h2>
        <button onClick={fetchPendingOrders} style={styles.refreshBtn}>
          ↻ Refresh
        </button>
      </div>

      {message && (
        <div
          style={{
            ...styles.message,
            background: messageType === 'success' ? '#f0fdf4' : '#fef2f2',
            color: messageType === 'success' ? '#16a34a' : '#dc2626',
            border: `1px solid ${messageType === 'success' ? '#bbf7d0' : '#fecaca'}`,
          }}
        >
          {message}
        </div>
      )}

      {loading && <p>Loading purchase orders...</p>}

      {!loading && pendingOrders.length === 0 && (
        <div style={styles.emptyState}>
          <p>No pending purchase orders found.</p>
          <p style={{ fontSize: '13px', color: '#94a3b8' }}>
            Run a BOM explosion to generate purchase orders for shortages.
          </p>
        </div>
      )}

      {!loading && pendingOrders.length > 0 && (
        <table style={styles.table}>
          <thead>
            <tr style={styles.headerRow}>
              <th style={styles.th}>PO ID</th>
              <th style={styles.th}>Item</th>
              <th style={styles.th}>Required Quantity</th>
              <th style={styles.th}>Supplier</th>
              <th style={styles.th}>Created Date</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pendingOrders.map((po) => (
              <tr key={po.id} style={styles.row}>
                <td style={styles.td}>#{po.id}</td>
                <td style={{ ...styles.td, fontWeight: '500' }}>
                  {po.item.name}
                </td>
                <td style={styles.td}>
                  {po.requiredQuantity.toLocaleString()}
                </td>
                <td style={styles.td}>{po.supplierName}</td>
                <td style={styles.td}>
                  {new Date(po.createdDate).toLocaleDateString()}
                </td>
                <td style={styles.td}>
                  <button
                    onClick={() => handleApprove(po.id, po.item.name)}
                    style={styles.approveBtn}
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(po.id, po.item.name)}
                    style={styles.rejectBtn}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const styles = {
  container: {
    background: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
    marginTop: '20px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
  },
  heading: {
    fontSize: '18px',
    margin: 0,
  },
  refreshBtn: {
    padding: '6px 14px',
    background: '#f1f5f9',
    border: '1px solid #e2e8f0',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  message: {
    padding: '10px 16px',
    borderRadius: '6px',
    marginBottom: '12px',
    fontSize: '14px',
    fontWeight: '500',
  },
  emptyState: {
    textAlign: 'center',
    padding: '40px 0',
    color: '#64748b',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  headerRow: {
    background: '#f1f5f9',
  },
  th: {
    padding: '12px',
    textAlign: 'left',
    fontWeight: '600',
    fontSize: '14px',
    borderBottom: '2px solid #e2e8f0',
  },
  row: {
    borderBottom: '1px solid #e2e8f0',
  },
  td: {
    padding: '12px',
    fontSize: '14px',
  },
  approveBtn: {
    padding: '5px 12px',
    background: '#16a34a',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginRight: '8px',
    fontSize: '13px',
  },
  rejectBtn: {
    padding: '5px 12px',
    background: '#dc2626',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '13px',
  },
};

export default PurchaseOrderPanel;