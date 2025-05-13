"""
API routes configuration for Whiskies.
"""

from fastapi import APIRouter

# Create a router for whiskies
router = APIRouter(
    prefix="/api/whiskies",
    tags=["whiskies"],
    responses={404: {"description": "Not found"}},
)