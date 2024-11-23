import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('ChoreFormControls component', () => {
  beforeEach(() => {
    render(<App />);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should render an input field (with placeholder text) to add a new chore', () => {
    const input = screen.getByPlaceholderText(/Do dishes/i);

    expect(input).toBeInTheDocument();
  });

  it('should render a button that has "->" as text', () => {
    const addButton = screen.getByRole('button', { name: '->' });

    expect(addButton).toBeInTheDocument();
  });

  it('should render a button with text "X" that clears all chores', () => {
    const clearAllButton = screen.getByRole('button', { name: 'X' });

    expect(clearAllButton).toBeInTheDocument();
  });

  it('should add a new chore to the list and clear input after adding chore', async () => {
    const input = screen.getByPlaceholderText(/Do dishes/i);
    const button = screen.getByRole('button', { name: '->' });

    await userEvent.type(input, 'Clean kitchen');
    await userEvent.click(button);

    const listItem = screen.getByText(/clean kitchen/i);
    expect(listItem).toBeInTheDocument();

    expect(input).toHaveValue('');
  });

  it('should not add clean floor and CLEAN FLOOR as separate chores', async () => {
    const input = screen.getByPlaceholderText(/Do dishes/i);
    const button = screen.getByRole('button', { name: '->' });
    const unorderedList = screen.getByRole('list');

    await userEvent.type(input, 'clean floor');
    await userEvent.click(button);

    await userEvent.type(input, 'CLEAN FLOOR');
    await userEvent.click(button);

    const listItems = unorderedList.querySelectorAll('li');
    expect(listItems.length).toBe(1);
  });

  it('no chores should be displayed after clicking clear all button', async () => {
    const clearAllButton = screen.getByRole('button', { name: 'X' });
    const unorderedList = screen.getByRole('list');

    await userEvent.click(clearAllButton);

    const listItems = unorderedList.querySelectorAll('li');
    expect(listItems.length).toBe(0);
  });
});
