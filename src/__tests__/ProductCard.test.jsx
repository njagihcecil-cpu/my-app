import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import ProductCard from '../components/ProductCard'

const mockProduct = {
  id: 1,
  name: 'Weather App',
  description: 'A real-time weather application.',
  origin: 'React',
  roast: 'JavaScript',
  github: 'https://github.com/test/weather-app',
}

const mockOnUpdate = vi.fn()
const mockOnDelete = vi.fn()

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
    
    expect(screen.getByText('Save')).toBeInTheDocument()
    expect(screen.getByText('Cancel')).toBeInTheDocument()
  })

  it('pre-fills inputs with the current product values in edit mode', () => {
    renderCard()
    fireEvent.click(screen.getByText('Edit'))
    
    expect(screen.getByDisplayValue('Weather App')).toBeInTheDocument()
    expect(screen.getByDisplayValue('React')).toBeInTheDocument()
  })

  it('returns to view mode when Cancel is clicked', () => {
    renderCard()
    fireEvent.click(screen.getByText('Edit'))
    fireEvent.click(screen.getByText('Cancel'))
    
    expect(screen.getByText('Edit')).toBeInTheDocument()
  })

  it('calls onUpdate with updated data after Save', async () => {

    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ ...mockProduct, name: 'Updated App' }),
      })
    )

    renderCard()
    fireEvent.click(screen.getByText('Edit'))

    const nameInput = screen.getByDisplayValue('Weather App')
    fireEvent.change(nameInput, { target: { value: 'Updated App' } })

    fireEvent.click(screen.getByText('Save'))

    await waitFor(() => {
      expect(mockOnUpdate).toHaveBeenCalledWith({ ...mockProduct, name: 'Updated App' })
    })
  })

  // ── DELETE TESTS ────────────────────────────────────────────────────────────

  it('calls onDelete with the product id after confirming deletion', async () => {
   
    vi.spyOn(window, 'confirm').mockReturnValue(true)

    global.fetch = vi.fn(() => Promise.resolve({}))

    renderCard()
    fireEvent.click(screen.getByText('Delete'))

    await waitFor(() => {
      expect(mockOnDelete).toHaveBeenCalledWith(1)
    })
  })

  it('does not call onDelete if user cancels the confirmation', () => {
    
    vi.spyOn(window, 'confirm').mockReturnValue(false)

    renderCard()
    fireEvent.click(screen.getByText('Delete'))

    expect(mockOnDelete).not.toHaveBeenCalled()
  })

})
