# GitHub Copilot Instructions for WhiskeyTracker App (2025)

This document provides instructions for using GitHub Copilot effectively with the WhiskeyTracker application codebase, now based on .NET Core, Angular, PostgreSQL, Docker, and Nginx.

## Project Overview

WhiskeyTracker is a full-stack web application for whiskey enthusiasts to:
- Track their whiskey collection
- Record tasting notes
- Create and manage tasting sessions
- Track infinity bottles (custom blends)
- Manage their whiskey inventory
- View personalized statistics and insights via dashboards
- Upload and view bottle images
- Filter and search their whiskey collection
- Manage group collaborations for shared collections and tastings

### Tech Stack

#### Backend
- C# (.NET Core Web API)
- Entity Framework Core ORM
- PostgreSQL
- JWT authentication
- RESTful endpoints
- Data validation via Data Annotations
- OpenAPI/Swagger documentation

#### Frontend
- Angular (latest LTS)
- Angular Material UI components
- Angular Router for navigation
- Angular services for state management
- HttpClient for API requests
- RxJS for reactive programming
- Day.js for date handling

#### Infrastructure
- Docker and Docker Compose
- Nginx for reverse proxy
- Portainer for container management
- CI/CD pipeline

## Development Environment

All services (backend, frontend, database, Nginx) run in Docker containers. Use Docker Compose for orchestration and Portainer for management.

**Instructions for GitHub Copilot:**
* **Dependency Management:**
  - For backend, use `docker-compose exec backend dotnet add package <PackageName>`
  - For frontend, use `docker-compose exec frontend npm install <package_name>`
* **Running Commands:**
  - Prefix all build, migration, and test commands with `docker-compose exec <service_name> ...`
  - Example: `docker-compose exec backend dotnet ef migrations add InitialCreate`
* **Service Interaction:**
  - Services communicate using Docker Compose service names (e.g., frontend connects to `http://backend:5000`)
* **Avoid Local Installation:**
  - Do not suggest installing dependencies directly on the host OS; use containers

## Code Organization

### Backend Structure
- `backend/Controllers/`: API controllers (Users, Whiskies, TastingNotes, etc.)
- `backend/Models/`: Entity Framework models
- `backend/Data/`: Database context and migrations
- `backend/Services/`: Shared services (authentication, business logic)
- `backend/DTOs/`: Data transfer objects for API requests/responses

### Frontend Structure
- `frontend/src/app/components/`: Angular components
- `frontend/src/app/services/`: Angular services (API, Auth, Inventory, etc.)
- `frontend/src/app/models/`: TypeScript interfaces/models
- `frontend/src/app/pages/`: Page-level components (Dashboard, WhiskeyDetail, etc.)
- `frontend/src/app/app-routing.module.ts`: Routing configuration

## Containerization & Deployment
- Use Docker Compose for orchestration
- Nginx as reverse proxy (routes `/api/*` to backend, serves Angular static files)
- Portainer for container management
- Automated builds and deployments via CI/CD pipeline

## Best Practices
- Use feature branches and pull requests
- Write unit and integration tests for backend and frontend
- Use Entity Framework migrations for DB schema changes
- Document API endpoints with Swagger
- Use Angular services for state management
- Secure sensitive data with environment variables
- Monitor containers and application health

---

**Note:** All instructions and code suggestions should reflect the .NET Core, Angular, PostgreSQL, Docker, and Nginx stack.
