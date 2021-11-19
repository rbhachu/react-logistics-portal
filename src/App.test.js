import { render, screen } from '@testing-library/react';
import App from './App';

test('renders page title', () => {
  render(<App />);
  const linkTitle = screen.getByText(/Operations Team portal/i);
  expect(linkTitle).toBeInTheDocument();
});
