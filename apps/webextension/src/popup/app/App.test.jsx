import { render, screen } from '@testing-library/react'
import App from './App'

test('renders "User"', () => {
  render(<App />)
  const linkElement = screen.getByText(/User/i)
  expect(linkElement).toBeInTheDocument()
})
