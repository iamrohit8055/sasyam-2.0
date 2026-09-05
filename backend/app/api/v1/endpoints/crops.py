from fastapi import APIRouter
from pydantic import BaseModel
from typing import List, Optional

router = APIRouter()

class CropRecommendRequest(BaseModel):
    soil_type: str  # Alluvial, Black, Red, Sandy Loam
    nitrogen_kg_ha: Optional[float] = 240.0
    phosphorus_kg_ha: Optional[float] = 45.0
    potassium_kg_ha: Optional[float] = 180.0
    soil_ph: Optional[float] = 6.8
    water_source: str  # Borewell, Canal, Rainfed
    area_acres: float = 2.5
    budget_inr: float = 50000.0

class CropRecommendationItem(BaseModel):
    crop_name: str
    suitability_score: float
    growing_duration_days: int
    water_requirement: str
    expected_yield_per_acre_kg: float
    expected_market_price_per_kg: float
    estimated_gross_revenue_inr: float
    risk_level: str
    reasoning: List[str]

class DiseaseScanRequest(BaseModel):
    image_url: str
    crop_name: str = "Tomato"

class DiseaseScanResponse(BaseModel):
    scan_id: str
    crop_name: str
    detected_disease: str
    confidence_score: float
    risk_level: str
    description: str
    recommended_actions: List[str]
    preventive_measures: List[str]

@router.post("/recommend", response_model=List[CropRecommendationItem])
def recommend_crops(payload: CropRecommendRequest):
    recommendations = [
        CropRecommendationItem(
            crop_name="Tomato (Hybrid Abhilash)",
            suitability_score=94.5,
            growing_duration_days=110,
            water_requirement="Medium",
            expected_yield_per_acre_kg=12000.0,
            expected_market_price_per_kg=24.50,
            estimated_gross_revenue_inr=735000.0,
            risk_level="Low",
            reasoning=[
                f"Optimal soil pH of {payload.soil_ph} matches tomato growth range (6.0 - 7.0).",
                f"Alluvial soil in Jaunpur region provides excellent drainage with {payload.water_source} irrigation.",
                "High regional mandi demand in Azadpur & Varanasi with +14% seasonal price surge.",
            ],
        ),
        CropRecommendationItem(
            crop_name="Potato (Kufri Jyoti)",
            suitability_score=88.0,
            growing_duration_days=90,
            water_requirement="Medium",
            expected_yield_per_acre_kg=9500.0,
            expected_market_price_per_kg=20.50,
            estimated_gross_revenue_inr=486875.0,
            risk_level="Low",
            reasoning=[
                "Cool winter temperature in UP ideal for tuberization.",
                "Excellent cold storage capacity available in Jaunpur (WDRA accredited).",
            ],
        ),
        CropRecommendationItem(
            crop_name="Onion (Nashik Red)",
            suitability_score=82.0,
            growing_duration_days=120,
            water_requirement="Low",
            expected_yield_per_acre_kg=8000.0,
            expected_market_price_per_kg=22.00,
            estimated_gross_revenue_inr=440000.0,
            risk_level="Medium",
            reasoning=[
                "High storage shelf-life in covered shed.",
                "Stable market demand across regional wholesale mandis.",
            ],
        ),
    ]
    return recommendations

@router.post("/disease-detect", response_model=DiseaseScanResponse)
def detect_crop_disease(payload: DiseaseScanRequest):
    return DiseaseScanResponse(
        scan_id="scan_" + payload.crop_name.lower() + "_9921",
        crop_name=payload.crop_name,
        detected_disease="Early Blight (Alternaria solani)",
        confidence_score=94.8,
        risk_level="HIGH",
        description="Fungal pathogen causing dark brown concentric rings on lower leaves, leading to defoliation if untreated.",
        recommended_actions=[
            "Foliar spray of Mancozeb (75% WP) at 2g/liter of water.",
            "Apply Copper Oxychloride 50% WP if lesion progression exceeds 15% leaf area.",
            "Avoid overhead irrigation during evening hours.",
        ],
        preventive_measures=[
            "Practice 2-year crop rotation with non-solanaceous crops.",
            "Ensure field aeration and soil moisture balance.",
        ],
    )
