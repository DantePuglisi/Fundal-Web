import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { serviceFactorData } from "../serviceFactorData";
import Card from "./card";
import SubApplicationModal from "./SubApplicationModal";

function Cards() {
    const [showModal, setShowModal] = useState(false);
    const [selectedApplication, setSelectedApplication] = useState<number | null>(null);
    const navigate = useNavigate();

    const handleCardClick = (id: number) => {
        setSelectedApplication(id);
        setShowModal(true);
    };

    const handleSubApplicationSelect = (applicationId: number, subApplicationName: string, serviceFactor: number) => {
        setShowModal(false);
        // Navigate to form with the selected application and service factor
        navigate(`/app/${applicationId}`, { 
            state: { 
                subApplication: subApplicationName, 
                serviceFactor: serviceFactor 
            } 
        });
    };
    return (
        <div>
            <p className='text-gray-600 font-poppins font-bold text-2xl text-center mb-6 mt-[-45px]' style={{ fontFamily: 'Poppins' }}>Seleccione la aplicación</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-10">
                {serviceFactorData.map((application) => (
                    <div key={application.id} onClick={() => handleCardClick(application.id)}>
                        <Card title={application.name} icon={application.icon} />
                    </div>
                ))}
            </div>
            <hr className="mt-10 mx-auto w-1/2 border-gray-600" />
            <div className="my-6">
                <p className='text-gray-600 font-poppins font-bold text-2xl text-center mb-2' style={{ fontFamily: 'Poppins' }}>
                    Factor de servicio
                </p>
                <p className='text-gray-600 text-center text-sm mb-4' style={{ fontFamily: 'Poppins' }}>
                    Se aplicará automáticamente según la aplicación seleccionada
                </p>
                <div className="flex justify-center">
                    <div className="bg-[#E9EFEF] rounded-md w-32 h-10 flex items-center justify-center text-xl text-gray-700 font-bold">
                        Auto
                    </div>
                </div>
            </div>
            {showModal && selectedApplication && (
                <SubApplicationModal 
                    application={serviceFactorData.find(app => app.id === selectedApplication)!}
                    onClose={() => setShowModal(false)}
                    onSelect={handleSubApplicationSelect}
                />
            )}
        </div>
         
    );
}

export default Cards;
