import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import { vi, beforeEach } from 'vitest';

// Mock the fetch API
global.fetch = vi.fn();

// Helper function to mock successful fetch responses
export function mockFetchSuccess(data) {
  global.fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => data,
  });
}

// Helper function to mock failed fetch responses
export function mockFetchError(status, errorMessage) {
  global.fetch.mockResolvedValueOnce({
    ok: false,
    status,
    json: async () => ({ detail: errorMessage }),
  });
}

// Custom render function that includes providers
export function renderWithProviders(ui, options = {}) {
  const { route = '/' } = options;
  
  // Set the initial window location
  window.history.pushState({}, 'Test page', route);
  
  return render(
    <AuthProvider>
      <BrowserRouter>{ui}</BrowserRouter>
    </AuthProvider>
  );
}

// Setup mocks between tests - direct function, not a factory
export function setupFetchMocks() {
  beforeEach(() => {
    global.fetch.mockReset();
  });
}