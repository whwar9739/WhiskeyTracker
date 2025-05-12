# GitHub Copilot Instructions for WhiskeyTracker App

This document provides instructions for using GitHub Copilot effectively with the WhiskeyTracker application codebase.

## Project Overview

WhiskeyTracker is a full-stack web application for whiskey enthusiasts to:
- Track their whiskey collection
- Record tasting notes
- Create and manage tasting sessions
- Track infinity bottles (custom blends)
- Manage their whiskey inventory
- View personalized statistics and insights via customizable dashboards
- Upload and view bottle images
- Filter and search their whiskey collection using advanced criteria
- Manage group collaborations for shared collections and tastings

### Tech Stack

#### Backend
- Python 3.9+
- FastAPI
- SQLAlchemy ORM
- PostgreSQL
- Asynchronous programming (asyncio)

#### Frontend
- React 18+
- Material-UI (MUI) components
- React Router for navigation
- React Context for state management
- Axios for API requests
- Day.js for date handling

#### Infrastructure
- Docker and Docker Compose
- Nginx for reverse proxy
- JWT for authentication

## Development Environment

This project utilizes Docker and Docker Compose for a consistent development environment across machines. All services (backend, frontend, database) run within containers.

**Instructions for GitHub Copilot:**
* **Dependency Management:** When suggesting installation of dependencies (Python packages via pip, Node modules via npm), always format the command to run *inside* the appropriate Docker container.
    * Example Backend: `docker-compose exec backend pip install <package_name>`
    * Example Frontend: `docker-compose exec frontend npm install <package_name>`
* **Running Commands:** Similarly, any commands to run scripts, migrations, or other tasks should be prefixed with `docker-compose exec <service_name> ...`.
* **Service Interaction:** Remember that services communicate with each other using the service names defined in `docker-compose.yml` (e.g., the frontend connects to `http://backend:8000`).
* **Avoid Local Installation:** Do not suggest commands that install tools or packages directly onto the host operating system. All project requirements are managed within the containers.

## Code Organization

### Backend Structure
- `backend/app/api/`: API route handlers by domain (whiskies, tasting_notes, etc.)
- `backend/app/models/`: SQLAlchemy models and Pydantic schemas
- `backend/app/db/`: Database connection and migration management
- `backend/app/services/`: Shared services like authentication

### Frontend Structure
- `frontend/src/components/`: Reusable UI components
- `frontend/src/pages/`: Page components by domain
- `frontend/src/services/`: Shared services (AuthContext, etc.)

## Coding Patterns & Guidelines

### Backend Guidelines
1. **API Endpoints:** Follow RESTful patterns with consistent naming
2. **Authentication:** All endpoints should use the `get_current_user` dependency unless explicitly public
3. **Error Handling:** Use FastAPI's HTTPException with appropriate status codes
4. **Schema Validation:** Use Pydantic models for request/response validation
5. **Database Queries:** Use async SQLAlchemy patterns
6. **Documentation:** Include docstrings for all functions and classes
7. **File Uploads:** Use FastAPI's `UploadFile` for bottle image uploads with proper validation

### Frontend Guidelines
1. **Component Structure:** Use functional components with hooks
2. **State Management:** Use useState for local state, useContext for global state
3. **API Requests:** Use axios with the authentication header from AuthContext
4. **Error Handling:** Implement consistent error handling patterns with user feedback
5. **Loading States:** Show loading indicators during async operations
6. **Form Handling:** Use controlled components for form inputs
7. **Routing:** Use React Router for navigation
8. **Accessibility:** Ensure WCAG 2.1 Level AA compliance for all components
9. **Image Handling:** Implement proper image upload preview, validation, and responsive display

## Common Tasks & Examples

### Adding a New API Endpoint
1. Add a new route function in the appropriate file in `backend/app/api/`
2. Define Pydantic models for request/response schemas
3. Implement database queries using SQLAlchemy
4. Add appropriate error handling

### Creating a New Frontend Page
1. Create a new React component in `frontend/src/pages/`
2. Add the route in App.js
3. Implement API calls using axios
4. Handle loading, error, and success states

### Authentication Flow
1. Frontend sends login request to `/api/users/login`
2. Backend validates credentials and returns JWT token
3. Frontend stores token in localStorage
4. Frontend includes token in Authorization header for subsequent requests
5. Backend validates token using `get_current_user` dependency

### Managing User Groups
1. Users can create or join whiskey groups/clubs
2. Groups have their own collection entries, inventory, and tasting sessions
3. Group members can have admin or regular privileges
4. API endpoints should check group membership and permissions

## Database Schema Overview

The database includes the following key entities:

### User Management
- Users (authentication and profile data)
- Groups (for collaborative features)
- Group membership with role management

### Whiskey Categorization
- Countries of origin
- Regions within countries
- Whiskey categories/types
- Mashbill components and recipes
- Distilleries

### Collection Management
- Central whiskey database
- User collection entries
- Bottle images
- Tasting notes

### Inventory Tracking
- Inventory with bottle status and volume tracking
- Consumption history

### Tasting Sessions
- Session metadata
- Participants
- Whiskies tasted with ordering
- Session-specific notes

### Infinity Bottles
- Bottle creation and management
- Content tracking
- Pour history
- Tasting notes

### Dashboard Configuration
- User preferences for dashboard layout
- Stored configurations

## Common Challenges & Solutions

### Handling File Uploads
- Use FastAPI's `UploadFile` with Form data
- Process and store files in the specified upload directory
- Return file paths in API responses
- Implement proper validation for security (file size, type, etc.)

### Managing Relationships
- Use SQLAlchemy relationships for entity associations
- Implement cascade delete where appropriate
- Use join queries for fetching related data efficiently
- Consider group permissions when accessing related entities

### Asynchronous Operations
- Use async/await consistently in backend code
- Handle Promise-based operations properly in frontend

### Group Permission Management
- Check group membership and permissions in API endpoints
- Implement role-based access control for group resources
- Handle shared resources appropriately

## Industry Standards

When developing code for the WhiskeyTracker application, adhere to these industry standards:

### Python (Backend) Standards
1. **PEP 8:** Follow Python's style guide for code formatting and naming conventions
2. **Type Hints:** Use type annotations for function parameters and return values
3. **SOLID Principles:** Apply single responsibility, open/closed, Liskov substitution, interface segregation, and dependency inversion principles
4. **Security:** Follow OWASP guidelines to prevent common vulnerabilities (SQL injection, XSS, CSRF)
5. **Logging:** Implement structured logging with appropriate log levels
6. **Testing:** Write unit tests with pytest targeting at least 80% coverage

### JavaScript/React (Frontend) Standards
1. **ESLint & Prettier:** Code should pass linting with the project's ESLint configuration
2. **Accessibility (a11y):** Follow WCAG 2.1 AA standards for all UI components
3. **React Best Practices:** Use React hooks appropriately, avoid prop drilling, implement memoization where beneficial
4. **Performance:** Implement code splitting, lazy loading, and virtualization for large lists
5. **Responsive Design:** Ensure all UI works across mobile, tablet, and desktop viewports
6. **Semantic HTML:** Use appropriate HTML elements for their intended purpose

### General Standards
1. **Git Workflow:** Use feature branches with descriptive names, write meaningful commit messages
2. **Documentation:** Document complex logic, non-obvious decisions, and public APIs
3. **Error Handling:** Implement proper error boundaries and graceful degradation
4. **Internationalization:** Design with future i18n support in mind
5. **Performance:** Optimize database queries, API payload sizes, and frontend rendering
6. **Security:** Follow the principle of least privilege, sanitize inputs, validate data

## Testing Guidelines

Refer to `frontend/TESTING.md` for detailed testing procedures.

## Code Review Checklist

Review `CODEREVIEW.md` for consistency issues and recommended practices.

## Feature Roadmap

Refer to `TODO.md` for pending and upcoming features.

---

*Last updated: May 2, 2025*