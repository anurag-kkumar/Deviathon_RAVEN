from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os

from app.api.endpoints import influencers

app = FastAPI(
    title="Raven Influencer Platform",
    description="AI-powered influencer outreach and management platform",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(influencers.router, prefix="/api/influencers", tags=["influencers"])

@app.get("/")
async def root():
    return {"message": "Welcome to Raven Influencer Platform API"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "Raven API"}