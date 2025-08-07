import { useState } from "react";
import { useNavigate } from "react-router-dom";
import app_data from "../data";
import Card from "./card";
import SopladoresVentiladores from "./appsComponents/SopladoresVentiladores";

function Cards() {
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const handleCardClick = (id: number) => {
        if (id === 5) setShowModal(true);
        else navigate(`/app/${id}`);
    };
    const closeModal = () => {
        setShowModal(false);
    };
    return (
        <div>
            <div className="grid grid-cols-5 md:grid-cols-5 gap-10">
                {app_data.map((item, index) => (
                    <div key={index} onClick={() => handleCardClick(item.id)}>
                        <Card title={item.title} icon={item.icon} />
                    </div>
                ))}
                
            </div>
            <hr className="mt-10 mx-auto w-1/2 border-gray-600" />
            {showModal && (
                <SopladoresVentiladores icon={app_data.find(item => item.id === 5)?.icon} onClose={() => setShowModal(false)} />
            )}
        </div>
         
    );
}

export default Cards;
