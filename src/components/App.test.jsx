import { describe, it, expect } from 'vitest';
import { render, screen, act, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('App component', () => {
  // Test that Choreslist heading exists
  it('should render Choreslist heading', () => {
    render(<App />);

    const heading = screen.getByText(/choreslist/i);

    expect(heading).toBeInTheDocument();
  });

  // Test that an input field is rendered in the document
  it('should render an input field (with placeholder text) to add a new chore', () => {
    render(<App />);

    // Check for an input with placeholder text 'Do dishes'
    const input = screen.getByPlaceholderText(/Do dishes/i);

    // Assertion
    expect(input).toBeInTheDocument();
  });

  // Test that a button to add a chore to the list is in the document
  it('should render a button that has "->" as text', () => {
    render(<App />);

    // Check for button in the document
    const addButton = screen.getByRole('button', { name: '->' });

    // Assertion
    expect(addButton).toBeInTheDocument();
  });

  // Test that a button to clear all chores is in the document
  it('should render a button with text "X" that clears all chores', () => {
    render(<App />);

    // Check for button in the document
    const clearAllButton = screen.getByRole('button', { name: 'X' });

    expect(clearAllButton).toBeInTheDocument();
  });

  // Test adding a new chore to the list
  it('should add a new chore to the list and clear input after adding chore', async () => {
    render(<App />);

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

  // Clear all button
  it('no chores should be displayed after clicking clear all button', async () => {
    render(<App />);

    const clearAllButton = screen.getByRole('button', { name: 'X' });
    const unorderedList = screen.getByRole('list');

    // Simulate user behavior
    await userEvent.click(clearAllButton);

    // Assertion
    const listItems = unorderedList.querySelectorAll('li');
    expect(listItems.length).toBe(0);
  });

  it('should remove a chore when clicking on delete button for each chore', async () => {
    render(<App />);

    const deleteButton = screen.getByRole('button', { name: 'delete' });
    const input = screen.getByPlaceholderText('Do dishes');

    // Simulate user behavior: add chore, then delete it
    act(() => {
      fireEvent.input(input, { target: { value: 'Fold clothes' } });
      fireEvent.click(deleteButton);
    });

    // Assertion
    const listItem = screen.queryByRole('listitem');
    expect(listItem).not.toBeInTheDocument();
  });
});
