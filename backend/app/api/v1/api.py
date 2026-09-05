from fastapi import APIRouter
from app.api.v1.endpoints import auth, crops, decision

api_router = APIRouter()

api_router.include_router(auth.router, prefix="/auth", tags=["Authentication"])
api_router.include_router(crops.router, prefix="/crops", tags=["Crop AI Intelligence"])
api_router.include_router(decision.router, prefix="/decision", tags=["AI Decision Engine"])
