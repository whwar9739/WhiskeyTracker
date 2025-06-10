import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { mockFetchSuccess, mockFetchError } from './utils.jsx';

// Wrapper component for testing hooks
const wrapper = ({ children }) => (
  <AuthProvider>{children}</AuthProvider>
);

describe('AuthContext', () => {
  // Mock localStorage
  const mockLocalStorage = (() => {
    let store = {};
    return {
      getItem: vi.fn((key) => store[key] || null),
      setItem: vi.fn((key, value) => { store[key] = value; }),
      removeItem: vi.fn((key) => { delete store[key]; }),
      clear: vi.fn(() => { store = {}; }),
    };
  })();
  
  // Mock fetch API
  global.fetch = vi.fn();

  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: mockLocalStorage,
      writable: true
    });
    mockLocalStorage.clear();
    global.fetch.mockReset();
  });

  it('provides initial auth state with no user', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    
    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated()).toBe(false);
    expect(result.current.loading).toBe(false);
    expect(typeof result.current.login).toBe('function');
    expect(typeof result.current.logout).toBe('function');
    expect(typeof result.current.getToken).toBe('function');
  });

  it('loads user from localStorage on initialization', async () => {
    // Pre-populate localStorage
    const userData = { id: 1, email: 'test@example.com', username: 'testuser' };
    mockLocalStorage.getItem.mockImplementation(key => {
      if (key === 'token') return 'fake-token';
      if (key === 'user') return JSON.stringify(userData);
      return null;
    });
    
    const { result } = renderHook(() => useAuth(), { wrapper });
    
    // Wait for the useEffect to complete
    await waitFor(() => expect(result.current.loading).toBe(false));
    
    expect(result.current.user).toEqual(userData);
    expect(result.current.isAuthenticated()).toBe(true);
    expect(result.current.getToken()).toBe('fake-token');
  });

  it('successfully logs in a user', async () => {
    // Mock successful API responses
    const tokenResponse = { access_token: 'fake-token', token_type: 'bearer' };
    const userResponse = { id: 1, email: 'test@example.com' };
    
    mockFetchSuccess(tokenResponse);
    mockFetchSuccess(userResponse);
    
    const { result } = renderHook(() => useAuth(), { wrapper });
    
    // Perform login
    await act(async () => {
      await result.current.login('test@example.com', 'password123');
    });
    
    // Verify localStorage was updated
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith('token', 'fake-token');
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith('user', JSON.stringify(userResponse));
    
    // Verify state was updated
    expect(result.current.user).toEqual(userResponse);
    expect(result.current.isAuthenticated()).toBe(true);
  });

  it('handles login failure', async () => {
    // Mock failed API response
    mockFetchError(401, 'Invalid credentials');
    
    const { result } = renderHook(() => useAuth(), { wrapper });
    
    // Attempt login and expect it to fail
    await expect(
      act(async () => {
        await result.current.login('test@example.com', 'wrongpassword');
      })
    ).rejects.toThrow();
    
    // Verify no localStorage updates
    expect(mockLocalStorage.setItem).not.toHaveBeenCalled();
    
    // Verify state remains unchanged
    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated()).toBe(false);
  });

  it('logs out a user', async () => {
    // Start with a logged-in user
    mockLocalStorage.getItem.mockImplementation(key => {
      if (key === 'token') return 'fake-token';
      if (key === 'user') return JSON.stringify({ id: 1, email: 'test@example.com' });
      return null;
    });
    
    const { result } = renderHook(() => useAuth(), { wrapper });
    
    // Wait for the useEffect to complete
    await waitFor(() => expect(result.current.isAuthenticated()).toBe(true));
    
    // Perform logout
    act(() => {
      result.current.logout();
    });
    
    // Verify localStorage items were removed
    expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('token');
    expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('user');
    
    // Verify state was updated
    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated()).toBe(false);
    expect(result.current.getToken()).toBeNull();
  });
});