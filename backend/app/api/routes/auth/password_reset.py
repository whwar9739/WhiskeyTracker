"""
Password reset routes for the authentication system.
"""

import secrets
import string
from datetime import timedelta, datetime
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.models.user import User
from app.schemas.users import UserPasswordReset, PasswordReset
from app.utils.auth import get_password_hash

router = APIRouter(
    prefix="/api/users",
    tags=["password-reset"],
    responses={404: {"description": "Not found"}},
)

# In a production app, you'd store these tokens in the database
# For this MVP, we'll use an in-memory dictionary
# This is not suitable for a production environment with multiple workers
reset_tokens = {}

def generate_reset_token():
    """Generate a secure random token for password reset."""
    alphabet = string.ascii_letters + string.digits
    return ''.join(secrets.choice(alphabet) for _ in range(32))

@router.post("/request-password-reset", status_code=status.HTTP_202_ACCEPTED)
async def request_password_reset(
    reset_request: UserPasswordReset,
    db: Session = Depends(get_db)
):
    """
    Request a password reset by providing an email address.
    
    Args:
        reset_request: Email address for password reset
        db: Database session
        
    Returns:
        dict: Success message
        
    Note:
        In a production environment, this would send an email with the reset token.
        For this MVP, we'll just store the token and return a success message.
    """
    # Find user by email
    user = db.query(User).filter(User.email == reset_request.email).first()
    
    # Even if the user doesn't exist, return success to prevent email enumeration
    if not user:
        return {"message": "If a user with that email exists, a password reset link has been sent."}
    
    # Generate a reset token
    token = generate_reset_token()
    
    # Store the token with the user ID and expiration time (24 hours)
    reset_tokens[token] = {
        "user_id": user.id,
        "expires": datetime.utcnow() + timedelta(hours=24)
    }
    
    # In a real app, you would send an email with the reset link
    # For this MVP, we'll just return a success message
    return {"message": "If a user with that email exists, a password reset link has been sent."}

@router.post("/reset-password", status_code=status.HTTP_200_OK)
async def reset_password(
    reset_data: PasswordReset,
    db: Session = Depends(get_db)
):
    """
    Reset a user's password using a valid reset token.
    
    Args:
        reset_data: Token and new password
        db: Database session
        
    Returns:
        dict: Success message
        
    Raises:
        HTTPException: If token is invalid or expired
    """
    # Check if token exists
    if reset_data.token not in reset_tokens:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid or expired token"
        )
    
    # Get token data
    token_data = reset_tokens[reset_data.token]
    
    # Check if token is expired
    if datetime.utcnow() > token_data["expires"]:
        # Remove expired token
        del reset_tokens[reset_data.token]
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Token has expired"
        )
    
    # Get user
    user = db.query(User).filter(User.id == token_data["user_id"]).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    # Update password
    user.hashed_password = get_password_hash(reset_data.new_password)
    db.commit()
    
    # Remove used token
    del reset_tokens[reset_data.token]
    
    return {"message": "Password has been reset successfully"}