import type {
  Farm,
  Crop,
  ProduceBatch,
  MarketPrice,
  SellDecision,
  SASYAMNotification,
} from '../types';

export interface FarmerDashboardSummary {
  totalFarms: number;
  totalAcres: number;
  activeCropsCount: number;
  upcomingHarvestKg: number;
  upcomingHarvestCrop: string;
  upcomingHarvestDays: number;
  storedProduceKg: number;
  pendingOrdersCount: number;
  estimatedNetRevenue: number;
}

const MOCK_FARMS: Farm[] = [
  {
    id: 'farm_01',
    farmerId: 'usr_farmer_01',
    name: 'Green Valley Estate',
    location: 'Jaunpur, Uttar Pradesh',
    latitude: 25.7464,
    longitude: 82.6837,
    totalAreaAcres: 4.5,
    soilType: 'Alluvial',
    irrigationType: 'Borewell + Drip',
    activeCropsCount: 3,
    fields: [
      { id: 'fld_01', farmId: 'farm_01', name: 'North Field #1', areaAcres: 1.5, soilType: 'Alluvial', waterSource: 'Drip Irrigation' },
      { id: 'fld_02', farmId: 'farm_01', name: 'South Field #2', areaAcres: 2.0, soilType: 'Alluvial', waterSource: 'Borewell' },
      { id: 'fld_03', farmId: 'farm_01', name: 'East Field #3', areaAcres: 1.0, soilType: 'Sandy Loam', waterSource: 'Rainfed' },
    ],
  },
];

const MOCK_CROPS: Crop[] = [
  {
    id: 'crop_01',
    farmId: 'farm_01',
    farmName: 'Green Valley Estate',
    name: 'Tomato',
    variety: 'Hybrid Abhilash',
    areaAcres: 1.5,
    plantingDate: '2026-06-10',
    expectedHarvestDate: '2026-09-07',
    growthStage: 'Mature',
    healthStatus: 'OPTIMAL',
    expectedYieldKg: 1500,
    notes: 'Mature fruiting stage. 95% yield ready for picking.',
  },
  {
    id: 'crop_02',
    farmId: 'farm_01',
    farmName: 'Green Valley Estate',
    name: 'Wheat',
    variety: 'PBW 343',
    areaAcres: 2.0,
    plantingDate: '2026-07-01',
    expectedHarvestDate: '2026-10-20',
    growthStage: 'Vegetative',
    healthStatus: 'GOOD',
    expectedYieldKg: 3200,
    notes: 'Secondary tilling completed. Good canopy development.',
  },
  {
    id: 'crop_03',
    farmId: 'farm_01',
    farmName: 'Green Valley Estate',
    name: 'Mustard',
    variety: 'Pusa Bold',
    areaAcres: 1.0,
    plantingDate: '2026-07-15',
    expectedHarvestDate: '2026-11-05',
    growthStage: 'Flowering',
    healthStatus: 'NEEDS_ATTENTION',
    expectedYieldKg: 900,
    notes: 'Minor aphid activity noticed on leaf margins. Scanned with Disease AI.',
  },
];

const MOCK_PRODUCE: ProduceBatch[] = [
  {
    id: 'prod_01',
    farmerId: 'usr_farmer_01',
    cropName: 'Tomato',
    variety: 'Hybrid Abhilash',
    quantityKg: 1500,
    harvestDate: '2026-09-04',
    qualityGrade: 'Grade A',
    storageLocation: 'On-Farm Covered Shed',
    storageCondition: 'Open Air',
    status: 'HARVESTED',
    freshnessPercent: 88,
    safeSellingWindowDays: 2,
    spoilageRisk: 'HIGH',
    currentMarketPricePerKg: 27,
    recommendedAction: 'SELL_NOW',
  },
  {
    id: 'prod_02',
    farmerId: 'usr_farmer_01',
    cropName: 'Potato',
    variety: 'Kufri Jyoti',
    quantityKg: 900,
    harvestDate: '2026-08-25',
    qualityGrade: 'Grade A',
    storageLocation: 'Jaunpur Cold Storage Unit B',
    storageCondition: 'Cold Storage',
    status: 'AVAILABLE',
    freshnessPercent: 94,
    safeSellingWindowDays: 20,
    spoilageRisk: 'LOW',
    currentMarketPricePerKg: 22,
    recommendedAction: 'STORE',
  },
];

const MOCK_MARKETS: MarketPrice[] = [
  {
    id: 'mkt_01',
    marketName: 'Azadpur Mandi',
    location: 'Delhi NCR',
    distanceKm: 30,
    cropName: 'Tomato',
    pricePerKg: 27,
    priceTrendPercent: 8.2,
    transportCostPerKg: 3,
    estimatedNetPricePerKg: 24,
    demandLevel: 'HIGH',
    isRecommended: true,
  },
  {
    id: 'mkt_02',
    marketName: 'Jaunpur Local Mandi',
    location: 'Jaunpur, UP',
    distanceKm: 12,
    cropName: 'Tomato',
    pricePerKg: 24,
    priceTrendPercent: 0,
    transportCostPerKg: 2,
    estimatedNetPricePerKg: 22,
    demandLevel: 'MEDIUM',
    isRecommended: false,
  },
  {
    id: 'mkt_03',
    marketName: 'Varanasi Wholesale Market',
    location: 'Varanasi, UP',
    distanceKm: 45,
    cropName: 'Potato',
    pricePerKg: 24.5,
    priceTrendPercent: 1.5,
    transportCostPerKg: 2.5,
    estimatedNetPricePerKg: 22,
    demandLevel: 'MEDIUM',
    isRecommended: false,
  },
];

const MOCK_NOTIFICATIONS: SASYAMNotification[] = [
  {
    id: 'notif_01',
    title: 'Rainfall Alert',
    message: 'Heavy rainfall (28mm) predicted tomorrow in Jaunpur. Consider harvesting mature tomatoes today.',
    category: 'WEATHER',
    priority: 'URGENT',
    timestamp: '10m ago',
    isRead: false,
    actionUrl: '/farmer/harvests',
  },
  {
    id: 'notif_02',
    title: 'Azadpur Price Surge',
    message: 'Tomato prices up +8.2% at Azadpur Mandi. Market B net realization is ₹24/kg after transport.',
    category: 'MARKET',
    priority: 'INFO',
    timestamp: '1h ago',
    isRead: false,
    actionUrl: '/farmer/markets',
  },
  {
    id: 'notif_03',
    title: 'Spoilage Warning',
    message: 'Stored tomato batch has 2 days remaining safe selling window.',
    category: 'SPOILAGE',
    priority: 'WARNING',
    timestamp: '3h ago',
    isRead: true,
    actionUrl: '/farmer/produce',
  },
];

export const farmerService = {
  getSummary(): FarmerDashboardSummary {
    return {
      totalFarms: MOCK_FARMS.length,
      totalAcres: 4.5,
      activeCropsCount: MOCK_CROPS.length,
      upcomingHarvestKg: 1500,
      upcomingHarvestCrop: 'Tomato',
      upcomingHarvestDays: 2,
      storedProduceKg: 900,
      pendingOrdersCount: 1,
      estimatedNetRevenue: 44200,
    };
  },

  getFarms(): Farm[] {
    return MOCK_FARMS;
  },

  getCrops(): Crop[] {
    return MOCK_CROPS;
  },

  getProduce(): ProduceBatch[] {
    return MOCK_PRODUCE;
  },

  getMarketPrices(): MarketPrice[] {
    return MOCK_MARKETS;
  },

  getNotifications(): SASYAMNotification[] {
    return MOCK_NOTIFICATIONS;
  },

  getPrimaryDecision(): SellDecision {
    return {
      cropName: 'Tomato',
      quantityKg: 1500,
      currentPricePerKg: 24,
      expectedPriceInDaysPerKg: 28,
      storageCostPerKg: 1.2,
      spoilageProbabilityPercent: 18,
      transportCostPerKg: 3,
      recommendation: 'SELL_NOW',
      recommendationLabel: 'SELL AT MARKET B WITHIN 48 HOURS',
      estimatedCurrentValue: 36000,
      estimatedFutureValueAfterStorage: 34500,
      netAdvantageAmount: 3000,
      reasoning: [
        'Rainfall forecast tomorrow poses elevated waterlogging & spoilage risk',
        'Azadpur Market B price (₹27/kg) net of transport (₹3/kg) yields ₹24/kg net realization',
        'Storage cost + 18% spoilage probability offsets potential future price gain',
      ],
      suggestedDurationDays: 0,
    };
  },
};
