export interface DiseaseScanItem {
  id: string;
  cropName: string;
  imageUrl: string;
  scannedAt: string;
  detectedDisease: string;
  confidenceScore: number;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  description: string;
  chemicalTreatments: string[];
  organicTreatments: string[];
  preventiveMeasures: string[];
}

const SAMPLE_DISEASES: Record<string, DiseaseScanItem> = {
  tomato_early_blight: {
    id: 'scan_tom_01',
    cropName: 'Tomato',
    imageUrl: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb1b7a5?auto=format&fit=crop&q=80&w=400',
    scannedAt: 'Just now',
    detectedDisease: 'Early Blight (Alternaria solani)',
    confidenceScore: 94.8,
    riskLevel: 'HIGH',
    description: 'Fungal pathogen characterized by dark brown spots with concentric ring "target-board" patterns on mature leaves.',
    chemicalTreatments: [
      'Foliar spray of Mancozeb 75% WP @ 2.5g / liter of water.',
      'Apply Copper Oxychloride 50% WP if lesion area expands beyond 15%.',
      'Repeat spray after 10-12 days if humid conditions persist.',
    ],
    organicTreatments: [
      'Apply Neem Oil Extract (10,000 ppm) @ 3ml / liter of water.',
      'Spray Trichoderma viride bio-fungicide @ 5g / liter.',
      'Remove and burn infected lower leaves immediately.',
    ],
    preventiveMeasures: [
      'Maintain 2-year crop rotation with non-solanaceous crops.',
      'Avoid overhead sprinkler irrigation during humid evenings.',
      'Ensure proper plant spacing for field airflow.',
    ],
  },
  potato_late_blight: {
    id: 'scan_pot_02',
    cropName: 'Potato',
    imageUrl: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&q=80&w=400',
    scannedAt: 'Just now',
    detectedDisease: 'Late Blight (Phytophthora infestans)',
    confidenceScore: 91.2,
    riskLevel: 'HIGH',
    description: 'Water-soaked dark lesions on leaf tips expanding rapidly during cool, moist weather.',
    chemicalTreatments: [
      'Foliar application of Metalaxyl + Mancozeb (Ridomil MZ) @ 2g / liter.',
      'Spray Cymoxanil + Mancozeb for curative action.',
    ],
    organicTreatments: [
      'Spray Bordeaux Mixture (1%) on lower foliage.',
      'Apply bio-agent Pseudomonas fluorescens @ 10g / liter.',
    ],
    preventiveMeasures: [
      'Plant certified disease-free tuber seed.',
      'Earthing up soil around plants to prevent spore wash down to tubers.',
    ],
  },
};

class DiseaseScanService {
  public scanSample(sampleKey: string): DiseaseScanItem {
    return SAMPLE_DISEASES[sampleKey] || SAMPLE_DISEASES.tomato_early_blight;
  }

  public getHistory(): DiseaseScanItem[] {
    return [SAMPLE_DISEASES.tomato_early_blight, SAMPLE_DISEASES.potato_late_blight];
  }
}

export const diseaseScanService = new DiseaseScanService();
