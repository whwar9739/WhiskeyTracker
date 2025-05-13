"""
User model for the WhiskeyTracker application.
"""

from sqlalchemy import Column, Integer, String, Boolean, Enum
from app.db.database import Base
import enum

class UserRole(str, enum.Enum):
    """User role enumeration"""
    STANDARD = "standard"
    ADMIN = "admin"

class User(Base):
    """User model"""
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    role = Column(String, default=UserRole.STANDARD, nullable=False)
    is_active = Column(Boolean, default=True)

    def __repr__(self):
        return f"User(id={self.id}, username={self.username}, email={self.email}, role={self.role})"