"""
Whiskey models for the WhiskeyTracker application.
"""

from sqlalchemy import Column, Integer, String, Float, ForeignKey, Table, Text, Date
from sqlalchemy.orm import relationship
from app.db.database import Base
import enum
from sqlalchemy import Enum as SQLEnum
from datetime import datetime

# Association table for many-to-many relationship between whiskeys and flavors
whiskey_flavor = Table(
    "whiskey_flavor",
    Base.metadata,
    Column("whiskey_id", Integer, ForeignKey("whiskeys.id"), primary_key=True),
    Column("flavor_id", Integer, ForeignKey("flavors.id"), primary_key=True)
)

class WhiskeyType(str, enum.Enum):
    """Whiskey type enumeration"""
    BOURBON = "bourbon"
    SCOTCH = "scotch"
    RYE = "rye"
    IRISH = "irish"
    JAPANESE = "japanese"
    CANADIAN = "canadian"
    OTHER = "other"

class Whiskey(Base):
    """Whiskey model"""
    __tablename__ = "whiskeys"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, nullable=False)
    distillery = Column(String, index=True, nullable=False)
    type = Column(SQLEnum(WhiskeyType), index=True, nullable=False)
    age = Column(Integer, nullable=True)  # Age in years, null if not specified
    region = Column(String, nullable=True)
    price = Column(Float, nullable=True)
    abv = Column(Float, nullable=False)  # Alcohol by volume percentage
    description = Column(Text, nullable=True)
    image_url = Column(String, nullable=True)
    
    # Relationships
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    user = relationship("User", backref="whiskeys")
    ratings = relationship("Rating", back_populates="whiskey", cascade="all, delete-orphan")
    flavors = relationship("Flavor", secondary=whiskey_flavor, back_populates="whiskeys")
    notes = relationship("TastingNote", back_populates="whiskey", cascade="all, delete-orphan")

    def __repr__(self):
        return f"Whiskey(id={self.id}, name={self.name}, distillery={self.distillery}, type={self.type})"

class Flavor(Base):
    """Flavor profile model"""
    __tablename__ = "flavors"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True, nullable=False)
    category = Column(String, index=True, nullable=True)  # e.g., "fruity", "spicy", "woody"
    
    # Relationships
    whiskeys = relationship("Whiskey", secondary=whiskey_flavor, back_populates="flavors")

    def __repr__(self):
        return f"Flavor(id={self.id}, name={self.name}, category={self.category})"

class Rating(Base):
    """User rating model for whiskeys"""
    __tablename__ = "ratings"

    id = Column(Integer, primary_key=True, index=True)
    score = Column(Float, nullable=False)  # Rating score (e.g., 1-100)
    review = Column(Text, nullable=True)
    date_added = Column(Date, default=datetime.now().date)
    
    # Relationships
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    whiskey_id = Column(Integer, ForeignKey("whiskeys.id"), nullable=False)
    user = relationship("User", backref="ratings")
    whiskey = relationship("Whiskey", back_populates="ratings")

    def __repr__(self):
        return f"Rating(id={self.id}, user_id={self.user_id}, whiskey_id={self.whiskey_id}, score={self.score})"

class TastingNote(Base):
    """Tasting notes for whiskeys"""
    __tablename__ = "tasting_notes"

    id = Column(Integer, primary_key=True, index=True)
    notes = Column(Text, nullable=False)
    date_added = Column(Date, default=datetime.now().date)
    
    # Relationships
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    whiskey_id = Column(Integer, ForeignKey("whiskeys.id"), nullable=False)
    user = relationship("User", backref="tasting_notes")
    whiskey = relationship("Whiskey", back_populates="notes")

    def __repr__(self):
        return f"TastingNote(id={self.id}, user_id={self.user_id}, whiskey_id={self.whiskey_id})"