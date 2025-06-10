import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import ResetPassword from '../pages/ResetPassword';
import { renderWithProviders, mockFetchSuccess, mockFetchError, setupFetchMocks } from './utils.jsx';

// Set up cleanup of fetch mocks before each test
setupFetchMocks();

describe('ResetPassword Component', () => {
  // Mock the navigate function
  const mockNavigate = vi.fn();
  let mockToken = null;
  
  vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
      ...actual,
      useNavigate: () => mockNavigate,
      useLocation: () => ({
        search: mockToken ? `?token=${mockToken}` : '',
      }),
    };
  });
  
  beforeEach(() => {
    mockNavigate.mockReset();
    global.fetch.mockReset();
  });

  it('renders the reset password form with token', () => {
    mockToken = 'valid-token';
    renderWithProviders(<ResetPassword />);
    
    // Check that all form fields are rendered
    expect(screen.getByText(/reset your password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/new password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /reset password/i })).toBeInTheDocument();
  });

  it('displays error message when no token is provided', () => {
    mockToken = null;
    renderWithProviders(<ResetPassword />);
    
    // Check that error message is displayed
    expect(screen.getByText(/no reset token provided/i)).toBeInTheDocument();
    
    // Check that form fields are disabled
    expect(screen.getByLabelText(/new password/i)).toBeDisabled();
    expect(screen.getByLabelText(/confirm password/i)).toBeDisabled();
    expect(screen.getByRole('button', { name: /reset password/i })).toBeDisabled();
  });

  it('validates passwords match before submitting', async () => {
    mockToken = 'valid-token';
    renderWithProviders(<ResetPassword />);
    
    // Fill out form with non-matching passwords
    fireEvent.change(screen.getByLabelText(/new password/i), { target: { value: 'Password123!' } });
    fireEvent.change(screen.getByLabelText(/confirm password/i), { target: { value: 'DifferentPassword!' } });
    
    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /reset password/i }));
    
    // Check that validation error is displayed
    await waitFor(() => {
      expect(screen.getByText(/passwords do not match/i)).toBeInTheDocument();
    });
    
    // Check that no API call was made
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('submits valid form data and redirects on success', async () => {
    mockToken = 'valid-token';
    renderWithProviders(<ResetPassword />);
    
    // Mock successful password reset
    mockFetchSuccess({ message: 'Password has been reset successfully' });
    
    // Fill out form with matching passwords
    fireEvent.change(screen.getByLabelText(/new password/i), { target: { value: 'NewPassword123!' } });
    fireEvent.change(screen.getByLabelText(/confirm password/i), { target: { value: 'NewPassword123!' } });
    
    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /reset password/i }));
    
    // Verify API call was made with correct data
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/users/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: 'valid-token',
          new_password: 'NewPassword123!'
        }),
      });
    });
    
    // Verify navigation to login page with success message
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/login', {
        state: { message: 'Password has been reset successfully. Please login with your new password.' }
      });
    });
  });

  it('displays error message on reset failure', async () => {
    mockToken = 'invalid-token';
    renderWithProviders(<ResetPassword />);
    
    // Mock failed password reset
    mockFetchError(400, 'Invalid or expired token');
    
    // Fill out form with matching passwords
    fireEvent.change(screen.getByLabelText(/new password/i), { target: { value: 'NewPassword123!' } });
    fireEvent.change(screen.getByLabelText(/confirm password/i), { target: { value: 'NewPassword123!' } });
    
    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /reset password/i }));
    
    // Verify error message is displayed
    await waitFor(() => {
      expect(screen.getByText(/invalid or expired token/i)).toBeInTheDocument();
    });
    
    // Verify no navigation occurred
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});