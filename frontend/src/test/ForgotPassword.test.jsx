import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import ForgotPassword from '../pages/ForgotPassword';
import { renderWithProviders, mockFetchSuccess, mockFetchError, setupFetchMocks } from './utils.jsx';

describe('ForgotPassword Component', () => {
  beforeEach(() => {
    setupFetchMocks();
    global.fetch.mockReset();
  });

  it('renders forgot password form correctly', () => {
    renderWithProviders(<ForgotPassword />);
    
    // Check that all form elements are rendered
    expect(screen.getByText(/reset your password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send reset link/i })).toBeInTheDocument();
    expect(screen.getByText(/back to sign in/i)).toBeInTheDocument();
  });

  it('submits form and displays success message', async () => {
    renderWithProviders(<ForgotPassword />);
    
    // Mock successful password reset request
    mockFetchSuccess({ message: 'If a user with that email exists, a password reset link has been sent.' });
    
    // Fill out form
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'test@example.com' } });
    
    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /send reset link/i }));
    
    // Verify API call was made with correct data
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/users/request-password-reset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: 'test@example.com' }),
      });
    });
    
    // Verify success message is displayed
    await waitFor(() => {
      expect(screen.getByText(/if a user with that email exists/i)).toBeInTheDocument();
    });
    
    // Verify email input was cleared
    await waitFor(() => {
      expect(screen.getByLabelText(/email address/i).value).toBe('');
    });
  });

  it('displays error message on submission failure', async () => {
    renderWithProviders(<ForgotPassword />);
    
    // Mock failed password reset request
    mockFetchError(500, 'Server error');
    
    // Fill out form
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'test@example.com' } });
    
    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /send reset link/i }));
    
    // Verify error message is displayed
    await waitFor(() => {
      expect(screen.getByText(/server error/i)).toBeInTheDocument();
    });
    
    // Verify email input was not cleared
    expect(screen.getByLabelText(/email address/i).value).toBe('test@example.com');
  });
});