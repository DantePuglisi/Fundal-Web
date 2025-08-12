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
  
  // Determine image based on coupling series and characteristics
  let couplingImage = "/Acoples render/FA.png"; // Default FA series
  let couplingName = "Acoplamiento FUNDAL FA";
  let couplingDescription = "Acoplamiento flexible estándar para transmisión de potencia industrial.";
  let couplingAdvantages = [
    "Alta performance operacional",
    "Vida útil prolongada",
    "Estabilidad dinámica",
    "Eficiencia en la transmisión de potencia"
  ];

  // Determine coupling type based on selected model or characteristics
  if (selectedCoupling) {
    const series = selectedCoupling.series;
    
    switch (series) {
      case 'FA':
        couplingImage = "/Acoples render/FA.png";
        couplingName = `Acoplamiento FUNDAL FA${modelName}`;
        couplingDescription = "Acoplamiento flexible estándar FUNDAL FA para transmisión confiable de potencia en aplicaciones industriales.";
        couplingAdvantages = [
          "Alta performance operacional",
          "Vida útil prolongada",
          "Estabilidad dinámica excepcional",
          "Eficiencia máxima en transmisión"
        ];
        break;
        
      case 'FA/D':
        couplingImage = "/Acoples render/FA-D.png";
        couplingName = `Acoplamiento con Distanciador FA/D${modelName}`;
        couplingDescription = "Acoplamiento FUNDAL FA/D con distanciador para aplicaciones que requieren separación entre ejes.";
        couplingAdvantages = [
          "Compensación de desalineamientos",
          "Flexibilidad de instalación",
          "Fácil acceso para mantenimiento",
          "Transmisión suave de potencia"
        ];
        break;
        
      case 'FA/C':
        couplingImage = "/Acoples render/FA-C.png";
        couplingName = `Acoplamiento Cardánico FA/C${modelName}`;
        couplingDescription = "Acoplamiento FUNDAL FA/C con cardán para aplicaciones con grandes desalineamientos angulares.";
        couplingAdvantages = [
          "Permite desalineamientos angulares",
          "Transmisión directa de movimiento",
          "Diseño robusto y confiable",
          "Ideal para aplicaciones especiales"
        ];
        break;
        
      case 'FA/FUS':
        couplingImage = "/Acoples render/FA-FUS.png";
        couplingName = `Acoplamiento Fusible FA/FUS${modelName}`;
        couplingDescription = "Acoplamiento FUNDAL FA/FUS con protección fusible para evitar daños por sobrecargas.";
        couplingAdvantages = [
          "Protección fusible contra sobrecargas",
          "Previene daños en equipos",
          "Mantenimiento preventivo simplificado",
          "Seguridad operacional máxima"
        ];
        break;
        
      case 'FAS NG':
        if (selectedCoupling.torqueNm > 50000) {
          couplingImage = "/Acoples render/FAS-NG-H.png";
          couplingName = `Acoplamiento FAS NG Heavy Duty${modelName}`;
          couplingDescription = "Acoplamiento FUNDAL FAS NG de nueva generación para aplicaciones de alta potencia.";
        } else {
          couplingImage = "/Acoples render/FAS-NG.png";
          couplingName = `Acoplamiento FAS NG${modelName}`;
          couplingDescription = "Acoplamiento FUNDAL FAS NG de nueva generación con tecnología avanzada.";
        }
        couplingAdvantages = [
          "Tecnología de nueva generación",
          "Mayor capacidad de transmisión",
          "Sin necesidad de lubricación",
          "Facilidad de mantenimiento exceptional"
        ];
        break;
        
      case 'FAS NG-LP':
        if (hasFusible) {
          couplingImage = "/Acoples render/FAS-NG-LP-FUS.png";
          couplingName = `Acoplamiento FAS NG-LP con Fusible${modelName}`;
          couplingDescription = "Acoplamiento FUNDAL FAS NG-LP de gran potencia con protección fusible integrada.";
        } else {
          couplingImage = "/Acoples render/FAS-NG-LP.png";
          couplingName = `Acoplamiento FAS NG-LP${modelName}`;
          couplingDescription = "Acoplamiento FUNDAL FAS NG-LP para aplicaciones de gran potencia y torque elevado.";
        }
        couplingAdvantages = [
          "Diseño para grandes potencias",
          "Capacidad de torque excepcional",
          "Robustez y alta rentabilidad",
          "Diseño compacto y liviano"
        ];
        break;
        
      default:
        // Keep default values
        break;
    }
  } else {
    // Fallback logic when no specific coupling is selected
    if (hasFusible) {
      couplingImage = "/Acoples render/FA-FUS.png";
      couplingName = "Acoplamiento Fusible FA-FUS";
      couplingDescription = "Acoplamiento fusible recomendado para protección contra sobrecargas.";
      couplingAdvantages = [
        "Protección fusible confiable",
        "Previene daños por sobrecarga",
        "Instalación sencilla",
        "Mantenimiento mínimo"
      ];
    } else if (hasDistanciador) {
      couplingImage = "/Acoples render/FA-D.png";
      couplingName = "Acoplamiento con Distanciador FA-D";
      couplingDescription = "Acoplamiento con distanciador para separación entre ejes.";
      couplingAdvantages = [
        "Compensación de desalineamientos",
        "Flexibilidad de instalación",
        "Fácil acceso para mantenimiento",
        "Transmisión suave de potencia"
      ];
    } else if (powerHP > 500 || serviceFactor > 2.5) {
      couplingImage = "/Acoples render/FAS-NG.png";
      couplingName = "Acoplamiento FAS NG";
      couplingDescription = "Acoplamiento de nueva generación para altas potencias y factores de servicio elevados.";
      couplingAdvantages = [
        "Tecnología avanzada",
        "Mayor capacidad de transmisión",
        "Sin necesidad de lubricación",
        "Mantenimiento simplificado"
      ];
    }
  }
  
  return {
    id: selectedCoupling ? parseInt(selectedCoupling.model.split(' ')[1]) || 1 : 1,
    name: couplingName,
    image: couplingImage,
    description: couplingDescription,
    ventajas: couplingAdvantages
  };
}