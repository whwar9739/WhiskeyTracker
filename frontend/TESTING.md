# Frontend Testing Guide

This document provides instructions for running and implementing tests for the WhiskeyTracker frontend.

## Test Overview

The frontend testing suite uses the following technologies:
- [Vitest](https://vitest.dev/) - Test runner (compatible with Vite)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) - Component testing utilities
- [Jest DOM](https://github.com/testing-library/jest-dom) - Custom DOM element matchers

Our tests primarily focus on component functionality, user interactions, and integration with the backend API.

## Test Files Structure

The tests are organized in the `src/test` directory:

- `setup.js` - General test setup and configuration
- `utils.jsx` - Testing utilities and helper functions
- Component tests:
  - `Register.test.jsx` - Tests for user registration form
  - `Login.test.jsx` - Tests for login form
  - `ForgotPassword.test.jsx` - Tests for password reset request form
  - `ResetPassword.test.jsx` - Tests for password reset form
  - `AuthContext.test.jsx` - Tests for authentication context

## Running Tests

### Prerequisites

Make sure all the testing dependencies are installed:

```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event jest jest-environment-jsdom whatwg-fetch msw vitest
```

If using Docker:

```bash
docker exec -it whiskey-tracker-frontend npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event jest jest-environment-jsdom whatwg-fetch msw vitest
```

### Running All Tests

To run all tests once:

```bash
npm test
```

With Docker:

```bash
docker exec -it whiskey-tracker-frontend npm test
```

### Running Tests in Watch Mode

For development, you can run tests in watch mode, which will automatically rerun tests when files change:

```bash
npm run test:watch
```

With Docker:

```bash
docker exec -it whiskey-tracker-frontend npm run test:watch
```

### Running Specific Tests

To run a specific test file:

```bash
npm test -- src/test/Login.test.jsx
```

With Docker:

```bash
docker exec -it whiskey-tracker-frontend npm test -- src/test/Login.test.jsx
```

## Writing New Tests

### Component Testing Pattern

When testing React components, follow this general pattern:

1. Import the component and testing utilities
2. Mock any external dependencies (API calls, router, context)
3. Render the component with necessary providers
4. Simulate user interactions
5. Assert expected outcomes

Example:

```jsx
import { describe, it, expect, vi } from 'vitest';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { renderWithProviders, mockFetchSuccess } from './utils.jsx';
import MyComponent from '../components/MyComponent';

describe('MyComponent', () => {
  it('renders correctly', () => {
    renderWithProviders(<MyComponent />);
    expect(screen.getByText(/expected text/i)).toBeInTheDocument();
  });

  it('handles user interaction', async () => {
    renderWithProviders(<MyComponent />);
    
    // Mock API response
    mockFetchSuccess({ data: 'response data' });
    
    // Simulate user interaction
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    
    // Assert expected outcome
    await waitFor(() => {
      expect(screen.getByText(/success message/i)).toBeInTheDocument();
    });
  });
});
```

### Mocking External Dependencies

The `utils.jsx` file provides helpers for common mocking needs:

- `mockFetchSuccess(data)` - Mock successful fetch responses
- `mockFetchError(status, message)` - Mock failed fetch responses
- `renderWithProviders(ui, options)` - Render components with AuthContext and Router providers

Use Vitest's mocking capabilities for other dependencies:

```jsx
// Mock a module
vi.mock('module-name', () => ({
  functionName: vi.fn(),
}));

// Mock a specific function
const mockFunction = vi.fn();
```

## Test Coverage

To run tests with coverage reporting:

```bash
npm test -- --coverage
```

With Docker:

```bash
docker exec -it whiskey-tracker-frontend npm test -- --coverage
```

This will generate a coverage report showing which parts of the code are covered by tests.

## Troubleshooting

### Common Issues

1. **Tests can't find elements**
   - Check that you're using the correct query methods (getByText, getByRole, etc.)
   - Ensure the text or attributes you're searching for match exactly what's rendered

2. **Asynchronous issues**
   - Use `waitFor` or `findBy*` queries for elements that appear after some delay
   - Make sure to await all promises in tests

3. **Mock function not called**
   - Verify that the mock is set up correctly
   - Check that the component is actually using the dependency you're mocking