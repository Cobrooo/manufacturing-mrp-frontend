import { useState } from 'react';
import ProductSelector from './components/ProductSelector';
import BomTreeView from './components/BomTreeView';
import MrpResultsTable from './components/MrpResultsTable';
import PurchaseOrderPanel from './components/PurchaseOrderPanel';
import { explodeBom, getItemById } from './api/mrpApi';

function App() {
  const [results, setResults] = useState([]);
  const [productName, setProductName] = useState('');
  const [targetQuantity, setTargetQuantity] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('tree');

  const handleExplode = async (productId, quantity) => {
    setLoading(true);
    setError('');
    setResults([]);

    try {
      const productResponse = await getItemById(productId);
      setProductName(productResponse.data.name);

      const explosionResponse = await explodeBom(productId, quantity);
      setResults(explosionResponse.data);
      setTargetQuantity(quantity);
      setActiveTab('tree');
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Something went wrong. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>

      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>MRP Engine Dashboard</h1>
        <p style={styles.subtitle}>
          Material Requirements Planning System
        </p>
      </div>

      {/* Main content */}
      <div style={styles.content}>

        {/* Production Order Form */}
        <ProductSelector onExplode={handleExplode} />

        {/* Loading */}
        {loading && (
          <div style={styles.loadingBox}>
            Calculating BOM explosion...
          </div>
        )}

        {/* Error */}
        {error && (
          <div style={styles.errorBox}>{error}</div>
        )}

        {/* Results Section */}
        {!loading && results.length > 0 && (
          <>
            {/* Tab switcher */}
            <div style={styles.tabs}>
              <button
                onClick={() => setActiveTab('tree')}
                style={{
                  ...styles.tab,
                  background: activeTab === 'tree' ? '#2563eb' : '#f1f5f9',
                  color: activeTab === 'tree' ? '#fff' : '#334155',
                }}
              >
                BOM Tree
              </button>
              <button
                onClick={() => setActiveTab('table')}
                style={{
                  ...styles.tab,
                  background: activeTab === 'table' ? '#2563eb' : '#f1f5f9',
                  color: activeTab === 'table' ? '#fff' : '#334155',
                }}
              >
                Requirements Table
              </button>
            </div>

            {/* BOM Tree View */}
            {activeTab === 'tree' && (
              <BomTreeView
                productName={productName}
                targetQuantity={targetQuantity}
                results={results}
              />
            )}

            {/* MRP Results Table */}
            {activeTab === 'table' && (
              <MrpResultsTable results={results} />
            )}
          </>
        )}

        {/* Purchase Order Panel - always visible */}
        <PurchaseOrderPanel />

      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    background: '#f8fafc',
    fontFamily: 'sans-serif',
  },
  header: {
    background: '#1e3a5f',
    color: '#fff',
    padding: '20px 40px',
    marginBottom: '0',
  },
  title: {
    margin: 0,
    fontSize: '24px',
  },
  subtitle: {
    margin: '4px 0 0',
    fontSize: '14px',
    opacity: 0.8,
  },
  content: {
    maxWidth: '1100px',
    margin: '0 auto',
    padding: '24px 20px',
  },
  loadingBox: {
    background: '#eff6ff',
    color: '#2563eb',
    padding: '12px 16px',
    borderRadius: '6px',
    border: '1px solid #bfdbfe',
    marginBottom: '16px',
  },
  errorBox: {
    background: '#fef2f2',
    color: '#dc2626',
    padding: '12px 16px',
    borderRadius: '6px',
    border: '1px solid #fecaca',
    marginBottom: '16px',
  },
  tabs: {
    display: 'flex',
    gap: '8px',
    marginTop: '20px',
    marginBottom: '12px',
  },
  tab: {
    padding: '8px 20px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '500',
    fontSize: '14px',
  },
};

export default App;