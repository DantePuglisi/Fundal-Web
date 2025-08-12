import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Toggle from "../toggle";
import type { EspecificacionesForm, DistanciadorForm, ReductorForm } from '../../interfaces/all_interfaces';

function Form() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [form, setForm] = useState<EspecificacionesForm>({
        name_tag_id: "",
        hp_or_kw: true,
        potencia: 0,
        velocidad_rpm: "",
        eje_conductor: "",
        eje_conducido: "",
        distanciador: false,
        reductor: false,
        acople: false
    });

    const [distanciador, setDistanciador] = useState<DistanciadorForm>({
        dbse: ""
    });

    const [reductor, setReductor] = useState<ReductorForm>({
        relacion_npm: "",
        eje_salida: "",
        eje_conducido: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const checked = type === "checkbox" || type === "radio" ? (e.target as HTMLInputElement).checked : undefined;
        setForm((prev: EspecificacionesForm) => ({
            ...prev,
            [name]: type === "checkbox" || type === "radio" ? checked : value
        }));
    };

    const validateForm = () => {
        const errors: string[] = [];
        
        // Campos siempre requeridos (campos básicos)
        if (!form.name_tag_id.trim()) errors.push("Nombre/TAG/ID es requerido");
        if (form.potencia <= 0) errors.push("La potencia debe ser mayor a 0");
        if (!form.velocidad_rpm.trim()) errors.push("La velocidad (RPM) es requerida");
        if (!form.eje_conductor.trim()) errors.push("El diámetro del eje conductor es requerido");
        if (!form.eje_conducido.trim()) errors.push("El diámetro del eje conducido es requerido");
        
        // Solo validar DBSE si "Tiene distanciador" está en "SÍ"
        if (form.distanciador && !distanciador.dbse.trim()) {
            errors.push("DBSE es requerido cuando tiene distanciador");
        }
        
        // Solo validar campos de reductor si "Tiene Reductor" está en "SÍ"
        if (form.reductor) {
            if (!reductor.relacion_npm.trim()) errors.push("Relación de reducción es requerida cuando tiene reductor");
            if (!reductor.eje_salida.trim()) errors.push("Diámetro del eje de salida del reductor es requerido cuando tiene reductor");
            if (!reductor.eje_conducido.trim()) errors.push("Diámetro del eje conducido del reductor es requerido cuando tiene reductor");
        }
        
        if (errors.length > 0) {
            alert("Por favor complete los siguientes campos:\n\n" + errors.join("\n"));
            return false;
        }
        
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
            applicationId: id ? parseInt(id) : undefined
        };
        
        // Siempre navegar a los resultados, independientemente del estado del acople fusible
        navigate('/acoplamiento', { state: formData });
    };

    return (
        <div>
            <p className='text-gray-600 font-poppins font-bold text-2xl text-center mb-8 mt-[-45px]' style={{ fontFamily: 'Poppins' }}>Ingrese las especificaciones de su equipo</p>
            <div className="flex items-center justify-center bg-opacity-40 mt-[-25px] mb-7 px-2">
                <form className="bg-[#F1F1F1] rounded-3xl px-4 py-6 sm:px-6 md:px-10 md:py-8 w-full max-w-4xl shadow-lg overflow-y-auto max-h-[90vh]"
                    onSubmit={handleSubmit}
                >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="md:col-span-2">
                            <label className="block mb-1 font-medium" style={{ fontFamily: 'Poppins' }}>Nombre / TAG / ID de su equipo:</label>
                            <input
                                type="text"
                                name="name_tag_id"
                                value={form.name_tag_id}
                                onChange={handleChange}
                                className="w-full bg-white rounded-md px-3 py-2 shadow"
                            />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium" style={{ fontFamily: 'Poppins' }}>Potencia:</label>
                            <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-sm font-bold text-black-700" style={{ fontFamily: 'Poppins' }}>HP</span>
                                <Toggle
                                    checked={form.hp_or_kw}
                                    onChange={val => setForm(prev => ({ ...prev, hp_or_kw: val }))}
                                    id="hp-or-kw-toggle"
                                />
                                <span className="text-sm font-bold text-black-700" style={{ fontFamily: 'Poppins' }}>Kw</span>
                                <input
                                    type="number"
                                    name="potencia"
                                    value={form.potencia}
                                    onChange={handleChange}
                                    className="w-20 bg-white rounded-md px-2 py-2 shadow"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                            <label className="block mb-1 font-medium" style={{ fontFamily: 'Poppins' }}>Velocidad (rpm):</label>
                            <input
                                type="text"
                                name="velocidad_rpm"
                                value={form.velocidad_rpm}
                                onChange={handleChange}
                                className="w-full bg-white rounded-md px-3 py-2 shadow"
                            />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium" style={{ fontFamily: 'Poppins' }}>Ø de eje conductor:</label>
                            <input
                                type="text"
                                name="eje_conductor"
                                value={form.eje_conductor}
                                onChange={handleChange}
                                className="w-full bg-white rounded-md px-3 py-2 shadow"
                            />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium" style={{ fontFamily: 'Poppins' }}>Ø de eje conducido:</label>
                            <input
                                type="text"
                                name="eje_conducido"
                                value={form.eje_conducido}
                                onChange={handleChange}
                                className="w-full bg-white rounded-md px-3 py-2 shadow"
                            />
                        </div>
                    </div>
                    {/* Distanciador */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 items-center">
                        <div>
                            <label className="block mb-1 font-medium" style={{ fontFamily: 'Poppins' }}>¿Tiene distanciador?</label>
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-bold text-black-700" style={{ fontFamily: 'Poppins' }}>NO</span>
                                <Toggle
                                    checked={form.distanciador}
                                    onChange={val => setForm(prev => ({ ...prev, distanciador: val }))}
                                />
                                <span className="text-sm font-bold text-black-700" style={{ fontFamily: 'Poppins' }}>SÍ</span>
                            </div>
                        </div>
                        {form.distanciador && (
                            <div className="md:col-span-2">
                                <label className="block mb-1 font-medium" style={{ fontFamily: 'Poppins' }}>Indique el DBSE (mm):</label>
                                <input
                                    type="text"
                                    name="dbse"
                                    value={distanciador.dbse}
                                    onChange={e => setDistanciador({ ...distanciador, dbse: e.target.value })}
                                    className="w-full bg-white rounded-md px-3 py-2 shadow"
                                />
                            </div>
                        )}
                    </div>
                    {/* Reductor */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 items-center">
                        <div>
                            <label className="block mb-1 font-medium" style={{ fontFamily: 'Poppins' }}>¿Tiene Reductor?</label>
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-bold text-black-700" style={{ fontFamily: 'Poppins' }}>NO</span>
                                <Toggle
                                    checked={form.reductor}
                                    onChange={val => setForm(prev => ({ ...prev, reductor: val }))}
                                    id="reductor-toggle"
                                />
                                <span className="text-sm font-bold text-black-700" style={{ fontFamily: 'Poppins' }}>SÍ</span>
                            </div>
                        </div>
                        {form.reductor && (
                            <>
                                <div>
                                    <label className="block mb-1 font-medium" style={{ fontFamily: 'Poppins' }}>Relación (rpm):</label>
                                    <input
                                        type="text"
                                        name="relacion"
                                        value={reductor.relacion_npm}
                                        onChange={e => setReductor({ ...reductor, relacion_npm: e.target.value })}
                                        className="w-full bg-white rounded-md px-3 py-2 shadow"
                                    />
                                </div>
                                <div>
                                    <label className="block mb-1 font-medium" style={{ fontFamily: 'Poppins' }}>Ø de eje salida del reductor:</label>
                                    <input
                                        type="text"
                                        name="ejeSalida"
                                        value={reductor.eje_salida}
                                        onChange={e => setReductor({ ...reductor, eje_salida: e.target.value })}
                                        className="w-full bg-white rounded-md px-3 py-2 shadow"
                                    />
                                </div>
                                <div>
                                    <label className="block mb-1 font-medium" style={{ fontFamily: 'Poppins' }}>Ø de eje conducido del reductor:</label>
                                    <input
                                        type="text"
                                        name="ejeConducido"
                                        value={reductor.eje_conducido}
                                        onChange={e => setReductor({ ...reductor, eje_conducido: e.target.value })}
                                        className="w-full bg-white rounded-md px-3 py-2 shadow"
                                    />
                                </div>
                            </>
                        )}
                    </div>
                    {/* Acople fusible */}
                    <div className="mb-4">
                        <label className="block mb-1 font-medium" style={{ fontFamily: 'Poppins' }}>¿Quiere acople con sistema fusible?</label>
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-black-700" style={{ fontFamily: 'Poppins' }}>NO</span>
                            <Toggle
                                checked={form.acople}
                                onChange={val => setForm(prev => ({ ...prev, acople: val }))}
                                id="acople-toggle"
                            />
                            <span className="text-sm font-bold text-black-700" style={{ fontFamily: 'Poppins' }}>SÍ</span>
                        </div>
                    </div>
                    <p className="text-center text-gray-500 text-sm mb-6" style={{ fontFamily: 'Poppins' }}>
                        En caso de que su requerimiento no pueda ser seleccionado por este medio por favor comunicarse a ventas@fundaltransmisiones.com.ar
                    </p>
                    <div className="flex flex-col sm:flex-row justify-between mt-6 gap-4">
                        <button
                            type="button"
                            className="bg-red-100 text-red-600 font-bold py-2 px-8 rounded-full hover:cursor-pointer"
                            onClick={() => navigate('/')}
                        >
                            Volver
                        </button>
                        <button
                            type="submit"
                            className="bg-teal-900 text-white font-bold py-2 px-8 rounded-full hover:bg-teal-800"
                        >
                            Continuar
                        </button>
                    </div>
                </form>
            </div>
        </div>
        
    );
}

export default Form;