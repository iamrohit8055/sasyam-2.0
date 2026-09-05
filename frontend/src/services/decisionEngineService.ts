import { harvestService } from './harvestService';
import { marketService } from './marketService';
import type { ProduceBatch } from '../types';

export interface DecisionAnalysis {
  batchId: string;
  cropName: string;
  variety: string;
  quantityKg: number;
  currentFreshness: number;
  qualityGrade: string;
  
  // Recommendations
  recommendation: 'SELL_NOW' | 'STORE' | 'PROCESS';
  recommendationTitle: string;
  recommendationReasoning: string;
  confidenceScore: number; // e.g. 89

  // Immediate Mandi Option
  bestImmediateMandiName: string;
  currentQuotedPricePerKg: number;
  currentNetRealizationPerKg: number;
  immediateTotalRevenue: number;

  // Storage Option
  recommendedStorageDays: number;
  warehouseName: string;
  projectedFuturePricePerKg: number;
  storageCostPerKgTotal: number;
  expectedSpoilagePercent: number;
  storedTotalGrossRevenue: number;
  storedTotalNetRevenue: number;
  netProfitDeltaIfStored: number; // Stored Net - Immediate Net

  // Value-Add Processing Option
  processorName: string;
  processorPayoutPerKg: number;
  processingNetRevenue: number;

  // Explainable AI Key Drivers
  keyDrivers: Array<{
    title: string;
    description: string;
    impact: 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL';
  }>;
}

class DecisionEngineService {
  public getProduceBatches(): ProduceBatch[] {
    return harvestService.getProduce();
  }

  public analyzeBatch(batchId: string, customStorageDays?: number): DecisionAnalysis | null {
    const batches = this.getProduceBatches();
    const batch = batches.find((b) => b.id === batchId) || batches[0];

    if (!batch) return null;

    const crop = batch.cropName;
    const qty = batch.quantityKg;
    const storageDays = customStorageDays || 14;

    // Fetch immediate best mandi quote
    const comparison = marketService.getMandiComparison(crop as 'Tomato' | 'Potato' | 'Onion', qty);
    const bestMandi = comparison.find((m) => m.isRecommended) || comparison[0];

    const currentNetPerKg = bestMandi ? bestMandi.netRealizationPerKg : 22.5;
    const currentPricePerKg = bestMandi ? bestMandi.quotedPricePerKg : 25.0;
    const immediateNetTotal = qty * currentNetPerKg;

    // Calculate future price projection based on crop type
    let futurePriceGainPercent = 0.15; // default 15% increase over 14 days
    if (crop === 'Potato') futurePriceGainPercent = 0.22; // Potato price surge post-harvest
    if (crop === 'Onion') futurePriceGainPercent = 0.18;
    if (crop === 'Tomato' && batch.freshnessPercent < 70) futurePriceGainPercent = 0.05; // low window for perishable

    const projectedFuturePrice = currentPricePerKg * (1 + futurePriceGainPercent);
    const storageDailyRatePerKg = 0.08; // ₹0.08/kg/day in cold storage (~₹2.4/kg/month)
    const totalStorageCostPerKg = storageDailyRatePerKg * storageDays + 0.40; // storage + handling
    const totalStorageFee = qty * totalStorageCostPerKg;

    // Spoilage percentage logic
    const isPerishable = crop === 'Tomato';
    let expectedSpoilagePct = isPerishable ? 4.5 : 1.2; // in cold storage over storageDays
    if (batch.storageCondition === 'Open Air' && isPerishable) {
      expectedSpoilagePct = 18.0;
    }

    const usableQtyAfterStorage = qty * (1 - expectedSpoilagePct / 100);
    const storedGrossRevenue = usableQtyAfterStorage * projectedFuturePrice;
    const storedNetTotal = storedGrossRevenue - totalStorageFee - (qty * 0.5); // minus freight to warehouse
    const netProfitDelta = storedNetTotal - immediateNetTotal;

    // Processing Option
    const processorPayout = currentPricePerKg * 0.85; // e.g. 85% of market price but zero spoilage loss
    const processingNetTotal = qty * processorPayout;

    // Recommendation rules
    let recommendation: 'SELL_NOW' | 'STORE' | 'PROCESS' = 'STORE';
    let title = `STORE FOR ${storageDays} DAYS IN COLD STORAGE`;
    let reasoning = `High price surge of +${(futurePriceGainPercent * 100).toFixed(0)}% expected in major mandis over the next ${storageDays} days. Cold storage preserves 95%+ quality grade.`;
    let confidence = 89;

    if (isPerishable && batch.storageCondition === 'Open Air' && batch.freshnessPercent < 80) {
      recommendation = 'SELL_NOW';
      title = 'SELL IMMEDIATELY AT TOP MANDI';
      reasoning = `High risk of spoilage (${batch.freshnessPercent}% current freshness). Open-air decay rate will exceed price increase within 48 hours.`;
      confidence = 94;
    } else if (netProfitDelta < 500) {
      recommendation = 'SELL_NOW';
      title = 'SELL IMMEDIATELY (MARGINAL STORAGE GAIN)';
      reasoning = `Storage fees and handling costs eat up most of the projected price surge. Instant cash flow is preferable.`;
      confidence = 82;
    } else if (batch.qualityGrade === 'Grade C') {
      recommendation = 'PROCESS';
      title = 'ALLOCATE TO VALUE-ADD PROCESSOR';
      reasoning = `Grade C produce yields maximum return when sold to food processing units (sauce/paste manufacture) vs low mandi bidding.`;
      confidence = 86;
    }

    const keyDrivers = [
      {
        title: 'Projected Mandi Surge',
        description: `${crop} market prices projected to rise from ₹${currentPricePerKg.toFixed(2)} to ₹${projectedFuturePrice.toFixed(2)}/kg within ${storageDays} days due to regional supply shortages.`,
        impact: futurePriceGainPercent > 0.1 ? ('POSITIVE' as const) : ('NEUTRAL' as const),
      },
      {
        title: 'Storage & Holding Fees',
        description: `Cold storage cost for ${storageDays} days estimated at ₹${totalStorageCostPerKg.toFixed(2)}/kg (total ₹${totalStorageFee.toLocaleString('en-IN')}).`,
        impact: 'NEGATIVE' as const,
      },
      {
        title: 'Produce Spoilage Risk',
        description: `Estimated produce volume loss over storage duration is ~${expectedSpoilagePct.toFixed(1)}% under cold storage conditions.`,
        impact: expectedSpoilagePct > 10 ? ('NEGATIVE' as const) : ('POSITIVE' as const),
      },
      {
        title: 'Net Profit Advantage',
        description: netProfitDelta > 0
          ? `Storing yields an additional net profit of +₹${netProfitDelta.toLocaleString('en-IN', { maximumFractionDigits: 0 })} compared to immediate sale.`
          : `Selling today avoids a net storage loss of -₹${Math.abs(netProfitDelta).toLocaleString('en-IN', { maximumFractionDigits: 0 })}.`,
        impact: netProfitDelta > 0 ? ('POSITIVE' as const) : ('NEGATIVE' as const),
      },
    ];

    return {
      batchId: batch.id,
      cropName: crop,
      variety: batch.variety,
      quantityKg: qty,
      currentFreshness: batch.freshnessPercent,
      qualityGrade: batch.qualityGrade,

      recommendation,
      recommendationTitle: title,
      recommendationReasoning: reasoning,
      confidenceScore: confidence,

      bestImmediateMandiName: bestMandi ? bestMandi.marketName : 'Azadpur Mandi',
      currentQuotedPricePerKg: currentPricePerKg,
      currentNetRealizationPerKg: currentNetPerKg,
      immediateTotalRevenue: immediateNetTotal,

      recommendedStorageDays: storageDays,
      warehouseName: 'Jaunpur WDRA Accredited Cold Storage Unit 4',
      projectedFuturePricePerKg: projectedFuturePrice,
      storageCostPerKgTotal: totalStorageCostPerKg,
      expectedSpoilagePercent: expectedSpoilagePct,
      storedTotalGrossRevenue: storedGrossRevenue,
      storedTotalNetRevenue: storedNetTotal,
      netProfitDeltaIfStored: netProfitDelta,

      processorName: 'Varanasi Food & Bio Processing Cluster',
      processorPayoutPerKg: processorPayout,
      processingNetRevenue: processingNetTotal,

      keyDrivers,
    };
  }
}

export const decisionEngineService = new DecisionEngineService();
