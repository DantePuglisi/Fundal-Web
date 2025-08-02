type Props = {
    onClose: () => void;
};

function SopladoresVentiladores({ onClose, icon }: Props & { icon: string }) {
    console.log(icon);
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50"
            style={{ backgroundColor: "rgba(168, 168, 168, 0.411)" }}>
            <div className="bg-white rounded-3xl px-7 pb-10 w-full max-w-4xl shadow-lg relative">
                <div className="flex bg-[#E6F2F2] justify-center mt-[-35px] mb-4 rounded-4xl w-1/14 mx-auto p-0.5">
                    <img src={icon} alt="Sopladores y Ventiladores" className="w-16 h-16" />
                </div>
                <h2 className="text-2xl font-bold text-center mb-2 text-teal-900">SOPLADORES Y VENTILADORES</h2>
                <h3 className="text-lg font-semibold text-center mb-6 text-teal-900">Seleccione el factor de servicio</h3>
                <div className="grid grid-cols-3 gap-7 mb-8">
                    <button className="bg-gray-100 rounded-md py-2 px-4 text-[14px] shadow-lg">Centrífugos - FS(A) 1.00</button>
                    <button className="bg-gray-100 rounded-md py-2 px-4 text-[14px] shadow-lg">Turboventiladores - FS(A) 1.25</button>
                    <button className="bg-gray-100 rounded-md py-2 px-4 text-[14px] shadow-lg">Torres de enfriamiento - FS(A) 2.50</button>
                    <button className="bg-gray-100 rounded-md py-2 px-4 text-[14px] shadow-lg">Metálicos - FS(A) 1.25</button>
                    <button className="bg-gray-100 rounded-md py-2 px-4 text-[14px] shadow-lg">Tiro forzado - FS(A) 1.50</button>
                    <button className="bg-gray-100 rounded-md py-2 px-4 text-[14px] shadow-lg">Lóbulos - FS(A) 1.50</button>
                    <button className="bg-gray-100 rounded-md py-2 px-4  text-[14px] shadow-lg">Tiro inducido - FS(A) 2.00</button>
                </div>
                <div className="flex justify-between mt-6">
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