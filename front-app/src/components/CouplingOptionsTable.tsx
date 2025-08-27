import { useState } from 'react';
import type { CouplingOption } from '../couplingDatabase';

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
  title, 
  nominalTorque, 
  requiredTorque, 
  rpm,
  conductorDiameter,
  conducidoDiameter,
  onSelectOption,
  selectedOption
}: CouplingOptionsTableProps) {
  const [expandedSeries, setExpandedSeries] = useState<string[]>([]);

  // Group options by series
  const groupedOptions = options.reduce((acc, option) => {
    if (!acc[option.series]) {
      acc[option.series] = [];
    }
    acc[option.series].push(option);
    return acc;
  }, {} as Record<string, CouplingOption[]>);

  const toggleSeries = (series: string) => {
    setExpandedSeries(prev => 
      prev.includes(series) 
        ? prev.filter(s => s !== series)
        : [...prev, series]
    );
  };

  if (options.length === 0) {
    return (
      <div className="bg-gray-50 rounded-lg p-6 text-center">
        <p className="text-gray-600">No se encontraron opciones de acoplamiento válidas.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white p-4">
        <h3 className="text-lg font-bold" style={{ fontFamily: 'Poppins' }}>
          {title}
        </h3>
        <div className="mt-2 text-sm opacity-90 grid grid-cols-2 md:grid-cols-3 gap-2">
          <div>
            <span className="font-medium">Torque Nominal:</span> {nominalTorque} Nm
          </div>
          <div>
            <span className="font-medium">Torque Requerido:</span> {requiredTorque} Nm
          </div>
          <div>
            <span className="font-medium">RPM:</span> {rpm}
          </div>
          <div>
            <span className="font-medium">Ø Conductor:</span> {conductorDiameter} mm
          </div>
          <div>
            <span className="font-medium">Ø Conducido:</span> {conducidoDiameter} mm
          </div>
        </div>
      </div>

      {/* Options by Series */}
      <div className="divide-y divide-gray-200">
        {Object.entries(groupedOptions).map(([series, seriesOptions]) => {
          const isExpanded = expandedSeries.includes(series) || seriesOptions.length === 1;
          const hasRecommended = seriesOptions.some(opt => opt === selectedOption);
          
          return (
            <div key={series} className="border-l-4 border-teal-500">
              {/* Series Header */}
              <div 
                className={`p-4 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer ${hasRecommended ? 'bg-teal-50 hover:bg-teal-100' : ''}`}
                onClick={() => toggleSeries(series)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <svg 
                      className={`w-5 h-5 text-gray-600 transition-transform ${isExpanded ? 'rotate-90' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                    <h4 className="font-semibold text-gray-800" style={{ fontFamily: 'Poppins' }}>
                      {series}
                    </h4>
                    {hasRecommended && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-100 text-teal-800">
                        Recomendado
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-gray-600">
                    {seriesOptions.length} {seriesOptions.length === 1 ? 'opción' : 'opciones'}
                  </div>
                </div>
              </div>

              {/* Series Options */}
              {isExpanded && (
                <div className="bg-white">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Modelo
                          </th>
                          <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            FS Resultante
                          </th>
                          <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Torque Máx
                          </th>
                          <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            RPM Máx
                          </th>
                          <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Ø Min-Máx
                          </th>
                          <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Código
                          </th>
                          <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Acción
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {seriesOptions.map((option, idx) => {
                          const isSelected = option === selectedOption;
                          const meetsRequirements = option.factorServicioResultante >= 1.0;
                          
                          return (
                            <tr 
                              key={`${option.model.model}-${idx}`}
                              className={`
                                ${isSelected ? 'bg-teal-50' : 'hover:bg-gray-50'}
                                ${!meetsRequirements ? 'opacity-60' : ''}
                                transition-colors
                              `}
                            >
                              <td className="px-4 py-3 text-sm font-medium text-gray-900">
                                <div className="flex items-center gap-2">
                                  {option.model.model}
                                  {isSelected && (
                                    <svg className="w-4 h-4 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                  )}
                                </div>
                              </td>
                              <td className="px-4 py-3 text-sm text-center">
                                <span className={`
                                  inline-flex items-center px-2 py-1 rounded-md font-semibold
                                  ${option.factorServicioResultante >= 1.5 ? 'bg-green-100 text-green-800' : 
                                    option.factorServicioResultante >= 1.0 ? 'bg-yellow-100 text-yellow-800' : 
                                    'bg-red-100 text-red-800'}
                                `}>
                                  {option.factorServicioResultante.toFixed(2)}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-600 text-center">
                                {option.maxTorqueNm.toLocaleString()} Nm
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-600 text-center">
                                {option.maxRPM.toLocaleString()}
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-600 text-center">
                                {option.minShaftDiameter}-{option.maxShaftDiameter} mm
                              </td>
                              <td className="px-4 py-3 text-sm font-mono text-gray-700 text-center">
                                {option.couplingCode}
                              </td>
                              <td className="px-4 py-3 text-sm text-center">
                                {onSelectOption && (
                                  <button
                                    onClick={() => onSelectOption(option)}
                                    className={`
                                      px-3 py-1 rounded-md text-xs font-medium transition-colors
                                      ${isSelected 
                                        ? 'bg-teal-600 text-white cursor-default' 
                                        : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                                      }
                                    `}
                                    disabled={isSelected}
                                  >
                                    {isSelected ? 'Seleccionado' : 'Seleccionar'}
                                  </button>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="bg-gray-50 px-4 py-3 border-t border-gray-200">
        <div className="flex flex-wrap gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-100 rounded"></div>
            <span className="text-gray-600">FS &ge; 1.5 (Óptimo)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-100 rounded"></div>
            <span className="text-gray-600">1.0 &le; FS &lt; 1.5 (Aceptable)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-100 rounded"></div>
            <span className="text-gray-600">FS &lt; 1.0 (No recomendado)</span>
          </div>
        </div>
      </div>
    </div>
  );
}