type Props = {
    onClose: () => void;
    icon: string;
};

function SopladoresVentiladores({ onClose, icon }: Props ) {
    console.log(icon);
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50"
            style={{ backgroundColor: "rgba(168, 168, 168, 0.411)" }}>
            <div className="bg-white rounded-3xl px-3 py-6 sm:px-7 sm:py-10 w-full max-w-lg sm:max-w-2xl md:max-w-3xl lg:max-w-4xl shadow-lg relative mx-2">
                <div className="flex bg-[#E6F2F2] justify-center sm:-mt-18 -mt-14 mb-4 rounded-4xl w-16 h-16 mx-auto p-0.5">
                    <img src={icon} alt="Sopladores y Ventiladores" className="w-16 h-16" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-center mb-2 text-teal-900" style={{ fontFamily: 'Poppins' }}>SOPLADORES Y VENTILADORES</h2>
                <h3 className="text-base sm:text-lg font-normal text-center mb-6 text-teal-900" style={{ fontFamily: 'Poppins' }}>Seleccione el factor de servicio</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-8">
                    <button className="bg-gray-100 rounded-md py-2 px-4 text-[14px] shadow-lg" style={{ fontFamily: 'Poppins' }}>Centrífugos - FS(A) 1.00</button>
                    <button className="bg-gray-100 rounded-md py-2 px-4 text-[14px] shadow-lg" style={{ fontFamily: 'Poppins' }}>Turboventiladores - FS(A) 1.25</button>
                    <button className="bg-gray-100 rounded-md py-2 px-4 text-[14px] shadow-lg" style={{ fontFamily: 'Poppins' }}>Torres de enfriamiento - FS(A) 2.50</button>
                    <button className="bg-gray-100 rounded-md py-2 px-4 text-[14px] shadow-lg" style={{ fontFamily: 'Poppins' }}>Metálicos - FS(A) 1.25</button>
                    <button className="bg-gray-100 rounded-md py-2 px-4 text-[14px] shadow-lg" style={{ fontFamily: 'Poppins' }}>Tiro forzado - FS(A) 1.50</button>
                    <button className="bg-gray-100 rounded-md py-2 px-4 text-[14px] shadow-lg" style={{ fontFamily: 'Poppins' }}>Lóbulos - FS(A) 1.50</button>
                    <button className="bg-gray-100 rounded-md py-2 px-4 text-[14px] shadow-lg sm:col-span-2 md:col-span-3" style={{ fontFamily: 'Poppins' }}>Tiro inducido - FS(A) 2.00</button>
                </div>
                <div className="flex flex-col sm:flex-row justify-between mt-6 gap-4">
                    <button
                        className="bg-red-100 text-red-600 font-bold py-2 px-8 rounded-full hover:cursor-pointer"
                        onClick={onClose}
                    >
                        Volver
                    </button>
                    <button className="bg-teal-100 text-teal-900 font-bold py-2 px-8 rounded-full hover:cursor-pointer">
                        Aceptar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SopladoresVentiladores;