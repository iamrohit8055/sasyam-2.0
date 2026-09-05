export interface MarketplaceListing {
  id: string;
  produceBatchId?: string;
  farmerId: string;
  farmerName: string;
  farmerLocation: string;
  farmerRating: number;
  cropName: string;
  variety: string;
  quantityKg: number;
  qualityGrade: 'Grade A' | 'Grade B' | 'Grade C';
  freshnessPercent: number;
  askingPricePerKg: number;
  mandiBenchmarkPricePerKg: number;
  harvestDate: string;
  storageLocation: string;
  isOrganic: boolean;
  status: 'ACTIVE' | 'RESERVED' | 'SOLD';
  createdAt: string;
}

export interface BuyerOrder {
  id: string;
  listingId: string;
  buyerId: string;
  buyerName: string;
  buyerCompany: string;
  quantityKg: number;
  totalPrice: number;
  orderDate: string;
  status: 'PENDING_LOGISTICS' | 'IN_TRANSIT' | 'DELIVERED';
}

const INITIAL_LISTINGS: MarketplaceListing[] = [
  {
    id: 'list_01',
    produceBatchId: 'prod_01',
    farmerId: 'usr_farmer_01',
    farmerName: 'Rajesh Kumar',
    farmerLocation: 'Jaunpur, Uttar Pradesh',
    farmerRating: 4.9,
    cropName: 'Tomato',
    variety: 'Hybrid Abhilash',
    quantityKg: 1500,
    qualityGrade: 'Grade A',
    freshnessPercent: 88,
    askingPricePerKg: 26.50,
    mandiBenchmarkPricePerKg: 24.50,
    harvestDate: '2026-09-04',
    storageLocation: 'On-Farm Covered Shed',
    isOrganic: true,
    status: 'ACTIVE',
    createdAt: '2026-09-04T10:30:00Z',
  },
  {
    id: 'list_02',
    produceBatchId: 'prod_02',
    farmerId: 'usr_farmer_02',
    farmerName: 'Sunil Verma',
    farmerLocation: 'Varanasi, Uttar Pradesh',
    farmerRating: 4.7,
    cropName: 'Potato',
    variety: 'Kufri Jyoti',
    quantityKg: 2500,
    qualityGrade: 'Grade A',
    freshnessPercent: 95,
    askingPricePerKg: 22.00,
    mandiBenchmarkPricePerKg: 20.50,
    harvestDate: '2026-08-28',
    storageLocation: 'Varanasi Cold Storage Unit 2',
    isOrganic: false,
    status: 'ACTIVE',
    createdAt: '2026-08-29T14:15:00Z',
  },
  {
    id: 'list_03',
    farmerId: 'usr_farmer_03',
    farmerName: 'Anil Yadav',
    farmerLocation: 'Azamgarh, Uttar Pradesh',
    farmerRating: 4.8,
    cropName: 'Onion',
    variety: 'Nashik Red',
    quantityKg: 1800,
    qualityGrade: 'Grade B',
    freshnessPercent: 82,
    askingPricePerKg: 23.50,
    mandiBenchmarkPricePerKg: 22.00,
    harvestDate: '2026-08-30',
    storageLocation: 'Covered Shed',
    isOrganic: false,
    status: 'ACTIVE',
    createdAt: '2026-08-31T09:00:00Z',
  },
];

const INITIAL_ORDERS: BuyerOrder[] = [];

class MarketplaceService {
  private readonly LISTINGS_KEY = 'sasyam_marketplace_listings';
  private readonly ORDERS_KEY = 'sasyam_marketplace_orders';

  public getListings(): MarketplaceListing[] {
    const saved = localStorage.getItem(this.LISTINGS_KEY);
    if (!saved) {
      localStorage.setItem(this.LISTINGS_KEY, JSON.stringify(INITIAL_LISTINGS));
      return INITIAL_LISTINGS;
    }
    return JSON.parse(saved);
  }

  public createListing(listing: Omit<MarketplaceListing, 'id' | 'createdAt' | 'status'>): MarketplaceListing {
    const listings = this.getListings();
    const newListing: MarketplaceListing = {
      ...listing,
      id: 'list_' + Date.now(),
      status: 'ACTIVE',
      createdAt: new Date().toISOString(),
    };

    listings.unshift(newListing);
    localStorage.setItem(this.LISTINGS_KEY, JSON.stringify(listings));
    return newListing;
  }

  public placeOrder(listingId: string, buyerName: string, buyerCompany: string, quantityKg: number): BuyerOrder {
    const listings = this.getListings();
    const listing = listings.find((l) => l.id === listingId);

    const orders = this.getOrders();
    const newOrder: BuyerOrder = {
      id: 'ord_' + Date.now(),
      listingId,
      buyerId: 'usr_buyer_demo',
      buyerName,
      buyerCompany,
      quantityKg,
      totalPrice: quantityKg * (listing?.askingPricePerKg || 25),
      orderDate: new Date().toISOString().split('T')[0],
      status: 'PENDING_LOGISTICS',
    };

    if (listing) {
      listing.status = 'RESERVED';
      localStorage.setItem(this.LISTINGS_KEY, JSON.stringify(listings));
    }

    orders.unshift(newOrder);
    localStorage.setItem(this.ORDERS_KEY, JSON.stringify(orders));
    return newOrder;
  }

  public getOrders(): BuyerOrder[] {
    const saved = localStorage.getItem(this.ORDERS_KEY);
    if (!saved) {
      localStorage.setItem(this.ORDERS_KEY, JSON.stringify(INITIAL_ORDERS));
      return INITIAL_ORDERS;
    }
    return JSON.parse(saved);
  }
}

export const marketplaceService = new MarketplaceService();
