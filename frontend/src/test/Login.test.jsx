import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import Login from '../pages/Login';
import { renderWithProviders, setupFetchMocks } from './utils.jsx';

// Set up cleanup of fetch mocks before each test
beforeEach(() => {
  setupFetchMocks();
});

describe('Login Component', () => {
  // Mock the navigate function
  const mockNavigate = vi.fn();
  vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
      ...actual,
      useNavigate: () => mockNavigate,
      useLocation: () => ({ state: null }),
    };
  });
  
  // Mock the auth context
  const mockLogin = vi.fn();
  vi.mock('../context/AuthContext', async () => {
    const actual = await vi.importActual('../context/AuthContext');
    return {
      ...actual,
      useAuth: () => ({
        login: mockLogin,
      }),
    };
  });
  
  beforeEach(() => {
    mockNavigate.mockReset();
    mockLogin.mockReset();
  });

  it('renders login form correctly', () => {
    renderWithProviders(<Login />);
    
    // Check that all form fields are rendered
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
    expect(screen.getByText(/don't have an account\?/i)).toBeInTheDocument();
    expect(screen.getByText(/forgot your password\?/i)).toBeInTheDocument();
  });

  it('displays success message from location state', async () => {
    vi.mock('react-router-dom', async () => {
      const actual = await vi.importActual('react-router-dom');
      return {
        ...actual,
        useNavigate: () => mockNavigate,
        useLocation: () => ({ 
          state: { message: 'Registration successful! Please login.' } 
        }),
      };
    });
    
    renderWithProviders(<Login />);
    
    // Check that success message is displayed
    expect(screen.getByText(/registration successful/i)).toBeInTheDocument();
  });

  it('submits form and navigates on successful login', async () => {
    renderWithProviders(<Login />);
    
    // Mock successful login
    mockLogin.mockResolvedValueOnce(true);
    
    // Fill out form
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'Password123!' } });
    
    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));
    
    // Verify login function was called with correct credentials
    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'Password123!');
    });
    
    // Verify navigation to dashboard
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
    });
  });

  it('displays error message on login failure', async () => {
    renderWithProviders(<Login />);
    
    // Mock failed login
    mockLogin.mockRejectedValueOnce(new Error('Invalid credentials'));
    
    // Fill out form
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'WrongPassword!' } });
    
    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));
    
    // Verify error message is displayed
    await waitFor(() => {
      expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
    });
    
    // Verify no navigation occurred
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});