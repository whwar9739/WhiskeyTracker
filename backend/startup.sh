#!/bin/bash
set -e

# Wait for the database to be ready
echo "Waiting for PostgreSQL to be ready..."
while ! pg_isready -h db -p 5432 -U postgres; do
  sleep 1
done
echo "PostgreSQL is ready!"

# Apply migrations
echo "Applying database migrations..."
alembic upgrade head
echo "Migrations applied successfully!"

# Start the application
echo "Starting the application..."
uvicorn main:app --host 0.0.0.0 --port 8000