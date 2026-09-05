// User Roles
export type UserRole = 'FARMER' | 'BUYER' | 'TRANSPORTER' | 'PROCESSOR' | 'ADMIN';

export interface User {
  id: string;
  name: string;
  phone: string;
  email?: string;
  role: UserRole;
  location: string;
  avatarUrl?: string;
  isVerified: boolean;
}

// Farm & Field Data
export interface Field {
  id: string;
  farmId: string;
  name: string;
  areaAcres: number;
  soilType: 'Alluvial' | 'Black' | 'Red' | 'Laterite' | 'Sandy Loam' | 'Clay';
  waterSource: 'Borewell' | 'Canal' | 'Rainfed' | 'Drip Irrigation';
}

export interface Farm {
  id: string;
  farmerId: string;
  name: string;
  location: string;
  latitude: number;
  longitude: number;
  totalAreaAcres: number;
  soilType: string;
  irrigationType: string;
  fields: Field[];
  activeCropsCount: number;
}

// Crop Data
export type CropHealthStatus = 'OPTIMAL' | 'GOOD' | 'NEEDS_ATTENTION' | 'HIGH_RISK';
export type GrowthStage = 'Sowing' | 'Vegetative' | 'Flowering' | 'Fruiting' | 'Mature' | 'Harvested';

export interface Crop {
  id: string;
  farmId: string;
  farmName: string;
  name: string;
  variety: string;
  areaAcres: number;
  plantingDate: string;
  expectedHarvestDate: string;
  growthStage: GrowthStage;
  healthStatus: CropHealthStatus;
  expectedYieldKg: number;
  notes?: string;
}

// AI Crop Recommendation
export interface CropRecommendation {
  cropName: string;
  suitabilityScore: number; // e.g. 91
  growingDurationDays: number;
  waterRequirement: 'Low' | 'Medium' | 'High';
  expectedYieldPerAcreKg: number;
  expectedMarketPricePerKg: number;
  riskLevel: 'Low' | 'Medium' | 'High';
  reasoning: string[];
}

// Disease Detection
export interface DiseaseScanResult {
  id: string;
  cropName: string;
  imageUrl: string;
  scannedAt: string;
  detectedDisease: string;
  confidenceScore: number; // e.g. 94%
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  description: string;
  recommendedActions: string[];
  preventiveMeasures: string[];
}

// Harvest & Produce Inventory
export type ProduceStatus = 'HARVESTED' | 'AVAILABLE' | 'RESERVED' | 'SOLD' | 'IN_TRANSIT' | 'DELIVERED' | 'PROCESSED' | 'SPOILED';
export type SpoilageRisk = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface ProduceBatch {
  id: string;
  farmerId: string;
  cropName: string;
  variety: string;
  quantityKg: number;
  harvestDate: string;
  qualityGrade: 'Grade A' | 'Grade B' | 'Grade C';
  storageLocation: string;
  storageCondition: 'Open Air' | 'Covered Shed' | 'Cold Storage';
  status: ProduceStatus;
  freshnessPercent: number;
  safeSellingWindowDays: number;
  spoilageRisk: SpoilageRisk;
  currentMarketPricePerKg: number;
  recommendedAction: 'SELL_NOW' | 'STORE' | 'PROCESS';
}

// Market & Net Realization
export interface MarketPrice {
  id: string;
  marketName: string;
  location: string;
  distanceKm: number;
  cropName: string;
  pricePerKg: number;
  priceTrendPercent: number; // positive or negative
  transportCostPerKg: number;
  estimatedNetPricePerKg: number;
  demandLevel: 'HIGH' | 'MEDIUM' | 'LOW';
  isRecommended: boolean;
}

export interface SellDecision {
  cropName: string;
  quantityKg: number;
  currentPricePerKg: number;
  expectedPriceInDaysPerKg: number;
  storageCostPerKg: number;
  spoilageProbabilityPercent: number;
  transportCostPerKg: number;
  recommendation: 'SELL_NOW' | 'STORE' | 'PROCESS';
  recommendationLabel: string;
  estimatedCurrentValue: number;
  estimatedFutureValueAfterStorage: number;
  netAdvantageAmount: number;
  reasoning: string[];
  suggestedDurationDays?: number;
}

// Marketplace & Orders
export interface ProduceListing {
  id: string;
  farmerId: string;
  farmerName: string;
  farmerLocation: string;
  farmerRating: number;
  cropName: string;
  variety: string;
  quantityKg: number;
  qualityGrade: string;
  pricePerKg: number;
  harvestDate: string;
  availableUntil: string;
  status: 'ACTIVE' | 'PENDING_OFFER' | 'SOLD';
  imageUrl?: string;
}

// Transportation & Logistics
export type TransportStatus = 'REQUESTED' | 'ACCEPTED' | 'DRIVER_ASSIGNED' | 'EN_ROUTE_TO_PICKUP' | 'ARRIVED_AT_PICKUP' | 'PICKED_UP' | 'IN_TRANSIT' | 'ARRIVED_AT_DESTINATION' | 'DELIVERED' | 'CANCELLED';

export interface TransportVehicle {
  id: string;
  transporterName: string;
  vehicleType: string;
  registrationNumber: string;
  capacityKg: number;
  pricePerTrip: number;
  pricePerKm: number;
  etaHours: number;
  rating: number;
  isBestValue?: boolean;
}

export interface TransportBooking {
  id: string;
  farmerName: string;
  pickupLocation: string;
  destinationLocation: string;
  cropName: string;
  quantityKg: number;
  transporterName: string;
  vehicleNumber: string;
  driverPhone: string;
  status: TransportStatus;
  currentLatitude: number;
  currentLongitude: number;
  etaMinutes: number;
  distanceRemainingKm: number;
  bookingDate: string;
}

// Global Notification
export type NotificationPriority = 'INFO' | 'WARNING' | 'URGENT' | 'SUCCESS';
export type NotificationCategory = 'WEATHER' | 'MARKET' | 'CROP_HEALTH' | 'HARVEST' | 'SPOILAGE' | 'TRANSPORT' | 'ORDER';

export interface SASYAMNotification {
  id: string;
  title: string;
  message: string;
  category: NotificationCategory;
  priority: NotificationPriority;
  timestamp: string;
  isRead: boolean;
  actionUrl?: string;
}
