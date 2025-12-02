import type { IAthlete } from "../interfaces/IAthlete";
import { useNavigate } from "react-router-dom";
import { IMAGE_BASE_PATH } from "../global";
import Button from "../components/Button";

interface AthleteCardProps {
    athlete: IAthlete;
    onDelete?: (id: number) => void;
    onPurchase?: (id: number) => void; 
}

const AthleteCard = ({athlete, onDelete, onPurchase}: AthleteCardProps) => {
    const navigate = useNavigate();
   
    return (
        <div className="border rounded-xl p-5 shadow-sm hover:shadow-lg transition p-5 border border-tennisSand/50">
            <img 
            src={`${IMAGE_BASE_PATH}${athlete.image}?t=${Date.now()}`}
            alt={athlete.name}
            className="w-full h-56 object-contain bg-tennisSand rounded-xl"
            />

            <h2 className="text-lg font-semibild mt-2 text-tennisGreen">{athlete.name}</h2>
            <p className="text-tennisDark/70 text-sm">Gender: {athlete.gender}</p>
            <p className="text-tennisDark/70 text-sm">Price: ${athlete.price}</p>
            <p className="text-tennisDark/70 text-sm">STATUS: {athlete.purchaseStatus ? "Purchased" : "Not purchased"}</p>

            <div className="flex gap-2 mt-4">

            {!athlete.purchaseStatus && onPurchase && (
                <Button variant="primary" onClick={() => onPurchase(athlete.id)}>
                    Purchase
                </Button>
            )}

                <Button variant="primary" onClick={() => navigate(`/athletes/edit/${athlete.id}`)}>
                    Edit
                </Button>


            {onDelete && (
                <Button variant="danger" onClick={() => onDelete(athlete.id)}>
                    Delete
                </Button>
                )}
            </div>
        </div>
    );
};

export default AthleteCard;
