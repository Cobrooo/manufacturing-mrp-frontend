import { useState } from 'react';
import ProductSelector from './components/ProductSelector';
import BomTreeView from './components/BomTreeView';
import MrpResultsTable from './components/MrpResultsTable';
import PurchaseOrderPanel from './components/PurchaseOrderPanel';
import Spinner from './components/Spinner';
import ErrorMessage from './components/ErrorMessage';
import SummaryStats from './components/SummaryStats';
import { explodeBom, getItemById } from './api/mrpApi';

function App() {
  const [results, setResults]               = useState([]);
  const [productName, setProductName]       = useState('');
  const [targetQuantity, setTargetQuantity] = useState(0);
  const [loading, setLoading]               = useState(false);
  const [error, setError]                   = useState('');
  const [activeTab, setActiveTab]           = useState('tree');

  const handleExplode = async (productId, quantity) => {
    setLoading(true);
    setError('');
    setResults([]);

    try {
      const productResponse   = await getItemById(productId);
      setProductName(productResponse.data.name);

      const explosionResponse = await explodeBom(productId, quantity);
      setResults(explosionResponse.data);
      setTargetQuantity(quantity);
      setActiveTab('tree');
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Failed to connect to backend. Make sure Spring Boot is running on port 8080.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    setError('');
    setResults([]);
  };

  return (
    <div style={styles.page}>

      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <div>
            <h1 style={styles.title}>MRP Engine Dashboard</h1>
            <p style={styles.subtitle}>
              Enterprise Material Requirements Planning System
            </p>
          </div>
          <div style={styles.headerBadge}>
            <span style={styles.dot}></span>
            Backend Connected
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.content}>

        {/* Production Order Form */}
        <ProductSelector onExplode={handleExplode} />

        {/* Loading Spinner */}
        {loading && (
          <Spinner message="Calculating BOM explosion and checking inventory..." />
        )}

        {/* Error Message */}
        {error && (
          <ErrorMessage message={error} onRetry={handleRetry} />
        )}

        {/* Summary Stats */}
        {!loading && results.length > 0 && (
          <SummaryStats
            results={results}
            productName={productName}
            targetQuantity={targetQuantity}
          />
        )}

        {/* Results Tabs */}
        {!loading && results.length > 0 && (
          <>
            <div style={styles.tabs}>
              <button
                onClick={() => setActiveTab('tree')}
                style={{
                  ...styles.tab,
                  background: activeTab === 'tree' ? '#2563eb' : '#f1f5f9',
                  color:      activeTab === 'tree' ? '#fff'    : '#334155',
                }}
              >
                BOM Tree View
              </button>
              <button
                onClick={() => setActiveTab('table')}
                style={{
                  ...styles.tab,
                  background: activeTab === 'table' ? '#2563eb' : '#f1f5f9',
                  color:      activeTab === 'table' ? '#fff'    : '#334155',
                }}
              >
                Requirements Table
              </button>
            </div>

            {activeTab === 'tree' && (
              <BomTreeView
                productName={productName}
                targetQuantity={targetQuantity}
                results={results}
              />
            )}

            {activeTab === 'table' && (
              <MrpResultsTable results={results} />
            )}
          </>
        )}

        {/* Purchase Order Panel — always visible */}
        <PurchaseOrderPanel />

      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    background: '#f8fafc',
    fontFamily: 'system-ui, -apple-system, sans-serif',
  },
  header: {
    background: '#1e3a5f',
    color: '#fff',
    padding: '0 40px',
  },
  headerContent: {
    maxWidth: '1100px',
    margin: '0 auto',
    padding: '20px 0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    margin: 0,
    fontSize: '22px',
    fontWeight: '600',
  },
  subtitle: {
    margin: '4px 0 0',
    fontSize: '13px',
    opacity: 0.75,
  },
  headerBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    background: 'rgba(255,255,255,0.1)',
    padding: '6px 14px',
    borderRadius: '20px',
    fontSize: '13px',
  },
  dot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    background: '#4ade80',
    display: 'inline-block',
  },
  content: {
    maxWidth: '1100px',
    margin: '0 auto',
    padding: '24px 20px',
  },
  tabs: {
    display: 'flex',
    gap: '8px',
    marginBottom: '12px',
  },
  tab: {
    padding: '8px 20px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '500',
    fontSize: '14px',
    transition: 'all 0.15s',
  },
};

export default App;