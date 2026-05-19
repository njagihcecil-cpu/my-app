import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function AddProductForm({ onAdd }) {
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [origin, setOrigin] = useState('')
  const [roast, setRoast] = useState('Medium')
  const [price, setPrice] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [error, setError] = useState(null)

  function handleSubmit(e) {
    
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    const newProduct = {
      name,
      description,
      origin,
      roast,
      price: parseFloat(price),
    }

    fetch('http://localhost:3001/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct),
    })
      .then(res => res.json())
      .then(savedProduct => {
        
        onAdd(savedProduct)
        
        navigate('/products')
      })
      .catch(() => {
        setError('Something went wrong. Please try again.')
        setIsSubmitting(false)
      })
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Add New Coffee</h2>

      {error && <p style={styles.error}>{error}</p>}

      <form onSubmit={handleSubmit} style={styles.form}>

        <label style={styles.label}>Name</label>
        <input
          style={styles.input}
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="e.g. Vanilla Bean"
          required
        />

        <label style={styles.label}>Description</label>
        <input
          style={styles.input}
          type="text"
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="e.g. Medium roast with nutty flavor"
          required
        />

        <label style={styles.label}>Origin</label>
        <input
          style={styles.input}
          type="text"
          value={origin}
          onChange={e => setOrigin(e.target.value)}
          placeholder="e.g. Colombia"
          required
        />

        <label style={styles.label}>Roast Level</label>
       
        <select
          style={styles.input}
          value={roast}
          onChange={e => setRoast(e.target.value)}
        >
          <option value="Light">Light</option>
          <option value="Medium">Medium</option>
          <option value="Dark">Dark</option>
        </select>

        <label style={styles.label}>Price ($)</label>
        <input
          style={styles.input}
          type="number"
          value={price}
          onChange={e => setPrice(e.target.value)}
          placeholder="e.g. 12.99"
          min="0"
          step="0.01"
          required
        />

        <div style={styles.buttonGroup}>
          <button
            style={styles.submitBtn}
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Adding...' : 'Add Coffee'}
          </button>

          <button
            style={styles.cancelBtn}
            type="button"
            onClick={() => navigate('/products')}
          >
            Cancel
          </button>
        </div>

      </form>
    </div>
  )
}

const styles = {
  container: {
    maxWidth: '500px',
    margin: '2rem auto',
    padding: '2rem',
  },
  heading: {
    marginBottom: '1.5rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  label: {
    fontWeight: 'bold',
    marginTop: '0.5rem',
  },
  input: {
    padding: '0.6rem',
    borderRadius: '6px',
    border: '1px solid #444',
    backgroundColor: '#1a1a1a',
    color: '#ffffff',
    fontSize: '1rem',
  },
  buttonGroup: {
    display: 'flex',
    gap: '1rem',
    marginTop: '1rem',
  },
  submitBtn: {
    backgroundColor: '#646cff',
    color: '#ffffff',
    padding: '0.8rem 1.6rem',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    cursor: 'pointer',
  },
  cancelBtn: {
    backgroundColor: 'transparent',
    color: '#646cff',
    padding: '0.8rem 1.6rem',
    border: '2px solid #646cff',
    borderRadius: '8px',
    fontSize: '1rem',
    cursor: 'pointer',
  },
  error: {
    color: '#ff4444',
    marginBottom: '1rem',
  },
}

export default AddProductForm
