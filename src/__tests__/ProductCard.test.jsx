import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import ProductCard from '../components/ProductCard'

// A mock project that matches the shape of our db.json products
const mockProduct = {
  id: 1,
  name: 'Weather App',
  description: 'A real-time weather application.',
  origin: 'React',
  roast: 'JavaScript',
  github: 'https://github.com/test/weather-app',
}

// Mock handler functions — vi.fn() lets us track if they were called
const mockOnUpdate = vi.fn()
const mockOnDelete = vi.fn()

// Helper to render the card with default props every time
function renderCard(product = mockProduct) {
  render(
    <ProductCard
      product={product}
      onUpdate={mockOnUpdate}
      onDelete={mockOnDelete}
    />
  )
}

describe('ProductCard', () => {

  beforeEach(() => {
    // Reset mock call counts before each test so they don't bleed into each other
    vi.clearAllMocks()
  })

  // ── VIEW MODE TESTS ─────────────────────────────────────────────────────────

  it('renders the project name', () => {
    renderCard()
    expect(screen.getByText('Weather App')).toBeInTheDocument()
  })

  it('renders the project description', () => {
    renderCard()
    expect(screen.getByText('A real-time weather application.')).toBeInTheDocument()
  })

  it('renders the framework and language', () => {
    renderCard()
    expect(screen.getByText(/React/)).toBeInTheDocument()
    expect(screen.getByText(/JavaScript/)).toBeInTheDocument()
  })


  it('renders Edit and Delete buttons', () => {
    renderCard()
    expect(screen.getByText('Edit')).toBeInTheDocument()
    expect(screen.getByText('Delete')).toBeInTheDocument()
  })

  // ── EDIT MODE TESTS ─────────────────────────────────────────────────────────

  it('switches to edit mode when Edit is clicked', () => {
    renderCard()
    fireEvent.click(screen.getByText('Edit'))
    // In edit mode the Save and Cancel buttons should appear
    expect(screen.getByText('Save')).toBeInTheDocument()
    expect(screen.getByText('Cancel')).toBeInTheDocument()
  })

  it('pre-fills inputs with the current product values in edit mode', () => {
    renderCard()
    fireEvent.click(screen.getByText('Edit'))
    // The name input should already contain the product name
    expect(screen.getByDisplayValue('Weather App')).toBeInTheDocument()
    expect(screen.getByDisplayValue('React')).toBeInTheDocument()
  })

  it('returns to view mode when Cancel is clicked', () => {
    renderCard()
    fireEvent.click(screen.getByText('Edit'))
    fireEvent.click(screen.getByText('Cancel'))
    // Back to view mode — Edit button should be visible again
    expect(screen.getByText('Edit')).toBeInTheDocument()
  })

  it('calls onUpdate with updated data after Save', async () => {
    // Mock fetch to return an updated product
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ ...mockProduct, name: 'Updated App' }),
      })
    )

    renderCard()
    fireEvent.click(screen.getByText('Edit'))

    // Change the name input
    const nameInput = screen.getByDisplayValue('Weather App')
    fireEvent.change(nameInput, { target: { value: 'Updated App' } })

    fireEvent.click(screen.getByText('Save'))

    // Wait for the async fetch to resolve and onUpdate to be called
    await waitFor(() => {
      expect(mockOnUpdate).toHaveBeenCalledWith({ ...mockProduct, name: 'Updated App' })
    })
  })

  // ── DELETE TESTS ────────────────────────────────────────────────────────────

  it('calls onDelete with the product id after confirming deletion', async () => {
    // Mock window.confirm to automatically return true (user clicked OK)
    vi.spyOn(window, 'confirm').mockReturnValue(true)

    global.fetch = vi.fn(() => Promise.resolve({}))

    renderCard()
    fireEvent.click(screen.getByText('Delete'))

    await waitFor(() => {
      expect(mockOnDelete).toHaveBeenCalledWith(1)
    })
  })

  it('does not call onDelete if user cancels the confirmation', () => {
    // Mock window.confirm to return false (user clicked Cancel)
    vi.spyOn(window, 'confirm').mockReturnValue(false)

    renderCard()
    fireEvent.click(screen.getByText('Delete'))

    expect(mockOnDelete).not.toHaveBeenCalled()
  })

})
