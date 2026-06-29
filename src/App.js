import { useEffect, useState } from 'react';
import { getAllItems } from './api/mrpApi';

function App() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAllItems()
      .then((response) => {
        console.log('Items fetched:', response.data);
        setItems(response.data);
      })
      .catch((err) => {
        console.error('Error fetching items:', err);
        setError('Failed to connect to backend. Is Spring Boot running?');
      });
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>MRP Engine — Connection Test</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!error && (
        <>
          <p>Successfully connected! Found {items.length} items.</p>
          <ul>
            {items.map((item) => (
              <li key={item.id}>
                {item.name} — {item.type}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default App;