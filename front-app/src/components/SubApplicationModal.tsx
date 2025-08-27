import type { Application } from "../serviceFactorData";

type Props = {
    application: Application;
    onClose: () => void;
    onSelect: (applicationId: number, subApplicationName: string, serviceFactor: number) => void;
};

function SubApplicationModal({ application, onClose, onSelect }: Props) {
    const handleSubApplicationSelect = (subApplicationName: string, serviceFactor: number) => {
        onSelect(application.id, subApplicationName, serviceFactor);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50"
            style={{ backgroundColor: "rgba(168, 168, 168, 0.411)" }}>
            <div className="bg-white rounded-3xl px-3 py-6 sm:px-7 sm:py-10 w-full max-w-lg sm:max-w-2xl md:max-w-3xl lg:max-w-4xl shadow-lg relative mx-2 max-h-[90vh] overflow-y-auto">
                <div className="flex bg-[#E6F2F2] justify-center rounded-full w-20 h-20 mx-auto mb-4 p-2">
                    <img src={application.icon} alt={application.name} className="w-full h-full object-contain" />
                </div>
                
                <h2 className="text-xl sm:text-2xl font-bold text-center mb-2 text-teal-900" style={{ fontFamily: 'Poppins' }}>
                    {application.name.toUpperCase()}
                </h2>
                <h3 className="text-base sm:text-lg font-normal text-center mb-6 text-teal-900" style={{ fontFamily: 'Poppins' }}>
                    Seleccione el factor de servicio
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-8">
                    {application.subApplications.map((subApp, index) => (
                        <button 
                            key={index}
                            onClick={() => handleSubApplicationSelect(subApp.name, subApp.serviceFactor)}
                            className="bg-gray-100 rounded-md py-2 px-4 text-[14px] shadow-lg hover:bg-gray-200 transition cursor-pointer"
                            style={{ fontFamily: 'Poppins' }}
                        >
                            {subApp.name} - FS {subApp.serviceFactor.toFixed(2)}
                        </button>
                    ))}
                </div>
                
                <div className="flex flex-col sm:flex-row justify-between mt-6 gap-4">
                    <button
                        className="bg-red-100 text-red-600 font-bold py-2 px-8 rounded-full cursor-pointer"
                        onClick={onClose}
                    >
                        Volver
                    </button>
                    <button className="bg-teal-100 text-teal-900 font-bold py-2 px-8 rounded-full opacity-50 cursor-not-allowed">
                        Seleccione una opción
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SubApplicationModal;