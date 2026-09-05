import type { Crop, GrowthStage, CropHealthStatus } from '../types';

let INITIAL_CROPS: Crop[] = [
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
  {
    id: 'crop_04',
    farmId: 'farm_02',
    farmName: 'Surya Organic Farm',
    name: 'Potato',
    variety: 'Kufri Jyoti',
    areaAcres: 3.0,
    plantingDate: '2026-05-20',
    expectedHarvestDate: '2026-08-25',
    growthStage: 'Harvested',
    healthStatus: 'OPTIMAL',
    expectedYieldKg: 4500,
    notes: 'Successfully harvested and stored in Cold Storage Unit B.',
  },
];

export const cropService = {
  getCrops(): Crop[] {
    const stored = localStorage.getItem('sasyam_crops');
    if (stored) {
      try { return JSON.parse(stored); } catch { return INITIAL_CROPS; }
    }
    localStorage.setItem('sasyam_crops', JSON.stringify(INITIAL_CROPS));
    return INITIAL_CROPS;
  },

  getCropById(id: string): Crop | undefined {
    const crops = this.getCrops();
    return crops.find((c) => c.id === id);
  },

  addCrop(data: Omit<Crop, 'id'>): Crop {
    const crops = this.getCrops();
    const newCrop: Crop = {
      ...data,
      id: `crop_${Date.now()}`,
    };
    const updated = [newCrop, ...crops];
    localStorage.setItem('sasyam_crops', JSON.stringify(updated));
    return newCrop;
  },

  updateCropStage(id: string, stage: GrowthStage, health: CropHealthStatus): Crop | undefined {
    const crops = this.getCrops();
    let updatedCrop: Crop | undefined;

    const updated = crops.map((c) => {
      if (c.id === id) {
        updatedCrop = { ...c, growthStage: stage, healthStatus: health };
        return updatedCrop;
      }
      return c;
    });

    localStorage.setItem('sasyam_crops', JSON.stringify(updated));
    return updatedCrop;
  },

  deleteCrop(id: string): void {
    const crops = this.getCrops();
    const updated = crops.filter((c) => c.id !== id);
    localStorage.setItem('sasyam_crops', JSON.stringify(updated));
  },
};
