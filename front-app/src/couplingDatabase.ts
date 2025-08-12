// FUNDAL Coupling Database based on 2025 Catalog
export interface CouplingModel {
  model: string;
  series: string;
  torqueNm: number;
  maxRPM: number;
  boreDiameterMin: number;
  boreDiameterMax: number;
  weight?: number;
}

// FA Series - Standard Couplings
export const FA_SERIES: CouplingModel[] = [
  { model: "FA 1", series: "FA", torqueNm: 29, maxRPM: 3750, boreDiameterMin: 15, boreDiameterMax: 28 },
  { model: "FA 2", series: "FA", torqueNm: 44, maxRPM: 3750, boreDiameterMin: 24, boreDiameterMax: 36 },
  { model: "FA 3", series: "FA", torqueNm: 89, maxRPM: 3750, boreDiameterMin: 32, boreDiameterMax: 48 },
  { model: "FA 4", series: "FA", torqueNm: 373, maxRPM: 3750, boreDiameterMin: 45, boreDiameterMax: 68 },
  { model: "FA 5", series: "FA", torqueNm: 755, maxRPM: 3000, boreDiameterMin: 55, boreDiameterMax: 87 },
  { model: "FA 6", series: "FA", torqueNm: 1059, maxRPM: 3000, boreDiameterMin: 70, boreDiameterMax: 90 },
  { model: "FA 7", series: "FA", torqueNm: 2030, maxRPM: 2500, boreDiameterMin: 75, boreDiameterMax: 112 },
  { model: "FA 8", series: "FA", torqueNm: 2599, maxRPM: 2300, boreDiameterMin: 87, boreDiameterMax: 125 },
  { model: "FA 9", series: "FA", torqueNm: 7063, maxRPM: 1800, boreDiameterMin: 118, boreDiameterMax: 160 },
  { model: "FA 10", series: "FA", torqueNm: 11821, maxRPM: 1500, boreDiameterMin: 143, boreDiameterMax: 180 },
  { model: "FA 11", series: "FA", torqueNm: 21915, maxRPM: 1200, boreDiameterMin: 175, boreDiameterMax: 220 }
];

// FA/D Series - With Spacer (same torque capacity as FA)
export const FAD_SERIES: CouplingModel[] = [
  { model: "FA 1 D", series: "FA/D", torqueNm: 29, maxRPM: 3750, boreDiameterMin: 15, boreDiameterMax: 28 },
  { model: "FA 2 D", series: "FA/D", torqueNm: 44, maxRPM: 3750, boreDiameterMin: 24, boreDiameterMax: 36 },
  { model: "FA 3 D", series: "FA/D", torqueNm: 89, maxRPM: 3750, boreDiameterMin: 32, boreDiameterMax: 48 },
  { model: "FA 4 D", series: "FA/D", torqueNm: 373, maxRPM: 3750, boreDiameterMin: 45, boreDiameterMax: 68 },
  { model: "FA 5 D", series: "FA/D", torqueNm: 755, maxRPM: 3000, boreDiameterMin: 55, boreDiameterMax: 87 },
  { model: "FA 6 D", series: "FA/D", torqueNm: 1059, maxRPM: 3000, boreDiameterMin: 70, boreDiameterMax: 90 },
  { model: "FA 7 D", series: "FA/D", torqueNm: 2030, maxRPM: 2500, boreDiameterMin: 75, boreDiameterMax: 112 },
  { model: "FA 8 D", series: "FA/D", torqueNm: 2599, maxRPM: 2300, boreDiameterMin: 87, boreDiameterMax: 125 },
  { model: "FA 9 D", series: "FA/D", torqueNm: 7063, maxRPM: 1800, boreDiameterMin: 118, boreDiameterMax: 160 },
  { model: "FA 10 D", series: "FA/D", torqueNm: 11821, maxRPM: 1500, boreDiameterMin: 143, boreDiameterMax: 180 },
  { model: "FA 11 D", series: "FA/D", torqueNm: 21915, maxRPM: 1200, boreDiameterMin: 175, boreDiameterMax: 220 }
];

// FA/C Series - With Cardan
export const FAC_SERIES: CouplingModel[] = [
  { model: "FA 4 C", series: "FA/C", torqueNm: 373, maxRPM: 124, boreDiameterMin: 40, boreDiameterMax: 50 },
  { model: "FA 5 C", series: "FA/C", torqueNm: 755, maxRPM: 150, boreDiameterMin: 53, boreDiameterMax: 65 },
  { model: "FA 6 C", series: "FA/C", torqueNm: 1059, maxRPM: 168, boreDiameterMin: 60, boreDiameterMax: 65 },
  { model: "FA 7 C", series: "FA/C", torqueNm: 2030, maxRPM: 212, boreDiameterMin: 60, boreDiameterMax: 95 },
  { model: "FA 8 C", series: "FA/C", torqueNm: 2599, maxRPM: 235, boreDiameterMin: 80, boreDiameterMax: 95 },
  { model: "FA 9 C", series: "FA/C", torqueNm: 7063, maxRPM: 287, boreDiameterMin: 100, boreDiameterMax: 120 },
  { model: "FA 10 C", series: "FA/C", torqueNm: 11821, maxRPM: 355, boreDiameterMin: 120, boreDiameterMax: 155 },
  { model: "FA 11 C", series: "FA/C", torqueNm: 21915, maxRPM: 435, boreDiameterMin: 140, boreDiameterMax: 185 }
];

// FA/FUS Series - With Fusible Protection
export const FAFUS_SERIES: CouplingModel[] = [
  { model: "FA 3 FUS", series: "FA/FUS", torqueNm: 89, maxRPM: 3750, boreDiameterMin: 35, boreDiameterMax: 94 },
  { model: "FA 4 FUS", series: "FA/FUS", torqueNm: 373, maxRPM: 3750, boreDiameterMin: 50, boreDiameterMax: 124 },
  { model: "FA 5 FUS", series: "FA/FUS", torqueNm: 755, maxRPM: 3000, boreDiameterMin: 60, boreDiameterMax: 150 },
  { model: "FA 6 FUS", series: "FA/FUS", torqueNm: 1059, maxRPM: 3000, boreDiameterMin: 75, boreDiameterMax: 168 },
  { model: "FA 7 FUS", series: "FA/FUS", torqueNm: 2030, maxRPM: 2500, boreDiameterMin: 80, boreDiameterMax: 212 },
  { model: "FA 8 FUS", series: "FA/FUS", torqueNm: 2599, maxRPM: 2300, boreDiameterMin: 100, boreDiameterMax: 235 },
  { model: "FA 9 FUS", series: "FA/FUS", torqueNm: 7063, maxRPM: 1800, boreDiameterMin: 110, boreDiameterMax: 287 },
  { model: "FA 10 FUS", series: "FA/FUS", torqueNm: 11821, maxRPM: 1500, boreDiameterMin: 130, boreDiameterMax: 355 },
  { model: "FA 11 FUS", series: "FA/FUS", torqueNm: 21915, maxRPM: 1200, boreDiameterMin: 150, boreDiameterMax: 435 }
];

// FAS NG Series - New Generation
export const FASNG_SERIES: CouplingModel[] = [
  { model: "FAS NG 2", series: "FAS NG", torqueNm: 250, maxRPM: 5000, boreDiameterMin: 35, boreDiameterMax: 58 },
  { model: "FAS NG 3", series: "FAS NG", torqueNm: 470, maxRPM: 3500, boreDiameterMin: 45, boreDiameterMax: 78 },
  { model: "FAS NG 4", series: "FAS NG", torqueNm: 1106, maxRPM: 3600, boreDiameterMin: 60, boreDiameterMax: 96 },
  { model: "FAS NG 5", series: "FAS NG", torqueNm: 2650, maxRPM: 2500, boreDiameterMin: 75, boreDiameterMax: 115 },
  { model: "FAS NG 6", series: "FAS NG", torqueNm: 3200, maxRPM: 2500, boreDiameterMin: 85, boreDiameterMax: 130 },
  { model: "FAS NG 7", series: "FAS NG", torqueNm: 6300, maxRPM: 2200, boreDiameterMin: 95, boreDiameterMax: 143 },
  { model: "FAS NG 8", series: "FAS NG", torqueNm: 7800, maxRPM: 2000, boreDiameterMin: 110, boreDiameterMax: 165 },
  { model: "FAS NG 9", series: "FAS NG", torqueNm: 13000, maxRPM: 1600, boreDiameterMin: 120, boreDiameterMax: 193 },
  { model: "FAS NG 10", series: "FAS NG", torqueNm: 45000, maxRPM: 1300, boreDiameterMin: 180, boreDiameterMax: 280 },
  { model: "FAS NG 11", series: "FAS NG", torqueNm: 65000, maxRPM: 1200, boreDiameterMin: 200, boreDiameterMax: 290 },
  { model: "FAS NG 12", series: "FAS NG", torqueNm: 100000, maxRPM: 1100, boreDiameterMin: 230, boreDiameterMax: 350 },
  { model: "FAS NG 14", series: "FAS NG", torqueNm: 150000, maxRPM: 950, boreDiameterMin: 260, boreDiameterMax: 400 },
  { model: "FAS NG 16", series: "FAS NG", torqueNm: 320000, maxRPM: 890, boreDiameterMin: 290, boreDiameterMax: 450 },
  { model: "FAS NG 18", series: "FAS NG", torqueNm: 400000, maxRPM: 810, boreDiameterMin: 320, boreDiameterMax: 500 }
];

// FAS NG LP Series - Large Power
export const FASNGLP_SERIES: CouplingModel[] = [
  { model: "FAS NG 7 LP", series: "FAS NG-LP", torqueNm: 8400, maxRPM: 2200, boreDiameterMin: 90, boreDiameterMax: 145 },
  { model: "FAS NG 8 LP", series: "FAS NG-LP", torqueNm: 11500, maxRPM: 2000, boreDiameterMin: 100, boreDiameterMax: 155 },
  { model: "FAS NG 9 LP", series: "FAS NG-LP", torqueNm: 20000, maxRPM: 1800, boreDiameterMin: 120, boreDiameterMax: 190 },
  { model: "FAS NG 9 LP", series: "FAS NG-LP", torqueNm: 25000, maxRPM: 1500, boreDiameterMin: 130, boreDiameterMax: 195 },
  { model: "FAS NG 10 LP", series: "FAS NG-LP", torqueNm: 50000, maxRPM: 1300, boreDiameterMin: 180, boreDiameterMax: 290 },
  { model: "FAS NG 11 LP", series: "FAS NG-LP", torqueNm: 72000, maxRPM: 1200, boreDiameterMin: 200, boreDiameterMax: 300 },
  { model: "FAS NG 12 LP", series: "FAS NG-LP", torqueNm: 105000, maxRPM: 1100, boreDiameterMin: 230, boreDiameterMax: 350 },
  { model: "FAS NG 14 LP", series: "FAS NG-LP", torqueNm: 195000, maxRPM: 1000, boreDiameterMin: 260, boreDiameterMax: 400 },
  { model: "FAS NG 16 LP", series: "FAS NG-LP", torqueNm: 380000, maxRPM: 890, boreDiameterMin: 290, boreDiameterMax: 450 },
  { model: "FAS NG 18 LP", series: "FAS NG-LP", torqueNm: 450000, maxRPM: 810, boreDiameterMin: 330, boreDiameterMax: 500 },
  { model: "FAS NG 20 LP", series: "FAS NG-LP", torqueNm: 685000, maxRPM: 780, boreDiameterMin: 360, boreDiameterMax: 550 },
  { model: "FAS NG 22 LP", series: "FAS NG-LP", torqueNm: 1100000, maxRPM: 750, boreDiameterMin: 420, boreDiameterMax: 600 }
];

// Combine all series for easy searching
export const ALL_COUPLINGS: CouplingModel[] = [
  ...FA_SERIES,
  ...FAD_SERIES,
  ...FAC_SERIES,
  ...FAFUS_SERIES,
  ...FASNG_SERIES,
  ...FASNGLP_SERIES
];

/**
 * Finds the appropriate coupling model based on required torque and shaft diameter
 * @param requiredTorqueNm - The required torque in Nm
 * @param shaftDiameter - The maximum shaft diameter in mm
 * @param needsSpacerDBSE - Whether a spacer is required
 * @param needsFusible - Whether fusible protection is required
 * @param rpm - Operating RPM
 * @returns The selected coupling model or null if none found
 */
export function selectCoupling(
  requiredTorqueNm: number,
  shaftDiameter: number,
  needsSpacerDBSE: boolean = false,
  needsFusible: boolean = false,
  rpm: number = 1500
): CouplingModel | null {
  
  // Determine which series to search based on requirements
  let seriesToSearch: CouplingModel[] = [];
  
  if (needsFusible) {
    seriesToSearch = FAFUS_SERIES;
  } else if (needsSpacerDBSE) {
    seriesToSearch = FAD_SERIES;
  } else if (requiredTorqueNm > 100000) {
    // For very high torque, use FAS NG LP series
    seriesToSearch = FASNGLP_SERIES;
  } else if (requiredTorqueNm > 20000) {
    // For high torque, use FAS NG series
    seriesToSearch = FASNG_SERIES;
  } else {
    // Standard FA series for normal applications
    seriesToSearch = FA_SERIES;
  }
  
  // Find the coupling with adequate torque capacity and shaft bore
  const suitableCouplings = seriesToSearch.filter(coupling => 
    coupling.torqueNm >= requiredTorqueNm &&
    coupling.boreDiameterMax >= shaftDiameter &&
    coupling.boreDiameterMin <= shaftDiameter &&
    coupling.maxRPM >= rpm
  );
  
  // Return the smallest adequate coupling (most economical)
  if (suitableCouplings.length > 0) {
    return suitableCouplings.sort((a, b) => a.torqueNm - b.torqueNm)[0];
  }
  
  // If no coupling found in preferred series, search all
  const allSuitableCouplings = ALL_COUPLINGS.filter(coupling => 
    coupling.torqueNm >= requiredTorqueNm &&
    coupling.boreDiameterMax >= shaftDiameter &&
    coupling.boreDiameterMin <= shaftDiameter &&
    coupling.maxRPM >= rpm
  );
  
  if (allSuitableCouplings.length > 0) {
    return allSuitableCouplings.sort((a, b) => a.torqueNm - b.torqueNm)[0];
  }
  
  return null;
}