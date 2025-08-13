// FUNDAL Coupling Database based on 2025 Catalog
export interface CouplingModel {
  model: string;
  series: string;
  torqueNm: number;
  maxRPM: number;
  // For FA models - only masa types matter, no overall bore diameter
  masaConvencionalMin?: number;
  masaConvencionalMax?: number;
  masaLlenaMin?: number;
  masaLlenaMax?: number;
  // For FA/D models - available DBSE values
  availableDBSE?: number[];
  // Selected DBSE value for this specific coupling instance
  selectedDBSE?: number;
  // Legacy fields for non-FA series compatibility
  boreDiameterMin?: number;
  boreDiameterMax?: number;
  weight?: number;
}

// FA Series - Standard Couplings
// Based on cleaned CSV data from FUNDAL catalog - ONLY masa types matter
export const FA_SERIES: CouplingModel[] = [
  { 
    model: "FA 1", series: "FA", torqueNm: 29, maxRPM: 3750,
    masaConvencionalMin: 0, masaConvencionalMax: 15,
    masaLlenaMin: 0, masaLlenaMax: 28
  },
  { 
    model: "FA 2", series: "FA", torqueNm: 44, maxRPM: 3750,
    masaConvencionalMin: 0, masaConvencionalMax: 24,
    masaLlenaMin: 0, masaLlenaMax: 36
  },
  { 
    model: "FA 3", series: "FA", torqueNm: 89, maxRPM: 3750,
    masaConvencionalMin: 0, masaConvencionalMax: 32,
    masaLlenaMin: 0, masaLlenaMax: 48
  },
  { 
    model: "FA 4", series: "FA", torqueNm: 373, maxRPM: 3750,
    masaConvencionalMin: 0, masaConvencionalMax: 45,
    masaLlenaMin: 0, masaLlenaMax: 68
  },
  { 
    model: "FA 5", series: "FA", torqueNm: 755, maxRPM: 3000,
    masaConvencionalMin: 0, masaConvencionalMax: 55,
    masaLlenaMin: 0, masaLlenaMax: 87
  },
  { 
    model: "FA 6", series: "FA", torqueNm: 1059, maxRPM: 3000,
    masaConvencionalMin: 0, masaConvencionalMax: 70,
    masaLlenaMin: 0, masaLlenaMax: 90
  },
  { 
    model: "FA 7", series: "FA", torqueNm: 2030, maxRPM: 2500,
    masaConvencionalMin: 30, masaConvencionalMax: 75,
    masaLlenaMin: 40, masaLlenaMax: 112
  },
  { 
    model: "FA 8", series: "FA", torqueNm: 2599, maxRPM: 2300,
    masaConvencionalMin: 35, masaConvencionalMax: 87,
    masaLlenaMin: 80, masaLlenaMax: 125
  },
  { 
    model: "FA 9", series: "FA", torqueNm: 7063, maxRPM: 1800,
    masaConvencionalMin: 40, masaConvencionalMax: 118,
    masaLlenaMin: 100, masaLlenaMax: 160
  },
  { 
    model: "FA 10", series: "FA", torqueNm: 11821, maxRPM: 1500,
    masaConvencionalMin: 60, masaConvencionalMax: 143,
    masaLlenaMin: 110, masaLlenaMax: 180
  },
  { 
    model: "FA 11", series: "FA", torqueNm: 21915, maxRPM: 1200,
    masaConvencionalMin: 80, masaConvencionalMax: 175,
    masaLlenaMin: 150, masaLlenaMax: 220
  }
];

// FA/D Series - With Spacer (same masa ranges as FA) + available DBSE values
export const FAD_SERIES: CouplingModel[] = [
  { 
    model: "FA 1 D", series: "FA/D", torqueNm: 29, maxRPM: 3750,
    masaConvencionalMin: 0, masaConvencionalMax: 15,
    masaLlenaMin: 0, masaLlenaMax: 28,
    availableDBSE: [70, 90, 100, 130, 150]
  },
  { 
    model: "FA 2 D", series: "FA/D", torqueNm: 44, maxRPM: 3750,
    masaConvencionalMin: 0, masaConvencionalMax: 24,
    masaLlenaMin: 0, masaLlenaMax: 36,
    availableDBSE: [70, 90, 100, 130, 140, 150]
  },
  { 
    model: "FA 3 D", series: "FA/D", torqueNm: 89, maxRPM: 3750,
    masaConvencionalMin: 0, masaConvencionalMax: 32,
    masaLlenaMin: 0, masaLlenaMax: 48,
    availableDBSE: [90, 100, 130, 140, 150]
  },
  { 
    model: "FA 4 D", series: "FA/D", torqueNm: 373, maxRPM: 3750,
    masaConvencionalMin: 0, masaConvencionalMax: 45,
    masaLlenaMin: 0, masaLlenaMax: 68,
    availableDBSE: [100, 130, 140, 150, 180, 220]
  },
  { 
    model: "FA 5 D", series: "FA/D", torqueNm: 755, maxRPM: 3000,
    masaConvencionalMin: 0, masaConvencionalMax: 55,
    masaLlenaMin: 0, masaLlenaMax: 87,
    availableDBSE: [100, 130, 140, 150, 180, 200, 220]
  },
  { 
    model: "FA 6 D", series: "FA/D", torqueNm: 1059, maxRPM: 3000,
    masaConvencionalMin: 0, masaConvencionalMax: 70,
    masaLlenaMin: 0, masaLlenaMax: 90,
    availableDBSE: [130, 140, 180, 200, 220, 250]
  },
  { 
    model: "FA 7 D", series: "FA/D", torqueNm: 2030, maxRPM: 2500,
    masaConvencionalMin: 30, masaConvencionalMax: 75,
    masaLlenaMin: 40, masaLlenaMax: 112,
    availableDBSE: [130, 140, 180, 200, 250]
  },
  { 
    model: "FA 8 D", series: "FA/D", torqueNm: 2599, maxRPM: 2300,
    masaConvencionalMin: 35, masaConvencionalMax: 87,
    masaLlenaMin: 80, masaLlenaMax: 125,
    availableDBSE: [140, 200, 250]
  },
  { 
    model: "FA 9 D", series: "FA/D", torqueNm: 7063, maxRPM: 1800,
    masaConvencionalMin: 40, masaConvencionalMax: 118,
    masaLlenaMin: 100, masaLlenaMax: 160,
    availableDBSE: [250]
  },
  { 
    model: "FA 10 D", series: "FA/D", torqueNm: 11821, maxRPM: 1500,
    masaConvencionalMin: 60, masaConvencionalMax: 143,
    masaLlenaMin: 110, masaLlenaMax: 180,
    availableDBSE: [] // No values shown in table
  },
  { 
    model: "FA 11 D", series: "FA/D", torqueNm: 21915, maxRPM: 1200,
    masaConvencionalMin: 80, masaConvencionalMax: 175,
    masaLlenaMin: 150, masaLlenaMax: 220,
    availableDBSE: [] // No values shown in table
  }
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

// FA/FUS Series - With Fusible Protection (same masa ranges as FA)
export const FAFUS_SERIES: CouplingModel[] = [
  { 
    model: "FA 3 FUS", series: "FA/FUS", torqueNm: 89, maxRPM: 3750,
    masaConvencionalMin: 0, masaConvencionalMax: 32,
    masaLlenaMin: 0, masaLlenaMax: 48
  },
  { 
    model: "FA 4 FUS", series: "FA/FUS", torqueNm: 373, maxRPM: 3750,
    masaConvencionalMin: 0, masaConvencionalMax: 45,
    masaLlenaMin: 0, masaLlenaMax: 68
  },
  { 
    model: "FA 5 FUS", series: "FA/FUS", torqueNm: 755, maxRPM: 3000,
    masaConvencionalMin: 0, masaConvencionalMax: 55,
    masaLlenaMin: 0, masaLlenaMax: 87
  },
  { 
    model: "FA 6 FUS", series: "FA/FUS", torqueNm: 1059, maxRPM: 3000,
    masaConvencionalMin: 0, masaConvencionalMax: 70,
    masaLlenaMin: 0, masaLlenaMax: 90
  },
  { 
    model: "FA 7 FUS", series: "FA/FUS", torqueNm: 2030, maxRPM: 2500,
    masaConvencionalMin: 30, masaConvencionalMax: 75,
    masaLlenaMin: 40, masaLlenaMax: 112
  },
  { 
    model: "FA 8 FUS", series: "FA/FUS", torqueNm: 2599, maxRPM: 2300,
    masaConvencionalMin: 35, masaConvencionalMax: 87,
    masaLlenaMin: 80, masaLlenaMax: 125
  },
  { 
    model: "FA 9 FUS", series: "FA/FUS", torqueNm: 7063, maxRPM: 1800,
    masaConvencionalMin: 40, masaConvencionalMax: 118,
    masaLlenaMin: 100, masaLlenaMax: 160
  },
  { 
    model: "FA 10 FUS", series: "FA/FUS", torqueNm: 11821, maxRPM: 1500,
    masaConvencionalMin: 60, masaConvencionalMax: 143,
    masaLlenaMin: 110, masaLlenaMax: 180
  },
  { 
    model: "FA 11 FUS", series: "FA/FUS", torqueNm: 21915, maxRPM: 1200,
    masaConvencionalMin: 80, masaConvencionalMax: 175,
    masaLlenaMin: 150, masaLlenaMax: 220
  }
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
 * Checks if shaft diameters can fit in a coupling using any masa combination
 * @param coupling - The coupling to check
 * @param conductorDiameter - Conductor shaft diameter
 * @param conducidoDiameter - Conducido shaft diameter
 * @returns Object with compatibility info and masa type recommendation
 */
function checkMasaCompatibility(
  coupling: CouplingModel, 
  conductorDiameter: number, 
  conducidoDiameter: number
): { isCompatible: boolean; masaType?: string; masaCode?: string } {
  
  // For non-FA series, use the existing bore range
  if (!coupling.series.startsWith('FA') || coupling.series === 'FA/C') {
    const fits = coupling.boreDiameterMin && coupling.boreDiameterMax &&
                 conductorDiameter >= coupling.boreDiameterMin && 
                 conductorDiameter <= coupling.boreDiameterMax &&
                 conducidoDiameter >= coupling.boreDiameterMin && 
                 conducidoDiameter <= coupling.boreDiameterMax;
    return { isCompatible: fits || false };
  }
  
  // For FA series, ONLY check masa ranges (no overall bore diameter)
  const convMin = coupling.masaConvencionalMin || 0;
  const convMax = coupling.masaConvencionalMax || 0;
  const llenaMin = coupling.masaLlenaMin || 0;
  const llenaMax = coupling.masaLlenaMax || 0;
  
  // Check what fits where
  const conductorFitsConv = conductorDiameter >= convMin && conductorDiameter <= convMax;
  const conducidoFitsConv = conducidoDiameter >= convMin && conducidoDiameter <= convMax;
  const conductorFitsLlena = conductorDiameter >= llenaMin && conductorDiameter <= llenaMax;
  const conducidoFitsLlena = conducidoDiameter >= llenaMin && conducidoDiameter <= llenaMax;
  
  // Priority 1: Both shafts fit in masa convencional (most economical)
  if (conductorFitsConv && conducidoFitsConv) {
    return { 
      isCompatible: true, 
      masaType: "Dos masas convencionales",
      masaCode: "/ 1" 
    };
  }
  
  // Priority 2: Use mix of convencional and llena when possible (more economical than 2 llenas)
  if ((conductorFitsConv && conducidoFitsLlena) || (conducidoFitsConv && conductorFitsLlena)) {
    return { 
      isCompatible: true, 
      masaType: "Una masa convencional y una masa llena",
      masaCode: "/ 3" 
    };
  }
  
  // Priority 3: Both shafts fit in masa llena (least economical but sometimes necessary)
  if (conductorFitsLlena && conducidoFitsLlena) {
    return { 
      isCompatible: true, 
      masaType: "Dos masas llenas",
      masaCode: "/ 2" 
    };
  }
  
  return { isCompatible: false };
}

/**
 * Finds the appropriate coupling model based on required torque and shaft diameters
 * @param requiredTorqueNm - The required torque in Nm
 * @param conductorDiameter - Conductor shaft diameter in mm
 * @param conducidoDiameter - Conducido shaft diameter in mm
 * @param needsSpacerDBSE - Whether a spacer is required
 * @param needsFusible - Whether fusible protection is required
 * @param rpm - Operating RPM
 * @returns The selected coupling model or null if none found
 */
export function selectCoupling(
  requiredTorqueNm: number,
  conductorDiameter: number,
  conducidoDiameter: number,
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
  
  // Find couplings with adequate torque capacity and RPM
  const torqueCompatibleCouplings = seriesToSearch.filter(coupling => 
    coupling.torqueNm >= requiredTorqueNm && coupling.maxRPM >= rpm
  );
  
  // Check masa compatibility for each coupling
  const compatibleCouplings = torqueCompatibleCouplings.filter(coupling => {
    const masaCheck = checkMasaCompatibility(coupling, conductorDiameter, conducidoDiameter);
    if (masaCheck.isCompatible) {
      // Add masa info to coupling for later use
      (coupling as any).recommendedMasaType = masaCheck.masaType;
      (coupling as any).recommendedMasaCode = masaCheck.masaCode;
      return true;
    }
    return false;
  });
  
  // Return the smallest adequate coupling (most economical)
  if (compatibleCouplings.length > 0) {
    return compatibleCouplings.sort((a, b) => a.torqueNm - b.torqueNm)[0];
  }
  
  // If no coupling found in preferred series, search all series
  const allTorqueCompatible = ALL_COUPLINGS.filter(coupling => 
    coupling.torqueNm >= requiredTorqueNm && coupling.maxRPM >= rpm
  );
  
  const allCompatibleCouplings = allTorqueCompatible.filter(coupling => {
    const masaCheck = checkMasaCompatibility(coupling, conductorDiameter, conducidoDiameter);
    if (masaCheck.isCompatible) {
      (coupling as any).recommendedMasaType = masaCheck.masaType;
      (coupling as any).recommendedMasaCode = masaCheck.masaCode;
      return true;
    }
    return false;
  });
  
  if (allCompatibleCouplings.length > 0) {
    return allCompatibleCouplings.sort((a, b) => a.torqueNm - b.torqueNm)[0];
  }
  
  return null;
}