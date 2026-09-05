import type { Farm, Field } from '../types';

export interface SoilHealth {
  pH: number;
  nitrogenKgPerHa: number;
  phosphorusKgPerHa: number;
  potassiumKgPerHa: number;
  organicCarbonPercent: number;
  rating: 'EXCELLENT' | 'GOOD' | 'FAIR' | 'POOR';
}

export interface YieldHistoryItem {
  id: string;
  cropName: string;
  season: string;
  year: number;
  yieldAchievedKg: number;
  yieldPerAcreKg: number;
  marketPriceAchievedPerKg: number;
}

const DEMO_SOIL_HEALTH: Record<string, SoilHealth> = {
  farm_01: {
    pH: 6.8,
    nitrogenKgPerHa: 240,
    phosphorusKgPerHa: 32,
    potassiumKgPerHa: 280,
    organicCarbonPercent: 0.65,
    rating: 'GOOD',
  },
  farm_02: {
    pH: 7.2,
    nitrogenKgPerHa: 190,
    phosphorusKgPerHa: 25,
    potassiumKgPerHa: 210,
    organicCarbonPercent: 0.52,
    rating: 'FAIR',
  },
};

const DEMO_YIELD_HISTORY: Record<string, YieldHistoryItem[]> = {
  farm_01: [
    { id: 'yh_01', cropName: 'Wheat (PBW 343)', season: 'Rabi', year: 2025, yieldAchievedKg: 3400, yieldPerAcreKg: 1700, marketPriceAchievedPerKg: 23.5 },
    { id: 'yh_02', cropName: 'Paddy / Rice (Pusa 1121)', season: 'Kharif', year: 2025, yieldAchievedKg: 4200, yieldPerAcreKg: 2100, marketPriceAchievedPerKg: 31.0 },
    { id: 'yh_03', cropName: 'Tomato (Hybrid Abhilash)', season: 'Zaid', year: 2025, yieldAchievedKg: 1800, yieldPerAcreKg: 1200, marketPriceAchievedPerKg: 26.0 },
  ],
};

let INITIAL_FARMS: Farm[] = [
  {
    id: 'farm_01',
    farmerId: 'usr_farmer_01',
    name: 'Green Valley Estate',
    location: 'Jaunpur, Uttar Pradesh',
    latitude: 25.7464,
    longitude: 82.6837,
    totalAreaAcres: 4.5,
    soilType: 'Alluvial',
    irrigationType: 'Borewell + Drip Irrigation',
    activeCropsCount: 3,
    fields: [
      { id: 'fld_01', farmId: 'farm_01', name: 'North Field #1', areaAcres: 1.5, soilType: 'Alluvial', waterSource: 'Drip Irrigation' },
      { id: 'fld_02', farmId: 'farm_01', name: 'South Field #2', areaAcres: 2.0, soilType: 'Alluvial', waterSource: 'Borewell' },
      { id: 'fld_03', farmId: 'farm_01', name: 'East Field #3', areaAcres: 1.0, soilType: 'Sandy Loam', waterSource: 'Rainfed' },
    ],
  },
  {
    id: 'farm_02',
    farmerId: 'usr_farmer_01',
    name: 'Surya Organic Farm',
    location: 'Varanasi District, Uttar Pradesh',
    latitude: 25.3176,
    longitude: 82.9739,
    totalAreaAcres: 3.0,
    soilType: 'Black',
    irrigationType: 'Canal Water',
    activeCropsCount: 1,
    fields: [
      { id: 'fld_04', farmId: 'farm_02', name: 'Main Canal Field', areaAcres: 3.0, soilType: 'Black', waterSource: 'Canal' },
    ],
  },
];

export const farmService = {
  getFarms(): Farm[] {
    const stored = localStorage.getItem('sasyam_farms');
    if (stored) {
      try { return JSON.parse(stored); } catch { return INITIAL_FARMS; }
    }
    localStorage.setItem('sasyam_farms', JSON.stringify(INITIAL_FARMS));
    return INITIAL_FARMS;
  },

  getFarmById(id: string): Farm | undefined {
    const farms = this.getFarms();
    return farms.find((f) => f.id === id);
  },

  addFarm(data: Omit<Farm, 'id' | 'farmerId' | 'activeCropsCount' | 'fields'>): Farm {
    const farms = this.getFarms();
    const newFarm: Farm = {
      ...data,
      id: `farm_${Date.now()}`,
      farmerId: 'usr_farmer_01',
      activeCropsCount: 0,
      fields: [],
    };
    const updated = [...farms, newFarm];
    localStorage.setItem('sasyam_farms', JSON.stringify(updated));
    return newFarm;
  },

  addField(farmId: string, fieldData: Omit<Field, 'id' | 'farmId'>): Field {
    const farms = this.getFarms();
    const newField: Field = {
      ...fieldData,
      id: `fld_${Date.now()}`,
      farmId,
    };
    const updated = farms.map((f) => {
      if (f.id === farmId) {
        return { ...f, fields: [...f.fields, newField] };
      }
      return f;
    });
    localStorage.setItem('sasyam_farms', JSON.stringify(updated));
    return newField;
  },

  deleteFarm(id: string): void {
    const farms = this.getFarms();
    const updated = farms.filter((f) => f.id !== id);
    localStorage.setItem('sasyam_farms', JSON.stringify(updated));
  },

  getSoilHealth(farmId: string): SoilHealth {
    return DEMO_SOIL_HEALTH[farmId] || {
      pH: 6.9,
      nitrogenKgPerHa: 220,
      phosphorusKgPerHa: 28,
      potassiumKgPerHa: 250,
      organicCarbonPercent: 0.60,
      rating: 'GOOD',
    };
  },

  getYieldHistory(farmId: string): YieldHistoryItem[] {
    return DEMO_YIELD_HISTORY[farmId] || [
      { id: 'yh_df1', cropName: 'Paddy', season: 'Kharif', year: 2025, yieldAchievedKg: 2800, yieldPerAcreKg: 1400, marketPriceAchievedPerKg: 28.5 },
    ];
  },
};
