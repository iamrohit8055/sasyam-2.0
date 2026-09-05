export interface Transporter {
  id: string;
  name: string;
  companyName: string;
  location: string;
  vehicleType: 'REEFER_COLD_VAN' | 'MINI_TRUCK' | 'HEAVY_LORRY' | 'TRACTOR_TROLLEY';
  capacityQuintals: number;
  baseRatePerKm: number;
  perQuintalRatePerKm: number;
  refrigerated: boolean;
  rating: number;
  totalTrips: number;
  driverName: string;
  driverPhone: string;
  vehicleNumber: string;
  isAvailable: boolean;
}

export interface Shipment {
  id: string;
  trackingNumber: string;
  transporterId: string;
  transporterName: string;
  vehicleType: string;
  vehicleNumber: string;
  driverName: string;
  driverPhone: string;
  cropName: string;
  quantityQuintals: number;
  pickupLocation: string;
  destinationLocation: string;
  distanceKm: number;
  totalFreightCost: number;
  status: 'PENDING_PICKUP' | 'DISPATCHED' | 'IN_TRANSIT' | 'DELIVERED';
  departureTime: string;
  estimatedArrivalTime: string;
  refrigerated: boolean;
  currentLocation?: string;
  temperatureReading?: string;
}

const INITIAL_TRANSPORTERS: Transporter[] = [
  {
    id: 'tr_01',
    name: 'Ramesh Singh',
    companyName: 'Kisan Express Cold Chain',
    location: 'Jaunpur, Uttar Pradesh',
    vehicleType: 'REEFER_COLD_VAN',
    capacityQuintals: 30, // 3,000 kg
    baseRatePerKm: 18,
    perQuintalRatePerKm: 0.50,
    refrigerated: true,
    rating: 4.9,
    totalTrips: 184,
    driverName: 'Ramesh Singh',
    driverPhone: '+91 98112 34567',
    vehicleNumber: 'UP 62 AT 4921',
    isAvailable: true,
  },
  {
    id: 'tr_02',
    name: 'Purvanchal Logistics Co',
    companyName: 'Purvanchal Agro Freight',
    location: 'Varanasi, Uttar Pradesh',
    vehicleType: 'MINI_TRUCK',
    capacityQuintals: 20, // 2,000 kg
    baseRatePerKm: 12,
    perQuintalRatePerKm: 0.35,
    refrigerated: false,
    rating: 4.7,
    totalTrips: 310,
    driverName: 'Vikram Yadav',
    driverPhone: '+91 98112 88990',
    vehicleNumber: 'UP 65 CT 8812',
    isAvailable: true,
  },
  {
    id: 'tr_03',
    name: 'Ganga Highway Carriers',
    companyName: 'Ganga Heavy Logistics',
    location: 'Azamgarh, Uttar Pradesh',
    vehicleType: 'HEAVY_LORRY',
    capacityQuintals: 100, // 10,000 kg
    baseRatePerKm: 32,
    perQuintalRatePerKm: 0.25,
    refrigerated: false,
    rating: 4.8,
    totalTrips: 520,
    driverName: 'Satish Tiwari',
    driverPhone: '+91 98112 11223',
    vehicleNumber: 'UP 50 B 9901',
    isAvailable: true,
  },
];

const INITIAL_SHIPMENTS: Shipment[] = [
  {
    id: 'shp_01',
    trackingNumber: 'LOG-2026-8821',
    transporterId: 'tr_01',
    transporterName: 'Kisan Express Cold Chain',
    vehicleType: 'Reefer Cold Van',
    vehicleNumber: 'UP 62 AT 4921',
    driverName: 'Ramesh Singh',
    driverPhone: '+91 98112 34567',
    cropName: 'Tomato (1,500 kg)',
    quantityQuintals: 15,
    pickupLocation: 'Green Valley Farm, Jaunpur',
    destinationLocation: 'Azadpur Mandi, Delhi',
    distanceKm: 780,
    totalFreightCost: 19890,
    status: 'IN_TRANSIT',
    departureTime: '2026-09-05T04:30:00Z',
    estimatedArrivalTime: '2026-09-05T20:00:00Z',
    refrigerated: true,
    currentLocation: 'Agra-Lucknow Expressway (Km 210)',
    temperatureReading: '4.2°C',
  },
];

class LogisticsService {
  private readonly TRANSPORTER_KEY = 'sasyam_transporters';
  private readonly SHIPMENT_KEY = 'sasyam_shipments';

  public getTransporters(): Transporter[] {
    const saved = localStorage.getItem(this.TRANSPORTER_KEY);
    if (!saved) {
      localStorage.setItem(this.TRANSPORTER_KEY, JSON.stringify(INITIAL_TRANSPORTERS));
      return INITIAL_TRANSPORTERS;
    }
    return JSON.parse(saved);
  }

  public getShipments(): Shipment[] {
    const saved = localStorage.getItem(this.SHIPMENT_KEY);
    if (!saved) {
      localStorage.setItem(this.SHIPMENT_KEY, JSON.stringify(INITIAL_SHIPMENTS));
      return INITIAL_SHIPMENTS;
    }
    return JSON.parse(saved);
  }

  public calculateFreight(
    transporterId: string,
    distanceKm: number,
    weightQuintals: number
  ): { baseCost: number; weightCost: number; totalCost: number } {
    const transporters = this.getTransporters();
    const tr = transporters.find((t) => t.id === transporterId) || transporters[0];

    const baseCost = distanceKm * tr.baseRatePerKm;
    const weightCost = distanceKm * weightQuintals * tr.perQuintalRatePerKm;
    const totalCost = baseCost + weightCost;

    return {
      baseCost,
      weightCost,
      totalCost: Math.round(totalCost),
    };
  }

  public bookTransport(data: {
    transporterId: string;
    cropName: string;
    quantityQuintals: number;
    pickupLocation: string;
    destinationLocation: string;
    distanceKm: number;
  }): Shipment {
    const transporters = this.getTransporters();
    const tr = transporters.find((t) => t.id === data.transporterId) || transporters[0];
    const { totalCost } = this.calculateFreight(data.transporterId, data.distanceKm, data.quantityQuintals);

    const shipments = this.getShipments();
    const newShipment: Shipment = {
      id: 'shp_' + Date.now(),
      trackingNumber: `LOG-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      transporterId: tr.id,
      transporterName: tr.companyName,
      vehicleType: tr.vehicleType.replace('_', ' '),
      vehicleNumber: tr.vehicleNumber,
      driverName: tr.driverName,
      driverPhone: tr.driverPhone,
      cropName: data.cropName,
      quantityQuintals: data.quantityQuintals,
      pickupLocation: data.pickupLocation,
      destinationLocation: data.destinationLocation,
      distanceKm: data.distanceKm,
      totalFreightCost: totalCost,
      status: 'PENDING_PICKUP',
      departureTime: new Date().toISOString(),
      estimatedArrivalTime: new Date(Date.now() + 8 * 3600 * 1000).toISOString(),
      refrigerated: tr.refrigerated,
      temperatureReading: tr.refrigerated ? '4.0°C' : undefined,
      currentLocation: 'Dispatched to Pickup Address',
    };

    shipments.unshift(newShipment);
    localStorage.setItem(this.SHIPMENT_KEY, JSON.stringify(shipments));
    return newShipment;
  }
}

export const logisticsService = new LogisticsService();
