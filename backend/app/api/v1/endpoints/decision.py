from fastapi import APIRouter
from pydantic import BaseModel
from typing import List, Optional

router = APIRouter()

class SellVsStoreRequest(BaseModel):
    crop_name: str  # Tomato, Potato, Onion
    quantity_kg: float = 1500.0
    current_freshness_percent: float = 88.0
    storage_condition: str = "Open Air"  # Open Air, Cold Storage
    quality_grade: str = "Grade A"
    simulated_days: int = 14

class KeyDriverItem(BaseModel):
    title: str
    description: str
    impact: str  # POSITIVE, NEGATIVE, NEUTRAL

class DecisionResponse(BaseModel):
    crop_name: str
    quantity_kg: float
    recommendation: str  # SELL_NOW, STORE, PROCESS
    recommendation_title: str
    recommendation_reasoning: str
    confidence_score: float
    best_immediate_mandi: str
    immediate_net_revenue: float
    projected_future_price_per_kg: float
    stored_net_revenue: float
    net_profit_delta: float
    key_drivers: List[KeyDriverItem]

@router.post("/sell-vs-store", response_model=DecisionResponse)
def evaluate_sell_vs_store(payload: SellVsStoreRequest):
    crop = payload.crop_name
    qty = payload.quantity_kg
    days = payload.simulated_days

    current_price = 25.0 if crop == "Tomato" else 20.0
    current_net = current_price - 2.5
    immediate_net = qty * current_net

    future_surge = 0.15 if crop == "Tomato" else 0.22
    projected_future_price = current_price * (1 + future_surge)

    storage_cost = 0.08 * days + 0.40  # ₹/kg
    usable_qty = qty * 0.955 if payload.storage_condition == "Cold Storage" else qty * 0.85

    stored_net = (usable_qty * projected_future_price) - (qty * storage_cost)
    net_delta = stored_net - immediate_net

    recommendation = "STORE"
    title = f"STORE FOR {days} DAYS IN COLD STORAGE"
    reasoning = f"High price surge of +{(future_surge * 100):.0f}% expected in Azadpur & Varanasi Mandis over next {days} days."
    confidence = 89.0

    if payload.storage_condition == "Open Air" and crop == "Tomato":
      recommendation = "SELL_NOW"
      title = "SELL IMMEDIATELY WITHIN 48 HOURS"
      reasoning = "Perishable spoilage decay in open-air will exceed price gain within 48 hours."
      confidence = 94.0

    return DecisionResponse(
        crop_name=crop,
        quantity_kg=qty,
        recommendation=recommendation,
        recommendation_title=title,
        recommendation_reasoning=reasoning,
        confidence_score=confidence,
        best_immediate_mandi="Azadpur Mandi (Delhi)",
        immediate_net_revenue=immediate_net,
        projected_future_price_per_kg=projected_future_price,
        stored_net_revenue=stored_net,
        net_profit_delta=net_delta,
        key_drivers=[
            KeyDriverItem(
                title="Projected Mandi Surge",
                description=f"Market price expected to increase to ₹{projected_future_price:.2f}/kg over next {days} days.",
                impact="POSITIVE",
            ),
            KeyDriverItem(
                title="Cold Storage Holding Cost",
                description=f"Storage & handling fees estimated at ₹{storage_cost:.2f}/kg for {days} days.",
                impact="NEGATIVE",
            ),
        ],
    )
