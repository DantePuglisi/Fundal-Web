import type { EspecificacionesForm, DistanciadorForm, ReductorForm } from '../interfaces/all_interfaces';
import { selectCoupling, type CouplingModel, findAllValidCouplings, type CouplingOption } from '../couplingDatabase';
import { getImagePath } from './imagePaths';

export interface AcoplamientoResult {
  // Primary recommendation (for backward compatibility)
  id: number;
  name: string;
  image: string;
  factorServicio: number;
  description: string;
  ventajas: string[];
  couplingModel?: CouplingModel;
  calculatedTorqueNm?: number;
  couplingCode?: string;
  masaType?: string;
  
  // All available options for user selection
  allOptions: CouplingOption[];
  
  // For dual coupling configuration (reductor)
  secondCoupling?: {
    name: string;
    image: string;
    factorServicio: number;
    description: string;
    ventajas: string[];
    couplingModel?: CouplingModel;
    calculatedTorqueNm?: number;
    couplingCode?: string;
    masaType?: string;
    allOptions: CouplingOption[]; // All options for second coupling too
  };
  
  // Equipment data for reference
  nominalTorqueNm: number;
  requiredTorqueNm: number;
  rpm: number;
  conductorDiameter: number;
  conducidoDiameter: number;
}

export interface FormData {
  especificaciones: EspecificacionesForm;
  distanciador?: DistanciadorForm;
  reductor?: ReductorForm;
  applicationId?: number;
  subApplication?: string;
  serviceFactor?: number;
}

/**
 * Calculates the most appropriate coupling based on equipment specifications
 * 
 * Simplified logic:
 * 1. Calculate required torque using FUNDAL formula
 * 2. Find smallest coupling where torque > required, RPM > user RPM, shaft sizes match
 * 3. If fuse is required, only select from fuse-capable models
 * 4. If reductor is present, calculate two couplings: motor-reductor and reductor-application
 * 
 * @param data - Form data containing all equipment specifications
 * @returns AcoplamientoResult - The recommended coupling(s) with calculated service factor
 */
export function calculateAcoplamiento(data: FormData): AcoplamientoResult {
  const { especificaciones, serviceFactor, reductor } = data;
  
  // Convert power to HP if needed (kW to HP: multiply by 1.341)
  const powerHP = especificaciones.hp_or_kw 
    ? especificaciones.potencia * 1.341 
    : especificaciones.potencia;
  
  const rpm = parseFloat(especificaciones.velocidad_rpm) || 1500;
  const conductorDiameter = parseFloat(especificaciones.eje_conductor) || 0;
  const conducidoDiameter = parseFloat(especificaciones.eje_conducido) || 0;
  
  // Calculate the resultant service factor based on application and equipment characteristics
  const calculatedServiceFactor = calculateResultantServiceFactor(data);
  const finalServiceFactor = serviceFactor || calculatedServiceFactor;
  
  // Step 1: Calculate nominal torque (equipment torque without service factor)
  // Torque Nominal (Nm) = (7026 × HP) / RPM
  const nominalTorqueNm = (7026 * powerHP) / rpm;
  
  // Step 2: Calculate required torque for coupling selection (with service factor)
  // Required Torque (Nm) = Nominal Torque × FS
  const requiredTorqueNm = nominalTorqueNm * finalServiceFactor;
  
  // Check if reductor is present
  if (especificaciones.reductor && reductor) {
    return calculateDualCouplings(data, powerHP, rpm, nominalTorqueNm, finalServiceFactor, requiredTorqueNm, conductorDiameter, conducidoDiameter);
  }
  
  // Get ALL valid coupling options
  const allOptions = findAllValidCouplings(
    requiredTorqueNm,
    nominalTorqueNm,
    conductorDiameter,
    conducidoDiameter,
    especificaciones.distanciador,
    especificaciones.acople,
    rpm,
    false, // Not forcing FAS for standard coupling
    data.distanciador?.dbse
  );
  
  // Standard single coupling calculation (for primary recommendation)
  const selectedCoupling = selectCoupling(
    requiredTorqueNm,
    conductorDiameter,
    conducidoDiameter,
    especificaciones.distanciador,
    especificaciones.acople, // This is the fuse requirement
    rpm
  );
  
  if (!selectedCoupling && allOptions.length === 0) {
    // No suitable coupling found, return error result
    return {
      id: 0,
      name: "No se encontró acoplamiento adecuado",
      image: getImagePath("/Acoples render/FA.png"),
      factorServicio: finalServiceFactor,
      description: "No se encontró un acoplamiento que cumpla con los requisitos especificados. Por favor, verifique los parámetros ingresados.",
      ventajas: [],
      calculatedTorqueNm: Math.round(requiredTorqueNm * 10) / 10,
      allOptions: [],
      nominalTorqueNm: Math.round(nominalTorqueNm * 10) / 10,
      requiredTorqueNm: Math.round(requiredTorqueNm * 10) / 10,
      rpm: rpm,
      conductorDiameter: conductorDiameter,
      conducidoDiameter: conducidoDiameter
    };
  }
  
  // If we have options but no selected coupling, use the first option
  const finalSelectedCoupling = selectedCoupling || (allOptions.length > 0 ? allOptions[0].model : null);
  if (!finalSelectedCoupling) {
    return {
      id: 0,
      name: "Error en la selección",
      image: getImagePath("/Acoples render/FA.png"),
      factorServicio: finalServiceFactor,
      description: "Error al procesar la selección del acoplamiento.",
      ventajas: [],
      calculatedTorqueNm: Math.round(requiredTorqueNm * 10) / 10,
      allOptions: [],
      nominalTorqueNm: Math.round(nominalTorqueNm * 10) / 10,
      requiredTorqueNm: Math.round(requiredTorqueNm * 10) / 10,
      rpm: rpm,
      conductorDiameter: conductorDiameter,
      conducidoDiameter: conducidoDiameter
    };
  }
  
  // Step 3: Calculate resultant service factor based on selected coupling
  // FS Resultante = Torque Max Acoplamiento / Torque Nominal Equipo
  const resultantServiceFactor = finalSelectedCoupling.torqueNm / nominalTorqueNm;
  
  // Step 4: Generate coupling code based on catalog format
  const couplingCode = generateCouplingCode(finalSelectedCoupling, data);
  
  // Determine coupling type and characteristics
  const couplingDetails = getCouplingDetails(finalSelectedCoupling, especificaciones.acople);
  
  return {
    id: parseInt(finalSelectedCoupling.model.match(/\d+/)?.[0] || '1'),
    name: `${couplingDetails.name} - ${finalSelectedCoupling.model}`,
    image: couplingDetails.image,
    factorServicio: Math.round(resultantServiceFactor * 100) / 100, // Resultant service factor based on selected coupling
    description: couplingDetails.description,
    ventajas: couplingDetails.ventajas,
    couplingModel: finalSelectedCoupling,
    calculatedTorqueNm: Math.round(nominalTorqueNm * 10) / 10, // Show nominal torque (equipment torque)
    couplingCode: couplingCode,
    masaType: (finalSelectedCoupling as { recommendedMasaType?: string }).recommendedMasaType,
    allOptions: allOptions,
    nominalTorqueNm: Math.round(nominalTorqueNm * 10) / 10,
    requiredTorqueNm: Math.round(requiredTorqueNm * 10) / 10,
    rpm: rpm,
    conductorDiameter: conductorDiameter,
    conducidoDiameter: conducidoDiameter
  };
}

/**
 * Calculates dual couplings for reductor configuration
 * First coupling: Motor to Reductor (original RPM, original shaft dimensions)
 * Second coupling: Reductor to Application (reduced RPM, reductor shaft dimensions)
 */
function calculateDualCouplings(
  data: FormData, 
  _powerHP: number, 
  rpm: number, 
  nominalTorqueNm: number, 
  finalServiceFactor: number, 
  requiredTorqueNm: number,
  originalConductorDiameter: number,
  originalConducidoDiameter: number
): AcoplamientoResult {
  const { especificaciones, reductor } = data;
  
  if (!reductor) {
    throw new Error("Reductor data is required for dual coupling calculation");
  }
  
  // Parse reductor data
  // Handle reduction ratio - normalize decimal separator and parse
  const normalizedRatio = reductor.relacion_npm.replace(',', '.');
  const reductionRatio = parseFloat(normalizedRatio) || 1;
  const reductorOutputShaft = parseFloat(reductor.eje_salida) || 0;
  const reductorDrivenShaft = parseFloat(reductor.eje_conducido) || 0;
  const conductorDiameter = parseFloat(especificaciones.eje_conductor) || 0;
  const conducidoDiameter = parseFloat(especificaciones.eje_conducido) || 0;
  
  // First coupling: Motor to Reductor
  // Get ALL valid coupling options for first coupling
  const firstCouplingAllOptions = findAllValidCouplings(
    requiredTorqueNm,
    nominalTorqueNm,
    conductorDiameter,
    conducidoDiameter, // Use original driven shaft diameter, not reductor output
    especificaciones.distanciador,
    false, // Fusible never goes on high-speed (motor-reductor) coupling
    rpm,
    false, // Not forcing FAS for first coupling
    data.distanciador?.dbse
  );
  
  // Uses original motor shaft diameters (motor shaft to reductor input shaft)
  const firstCoupling = selectCoupling(
    requiredTorqueNm,
    conductorDiameter,
    conducidoDiameter, // Use original driven shaft diameter, not reductor output
    especificaciones.distanciador,
    false, // Fusible never goes on high-speed (motor-reductor) coupling
    rpm
  );
  
  if (!firstCoupling && firstCouplingAllOptions.length === 0) {
    return {
      id: 0,
      name: "No se encontró acoplamiento adecuado para Motor-Reductor",
      image: getImagePath("/Acoples render/FA.png"),
      factorServicio: finalServiceFactor,
      description: "No se encontró un acoplamiento que cumpla con los requisitos especificados para la conexión Motor-Reductor.",
      ventajas: [],
      calculatedTorqueNm: Math.round(requiredTorqueNm * 10) / 10,
      allOptions: [],
      nominalTorqueNm: Math.round(nominalTorqueNm * 10) / 10,
      requiredTorqueNm: Math.round(requiredTorqueNm * 10) / 10,
      rpm: rpm,
      conductorDiameter: originalConductorDiameter,
      conducidoDiameter: originalConducidoDiameter
    };
  }
  
  // Second coupling: Reductor to Application
  // Calculate reduced RPM and increased torque
  const reducedRPM = rpm / reductionRatio;
  const increasedTorqueNm = nominalTorqueNm * reductionRatio;
  const requiredTorqueSecond = increasedTorqueNm * finalServiceFactor;
  
  // Second coupling: Reductor to Application
  // Get ALL valid coupling options for second coupling
  const secondCouplingAllOptions = findAllValidCouplings(
    requiredTorqueSecond,
    increasedTorqueNm,
    reductorOutputShaft, // Reductor output shaft (eje_salida)
    reductorDrivenShaft, // Application shaft (eje_conducido del reductor)
    false, // Second coupling typically doesn't have spacer
    especificaciones.acople, // Fusible always goes on low-speed (reductor-application) coupling
    reducedRPM,
    true // Always use FAS for Reductor-Aplicacion
  );
  
  const secondCoupling = selectCoupling(
    requiredTorqueSecond,
    reductorOutputShaft, // Reductor output shaft (eje_salida)
    reductorDrivenShaft, // Application shaft (eje_conducido del reductor)
    false, // Second coupling typically doesn't have spacer
    especificaciones.acople, // Fusible always goes on low-speed (reductor-application) coupling
    reducedRPM,
    true // Always use FAS for Reductor-Aplicacion
  );
  
  if (!secondCoupling && secondCouplingAllOptions.length === 0) {
    return {
      id: 0,
      name: "No se encontró acoplamiento adecuado para Reductor-Aplicación",
      image: getImagePath("/Acoples render/FA.png"),
      factorServicio: finalServiceFactor,
      description: "No se encontró un acoplamiento que cumpla con los requisitos especificados para la conexión Reductor-Aplicación.",
      ventajas: [],
      calculatedTorqueNm: Math.round(requiredTorqueSecond * 10) / 10,
      allOptions: [],
      nominalTorqueNm: Math.round(nominalTorqueNm * 10) / 10,
      requiredTorqueNm: Math.round(requiredTorqueNm * 10) / 10,
      rpm: rpm,
      conductorDiameter: originalConductorDiameter,
      conducidoDiameter: originalConducidoDiameter
    };
  }
  
  // Use first available option if no coupling was selected
  const finalFirstCoupling = firstCoupling || (firstCouplingAllOptions.length > 0 ? firstCouplingAllOptions[0].model : null);
  const finalSecondCoupling = secondCoupling || (secondCouplingAllOptions.length > 0 ? secondCouplingAllOptions[0].model : null);
  
  if (!finalFirstCoupling || !finalSecondCoupling) {
    return {
      id: 0,
      name: "Error en la selección de acoplamientos",
      image: getImagePath("/Acoples render/FA.png"),
      factorServicio: finalServiceFactor,
      description: "Error al procesar la selección de los acoplamientos para configuración dual.",
      ventajas: [],
      calculatedTorqueNm: Math.round(requiredTorqueNm * 10) / 10,
      allOptions: firstCouplingAllOptions,
      nominalTorqueNm: Math.round(nominalTorqueNm * 10) / 10,
      requiredTorqueNm: Math.round(requiredTorqueNm * 10) / 10,
      rpm: rpm,
      conductorDiameter: originalConductorDiameter,
      conducidoDiameter: originalConducidoDiameter
    };
  }
  
  // Calculate service factors for both couplings
  const firstResultantSF = finalFirstCoupling.torqueNm / nominalTorqueNm;
  const secondResultantSF = finalSecondCoupling.torqueNm / increasedTorqueNm;
  
  // Generate codes for both couplings
  const firstCouplingCode = generateCouplingCode(finalFirstCoupling, {
    ...data,
    especificaciones: {
      ...especificaciones,
      acople: false // Fusible never goes on high-speed coupling
    }
  });
  const secondCouplingCode = generateCouplingCode(finalSecondCoupling, {
    ...data,
    especificaciones: {
      ...especificaciones,
      distanciador: false,
      acople: especificaciones.acople // Fusible goes on low-speed coupling
    }
  });
  
  // Get details for both couplings
  const firstCouplingDetails = getCouplingDetails(finalFirstCoupling, false); // High-speed coupling never has fusible
  const secondCouplingDetails = getCouplingDetails(finalSecondCoupling, especificaciones.acople); // Low-speed coupling gets fusible
  
  return {
    id: parseInt(finalFirstCoupling.model.match(/\d+/)?.[0] || '1'),
    name: `${firstCouplingDetails.name} - ${finalFirstCoupling.model} (Motor-Reductor)`,
    image: firstCouplingDetails.image,
    factorServicio: Math.round(firstResultantSF * 100) / 100,
    description: `Configuración dual: ${firstCouplingDetails.description} + ${secondCouplingDetails.description}`,
    ventajas: [
      "Configuración optimizada para sistemas con reductor",
      "Protección completa del tren de transmisión",
      ...firstCouplingDetails.ventajas.slice(0, 2)
    ],
    couplingModel: finalFirstCoupling,
    calculatedTorqueNm: Math.round(nominalTorqueNm * 10) / 10,
    couplingCode: firstCouplingCode,
    masaType: (finalFirstCoupling as { recommendedMasaType?: string }).recommendedMasaType,
    allOptions: firstCouplingAllOptions,
    nominalTorqueNm: Math.round(nominalTorqueNm * 10) / 10,
    requiredTorqueNm: Math.round(requiredTorqueNm * 10) / 10,
    rpm: rpm,
    conductorDiameter: originalConductorDiameter,
    conducidoDiameter: originalConducidoDiameter,
    secondCoupling: {
      name: `${secondCouplingDetails.name} - ${finalSecondCoupling.model} (Reductor-Aplicación)`,
      image: secondCouplingDetails.image,
      factorServicio: Math.round(secondResultantSF * 100) / 100,
      description: secondCouplingDetails.description,
      ventajas: secondCouplingDetails.ventajas,
      couplingModel: finalSecondCoupling,
      calculatedTorqueNm: Math.round(increasedTorqueNm * 10) / 10,
      couplingCode: secondCouplingCode,
      masaType: (finalSecondCoupling as { recommendedMasaType?: string }).recommendedMasaType,
      allOptions: secondCouplingAllOptions
    }
  };
}

/**
 * Calculates the resultant service factor based on application and equipment characteristics
 */
function calculateResultantServiceFactor(data: FormData): number {
  const { especificaciones, applicationId, distanciador } = data;
  
  // Convert power to HP if needed
  const powerHP = especificaciones.hp_or_kw 
    ? especificaciones.potencia * 1.341 
    : especificaciones.potencia;
  
  const rpm = parseFloat(especificaciones.velocidad_rpm) || 1500;
  const conductorDiameter = parseFloat(especificaciones.eje_conductor) || 0;
  const conducidoDiameter = parseFloat(especificaciones.eje_conducido) || 0;
  
  // Start with base factor
  let factor = 1.0;
  
  // Power-based factor
  if (powerHP > 100) factor += 0.3;
  else if (powerHP > 50) factor += 0.2;
  else if (powerHP > 20) factor += 0.1;
  
  // RPM-based factor
  if (rpm > 3600) factor += 0.4;
  else if (rpm > 1800) factor += 0.2;
  else if (rpm > 900) factor += 0.1;
  
  // Application-specific factors (based on applicationId)
  if (applicationId) {
    switch (applicationId) {
      case 1: factor += 0.3; break; // Extrusoras
      case 2: factor += 0.5; break; // Trituradores  
      case 3: factor += 0.2; break; // Compresores
      case 4: factor += 0.15; break; // Cintas Transportadoras
      case 5: factor += 0.1; break; // Sopladores y Ventiladores
      case 6: factor += 0.1; break; // Generadores
      case 7: factor += 0.4; break; // Guinches y puentes grúa
      case 8: factor += 0.6; break; // Trenes de laminación
      case 9: factor += 0.2; break; // Bombas
      case 10: factor += 0.25; break; // Máquina motriz
      default: factor += 0.1; break;
    }
  }
  
  // Equipment characteristic modifiers
  if (especificaciones.distanciador) {
    factor += 0.1;
    const dbse = parseFloat(distanciador?.dbse || '0');
    if (dbse > 100) factor += 0.05;
  }
  
  if (especificaciones.reductor) {
    factor += 0.15;
  }
  
  if (especificaciones.acople) {
    factor += 0.1;
  }
  
  // Shaft diameter difference modifier
  const shaftDifference = Math.abs(conductorDiameter - conducidoDiameter);
  if (shaftDifference > 10) {
    factor += 0.05;
  }
  
  return factor;
}

/**
 * Generates the coupling code based on catalog format
 */
function generateCouplingCode(coupling: CouplingModel, data: FormData): string {
  const { especificaciones, distanciador } = data;
  const baseModel = coupling.model.replace(/\s+/g, ' ');
  const masaCode = (coupling as { recommendedMasaCode?: string }).recommendedMasaCode || '';
  const hasFuse = especificaciones.acople;
  
  // For FA series with fuse, format is "FA X / FUS / 1"
  if (coupling.series === 'FA/FUS') {
    const modelNumber = baseModel.match(/\d+/)?.[0];
    return `FA ${modelNumber} / FUS ${masaCode}`;
  }
  
  // For FA series with spacer, use user's DBSE value
  if (coupling.series === 'FA/D') {
    const modelNumber = baseModel.match(/\d+/)?.[0];
    const userDBSE = distanciador?.dbse;
    const dbseValue = userDBSE || 130; // Use user's DBSE or default to 130
    return `FA ${modelNumber} / D ${dbseValue} ${masaCode}`;
  }
  
  // For FA series with cardan, format is "FA X / C 11 ½"
  if (coupling.series === 'FA/C') {
    const modelNumber = baseModel.match(/\d+/)?.[0];
    return `FA ${modelNumber} / C 11 ½`;
  }
  
  // For standard FA series, format is "FA X / 1" with masa code
  if (coupling.series === 'FA') {
    const modelNumber = baseModel.match(/\d+/)?.[0];
    return `FA ${modelNumber} ${masaCode}`;
  }
  
  // For FAS NG series
  if (coupling.series === 'FAS NG') {
    return `${baseModel}`;
  }
  
  // For FAS NG-LP series
  if (coupling.series === 'FAS NG-LP') {
    const modelNumber = baseModel.match(/FAS NG \d+ LP/)?.[0];
    if (hasFuse) {
      return `${modelNumber} -FUS`;
    }
    return `${modelNumber}`;
  }
  
  return baseModel;
}

/**
 * Gets coupling details based on the selected model
 */
function getCouplingDetails(coupling: CouplingModel, hasFuse: boolean): {
  name: string;
  image: string;
  description: string;
  ventajas: string[];
} {
  const series = coupling.series;
  
  switch (series) {
    case 'FA':
      return {
        name: "Acoplamiento FUNDAL FA",
        image: getImagePath("/Acoples render/FA.png"),
        description: "Acoplamiento flexible estándar FUNDAL FA para transmisión confiable de potencia en aplicaciones industriales.",
        ventajas: [
          "Alta performance operacional",
          "Vida útil prolongada",
          "Estabilidad dinámica excepcional",
          "Eficiencia máxima en transmisión"
        ]
      };
      
    case 'FA/D':
      return {
        name: "Acoplamiento con Distanciador FA/D",
        image: getImagePath("/Acoples render/FA-D.png"),
        description: "Acoplamiento FUNDAL FA/D con distanciador para aplicaciones que requieren separación entre ejes.",
        ventajas: [
          "Compensación de desalineamientos",
          "Flexibilidad de instalación",
          "Fácil acceso para mantenimiento",
          "Transmisión suave de potencia"
        ]
      };
      
    case 'FA/C':
      return {
        name: "Acoplamiento Cardánico FA/C",
        image: getImagePath("/Acoples render/FA-C.png"),
        description: "Acoplamiento FUNDAL FA/C con cardán para aplicaciones con grandes desalineamientos angulares.",
        ventajas: [
          "Permite desalineamientos angulares",
          "Transmisión directa de movimiento",
          "Diseño robusto y confiable",
          "Ideal para aplicaciones especiales"
        ]
      };
      
    case 'FA/FUS':
      return {
        name: "Acoplamiento Fusible FA/FUS",
        image: getImagePath("/Acoples render/FA-FUS.png"),
        description: "Acoplamiento FUNDAL FA/FUS con protección fusible para evitar daños por sobrecargas.",
        ventajas: [
          "Protección fusible contra sobrecargas",
          "Previene daños en equipos",
          "Mantenimiento preventivo simplificado",
          "Seguridad operacional máxima"
        ]
      };
      
    case 'FAS NG':
      if (coupling.torqueNm > 50000) {
        return {
          name: "Acoplamiento FAS NG Híbrido",
          image: getImagePath("/Acoples render/FAS-NG-H.png"),
          description: "Acoplamiento FUNDAL FAS NG de nueva generación para aplicaciones de alta potencia.",
          ventajas: [
            "Tecnología de nueva generación",
            "Mayor capacidad de transmisión",
            "Sin necesidad de lubricación",
            "Facilidad de mantenimiento excepcional"
          ]
        };
      }
      return {
        name: "Acoplamiento FAS NG",
        image: getImagePath("/Acoples render/FAS-NG.png"),
        description: "Acoplamiento FUNDAL FAS NG de nueva generación con tecnología avanzada.",
        ventajas: [
          "Tecnología de nueva generación",
          "Mayor capacidad de transmisión",
          "Sin necesidad de lubricación",
          "Facilidad de mantenimiento excepcional"
        ]
      };
      
    case 'FAS NG-LP':
      if (hasFuse) {
        return {
          name: "Acoplamiento FAS NG-LP con Fusible",
          image: getImagePath("/Acoples render/FAS-NG-LP-FUS.png"),
          description: "Acoplamiento FUNDAL FAS NG-LP de gran potencia con protección fusible integrada.",
          ventajas: [
            "Diseño para grandes potencias",
            "Capacidad de torque excepcional",
            "Protección fusible integrada",
            "Diseño compacto y liviano"
          ]
        };
      }
      return {
        name: "Acoplamiento FAS NG-LP",
        image: getImagePath("/Acoples render/FAS-NG-LP.png"),
        description: "Acoplamiento FUNDAL FAS NG-LP para aplicaciones de gran potencia y torque elevado.",
        ventajas: [
          "Diseño para grandes potencias",
          "Capacidad de torque excepcional",
          "Robustez y alta rentabilidad",
          "Diseño compacto y liviano"
        ]
      };
      
    default:
      return {
        name: "Acoplamiento FUNDAL",
        image: getImagePath("/Acoples render/FA.png"),
        description: "Acoplamiento flexible para transmisión de potencia industrial.",
        ventajas: [
          "Alta performance operacional",
          "Vida útil prolongada",
          "Estabilidad dinámica",
          "Eficiencia en la transmisión"
        ]
      };
  }
}