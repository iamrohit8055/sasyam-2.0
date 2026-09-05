import { processingService } from './processingService';
import type { ProcessingRequirement, ProcessingContract } from './processingService';

export interface ProcessorFacilitySummary {
  facilityName: string;
  location: string;
  activeContractsCount: number;
  totalContractedVolumeKg: number;
  rawMaterialInventoryKg: number;
  totalPayoutsReleased: number;
  yieldEfficiencyPercent: number;
}

class ProcessorDashboardService {
  public getSummary(): ProcessorFacilitySummary {
    const contracts = processingService.getFarmerContracts();
    const totalVolume = contracts.reduce((sum, c) => sum + c.allocatedQuantityKg, 0);
    const totalValue = contracts.reduce((sum, c) => sum + c.totalValue, 0);

    return {
      facilityName: 'Varanasi Agri Agro Processing Cluster',
      location: 'Karkhiyaon Agro Park, Varanasi, UP',
      activeContractsCount: contracts.length || 2,
      totalContractedVolumeKg: totalVolume + 15000,
      rawMaterialInventoryKg: 12400,
      totalPayoutsReleased: totalValue + 240000,
      yieldEfficiencyPercent: 94.2,
    };
  }

  public getRequirements(): ProcessingRequirement[] {
    return processingService.getRequirements();
  }

  public getContracts(): ProcessingContract[] {
    return processingService.getFarmerContracts();
  }
}

export const processorDashboardService = new ProcessorDashboardService();
