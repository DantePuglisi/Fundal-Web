// Service Factor data extracted from the CSV file
export interface SubApplication {
  name: string;
  serviceFactor: number;
}

export interface Application {
  id: number;
  name: string;
  subApplications: SubApplication[];
  icon: string; // Will map to existing icons
}

export const serviceFactorData: Application[] = [
  // Applications with matching icons
  {
    id: 1,
    name: "Bombas",
    icon: "/bomba.png",
    subApplications: [
      { name: "Centrífugas normales", serviceFactor: 1.00 },
      { name: "Alta densidad y sobrecarga", serviceFactor: 1.25 },
      { name: "Rotativa a engranajes, paletas ó lóbulos", serviceFactor: 1.50 },
      { name: "A pistón - De 3 ó más cilindros", serviceFactor: 2.00 },
      { name: "A pistón - De 2 ó 1 cilindro", serviceFactor: 2.50 },
      { name: "A pistón - De doble efecto", serviceFactor: 2.50 }
    ]
  },
  {
    id: 2,
    name: "Sopladores y Ventiladores",
    icon: "/sopladores y ventiladores.png",
    subApplications: [
      { name: "Centrífugos", serviceFactor: 1.00 },
      { name: "Metálicos", serviceFactor: 1.25 },
      { name: "Turboventiladores", serviceFactor: 1.25 },
      { name: "Lóbulos", serviceFactor: 1.50 },
      { name: "Tiro forzado", serviceFactor: 1.50 },
      { name: "Tiro inducido", serviceFactor: 2.00 },
      { name: "Torres de enfriamiento", serviceFactor: 2.50 }
    ]
  },
  {
    id: 3,
    name: "Compresores",
    icon: "/compresores.png",
    subApplications: [
      { name: "Centrífugos", serviceFactor: 1.25 },
      { name: "Rotativos", serviceFactor: 1.50 },
      { name: "Turbocompresores", serviceFactor: 2.00 },
      { name: "Alternativos de más de 4 cilindros", serviceFactor: 2.50 }
    ]
  },
  {
    id: 4,
    name: "Cintas transportadoras, elevadores",
    icon: "/cintas transportadoras.png",
    subApplications: [
      { name: "Montacarga", serviceFactor: 1.75 },
      { name: "Cintas transportadoras carga uniforme", serviceFactor: 1.70 },
      { name: "Cintas transportadoras carga no uniforme", serviceFactor: 2.00 },
      { name: "Elevadores", serviceFactor: 2.00 },
      { name: "Cinta de movimiento alternativo", serviceFactor: 3.00 },
      { name: "Cargas severas", serviceFactor: 3.00 }
    ]
  },
  {
    id: 5,
    name: "Trituradores",
    icon: "/trituradores.png",
    subApplications: [
      { name: "De piedra", serviceFactor: 2.75 },
      { name: "De caña", serviceFactor: 2.50 },
      { name: "Cortadores de caña", serviceFactor: 2.75 },
      { name: "Molinos", serviceFactor: 2.75 },
      { name: "Vibradores", serviceFactor: 1.75 }
    ]
  },
  {
    id: 6,
    name: "Trenes de laminación",
    icon: "/trenes de laminacion.png",
    subApplications: [
      { name: "Cizallas de corte", serviceFactor: 2.50 },
      { name: "Trenes de laminación en frío", serviceFactor: 2.00 },
      { name: "Plantas de colada continua", serviceFactor: 2.50 },
      { name: "Mesas de enfriamiento", serviceFactor: 1.75 },
      { name: "Cizallas", serviceFactor: 2.00 },
      { name: "Transfer transversales", serviceFactor: 1.75 },
      { name: "Máquinas decapado", serviceFactor: 2.00 },
      { name: "Trenes de servicio medio y pesado", serviceFactor: 3.00 },
      { name: "Trenes blooming", serviceFactor: 2.50 },
      { name: "Manipuladores", serviceFactor: 2.00 },
      { name: "Enderezadores", serviceFactor: 1.75 },
      { name: "Mesas de rodillos (severa)", serviceFactor: 2.50 },
      { name: "Mesas de rodillos (ligero)", serviceFactor: 1.75 },
      { name: "Molinos de chapa", serviceFactor: 2.50 },
      { name: "Máquina para tubos", serviceFactor: 2.00 },
      { name: "Máquina de bobinado", serviceFactor: 1.75 }
    ]
  },
  {
    id: 7,
    name: "Generadores",
    icon: "/generadores.png",
    subApplications: [
      { name: "Carga uniforme", serviceFactor: 1.00 },
      { name: "Motosoldadores", serviceFactor: 2.00 }
    ]
  },
  {
    id: 8,
    name: "Guinches y Puentes Grúa",
    icon: "/guinches y puentes grua.png",
    subApplications: [
      { name: "Traslación", serviceFactor: 1.75 },
      { name: "Malacate principal", serviceFactor: 2.00 }
    ]
  },
  {
    id: 9,
    name: "Extrusoras",
    icon: "/extrusoras.png",
    subApplications: [
      { name: "Densidad constante", serviceFactor: 1.50 },
      { name: "Densidad variable", serviceFactor: 2.50 }
    ]
  },
  {
    id: 10,
    name: "Máquina motriz",
    icon: "/maquina motriz.png",
    subApplications: [
      { name: "Motor eléctrico y turbinas", serviceFactor: 0.00 },
      { name: "Motores de velocidad variable", serviceFactor: 0.80 },
      { name: "Motores a explosión - de 8 o más cilindros", serviceFactor: 0.50 },
      { name: "Motores a explosión - de 6 cilindros", serviceFactor: 1.00 },
      { name: "Motores a explosión - de 4 o 5 cilindros", serviceFactor: 1.50 },
      { name: "Motores a explosión - de menos de 4 cilindros", serviceFactor: 2.00 }
    ]
  }

  // COMMENTED OUT - Applications without corresponding icons:
  
  /*
  {
    id: 10,
    name: "Agitadores",
    icon: "/icons/Alta performance.png", // No specific icon available
    subApplications: [
      { name: "Líquidos", serviceFactor: 1.00 },
      { name: "Líquidos c/sólidos en suspensión", serviceFactor: 1.25 },
      { name: "Líquidos c/densidad variable", serviceFactor: 1.25 },
      { name: "Mezcladores", serviceFactor: 1.75 }
    ]
  },
  {
    id: 11,
    name: "Industria del caucho",
    icon: "/icons/Estabilidas dinamica.png", // No specific icon available
    subApplications: [
      { name: "Calandras", serviceFactor: 2.00 },
      { name: "Molinos", serviceFactor: 2.50 },
      { name: "Mezcladores", serviceFactor: 2.50 },
      { name: "Conformadora de neumáticos", serviceFactor: 2.50 }
    ]
  },
  {
    id: 12,
    name: "Acería",
    icon: "/icons/Vida util prolongada.png", // No specific icon available
    subApplications: [
      { name: "Soplantes de alto horno", serviceFactor: 1.75 },
      { name: "Convertidores", serviceFactor: 2.50 },
      { name: "Elevadores de alto horno inclinados", serviceFactor: 2.00 },
      { name: "Trituradores", serviceFactor: 2.00 }
    ]
  },
  {
    id: 13,
    name: "Aserraderos",
    icon: "/icons/Mantenimiento.png", // No specific icon available
    subApplications: [
      { name: "Transportadores", serviceFactor: 1.70 },
      { name: "Sierras", serviceFactor: 1.75 },
      { name: "Descascaradores de tambor", serviceFactor: 2.00 },
      { name: "Rolos de transportes", serviceFactor: 2.00 },
      { name: "Mesa de transferencia", serviceFactor: 2.50 }
    ]
  },
  {
    id: 14,
    name: "Celulosa y papel",
    icon: "/icons/Alta performance.png", // No specific icon available
    subApplications: [
      { name: "Bombas de servicio", serviceFactor: 1.00 },
      { name: "Bobinadoras", serviceFactor: 1.50 },
      { name: "Cilindros", serviceFactor: 1.75 },
      { name: "Tela", serviceFactor: 1.75 },
      { name: "Desfibradores", serviceFactor: 1.75 },
      { name: "Calandras", serviceFactor: 2.00 },
      { name: "Cortadores", serviceFactor: 2.00 },
      { name: "Refinadores", serviceFactor: 2.00 },
      { name: "Prensas", serviceFactor: 2.00 },
      { name: "Maquinaria para pulper", serviceFactor: 2.00 }
    ]
  },
  {
    id: 15,
    name: "Aplicaciones marinas",
    icon: "/icons/Respuesta elastica.png", // No specific icon available
    subApplications: [
      { name: "Dragas", serviceFactor: 2.50 }
    ]
  }
  */
];

// Helper function to get service factor by application and sub-application
export function getServiceFactor(applicationId: number, subApplicationName: string): number {
  const application = serviceFactorData.find(app => app.id === applicationId);
  if (!application) return 1.5; // default fallback
  
  const subApp = application.subApplications.find(sub => sub.name === subApplicationName);
  return subApp ? subApp.serviceFactor : 1.5; // default fallback
}

// Helper function to get application by ID
export function getApplicationById(id: number): Application | undefined {
  return serviceFactorData.find(app => app.id === id);
}