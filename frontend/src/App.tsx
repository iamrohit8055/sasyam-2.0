import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import type { UserRole } from './types';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ProtectedRoute } from './components/layout/ProtectedRoute';
import { AppShell } from './components/layout/AppShell';
import { LandingPage } from './pages/LandingPage';
import { AboutPage } from './pages/public/AboutPage';
import { SolutionsPage } from './pages/public/SolutionsPage';
import { HowItWorksPage } from './pages/public/HowItWorksPage';
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { FarmerDashboardPage } from './pages/farmer/FarmerDashboardPage';
import { FarmsPage } from './pages/farmer/FarmsPage';
import { FarmDetailPage } from './pages/farmer/FarmDetailPage';
import { CropsPage } from './pages/farmer/CropsPage';
import { NewCropPage } from './pages/farmer/NewCropPage';
import { CropDetailPage } from './pages/farmer/CropDetailPage';
import { HarvestsPage } from './pages/farmer/HarvestsPage';
import { ProducePage } from './pages/farmer/ProducePage';
import { MarketsPage } from './pages/farmer/MarketsPage';
import { AICropRecommendationPage } from './pages/farmer/AICropRecommendationPage';
import { DiseaseScannerPage } from './pages/farmer/DiseaseScannerPage';
import { SellDecisionPage } from './pages/farmer/SellDecisionPage';
import { StoragePage } from './pages/farmer/StoragePage';
import { ProcessingPage } from './pages/farmer/ProcessingPage';
import { TransportPage } from './pages/farmer/TransportPage';
import { TransportTrackingPage } from './pages/farmer/TransportTrackingPage';
import { ProduceMarketplacePage } from './pages/marketplace/ProduceMarketplacePage';
import { BuyerDashboardPage } from './pages/buyer/BuyerDashboardPage';
import { BuyerOrdersPage } from './pages/buyer/BuyerOrdersPage';
import { TransporterDashboardPage } from './pages/transporter/TransporterDashboardPage';
import { TransporterJobsPage } from './pages/transporter/TransporterJobsPage';
import { TransporterFleetPage } from './pages/transporter/TransporterFleetPage';
import { ProcessorDashboardPage } from './pages/processor/ProcessorDashboardPage';
import { ProcessorOrdersPage } from './pages/processor/ProcessorOrdersPage';
import { NotificationsPage } from './pages/notifications/NotificationsPage';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';

const AppRoutes: React.FC = () => {
  const { user } = useAuth();
  const [currentRole, setCurrentRole] = useState<UserRole>('FARMER');

  const activeRole = user?.role || currentRole;

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/solutions" element={<SolutionsPage />} />
      <Route path="/how-it-works" element={<HowItWorksPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Protected Workspace Shell Routes */}
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <AppShell currentRole={activeRole} onRoleChange={setCurrentRole}>
              <Routes>
                {/* Farmer Routes */}
                <Route path="farmer/dashboard" element={<FarmerDashboardPage />} />
                <Route path="farmer/farms" element={<FarmsPage />} />
                <Route path="farmer/farms/:id" element={<FarmDetailPage />} />
                <Route path="farmer/crops" element={<CropsPage />} />
                <Route path="farmer/crops/new" element={<NewCropPage />} />
                <Route path="farmer/crops/:id" element={<CropDetailPage />} />
                <Route path="farmer/harvests" element={<HarvestsPage />} />
                <Route path="farmer/produce" element={<ProducePage />} />
                <Route path="farmer/markets" element={<MarketsPage />} />
                <Route path="farmer/recommendations" element={<AICropRecommendationPage />} />
                <Route path="farmer/disease-detection" element={<DiseaseScannerPage />} />
                <Route path="farmer/sell-decision" element={<SellDecisionPage />} />
                <Route path="farmer/storage" element={<StoragePage />} />
                <Route path="farmer/processing" element={<ProcessingPage />} />

                {/* Shared & Marketplace Routes */}
                <Route path="marketplace" element={<ProduceMarketplacePage />} />
                <Route path="farmer/transport" element={<TransportPage />} />
                <Route path="farmer/transport/:id" element={<TransportTrackingPage />} />

                {/* Notifications */}
                <Route path="notifications" element={<NotificationsPage />} />

                {/* Buyer Workflows */}
                <Route path="buyer/dashboard" element={<BuyerDashboardPage />} />
                <Route path="buyer/marketplace" element={<ProduceMarketplacePage />} />
                <Route path="buyer/orders" element={<BuyerOrdersPage />} />

                {/* Transporter Workflows */}
                <Route path="transporter/dashboard" element={<TransporterDashboardPage />} />
                <Route path="transporter/jobs" element={<TransporterJobsPage />} />
                <Route path="transporter/vehicle" element={<TransporterFleetPage />} />

                {/* Processor Workflows */}
                <Route path="processor/dashboard" element={<ProcessorDashboardPage />} />
                <Route path="processor/requirements" element={<ProcessingPage />} />
                <Route path="processor/orders" element={<ProcessorOrdersPage />} />

                {/* Admin Workflows */}
                <Route path="admin/dashboard" element={<AdminDashboardPage />} />

                {/* Catch-all redirect */}
                <Route path="*" element={<Navigate to="/farmer/dashboard" replace />} />
              </Routes>
            </AppShell>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
};
