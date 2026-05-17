import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <nav style={styles.nav}>
      <span style={styles.brand}>☕ Coffee R Us</span>

      <div style={styles.links}>
        <NavLink
          to="/"
          end  
          style={({ isActive }) => isActive ? styles.activeLink : styles.link}
        >
          Home
        </NavLink>

        <NavLink
          to="/products"
          style={({ isActive }) => isActive ? styles.activeLink : styles.link}
        >
          Products
        </NavLink>

        <NavLink
          to="/add-product"
          style={({ isActive }) => isActive ? styles.activeLink : styles.link}
        >
          Add Product
        </NavLink>
      </div>
    </nav>
  )
}

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    backgroundColor: '#1a1a1a',
    borderBottom: '2px solid #646cff',
  },
  brand: {
    fontSize: '1.4rem',
    fontWeight: 'bold',
    color: '#ffffff',
  },
  links: {
    display: 'flex',
    gap: '1.5rem',
  },
  link: {
    color: '#aaaaaa',
    textDecoration: 'none',
    fontSize: '1rem',
  },
  activeLink: {
    color: '#646cff',
    textDecoration: 'none',
    fontSize: '1rem',
    fontWeight: 'bold',
    borderBottom: '2px solid #646cff',
  },
}

export default Navbar
