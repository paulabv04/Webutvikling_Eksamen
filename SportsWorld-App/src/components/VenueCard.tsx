
import type { IVenue } from "../interfaces/IVenue";

interface VenuesCardProps {
    venue: IVenue;
    onDelete?: () => void;
    onEdit?: () => void; 
}

export default function VenueCard({ venue, onDelete, onEdit }: VenuesCardProps) {
    return (
        <div className="bg-[#f6f4ef] rounded-2xl border border-[#b4a27a] shadow-sm overflow-hidden flex flex-col">
            { /* Bilde-topp */ }
            <div className="h-32 bg-gray-200">
                <img 
                src={venue.image}
                alt={venue.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
            />
        </div>

        {/* Tekst-informasjon */ }
        <div className="p-4 flex flex-col gap-1">
            <h2 className="text-lg font-semibold text-[#0f3d2e]">
                {venue.name}
            </h2>
            <p className="text-sm text-[#1d4e39]">
            Capacity:{" "}
            <span className="font-medium">
                {venue.capacity.toLocaleString()} people
            </span>
            </p>

            {(onEdit || onDelete) && (
                <div className="mt-3 flex gap-2">
                    {onEdit && (
                        <button 
                        type="button"
                        onClick={onEdit}
                        className="flex-1 text-xs py-1 rounded-lg bg-[#0f3d2e] text-[#f6f4ef] hover:bg-[1d4e39] transition"
                        >
                            Edit
                        </button>    
                    )}
                    {onDelete && (
                        <button
                        type="button"
                        onClick={onDelete}
                        className="flex-1 text-xs py-1 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
                        >
                            Delete
                        </button>
                    )}
                    </div>
                )}
            </div>
        </div>
    );
}