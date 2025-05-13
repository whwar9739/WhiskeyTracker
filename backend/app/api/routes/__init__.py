"""
Auth routes module for the API.
"""

from fastapi import APIRouter
from app.api.routes.auth import token

router = APIRouter()

# Include token endpoints
router.include_router(token.router, prefix="/auth", tags=["auth"])