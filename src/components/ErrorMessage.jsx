function ErrorMessage({ message, onRetry }) {
  if (!message) return null;

  return (
    <div style={styles.container}>
      <span style={styles.icon}>⚠️</span>
      <div style={styles.textBox}>
        <p style={styles.title}>Something went wrong</p>
        <p style={styles.message}>{message}</p>
      </div>
      {onRetry && (
        <button onClick={onRetry} style={styles.retryBtn}>
          Retry
        </button>
      )}
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    background: '#fef2f2',
    border: '1px solid #fecaca',
    borderRadius: '8px',
    padding: '14px 16px',
    marginBottom: '16px',
  },
  icon: {
    fontSize: '18px',
    marginTop: '2px',
  },
  textBox: {
    flex: 1,
  },
  title: {
    margin: '0 0 4px',
    fontWeight: '600',
    color: '#dc2626',
    fontSize: '14px',
  },
  message: {
    margin: 0,
    color: '#7f1d1d',
    fontSize: '13px',
  },
  retryBtn: {
    padding: '5px 12px',
    background: '#dc2626',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '13px',
  },
};

export default ErrorMessage;