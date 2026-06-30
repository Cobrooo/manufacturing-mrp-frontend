import { useState } from 'react';
import ProductSelector from './components/ProductSelector';
import BomTreeView from './components/BomTreeView';
import { explodeBom, getItemById } from './api/mrpApi';

function App() {
  const [results, setResults] = useState([]);
  const [productName, setProductName] = useState('');
  const [targetQuantity, setTargetQuantity] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleExplode = async (productId, quantity) => {
    setLoading(true);
    setError('');

    try {
      const productResponse = await getItemById(productId);
      setProductName(productResponse.data.name);

      const explosionResponse = await explodeBom(productId, quantity);
      setResults(explosionResponse.data);
      setTargetQuantity(quantity);
    } catch (err) {
      setError(
        err.response?.data?.message || 'Something went wrong. Please try again.'
      );
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
      <h1>MRP Engine Dashboard</h1>

      <ProductSelector onExplode={handleExplode} />

      {loading && <p>Calculating BOM explosion...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && results.length > 0 && (
        <BomTreeView
          productName={productName}
          targetQuantity={targetQuantity}
          results={results}
        />
      )}
    </div>
  );
}

export default App;