
import type { IVenue } from "../interfaces/IVenue";
import { IMAGE_BASE_PATH } from "../global";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";


interface VenuesCardProps {
    venue: IVenue;
    onDelete?: (id:number) => void;
    onEdit?: (id:number)=> void;
}

export default function VenueCard({ venue, onDelete, onEdit }: VenuesCardProps) {
    const navigate = useNavigate();
    return (
        <div className="bg-white border border-tennisGreen/50 rounded-xl p-5 shadow-sm hover:shadow-[0_4px_12px_rgba(26,60,52,0.5)] transition">
            { /* Bilde-topp */ }
                <img 
                src={`${IMAGE_BASE_PATH}${venue.image}`}
                alt={venue.name}
                className="w-full h-56 object-cover bg-tennisSand rounded-xl"
                onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
            />

        {/* Tekst-informasjon */ }
        <h2 className="text-lg font-semibold text-tennisDark">{venue.name}</h2>

        <p className="text-sm text-tennisDark/70 text-sm">
            Capacity:{" "}
            <span className="font-medium">{venue.capacity.toLocaleString()} people</span>
        </p>

        {/*Knapper*/ }
        <div className="flex gap-2 mt-4">
            {onEdit && (
            <Button variant="primary" onClick={() => navigate(`/venues/edit/${venue.id}`)}>
                Edit
            </Button>
            )}

            {onDelete && (
                <Button variant="danger" onClick={() => onDelete(venue.id)}>
                    Delete
                </Button>
            )}
            </div>
        </div>
    );
}