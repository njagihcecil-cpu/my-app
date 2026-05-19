import { useState } from 'react'
import ProductCard from '../components/ProductCard'

function ProductsPage({ products, onUpdate, onDelete }) {

  const [searchQuery, setSearchQuery] = useState('')

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.roast.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Our Coffees</h2>

      <input
        style={styles.searchBar}
        type="text"
        placeholder="Search by name, origin, or roast..."
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
      />

      <p style={styles.resultCount}>
        {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
      </p>

      {filteredProducts.length === 0 ? (
        <p style={styles.noResults}>
          No coffees match "{searchQuery}". Try a different search.
        </p>
      ) : (
        <div style={styles.grid}>
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onUpdate={onUpdate}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  )
}

const styles = {
  container: {
    maxWidth: '900px',
    margin: '2rem auto',
    padding: '0 1.5rem',
  },
  heading: {
    marginBottom: '1rem',
  },
  searchBar: {
    width: '100%',
    padding: '0.75rem 1rem',
    borderRadius: '8px',
    border: '1px solid #444',
    backgroundColor: '#1a1a1a',
    color: '#ffffff',
    fontSize: '1rem',
    marginBottom: '0.5rem',
    boxSizing: 'border-box',
  },
  resultCount: {
    color: '#aaaaaa',
    fontSize: '0.9rem',
    marginBottom: '1.5rem',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
    gap: '1.5rem',
  },
  noResults: {
    color: '#aaaaaa',
    textAlign: 'center',
    marginTop: '3rem',
  },
}

export default ProductsPage
