...existing code...
# Whiskey Tracker – Main Architecture Overview (2025)

## I. Technology Stack

- **Backend:**
  - C# (.NET Core Web API)
  - Entity Framework Core ORM
  - PostgreSQL 16+
  - JWT authentication
  - RESTful endpoints
  - Data validation via Data Annotations
  - OpenAPI/Swagger documentation
- **Frontend:**
  - Angular (latest LTS)
  - Angular Material UI
  - TypeScript, HTML5, CSS3
  - Angular Router, Angular services
  - RxJS for reactive programming
- **Containerization:**
  - Docker for all services
  - Docker Compose for orchestration
- **Reverse Proxy:**
  - Nginx (latest stable)
- **Management:**
  - Portainer for container management
- **Deployment:**
  - Raspberry Pi OS (64-bit)
  - External SSD for database volume

## II. System Architecture Diagram

[Diagram Description]
- **Internet:** External users
- **Nginx:** Reverse proxy, SSL termination, security headers
- **Docker Container 1:** Whiskey Tracker Backend (.NET Core Web API)
- **Docker Container 2:** Whiskey Tracker Frontend (Angular)
- **Docker Container 3:** PostgreSQL Database
- **Docker Network:** Internal communication between containers
- **Raspberry Pi:** Hosts all containers
- **Portainer:** Manages containers on the Pi

## III. Component Details

### Nginx
- Listens on ports 80/443
- Routes `/api/*` to backend container
- Serves Angular static files for all other requests
- SSL termination and security features

### Backend (.NET Core)
- RESTful API endpoints for:
  - User management
  - Whiskey logging
  - Tasting notes
  - Inventory management
  - Tasting sessions
  - Infinity bottle management
- Entity Framework Core for DB access
- Data validation via Data Annotations
- JWT authentication and role-based authorization
- OpenAPI/Swagger documentation

### Frontend (Angular)
- Angular SPA served as static files
- Angular Material for UI
- Communicates with backend via HTTP
- Auth state managed via Angular services

### PostgreSQL Database
- Stores all application data
- Managed via Entity Framework migrations

### Containerization & Management
- All services run in Docker containers
- Portainer provides web UI for management
- Docker Compose for orchestration

## IV. Security & Maintenance
- HTTPS via Let's Encrypt
- Role-based access control
- Rate limiting, input validation
- Secure password storage
- Automated backups
- Prometheus & Grafana for monitoring
- Structured logging
- CI/CD pipeline
- Disaster recovery plan

---

**Note:** This architecture is optimized for Raspberry Pi self-hosting, with all services containerized for portability and maintainability. All implementation is based on .NET Core, Angular, PostgreSQL, Docker, and Nginx.
