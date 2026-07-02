function SummaryStats({ results, productName, targetQuantity }) {
  if (!results || results.length === 0) return null;

  const totalMaterials  = results.length;
  const shortageCount   = results.filter((r) => r.netRequirement > 0).length;
  const sufficientCount = totalMaterials - shortageCount;

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <p style={styles.label}>Product</p>
        <p style={styles.value}>{productName}</p>
      </div>
      <div style={styles.card}>
        <p style={styles.label}>Order Quantity</p>
        <p style={styles.value}>{targetQuantity.toLocaleString()} units</p>
      </div>
      <div style={styles.card}>
        <p style={styles.label}>Total Materials</p>
        <p style={styles.value}>{totalMaterials}</p>
      </div>
      <div style={{ ...styles.card, borderLeft: '4px solid #dc2626' }}>
        <p style={styles.label}>Shortages</p>
        <p style={{ ...styles.value, color: '#dc2626' }}>{shortageCount}</p>
      </div>
      <div style={{ ...styles.card, borderLeft: '4px solid #16a34a' }}>
        <p style={styles.label}>Sufficient Stock</p>
        <p style={{ ...styles.value, color: '#16a34a' }}>{sufficientCount}</p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap',
    marginBottom: '20px',
    marginTop: '16px',
  },
  card: {
    flex: '1',
    minWidth: '140px',
    background: '#fff',
    padding: '14px 16px',
    borderRadius: '8px',
    boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
    borderLeft: '4px solid #2563eb',
  },
  label: {
    margin: '0 0 4px',
    fontSize: '12px',
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
  },
  value: {
    margin: 0,
    fontSize: '20px',
    fontWeight: '600',
    color: '#1e293b',
  },
};

export default SummaryStats;