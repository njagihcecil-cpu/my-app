import { useState } from 'react'
import ProductCard from '../components/ProductCard'

// ProductsPage receives the full products list from App state.
// onUpdate and onDelete are passed straight through to each ProductCard.
function ProductsPage({ products, onUpdate, onDelete }) {

  // searchQuery drives the live search filter.
  // It is local state because nothing outside this page needs to know about it.
  const [searchQuery, setSearchQuery] = useState('')

  // Filter products every render based on the current search query.
  // toLowerCase on both sides makes the search case-insensitive.
  // We check both name and origin so the admin can search either field.
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.roast.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Our Coffees</h2>

      {/* Search bar — controlled input that updates searchQuery on every keystroke */}
      <input
        style={styles.searchBar}
        type="text"
        placeholder="Search by name, origin, or roast..."
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
      />

      {/* Show how many results are currently visible */}
      <p style={styles.resultCount}>
        {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
      </p>

      {/* If the search returns nothing, show a helpful message instead of an empty grid */}
      {filteredProducts.length === 0 ? (
        <p style={styles.noResults}>
          No coffees match "{searchQuery}". Try a different search.
        </p>
      ) : (
        <div style={styles.grid}>
          {/* Map over filteredProducts — not the full products array —
              so the grid always reflects the current search */}
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
