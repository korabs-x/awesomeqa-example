import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from './index';

describe('Home', () => {
  let consoleSpy;

  beforeEach(() => {
    // Mock console.log before each test
    consoleSpy = jest.spyOn(console, 'log').mockImplementation();
  });

  afterEach(() => {
    // Restore the original implementation of console.log after each test
    consoleSpy.mockRestore();
  });

  it('renders three buttons', () => {
    render(<Home />);
    
    expect(screen.getByText('Knowledge Base')).toBeInTheDocument();
    expect(screen.getByText('Tickets')).toBeInTheDocument();
    expect(screen.getByText('FAQ Insights')).toBeInTheDocument();
  });

  it('handles click event on Knowledge Base button', () => {
    render(<Home />);
    
    const button = screen.getByText('Knowledge Base');
    fireEvent.click(button);

    expect(consoleSpy).toHaveBeenCalledWith('Knowledge Base button clicked');
  });

  it('handles click event on Tickets button', () => {
    render(<Home />);
    
    const button = screen.getByText('Tickets');
    fireEvent.click(button);

    expect(consoleSpy).toHaveBeenCalledWith('Tickets clicked');
  });

  it('handles click event on FAQ Insights button', () => {
    render(<Home />);
    
    const button = screen.getByText('FAQ Insights');
    fireEvent.click(button);

    expect(consoleSpy).toHaveBeenCalledWith('FAQ Insights button');
  });
});
