// marketService.ts

export interface MandiComparisonItem {
  id: string;
  marketName: string;
  location: string;
  distanceKm: number;
  quotedPricePerKg: number;
  priceTrendPercent: number;
  transportCostPerKg: number;
  otherCostPerKg: number;
  netRealizationPerKg: number;
  totalNetRevenue: number;
  demandLevel: 'HIGH' | 'MEDIUM' | 'LOW';
  isRecommended: boolean;
  reason: string;
}

export interface PriceTrendPoint {
  day: string;
  azadpurPrice: number;
  localMandiPrice: number;
  varanasiPrice: number;
}

const DEMO_TREND_DATA: Record<string, PriceTrendPoint[]> = {
  Tomato: [
    { day: 'Mon', azadpurPrice: 24.5, localMandiPrice: 22.0, varanasiPrice: 23.0 },
    { day: 'Tue', azadpurPrice: 25.0, localMandiPrice: 22.5, varanasiPrice: 23.5 },
    { day: 'Wed', azadpurPrice: 25.8, localMandiPrice: 23.0, varanasiPrice: 23.5 },
    { day: 'Thu', azadpurPrice: 26.2, localMandiPrice: 23.5, varanasiPrice: 24.0 },
    { day: 'Fri', azadpurPrice: 26.8, localMandiPrice: 24.0, varanasiPrice: 24.5 },
    { day: 'Sat', azadpurPrice: 27.0, localMandiPrice: 24.0, varanasiPrice: 25.0 },
    { day: 'Sun', azadpurPrice: 27.5, localMandiPrice: 24.0, varanasiPrice: 25.0 },
  ],
  Potato: [
    { day: 'Mon', azadpurPrice: 21.0, localMandiPrice: 20.0, varanasiPrice: 20.5 },
    { day: 'Tue', azadpurPrice: 21.5, localMandiPrice: 20.0, varanasiPrice: 21.0 },
    { day: 'Wed', azadpurPrice: 22.0, localMandiPrice: 20.5, varanasiPrice: 21.5 },
    { day: 'Thu', azadpurPrice: 22.5, localMandiPrice: 21.0, varanasiPrice: 22.0 },
    { day: 'Fri', azadpurPrice: 23.0, localMandiPrice: 21.5, varanasiPrice: 22.5 },
    { day: 'Sat', azadpurPrice: 23.0, localMandiPrice: 22.0, varanasiPrice: 22.5 },
    { day: 'Sun', azadpurPrice: 23.5, localMandiPrice: 22.0, varanasiPrice: 23.0 },
  ],
  Onion: [
    { day: 'Mon', azadpurPrice: 22.0, localMandiPrice: 20.0, varanasiPrice: 21.0 },
    { day: 'Tue', azadpurPrice: 23.0, localMandiPrice: 20.5, varanasiPrice: 21.5 },
    { day: 'Wed', azadpurPrice: 24.0, localMandiPrice: 21.0, varanasiPrice: 22.0 },
    { day: 'Thu', azadpurPrice: 24.5, localMandiPrice: 21.5, varanasiPrice: 22.5 },
    { day: 'Fri', azadpurPrice: 25.5, localMandiPrice: 22.0, varanasiPrice: 23.0 },
    { day: 'Sat', azadpurPrice: 26.0, localMandiPrice: 22.0, varanasiPrice: 23.5 },
    { day: 'Sun', azadpurPrice: 26.5, localMandiPrice: 22.5, varanasiPrice: 24.0 },
  ],
};

export const marketService = {
  getMandiComparison(cropName: string, quantityKg: number): MandiComparisonItem[] {
    const rawMarkets = [
      {
        id: 'mkt_azadpur',
        marketName: 'Azadpur Wholesale Mandi',
        location: 'Delhi NCR',
        distanceKm: 30,
        quotedPricePerKg: cropName === 'Tomato' ? 27 : cropName === 'Onion' ? 26 : 23,
        priceTrendPercent: 8.2,
        transportCostPerKg: 3.0,
        otherCostPerKg: 0.5,
        demandLevel: 'HIGH' as const,
        reason: 'Highest quoted price offset by moderate truck freight cost.',
      },
      {
        id: 'mkt_jaunpur',
        marketName: 'Jaunpur District Mandi',
        location: 'Jaunpur, UP',
        distanceKm: 12,
        quotedPricePerKg: cropName === 'Tomato' ? 24 : cropName === 'Onion' ? 22 : 20,
        priceTrendPercent: 0.0,
        transportCostPerKg: 1.5,
        otherCostPerKg: 0.5,
        demandLevel: 'MEDIUM' as const,
        reason: 'Close distance with minimal transport cost, but lower quoted price.',
      },
      {
        id: 'mkt_varanasi',
        marketName: 'Varanasi Central Mandi',
        location: 'Varanasi, UP',
        distanceKm: 45,
        quotedPricePerKg: cropName === 'Tomato' ? 25.5 : cropName === 'Onion' ? 24 : 22.5,
        priceTrendPercent: 2.1,
        transportCostPerKg: 2.5,
        otherCostPerKg: 0.5,
        demandLevel: 'HIGH' as const,
        reason: 'Steady wholesale demand from hotel & restaurant sector.',
      },
      {
        id: 'mkt_cold_depot',
        marketName: 'Regional Cold Storage Hub',
        location: 'Varanasi Highway, UP',
        distanceKm: 18,
        quotedPricePerKg: cropName === 'Tomato' ? 26 : cropName === 'Onion' ? 25 : 22,
        priceTrendPercent: 4.5,
        transportCostPerKg: 2.0,
        otherCostPerKg: 1.0,
        demandLevel: 'MEDIUM' as const,
        reason: 'Option to store and sell on contract to regional buyers.',
      },
    ];

    // Compute Net Realization
    const processed = rawMarkets.map((m) => {
      const netRealizationPerKg = m.quotedPricePerKg - m.transportCostPerKg - m.otherCostPerKg;
      const totalNetRevenue = netRealizationPerKg * quantityKg;
      return {
        ...m,
        netRealizationPerKg,
        totalNetRevenue,
        isRecommended: false,
      };
    });

    // Find best option by highest net realization
    processed.sort((a, b) => b.netRealizationPerKg - a.netRealizationPerKg);
    if (processed.length > 0) {
      processed[0].isRecommended = true;
    }

    return processed;
  },

  getPriceTrend(cropName: string): PriceTrendPoint[] {
    return DEMO_TREND_DATA[cropName] || DEMO_TREND_DATA.Tomato;
  },
};
