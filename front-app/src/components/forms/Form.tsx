import { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Toggle from "../toggle";
import { getApplicationById } from "../../serviceFactorData";
import type { EspecificacionesForm, DistanciadorForm, ReductorForm } from '../../interfaces/all_interfaces';

function Form() {
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = useParams<{ id: string }>();
    
    // Get the application data and service factor from navigation state
    // Also check if we're coming back from results page with form data to pre-fill
    const navigationState = location.state as any;
    const applicationData = navigationState?.subApplication ? 
        { subApplication: navigationState.subApplication, serviceFactor: navigationState.serviceFactor } : null;
    const formDataFromResults = navigationState?.especificaciones || null;
    const distanciadorFromResults = navigationState?.distanciador || null;
    const reductorFromResults = navigationState?.reductor || null;
    
    const application = id ? getApplicationById(parseInt(id)) : null;
    
    const [form, setForm] = useState<EspecificacionesForm>(formDataFromResults || {
        name_tag_id: "",
        hp_or_kw: false, // false = HP (default), true = kW
        potencia: 0,
        velocidad_rpm: "",
        eje_conductor: "",
        eje_conducido: "",
        distanciador: false,
        reductor: false,
        acople: false
    });

    const [distanciador, setDistanciador] = useState<DistanciadorForm>(distanciadorFromResults || {
        dbse: ""
    });

    const [reductor, setReductor] = useState<ReductorForm>(reductorFromResults || {
        relacion_npm: "",
        eje_salida: "",
        eje_conducido: ""
    });

    const [errors, setErrors] = useState<string[]>([]);
    
    // Service Factor customization state
    const [useCustomFS, setUseCustomFS] = useState<boolean>(false);
    const [customServiceFactor, setCustomServiceFactor] = useState<number>(applicationData?.serviceFactor || 1.5);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const checked = type === "checkbox" || type === "radio" ? (e.target as HTMLInputElement).checked : undefined;
        
        let processedValue: string | number | boolean = value;
        
        // Handle potencia field conversion
        if (name === "potencia") {
            processedValue = value === "" ? 0 : parseFloat(value) || 0;
        }
        
        setForm((prev: EspecificacionesForm) => ({
            ...prev,
            [name]: type === "checkbox" || type === "radio" ? checked : processedValue
        }));
        // Clear errors when user starts typing
        if (errors.length > 0) {
            setErrors([]);
        }
    };

    const validateForm = () => {
        const newErrors: string[] = [];
        
        // Campos siempre requeridos (campos básicos)
        // name_tag_id is now optional
        if (form.potencia <= 0) newErrors.push("La potencia debe ser mayor a 0");
        if (!form.velocidad_rpm.trim()) newErrors.push("La velocidad (RPM) es requerida");
        if (!form.eje_conductor.trim()) newErrors.push("El diámetro del eje conductor es requerido");
        if (!form.eje_conducido.trim()) newErrors.push("El diámetro del eje conducido es requerido");
        
        // Solo validar DBSE si "Tiene distanciador" está en "SÍ"
        if (form.distanciador && !distanciador.dbse.trim()) {
            newErrors.push("DBSE es requerido cuando tiene distanciador");
        }
        
        // Solo validar campos de reductor si "Tiene Reductor" está en "SÍ"
        if (form.reductor) {
            if (!reductor.relacion_npm.trim()) newErrors.push("Relación de reducción es requerida");
            if (!reductor.eje_salida.trim()) newErrors.push("Diámetro del eje de salida del reductor es requerido");
            if (!reductor.eje_conducido.trim()) newErrors.push("Diámetro del eje conducido del reductor es requerido");
        }
        
        // Validate custom service factor if used
        if (useCustomFS) {
            if (customServiceFactor < 0.5 || customServiceFactor > 5.0) {
                newErrors.push("El Factor de Servicio debe estar entre 0.5 y 5.0");
            }
        }
        
        if (newErrors.length > 0) {
            setErrors(newErrors);
            // Scroll to top to show errors
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return false;
        }
        
        setErrors([]);
        return true;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }
        
        const formData = {
            especificaciones: form,
            distanciador: form.distanciador ? distanciador : undefined,
            reductor: form.reductor ? reductor : undefined,
            applicationId: id ? parseInt(id) : undefined,
            subApplication: applicationData?.subApplication,
            serviceFactor: useCustomFS ? customServiceFactor : applicationData?.serviceFactor
        };
        
        // Siempre navegar a los resultados, independientemente del estado del acople fusible
        navigate('/acoplamiento', { state: formData });
    };

    return (
        <div className="max-w-5xl mx-auto px-4 pb-12">
            <div className="text-center mb-8">
                <h2 className='text-gray-800 font-bold text-2xl lg:text-3xl mb-3' style={{ fontFamily: 'Poppins' }}>
                    Especificaciones del Equipo
                </h2>
                <p className='text-gray-600 font-medium mb-6' style={{ fontFamily: 'Poppins' }}>
                    Complete los datos técnicos de su aplicación
                </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg border p-8">
                {/* Error Display */}
                {errors.length > 0 && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                        <div className="flex items-start">
                            <svg className="w-5 h-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                            <div className="flex-1">
                                <h3 className="text-sm font-semibold text-red-800 mb-2" style={{ fontFamily: 'Poppins' }}>
                                    Por favor corrija los siguientes errores:
                                </h3>
                                <ul className="text-sm text-red-700 space-y-1 list-disc list-inside">
                                    {errors.map((error, index) => (
                                        <li key={index}>{error}</li>
                                    ))}
                                </ul>
                            </div>
                            <button
                                type="button"
                                onClick={() => setErrors([])}
                                className="text-red-400 hover:text-red-600 ml-3"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    </div>
                )}

                {/* Application Info */}
                {application && applicationData && (
                    <div className="bg-teal-50 rounded-lg border border-teal-200 p-6 mb-8">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white rounded-lg p-2 shadow-sm border">
                                <img src={application.icon} alt={application.name} className="w-full h-full object-contain" />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-bold text-gray-800 text-lg" style={{ fontFamily: 'Poppins' }}>
                                    {application.name}
                                </h3>
                                <p className="text-gray-600 text-sm" style={{ fontFamily: 'Poppins' }}>
                                    {applicationData.subApplication}
                                </p>
                                <p className="text-teal-700 text-sm font-semibold" style={{ fontFamily: 'Poppins' }}>
                                    Factor de Servicio: {applicationData.serviceFactor.toFixed(2)}
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => navigate('/')}
                                className="text-teal-600 hover:text-teal-700 font-medium text-sm underline"
                                style={{ fontFamily: 'Poppins' }}
                            >
                                Cambiar aplicación
                            </button>
                        </div>
                    </div>
                )}

                {/* Service Factor Customization */}
                {application && applicationData && (
                    <div className="rounded-xl shadow-lg border border-teal-200 p-6 mb-8 bg-gradient-to-br from-teal-50 to-white">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-teal-600 to-teal-700 rounded-lg flex items-center justify-center shadow-md">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-800 text-lg" style={{ fontFamily: 'Poppins' }}>
                                        Factor de Servicio
                                    </h3>
                                    <p className="text-sm text-teal-600 font-medium">Personalice según su aplicación específica</p>
                                </div>
                            </div>
                            
                            <div className="space-y-4">
                                <div className="bg-white rounded-lg border border-teal-100 p-4 hover:border-teal-200 transition-all duration-200">
                                    <label className="flex items-center gap-3 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="serviceFactorType"
                                            checked={!useCustomFS}
                                            onChange={() => setUseCustomFS(false)}
                                            className="w-5 h-5 text-teal-600 focus:ring-teal-500"
                                        />
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2">
                                                <span className="font-semibold text-gray-800" style={{ fontFamily: 'Poppins' }}>
                                                    Usar recomendado
                                                </span>
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-100 text-teal-800">
                                                    {applicationData.serviceFactor.toFixed(2)}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-600 mt-1">
                                                Factor optimizado para {applicationData.subApplication}
                                            </p>
                                        </div>
                                    </label>
                                </div>
                                
                                <div className="bg-white rounded-lg border border-teal-100 p-4 hover:border-teal-200 transition-all duration-200">
                                    <label className="flex items-start gap-3 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="serviceFactorType"
                                            checked={useCustomFS}
                                            onChange={() => setUseCustomFS(true)}
                                            className="w-5 h-5 text-teal-600 focus:ring-teal-500 mt-0.5"
                                        />
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2">
                                                <span className="font-semibold text-gray-800" style={{ fontFamily: 'Poppins' }}>
                                                    Personalizar
                                                </span>
                                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-orange-100 text-orange-700">
                                                    Avanzado
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-600 mt-1">
                                                Definir factor personalizado basado en condiciones específicas
                                            </p>
                                            {useCustomFS && (
                                                <div className="mt-4 bg-gray-50 rounded-lg p-4 border-l-4 border-orange-400">
                                                    <div className="space-y-3">
                                                        <label className="block text-sm font-medium text-gray-700">
                                                            Factor personalizado:
                                                        </label>
                                                        <div className="flex items-center gap-3">
                                                            <input
                                                                type="number"
                                                                value={customServiceFactor}
                                                                onChange={(e) => setCustomServiceFactor(parseFloat(e.target.value) || 1.5)}
                                                                min="0.5"
                                                                max="5.0"
                                                                step="0.1"
                                                                className="w-32 bg-white border border-gray-300 rounded-lg px-4 py-3 text-center text-lg font-semibold focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                                                                placeholder="1.50"
                                                            />
                                                            <div className="text-sm text-gray-600">
                                                                <div className="font-medium">Rango: 0.5 - 5.0</div>
                                                                <div className="text-xs text-gray-500">Increments de 0.1</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {customServiceFactor !== applicationData.serviceFactor && (
                                                        <div className={`mt-3 text-sm flex items-center gap-2 ${
                                                            Math.abs(customServiceFactor - applicationData.serviceFactor) > applicationData.serviceFactor * 0.5 
                                                                ? 'text-amber-700' 
                                                                : 'text-orange-700'
                                                        }`}>
                                                            {Math.abs(customServiceFactor - applicationData.serviceFactor) > applicationData.serviceFactor * 0.5 
                                                                ? (
                                                                    <>
                                                                        <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                                                                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                                        </svg>
                                                                        <span>Factor muy diferente al recomendado</span>
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <svg className="w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                                                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                                                        </svg>
                                                                        <span>Factor personalizado aplicado</span>
                                                                    </>
                                                                )}
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Basic Information */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2" style={{ fontFamily: 'Poppins' }}>
                            Información Básica
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="md:col-span-2">
                                <label className="block mb-2 font-medium text-gray-700" style={{ fontFamily: 'Poppins' }}>
                                    Nombre / TAG / ID del equipo <span className="text-gray-500 font-normal">(Opcional)</span>
                                </label>
                                <input
                                    type="text"
                                    name="name_tag_id"
                                    value={form.name_tag_id || ""}
                                    onChange={handleChange}
                                    className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                                    placeholder="Ej: Bomba-001 o Motor Principal"
                                />
                            </div>
                            <div>
                                <label className="block mb-2 font-medium text-gray-700" style={{ fontFamily: 'Poppins' }}>
                                    Potencia
                                </label>
                                <div className="flex items-center gap-3 flex-wrap">
                                    <span className="text-sm font-semibold text-gray-700" style={{ fontFamily: 'Poppins' }}>HP</span>
                                    <Toggle
                                        checked={form.hp_or_kw}
                                        onChange={val => setForm(prev => ({ ...prev, hp_or_kw: val }))}
                                        id="hp-or-kw-toggle"
                                    />
                                    <span className="text-sm font-semibold text-gray-700" style={{ fontFamily: 'Poppins' }}>kW</span>
                                    <input
                                        type="number"
                                        name="potencia"
                                        value={form.potencia === 0 ? '' : form.potencia}
                                        onChange={handleChange}
                                        className="w-24 bg-white border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none text-center"
                                        placeholder="0"
                                        min="0"
                                        step="0.1"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Technical Specifications */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2" style={{ fontFamily: 'Poppins' }}>
                            Especificaciones Técnicas
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="block mb-2 font-medium text-gray-700" style={{ fontFamily: 'Poppins' }}>Velocidad (RPM)</label>
                                <input
                                    type="text"
                                    name="velocidad_rpm"
                                    value={form.velocidad_rpm}
                                    onChange={handleChange}
                                    className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                                    placeholder="Ej: 1800"
                                />
                            </div>
                            <div>
                                <label className="block mb-2 font-medium text-gray-700" style={{ fontFamily: 'Poppins' }}>Ø Eje Conductor (mm)</label>
                                <input
                                    type="text"
                                    name="eje_conductor"
                                    value={form.eje_conductor}
                                    onChange={handleChange}
                                    className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                                    placeholder="Ej: 45"
                                />
                            </div>
                            <div>
                                <label className="block mb-2 font-medium text-gray-700" style={{ fontFamily: 'Poppins' }}>Ø Eje Conducido (mm)</label>
                                <input
                                    type="text"
                                    name="eje_conducido"
                                    value={form.eje_conducido}
                                    onChange={handleChange}
                                    className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                                    placeholder="Ej: 50"
                                />
                            </div>
                        </div>
                    </div>
                    {/* Additional Components */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2" style={{ fontFamily: 'Poppins' }}>
                            Componentes Adicionales
                        </h3>
                        
                        {/* Distanciador */}
                        <div className="bg-gray-50 rounded-lg p-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                                <div>
                                    <label className="block mb-3 font-medium text-gray-700" style={{ fontFamily: 'Poppins' }}>¿Tiene distanciador?</label>
                                    <div className="flex items-center gap-3">
                                        <span className="text-sm font-semibold text-gray-700" style={{ fontFamily: 'Poppins' }}>NO</span>
                                        <Toggle
                                            checked={form.distanciador}
                                            onChange={val => setForm(prev => ({ ...prev, distanciador: val }))}
                                        />
                                        <span className="text-sm font-semibold text-gray-700" style={{ fontFamily: 'Poppins' }}>SÍ</span>
                                    </div>
                                </div>
                                {form.distanciador && (
                                    <div className="md:col-span-2">
                                        <label className="block mb-2 font-medium text-gray-700" style={{ fontFamily: 'Poppins' }}>DBSE (mm)</label>
                                        <input
                                            type="text"
                                            name="dbse"
                                            value={distanciador.dbse}
                                            onChange={e => setDistanciador({ ...distanciador, dbse: e.target.value })}
                                            className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                                            placeholder="Distancia entre ejes"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                        {/* Reductor */}
                        <div className="bg-gray-50 rounded-lg p-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                                <div>
                                    <label className="block mb-3 font-medium text-gray-700" style={{ fontFamily: 'Poppins' }}>¿Tiene Reductor?</label>
                                    <div className="flex items-center gap-3">
                                        <span className="text-sm font-semibold text-gray-700" style={{ fontFamily: 'Poppins' }}>NO</span>
                                        <Toggle
                                            checked={form.reductor}
                                            onChange={val => setForm(prev => ({ ...prev, reductor: val }))}
                                            id="reductor-toggle"
                                        />
                                        <span className="text-sm font-semibold text-gray-700" style={{ fontFamily: 'Poppins' }}>SÍ</span>
                                    </div>
                                </div>
                                {form.reductor && (
                                    <>
                                        <div>
                                            <label className="block mb-2 font-medium text-gray-700" style={{ fontFamily: 'Poppins' }}>
                                                Relación de Reducción
                                            </label>
                                            <div className="inline-flex items-center bg-gray-50 border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-teal-500 focus-within:border-transparent overflow-hidden">
                                                <div className="px-3 py-3 bg-gray-100 text-gray-600 font-medium text-center min-w-[2.5rem] border-r border-gray-300">
                                                    1:
                                                </div>
                                                <input
                                                    type="text"
                                                    name="relacion"
                                                    value={reductor.relacion_npm}
                                                    onChange={e => {
                                                        // Normalize decimal separators (allow both comma and dot)
                                                        let value = e.target.value;
                                                        // Allow only numbers, commas, and dots
                                                        value = value.replace(/[^0-9,\.]/g, '');
                                                        // Replace comma with dot for internal consistency
                                                        const normalizedValue = value.replace(',', '.');
                                                        setReductor({ ...reductor, relacion_npm: normalizedValue });
                                                    }}
                                                    className="w-20 px-3 py-3 bg-white border-0 focus:ring-0 focus:outline-none text-center"
                                                    placeholder="25.17"
                                                />
                                            </div>
                                            {reductor.relacion_npm && (
                                                <p className="text-xs text-teal-600 mt-1" style={{ fontFamily: 'Poppins' }}>
                                                    Relación: 1:{reductor.relacion_npm.replace('.', ',')}
                                                </p>
                                            )}
                                        </div>
                                    </>
                                )}
                            </div>
                            {form.reductor && (
                                <div className="mt-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block mb-2 font-medium text-gray-700" style={{ fontFamily: 'Poppins' }}>Ø Eje Salida del Reductor (mm)</label>
                                            <input
                                                type="text"
                                                name="ejeSalida"
                                                value={reductor.eje_salida}
                                                onChange={e => setReductor({ ...reductor, eje_salida: e.target.value })}
                                                className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                                                placeholder="Diámetro en mm"
                                            />
                                        </div>
                                        <div>
                                            <label className="block mb-2 font-medium text-gray-700" style={{ fontFamily: 'Poppins' }}>Ø Eje Conducido del Reductor (mm)</label>
                                            <input
                                                type="text"
                                                name="ejeConducido"
                                                value={reductor.eje_conducido}
                                                onChange={e => setReductor({ ...reductor, eje_conducido: e.target.value })}
                                                className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                                                placeholder="Diámetro en mm"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    {/* System Options */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2" style={{ fontFamily: 'Poppins' }}>
                            Opciones del Sistema
                        </h3>
                        <div className="bg-gray-50 rounded-lg p-6">
                            <div>
                                <label className="block mb-3 font-medium text-gray-700" style={{ fontFamily: 'Poppins' }}>¿Requiere acople con sistema fusible?</label>
                                <div className="flex items-center gap-3">
                                    <span className="text-sm font-semibold text-gray-700" style={{ fontFamily: 'Poppins' }}>NO</span>
                                    <Toggle
                                        checked={form.acople}
                                        onChange={val => setForm(prev => ({ ...prev, acople: val }))}
                                        id="acople-toggle"
                                    />
                                    <span className="text-sm font-semibold text-gray-700" style={{ fontFamily: 'Poppins' }}>SÍ</span>
                                </div>
                                <p className="text-xs text-gray-500 mt-2" style={{ fontFamily: 'Poppins' }}>
                                    El sistema fusible proporciona protección contra sobrecargas
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* Footer */}
                    <div className="pt-6 border-t border-gray-200">
                        <div className="rounded-lg border p-4 mb-6" style={{backgroundColor: '#DAD2D8', borderColor: '#C5BDC4'}}>
                            <p className="text-center text-gray-800 text-sm" style={{ fontFamily: 'Poppins' }}>
                                <strong>¿Necesita asistencia?</strong> En caso de que su requerimiento no pueda ser procesado por este sistema, 
                                comuníquese con nosotros a <a href="mailto:ventas@fundaltransmisiones.com.ar" className="underline font-medium">ventas@fundaltransmisiones.com.ar</a>
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row justify-between gap-4">
                            <button
                                type="button"
                                className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
                                onClick={() => navigate('/')}
                                style={{ fontFamily: 'Poppins' }}
                            >
                                ← Volver
                            </button>
                            <button
                                type="submit"
                                className="bg-teal-700 hover:bg-teal-800 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
                                style={{ fontFamily: 'Poppins' }}
                            >
                                Calcular Acoplamiento →
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        
    );
}

export default Form;