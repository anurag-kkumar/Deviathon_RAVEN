from fastapi import APIRouter, HTTPException
from app.database.mongodb import get_database

# Yeh line important hai - router define karein
router = APIRouter()

@router.get("/")
async def get_influencers():
    try:
        db = get_database()
        # Test ke liye dummy data return karein
        return {
            "message": "Influencers API working!",
            "influencers": [
                {"id": 1, "name": "Test Influencer", "platform": "Instagram"},
                {"id": 2, "name": "Demo Creator", "platform": "YouTube"}
            ]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/discover")
async def discover_influencers(filters: dict):
    return {
        "message": "Influencer discovery feature", 
        "filters": filters,
        "influencers": []
    }