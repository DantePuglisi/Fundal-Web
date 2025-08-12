import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { calculateAcoplamiento, type AcoplamientoResult, type FormData } from '../../utils/acoplamientoCalculator';
const icons = [
  { icon: "/icons/Alta performance.png", label: "Alta performance" },
  { icon: "/icons/Vida util prolongada.png", label: "Vida útil prolongada" },
  { icon: "/icons/Estabilidas dinamica.png", label: "Estabilidad dinámica" },
  { icon: "/icons/Eficiencia.png", label: "Eficiencia" },
  { icon: "/icons/Respuesta elastica.png", label: "Excelente respuesta elástica" },
  { icon: "/icons/Mantenimiento.png", label: "Mantenimiento fácil y rápido" },
];

function AcoplamientoApp() {
  const [resultado, setResultado] = useState<AcoplamientoResult | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const formData = location.state as FormData;

  const calculatedResult = useMemo(() => {
    if (formData && formData.especificaciones) {
      try {
        return calculateAcoplamiento(formData);
      } catch (error) {
        console.error('Error calculating coupling:', error);
        return null;
      }
    }
    return null;
  }, [formData]);

  useEffect(() => {
    if (calculatedResult) {
      setResultado(calculatedResult);
    }
  }, [calculatedResult]);

  if (!resultado) {
    // Show random coupling as placeholder while calculating or if no form data
    const randomId = Math.floor(Math.random() * 8) + 1;
    const placeholder = {
      id: randomId,
      name: "Acoplamiento de Ejemplo",
      image: `/Acoples render/${randomId}.png`,
      factorServicio: 1.5,
      description: "Calculando el acoplamiento ideal para su aplicación...",
      ventajas: [
        "Calculando ventajas específicas",
        "Analizando especificaciones",
        "Determinando mejor opción",
        "Procesando datos de entrada"
      ]
    };
    
    return (
      <div className="w-full flex flex-col items-center px-4 sm:px-8 lg:px-24 pb-8">
        <h2 className="text-lg sm:text-xl lg:text-3xl font-poppins font-bold text-center mb-8 mt-[-45px] text-teal-900" style={{ fontFamily: 'Poppins' }}>
          Calculando el acoplamiento ideal...
        </h2>
        <div className="w-full flex flex-col lg:flex-row justify-center items-stretch gap-6 mb-8">
          <div className="bg-white border-[1px] border-gray-300 rounded-2xl shadow-lg flex items-center justify-center p-4 sm:p-8 min-h-[280px] sm:min-h-[320px] max-h-[420px] w-full sm:min-w-[320px] sm:max-w-[420px] mx-auto">
            <img src={placeholder.image} alt={placeholder.name} className="max-h-48 object-contain opacity-50" />
          </div>
          <div className="flex-1 flex flex-col justify-between py-3 items-center lg:items-start gap-4">
            <div>
              <span className="font-bold font-poppins text-lg text-gray-400" style={{ fontFamily: 'Poppins' }}>{placeholder.name}</span>
              <p className="text-gray-400 font-poppins text-sm max-w-xs" style={{ fontFamily: 'Poppins' }}>
                {placeholder.description}
              </p>
            </div>
            <div className="mt-2">
              <span className="font-bold font-poppins text-base text-gray-400" style={{ fontFamily: 'Poppins' }}>Factor de servicio resultante:</span>
              <div className="bg-[#E9EFEF] rounded-md w-full h-10 flex items-center justify-start px-2 text-xl text-gray-400 font-bold">
                Calculando...
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-6">
          <button 
            className="bg-teal-900 hover:bg-teal-800 hover:cursor-pointer text-white font-bold px-8 py-2 rounded-full shadow transition" 
            style={{ fontFamily: 'Poppins' }}
            onClick={() => navigate('/')}
          >
            Ir a selección de aplicación
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center px-4 sm:px-8 lg:px-24 pb-8">
      <h2 className="text-lg sm:text-xl lg:text-3xl font-poppins font-bold text-center mb-8 mt-[-45px] text-teal-900" style={{ fontFamily: 'Poppins' }}>
        El acoplamiento ideal para su aplicación es:
      </h2>
      <div className="w-full flex flex-col lg:flex-row justify-center items-stretch gap-6 mb-8">
        <div className="bg-white border-[1px] border-gray-300 rounded-2xl shadow-lg flex items-center justify-center p-4 sm:p-8 min-h-[280px] sm:min-h-[320px] max-h-[420px] w-full sm:min-w-[320px] sm:max-w-[420px] mx-auto">
          <img src={resultado.image} alt={resultado.name} className="max-h-48 object-contain" />
        </div>
        {/* Info central */}
        <div className="flex-1 flex flex-col justify-between py-3 items-center lg:items-start gap-4">
          <div>
            <span className="font-bold font-poppins text-lg text-gray-600" style={{ fontFamily: 'Poppins' }}>{resultado.name}</span>
            <p className="text-gray-600 font-poppins text-sm max-w-xs" style={{ fontFamily: 'Poppins' }}>
              {resultado.description}
            </p>
          </div>
          <div className="mt-2">
            <span className="font-bold font-poppins text-base text-gray-600" style={{ fontFamily: 'Poppins' }}>Factor de servicio resultante:</span>
            <div className="bg-[#E9EFEF] rounded-md w-full h-10 flex items-center justify-start px-2 text-xl text-gray-700 font-bold">
              {resultado.factorServicio}
            </div>
          </div>
        </div>
        {/* Datos proporcionados */}
        <div className="bg-[#F1F1F1] rounded-2xl shadow-lg px-4 sm:px-6 py-6 w-full sm:min-w-[260px] sm:max-w-[340px] mx-auto flex flex-col justify-between">
          <span className="font-bold font-poppins text-lg mb-2 text-gray-600" style={{ fontFamily: 'Poppins' }}>Datos proporcionados para el calculo</span>
          <div className="text-sm font-poppins text-gray-700 flex flex-col gap-1 mb-4">
            <div className="flex justify-between"><span style={{ fontFamily: 'Poppins' }}>Equipo:</span><span>{formData?.especificaciones.name_tag_id || 'N/A'}</span></div>
            <div className="flex justify-between"><span style={{ fontFamily: 'Poppins' }}>Potencia:</span><span>{formData?.especificaciones.potencia} {formData?.especificaciones.hp_or_kw ? 'kW' : 'HP'}</span></div>
            <div className="flex justify-between"><span style={{ fontFamily: 'Poppins' }}>Velocidad (rpm):</span><span>{formData?.especificaciones.velocidad_rpm || 'N/A'}</span></div>
            <div className="flex justify-between"><span style={{ fontFamily: 'Poppins' }}>Ø de eje conductor:</span><span>{formData?.especificaciones.eje_conductor || 'N/A'} mm</span></div>
            <div className="flex justify-between"><span style={{ fontFamily: 'Poppins' }}>Ø de eje conducido:</span><span>{formData?.especificaciones.eje_conducido || 'N/A'} mm</span></div>
            <div className="flex justify-between"><span style={{ fontFamily: 'Poppins' }}>¿Tiene distanciador?</span><span>{formData?.especificaciones.distanciador ? 'SÍ' : 'NO'}</span></div>
            {formData?.especificaciones.distanciador && (
              <div className="flex justify-between"><span style={{ fontFamily: 'Poppins' }}>DBSE (mm):</span><span>{formData?.distanciador?.dbse || 'N/A'}</span></div>
            )}
            <div className="flex justify-between"><span style={{ fontFamily: 'Poppins' }}>¿Tiene Reductor?</span><span>{formData?.especificaciones.reductor ? 'SÍ' : 'NO'}</span></div>
            {formData?.especificaciones.reductor && (
              <>
                <div className="flex justify-between"><span style={{ fontFamily: 'Poppins' }}>Relación de reducción:</span><span>{formData?.reductor?.relacion_npm || 'N/A'}</span></div>
                <div className="flex justify-between"><span style={{ fontFamily: 'Poppins' }}>Ø eje salida reductor:</span><span>{formData?.reductor?.eje_salida || 'N/A'} mm</span></div>
                <div className="flex justify-between"><span style={{ fontFamily: 'Poppins' }}>Ø eje equipo conducido:</span><span>{formData?.reductor?.eje_conducido || 'N/A'} mm</span></div>
              </>
            )}
            <div className="flex justify-between"><span style={{ fontFamily: 'Poppins' }}>Sistema fusible:</span><span>{formData?.especificaciones.acople ? 'SÍ' : 'NO'}</span></div>
          </div>
          <button 
            className="bg-white rounded-full px-8 py-2 font-bold text-gray-700 shadow hover:bg-gray-200 hover:cursor-pointer transition" 
            style={{ fontFamily: 'Poppins' }}
            onClick={() => navigate(-1)}
          >
            Modificar
          </button>
        </div>
      </div>
      {/* Ventajas */}
      <h3 className="text-lg sm:text-xl font-poppins font-bold text-left mt-8 mb-4 text-teal-900" style={{ fontFamily: 'Poppins' }}>
        Ventajas de este acoplamiento para su aplicación:
      </h3>
        <div className="flex flex-wrap justify-center gap-4 mb-8">
                {resultado.ventajas.map((ventaja, i) => (
                    <div
                    key={i}
                    className="flex flex-col items-center justify-center bg-[#F7F7F7] rounded-full shadow w-40 h-40"
                    >
                    <img src={icons[i % icons.length]?.icon || "/icons/Alta performance.png"} alt="img" className="w-16 h-16 mb-2" />
                    <span className="text-sm font-poppins text-gray-700 text-center px-3 break-words" style={{ fontFamily: 'Poppins' }}>
                        {ventaja}
                    </span>
                    </div>
                ))}
        </div>
      {/* Botones */}
      <div className="flex flex-wrap justify-center gap-2 mt-4">
        <button className="flex items-center gap-2 bg-orange-500 hover:cursor-pointer hover:bg-orange-600 text-white font-bold px-6 py-2 rounded-full shadow transition" style={{ fontFamily: 'Poppins' }}>
          <img src="/icons/descargar.png" alt="Descargar" className="w-6 h-6" />
          Descargar
        </button>
        <button className="flex items-center gap-2 bg-orange-500 hover:cursor-pointer hover:bg-orange-600 text-white font-bold px-6 py-2 rounded-full shadow transition" style={{ fontFamily: 'Poppins' }}>
          <img src="/icons/Cotizar.png" alt="Cotizar" className="w-6 h-6" />
          Cotizar
        </button>
        <button className="flex items-center gap-2 bg-orange-500 hover:cursor-pointer hover:bg-orange-600 text-white font-bold px-6 py-2 rounded-full shadow transition" style={{ fontFamily: 'Poppins' }}>
          <img src="/icons/Compartir.png" alt="Compartir" className="w-6 h-6" />
          Compartir
        </button>
      </div>
      <div className="flex flex-wrap justify-around gap-4 mt-6 w-full">
        <button className="bg-gray-400 hover:bg-gray-500 hover:cursor-pointer text-white font-bold px-8 py-2 rounded-full shadow transition ml-4"
        onClick={() => navigate('/')} style={{ fontFamily: 'Poppins' }}
        >
          Volver
        </button>
        <button 
          className="bg-teal-900 hover:bg-teal-800 hover:cursor-pointer text-white font-bold px-8 py-2 rounded-full shadow transition ml-4" 
          style={{ fontFamily: 'Poppins' }}
          onClick={() => navigate('/')}
        >
          Nueva selección
        </button>
      </div>
    </div>
  );
}

export default AcoplamientoApp;