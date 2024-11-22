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

  // Test that a button to add a chore to the list is in the document
  it('should render a button that has "->" as text', () => {
    // Check for button in the document
    const addButton = screen.getByRole('button', { name: '->' });

    // Assertion
    expect(addButton).toBeInTheDocument();
  });

  // Test that a button to clear all chores is in the document
  it('should render a button with text "X" that clears all chores', () => {
    // Check for button in the document
    const clearAllButton = screen.getByRole('button', { name: 'X' });

    expect(clearAllButton).toBeInTheDocument();
  });

  // Test adding a new chore to the list
  it('should add a new chore to the list and clear input after adding chore', async () => {
    // Get references to the input and submit button
    const input = screen.getByPlaceholderText(/Do dishes/i);
    const button = screen.getByRole('button', { name: '->' });

    // Simulate input entry and button click
    await userEvent.type(input, 'Clean kitchen');
    await userEvent.click(button);

    // Assert that the the input 'Clean kitchen' is added
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

  // Clear all button
  it('no chores should be displayed after clicking clear all button', async () => {
    const clearAllButton = screen.getByRole('button', { name: 'X' });
    const unorderedList = screen.getByRole('list');

    // Simulate user behavior
    await userEvent.click(clearAllButton);

    // Assertion
    const listItems = unorderedList.querySelectorAll('li');
    expect(listItems.length).toBe(0);
  });
});
