import { useNavigate } from 'react-router-dom'

// NotFound renders when no route in App.jsx matches the current URL.
// The "*" catch-all route in App.jsx points here.
function NotFound() {
  const navigate = useNavigate()

  return (
    <div style={styles.container}>
      <h1 style={styles.code}>404</h1>
      <h2 style={styles.message}>Page Not Found</h2>
      <p style={styles.sub}>
        Looks like this page doesn't exist — maybe it was never brewed.
      </p>
      <button style={styles.btn} onClick={() => navigate('/')}>
        Back to Home
      </button>
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '80vh',
    textAlign: 'center',
    padding: '2rem',
  },
  code: {
    fontSize: '6rem',
    margin: 0,
    color: '#646cff',
  },
  message: {
    fontSize: '1.8rem',
    margin: '0.5rem 0',
  },
  sub: {
    color: '#aaaaaa',
    marginBottom: '2rem',
  },
  btn: {
    backgroundColor: '#646cff',
    color: '#ffffff',
    padding: '0.8rem 1.6rem',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    cursor: 'pointer',
  },
}

export default NotFound
