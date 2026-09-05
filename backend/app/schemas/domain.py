from pydantic import BaseModel, EmailStr
from typing import List, Optional
from datetime import datetime

# User Schemas
class UserBase(BaseModel):
    name: str
    phone: str
    email: Optional[EmailStr] = None
    role: str
    location: str
    avatar_url: Optional[str] = None

class UserCreate(UserBase):
    password: str

class UserResponse(UserBase):
    id: str
    is_verified: bool
    created_at: datetime

    class Config:
        from_attributes = True

# Token Schema
class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse

# Farm Schemas
class FieldBase(BaseModel):
    name: str
    area_acres: float
    soil_type: str
    water_source: str

class FieldCreate(FieldBase):
    pass

class FieldResponse(FieldBase):
    id: str
    farm_id: str

    class Config:
        from_attributes = True

class FarmBase(BaseModel):
    name: str
    location: str
    latitude: float
    longitude: float
    total_area_acres: float
    soil_type: str
    irrigation_type: str

class FarmCreate(FarmBase):
    fields: List[FieldCreate] = []

class FarmResponse(FarmBase):
    id: str
    farmer_id: str
    fields: List[FieldResponse] = []
    created_at: datetime

    class Config:
        from_attributes = True

# Crop Schemas
class CropBase(BaseModel):
    farm_id: str
    name: str
    variety: str
    area_acres: float
    planting_date: datetime
    expected_harvest_date: datetime
    growth_stage: str = "Sowing"
    health_status: str = "OPTIMAL"
    expected_yield_kg: float
    notes: Optional[str] = None

class CropCreate(CropBase):
    pass

class CropResponse(CropBase):
    id: str
    created_at: datetime

    class Config:
        from_attributes = True
