export interface Warehouse {
  id: string;
  name: string;
  location: string;
  type: 'COLD_STORAGE' | 'DRY_WAREHOUSE' | 'SILO';
  totalCapacityQuintals: number;
  availableCapacityQuintals: number;
  ratePerQuintalPerMonth: number;
  isWdraAccredited: boolean;
  temperatureRange: string;
  humidityRange: string;
  rating: number;
  distanceKm: number;
  contactPhone: string;
}

export interface StorageReceipt {
  id: string;
  receiptNumber: string;
  warehouseId: string;
  warehouseName: string;
  cropName: string;
  variety: string;
  quantityQuintals: number;
  storedDate: string;
  expectedExpiryDate: string;
  monthlyFee: number;
  cumulativeFee: number;
  status: 'ACTIVE' | 'RELEASED' | 'TRANSFERRED';
  spoilageRisk: 'LOW' | 'MEDIUM' | 'HIGH';
  currentTemperature?: string;
}

const INITIAL_WAREHOUSES: Warehouse[] = [
  {
    id: 'wh_01',
    name: 'Jaunpur Central Cold Storage',
    location: 'Siddhiqpur, Jaunpur, UP',
    type: 'COLD_STORAGE',
    totalCapacityQuintals: 50000,
    availableCapacityQuintals: 12400,
    ratePerQuintalPerMonth: 120, // ₹120 per quintal per month (~₹1.20/kg)
    isWdraAccredited: true,
    temperatureRange: '2°C - 5°C',
    humidityRange: '85% - 90%',
    rating: 4.8,
    distanceKm: 12,
    contactPhone: '+91 98765 43210',
  },
  {
    id: 'wh_02',
    name: 'Varanasi Logistics & Agri Park',
    location: 'Phoolpur, Varanasi, UP',
    type: 'COLD_STORAGE',
    totalCapacityQuintals: 80000,
    availableCapacityQuintals: 24500,
    ratePerQuintalPerMonth: 140,
    isWdraAccredited: true,
    temperatureRange: '0°C - 4°C',
    humidityRange: '90% - 95%',
    rating: 4.9,
    distanceKm: 38,
    contactPhone: '+91 98765 88990',
  },
  {
    id: 'wh_03',
    name: 'Purvanchal Grain Silos & Storage',
    location: 'Badlapur, Jaunpur, UP',
    type: 'DRY_WAREHOUSE',
    totalCapacityQuintals: 35000,
    availableCapacityQuintals: 8900,
    ratePerQuintalPerMonth: 60,
    isWdraAccredited: true,
    temperatureRange: 'Ambient (Controlled)',
    humidityRange: '<65%',
    rating: 4.6,
    distanceKm: 24,
    contactPhone: '+91 98765 11223',
  },
];

const INITIAL_RECEIPTS: StorageReceipt[] = [
  {
    id: 'rcpt_01',
    receiptNumber: 'NWR-2026-9982',
    warehouseId: 'wh_01',
    warehouseName: 'Jaunpur Central Cold Storage',
    cropName: 'Potato',
    variety: 'Kufri Jyoti',
    quantityQuintals: 90, // 9,000 kg
    storedDate: '2026-08-25',
    expectedExpiryDate: '2026-11-25',
    monthlyFee: 10800,
    cumulativeFee: 4320,
    status: 'ACTIVE',
    spoilageRisk: 'LOW',
    currentTemperature: '3.8°C',
  },
];

class StorageService {
  private readonly WAREHOUSE_KEY = 'sasyam_warehouses';
  private readonly RECEIPT_KEY = 'sasyam_storage_receipts';

  public getWarehouses(): Warehouse[] {
    const saved = localStorage.getItem(this.WAREHOUSE_KEY);
    if (!saved) {
      localStorage.setItem(this.WAREHOUSE_KEY, JSON.stringify(INITIAL_WAREHOUSES));
      return INITIAL_WAREHOUSES;
    }
    return JSON.parse(saved);
  }

  public getStorageReceipts(): StorageReceipt[] {
    const saved = localStorage.getItem(this.RECEIPT_KEY);
    if (!saved) {
      localStorage.setItem(this.RECEIPT_KEY, JSON.stringify(INITIAL_RECEIPTS));
      return INITIAL_RECEIPTS;
    }
    return JSON.parse(saved);
  }

  public bookStorage(receipt: Omit<StorageReceipt, 'id' | 'receiptNumber' | 'cumulativeFee' | 'status'>): StorageReceipt {
    const receipts = this.getStorageReceipts();
    const newReceipt: StorageReceipt = {
      ...receipt,
      id: 'rcpt_' + Date.now(),
      receiptNumber: `NWR-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      cumulativeFee: receipt.monthlyFee * 0.25, // initial deposit
      status: 'ACTIVE',
    };

    receipts.unshift(newReceipt);
    localStorage.setItem(this.RECEIPT_KEY, JSON.stringify(receipts));
    return newReceipt;
  }
}

export const storageService = new StorageService();
