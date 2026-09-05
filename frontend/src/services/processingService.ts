export interface ProcessingRequirement {
  id: string;
  processorName: string;
  facilityLocation: string;
  targetCrop: string;
  requiredGrade: 'Grade A' | 'Grade B' | 'Grade C' | 'ANY';
  endProduct: string;
  contractPricePerKg: number;
  minBatchQuantityKg: number;
  maxBatchQuantityKg: number;
  deliveryDeadline: string;
  paymentTerms: string;
  isHighDemand: boolean;
  contactPhone: string;
}

export interface ProcessingContract {
  id: string;
  requirementId: string;
  processorName: string;
  cropName: string;
  allocatedQuantityKg: number;
  contractPricePerKg: number;
  totalValue: number;
  allocatedDate: string;
  status: 'ACCEPTED' | 'IN_PROCESSING' | 'COMPLETED';
}

const INITIAL_REQUIREMENTS: ProcessingRequirement[] = [
  {
    id: 'proc_01',
    processorName: 'Varanasi Agri Agro Processing Ltd',
    facilityLocation: 'Karkhiyaon Agro Park, Varanasi, UP',
    targetCrop: 'Tomato',
    requiredGrade: 'Grade B',
    endProduct: 'Tomato Ketchup & Sauce Paste',
    contractPricePerKg: 22.50,
    minBatchQuantityKg: 500,
    maxBatchQuantityKg: 10000,
    deliveryDeadline: '2026-09-15',
    paymentTerms: 'Instant payout at gate check (T+0)',
    isHighDemand: true,
    contactPhone: '+91 94150 12345',
  },
  {
    id: 'proc_02',
    processorName: 'Purvanchal Snack Foods & Wafers',
    facilityLocation: 'Industrial Estate, Jaunpur, UP',
    targetCrop: 'Potato',
    requiredGrade: 'Grade B',
    endProduct: 'Potato Chips & Flakes',
    contractPricePerKg: 19.80,
    minBatchQuantityKg: 1000,
    maxBatchQuantityKg: 20000,
    deliveryDeadline: '2026-09-30',
    paymentTerms: '24-Hour Direct Bank Transfer (NEFT)',
    isHighDemand: true,
    contactPhone: '+91 94150 67890',
  },
  {
    id: 'proc_03',
    processorName: 'Ganga Dehydration & Powder Units',
    facilityLocation: 'Ghazipur Road, UP',
    targetCrop: 'Onion',
    requiredGrade: 'Grade C',
    endProduct: 'Dehydrated Onion Powder & Flakes',
    contractPricePerKg: 18.50,
    minBatchQuantityKg: 500,
    maxBatchQuantityKg: 15000,
    deliveryDeadline: '2026-10-05',
    paymentTerms: 'Instant Escrow Release',
    isHighDemand: false,
    contactPhone: '+91 94150 99887',
  },
];

const INITIAL_FARMER_CONTRACTS: ProcessingContract[] = [
  {
    id: 'pcontr_01',
    requirementId: 'proc_01',
    processorName: 'Varanasi Agri Agro Processing Ltd',
    cropName: 'Tomato',
    allocatedQuantityKg: 500,
    contractPricePerKg: 22.50,
    totalValue: 11250,
    allocatedDate: '2026-09-02',
    status: 'IN_PROCESSING',
  },
];

class ProcessingService {
  private readonly REQUIREMENTS_KEY = 'sasyam_processing_requirements';
  private readonly CONTRACTS_KEY = 'sasyam_processing_contracts';

  public getRequirements(): ProcessingRequirement[] {
    const saved = localStorage.getItem(this.REQUIREMENTS_KEY);
    if (!saved) {
      localStorage.setItem(this.REQUIREMENTS_KEY, JSON.stringify(INITIAL_REQUIREMENTS));
      return INITIAL_REQUIREMENTS;
    }
    return JSON.parse(saved);
  }

  public getFarmerContracts(): ProcessingContract[] {
    const saved = localStorage.getItem(this.CONTRACTS_KEY);
    if (!saved) {
      localStorage.setItem(this.CONTRACTS_KEY, JSON.stringify(INITIAL_FARMER_CONTRACTS));
      return INITIAL_FARMER_CONTRACTS;
    }
    return JSON.parse(saved);
  }

  public allocateProduce(requirementId: string, cropName: string, quantityKg: number): ProcessingContract {
    const reqs = this.getRequirements();
    const req = reqs.find((r) => r.id === requirementId);

    const contracts = this.getFarmerContracts();
    const contractPrice = req ? req.contractPricePerKg : 20.0;
    const newContract: ProcessingContract = {
      id: 'pcontr_' + Date.now(),
      requirementId,
      processorName: req ? req.processorName : 'Regional Processing Unit',
      cropName,
      allocatedQuantityKg: quantityKg,
      contractPricePerKg: contractPrice,
      totalValue: quantityKg * contractPrice,
      allocatedDate: new Date().toISOString().split('T')[0],
      status: 'ACCEPTED',
    };

    contracts.unshift(newContract);
    localStorage.setItem(this.CONTRACTS_KEY, JSON.stringify(contracts));
    return newContract;
  }
}

export const processingService = new ProcessingService();
