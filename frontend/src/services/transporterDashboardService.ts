import { logisticsService } from './logisticsService';
import type { Shipment } from './logisticsService';

export interface PickupJob {
  id: string;
  cropName: string;
  quantityQuintals: number;
  pickupLocation: string;
  destinationLocation: string;
  distanceKm: number;
  offeredFreightFare: number;
  requestedVehicleType: string;
  pickupDate: string;
  status: 'OPEN' | 'ACCEPTED';
}

const INITIAL_JOBS: PickupJob[] = [
  {
    id: 'job_101',
    cropName: 'Tomato (2,000 kg)',
    quantityQuintals: 20,
    pickupLocation: 'Surya Organic Farm, Jaunpur',
    destinationLocation: 'Varanasi Central Mandi',
    distanceKm: 42,
    offeredFreightFare: 3800,
    requestedVehicleType: 'Mini-Truck',
    pickupDate: '2026-09-06',
    status: 'OPEN',
  },
  {
    id: 'job_102',
    cropName: 'Potato (5,000 kg)',
    quantityQuintals: 50,
    pickupLocation: 'Jaunpur Cold Storage Unit B',
    destinationLocation: 'Azadpur Mandi, Delhi',
    distanceKm: 780,
    offeredFreightFare: 28500,
    requestedVehicleType: 'Reefer Cold Van',
    pickupDate: '2026-09-06',
    status: 'OPEN',
  },
];

class TransporterDashboardService {
  private readonly JOBS_KEY = 'sasyam_pickup_jobs';

  public getAvailableJobs(): PickupJob[] {
    const saved = localStorage.getItem(this.JOBS_KEY);
    if (!saved) {
      localStorage.setItem(this.JOBS_KEY, JSON.stringify(INITIAL_JOBS));
      return INITIAL_JOBS;
    }
    return JSON.parse(saved);
  }

  public acceptJob(jobId: string, _vehicleNumber: string, _driverName: string): Shipment {
    const jobs = this.getAvailableJobs();
    const job = jobs.find((j) => j.id === jobId);

    if (job) {
      job.status = 'ACCEPTED';
      localStorage.setItem(this.JOBS_KEY, JSON.stringify(jobs));
    }

    return logisticsService.bookTransport({
      transporterId: 'tr_01',
      cropName: job ? job.cropName : 'Agricultural Produce',
      quantityQuintals: job ? job.quantityQuintals : 20,
      pickupLocation: job ? job.pickupLocation : 'Jaunpur Farm',
      destinationLocation: job ? job.destinationLocation : 'Varanasi Mandi',
      distanceKm: job ? job.distanceKm : 50,
    });
  }

  public getSummary() {
    const shipments = logisticsService.getShipments();
    const activeShipments = shipments.filter((s) => s.status !== 'DELIVERED');
    const totalEarnings = shipments.reduce((sum, s) => sum + s.totalFreightCost, 0) + 128500;

    return {
      totalEarnings,
      activeVehiclesCount: activeShipments.length || 1,
      completedTripsCount: 184,
      onTimeRating: 4.9,
    };
  }
}

export const transporterDashboardService = new TransporterDashboardService();
