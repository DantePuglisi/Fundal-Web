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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const checked = type === "checkbox" || type === "radio" ? (e.target as HTMLInputElement).checked : undefined;
        setForm((prev: EspecificacionesForm) => ({
            ...prev,
            [name]: type === "checkbox" || type === "radio" ? checked : value
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
            serviceFactor: applicationData?.serviceFactor
        };
        
        // Siempre navegar a los resultados, independientemente del estado del acople fusible
        navigate('/acoplamiento', { state: formData });
    };

    return (
        <div className="max-w-5xl mx-auto px-4">
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
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
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
                                        value={form.potencia}
                                        onChange={handleChange}
                                        className="w-24 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none text-center"
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
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
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
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
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
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
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
                                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
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
                                            <label className="block mb-2 font-medium text-gray-700" style={{ fontFamily: 'Poppins' }}>Relación de Reducción</label>
                                            <input
                                                type="text"
                                                name="relacion"
                                                value={reductor.relacion_npm}
                                                onChange={e => setReductor({ ...reductor, relacion_npm: e.target.value })}
                                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                                                placeholder="Ej: 10:1"
                                            />
                                        </div>
                                        <div>
                                            <label className="block mb-2 font-medium text-gray-700" style={{ fontFamily: 'Poppins' }}>Ø Eje Salida del Reductor (mm)</label>
                                            <input
                                                type="text"
                                                name="ejeSalida"
                                                value={reductor.eje_salida}
                                                onChange={e => setReductor({ ...reductor, eje_salida: e.target.value })}
                                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                                                placeholder="Diámetro en mm"
                                            />
                                        </div>
                                    </>
                                )}
                            </div>
                            {form.reductor && (
                                <div className="mt-4">
                                    <label className="block mb-2 font-medium text-gray-700" style={{ fontFamily: 'Poppins' }}>Ø Eje Conducido del Reductor (mm)</label>
                                    <input
                                        type="text"
                                        name="ejeConducido"
                                        value={reductor.eje_conducido}
                                        onChange={e => setReductor({ ...reductor, eje_conducido: e.target.value })}
                                        className="w-full md:w-1/3 border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                                        placeholder="Diámetro en mm"
                                    />
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
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                            <p className="text-center text-blue-700 text-sm" style={{ fontFamily: 'Poppins' }}>
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