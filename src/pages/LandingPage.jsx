import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// LandingPage fetches store_info from the backend and displays it.
// It also gives the admin two quick-access buttons to navigate the app.
function LandingPage() {
  // storeInfo holds the single object from the store_info array in db.json
  const [storeInfo, setStoreInfo] = useState(null)

  // useNavigate gives us a function to programmatically change routes,
  // used here for the call-to-action buttons
  const navigate = useNavigate()

  // Fetch store info once when the component mounts
  useEffect(() => {
    fetch('http://localhost:3001/store_info')
      .then(res => res.json())
      .then(data => setStoreInfo(data[0])) // db.json returns an array, we want the first item
  }, [])

  // Show a loading message while the fetch is in progress
  if (!storeInfo) return <p style={styles.loading}>Loading...</p>

  return (
    <div style={styles.container}>
      <div style={styles.hero}>
        <h1 style={styles.title}>☕ {storeInfo.name}</h1>
        <p style={styles.description}>{storeInfo.description}</p>
        <p style={styles.phone}>📞 {storeInfo.phone_number}</p>

        <div style={styles.buttonGroup}>
          {/* Navigates to the products page to view all coffee */}
          <button style={styles.primaryBtn} onClick={() => navigate('/products')}>
            View Products
          </button>

          {/* Navigates to the form to add a new coffee product */}
          <button style={styles.secondaryBtn} onClick={() => navigate('/add-product')}>
            Add New Product
          </button>
        </div>
      </div>
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '80vh',
    padding: '2rem',
  },
  hero: {
    textAlign: 'center',
    maxWidth: '600px',
  },
  title: {
    fontSize: '3rem',
    marginBottom: '1rem',
  },
  description: {
    fontSize: '1.2rem',
    color: '#aaaaaa',
    marginBottom: '0.5rem',
  },
  phone: {
    fontSize: '1rem',
    color: '#aaaaaa',
    marginBottom: '2rem',
  },
  buttonGroup: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
  },
  primaryBtn: {
    backgroundColor: '#646cff',
    color: '#ffffff',
    padding: '0.8rem 1.6rem',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    cursor: 'pointer',
  },
  secondaryBtn: {
    backgroundColor: 'transparent',
    color: '#646cff',
    padding: '0.8rem 1.6rem',
    border: '2px solid #646cff',
    borderRadius: '8px',
    fontSize: '1rem',
    cursor: 'pointer',
  },
  loading: {
    textAlign: 'center',
    marginTop: '4rem',
    color: '#aaaaaa',
  },
}

export default LandingPage
