import type { EspecificacionesForm, DistanciadorForm, ReductorForm } from '../interfaces/all_interfaces';
import { selectCoupling, type CouplingModel } from '../couplingDatabase';

export interface AcoplamientoResult {
  id: number;
  name: string;
  image: string;
  factorServicio: number;
  description: string;
  ventajas: string[];
  couplingModel?: CouplingModel;
  calculatedTorqueNm?: number;
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
 * This function analyzes the input parameters and determines the best coupling type
 * based on power, speed, shaft diameters, and other equipment characteristics.
 * 
 * @param data - Form data containing all equipment specifications
 * @returns AcoplamientoResult - The recommended coupling with calculated service factor
 */
export function calculateAcoplamiento(data: FormData): AcoplamientoResult {
  const { especificaciones, distanciador, applicationId, subApplication, serviceFactor } = data;
  
  // Convert power to HP for standardized calculations
  const powerHP = especificaciones.hp_or_kw 
    ? especificaciones.potencia * 1.341 // kW to HP conversion
    : especificaciones.potencia;
  
  const rpm = parseFloat(especificaciones.velocidad_rpm) || 0;
  const conductorDiameter = parseFloat(especificaciones.eje_conductor) || 0;
  const conducidoDiameter = parseFloat(especificaciones.eje_conducido) || 0;
  
  // Use service factor from CSV if available, otherwise calculate
  let finalServiceFactor = serviceFactor || calculateBaseServiceFactor(powerHP, rpm, applicationId);
  
  // Apply modifiers based on equipment characteristics only if no CSV service factor provided
  if (!serviceFactor) {
    finalServiceFactor = applyEquipmentModifiers(finalServiceFactor, {
      hasDistanciador: especificaciones.distanciador,
      hasReductor: especificaciones.reductor,
      hasFusible: especificaciones.acople,
      dbse: distanciador?.dbse,
      shaftDifference: Math.abs(conductorDiameter - conducidoDiameter)
    });
  }
  
  // Calculate required torque using FUNDAL formula: Torque (Nm) = (7026 × HP) / RPM × FS
  const calculatedTorqueNm = (7026 * powerHP * finalServiceFactor) / rpm;
  
  // Select the appropriate coupling from database
  const maxShaftDiameter = Math.max(conductorDiameter, conducidoDiameter);
  const selectedCoupling = selectCoupling(
    calculatedTorqueNm,
    maxShaftDiameter,
    especificaciones.distanciador,
    especificaciones.acople,
    rpm
  );
  
  // Determine coupling type based on specifications
  const couplingType = determineCouplingType({
    serviceFactor: finalServiceFactor,
    powerHP,
    rpm,
    hasFusible: especificaciones.acople,
    hasDistanciador: especificaciones.distanciador,
    maxShaftDiameter,
    selectedCoupling
  });
  
  // Create enhanced description if we have sub-application info
  const enhancedDescription = subApplication 
    ? `${couplingType.description} Optimizado para aplicaciones de ${subApplication.toLowerCase()}.`
    : couplingType.description;
  
  return {
    id: couplingType.id,
    name: couplingType.name,
    image: couplingType.image,
    factorServicio: Math.round(finalServiceFactor * 100) / 100, // Round to 2 decimal places
    description: enhancedDescription,
    ventajas: couplingType.ventajas,
    couplingModel: selectedCoupling || undefined,
    calculatedTorqueNm: Math.round(calculatedTorqueNm * 10) / 10 // Round to 1 decimal place
  };
}

/**
 * Calculates base service factor based on power, RPM and application type
 */
function calculateBaseServiceFactor(powerHP: number, rpm: number, applicationId?: number): number {
  // Base factor starts at 1.0
  let factor = 1.0;
  
  // Power factor (higher power = higher service factor)
  if (powerHP > 100) factor += 0.3;
  else if (powerHP > 50) factor += 0.2;
  else if (powerHP > 20) factor += 0.1;
  
  // Speed factor (higher RPM = higher service factor)
  if (rpm > 3600) factor += 0.4;
  else if (rpm > 1800) factor += 0.2;
  else if (rpm > 900) factor += 0.1;
  
  // Application-specific factors
  if (applicationId) {
    switch (applicationId) {
      case 1: // Extrusoras
        factor += 0.3;
        break;
      case 2: // Trituradores
        factor += 0.5;
        break;
      case 3: // Compresores
        factor += 0.2;
        break;
      case 4: // Cintas Transportadoras
        factor += 0.15;
        break;
      case 5: // Sopladores y Ventiladores
        factor += 0.1;
        break;
      case 6: // Generadores
        factor += 0.1;
        break;
      case 7: // Guinches y puentes grúa
        factor += 0.4;
        break;
      case 8: // Trenes de laminación
        factor += 0.6;
        break;
      case 9: // Bombas
        factor += 0.2;
        break;
      case 10: // Máquina motriz
        factor += 0.25;
        break;
      default:
        factor += 0.1;
    }
  }
  
  return factor;
}

/**
 * Applies modifiers to service factor based on equipment characteristics
 */
function applyEquipmentModifiers(baseFactor: number, modifiers: {
  hasDistanciador: boolean;
  hasReductor: boolean;
  hasFusible: boolean;
  dbse?: string;
  shaftDifference: number;
}): number {
  let factor = baseFactor;
  
  // Spacer modifier
  if (modifiers.hasDistanciador) {
    factor += 0.1;
    const dbse = parseFloat(modifiers.dbse || '0');
    if (dbse > 100) factor += 0.05;
  }
  
  // Reducer modifier
  if (modifiers.hasReductor) {
    factor += 0.15;
  }
  
  // Fusible system modifier
  if (modifiers.hasFusible) {
    factor += 0.1;
  }
  
  // Shaft diameter difference modifier
  if (modifiers.shaftDifference > 10) {
    factor += 0.05;
  }
  
  return factor;
}

/**
 * Determines the appropriate coupling type based on calculated parameters
 */
function determineCouplingType(params: {
  serviceFactor: number;
  powerHP: number;
  rpm: number;
  hasFusible: boolean;
  hasDistanciador: boolean;
  maxShaftDiameter: number;
  selectedCoupling: CouplingModel | null;
}): {
  id: number;
  name: string;
  image: string;
  description: string;
  ventajas: string[];
} {
  const { serviceFactor, powerHP, hasFusible, hasDistanciador, selectedCoupling } = params;
  
  // Include coupling model information if available
  const modelName = selectedCoupling ? ` - Modelo ${selectedCoupling.model}` : '';
  
  // Fusible coupling types
  if (hasFusible) {
    if (serviceFactor > 2.5 || powerHP > 200) {
      return {
        id: 8,
        name: `Acoplamiento Fusible de Alta Potencia FA-FUS${modelName}`,
        image: "/Acoples render/8.png",
        description: "Acoplamiento fusible diseñado para aplicaciones de alta potencia con protección contra sobrecargas extremas.",
        ventajas: [
          "Protección fusible contra sobrecargas extremas",
          "Diseñado para altas potencias",
          "Excelente absorción de vibraciones",
          "Mantenimiento preventivo simplificado"
        ]
      };
    } else {
      return {
        id: 2,
        name: "Acoplamiento Fusible Estándar FA-FUS",
        image: "/Acoples render/2.png",
        description: "Acoplamiento fusible para aplicaciones estándar con protección confiable contra sobrecargas.",
        ventajas: [
          "Protección fusible confiable",
          "Instalación sencilla",
          "Costo-efectivo",
          "Mantenimiento mínimo"
        ]
      };
    }
  }
  
  // Standard coupling types based on service factor and power
  if (serviceFactor > 3.0) {
    return {
      id: 7,
      name: "Acoplamiento de Alta Resistencia FA-HR",
      image: "/Acoples render/7.png",
      description: "Acoplamiento de alta resistencia para aplicaciones extremas con cargas variables severas.",
      ventajas: [
        "Máxima resistencia a cargas extremas",
        "Vida útil excepcional",
        "Absorción superior de choques",
        "Diseño robusto para trabajo pesado"
      ]
    };
  } else if (serviceFactor > 2.0) {
    return {
      id: 6,
      name: "Acoplamiento de Trabajo Pesado FA-HD",
      image: "/Acoples render/6.png",
      description: "Acoplamiento robusto para aplicaciones de trabajo pesado con cargas variables moderadas.",
      ventajas: [
        "Construcción robusta",
        "Excelente absorción de vibraciones",
        "Resistencia a cargas variables",
        "Mantenimiento reducido"
      ]
    };
  } else if (serviceFactor > 1.5) {
    if (hasDistanciador) {
      return {
        id: 5,
        name: "Acoplamiento con Distanciador FA-D",
        image: "/Acoples render/5.png",
        description: "Acoplamiento estándar con distanciador para aplicaciones que requieren separación entre ejes.",
        ventajas: [
          "Compensación de desalineamientos",
          "Flexibilidad de instalación",
          "Transmisión suave de potencia",
          "Fácil acceso para mantenimiento"
        ]
      };
    } else {
      return {
        id: 4,
        name: "Acoplamiento Industrial Estándar FA-STD",
        image: "/Acoples render/4.png",
        description: "Acoplamiento estándar para aplicaciones industriales generales con cargas moderadas.",
        ventajas: [
          "Versátil para múltiples aplicaciones",
          "Instalación rápida y sencilla",
          "Excelente relación calidad-precio",
          "Mantenimiento estándar"
        ]
      };
    }
  } else {
    return {
      id: 3,
      name: "Acoplamiento Básico FA-BASIC",
      image: "/Acoples render/3.png",
      description: "Acoplamiento básico para aplicaciones ligeras con cargas constantes y velocidades moderadas.",
      ventajas: [
        "Solución económica",
        "Instalación simple",
        "Mantenimiento mínimo",
        "Ideal para cargas ligeras"
      ]
    };
  }
}