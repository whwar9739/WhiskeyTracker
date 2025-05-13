# Alembic configuration file for the WhiskeyTracker application
import os
import sys
from logging.config import fileConfig

from sqlalchemy import engine_from_config
from sqlalchemy import pool

from alembic import context

# Add the application to the Python path
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

# Import the application's models (which will be used to generate migrations)
from app.db.database import Base
from app.models import *  # This will be populated as models are created

# Load config details from alembic.ini
config = context.config

# Get the SQLAlchemy database URL from environment variable if available
sqlalchemy_url = os.getenv("DATABASE_URL", "postgresql://postgres:postgres@localhost:5432/whiskey_tracker")
config.set_main_option("sqlalchemy.url", sqlalchemy_url)

# Configure logging
fileConfig(config.config_file_name)

# Set target metadata
target_metadata = Base.metadata

def run_migrations_offline():
    """Run migrations in 'offline' mode."""
    url = config.get_main_option("sqlalchemy.url")
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()

def run_migrations_online():
    """Run migrations in 'online' mode."""
    connectable = engine_from_config(
        config.get_section(config.config_ini_section),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    with connectable.connect() as connection:
        context.configure(
            connection=connection, 
            target_metadata=target_metadata
        )

        with context.begin_transaction():
            context.run_migrations()

if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()