# WhiskeyTracker

WhiskeyTracker is a web application designed to help whiskey enthusiasts track, log, and manage their whiskey tasting experiences.

## Features

- Log and catalog whiskey entries with detailed information
- Upload and view bottle images
- Record tasting notes and ratings
- Manage whiskey inventory
- Create and track tasting sessions
- Manage infinity bottles (bottles created by mixing different whiskies)
- View analytics and summaries of your tasting history

## Technology Stack

- **Backend**: Python 3.11+ with FastAPI 1.0+
- **Database**: PostgreSQL 16+
- **ORM**: SQLAlchemy 2.0+
- **Frontend**: React 19+ with Vite 5.x+
- **Containerization**: Docker with Nginx as a reverse proxy

## Project Structure

```
docker-compose.yml          # Docker Compose configuration
backend/                    # FastAPI backend application
  Dockerfile                # Backend Docker configuration
  main.py                   # FastAPI application entry point
  requirements.txt          # Python dependencies
  alembic/                  # Database migration scripts
  app/                      # Application code
    __init__.py             # Package initialization
    api/                    # API endpoints and routes
    db/                     # Database configuration
    models/                 # SQLAlchemy models
    schemas/                # Pydantic schemas
    services/               # Business logic
    utils/                  # Utility functions
  data/                     # Data storage
    uploads/                # User-uploaded files
  tests/                    # Backend tests
docker/                     # Docker configuration files
  nginx/                    # Nginx configuration
    default.conf            # Nginx server configuration
docs/                       # Documentation
frontend/                   # React frontend application
  Dockerfile                # Frontend Docker configuration
  package.json              # JavaScript dependencies
  vite.config.js            # Vite configuration
  public/                   # Static files
  src/                      # React source code
    App.jsx                 # Main React component
    main.jsx                # Application entry point
    components/             # Reusable components
    context/                # React Context state management
    hooks/                  # Custom React hooks
    pages/                  # Page components
    utils/                  # Utility functions
    assets/                 # Static assets
```

## Getting Started

### Prerequisites

- Docker and Docker Compose
- Git

### Development Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/WhiskeyTracker.git
   cd WhiskeyTracker
   ```

2. Start the development environment:
   ```bash
   docker-compose up -d
   ```

3. Access the applications:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - API Documentation: http://localhost:8000/docs

### Database Migrations

Create a new migration after model changes:

```bash
docker-compose exec backend alembic revision --autogenerate -m "Description of changes"
```

Apply migrations:

```bash
docker-compose exec backend alembic upgrade head
```

## Phased Development Plan

This project follows a phased development approach:

1. **Phase 1**: Core Whiskey Logging & User Foundation (MVP)
2. **Phase 2**: Enhanced Data Management & Organization
3. **Phase 3**: Advanced Tracking & User Experience Refinements
4. **Phase 4**: Analytics, Reporting & Polish
5. **Phase 5**: Future Considerations & Community (Post-Release)

See `docs/phased_development_plan.md` for detailed information.

## Deployment

This application is designed to be deployed on a Raspberry Pi using Portainer:

1. Install Portainer on your Raspberry Pi
2. Use the provided Docker Compose file to deploy the application
3. Configure port forwarding on your router if you want to access the application from outside your local network

See `docs/architecture_raspberry_pi.md` for detailed information on deploying to a Raspberry Pi.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.