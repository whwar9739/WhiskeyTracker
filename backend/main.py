"""
Main FastAPI application instance.
"""

import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes.users import router as users_router
from app.api.routes.auth.token import router as token_router
from app.api.routes.auth.password_reset import router as password_reset_router

app = FastAPI(
    title="WhiskeyTracker API",
    description="API for tracking whiskey tasting experiences",
    version="0.1.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Update this with specific origins in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Root API endpoint
@app.get("/")
async def root():
    return {"message": "Welcome to the WhiskeyTracker API"}

# Include routers from different modules
app.include_router(users_router)
app.include_router(token_router)
app.include_router(password_reset_router)
# app.include_router(whiskies.router)
# ... other routers will be added as they are implemented

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)