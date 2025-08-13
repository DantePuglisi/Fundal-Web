import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useMemo, useRef } from "react";
import { calculateAcoplamiento, type AcoplamientoResult, type FormData } from '../../utils/acoplamientoCalculator';
import { getImagePath } from '../../utils/imagePaths';
import html2canvas from 'html2canvas';
const icons = [
  { icon: getImagePath("/icons/Alta performance.png"), label: "Alta performance" },
  { icon: getImagePath("/icons/Vida util prolongada.png"), label: "Vida útil prolongada" },
  { icon: getImagePath("/icons/Estabilidas dinamica.png"), label: "Estabilidad dinámica" },
  { icon: getImagePath("/icons/Eficiencia.png"), label: "Eficiencia" },
  { icon: getImagePath("/icons/Respuesta elastica.png"), label: "Excelente respuesta elástica" },
  { icon: getImagePath("/icons/Mantenimiento.png"), label: "Mantenimiento fácil y rápido" },
];

function AcoplamientoApp() {
  const [resultado, setResultado] = useState<AcoplamientoResult | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const formData = location.state as FormData;
  const reportRef = useRef<HTMLDivElement>(null);

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
      <div className="w-full flex flex-col items-center px-4 sm:px-8 lg:px-24 pb-12 bg-gradient-to-br from-gray-50 to-white min-h-screen">
        <div className="max-w-7xl w-full">
        <h2 className="text-xl sm:text-2xl lg:text-4xl font-poppins font-bold text-center mb-12 mt-[-35px] text-teal-900 leading-tight" style={{ fontFamily: 'Poppins' }}>
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
        <div className="flex justify-center mt-8">
          <button 
            className="bg-gradient-to-r from-teal-700 to-teal-800 hover:from-teal-800 hover:to-teal-900 text-white font-bold px-10 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1" 
            style={{ fontFamily: 'Poppins' }}
            onClick={() => navigate('/')}
          >
            ← Ir a selección de aplicación
          </button>
        </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-8">
        {/* Header */}
        <div className="text-center mb-8 pt-2">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-3" style={{ fontFamily: 'Poppins' }}>
            Acoplamiento Recomendado
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto" style={{ fontFamily: 'Poppins' }}>
            Basado en las especificaciones técnicas de su equipo
          </p>
        </div>
        {/* Main Result */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Coupling Showcase */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg border p-8">
              <div className="flex flex-col lg:flex-row items-center gap-8">
                {/* Image Section */}
                <div className="flex-shrink-0">
                  <div className="bg-gray-50 rounded-lg p-6 border">
                    <img src={resultado.image} alt={resultado.name} className="w-64 h-48 object-contain" />
                  </div>
                </div>
                
                {/* Info Section */}
                <div className="flex-1 space-y-6">
                  <div>
                    <div className="inline-flex items-center gap-2 bg-teal-100 text-teal-800 px-3 py-1 rounded text-sm font-medium mb-3">
                      Seleccionado
                    </div>
                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-3" style={{ fontFamily: 'Poppins' }}>
                      {resultado.name}
                    </h2>
                    <p className="text-gray-600 leading-relaxed" style={{ fontFamily: 'Poppins' }}>
                      {resultado.description}
                    </p>
                  </div>
                  
                  {/* Service Factor and Torque Display */}
                  <div className="space-y-4">
                    <div className="bg-teal-50 rounded-lg p-4 border border-teal-200">
                      <p className="text-teal-700 font-medium text-sm">Factor de Servicio Resultante</p>
                      <p className="text-2xl font-bold text-teal-900 mt-1" style={{ fontFamily: 'Poppins' }}>{resultado.factorServicio}</p>
                    </div>
                    
                    {resultado.couplingModel && (
                      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                        <p className="text-blue-700 font-medium text-sm mb-2">Modelo Seleccionado</p>
                        {resultado.couplingCode && (
                          <p className="text-xl font-bold text-blue-900" style={{ fontFamily: 'Poppins' }}>
                            {resultado.couplingCode}
                          </p>
                        )}
                        {resultado.masaType && (
                          <p className="text-sm font-medium text-blue-700 mt-1" style={{ fontFamily: 'Poppins' }}>
                            Masa: {resultado.masaType}
                          </p>
                        )}
                        <div className="mt-3 space-y-1 text-sm">
                          <p className="text-blue-700">
                            <span className="font-medium">Torque Nominal:</span> {resultado.couplingModel.torqueNm} Nm
                          </p>
                          <p className="text-blue-700">
                            <span className="font-medium">Torque Requerido:</span> {resultado.calculatedTorqueNm} Nm
                          </p>
                          <p className="text-blue-700">
                            <span className="font-medium">RPM Máx:</span> {resultado.couplingModel.maxRPM}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Data Panel */}
          <div>
            <div className="bg-white rounded-xl shadow-lg border p-6">
              <h3 className="font-bold text-lg text-gray-800 mb-6" style={{ fontFamily: 'Poppins' }}>Especificaciones</h3>
              <div className="space-y-3">
                {[
                  { label: "Equipo", value: formData?.especificaciones.name_tag_id || 'N/A' },
                  { label: "Aplicación", value: formData?.subApplication || 'N/A' },
                  { label: "Potencia", value: `${formData?.especificaciones.potencia} ${formData?.especificaciones.hp_or_kw ? 'kW' : 'HP'}` },
                  { label: "Velocidad", value: `${formData?.especificaciones.velocidad_rpm || 'N/A'} RPM` },
                  { label: "Ø Conductor", value: `${formData?.especificaciones.eje_conductor || 'N/A'} mm` },
                  { label: "Ø Conducido", value: `${formData?.especificaciones.eje_conducido || 'N/A'} mm` },
                  { label: "Distanciador", value: formData?.especificaciones.distanciador ? (formData?.distanciador?.dbse ? `${formData.distanciador.dbse} mm` : 'SÍ') : 'NO' },
                  ...(formData?.especificaciones.reductor ? [
                    { label: "Reductor", value: 'SÍ' },
                    ...(formData?.reductor?.relacion_npm ? [{ label: "Relación", value: formData.reductor.relacion_npm }] : []),
                    ...(formData?.reductor?.eje_salida ? [{ label: "Ø Eje Salida", value: `${formData.reductor.eje_salida} mm` }] : []),
                    ...(formData?.reductor?.eje_conducido ? [{ label: "Ø Eje Conducido", value: `${formData.reductor.eje_conducido} mm` }] : []),
                  ] : [
                    { label: "Reductor", value: 'NO' }
                  ]),
                  { label: "Sistema Fusible", value: formData?.especificaciones.acople ? 'SÍ' : 'NO' },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-700 text-sm" style={{ fontFamily: 'Poppins' }}>{item.label}</span>
                    <span className="font-semibold text-gray-800 text-sm" style={{ fontFamily: 'Poppins' }}>{item.value}</span>
                  </div>
                ))}
              </div>
              
              <button 
                className="w-full bg-gray-600 hover:bg-gray-700 text-white rounded-lg px-6 py-3 font-semibold transition-colors duration-200 mt-6" 
                style={{ fontFamily: 'Poppins' }}
                onClick={() => navigate(`/app/${formData?.applicationId}`, { state: formData })}
              >
                Modificar Especificaciones
              </button>
            </div>
          </div>
        </div>
        
        {/* Advantages Section */}
        <div className="bg-gradient-to-br from-teal-50 to-white rounded-xl shadow-lg border border-teal-100 p-8 mb-8">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold text-gray-800 mb-2" style={{ fontFamily: 'Poppins' }}>
              Ventajas del Acoplamiento Seleccionado
            </h3>
            <div className="w-24 h-1 bg-teal-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {resultado.ventajas.map((ventaja, i) => (
              <div key={i} className="flex items-start gap-4 bg-white rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg p-2.5 shadow-sm">
                    <img 
                      src={icons[i % icons.length]?.icon || getImagePath("/icons/Alta performance.png")} 
                      alt="advantage" 
                      className="w-full h-full object-contain filter brightness-0 invert" 
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-gray-700 text-base leading-relaxed" style={{ fontFamily: 'Poppins', lineHeight: '1.6' }}>
                    {ventaja}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="bg-white rounded-xl shadow-lg border p-8 mb-8">
          <div className="text-center mb-6">
            <h3 className="text-lg font-bold text-gray-800 mb-2" style={{ fontFamily: 'Poppins' }}>
              Acciones
            </h3>
            <p className="text-gray-600 text-sm" style={{ fontFamily: 'Poppins' }}>
              Descargar informe, solicitar cotización o compartir resultado
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            <button 
              onClick={async () => {
                if (reportRef.current) {
                  // Show the report temporarily
                  reportRef.current.style.display = 'block';
                  
                  try {
                    // Generate canvas from the report
                    const canvas = await html2canvas(reportRef.current, {
                      scale: 2,
                      backgroundColor: '#ffffff',
                      logging: false,
                      useCORS: true,
                      allowTaint: true
                    });
                    
                    // Convert to blob and download
                    canvas.toBlob((blob) => {
                      if (blob) {
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = `Informe_${resultado.name.replace(/\s+/g, '_')}_${formData?.especificaciones.name_tag_id || 'Equipo'}.png`;
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                        URL.revokeObjectURL(url);
                      }
                    }, 'image/png');
                  } catch (error) {
                    console.error('Error generating report:', error);
                    alert('Error al generar el informe. Por favor intente nuevamente.');
                  } finally {
                    // Hide the report again
                    reportRef.current.style.display = 'none';
                  }
                }
              }}
              className="bg-teal-700 hover:bg-teal-800 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200 flex items-center gap-2" 
              style={{ fontFamily: 'Poppins' }}
            >
              <img src={getImagePath("/icons/descargar.png")} alt="Descargar" className="w-5 h-5" />
              Descargar Informe
            </button>
            
            <button 
              onClick={() => {
                // Create email content for quote request
                const emailSubject = encodeURIComponent(`Solicitud de Cotización - ${resultado.name}`);
                const emailBody = encodeURIComponent(
                  `Estimados,\n\n` +
                  `Solicito cotización para el siguiente acoplamiento:\n\n` +
                  `Equipo: ${formData?.especificaciones.name_tag_id}\n` +
                  `Acoplamiento Recomendado: ${resultado.name}\n` +
                  `${resultado.couplingModel ? `Modelo FUNDAL: ${resultado.couplingModel.model}\n` : ''}` +
                  `Factor de Servicio: ${resultado.factorServicio}\n` +
                  `${resultado.calculatedTorqueNm ? `Torque Requerido: ${resultado.calculatedTorqueNm} Nm\n` : ''}` +
                  `${resultado.couplingModel ? `Torque Nominal: ${resultado.couplingModel.torqueNm} Nm\n` : ''}\n` +
                  `Especificaciones Técnicas:\n` +
                  `- Potencia: ${formData?.especificaciones.potencia} ${formData?.especificaciones.hp_or_kw ? 'kW' : 'HP'}\n` +
                  `- Velocidad: ${formData?.especificaciones.velocidad_rpm} RPM\n` +
                  `- Ø Eje Conductor: ${formData?.especificaciones.eje_conductor} mm\n` +
                  `- Ø Eje Conducido: ${formData?.especificaciones.eje_conducido} mm\n` +
                  `- Sistema Fusible: ${formData?.especificaciones.acople ? 'SÍ' : 'NO'}\n\n` +
                  `Por favor enviar cotización con tiempos de entrega.\n\n` +
                  `Saludos cordiales.`
                );
                
                window.open(`mailto:ventas@fundaltransmisiones.com.ar?subject=${emailSubject}&body=${emailBody}`);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200 flex items-center gap-2" 
              style={{ fontFamily: 'Poppins' }}
            >
              <img src={getImagePath("/icons/cotizar.png")} alt="Cotizar" className="w-5 h-5" />
              Solicitar Cotización
            </button>
            
            <button 
              onClick={() => {
                // Share functionality using Web Share API or fallback to copy URL
                const shareData = {
                  title: `${resultado.name} - Fundal Transmisiones`,
                  text: `Acoplamiento recomendado: ${resultado.name} (Factor de Servicio: ${resultado.factorServicio})`,
                  url: window.location.href
                };
                
                if (navigator.share) {
                  navigator.share(shareData).catch((error) => {
                    console.log('Error sharing:', error);
                    // Fallback to copy URL
                    navigator.clipboard.writeText(window.location.href).then(() => {
                      alert('Enlace copiado al portapapeles');
                    });
                  });
                } else {
                  // Fallback: copy URL to clipboard
                  navigator.clipboard.writeText(window.location.href).then(() => {
                    alert('Enlace copiado al portapapeles');
                  }).catch(() => {
                    // Final fallback: show URL in alert
                    alert(`Compartir este enlace: ${window.location.href}`);
                  });
                }
              }}
              className="bg-gray-600 hover:bg-gray-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200 flex items-center gap-2" 
              style={{ fontFamily: 'Poppins' }}
            >
              <img src={getImagePath("/icons/compartir.png")} alt="Compartir" className="w-5 h-5" />
              Compartir
            </button>
          </div>
        </div>
        
        {/* Navigation Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <button 
            className="bg-gray-500 hover:bg-gray-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200"
            onClick={() => navigate('/')} 
            style={{ fontFamily: 'Poppins' }}
          >
            ← Volver al Inicio
          </button>
          <button 
            className="bg-teal-700 hover:bg-teal-800 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200" 
            style={{ fontFamily: 'Poppins' }}
            onClick={() => navigate('/')}
          >
            Nueva Selección
          </button>
        </div>
      </div>
      
      {/* Hidden Report Template for Image Generation */}
      <div ref={reportRef} style={{ display: 'none', position: 'absolute', left: '-9999px', width: '800px', padding: '40px', backgroundColor: 'white' }}>
        <div style={{ fontFamily: 'Arial, sans-serif' }}>
          {/* Header */}
          <div style={{ borderBottom: '3px solid #14b8a6', paddingBottom: '20px', marginBottom: '30px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h1 style={{ color: '#134e4a', fontSize: '32px', margin: '0' }}>FUNDAL</h1>
                <p style={{ color: '#666', fontSize: '14px', margin: '5px 0 0 0' }}>TRANSMISIONES</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ color: '#666', fontSize: '14px', margin: '0' }}>INFORME TÉCNICO</p>
                <p style={{ color: '#666', fontSize: '12px', margin: '5px 0 0 0' }}>{new Date().toLocaleDateString('es-ES')}</p>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div style={{ marginBottom: '30px' }}>
            <h2 style={{ color: '#134e4a', fontSize: '24px', marginBottom: '20px' }}>Acoplamiento Recomendado</h2>
            
            {/* Coupling Info Box */}
            <div style={{ backgroundColor: '#f0fdfa', border: '1px solid #5eead4', borderRadius: '8px', padding: '20px', marginBottom: '20px' }}>
              <h3 style={{ color: '#134e4a', fontSize: '20px', margin: '0 0 10px 0' }}>{resultado.name}</h3>
              {resultado.couplingModel && (
                <p style={{ fontSize: '18px', color: '#0891b2', margin: '5px 0', fontWeight: 'bold' }}>
                  Modelo: {resultado.couplingModel.model}
                </p>
              )}
              <p style={{ color: '#666', margin: '10px 0 0 0' }}>{resultado.description}</p>
            </div>
            
            {/* Technical Data */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              <div style={{ backgroundColor: '#f9fafb', borderRadius: '8px', padding: '15px' }}>
                <h4 style={{ color: '#134e4a', fontSize: '16px', margin: '0 0 15px 0' }}>Datos del Equipo</h4>
                <div style={{ fontSize: '14px', color: '#666' }}>
                  <p style={{ margin: '8px 0' }}><strong>Equipo:</strong> {formData?.especificaciones.name_tag_id}</p>
                  <p style={{ margin: '8px 0' }}><strong>Aplicación:</strong> {formData?.subApplication || 'N/A'}</p>
                  <p style={{ margin: '8px 0' }}><strong>Potencia:</strong> {formData?.especificaciones.potencia} {formData?.especificaciones.hp_or_kw ? 'kW' : 'HP'}</p>
                  <p style={{ margin: '8px 0' }}><strong>Velocidad:</strong> {formData?.especificaciones.velocidad_rpm} RPM</p>
                  <p style={{ margin: '8px 0' }}><strong>Ø Conductor:</strong> {formData?.especificaciones.eje_conductor} mm</p>
                  <p style={{ margin: '8px 0' }}><strong>Ø Conducido:</strong> {formData?.especificaciones.eje_conducido} mm</p>
                </div>
              </div>
              
              <div style={{ backgroundColor: '#f9fafb', borderRadius: '8px', padding: '15px' }}>
                <h4 style={{ color: '#134e4a', fontSize: '16px', margin: '0 0 15px 0' }}>Datos Calculados</h4>
                <div style={{ fontSize: '14px', color: '#666' }}>
                  <p style={{ margin: '8px 0' }}><strong>Factor de Servicio:</strong> {resultado.factorServicio}</p>
                  {resultado.calculatedTorqueNm && (
                    <p style={{ margin: '8px 0' }}><strong>Torque Requerido:</strong> {resultado.calculatedTorqueNm} Nm</p>
                  )}
                  {resultado.couplingModel && (
                    <>
                      <p style={{ margin: '8px 0' }}><strong>Torque Nominal:</strong> {resultado.couplingModel.torqueNm} Nm</p>
                      <p style={{ margin: '8px 0' }}><strong>RPM Máximo:</strong> {resultado.couplingModel.maxRPM}</p>
                      <p style={{ margin: '8px 0' }}><strong>Diámetro Máx:</strong> {resultado.couplingModel.boreDiameterMax} mm</p>
                    </>
                  )}
                </div>
              </div>
            </div>
            
            {/* Advantages */}
            <div style={{ backgroundColor: '#f0fdf4', border: '1px solid #86efac', borderRadius: '8px', padding: '20px' }}>
              <h4 style={{ color: '#134e4a', fontSize: '16px', margin: '0 0 15px 0' }}>Ventajas del Acoplamiento</h4>
              <ul style={{ margin: '0', paddingLeft: '20px', color: '#666', fontSize: '14px' }}>
                {resultado.ventajas.map((ventaja, i) => (
                  <li key={i} style={{ margin: '5px 0' }}>{ventaja}</li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Footer */}
          <div style={{ borderTop: '2px solid #e5e7eb', paddingTop: '20px', marginTop: '30px', fontSize: '12px', color: '#9ca3af' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <p style={{ margin: '2px 0' }}>FUNDAL Transmisiones</p>
                <p style={{ margin: '2px 0' }}>www.fundaltransmisiones.com.ar</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ margin: '2px 0' }}>Fórmula: Torque (Nm) = (7026 × HP) / RPM × FS</p>
                <p style={{ margin: '2px 0' }}>Generado automáticamente</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AcoplamientoApp;