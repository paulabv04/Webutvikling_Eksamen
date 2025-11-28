import { IAthlete } from "../interface/IAthlete"
import { IMAGE_URL } from "../global"

function AthleteCard({athlete, onPurchase}) {
    return (
        <div className="p-4 bg white rounded shadow w-44 text-center">
            <img
            src={`${IMAGE_URL}${athlete.image}`}
            alt={athlete.name}
            className="w-24 h24 object-cover mx-auto rounded-full mb-2"
            />

            <h3 className="font-bold">{athlete.name}</h3>
            <p>Kjønn: {athlete.gender}</p>
            <p>Pris: {athlete.price}</p>

            {athlete.purchaseStatus ? (
                <p className="text-green-600 font-bold">Kjøpt</p>
            ): (
                <button 
                className="mt-2 px-3 py-1 bg-blue-500 text-white rounded"
                onClick={() => onPurchase(athlete.id)}
                >Kjø<p></p></button>
            )}
        </div>
    );
}
export default AthleteCard;