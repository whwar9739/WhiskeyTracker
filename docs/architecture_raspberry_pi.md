# Whiskey Tracker Architecture for Raspberry Pi Deployment

## I. Technology Stack (2025)

- **Backend:**
  - **Language:** C#
  - **Framework:** .NET Core Web API
  - **ORM:** Entity Framework Core
  - **Database:** PostgreSQL 16+
  - **Async:** Uses async/await for scalable, performant API endpoints
- **Frontend:**
  - **Language:** TypeScript, HTML5, CSS3
  - **Framework:** Angular (latest LTS)
  - **UI Library:** Angular Material
- **Containerization:**
  - Docker (all services containerized)
- **Reverse Proxy:**
  - Nginx (latest stable)
- **Management:**
  - Portainer (for container orchestration)

## II. Architecture Diagram

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

### Whiskey Tracker Backend (.NET Core)
- RESTful API endpoints:
  - User management (`/api/users`)
  - Whiskey logging (`/api/whiskies`)
  - Tasting notes (`/api/tasting_notes`)
  - Inventory management (`/api/inventory`)
  - Tasting sessions (`/api/sessions`)
  - Infinity bottle management (`/api/infinity_bottles`)
- Entity Framework Core for DB access
- Data validation via Data Annotations
- JWT authentication and role-based authorization
- OpenAPI/Swagger documentation

### Whiskey Tracker Frontend (Angular)
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

## IV. Raspberry Pi Specific Configuration
- **OS:** Raspberry Pi OS (64-bit recommended)
- **Storage:** External SSD for database volume, regular backups
- **Networking:** Static IP, port forwarding, dynamic DNS if needed
- **Security:** Strong passwords, SSH keys, firewall, fail2ban, HTTPS with Let's Encrypt
- **Monitoring:** Prometheus & Grafana for resource monitoring
- **Performance:** PostgreSQL tuned for Pi, image optimization, browser caching

## V. Database Considerations
- **Backup:** Automated daily backups with retention policy
- **Migration:** Entity Framework Core migrations, version control
- **Performance:** Indexing, connection pooling, query optimization

## VI. Security Enhancements
- **Auth:** JWT, role-based access control
- **HTTPS:** Let's Encrypt, security headers
- **API Protection:** Rate limiting, input validation, file upload validation
- **DB Security:** Least privilege, parameterized queries, encryption, SSL connections

## VII. Maintenance & Deployment
- **CI/CD:** Git, feature branches, automated tests, deployment pipeline
- **Updates:** Blue-green deployment, versioned APIs, changelog, dependency management
- **Monitoring:** Structured logging, performance monitoring, alerting
- **Disaster Recovery:** Documented recovery plan, regular testing, data integrity checks

---

**Note:** This architecture is optimized for Raspberry Pi self-hosting, with all services containerized for portability and maintainability.
