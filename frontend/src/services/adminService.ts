export interface PendingVerification {
  id: string;
  applicantName: string;
  role: 'FARMER' | 'TRANSPORTER' | 'PROCESSOR' | 'WAREHOUSE';
  documentType: string;
  documentNumber: string;
  submittedDate: string;
  location: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
}

const INITIAL_VERIFICATIONS: PendingVerification[] = [
  {
    id: 'verif_01',
    applicantName: 'Rameshwar Singh',
    role: 'FARMER',
    documentType: 'Aadhaar + Khasra Land Certificate',
    documentNumber: 'KHS-2026-99218',
    submittedDate: '2026-09-04',
    location: 'Jaunpur, UP',
    status: 'PENDING',
  },
  {
    id: 'verif_02',
    applicantName: 'Purvanchal Cold Storage Pvt Ltd',
    role: 'WAREHOUSE',
    documentType: 'WDRA Government Accreditation',
    documentNumber: 'WDRA-UP-8812',
    submittedDate: '2026-09-03',
    location: 'Varanasi, UP',
    status: 'PENDING',
  },
  {
    id: 'verif_03',
    applicantName: 'Kisan Express Cold Freight',
    role: 'TRANSPORTER',
    documentType: 'Reefer Vehicle Commercial Permit',
    documentNumber: 'UP-62-PERMIT-44',
    submittedDate: '2026-09-02',
    location: 'Jaunpur, UP',
    status: 'PENDING',
  },
];

class AdminService {
  private readonly KEY = 'sasyam_pending_verifications';

  public getPendingVerifications(): PendingVerification[] {
    const saved = localStorage.getItem(this.KEY);
    if (!saved) {
      localStorage.setItem(this.KEY, JSON.stringify(INITIAL_VERIFICATIONS));
      return INITIAL_VERIFICATIONS;
    }
    return JSON.parse(saved);
  }

  public approveVerification(id: string): PendingVerification[] {
    const list = this.getPendingVerifications();
    const item = list.find((v) => v.id === id);
    if (item) {
      item.status = 'APPROVED';
      localStorage.setItem(this.KEY, JSON.stringify(list));
    }
    return list;
  }

  public rejectVerification(id: string): PendingVerification[] {
    const list = this.getPendingVerifications();
    const item = list.find((v) => v.id === id);
    if (item) {
      item.status = 'REJECTED';
      localStorage.setItem(this.KEY, JSON.stringify(list));
    }
    return list;
  }

  public getPlatformSummary() {
    return {
      totalGMV: 12450000, // ₹1.24 Cr
      totalFarmers: 1420,
      totalMappedAcres: 4850,
      activeWarehouses: 24,
      escrowFlowTotal: 4280000, // ₹42.8 Lakh
      pendingVerificationsCount: this.getPendingVerifications().filter((v) => v.status === 'PENDING').length,
    };
  }
}

export const adminService = new AdminService();
