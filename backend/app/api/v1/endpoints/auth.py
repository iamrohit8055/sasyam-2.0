from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, EmailStr
from typing import Optional
from app.core.security import create_access_token, get_password_hash, verify_password

router = APIRouter()

class LoginRequest(BaseModel):
    phone: str
    password: str

class RegisterRequest(BaseModel):
    name: str
    phone: str
    email: Optional[EmailStr] = None
    password: str
    role: str = "FARMER"
    location: str = "Jaunpur, UP"

# Demo user storage for endpoint verification
MOCK_USERS = {
    "+91 98765 43210": {
        "id": "usr_farmer_01",
        "name": "Rajesh Kumar",
        "phone": "+91 98765 43210",
        "email": "rajesh@sasyam.in",
        "hashed_password": get_password_hash("password123"),
        "role": "FARMER",
        "location": "Jaunpur, UP",
        "is_verified": True,
    }
}

@router.post("/login")
def login(payload: LoginRequest):
    user = MOCK_USERS.get(payload.phone)
    if not user or not verify_password(payload.password, user["hashed_password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect phone number or password",
        )
    
    token = create_access_token(subject=user["id"], role=user["role"])
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": user["id"],
            "name": user["name"],
            "phone": user["phone"],
            "email": user["email"],
            "role": user["role"],
            "location": user["location"],
            "is_verified": user["is_verified"],
        }
    }

@router.post("/register")
def register(payload: RegisterRequest):
    if payload.phone in MOCK_USERS:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User with this phone number already exists",
        )
    
    user_id = f"usr_{payload.role.lower()}_{len(MOCK_USERS) + 1}"
    new_user = {
        "id": user_id,
        "name": payload.name,
        "phone": payload.phone,
        "email": payload.email,
        "hashed_password": get_password_hash(payload.password),
        "role": payload.role,
        "location": payload.location,
        "is_verified": True,
    }
    MOCK_USERS[payload.phone] = new_user

    token = create_access_token(subject=user_id, role=payload.role)
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": user_id,
            "name": payload.name,
            "phone": payload.phone,
            "email": payload.email,
            "role": payload.role,
            "location": payload.location,
            "is_verified": True,
        }
    }
