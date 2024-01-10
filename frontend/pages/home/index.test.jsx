import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from './index';
import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('Home', () => {
  let consoleSpy;

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    useRouter.mockImplementation(() => ({
      push: jest.fn(),
      route: '/',
      pathname: '',
      query: '',
      asPath: '',
    }));
  });

  afterEach(() => {
    consoleSpy.mockRestore();
    jest.clearAllMocks();
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

