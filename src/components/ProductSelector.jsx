import { useEffect, useState } from 'react';
import { getFinishedGoods } from '../api/mrpApi';

function ProductSelector({ onExplode }) {
  const [finishedGoods, setFinishedGoods] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState('');
  const [targetQuantity, setTargetQuantity] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    getFinishedGoods()
      .then((response) => setFinishedGoods(response.data))
      .catch(() => setError('Failed to load products.'));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!selectedProductId) {
      setError('Please select a product.');
      return;
    }
    if (!targetQuantity || Number(targetQuantity) <= 0) {
      setError('Please enter a valid quantity greater than zero.');
      return;
    }

    onExplode(selectedProductId, Number(targetQuantity));
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2>Production Order</h2>

      <label style={styles.label}>
        Select Product
        <select
          value={selectedProductId}
          onChange={(e) => setSelectedProductId(e.target.value)}
          style={styles.input}
        >
          <option value="">-- Select a finished good --</option>
          {finishedGoods.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </label>

      <label style={styles.label}>
        Target Quantity
        <input
          type="number"
          min="1"
          value={targetQuantity}
          onChange={(e) => setTargetQuantity(e.target.value)}
          placeholder="e.g. 500"
          style={styles.input}
        />
      </label>

      {error && <p style={styles.error}>{error}</p>}

      <button type="submit" style={styles.button}>
        Explode BOM
      </button>
    </form>
  );
}

const styles = {
  form: {
    background: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    marginBottom: '12px',
    fontWeight: '500',
  },
  input: {
    display: 'block',
    width: '100%',
    padding: '8px',
    marginTop: '4px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px 20px',
    background: '#2563eb',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    fontSize: '14px',
  },
};

export default ProductSelector;