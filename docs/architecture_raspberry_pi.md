Okay, let's get more specific about the technology choices for your Whiskey Tracker application, keeping in mind your self-hosting on a Raspberry Pi with Portainer.

**I. Technology Stack (Specific Choices)**

* **Backend:**  
  * **Language:** Python 3.11+  
  * **Framework:** FastAPI 1.0+. FastAPI is preferred for its performance, especially important on a Raspberry Pi, and its automatic API documentation.  
  * **Database:** PostgreSQL 16+. We'll use a specific version for consistency.  
  * **ORM:** SQLAlchemy 2.0+. A modern, performant version.  
  * **Async:** FastAPI is built on asyncio, so we'll leverage asynchronous programming throughout the backend for better concurrency.  
* **Frontend:**  
  * **Language:** HTML5, CSS3, JavaScript (ES6+)  
  * **Framework:** React 19+. React provides a good balance of performance and a rich ecosystem.  
  * **Bundler/Transpiler:** Vite 5.x+. Vite is fast and efficient for React development.  
  * **State Management:** React Context. For simplicity in this application, we'll start with React Context for state management. If the application grows significantly in complexity, we can consider a more robust solution like Redux or Zustand.  
* **Containerization:**  
  * Docker. We'll use Docker to containerize both the application and the database.  
* **Reverse Proxy:**  
  * Nginx 1.25+. Nginx is lightweight and well-suited for a Raspberry Pi.

**II. Architecture Diagram**

Here's an updated diagram with the specific technologies:

\[Image of a system architecture diagram with the following components:

* Internet: Cloud icon representing external users.  
* Nginx 1.25+: A box labeled "Nginx 1.25+" acting as a reverse proxy.  
* Docker Container 1: A box labeled "Whiskey Tracker Backend" containing:  
  * FastAPI 1.0+: Labeled as "Backend API"  
* Docker Container 2: A box labeled "Whiskey Tracker Frontend" containing:  
  * React 19+: Labeled as "Frontend App"  
* Docker Container 3: A box labeled "PostgreSQL 16+ Database"  
* Docker Network: Outlined area showing container communication paths
* Raspberry Pi: A box encompassing all the above components, labeled "Raspberry Pi"  
* Portainer: Depicted as a separate management interface, interacting with the Docker containers on the Raspberry Pi.\]

**III. Component Details**

* **Nginx 1.25+:**  
  * Listens on port 80 (and 443 for HTTPS, which we'll set up later).  
  * Routes requests:  
    * /api/\* is forwarded to the FastAPI backend container.  
    * All other requests are served the static files (HTML, CSS, JavaScript) from the React frontend container.  
  * Handles SSL termination (for HTTPS).  
  * Implements security features (rate limiting, HTTP headers).
  
* **Whiskey Tracker Backend Container:**  
  * **Backend (FastAPI 1.0+):**  
    * Provides a RESTful API with endpoints for:  
      * User management (/api/users)  
      * Whiskey logging (/api/whiskies)  
      * Tasting notes (/api/tasting\_notes)  
      * Inventory management (/api/inventory)  
      * Tasting sessions (/api/sessions)  
      * Infinity bottle management (/api/infinity\_bottles)  
    * Uses SQLAlchemy 2.0+ to interact with the PostgreSQL 16+ database.  
    * Handles data validation using Pydantic models.  
    * Implements JWT authentication and role-based authorization.
    * Includes automated OpenAPI documentation (Swagger UI).
    * Implements structured logging for monitoring and debugging.
    
* **Whiskey Tracker Frontend Container:**  
  * **Frontend (React 19+):**  
    * Built using Vite 5.x+.  
    * Communicates with the FastAPI backend via API calls.  
    * Uses React Router for navigation.  
    * Uses React Context for global state management (e.g., user authentication status).  
    * Provides components for:  
      * Viewing and creating whiskey entries.  
      * Managing inventory.  
      * Creating and viewing tasting sessions.  
      * Managing infinity bottles.  
      * User authentication.
    * Implements responsive design for mobile and desktop viewing.
      
* **PostgreSQL 16+ Database Container:**  
  * Stores data in a relational schema with tables for:  
    * users  
    * whiskies  
    * tasting\_notes  
    * inventory  
    * tasting\_sessions  
    * infinity\_bottles  
    * bottle\_images (stores file paths)  
  * Configured with appropriate security settings (e.g., strong passwords, restricted access).  
  * Persists data to a Docker volume on the Raspberry Pi.
  * Scheduled automated backups to external storage.
  * Configured for optimal performance on Raspberry Pi hardware.

**IV. Docker and Portainer**

* **Docker Compose:**
  * We'll use Docker Compose to define the services (Nginx, Frontend, Backend, PostgreSQL) and their relationships in a docker-compose.yml file.
  * **Network Configuration:**
    * Define explicit Docker networks to isolate services:
      * `frontend-network`: Connects Nginx and Frontend containers
      * `backend-network`: Connects Nginx, Backend, and PostgreSQL containers
    * This network separation improves security by limiting container-to-container communication
  * **Volume Management:**
    * Define named volumes for persistent data:
      * `postgres-data`: For database storage
      * `app-uploads`: For user-uploaded images
      * `nginx-config`: For Nginx configuration
    * Configure proper backup procedures for all volumes
  * **Resource Limits:**
    * Set memory and CPU constraints for each container to prevent resource exhaustion
    * Configure health checks to monitor container status
* **Portainer:**  
  * Provides a web-based UI for managing the Docker containers.  
  * Allows you to easily deploy the application using the docker-compose.yml file.  
  * Provides tools for monitoring the containers, viewing logs, and restarting them if necessary.  
  * Simplifies ongoing maintenance of the application on the Raspberry Pi.
  * Enables simple visualization of Docker networks and volumes
  * Facilitates container updates and rollbacks

**V. Raspberry Pi Specific Configuration**

* **Operating System:** Raspberry Pi OS (64-bit) is recommended to take full advantage of the Raspberry Pi's processor.  
* **Storage:**  
  * A high-speed microSD card (at least 32GB) is required.  
  * An external SSD is highly recommended for better performance and reliability for the database. The SSD should be mounted to a directory on the Raspberry Pi, and the PostgreSQL Docker volume should be configured to use that directory.
  * Configure regular backups of critical data to a separate physical storage device.
* **Networking:**  
  * A static IP address should be assigned to the Raspberry Pi on your local network. This will make it easier to access the application.  
  * Port forwarding should be configured on your router to allow external access to the application (ports 80 and 443).
  * Consider using a dynamic DNS service if your home IP address changes.
* **Security:**  
  * The Raspberry Pi should be secured with a strong password.
  * SSH key-based authentication instead of password authentication.
  * The operating system and software should be kept up to date with automated updates.
  * A firewall (e.g., ufw) should be configured on the Raspberry Pi with only necessary ports open.
  * Setup fail2ban to prevent brute force attacks.
  * Implement HTTPS with Let's Encrypt certificates that auto-renew.
* **Resource Monitoring:**
  * Install Prometheus and Grafana in containers for monitoring system resources.
  * Configure alerts for low disk space, high CPU usage, and memory constraints.
  * Monitor container health and restart services automatically when needed.
* **Performance Optimizations:**
  * Enable swap but with conservative settings to prevent SD card wear.
  * Configure PostgreSQL with appropriate memory settings for Raspberry Pi hardware.
  * Implement image optimization for whiskey bottle photos.
  * Configure browser caching through Nginx for static assets.

**VI. Database Considerations**

* **Backup Strategy:**
  * **Automated Backups:** 
    * Schedule daily PostgreSQL dumps using pg_dump 
    * Retain daily backups for 7 days, weekly backups for 1 month, and monthly backups for 1 year
    * Store backups on external storage (separate from the Raspberry Pi)
  * **Backup Monitoring:**
    * Alert if backups fail or exceed expected size thresholds
    * Implement backup validation to ensure backups are restorable
  * **Disaster Recovery:**
    * Document step-by-step recovery procedures
    * Test restoration process quarterly

* **Migration Strategy:**
  * **Schema Management:**
    * Use Alembic (integrated with SQLAlchemy) for database migrations
    * Version control all schema changes
    * Follow the pattern of creating migration scripts for each schema change
  * **Migration Process:**
    * Develop migrations locally and test before applying to production
    * Include both upgrade and downgrade paths in migration scripts
    * Document any manual intervention required during migrations
  * **Data Preservation:**
    * Ensure migrations include data migration logic when schema changes affect existing data
    * Create backup before applying migrations

* **Performance Tuning:**
  * **Indexing Strategy:**
    * Create appropriate indexes on frequently queried columns
    * Monitor query performance and adjust indexes as needed
  * **Connection Pooling:**
    * Configure appropriate connection pool settings for FastAPI application
    * Monitor connection usage patterns
  * **Query Optimization:**
    * Use SQLAlchemy's query optimization features
    * Implement database-level caching where appropriate

**VII. Security Enhancements**

* **API Authentication and Authorization:**
  * **JWT Implementation:**
    * Use JSON Web Tokens (JWT) for stateless authentication
    * Configure appropriate token expiration (short-lived access tokens with refresh tokens)
    * Store token secrets securely using environment variables
  * **Role-Based Access Control (RBAC):**
    * Implement user roles (Admin, Standard User, Read-Only)
    * Define granular permissions for each endpoint
    * Validate permissions at the API router level

* **HTTPS Implementation:**
  * **Let's Encrypt Integration:**
    * Automate certificate issuance and renewal
    * Configure Nginx for proper SSL termination
    * Implement HTTP to HTTPS redirection
  * **Security Headers:**
    * Content-Security-Policy (CSP)
    * Strict-Transport-Security (HSTS)
    * X-Content-Type-Options
    * X-Frame-Options

* **API Protection:**
  * **Rate Limiting:**
    * Implement rate limiting at the Nginx level
    * Configure separate limits for authenticated and unauthenticated requests
    * Implement exponential backoff for repeated failed authentication attempts
  * **Input Validation:**
    * Leverage Pydantic models for strict input validation
    * Implement input sanitization for all user-provided data
    * Validate file uploads (size, type, content)

* **Database Security:**
  * **Access Control:**
    * Use least privilege principle for database user accounts
    * Use parameterized queries to prevent SQL injection
  * **Data Protection:**
    * Encrypt sensitive data at rest
    * Hash passwords using modern algorithms (bcrypt/Argon2)
  * **Connection Security:**
    * Use SSL for database connections
    * Restrict database access to only the backend container

**VIII. Maintenance and Deployment Considerations**

* **Continuous Integration/Continuous Deployment (CI/CD):**
  * **Version Control:**
    * Store all application code in a Git repository
    * Use feature branches and pull requests for code changes
    * Implement branch protection rules for main/production branches
  * **Automated Testing:**
    * Unit tests for backend and frontend code
    * Integration tests for API endpoints
    * End-to-end tests for critical user journeys
  * **Deployment Pipeline:**
    * Automate build process for container images
    * Implement semantic versioning for releases
    * Create a simple deployment script that can be triggered remotely or scheduled

* **Update Strategy:**
  * **Application Updates:**
    * Implement blue-green deployment pattern for zero-downtime updates
    * Version all API endpoints to avoid breaking changes
    * Maintain a changelog to track features and bug fixes
  * **Dependency Management:**
    * Regularly audit and update dependencies for security vulnerabilities
    * Pin dependency versions for reproducible builds
    * Use tools like Dependabot to automate dependency updates
  * **Operating System and Container Updates:**
    * Schedule regular OS updates during low-usage periods
    * Implement container image scanning for vulnerabilities
    * Test updates in a staging environment before applying to production

* **Monitoring and Observability:**
  * **Logging:**
    * Implement structured logging with correlation IDs
    * Configure log rotation to prevent disk space issues
    * Consider using Loki or similar tool for log aggregation
  * **Performance Monitoring:**
    * Track API response times and error rates
    * Monitor database query performance
    * Implement user experience monitoring for frontend performance
  * **Alerting:**
    * Define alert thresholds for critical metrics
    * Configure notifications via email or messaging platforms
    * Create runbooks for common alerts with troubleshooting steps

* **Disaster Recovery:**
  * **Recovery Plan:**
    * Document step-by-step procedures for common failure scenarios
    * Create recovery scripts where possible to automate restoration
    * Test recovery procedures regularly
  * **Data Integrity:**
    * Implement application-level data validation
    * Configure database constraints to enforce data integrity
    * Schedule periodic data consistency checks