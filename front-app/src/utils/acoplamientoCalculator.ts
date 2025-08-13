import type { EspecificacionesForm, DistanciadorForm, ReductorForm } from '../interfaces/all_interfaces';
import { selectCoupling, type CouplingModel } from '../couplingDatabase';
import { getImagePath } from './imagePaths';

export interface AcoplamientoResult {
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
 * 
 * @param data - Form data containing all equipment specifications
 * @returns AcoplamientoResult - The recommended coupling with calculated service factor
 */
export function calculateAcoplamiento(data: FormData): AcoplamientoResult {
  const { especificaciones, serviceFactor } = data;
  
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
  
  // Step 1: Calculate required torque using FUNDAL formula
  // Torque (Nm) = (7026 × HP × FS) / RPM
  const requiredTorqueNm = (7026 * powerHP * finalServiceFactor) / rpm;
  
  // Step 2: Find appropriate coupling
  const selectedCoupling = selectCoupling(
    requiredTorqueNm,
    conductorDiameter,
    conducidoDiameter,
    especificaciones.distanciador,
    especificaciones.acople, // This is the fuse requirement
    rpm
  );
  
  if (!selectedCoupling) {
    // No suitable coupling found, return error result
    return {
      id: 0,
      name: "No se encontró acoplamiento adecuado",
      image: getImagePath("/Acoples render/FA.png"),
      factorServicio: finalServiceFactor,
      description: "No se encontró un acoplamiento que cumpla con los requisitos especificados. Por favor, verifique los parámetros ingresados.",
      ventajas: [],
      calculatedTorqueNm: Math.round(requiredTorqueNm * 10) / 10
    };
  }
  
  // Step 3: Generate coupling code based on catalog format
  const couplingCode = generateCouplingCode(selectedCoupling, data);
  
  // Determine coupling type and characteristics
  const couplingDetails = getCouplingDetails(selectedCoupling, especificaciones.acople, especificaciones.distanciador);
  
  return {
    id: parseInt(selectedCoupling.model.match(/\d+/)?.[0] || '1'),
    name: `${couplingDetails.name} - ${selectedCoupling.model}`,
    image: couplingDetails.image,
    factorServicio: Math.round(calculatedServiceFactor * 100) / 100, // Show resultant, not final
    description: couplingDetails.description,
    ventajas: couplingDetails.ventajas,
    couplingModel: selectedCoupling,
    calculatedTorqueNm: Math.round(requiredTorqueNm * 10) / 10,
    couplingCode: couplingCode,
    masaType: (selectedCoupling as any).recommendedMasaType
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
  const masaCode = (coupling as any).recommendedMasaCode || '';
  const hasFuse = especificaciones.acople;
  
  // For FA series with fuse, format is "FA X / FUS / 1*"
  if (coupling.series === 'FA/FUS') {
    const modelNumber = baseModel.match(/\d+/)?.[0];
    return `FA ${modelNumber} / FUS${masaCode}`;
  }
  
  // For FA series with spacer, use user's DBSE value
  if (coupling.series === 'FA/D') {
    const modelNumber = baseModel.match(/\d+/)?.[0];
    const userDBSE = distanciador?.dbse;
    const dbseValue = userDBSE || 130; // Use user's DBSE or default to 130
    return `FA ${modelNumber} / D ${dbseValue}${masaCode}`;
  }
  
  // For FA series with cardan, format is "FA X / C 11 ½*"
  if (coupling.series === 'FA/C') {
    const modelNumber = baseModel.match(/\d+/)?.[0];
    return `FA ${modelNumber} / C 11 ½`;
  }
  
  // For standard FA series, format is "FA X / 1*" with masa code
  if (coupling.series === 'FA') {
    const modelNumber = baseModel.match(/\d+/)?.[0];
    return `FA ${modelNumber}${masaCode}`;
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
function getCouplingDetails(coupling: CouplingModel, hasFuse: boolean, _hasSpacerr: boolean): {
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
          name: "Acoplamiento FAS NG Heavy Duty",
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