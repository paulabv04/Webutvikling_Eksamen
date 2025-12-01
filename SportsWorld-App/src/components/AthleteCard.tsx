import type { IAthlete } from "../interfaces/IAthlete";
import { useNavigate } from "react-router-dom";
import { IMAGE_BASE_PATH } from "../global";

interface AthleteCardProps {
    athlete: IAthlete;
    onDelete: (id: number) => void;
}

const AthleteCard = ({athlete, onDelete}: AthleteCardProps) => {
    const navigate = useNavigate();

    return (
        <div className="border p-4 rounded shadow ">
            <img 
            src={`${IMAGE_BASE_PATH}${athlete.image}`}
            alt={athlete.name}
            className="h-40 w-full object-cover mb-3 rounded"
            />

            <h2 className="text-lg font-semibild">{athlete.name}</h2>
            <p>Gender: {athlete.gender}</p>
            <p>Price: ${athlete.price}</p>
            <p>STATUS:{athlete.purchaseStatus ? "Purchased" : "Not purchased"}</p>

            <div className="flex gap-2 mt-4">
                <button 
                onClick={() => navigate(`/athletes/edit/${athlete.id}`)}
                className="bg-blue-600 text-white px-3 py-1 rounded"
                >
                    Edit
                </button>

                <button 
                    onClick={() => onDelete(athlete.id)}
                    className="mt-2 bg-red-600 text-white px-3 py-1 rounded"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default AthleteCard;
