import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  Users,
  Building,
  CheckCircle2,
  XCircle,
  FileText,
  TrendingUp,
  Activity,
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { StatCard } from '../../components/agriculture/StatCard';
import { adminService } from '../../services/adminService';
import type { PendingVerification } from '../../services/adminService';

export const AdminDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [verifications, setVerifications] = useState<PendingVerification[]>([]);
  const [summary, setSummary] = useState({
    totalGMV: 12450000,
    totalFarmers: 1420,
    totalMappedAcres: 4850,
    activeWarehouses: 24,
    escrowFlowTotal: 4280000,
    pendingVerificationsCount: 3,
  });

  useEffect(() => {
    setVerifications(adminService.getPendingVerifications());
    setSummary(adminService.getPlatformSummary());
  }, []);

  const handleApprove = (id: string) => {
    const updated = adminService.approveVerification(id);
    setVerifications(updated);
    setSummary(adminService.getPlatformSummary());
  };

  const handleReject = (id: string) => {
    const updated = adminService.rejectVerification(id);
    setVerifications(updated);
    setSummary(adminService.getPlatformSummary());
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-[#173B2A]">SASYAM Master Platform Admin</h1>
            <Badge variant="brand" className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              SYSTEM GOVERNANCE
            </Badge>
          </div>
          <p className="text-sm text-gray-600">
            Regulate ecosystem transactions, approve farmer Aadhaar/Khasra KYC, and certify cold storage facilities.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => navigate('/notifications')}>
            <Activity className="w-4 h-4 mr-1 text-emerald-600" />
            Audit Alert Logs
          </Button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Platform Trade GMV"
          value={`₹${(summary.totalGMV / 10000000).toFixed(2)} Cr`}
          subtitle="Monetized Produce Volume"
          icon={<TrendingUp className="w-5 h-5 text-emerald-600" />}
        />
        <StatCard
          title="Registered Farmers"
          value={`${summary.totalFarmers.toLocaleString('en-IN')} Farmers`}
          subtitle={`${summary.totalMappedAcres.toLocaleString('en-IN')} Acres Mapped`}
          icon={<Users className="w-5 h-5 text-[#2F6B45]" />}
        />
        <StatCard
          title="SASYAM Escrow Flow"
          value={`₹${(summary.escrowFlowTotal / 100000).toFixed(1)} Lakh`}
          subtitle="100% Insured Transactions"
          icon={<ShieldCheck className="w-5 h-5 text-purple-600" />}
        />
        <StatCard
          title="WDRA Warehouses"
          value={`${summary.activeWarehouses} Certified`}
          subtitle={`${summary.pendingVerificationsCount} Pending Verification`}
          icon={<Building className="w-5 h-5 text-amber-500" />}
        />
      </div>

      {/* SECTION 1: VERIFICATION QUEUE */}
      <Card className="p-6 bg-white border border-gray-200 space-y-4">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#2F6B45]" />
            <h3 className="text-lg font-bold text-[#173B2A]">Pending User & Facility Verification Queue</h3>
          </div>
          {summary.pendingVerificationsCount > 0 && (
            <Badge variant="danger">
              {summary.pendingVerificationsCount} PENDING APPROVAL
            </Badge>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#F7F5ED] text-xs uppercase font-bold text-[#173B2A]">
              <tr>
                <th className="p-3 rounded-l-lg">Applicant & Role</th>
                <th className="p-3">Document Type</th>
                <th className="p-3">Doc Ref #</th>
                <th className="p-3">Location</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right rounded-r-lg">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {verifications.map((v) => (
                <tr key={v.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="p-3">
                    <span className="font-bold text-[#173B2A] block">{v.applicantName}</span>
                    <Badge variant="brand" className="text-[10px] mt-0.5">
                      {v.role}
                    </Badge>
                  </td>
                  <td className="p-3 text-gray-800 font-medium">{v.documentType}</td>
                  <td className="p-3 font-mono text-xs text-gray-600">{v.documentNumber}</td>
                  <td className="p-3 text-gray-600">{v.location}</td>
                  <td className="p-3">
                    <Badge
                      variant={
                        v.status === 'APPROVED'
                          ? 'success'
                          : v.status === 'REJECTED'
                          ? 'danger'
                          : 'warning'
                      }
                    >
                      {v.status}
                    </Badge>
                  </td>
                  <td className="p-3 text-right">
                    {v.status === 'PENDING' ? (
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => handleApprove(v.id)}
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                          Approve
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleReject(v.id)}
                        >
                          <XCircle className="w-3.5 h-3.5 mr-1 text-rose-600" />
                          Reject
                        </Button>
                      </div>
                    ) : (
                      <span className="text-xs text-gray-400 font-semibold">Processed</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* SECTION 2: AUDIT LOG */}
      <Card className="p-6 bg-white border border-gray-200 space-y-4">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-purple-700" />
            <h3 className="text-lg font-bold text-[#173B2A]">Ecosystem Real-Time Compliance Audit</h3>
          </div>
          <Badge variant="success">SYSTEM SECURE</Badge>
        </div>

        <div className="space-y-3 text-xs">
          {[
            { text: 'Aadhaar KYC verified for Rajesh Kumar (Jaunpur Farm)', time: '12 mins ago', status: 'SUCCESS' },
            { text: 'WDRA Cold Storage inspection passed for Jaunpur Unit 4', time: '1 hour ago', status: 'SUCCESS' },
            { text: 'Escrow payout of ₹39,750 released to Ramesh Singh Transport', time: '3 hours ago', status: 'SUCCESS' },
            { text: 'Soil NPK Lab Health Card synced for Field #01', time: '5 hours ago', status: 'SUCCESS' },
          ].map((item, idx) => (
            <div key={idx} className="p-3 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span className="text-gray-800 font-medium">{item.text}</span>
              </div>
              <span className="text-gray-400">{item.time}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
