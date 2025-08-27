# Whiskey Tracker Web Application – Product Requirements (2025)

## I. Overview & Goals

- **Purpose:** Define requirements for the Whiskey Tracker web app, enabling users to log, track, and manage whiskies and tasting experiences.
- **Scope:** Core features for initial release, with future enhancements planned. Web-only, designed for possible PWA upgrade.
- **Platform:** .NET Core backend, Angular frontend, PostgreSQL database, Docker containerization, Nginx reverse proxy, Raspberry Pi deployment.
- **Audience:** Developers, designers, stakeholders.
- **Version:** 1.0
- **Business Goals:**
  - Provide a useful tool for whiskey enthusiasts
  - Explore future monetization (premium features, ads)
  - Build a whiskey community
- **Product Goals:**
  - Easy recording of whiskey details and tastings
  - Organize and categorize experiences
  - Provide insights and summaries
  - User-friendly, intuitive interface
- **KPIs:**
  - Registered users
  - Whiskies logged
  - User engagement
  - User satisfaction

## II. Target Audience & User Needs

- **Personas:**
  - Enthusiast: Detailed records, sharing notes
  - Explorer: Learning, tracking likes/dislikes
  - Collector: Tracking rare bottles, collection management
- **Needs:**
  - Centralized whiskey/tasting records
  - Easy comparison and organization
  - Sharing and learning from others
  - Infinity bottle tracking

## III. Product Description & User Stories

- **High-Level Overview:**
  - Log/manage whiskies, tasting notes, ratings, purchase info, inventory, sessions, infinity bottles
  - Organize, search, and summarize data
- **Key Features:**
  - Whiskey logging (attributes, bottle image)
  - Tasting notes (rich text)
  - Rating system (1-5 stars)
  - Organization (tags, categories)
  - Search/filtering
  - Personalized statistics
  - Inventory tracking
  - Tasting sessions
  - Infinity bottle management
- **User Stories:**
  - As a user, I want to add a whiskey with details and a bottle image
  - As a user, I want to record tasting notes (aroma, palate, finish)
  - As a user, I want to rate whiskies
  - As a user, I want to search my whiskies by distillery or region
  - As a user, I want to see summaries of my tastings
  - As a user, I want to manage my inventory and quantities
  - As a user, I want to associate tastings with inventory
  - As a user, I want to create tasting sessions and record session-specific notes
  - As a user, I want to track infinity bottles and their contents

## IV. Technical Requirements

- **Backend:**
  - .NET Core Web API
  - Entity Framework Core ORM
  - JWT authentication
  - RESTful endpoints
  - Data validation via Data Annotations
  - OpenAPI/Swagger documentation
- **Frontend:**
  - Angular SPA
  - Angular Material UI
  - Angular Router for navigation
  - Angular services for state management
  - HttpClient for API requests
  - Responsive/mobile-friendly design
- **Database:**
  - PostgreSQL 16+
  - Entity Framework migrations
  - Relational schema for users, whiskies, notes, inventory, sessions, infinity bottles
- **Containerization & Deployment:**
  - Docker Compose for orchestration
  - Nginx reverse proxy
  - Portainer for management
  - Raspberry Pi OS (64-bit)
  - External SSD for DB volume
  - Automated backups
- **Security:**
  - HTTPS via Let's Encrypt
  - Role-based access control
  - Rate limiting, input validation
  - Secure password storage
- **Monitoring & Maintenance:**
  - Prometheus & Grafana for monitoring
  - Structured logging
  - CI/CD pipeline
  - Disaster recovery plan

---

**Note:** All requirements and implementation details are based on the .NET Core, Angular, PostgreSQL, Docker, and Nginx stack, optimized for Raspberry Pi self-hosting.
