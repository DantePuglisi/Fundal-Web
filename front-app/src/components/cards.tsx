import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { FactorService } from '../interfaces/all_interfaces';
import app_data from "../data";
import Card from "./card";
import SopladoresVentiladores from "./appsComponents/SopladoresVentiladores";

function Cards() {
    const [showModal, setShowModal] = useState(false);
    const [factorService, setFactorService] = useState<FactorService | '-'>('-');
    const navigate = useNavigate();

    const handleCardClick = (id: number) => {
        if (id === 5) setShowModal(true);
        else navigate(`/app/${id}`);
    };
    return (
        <div>
            <p className='text-gray-600 font-poppins font-bold text-2xl text-center mb-6 mt-[-45px]' style={{ fontFamily: 'Poppins' }}>Seleccione la aplicación</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-10">
                {app_data.map((item, index) => (
                    <div key={index} onClick={() => handleCardClick(item.id)}>
                        <Card title={item.title} icon={item.icon} />
                    </div>
                ))}
            </div>
            <hr className="mt-10 mx-auto w-1/2 border-gray-600" />
            <div className="my-6">
                <p className='text-gray-600 font-poppins font-bold text-2xl text-center mb-2' style={{ fontFamily: 'Poppins' }}>
                    Factor de servicio
                </p>
                <div className="flex justify-center">
                    <input
                        type="number"
                        className="bg-[#E9EFEF] rounded-md w-32 h-10 flex items-center justify-center mx-auto text-center text-xl text-gray-700 font-bold outline-none"
                        value={factorService !== '-' ? factorService.value : ''}
                        onChange={e => setFactorService(factorService !== '-' ? { ...factorService, value: parseFloat(e.target.value) } : { id: 1, name: 'manual', value: parseFloat(e.target.value) })}
                        placeholder="-"
                    />
                </div>
            </div>
            {showModal && (
                <SopladoresVentiladores icon={app_data.find(item => item.id === 5)?.icon || ''} onClose={() => setShowModal(false)} />
            )}
        </div>
         
    );
}

export default Cards;
