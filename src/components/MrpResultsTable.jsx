function MrpResultsTable({ results }) {
  if (!results || results.length === 0) return null;

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>MRP Results — Material Requirements</h2>
      <table style={styles.table}>
        <thead>
          <tr style={styles.headerRow}>
            <th style={styles.th}>Material</th>
            <th style={styles.th}>Type</th>
            <th style={styles.th}>Gross Requirement</th>
            <th style={styles.th}>On-Hand Stock</th>
            <th style={styles.th}>Net Requirement</th>
            <th style={styles.th}>Status</th>
          </tr>
        </thead>
        <tbody>
          {results.map((item) => {
            const isShortage = item.netRequirement > 0;
            return (
              <tr
                key={item.itemId}
                style={{
                  ...styles.row,
                  background: isShortage ? '#fef2f2' : '#f0fdf4',
                }}
              >
                <td style={styles.td}>{item.itemName}</td>
                <td style={styles.td}>{item.itemType}</td>
                <td style={styles.td}>{item.grossRequirement.toLocaleString()}</td>
                <td style={styles.td}>{item.onHandQuantity.toLocaleString()}</td>
                <td
                  style={{
                    ...styles.td,
                    fontWeight: 'bold',
                    color: isShortage ? '#dc2626' : '#16a34a',
                  }}
                >
                  {item.netRequirement.toLocaleString()}
                </td>
                <td style={styles.td}>
                  <span
                    style={{
                      ...styles.badge,
                      background: isShortage ? '#dc2626' : '#16a34a',
                    }}
                  >
                    {isShortage ? 'Shortage' : 'Sufficient'}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
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
  heading: {
    marginBottom: '16px',
    fontSize: '18px',
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
  badge: {
    color: '#fff',
    padding: '3px 10px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '500',
  },
};

export default MrpResultsTable;