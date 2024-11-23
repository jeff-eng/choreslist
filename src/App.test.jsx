import { describe, it, expect, beforeEach, vi, afterAll } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('App component', () => {
  it('should render Choreslist heading', () => {
    render(<App />);
    const heading = screen.getByText(/choreslist/i);
    expect(heading).toBeInTheDocument();
  });

  describe('Local storage', () => {
    beforeEach(() => {
      localStorage.clear();
      vi.spyOn(window.localStorage.__proto__, 'setItem');
      vi.spyOn(window.localStorage.__proto__, 'getItem');
    });

    it('should load data from local storage on render', () => {
      localStorage.setItem('chores', JSON.stringify(['Wash car']));
      render(<App />);
      expect(localStorage.getItem).toHaveBeenCalledWith('chores');
      expect(screen.getByText('Wash car')).toBeInTheDocument();
    });

    it('should save new chores to local storage', async () => {
      render(<App />);

      const input = screen.getByPlaceholderText('Do dishes');
      const addChoreButton = screen.getByRole('button', { name: '->' });

      await userEvent.type(input, 'Mop floor');
      await userEvent.click(addChoreButton);

      const savedChores = JSON.parse(localStorage.getItem('chores'));
      expect(savedChores).toStrictEqual(expect.arrayContaining(['mop floor']));
    });

    it('clears the chorelist', async () => {
      render(<App />);
      localStorage.setItem('chores', ['Clean bathroom', 'Do taxes']);
      const clearAllButton = screen.getByRole('button', { name: 'X' });

      await userEvent.click(clearAllButton);

      const storedChores = localStorage.getItem('chores');

      expect(JSON.parse(storedChores)).toStrictEqual([]);
    });

    afterAll(() => {
      localStorage.clear();
    });
  });
});
