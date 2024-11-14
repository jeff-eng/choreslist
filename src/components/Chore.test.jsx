import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';
import Chore from './Chore';

describe('Chore component', () => {
  beforeEach(() => {
    render(<App />);
  });

  it('should render a list item', () => {
    render(<Chore />);
    const listItem = screen.getByRole('listitem');
    expect(listItem).toBeInTheDocument();
  });

  it('should render a delete button inside the list item', () => {
    render(<Chore />);
    const listItem = screen.getByRole('listitem');
    const deleteButton = screen.getByRole('button', { name: /delete/i });

    expect(listItem).toContainElement(deleteButton);
  });

  it('should remove a chore when clicking on delete button for each chore list item', async () => {
    // Simulate user behavior: enter input, add chore, then delete it
    const input = screen.getByPlaceholderText('Do dishes');
    fireEvent.input(input, { target: { value: 'Fold clothes' } });
    fireEvent.click(screen.getByRole('button', { name: '->' }));
    const deleteButton = screen.getByRole('button', { name: 'delete' });
    fireEvent.click(deleteButton);

    // Assertion
    await waitFor(() => {
      const unorderedList = screen.getByRole('list');
      expect(unorderedList).toBeEmptyDOMElement();
    });
  });
});
