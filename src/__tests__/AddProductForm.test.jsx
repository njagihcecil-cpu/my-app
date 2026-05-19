import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import AddProductForm from '../pages/AddProductForm'

const mockOnAdd = vi.fn()

function renderForm() {
  render(
    <MemoryRouter>
      <AddProductForm onAdd={mockOnAdd} />
    </MemoryRouter>
  )
}

describe('AddProductForm', () => {

  beforeEach(() => {
    vi.clearAllMocks()
  })

  // ── RENDER TESTS ────────────────────────────────────────────────────────────

  it('renders the form heading', () => {
    renderForm()
    expect(screen.getByText('Add New Coffee')).toBeInTheDocument()
  })

  it('renders all input fields', () => {
    renderForm()
    expect(screen.getByPlaceholderText(/Vanilla Bean/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/Medium roast/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/Colombia/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/12.99/i)).toBeInTheDocument()
  })

  it('renders the Add Coffee submit button', () => {
    renderForm()
    expect(screen.getByText('Add Coffee')).toBeInTheDocument()
  })

  it('renders the Cancel button', () => {
    renderForm()
    expect(screen.getByText('Cancel')).toBeInTheDocument()
  })

  // ── INTERACTION TESTS ───────────────────────────────────────────────────────

  it('updates the name field when the user types', () => {
    renderForm()
    const nameInput = screen.getByPlaceholderText(/Vanilla Bean/i)
    fireEvent.change(nameInput, { target: { value: 'Espresso' } })
    expect(nameInput.value).toBe('Espresso')
  })

  it('updates the price field when the user types', () => {
    renderForm()
    const priceInput = screen.getByPlaceholderText(/12.99/i)
    fireEvent.change(priceInput, { target: { value: '9.99' } })
    expect(priceInput.value).toBe('9.99')
  })

  it('shows "Adding..." on the button while submitting', async () => {
    global.fetch = vi.fn(() => new Promise(() => {}))

    renderForm()

    fireEvent.change(screen.getByPlaceholderText(/Vanilla Bean/i), { target: { value: 'Espresso' } })
    fireEvent.change(screen.getByPlaceholderText(/Medium roast/i), { target: { value: 'Strong and bold' } })
    fireEvent.change(screen.getByPlaceholderText(/Colombia/i), { target: { value: 'Italy' } })
    fireEvent.change(screen.getByPlaceholderText(/12.99/i), { target: { value: '9.99' } })

    fireEvent.click(screen.getByText('Add Coffee'))

    expect(screen.getByText('Adding...')).toBeInTheDocument()
  })

  // ── SUBMISSION TESTS ────────────────────────────────────────────────────────

  it('calls onAdd with the new product after successful submission', async () => {
    const savedProduct = {
      id: 4,
      name: 'Espresso',
      description: 'Strong and bold',
      origin: 'Italy',
      roast: 'Dark',
      price: 9.99,
    }

    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(savedProduct),
      })
    )

    renderForm()

    fireEvent.change(screen.getByPlaceholderText(/Vanilla Bean/i), { target: { value: 'Espresso' } })
    fireEvent.change(screen.getByPlaceholderText(/Medium roast/i), { target: { value: 'Strong and bold' } })
    fireEvent.change(screen.getByPlaceholderText(/Colombia/i), { target: { value: 'Italy' } })
    fireEvent.change(screen.getByPlaceholderText(/12.99/i), { target: { value: '9.99' } })
    fireEvent.click(screen.getByText('Add Coffee'))

    await waitFor(() => {
      expect(mockOnAdd).toHaveBeenCalledWith(savedProduct)
    })
  })

  it('shows an error message if the POST request fails', async () => {
    
    global.fetch = vi.fn(() => Promise.reject(new Error('Network error')))

    renderForm()

    fireEvent.change(screen.getByPlaceholderText(/Vanilla Bean/i), { target: { value: 'Espresso' } })
    fireEvent.change(screen.getByPlaceholderText(/Medium roast/i), { target: { value: 'Strong and bold' } })
    fireEvent.change(screen.getByPlaceholderText(/Colombia/i), { target: { value: 'Italy' } })
    fireEvent.change(screen.getByPlaceholderText(/12.99/i), { target: { value: '9.99' } })

    fireEvent.click(screen.getByText('Add Coffee'))

    await waitFor(() => {
      expect(screen.getByText('Something went wrong. Please try again.')).toBeInTheDocument()
    })
  })

})
