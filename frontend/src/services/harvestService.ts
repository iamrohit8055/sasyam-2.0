import type { ProduceBatch, SpoilageRisk, ProduceStatus } from '../types';

export interface HarvestRecord {
  id: string;
  cropName: string;
  variety: string;
  farmName: string;
  fieldId: string;
  harvestDate: string;
  quantityKg: number;
  qualityGrade: 'Grade A' | 'Grade B' | 'Grade C';
  storageCondition: 'Open Air' | 'Covered Shed' | 'Cold Storage';
  storageLocation: string;
  notes?: string;
}

let INITIAL_HARVESTS: HarvestRecord[] = [
  {
    id: 'harv_01',
    cropName: 'Tomato',
    variety: 'Hybrid Abhilash',
    farmName: 'Green Valley Estate',
    fieldId: 'fld_01',
    harvestDate: '2026-09-04',
    quantityKg: 1500,
    qualityGrade: 'Grade A',
    storageCondition: 'Open Air',
    storageLocation: 'On-Farm Covered Shed',
    notes: 'Mature batch harvested early morning.',
  },
  {
    id: 'harv_02',
    cropName: 'Potato',
    variety: 'Kufri Jyoti',
    farmName: 'Surya Organic Farm',
    fieldId: 'fld_04',
    harvestDate: '2026-08-25',
    quantityKg: 900,
    qualityGrade: 'Grade A',
    storageCondition: 'Cold Storage',
    storageLocation: 'Jaunpur Cold Storage Unit B',
    notes: 'Stored at 4°C with controlled humidity.',
  },
];

let INITIAL_PRODUCE: ProduceBatch[] = [
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
    freshnessPercent: 78,
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
    freshnessPercent: 95,
    safeSellingWindowDays: 25,
    spoilageRisk: 'LOW',
    currentMarketPricePerKg: 22,
    recommendedAction: 'STORE',
  },
];

export const harvestService = {
  getHarvests(): HarvestRecord[] {
    const stored = localStorage.getItem('sasyam_harvests');
    if (stored) {
      try { return JSON.parse(stored); } catch { return INITIAL_HARVESTS; }
    }
    localStorage.setItem('sasyam_harvests', JSON.stringify(INITIAL_HARVESTS));
    return INITIAL_HARVESTS;
  },

  getProduce(): ProduceBatch[] {
    const stored = localStorage.getItem('sasyam_produce');
    if (stored) {
      try { return JSON.parse(stored); } catch { return INITIAL_PRODUCE; }
    }
    localStorage.setItem('sasyam_produce', JSON.stringify(INITIAL_PRODUCE));
    return INITIAL_PRODUCE;
  },

  recordHarvest(data: Omit<HarvestRecord, 'id'>): { harvest: HarvestRecord; produce: ProduceBatch } {
    const harvests = this.getHarvests();
    const produceList = this.getProduce();

    const newHarvest: HarvestRecord = {
      ...data,
      id: `harv_${Date.now()}`,
    };

    // Calculate freshness, safe selling window, and spoilage risk based on crop & storage condition
    let freshnessPercent = 95;
    let safeSellingWindowDays = 4;
    let spoilageRisk: SpoilageRisk = 'LOW';
    let recommendedAction: 'SELL_NOW' | 'STORE' | 'PROCESS' = 'SELL_NOW';

    if (data.cropName === 'Tomato') {
      safeSellingWindowDays = data.storageCondition === 'Cold Storage' ? 10 : 3;
      spoilageRisk = data.storageCondition === 'Cold Storage' ? 'LOW' : 'HIGH';
      recommendedAction = 'SELL_NOW';
      freshnessPercent = 85;
    } else if (data.cropName === 'Potato' || data.cropName === 'Onion') {
      safeSellingWindowDays = data.storageCondition === 'Cold Storage' ? 45 : 15;
      spoilageRisk = 'LOW';
      recommendedAction = 'STORE';
      freshnessPercent = 98;
    }

    const newProduce: ProduceBatch = {
      id: `prod_${Date.now()}`,
      farmerId: 'usr_farmer_01',
      cropName: data.cropName,
      variety: data.variety,
      quantityKg: data.quantityKg,
      harvestDate: data.harvestDate,
      qualityGrade: data.qualityGrade,
      storageLocation: data.storageLocation,
      storageCondition: data.storageCondition,
      status: 'HARVESTED',
      freshnessPercent,
      safeSellingWindowDays,
      spoilageRisk,
      currentMarketPricePerKg: data.cropName === 'Tomato' ? 27 : 22,
      recommendedAction,
    };

    localStorage.setItem('sasyam_harvests', JSON.stringify([newHarvest, ...harvests]));
    localStorage.setItem('sasyam_produce', JSON.stringify([newProduce, ...produceList]));

    return { harvest: newHarvest, produce: newProduce };
  },

  updateProduceStatus(id: string, status: ProduceStatus): ProduceBatch | undefined {
    const produceList = this.getProduce();
    let updatedItem: ProduceBatch | undefined;

    const updated = produceList.map((p) => {
      if (p.id === id) {
        updatedItem = { ...p, status };
        return updatedItem;
      }
      return p;
    });

    localStorage.setItem('sasyam_produce', JSON.stringify(updated));
    return updatedItem;
  },
};
