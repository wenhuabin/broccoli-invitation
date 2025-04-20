import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import InviteModal from '../src/components/InviteModal';

global.fetch = jest.fn();

describe('InviteModal', () => {
  const onClose = jest.fn();
  const onSuccess = jest.fn();

  beforeEach(() => {
    fetch.mockClear();
  });

  test('renders input fields and buttons', () => {
    render(<InviteModal onClose={onClose} onSuccess={onSuccess} />);
    expect(screen.getByPlaceholderText(/full name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/^email$/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/confirm email/i)).toBeInTheDocument();
    expect(screen.getByText(/send/i)).toBeInTheDocument();
  });

  test('shows error on invalid name', async () => {
    render(<InviteModal onClose={onClose} onSuccess={onSuccess} />);
    fireEvent.change(screen.getByPlaceholderText(/full name/i), { target: { value: 'Al' } });
    fireEvent.change(screen.getByPlaceholderText(/^email$/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText(/confirm email/i), { target: { value: 'test@example.com' } });
    fireEvent.click(screen.getByText(/send/i));

    await waitFor(() => {
      expect(screen.getByText(/name must be at least 3 characters/i)).toBeInTheDocument();
    });
  });

  test('shows error on email mismatch', async () => {
    render(<InviteModal onClose={onClose} onSuccess={onSuccess} />);
    fireEvent.change(screen.getByPlaceholderText(/full name/i), { target: { value: 'Alice' } });
    fireEvent.change(screen.getByPlaceholderText(/^email$/i), { target: { value: 'a@b.com' } });
    fireEvent.change(screen.getByPlaceholderText(/confirm email/i), { target: { value: 'c@d.com' } });
    fireEvent.click(screen.getByText(/send/i));

    await waitFor(() => {
      expect(screen.getByText(/emails do not match/i)).toBeInTheDocument();
    });
  });

  test('submits form and handles success', async () => {
    fetch.mockResolvedValueOnce({ ok: true });

    render(<InviteModal onClose={onClose} onSuccess={onSuccess} />);
    fireEvent.change(screen.getByPlaceholderText(/full name/i), { target: { value: 'Alice' } });
    fireEvent.change(screen.getByPlaceholderText(/^email$/i), { target: { value: 'a@b.com' } });
    fireEvent.change(screen.getByPlaceholderText(/confirm email/i), { target: { value: 'a@b.com' } });
    fireEvent.click(screen.getByText(/send/i));

    await waitFor(() => {
      expect(onSuccess).toHaveBeenCalled();
    });
  });

  test('shows API error message', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ errorMessage: 'Email already in use' }),
    });

    render(<InviteModal onClose={onClose} onSuccess={onSuccess} />);
    fireEvent.change(screen.getByPlaceholderText(/full name/i), { target: { value: 'Alice' } });
    fireEvent.change(screen.getByPlaceholderText(/^email$/i), { target: { value: 'usedemail@airwallex.com' } });
    fireEvent.change(screen.getByPlaceholderText(/confirm email/i), { target: { value: 'usedemail@airwallex.com' } });
    fireEvent.click(screen.getByText(/send/i));

    await waitFor(() => {
      expect(screen.getByText(/email already in use/i)).toBeInTheDocument();
    });
  });
});
