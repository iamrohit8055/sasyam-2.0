export interface BuyerProcurementOrder {
  id: string;
  listingId: string;
  farmerName: string;
  farmerLocation: string;
  cropName: string;
  variety: string;
  quantityKg: number;
  qualityGrade: string;
  totalPrice: number;
  status: 'DISPATCHED' | 'IN_TRANSIT' | 'DELIVERED' | 'COMPLETED';
  orderDate: string;
  trackingNumber: string;
  shipmentId: string;
}

export interface BuyerRFQ {
  id: string;
  cropName: string;
  requiredGrade: string;
  quantityQuintals: number;
  offeredPricePerKg: number;
  deliveryLocation: string;
  expiryDate: string;
  status: 'OPEN' | 'FULFILLED' | 'EXPIRED';
  bidsCount: number;
}

const INITIAL_BUYER_ORDERS: BuyerProcurementOrder[] = [
  {
    id: 'b-ord-01',
    listingId: 'list_01',
    farmerName: 'Rajesh Kumar',
    farmerLocation: 'Jaunpur, UP',
    cropName: 'Tomato',
    variety: 'Hybrid Abhilash',
    quantityKg: 1500,
    qualityGrade: 'Grade A',
    totalPrice: 39750,
    status: 'IN_TRANSIT',
    orderDate: '2026-09-04',
    trackingNumber: 'LOG-2026-8821',
    shipmentId: 'shp_01',
  },
  {
    id: 'b-ord-02',
    listingId: 'list_02',
    farmerName: 'Sunil Verma',
    farmerLocation: 'Varanasi, UP',
    cropName: 'Potato',
    variety: 'Kufri Jyoti',
    quantityKg: 2500,
    qualityGrade: 'Grade A',
    totalPrice: 55000,
    status: 'COMPLETED',
    orderDate: '2026-08-28',
    trackingNumber: 'LOG-2026-5510',
    shipmentId: 'shp_02',
  },
];

const INITIAL_RFQS: BuyerRFQ[] = [
  {
    id: 'rfq_01',
    cropName: 'Tomato',
    requiredGrade: 'Grade A',
    quantityQuintals: 50, // 5,000 kg
    offeredPricePerKg: 27.00,
    deliveryLocation: 'Varanasi Central Warehouse',
    expiryDate: '2026-09-10',
    status: 'OPEN',
    bidsCount: 4,
  },
  {
    id: 'rfq_02',
    cropName: 'Onion',
    requiredGrade: 'Grade B',
    quantityQuintals: 100, // 10,000 kg
    offeredPricePerKg: 24.00,
    deliveryLocation: 'Lucknow Wholesale Hub',
    expiryDate: '2026-09-15',
    status: 'OPEN',
    bidsCount: 7,
  },
];

class BuyerService {
  private readonly ORDERS_KEY = 'sasyam_buyer_orders';
  private readonly RFQ_KEY = 'sasyam_buyer_rfqs';

  public getProcurementOrders(): BuyerProcurementOrder[] {
    const saved = localStorage.getItem(this.ORDERS_KEY);
    if (!saved) {
      localStorage.setItem(this.ORDERS_KEY, JSON.stringify(INITIAL_BUYER_ORDERS));
      return INITIAL_BUYER_ORDERS;
    }
    return JSON.parse(saved);
  }

  public getRFQs(): BuyerRFQ[] {
    const saved = localStorage.getItem(this.RFQ_KEY);
    if (!saved) {
      localStorage.setItem(this.RFQ_KEY, JSON.stringify(INITIAL_RFQS));
      return INITIAL_RFQS;
    }
    return JSON.parse(saved);
  }

  public createRFQ(rfq: Omit<BuyerRFQ, 'id' | 'status' | 'bidsCount'>): BuyerRFQ {
    const rfqs = this.getRFQs();
    const newRFQ: BuyerRFQ = {
      ...rfq,
      id: 'rfq_' + Date.now(),
      status: 'OPEN',
      bidsCount: 0,
    };

    rfqs.unshift(newRFQ);
    localStorage.setItem(this.RFQ_KEY, JSON.stringify(rfqs));
    return newRFQ;
  }

  public getSummary() {
    const orders = this.getProcurementOrders();
    const activeOrders = orders.filter((o) => o.status !== 'COMPLETED');
    const totalSpent = orders.reduce((sum, o) => sum + o.totalPrice, 0);

    return {
      escrowBalance: 245000,
      activeOrdersCount: activeOrders.length,
      totalVolumeKg: 4000,
      totalSpent,
      verifiedFarmersCount: 18,
    };
  }
}

export const buyerService = new BuyerService();
