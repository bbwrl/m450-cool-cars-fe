import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import '@testing-library/jest-dom/vitest';
import Home from '@/app/page';

describe("simple tests", () => {
  test('renders header', () => {
    render(<Home />);
    const headerElement = screen.getByText(/My Frontend - The very beginning/i);
    expect(headerElement).toBeInTheDocument();
  });
})
