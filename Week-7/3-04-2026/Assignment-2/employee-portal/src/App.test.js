import { render, screen } from '@testing-library/react';
import App from './App';

/* ===========================
   Topic: Basic Render Test
   - Ensures the new login UI exists
   =========================== */
test('renders login page title', () => {
  window.history.pushState({}, 'Test', '/login');
  render(<App />);
  const titleElement = screen.getByText(/Internal Employee Portal/i);
  expect(titleElement).toBeInTheDocument();
});
