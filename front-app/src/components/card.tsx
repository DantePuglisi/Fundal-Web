import type CardInterface from "../interfaces/all_interfaces";

function Card({ title, icon }: CardInterface) {
    return (
        <div className="shadow-lg py-4 px-4 h-40 w-40 flex flex-col justify-center items-center hover:shadow-lg transition hover:cursor-pointer"
        style={{
                background: "linear-gradient(25deg, rgba(247,247,247,1) 35%, #e6e6e6 65%)", borderRadius: "5px 17px 5px 5px",
            }}
        >
            <img src={icon} alt={title} className="w-16 h-16 mb-2" />
            <h2 className="text-center text-gray-800">{title}</h2>
        </div>
    );
}


export default Card;