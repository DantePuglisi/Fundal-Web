import { useNavigate } from "react-router-dom";
import { useState } from "react";
import type FactorServiceResult from '../../interfaces/all_interfaces';
import acoplamiento_logo from "../../../public/Acoples render/1.png";
const icons = [
  { icon: "/icons/performance.svg", label: "Alta performance" },
  { icon: "/icons/vida-util.svg", label: "Vida útil prolongada" },
  { icon: "/icons/estabilidad.svg", label: "Estabilidad dinámica" },
  { icon: "/icons/eficiencia.svg", label: "Eficiencia" },
  { icon: "/icons/elastica.svg", label: "Excelente respuesta elástica" },
  { icon: "/icons/mantenimiento.svg", label: "Mantenimiento fácil y rápido" },
];

function AcoplamientoApp() {
  const [factorServiceResult, setFactorServiceResult] = useState<FactorServiceResult | ''>('');
  const navigate = useNavigate();

  return (
    <div className="w-full flex flex-col items-center px-24 pb-8">
      <h2 className="text-xl sm:text-3xl font-poppins font-bold text-center mb-8 mt-[-45px] text-teal-900" style={{ fontFamily: 'Poppins' }}>
        El acoplamiento ideal para su aplicación es:
      </h2>
      <div className="w-full flex flex-col lg:flex-row justify-center items-stretch gap-6 mb-8">
        <div className="bg-white border-[1px] border-gray-300 rounded-2xl shadow-lg flex items-center justify-center p-8 min-h-[320px] max-h-[420px] min-w-[380px] max-w-[420px] mx-auto">
          <img src={acoplamiento_logo} alt="Acoplamiento" className="max-h-48 object-contain" />
        </div>
        {/* Info central */}
        <div className="flex-1 flex flex-col justify-between py-3 items-center lg:items-start gap-4">
          <div>
            <span className="font-bold font-poppins text-lg text-gray-600" style={{ fontFamily: 'Poppins' }}>Nombre / TAG / ID de su equipo</span>
            <p className="text-gray-600 font-poppins text-sm max-w-xs" style={{ fontFamily: 'Poppins' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat.
            </p>
          </div>
          <div className="mt-2">
            <span className="font-bold font-poppins text-base text-gray-600" style={{ fontFamily: 'Poppins' }}>Factor de servicio resultante:</span>
            <input
                        type="number"
                        className="bg-[#E9EFEF] rounded-md w-full h-10 flex items-center justify-start px-2  text-xl text-gray-700 font-bold outline-none"
                        value={factorServiceResult.value}
                        onChange={e => setFactorServiceResult({ ...factorServiceResult, value: e.target.value })}
                        placeholder=""
                    />
          </div>
        </div>
        {/* Datos proporcionados */}
        <div className="bg-[#F1F1F1] rounded-2xl shadow-lg px-6 py-6 min-w-[260px] max-w-[340px] mx-auto flex flex-col justify-between">
          <span className="font-bold font-poppins text-lg mb-2 text-gray-600" style={{ fontFamily: 'Poppins' }}>Datos proporcionados para el calculo</span>
          <div className="text-sm font-poppins text-gray-700 flex flex-col gap-1 mb-4">
            <div className="flex justify-between"><span style={{ fontFamily: 'Poppins' }}>Potencia:</span><span>Lorem ipsum</span></div>
            <div className="flex justify-between"><span style={{ fontFamily: 'Poppins' }}>Velocidad (rpm):</span><span>Lorem ipsum</span></div>
            <div className="flex justify-between"><span style={{ fontFamily: 'Poppins' }}>Ø de eje conductor:</span><span>Lorem ipsum</span></div>
            <div className="flex justify-between"><span style={{ fontFamily: 'Poppins' }}>Ø de eje conducido:</span><span>Lorem ipsum</span></div>
            <div className="flex justify-between"><span style={{ fontFamily: 'Poppins' }}>¿Tiene distanciador?</span><span>SÍ/NO</span></div>
            <div className="flex justify-between"><span style={{ fontFamily: 'Poppins' }}>DBSE (mm):</span><span>Lorem ipsum</span></div>
            <div className="flex justify-between"><span style={{ fontFamily: 'Poppins' }}>¿Tiene Reductor?</span><span>SÍ/NO</span></div>
            <div className="flex justify-between"><span style={{ fontFamily: 'Poppins' }}>Relación de reducción:</span><span>Lorem ipsum</span></div>
            <div className="flex justify-between"><span style={{ fontFamily: 'Poppins' }}>Ø de eje salida del reductor:</span><span>Lorem ipsum</span></div>
            <div className="flex justify-between"><span style={{ fontFamily: 'Poppins' }}>Ø de eje equipo conducido:</span><span>Lorem ipsum</span></div>
            <div className="flex justify-between"><span style={{ fontFamily: 'Poppins' }}>¿Quiere acople con sistema fusible?</span><span>SÍ/NO</span></div>
          </div>
          <button className="bg-white rounded-full px-8 py-2 font-bold text-gray-700 shadow hover:bg-gray-200 hover:cursor-pointer transition" style={{ fontFamily: 'Poppins' }}>Modificar</button>
        </div>
      </div>
      {/* Ventajas */}
      <h3 className="text-lg sm:text-xl font-poppins font-bold text-left mt-8 mb-4 text-teal-900" style={{ fontFamily: 'Poppins' }}>
        Ventajas de este acoplamiento para su aplicación:
      </h3>
        <div className="flex flex-wrap justify-center gap-4 mb-8">
                {icons.map((v, i) => (
                    <div
                    key={i}
                    className="flex flex-col items-center justify-center bg-[#F7F7F7] rounded-full shadow w-34 h-34"
                    >
                    <img src={v.icon} alt="img" className="w-10 h-10 mb-2" />
                    <span className="text-xs font-poppins text-gray-700 text-center px-2 break-words" style={{ fontFamily: 'Poppins' }}>
                        {v.label}
                    </span>
                    </div>
                ))}
        </div>
      {/* Botones */}
      <div className="flex flex-wrap justify-center gap-2 mt-4">
        <button className="flex items-center gap-2 bg-orange-500 hover:cursor-pointer hover:bg-orange-600 text-white font-bold px-6 py-2 rounded-full shadow transition" style={{ fontFamily: 'Poppins' }}>
          <img src="/icons/descargar.svg" alt="Descargar" className="w-5 h-5" />
          Descargar
        </button>
        <button className="flex items-center gap-2 bg-orange-500 hover:cursor-pointer hover:bg-orange-600 text-white font-bold px-6 py-2 rounded-full shadow transition" style={{ fontFamily: 'Poppins' }}>
          <img src="/icons/cotizar.svg" alt="Cotizar" className="w-5 h-5" />
          Cotizar
        </button>
        <button className="flex items-center gap-2 bg-orange-500 hover:cursor-pointer hover:bg-orange-600 text-white font-bold px-6 py-2 rounded-full shadow transition" style={{ fontFamily: 'Poppins' }}>
          <img src="/icons/compartir.svg" alt="Compartir" className="w-5 h-5" />
          Compartir
        </button>
      </div>
      <div className="flex flex-wrap justify-around gap-4 mt-6 w-full">
        <button className="bg-gray-400 hover:bg-gray-500 hover:cursor-pointer text-white font-bold px-8 py-2 rounded-full shadow transition ml-4"
        onClick={() => navigate('/')} style={{ fontFamily: 'Poppins' }}
        >
          Volver
        </button>
        <button className="bg-teal-900 hover:bg-teal-800 hover:cursor-pointer text-white font-bold px-8 py-2 rounded-full shadow transition ml-4" style={{ fontFamily: 'Poppins' }}>
          Nueva selección
        </button>
      </div>
    </div>
  );
}

export default AcoplamientoApp;