import React from 'react';
import { render, screen, waitFor, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import TicketsPage from './index';

const mockFetch = (url) => {
    if (url.startsWith('http://localhost:5001/tickets')) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
          tickets: [
            {"id": "1", "msg_id": "101", "status": "open", "timestamp": "2023-01-01 10:00:00.000000"},
            {"id": "2", "msg_id": "102", "status": "closed", "timestamp": "2023-01-02 10:00:00.000000"},
            {"id": "3", "msg_id": "103", "status": "open", "timestamp": "2023-01-03 10:00:00.000000"},
          ],
          total: 3,
        }),
      });
    } else if (url.startsWith('http://localhost:5001/messages/')) {
      const msgId = url.split('/').pop();
      const messages = {
        "101": {
          id: "101",
          author: {
            name: "Test User 1",
            avatar_url: "http://example.com/avatar1.png"
          },
          content: "This is a test message content from user 1.",
          timestamp: "2023-01-01 10:00:00.000000",
          msg_url: "http://example.com/message/101"
        },
        "102": {
          id: "102",
          author: {
            name: "Test User 2",
            avatar_url: "http://example.com/avatar2.png"
          },
          content: "This is a test message content from user 2.",
          timestamp: "2023-01-02 10:00:00.000000",
          msg_url: "http://example.com/message/102"
        },
        "103": {
          id: "103",
          author: {
            name: "Test User 3",
            avatar_url: "http://example.com/avatar3.png"
          },
          content: "This is a test message content from user 3.",
          timestamp: "2023-01-03 10:00:00.000000",
          msg_url: "http://example.com/message/103"
        }
      };
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(messages[msgId]),
      });
    }

    if (url.includes('DELETE')) {
        return Promise.resolve({ ok: true });
    }

    return Promise.reject(new Error('not found'));
};

global.fetch = jest.fn(mockFetch);

describe('TicketsPage', () => {
    beforeEach(() => {
      fetch.mockClear();
    });
  
    it('renders the TicketsPage component and displays loading state', async () => {
        render(<TicketsPage />);
        expect(screen.getByText('Loading...')).toBeInTheDocument();
        await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
    });
  
    it('displays tickets after loading', async () => {
      render(<TicketsPage />);
      await waitFor(() => expect(screen.getByText('Test User 1')).toBeInTheDocument());
    });

    it('renders and interacts with pagination controls', async () => {
        render(<TicketsPage />);
        await waitFor(() => screen.getByText('Test User 1'));
        const nextPageButton = screen.getByRole('button', { name: /next page/i });
        fireEvent.click(nextPageButton);
    });

    it('opens modal on ticket row click', async () => {
        render(<TicketsPage />);
        await waitFor(() => screen.getByText('Test User 1'));
        const ticketRow = screen.getByText('Test User 1').closest('tr');
        fireEvent.click(ticketRow);
    });

    it('clears filters on clear button click', async () => {
        render(<TicketsPage />);
        const clearButton = screen.getByText('Clear');
        fireEvent.click(clearButton);
    });
});  
