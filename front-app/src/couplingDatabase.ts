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

// FAS NG Series - New Generation (Based on Tabla II from FUNDAL catalog)
export const FASNG_SERIES: CouplingModel[] = [
  { model: "FAS NG 2", series: "FAS NG", torqueNm: 250, maxRPM: 5000, boreDiameterMin: 0, boreDiameterMax: 35 },
  { model: "FAS NG 3", series: "FAS NG", torqueNm: 470, maxRPM: 3500, boreDiameterMin: 0, boreDiameterMax: 45 },
  { model: "FAS NG 4", series: "FAS NG", torqueNm: 1106, maxRPM: 3500, boreDiameterMin: 0, boreDiameterMax: 60 },
  { model: "FAS NG 5", series: "FAS NG", torqueNm: 2800, maxRPM: 2500, boreDiameterMin: 0, boreDiameterMax: 75 },
  { model: "FAS NG 6", series: "FAS NG", torqueNm: 3200, maxRPM: 2500, boreDiameterMin: 0, boreDiameterMax: 85 },
  { model: "FAS NG 7", series: "FAS NG", torqueNm: 6300, maxRPM: 2200, boreDiameterMin: 0, boreDiameterMax: 95 },
  { model: "FAS NG 8", series: "FAS NG", torqueNm: 7800, maxRPM: 2000, boreDiameterMin: 0, boreDiameterMax: 110 },
  { model: "FAS NG 9 A", series: "FAS NG", torqueNm: 13000, maxRPM: 1800, boreDiameterMin: 45, boreDiameterMax: 120 },
  { model: "FAS NG 9", series: "FAS NG", torqueNm: 20000, maxRPM: 1500, boreDiameterMin: 45, boreDiameterMax: 130 },
  { model: "FAS NG 10", series: "FAS NG", torqueNm: 45000, maxRPM: 1300, boreDiameterMin: 75, boreDiameterMax: 180 },
  { model: "FAS NG 11", series: "FAS NG", torqueNm: 65000, maxRPM: 1200, boreDiameterMin: 85, boreDiameterMax: 200 },
  { model: "FAS NG 12", series: "FAS NG", torqueNm: 100000, maxRPM: 1100, boreDiameterMin: 100, boreDiameterMax: 230 },
  { model: "FAS NG 14", series: "FAS NG", torqueNm: 150000, maxRPM: 1000, boreDiameterMin: 120, boreDiameterMax: 260 },
  { model: "FAS NG 16", series: "FAS NG", torqueNm: 320000, maxRPM: 890, boreDiameterMin: 140, boreDiameterMax: 290 },
  { model: "FAS NG 18", series: "FAS NG", torqueNm: 400000, maxRPM: 810, boreDiameterMin: 160, boreDiameterMax: 320 }
];

// FAS NG H Series - Heavy Duty (Based on FUNDAL catalog table)
export const FASNG_H_SERIES: CouplingModel[] = [
  { model: "FAS NG 7 -H", series: "FAS NG-H", torqueNm: 6300, maxRPM: 2200, boreDiameterMin: 40, boreDiameterMax: 90 },
  { model: "FAS NG 8 -H", series: "FAS NG-H", torqueNm: 7800, maxRPM: 2000, boreDiameterMin: 40, boreDiameterMax: 100 },
  { model: "FAS NG 9 A -H", series: "FAS NG-H", torqueNm: 13000, maxRPM: 1800, boreDiameterMin: 50, boreDiameterMax: 120 },
  { model: "FAS NG 9 -H", series: "FAS NG-H", torqueNm: 20000, maxRPM: 1500, boreDiameterMin: 50, boreDiameterMax: 127 },
  { model: "FAS NG 10 -H", series: "FAS NG-H", torqueNm: 45000, maxRPM: 1300, boreDiameterMin: 100, boreDiameterMax: 180 },
  { model: "FAS NG 11 -H", series: "FAS NG-H", torqueNm: 65000, maxRPM: 1200, boreDiameterMin: 100, boreDiameterMax: 200 },
  { model: "FAS NG 12 -H", series: "FAS NG-H", torqueNm: 100000, maxRPM: 1100, boreDiameterMin: 110, boreDiameterMax: 230 },
  { model: "FAS NG 14 -H", series: "FAS NG-H", torqueNm: 160000, maxRPM: 1000, boreDiameterMin: 150, boreDiameterMax: 260 },
  { model: "FAS NG 16 -H", series: "FAS NG-H", torqueNm: 320000, maxRPM: 890, boreDiameterMin: 150, boreDiameterMax: 290 },
  { model: "FAS NG 18 -H", series: "FAS NG-H", torqueNm: 400000, maxRPM: 810, boreDiameterMin: 180, boreDiameterMax: 330 }
];

// FAS NG LP Series - Large Power (Based on FUNDAL catalog table)
export const FASNGLP_SERIES: CouplingModel[] = [
  { model: "FAS NG 7 LP", series: "FAS NG-LP", torqueNm: 8400, maxRPM: 2200, boreDiameterMin: 40, boreDiameterMax: 90 },
  { model: "FAS NG 8 LP", series: "FAS NG-LP", torqueNm: 11500, maxRPM: 2000, boreDiameterMin: 40, boreDiameterMax: 100 },
  { model: "FAS NG 9 A LP", series: "FAS NG-LP", torqueNm: 20000, maxRPM: 1800, boreDiameterMin: 50, boreDiameterMax: 120 },
  { model: "FAS NG 9 LP", series: "FAS NG-LP", torqueNm: 25000, maxRPM: 1500, boreDiameterMin: 80, boreDiameterMax: 130 },
  { model: "FAS NG 10 LP", series: "FAS NG-LP", torqueNm: 50000, maxRPM: 1300, boreDiameterMin: 90, boreDiameterMax: 180 },
  { model: "FAS NG 11 LP", series: "FAS NG-LP", torqueNm: 72000, maxRPM: 1200, boreDiameterMin: 100, boreDiameterMax: 200 },
  { model: "FAS NG 12 LP", series: "FAS NG-LP", torqueNm: 105000, maxRPM: 1100, boreDiameterMin: 110, boreDiameterMax: 230 },
  { model: "FAS NG 14 LP", series: "FAS NG-LP", torqueNm: 195000, maxRPM: 1000, boreDiameterMin: 150, boreDiameterMax: 260 },
  { model: "FAS NG 16 LP", series: "FAS NG-LP", torqueNm: 360000, maxRPM: 890, boreDiameterMin: 150, boreDiameterMax: 290 },
  { model: "FAS NG 18 LP", series: "FAS NG-LP", torqueNm: 450000, maxRPM: 810, boreDiameterMin: 180, boreDiameterMax: 330 },
  { model: "FAS NG 20 LP", series: "FAS NG-LP", torqueNm: 685000, maxRPM: 780, boreDiameterMin: 230, boreDiameterMax: 360 },
  { model: "FAS NG 22 LP", series: "FAS NG-LP", torqueNm: 1100000, maxRPM: 750, boreDiameterMin: 250, boreDiameterMax: 420 }
];

// Combine all series for easy searching
export const ALL_COUPLINGS: CouplingModel[] = [
  ...FA_SERIES,
  ...FAD_SERIES,
  ...FAC_SERIES,
  ...FAFUS_SERIES,
  ...FASNG_SERIES,
  ...FASNG_H_SERIES,
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
  
  // Series that use MASA logic (only FA standard series and FA variants that use masa)
  const useMasaLogic = coupling.series === 'FA' || coupling.series === 'FA/D' || 
                       coupling.series === 'FA/FUS';
  
  // All other series (FAS NG, FAS NG-H, FAS NG-LP, FA/C) use bore diameter logic
  if (!useMasaLogic) {
    // Check if bore diameter fields exist and both shafts fit within range
    if (coupling.boreDiameterMin !== undefined && coupling.boreDiameterMax !== undefined) {
      const fits = conductorDiameter >= coupling.boreDiameterMin && 
                   conductorDiameter <= coupling.boreDiameterMax &&
                   conducidoDiameter >= coupling.boreDiameterMin && 
                   conducidoDiameter <= coupling.boreDiameterMax;
      return { isCompatible: fits };
    }
    return { isCompatible: false };
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
 * @param forceFAS - Force FAS series selection (used for Reductor-Aplicacion)
 * @returns The selected coupling model or null if none found
 */
export function selectCoupling(
  requiredTorqueNm: number,
  conductorDiameter: number,
  conducidoDiameter: number,
  needsSpacerDBSE: boolean = false,
  needsFusible: boolean = false,
  rpm: number = 1500,
  forceFAS: boolean = false
): CouplingModel | null {
  
  // Helper function to find compatible coupling in a series
  function findCompatibleInSeries(series: CouplingModel[]): CouplingModel | null {
    // Find couplings with adequate torque capacity and RPM
    const torqueCompatibleCouplings = series.filter(coupling => 
      coupling.torqueNm >= requiredTorqueNm && rpm <= coupling.maxRPM
    );
    
    // Check masa compatibility for each coupling
    const compatibleCouplings = torqueCompatibleCouplings.filter(coupling => {
      const masaCheck = checkMasaCompatibility(coupling, conductorDiameter, conducidoDiameter);
      if (masaCheck.isCompatible) {
        // Add masa info to coupling for later use
        (coupling as CouplingModel & { recommendedMasaType?: string; recommendedMasaCode?: string }).recommendedMasaType = masaCheck.masaType;
        (coupling as CouplingModel & { recommendedMasaType?: string; recommendedMasaCode?: string }).recommendedMasaCode = masaCheck.masaCode;
        return true;
      }
      return false;
    });
    
    // Return the smallest adequate coupling (most economical)
    if (compatibleCouplings.length > 0) {
      return compatibleCouplings.sort((a, b) => a.torqueNm - b.torqueNm)[0];
    }
    
    return null;
  }
  
  // Priority order: try FA first, then move up the series hierarchy only if needed
  
  // Special cases first (override the normal hierarchy)
  if (needsFusible) {
    return findCompatibleInSeries(FAFUS_SERIES);
  } 
  
  if (needsSpacerDBSE) {
    return findCompatibleInSeries(FAD_SERIES);
  }
  
  // If forceFAS is true (for Reductor-Aplicacion), prioritize FAS series
  if (forceFAS) {
    console.log('Force FAS mode - Checking FAS NG series first...');
    let result = findCompatibleInSeries(FASNG_SERIES);
    if (result) return result;
    
    // If FAS NG doesn't work, try FAS NG-H
    result = findCompatibleInSeries(FASNG_H_SERIES);
    if (result) return result;
    
    // If FAS NG-H doesn't work, try FAS NG-LP
    result = findCompatibleInSeries(FASNGLP_SERIES);
    if (result) return result;
    
    // If no FAS series work, fall back to FA series as last resort
    console.log('FAS series not suitable, falling back to FA series...');
    result = findCompatibleInSeries(FA_SERIES);
    if (result) return result;
    
    // Last resort: try cardan series (FA/C)
    result = findCompatibleInSeries(FAC_SERIES);
    if (result) return result;
  } else {
    // Normal hierarchy: FA -> FAS NG -> FAS NG-H -> FAS NG-LP
    // But below 1500 RPM, skip FA series in recommendations
    
    if (rpm >= 1500) {
      // 1. Try FA series first (most economical) - only for RPM >= 1500
      console.log('Checking FA series...');
      let result = findCompatibleInSeries(FA_SERIES);
      if (result) return result;
    }
    
    // 2. Try FAS NG series
    console.log('Checking FAS NG series...');
    let result = findCompatibleInSeries(FASNG_SERIES);
    if (result) return result;
    
    // 3. Try FAS NG-H series (Heavy Duty variant)
    result = findCompatibleInSeries(FASNG_H_SERIES);
    if (result) return result;
    
    // 4. Try FAS NG-LP series (Large Power for highest torque requirements)
    result = findCompatibleInSeries(FASNGLP_SERIES);
    if (result) return result;
    
    // 5. Last resort: try cardan series (FA/C)
    result = findCompatibleInSeries(FAC_SERIES);
    if (result) return result;
  }
  
  // No suitable coupling found
  return null;
}

/**
 * Finds ALL valid coupling options across different series based on requirements
 * Returns detailed information about each valid option for user selection
 */
export interface CouplingOption {
  model: CouplingModel;
  factorServicioResultante: number;
  masaType?: string;
  masaCode?: string;
  minShaftDiameter: number;
  maxShaftDiameter: number;
  maxRPM: number;
  maxTorqueNm: number;
  series: string;
  couplingCode?: string;
}

export function findAllValidCouplings(
  requiredTorqueNm: number,
  nominalTorqueNm: number, // Equipment nominal torque for FS calculation
  conductorDiameter: number,
  conducidoDiameter: number,
  needsSpacerDBSE: boolean = false,
  needsFusible: boolean = false,
  rpm: number = 1500,
  forceFAS: boolean = false,
  userDBSE?: string
): CouplingOption[] {
  const allOptions: CouplingOption[] = [];
  
  // Helper function to process compatible couplings in a series
  function addCompatibleFromSeries(series: CouplingModel[], seriesName: string) {
    // Find couplings with adequate torque capacity and RPM
    const torqueCompatibleCouplings = series.filter(coupling => 
      coupling.torqueNm >= requiredTorqueNm && rpm <= coupling.maxRPM
    );
    
    // Check compatibility and collect all valid options
    const validCouplings: Array<{coupling: CouplingModel, masaCheck: any}> = [];
    
    torqueCompatibleCouplings.forEach(coupling => {
      const masaCheck = checkMasaCompatibility(coupling, conductorDiameter, conducidoDiameter);
      if (masaCheck.isCompatible) {
        validCouplings.push({ coupling, masaCheck });
      }
    });
    
    // Sort by torque (most economical first) and take only the first one (most economical)
    validCouplings.sort((a, b) => a.coupling.torqueNm - b.coupling.torqueNm);
    
    // Add only the most economical option for this series
    if (validCouplings.length > 0) {
      const { coupling, masaCheck } = validCouplings[0]; // Take the most economical
      
      // Calculate resultant service factor
      const factorServicioResultante = coupling.torqueNm / nominalTorqueNm;
      
      // Determine min/max shaft diameters
      let minShaft = 0;
      let maxShaft = 0;
      
      if (coupling.series === 'FA' || coupling.series === 'FA/D' || coupling.series === 'FA/FUS') {
        // For FA series, use masa ranges
        minShaft = Math.min(
          coupling.masaConvencionalMin || 0,
          coupling.masaLlenaMin || 0
        );
        maxShaft = Math.max(
          coupling.masaConvencionalMax || 0,
          coupling.masaLlenaMax || 0
        );
      } else {
        // For other series, use bore diameter
        minShaft = coupling.boreDiameterMin || 0;
        maxShaft = coupling.boreDiameterMax || 0;
      }
      
      // Generate coupling code
      let couplingCode = coupling.model;
      if (coupling.series === 'FA/FUS') {
        const modelNumber = coupling.model.match(/\d+/)?.[0];
        couplingCode = `FA ${modelNumber} / FUS ${masaCheck.masaCode || ''}`;
      } else if (coupling.series === 'FA/D' && userDBSE) {
        const modelNumber = coupling.model.match(/\d+/)?.[0];
        couplingCode = `FA ${modelNumber} / D ${userDBSE} ${masaCheck.masaCode || ''}`;
      } else if (coupling.series === 'FA') {
        const modelNumber = coupling.model.match(/\d+/)?.[0];
        couplingCode = `FA ${modelNumber} ${masaCheck.masaCode || ''}`;
      }
      
      allOptions.push({
        model: coupling,
        factorServicioResultante: Math.round(factorServicioResultante * 100) / 100,
        masaType: masaCheck.masaType,
        masaCode: masaCheck.masaCode,
        minShaftDiameter: minShaft,
        maxShaftDiameter: maxShaft,
        maxRPM: coupling.maxRPM,
        maxTorqueNm: coupling.torqueNm,
        series: seriesName,
        couplingCode: couplingCode.trim()
      });
    }
  }
  
  // Apply restrictions based on configuration
  if (needsFusible) {
    // If fusible is required, only FA/FUS series
    addCompatibleFromSeries(FAFUS_SERIES, 'FA con Fusible');
  } else if (needsSpacerDBSE) {
    // If spacer is required, only FA/D series
    addCompatibleFromSeries(FAD_SERIES, 'FA con Distanciador');
  } else if (forceFAS) {
    // For reductor-application, prioritize FAS series but show all
    addCompatibleFromSeries(FASNG_SERIES, 'FAS Nueva Generación');
    addCompatibleFromSeries(FASNG_H_SERIES, 'FAS NG Heavy Duty');
    addCompatibleFromSeries(FASNGLP_SERIES, 'FAS NG Large Power');
    // Note: FA series typically not recommended for reductor-application but can be shown as fallback
  } else {
    // Normal case: show all applicable series
    addCompatibleFromSeries(FA_SERIES, 'FA Estándar');
    addCompatibleFromSeries(FASNG_SERIES, 'FAS Nueva Generación');
    addCompatibleFromSeries(FASNG_H_SERIES, 'FAS NG Heavy Duty');
    addCompatibleFromSeries(FASNGLP_SERIES, 'FAS NG Large Power');
    addCompatibleFromSeries(FAC_SERIES, 'FA con Cardán');
  }
  
  // Sort options by series preference and then by torque (most economical first)
  const seriesOrder = forceFAS 
    ? ['FAS Nueva Generación', 'FAS NG Heavy Duty', 'FAS NG Large Power', 'FA Estándar', 'FA con Cardán']
    : rpm < 1500
      ? ['FAS Nueva Generación', 'FAS NG Heavy Duty', 'FAS NG Large Power', 'FA Estándar', 'FA con Cardán'] // Prioritize FAS for low RPM
      : ['FA Estándar', 'FAS Nueva Generación', 'FAS NG Heavy Duty', 'FAS NG Large Power', 'FA con Cardán']; // Normal priority
  
  allOptions.sort((a, b) => {
    const aIndex = seriesOrder.indexOf(a.series);
    const bIndex = seriesOrder.indexOf(b.series);
    if (aIndex !== bIndex) return aIndex - bIndex;
    return a.maxTorqueNm - b.maxTorqueNm; // Within same series, sort by torque
  });
  
  return allOptions;
}