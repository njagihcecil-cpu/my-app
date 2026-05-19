import { useState } from 'react'

function ProductCard({ product, onUpdate, onDelete }) {

  const [isEditing, setIsEditing] = useState(false)
  const [editName, setEditName] = useState(product.name)
  const [editDescription, setEditDescription] = useState(product.description)
  const [editOrigin, setEditOrigin] = useState(product.origin)
  const [editRoast, setEditRoast] = useState(product.roast)
  const [editPrice, setEditPrice] = useState(product.price)
  const [isSaving, setIsSaving] = useState(false)

  function handleSave() {
    setIsSaving(true)

    const updatedFields = {
      name: editName,
      description: editDescription,
      origin: editOrigin,
      roast: editRoast,
      price: parseFloat(editPrice),
    }

    fetch(`http://localhost:3001/products/${product.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedFields),
    })
      .then(res => res.json())
      .then(updatedProduct => {
        // Pass the full updated product back up to App state
        onUpdate(updatedProduct)
        setIsEditing(false)
        setIsSaving(false)
      })
  }

  // DELETE request — removes the product from the backend,
  // then calls onDelete to remove it from App state too.
  function handleDelete() {
    // Ask for confirmation before permanently deleting
    if (!window.confirm(`Delete "${product.name}"?`)) return

    fetch(`http://localhost:3001/products/${product.id}`, {
      method: 'DELETE',
    })
      .then(() => {
        // Pass the id up so App can filter this product out of state
        onDelete(product.id)
      })
  }

  // Cancel editing — reset all fields back to the original product values
  function handleCancel() {
    setEditName(product.name)
    setEditDescription(product.description)
    setEditOrigin(product.origin)
    setEditRoast(product.roast)
    setEditPrice(product.price)
    setIsEditing(false)
  }

  // ── EDIT MODE ───────────────────────────────────────────────────────────────
  if (isEditing) {
    return (
      <div style={styles.card}>

        <input
          style={styles.input}
          value={editName}
          onChange={e => setEditName(e.target.value)}
        />

        <input
          style={styles.input}
          value={editDescription}
          onChange={e => setEditDescription(e.target.value)}
        />

        <input
          style={styles.input}
          value={editOrigin}
          onChange={e => setEditOrigin(e.target.value)}
        />

        <select
          style={styles.input}
          value={editRoast}
          onChange={e => setEditRoast(e.target.value)}
        >
          <option value="Light">Light</option>
          <option value="Medium">Medium</option>
          <option value="Dark">Dark</option>
        </select>

        <input
          style={styles.input}
          type="number"
          value={editPrice}
          onChange={e => setEditPrice(e.target.value)}
          min="0"
          step="0.01"
        />

        <div style={styles.buttonGroup}>
          <button
            style={styles.saveBtn}
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving ? 'Saving...' : 'Save'}
          </button>
          <button style={styles.cancelBtn} onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>
    )
  }

  // ── VIEW MODE ───────────────────────────────────────────────────────────────
  return (
    <div style={styles.card}>
      <h3 style={styles.name}>{product.name}</h3>
      <p style={styles.detail}>{product.description}</p>
      <p style={styles.detail}>🌍 <strong>Origin:</strong> {product.origin}</p>
      <p style={styles.detail}>🔥 <strong>Roast:</strong> {product.roast}</p>
      {/* <p style={styles.price}>${product.price.toFixed(2)}</p> */}
     

      <div style={styles.buttonGroup}>
        <button style={styles.editBtn} onClick={() => setIsEditing(true)}>
          Edit
        </button>
        <button style={styles.deleteBtn} onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  )
}

const styles = {
  card: {
    backgroundColor: '#1a1a1a',
    border: '1px solid #333',
    borderRadius: '10px',
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.4rem',
  },
  name: {
    margin: '0 0 0.5rem 0',
    fontSize: '1.2rem',
  },
  detail: {
    margin: 0,
    color: '#aaaaaa',
    fontSize: '0.95rem',
  },
  price: {
    margin: '0.5rem 0',
    fontSize: '1.3rem',
    fontWeight: 'bold',
    color: '#646cff',
  },
  input: {
    padding: '0.5rem',
    borderRadius: '6px',
    border: '1px solid #444',
    backgroundColor: '#242424',
    color: '#ffffff',
    fontSize: '0.95rem',
  },
  buttonGroup: {
    display: 'flex',
    gap: '0.8rem',
    marginTop: '0.8rem',
  },
  editBtn: {
    backgroundColor: '#646cff',
    color: '#ffffff',
    border: 'none',
    borderRadius: '6px',
    padding: '0.5rem 1rem',
    cursor: 'pointer',
  },
  deleteBtn: {
    backgroundColor: 'transparent',
    color: '#ff4444',
    border: '2px solid #ff4444',
    borderRadius: '6px',
    padding: '0.5rem 1rem',
    cursor: 'pointer',
  },
  saveBtn: {
    backgroundColor: '#22c55e',
    color: '#ffffff',
    border: 'none',
    borderRadius: '6px',
    padding: '0.5rem 1rem',
    cursor: 'pointer',
  },
  cancelBtn: {
    backgroundColor: 'transparent',
    color: '#aaaaaa',
    border: '2px solid #aaaaaa',
    borderRadius: '6px',
    padding: '0.5rem 1rem',
    cursor: 'pointer',
  },
}

export default ProductCard
