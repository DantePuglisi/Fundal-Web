// import React from 'react'; // Not needed for modern React
import type { CouplingOption } from '../couplingDatabase';
import { getImagePath } from '../utils/imagePaths';

// Function to get coupling image based on series (handles both display names and database names)
function getCouplingImage(series: string): string {
  switch (series) {
    case 'FA':
    case 'FA Estándar':
      return getImagePath("/Acoples render/FA.png");
    case 'FA/D':
    case 'FA con Distanciador':
      return getImagePath("/Acoples render/FA-D.png");
    case 'FA/C':
    case 'FA con Cardán':
      return getImagePath("/Acoples render/FA-C.png");
    case 'FA/FUS':
      return getImagePath("/Acoples render/FA-FUS.png");
    case 'FAS NG-H':
    case 'FAS NG Heavy Duty':
      return getImagePath("/Acoples render/FAS-NG-H.png");
    case 'FAS NG':
      return getImagePath("/Acoples render/FAS-NG.png");
    case 'FAS NG-LP/FUS':
      return getImagePath("/Acoples render/FAS-NG-LP-FUS.png");
    case 'FAS NG-LP':
    case 'FAS NG Large Power':
      return getImagePath("/Acoples render/FAS-NG-LP.png");
    default:
      return getImagePath("/Acoples render/FA.png");
  }
}

interface CouplingOptionsTableProps {
  options: CouplingOption[];
  title: string;
  nominalTorque: number;
  requiredTorque: number;
  rpm: number;
  conductorDiameter: number;
  conducidoDiameter: number;
  onSelectOption?: (option: CouplingOption) => void;
  selectedOption?: CouplingOption;
}

export function CouplingOptionsTable({ 
  options, 
  onSelectOption,
  selectedOption
}: CouplingOptionsTableProps) {

  if (options.length === 0) {
    return (
      <div className="bg-gray-50 rounded-lg p-6 text-center">
        <p className="text-gray-600">No se encontraron opciones de acoplamiento válidas.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">

      {/* Visual Coupling Cards Grid */}
      <div className="p-6">
        <div className={`grid gap-6 ${
          options.length === 1 ? 'grid-cols-1 max-w-md mx-auto' :
          options.length === 2 ? 'grid-cols-1 md:grid-cols-2' :
          options.length === 3 ? 'grid-cols-1 md:grid-cols-3' :
          options.length === 4 ? 'grid-cols-1 md:grid-cols-2' :
          options.length === 5 ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' :
          options.length === 6 ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' :
          'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
        }`}>
          {options.map((option, idx) => {
            const isSelected = option === selectedOption;
            
            return (
              <div 
                key={`${option.model.model}-${idx}`}
                className={`
                  relative bg-white rounded-lg border-2 p-4
                  ${isSelected 
                    ? 'border-teal-500 bg-teal-50' 
                    : 'border-gray-200'
                  }
                `}
              >

                {/* Top Section - Split horizontally */}
                <div className="flex gap-6 mb-4">
                  {/* Left side - Larger square coupling image */}
                  <div className="flex-shrink-0">
                    <div className="bg-gray-50 rounded-lg p-3 w-32 h-32 flex items-center justify-center">
                      <img 
                        src={getCouplingImage(option.series)} 
                        alt={`${option.series} ${option.model.model}`}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                  </div>

                  {/* Right side - Centered family name, model and service factor */}
                  <div className="flex-1 flex flex-col justify-center items-center text-center">
                    <h4 className="font-bold text-gray-900 text-sm mb-1" style={{ fontFamily: 'Poppins' }}>
                      {option.series}
                    </h4>
                    <p className="text-lg font-bold text-teal-700 mb-2">
                      {option.couplingCode || option.model.model}
                    </p>
                    <div>
                      <p className="text-xs text-gray-500 font-medium mb-1">Factor de Servicio Resultante</p>
                      <span className={`
                        inline-flex items-center px-3 py-1 rounded-full font-bold text-sm
                        ${option.factorServicioResultante >= 1.5 ? 'bg-green-100 text-green-800' : 
                          option.factorServicioResultante >= 1.0 ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-red-100 text-red-800'}
                      `}>
                        {option.factorServicioResultante.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Technical Specs */}
                <div className="space-y-3">

                  {/* Technical Data Grid */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-gray-50 rounded p-2 text-center">
                      <p className="text-gray-500 font-medium">Torque Máx</p>
                      <p className="font-bold text-gray-800">
                        {(option.maxTorqueNm / 1000).toFixed(1)}k Nm
                      </p>
                    </div>
                    <div className="bg-gray-50 rounded p-2 text-center">
                      <p className="text-gray-500 font-medium">RPM Máx</p>
                      <p className="font-bold text-gray-800">
                        {option.maxRPM.toLocaleString()}
                      </p>
                    </div>
                    <div className="bg-gray-50 rounded p-2 text-center">
                      <p className="text-gray-500 font-medium">Ø Min</p>
                      <p className="font-bold text-gray-800">
                        {option.minShaftDiameter} mm
                      </p>
                    </div>
                    <div className="bg-gray-50 rounded p-2 text-center">
                      <p className="text-gray-500 font-medium">Ø Máx</p>
                      <p className="font-bold text-gray-800">
                        {option.maxShaftDiameter} mm
                      </p>
                    </div>
                  </div>


                  {/* Masa Info */}
                  {option.masaType && (
                    <div className="text-center">
                      <p className="text-xs text-gray-500 font-medium">Masa</p>
                      <p className="text-sm font-semibold text-gray-700">
                        {option.masaType}
                      </p>
                    </div>
                  )}

                  {/* Selection Button */}
                  {onSelectOption && !isSelected && (
                    <button
                      onClick={() => onSelectOption(option)}
                      className="w-full mt-4 px-3 py-2 bg-teal-600 text-white text-sm font-medium rounded-md hover:bg-teal-700 transition-colors cursor-pointer"
                    >
                      Seleccionar
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}