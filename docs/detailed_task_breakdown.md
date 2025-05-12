# Detailed Task Breakdown for Whiskey Tracker

This document breaks down the features outlined in the `phased_development_plan.md` into smaller, actionable tasks, considering the architecture defined in `architecture_raspberry_pi.md`.

## Phase 1: Core Whiskey Logging & User Foundation (MVP)

**Goal:** Establish the fundamental ability for users to create accounts, log whiskies with essential details, and view their entries.

---

**P1.1: User Authentication**

*   **P1.1.1: Backend - User Model & DB Schema**
    *   Define `User` SQLAlchemy model (id, username, email, hashed_password, role).
    *   Create Alembic migration for `users` table.
*   **P1.1.2: Backend - Registration Endpoint**
    *   FastAPI: `POST /api/users/register` (username, email, password).
    *   Implement password hashing (bcrypt/Argon2).
    *   Input validation (Pydantic model).
    *   Handle duplicate username/email errors.
*   **P1.1.3: Backend - Login Endpoint & JWT**
    *   FastAPI: `POST /api/auth/token` (username/email, password).
    *   Validate credentials.
    *   Generate JWT access token (define secret, algorithm, expiration).
*   **P1.1.4: Backend - Password Reset (Token Generation)**
    *   FastAPI: `POST /api/users/request-password-reset` (email) - generates & stores reset token.
    *   FastAPI: `POST /api/users/reset-password` (token, new_password) - validates token & updates password.
    *   (Email sending can be mocked or deferred).
*   **P1.1.5: Backend - JWT Authentication Middleware**
    *   FastAPI middleware to verify JWT on protected routes.
    *   Function to get current authenticated user from token.
*   **P1.1.6: Frontend - Registration Form Component**
    *   React: Create registration form (username, email, password, confirm password).
    *   Client-side validation.
    *   API call to `POST /api/users/register`.
    *   Handle success/error responses & user feedback.
*   **P1.1.7: Frontend - Login Form Component**
    *   React: Create login form (username/email, password).
    *   API call to `POST /api/auth/token`.
    *   Store JWT in React Context / localStorage.
    *   Handle success/error responses & user feedback.
*   **P1.1.8: Frontend - Password Reset Request Form**
    *   React: Form for email input.
    *   API call to `POST /api/users/request-password-reset`.
*   **P1.1.9: Frontend - Password Reset Form**
    *   React: Form for token (from URL param), new password, confirm new password.
    *   API call to `POST /api/users/reset-password`.
*   **P1.1.10: Frontend - Auth Context & Routing**
    *   React Context for managing auth state (user, token, isAuthenticated).
    *   Implement protected routes using React Router.
    *   Redirect unauthenticated users to login.

---

**P1.2: Whiskey Entry (Basic)**

*   **P1.2.1: Backend - Whiskey Model & DB Schema (Core)**
    *   Define `Whiskey` SQLAlchemy model (id, user_id, distillery, name_expression, region, age_statement, abv, image_filename).
    *   Alembic migration for `whiskies` table (include foreign key to `users`).
*   **P1.2.2: Backend - Add New Whiskey Endpoint**
    *   FastAPI: `POST /api/whiskies` (accepts whiskey data & image).
    *   Associate with authenticated user.
    *   Input validation (Pydantic model).
*   **P1.2.3: Backend - Image Upload Handling**
    *   Configure FastAPI for `UploadFile`.
    *   Save uploaded image to `app-uploads` volume (ensure unique filenames).
    *   Store filename/path in `Whiskey.image_filename`.
    *   Basic validation: file type (JPEG, PNG), size (define initial limit e.g., 5MB).
*   **P1.2.4: Frontend - Add Whiskey Form Component**
    *   React: Form for Distillery, Name/Expression, Region, Age Statement, ABV.
    *   File input for image upload with preview.
    *   API call (multipart/form-data) to `POST /api/whiskies`.
    *   Handle success/error responses.

---

**P1.3: Tasting Notes (General)**

*   **P1.3.1: Backend - Tasting Notes Field in Whiskey Model**
    *   Add `general_tasting_notes` (Text type) to `Whiskey` SQLAlchemy model.
    *   Update Alembic migration.
*   **P1.3.2: Backend - API for Tasting Notes**
    *   Modify `POST /api/whiskies` to accept `general_tasting_notes`.
    *   FastAPI: `PUT /api/whiskies/{whiskey_id}` or a dedicated sub-route like `PUT /api/whiskies/{whiskey_id}/general_notes` to update notes.
    *   Ensure user owns the whiskey.
*   **P1.3.3: Frontend - Rich Text Editor Integration**
    *   Select and integrate a lightweight React rich text editor component.
    *   Incorporate into Add/Edit Whiskey form for `general_tasting_notes`.

---

**P1.4: Rating**

*   **P1.4.1: Backend - Rating Field in Whiskey Model**
    *   Add `rating` (Integer or Float for potential half-stars later) to `Whiskey` SQLAlchemy model.
    *   Update Alembic migration.
*   **P1.4.2: Backend - API for Rating**
    *   Modify `POST /api/whiskies` to accept `rating`.
    *   FastAPI: `PUT /api/whiskies/{whiskey_id}` or `PUT /api/whiskies/{whiskey_id}/rating` to update rating.
    *   Ensure user owns the whiskey.
*   **P1.4.3: Frontend - Star Rating Component**
    *   React: Create/integrate a 1-5 star rating input component.
    *   Incorporate into Add/Edit Whiskey form.
    *   Component for displaying star ratings visually.

---

**P1.5: Whiskey Detail View**

*   **P1.5.1: Backend - Get Whiskey Detail Endpoint**
    *   FastAPI: `GET /api/whiskies/{whiskey_id}`.
    *   Return all core fields, general tasting notes, rating, image URL.
    *   Ensure user owns the whiskey (or adjust for public view later).
*   **P1.5.2: Frontend - Whiskey Detail Page Component**
    *   React: Page to display fetched whiskey details.
    *   Display formatted text, image (construct URL from filename), rating.

---

**P1.6: Basic List & View**

*   **P1.6.1: Backend - List User's Whiskies Endpoint**
    *   FastAPI: `GET /api/whiskies`.
    *   Return list of whiskies for the authenticated user (id, name, distillery, image_filename, rating).
    *   Implement basic pagination.
*   **P1.6.2: Frontend - Whiskey List Page Component**
    *   React: Page to display a list/grid of whiskies.
    *   Each item links to its Whiskey Detail Page.
    *   Display thumbnail, name, distillery, rating.
    *   Implement frontend pagination if backend supports it.

---

**P1.7: Non-Functional & Design (Initial)**

*   **P1.7.1: Docker - Initial `docker-compose.yml`**
    *   Setup for backend (FastAPI), frontend (React dev server), PostgreSQL.
    *   Define `frontend-network`, `backend-network`.
    *   Define volumes: `postgres-data`, `app-uploads`, `nginx-config` (placeholder).
*   **P1.7.2: Nginx - Basic Configuration**
    *   Initial Nginx config to proxy `/api` to backend and serve frontend static files (once built).
    *   Listen on port 80.
*   **P1.7.3: Backend - Static File Serving for Images**
    *   Configure FastAPI or Nginx to serve images from the `app-uploads` volume.
*   **P1.7.4: Security - Basic Input Validation (Pydantic)**
    *   Ensure all API endpoints use Pydantic models for request body validation.
*   **P1.7.5: Security - Image Upload Hardening**
    *   Implement server-side validation for image file types and size.
    *   Consider filename sanitization.
*   **P1.7.6: Maintainability - Linters & Formatters**
    *   Setup Black, Flake8 for Python.
    *   Setup ESLint, Prettier for React/JS.
*   **P1.7.7: UI - Wireframes/Mockups**
    *   Create simple wireframes for: Login, Register, Add Whiskey, List Whiskies, Whiskey Detail.
*   **P1.7.8: UI - Basic Styling**
    *   Choose and integrate a CSS framework (e.g., Tailwind CSS) or set up basic custom CSS.
    *   Ensure core pages are mobile-responsive.
*   **P1.7.9: Testing - Initial Setup**
    *   Setup Pytest for backend unit tests.
    *   Setup Jest/React Testing Library for frontend unit/component tests.
    *   Write initial tests for user auth and whiskey creation.

## Phase 2: Enhanced Data Management & Organization

**Goal:** Expand on the core by allowing users to manage their collection more effectively, add more details, and begin organizing their data.

---

**P2.1: Whiskey Entry (Extended)**

*   **P2.1.1: Backend - Extend Whiskey Model & DB Schema**
    *   Add fields to `Whiskey` model: bottling_date, cask_type, purchase_date, purchase_price, where_purchased, bottle_status (e.g., Enum: 'Full', 'Opened', 'Empty').
    *   Update Alembic migration.
*   **P2.1.2: Backend - Update Add/Edit Whiskey Endpoints**
    *   Modify `POST /api/whiskies` and add `PUT /api/whiskies/{whiskey_id}` to handle new fields.
    *   Update Pydantic models.
*   **P2.1.3: Backend - Delete Whiskey Endpoint**
    *   FastAPI: `DELETE /api/whiskies/{whiskey_id}`.
    *   Ensure user owns the whiskey.
    *   Consider what to do with the associated image file (delete or orphan).
*   **P2.1.4: Frontend - Update Add/Edit Whiskey Form**
    *   Add new fields to the React form component.
    *   Update API calls.
*   **P2.1.5: Frontend - Delete Whiskey Functionality**
    *   Add delete button to Whiskey Detail page or List.
    *   Confirmation dialog before deletion.
    *   API call to `DELETE /api/whiskies/{whiskey_id}`.

---

**P2.2: Inventory Management**

*   **P2.2.1: Backend - InventoryItem Model & DB Schema**
    *   Define `InventoryItem` SQLAlchemy model (id, user_id, whiskey_id, quantity, date_added, status - e.g., 'In Stock', 'Consumed').
    *   Alembic migration for `inventory_items` table.
*   **P2.2.2: Backend - API Endpoints for Inventory**
    *   `POST /api/inventory`: Add a whiskey (by whiskey_id) to inventory with quantity.
    *   `GET /api/inventory`: List user's inventory items (join with `whiskies` for details).
    *   `PUT /api/inventory/{inventory_item_id}`: Update quantity or status.
    *   `DELETE /api/inventory/{inventory_item_id}`: Remove from inventory.
*   **P2.2.3: Frontend - "Add to Inventory" Feature**
    *   Button on Whiskey Detail/List to add to inventory.
    *   Modal/form to specify quantity.
*   **P2.2.4: Frontend - Inventory List Page/Section**
    *   React component to display inventory (whiskey name, distillery, quantity, status).
    *   Actions to update quantity, mark as consumed, remove.
*   **P2.2.5: Frontend - Update Bottle Status Integration**
    *   When marking inventory as "Consumed", potentially update `Whiskey.bottle_status`.

---

**P2.3: Tags/Categories (Basic)**

*   **P2.3.1: Backend - Tag Model & DB Schema**
    *   Define `Tag` SQLAlchemy model (id, name, user_id - for user-defined tags, or null for predefined).
    *   Define `whiskey_tags` association table (whiskey_id, tag_id).
    *   Alembic migrations.
*   **P2.3.2: Backend - API for Tags**
    *   `POST /api/tags`: Create new custom tag.
    *   `GET /api/tags`: List available tags (predefined + user's custom).
    *   Modify `POST /api/whiskies` and `PUT /api/whiskies/{whiskey_id}` to accept/update list of tag IDs or names.
*   **P2.3.3: Backend - Predefined Categories (Initial Structure)**
    *   Plan how to store/manage predefined categories (Country, Region, Type) - e.g., separate tables, enums, or seed data for `Tag` table.
    *   For now, allow `Whiskey` model to have simple string fields for `country`, `region`, `category_type`.
*   **P2.3.4: Frontend - Tag Input Component**
    *   React component for adding/selecting tags in Add/Edit Whiskey form (e.g., typeahead, multi-select).
*   **P2.3.5: Frontend - Display Tags**
    *   Show tags on Whiskey Detail page and potentially List page.

---

**P2.4: Search and Filtering (Basic)**

*   **P2.4.1: Backend - Basic Search on Whiskey List Endpoint**
    *   Modify `GET /api/whiskies` to accept query parameters for distillery, name, region, tags.
    *   Implement basic text search (e.g., `ILIKE` for PostgreSQL).
    *   Implement filtering by exact match for tags (if associated).
*   **P2.4.2: Backend - Basic Filters for Country, Region, Category**
    *   Add query parameters to `GET /api/whiskies` for these fields.
*   **P2.4.3: Frontend - Search Input Field**
    *   Add search bar to Whiskey List page.
*   **P2.4.4: Frontend - Basic Filter UI**
    *   Dropdowns or checkboxes for country, region, category on Whiskey List page.
    *   Update API calls with selected filters.

---

**P2.5: Whiskey Database & Data Management (Foundation)**

*   **P2.5.1: Backend - Administrator Role Implementation**
    *   Ensure `User.role` is functional.
    *   Protect admin-specific endpoints.
*   **P2.5.2: Backend - Basic Admin User Management (Placeholder)**
    *   Stub out endpoints for admin to list users (no complex actions yet).
*   **P2.5.3: Documentation - Custom Whiskey Entry Focus**
    *   Confirm that users can always create fully custom entries if a whiskey isn't in any (future) central DB.

---

## Phase 3: Advanced Tracking & User Experience Refinements

*(Further breakdown for Phase 3, 4, and 5 would follow a similar pattern, detailing backend models, API endpoints, frontend components, and specific tasks for each feature like Tasting Sessions, Infinity Bottles, Advanced Filtering, Dashboard, etc. Each feature from `phased_development_plan.md` would be expanded into multiple actionable sub-tasks.)*

**Example Snippet for Phase 3 - Tasting Sessions:**

**P3.1: Tasting Sessions**

*   **P3.1.1: Backend - TastingSession Model & DB Schema**
    *   `TastingSession` model (id, user_id, name, theme, date).
    *   `SessionWhiskey` model (association: session_id, whiskey_id, order_tasted, session_specific_notes - Text type).
    *   Alembic migrations.
*   **P3.1.2: Backend - API Endpoints for Tasting Sessions**
    *   `POST /api/tasting-sessions`: Create new session.
    *   `GET /api/tasting-sessions`: List user's sessions.
    *   `GET /api/tasting-sessions/{session_id}`: Get session details (including whiskies).
    *   `POST /api/tasting-sessions/{session_id}/whiskies`: Add whiskey to session with order & notes.
    *   `PUT /api/tasting-sessions/{session_id}/whiskies/{session_whiskey_id}`: Update notes/order for a whiskey in a session.
    *   `DELETE /api/tasting-sessions/{session_id}`: Delete a session.
*   **P3.1.3: Frontend - Create/Edit Tasting Session Form**
    *   React component for session name, theme, date.
    *   Interface to add whiskies (from existing log/inventory), set order, add session-specific notes.
*   **P3.1.4: Frontend - Tasting Session List Page**
    *   Display list of sessions, link to detail view.
*   **P3.1.5: Frontend - Tasting Session Detail Page**
    *   Display session info, list of whiskies tasted (with order, session notes, link to main whiskey page).
*   **P3.1.6: Whiskey Detail View Enhancement**
    *   Backend: Modify `GET /api/whiskies/{whiskey_id}` to optionally include list of tasting sessions it was part of.
    *   Frontend: Update Whiskey Detail Page to display this information.

---

**P3.2: Infinity Bottle Management**

*   **P3.2.1: Backend - InfinityBottle Model & DB Schema**
    *   `InfinityBottle` model (id, user_id, name, creation_date, general_notes).
    *   `InfinityBottleAddition` model (id, infinity_bottle_id, whiskey_id, date_added, amount_added_ml).
    *   Alembic migrations.
*   **P3.2.2: Backend - API Endpoints for Infinity Bottles**
    *   CRUD for `InfinityBottle`.
    *   Endpoints to add/list/remove `InfinityBottleAddition`.
*   **P3.2.3: Frontend - Infinity Bottle UI**
    *   Forms for creating/editing infinity bottles.
    *   Interface to log additions (select whiskey from inventory, date, amount).
    *   View to display infinity bottle contents and general notes.

---

*(Continue for other Phase 3 features: Whiskey Database Enhancements, Advanced Search/Filtering, Accessibility Focus)*

## Phase 4: Analytics, Reporting & Polish

*(Breakdown for Dashboard, Data Export, Admin Enhancements, Full NFR implementation)*

## Phase 5: Future Considerations & Community

*(Breakdown for Group Collaboration, API Integrations, etc.)*

---

**General Tasks (Ongoing through all phases):**

*   **Testing:** Write unit, integration, and (eventually) E2E tests for new features.
*   **Documentation:** Update API documentation (FastAPI auto-docs), user guides if applicable.
*   **CI/CD:** Incrementally build out CI/CD pipeline (e.g., GitHub Actions to build Docker images, run tests).
*   **Security:** Regular review of dependencies, security headers, input validation.
*   **Performance:** Monitor and optimize queries and frontend rendering as data grows.
*   **Accessibility:** Continuously test against WCAG 2.1 AA as UI elements are built.
*   **Refactoring:** Address tech debt and refactor code as needed.

```