# Whiskey Tracker - Detailed Task Breakdown (2025)

This document breaks down the features outlined in the phased development plan into actionable tasks for a .NET Core, Angular, PostgreSQL, Docker-based architecture.

## Phase 1: Core Whiskey Logging & User Foundation (MVP)

**Goal:** Enable users to create accounts, log whiskies, and view their entries.

---

### P1.1: User Authentication

- **Backend (.NET Core):**
  - Define `User` entity/model (Id, Username, Email, HashedPassword, Role)
  - Create Entity Framework migration for `Users` table
  - Implement registration endpoint: `POST /api/users/register`
    - Password hashing (e.g., ASP.NET Core Identity, BCrypt)
    - Input validation via Data Annotations
    - Handle duplicate username/email errors
  - Implement login endpoint: `POST /api/auth/token`
    - Validate credentials
    - Generate JWT access token (secret, algorithm, expiration)
  - Implement password reset endpoints
    - `POST /api/users/request-password-reset` (email)
    - `POST /api/users/reset-password` (token, new password)
    - (Email sending can be mocked or deferred)
  - JWT authentication middleware for protected routes
  - Function to get current authenticated user from token

- **Frontend (Angular):**
  - Registration form component (username, email, password, confirm password)
    - Client-side validation
    - API call to backend
    - Handle success/error responses
  - Login form component (username/email, password)
    - API call to backend
    - Store JWT in Angular service/localStorage
    - Handle success/error responses
  - Password reset request form
    - API call to backend
  - Password reset form (token, new password)
    - API call to backend
  - Auth service for managing auth state
  - Protected routes using Angular Router
  - Redirect unauthenticated users to login

---

### P1.2: Whiskey Entry (Basic)

- **Backend (.NET Core):**
  - Define `Whiskey` entity/model (Id, UserId, Distillery, Name, Region, AgeStatement, ABV, ImageFilename)
  - Entity Framework migration for `Whiskies` table (foreign key to `Users`)
  - Add new whiskey endpoint: `POST /api/whiskies`
  - Get whiskies endpoint: `GET /api/whiskies`
  - Image upload endpoint: `POST /api/whiskies/{id}/image`
  - Data validation via Data Annotations

- **Frontend (Angular):**
  - Whiskey entry form component
    - API call to backend
    - Image upload support
    - Client-side validation
  - Whiskey list and detail view components
    - Display all logged whiskies
    - Show bottle image and details

---

### P1.3: Tasting Notes & Ratings

- **Backend (.NET Core):**
  - Define `TastingNote` entity/model (Id, WhiskeyId, UserId, Notes, Rating)
  - Entity Framework migration for `TastingNotes` table
  - Add tasting note endpoint: `POST /api/tasting_notes`
  - Get tasting notes endpoint: `GET /api/tasting_notes?whiskeyId={id}`

- **Frontend (Angular):**
  - Tasting notes form component
    - Rich text editor for notes
    - Star rating input
    - API call to backend
  - Display tasting notes and ratings in whiskey detail view

---

### P1.4: Basic Inventory Management

- **Backend (.NET Core):**
  - Define `Inventory` entity/model (Id, UserId, WhiskeyId, Quantity, Status)
  - Entity Framework migration for `Inventory` table
  - Add to inventory endpoint: `POST /api/inventory`
  - Get inventory endpoint: `GET /api/inventory`

- **Frontend (Angular):**
  - Inventory management component
    - Add, update, and view inventory
    - API calls to backend

---

### P1.5: Containerization & Deployment

- **Docker Compose:**
  - Define services for backend (.NET Core), frontend (Angular), PostgreSQL, Nginx
  - Configure networks and volumes
  - Health checks and resource limits
- **Portainer:**
  - Use Portainer for container management and monitoring

---

## Future Phases (Summary)
- Extended whiskey entry fields
- Edit/delete whiskey entries
- Advanced inventory features
- Tags/categories
- Search/filtering
- Tasting sessions
- Infinity bottle management
- Admin features
- Scalability and performance improvements

---

**Note:** All backend logic uses .NET Core Web API and Entity Framework Core. All frontend logic uses Angular and Angular Material. All services are containerized and orchestrated via Docker Compose and Portainer.
