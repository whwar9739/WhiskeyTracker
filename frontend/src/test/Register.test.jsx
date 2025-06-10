import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import Register from '../pages/Register';
import { renderWithProviders, mockFetchSuccess, mockFetchError, setupFetchMocks } from './utils.jsx';

// Set up cleanup of fetch mocks before each test
beforeEach(() => {
  setupFetchMocks();
});

describe('Register Component', () => {
  // Mock the navigate function
  const mockNavigate = vi.fn();
  vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
      ...actual,
      useNavigate: () => mockNavigate,
    };
  });
  
  beforeEach(() => {
    mockNavigate.mockReset();
  });

  it('renders registration form correctly', () => {
    renderWithProviders(<Register />);
    
    // Check that all form fields are rendered
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument();
  });

  it('validates form inputs', async () => {
    renderWithProviders(<Register />);
    
    // Fill out form with invalid data
    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'ab' } }); // too short
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'invalid-email' } }); // invalid email
    fireEvent.change(screen.getByLabelText(/^password$/i), { target: { value: 'short' } }); // too short
    fireEvent.change(screen.getByLabelText(/confirm password/i), { target: { value: 'different' } }); // doesn't match
    
    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));
    
    // Check that validation errors are displayed
    await waitFor(() => {
      expect(screen.getByText(/username must be at least 3 characters/i)).toBeInTheDocument();
      expect(screen.getByText(/please enter a valid email/i)).toBeInTheDocument();
      expect(screen.getByText(/password must be at least 8 characters/i)).toBeInTheDocument();
      expect(screen.getByText(/passwords do not match/i)).toBeInTheDocument();
    });
    
    // Verify no API call was made
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('submits valid form data and redirects on success', async () => {
    renderWithProviders(<Register />);
    
    // Mock successful registration response
    mockFetchSuccess({ username: 'testuser', email: 'test@example.com', id: 1 });
    
    // Fill out form with valid data
    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/^password$/i), { target: { value: 'Password123!' } });
    fireEvent.change(screen.getByLabelText(/confirm password/i), { target: { value: 'Password123!' } });
    
    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));
    
    // Verify API call was made with correct data
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: 'testuser',
          email: 'test@example.com',
          password: 'Password123!'
        }),
      });
    });
    
    // Verify navigation to login page with success message
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/login', {
        state: { message: 'Registration successful! Please login.' }
      });
    });
  });

  it('displays error message on registration failure', async () => {
    renderWithProviders(<Register />);
    
    // Mock failed registration response
    mockFetchError(400, 'Username already registered');
    
    // Fill out form with valid data
    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/^password$/i), { target: { value: 'Password123!' } });
    fireEvent.change(screen.getByLabelText(/confirm password/i), { target: { value: 'Password123!' } });
    
    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));
    
    // Verify error message is displayed
    await waitFor(() => {
      expect(screen.getByText(/Username already registered/i)).toBeInTheDocument();
    });
    
    // Verify no navigation occurred
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});