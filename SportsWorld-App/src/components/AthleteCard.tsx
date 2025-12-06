import type { IAthlete } from "../interfaces/IAthlete";
import { useNavigate } from "react-router-dom";
import { IMAGE_BASE_PATH } from "../global";
import Button from "../components/Button";

interface AthleteCardProps {
    //Komponenten får inn en athlete og (valgfritt) funksjoner for delete og purchase
    athlete: IAthlete;
    onDelete?: (id: number) => void;
    onPurchase?: (id: number) => void; 
    compact?: boolean;
}

const AthleteCard = ({athlete, onDelete, onPurchase, compact}: AthleteCardProps) => {
    //useNavigate brukes for å navigere programmatisk til edit-siden
    const navigate = useNavigate();
   
    return (
        <div className={
            compact 
                ? " bg-white border border-tennisGreen/40 rounded-xl p-3 shadow-sm hover:shadow-[0_4px_12px_rgba(26,60,52,0.5)] w-[230px]"
                : "bg-white border border-tennisGreen/50 rounded-xl p-4 shadow-sm hover:shadow-[0_4px_12px_rgba(26,60,52,0.5)]"
            }>

            {/*Viser bilde av athlete*/}
            <img 
                src={`${IMAGE_BASE_PATH}${athlete.image}`}
                alt={athlete.name}
                className={
                    compact
                        ? "w-full h-56 object-cover rounded-xl mb-3"
                        : "w-full h-56 object-cover rounded-xl mb-3"
                }       
                onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
            />


            {/*Grunnleggende info om athlete*/}
            <h2 className="text-lg font-semibold mt-2 text-tennisGreen">{athlete.name}</h2>
            <p className="text-tennisDark/70 text-sm">Gender: {athlete.gender}</p>
            <p className="text-tennisDark/70 text-sm">Price: ${athlete.price}</p>
            <p className="text-tennisDark/70 text-sm">STATUS: {athlete.purchaseStatus ? "Purchased" : "Not purchased"}</p>

            {/*Knapper for actions knyttet til athlete */}
            {!compact && (
            <div className="flex gap-2 mt-4">


            {/*Purchase-knappen vises kun hvis athlete ikke er kjøpt*/}
            {!athlete.purchaseStatus && onPurchase && (
                <Button variant="primary" onClick={() => onPurchase(athlete.id)}>
                    Purchase
                </Button>
            )}

            {/*Navigerer til edit-siden for en bestemt athlete*/}
                <Button variant="primary" onClick={() => navigate(`/athletes/edit/${athlete.id}`)}>
                    Edit
                </Button>

            {/*Delete-knappen vises kun hvis onDelete er sendt inn som prop*/}
            {onDelete && (
                <Button variant="danger" onClick={() => onDelete(athlete.id)}>
                    Delete
                </Button>
                )}
            </div>
            )}
        </div>
    );
};

export default AthleteCard;
