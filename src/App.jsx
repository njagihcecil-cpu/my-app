import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import LandingPage from './pages/LandingPage'
import ProductsPage from './pages/ProductsPage'
import AddProductForm from './pages/AddProductForm'
import NotFound from './pages/NotFound'

function App() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetch('http://localhost:3001/products')
      .then(res => res.json())
      .then(data => setProducts(data))
  }, []) 

  function handleAddProduct(newProduct) {
    setProducts(prev => [...prev, newProduct])
  }

  function handleUpdateProduct(updatedProduct) {
    setProducts(prev =>
      prev.map(p => p.id === updatedProduct.id ? updatedProduct : p)
    )
  }

  function handleDeleteProduct(id) {
    setProducts(prev => prev.filter(p => p.id !== id))
  }

  return (
    <div>

      <Navbar />

      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route
          path="/products"
          element={
            <ProductsPage
              products={products}
              onUpdate={handleUpdateProduct}
              onDelete={handleDeleteProduct}
            />
          }
        />

        <Route
          path="/add-product"
          element={<AddProductForm onAdd={handleAddProduct} />}
        />


        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
