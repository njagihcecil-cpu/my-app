import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function LandingPage() {
  const [storeInfo, setStoreInfo] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    fetch('http://localhost:3001/store_info')
      .then(res => res.json())
      .then(data => setStoreInfo(data[0]))
  }, [])

  if (!storeInfo) return <p style={styles.loading}>Loading...</p>

  return (
    <div style={styles.container}>
      <div style={styles.hero}>
        <h1 style={styles.title}>☕ {storeInfo.name}</h1>
        <p style={styles.description}>{storeInfo.description}</p>
        <p style={styles.phone}>📞 {storeInfo.phone_number}</p>

        <div style={styles.buttonGroup}>
          <button style={styles.primaryBtn} onClick={() => navigate('/products')}>
            View Products
          </button>

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
