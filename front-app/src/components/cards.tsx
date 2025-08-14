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
