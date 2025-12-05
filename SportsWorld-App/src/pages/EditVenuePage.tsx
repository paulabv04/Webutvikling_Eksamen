
import { useEffect, useState, type FormEvent} from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { IVenue } from "../interfaces/IVenue";
import venueService from "../services/VenueService";
import Button from "../components/Button";

export default function EditVenuePage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [venue, setVenue] = useState<IVenue | null>(null);
    const [loading, setLoading] = useState(true);


useEffect(() => {
    const loadVenue = async () => {
        if(!id) return;

        try {
            const data = await venueService.getById(Number(id));
            setVenue(data);
        } catch (error) {
            console.error("Error loading venue:", error);
            alert("Failed to load venue.");
        } finally { 
            setLoading(false);
        }
    };

    loadVenue();
}, [id]);

const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!venue) return;

    try {
        await venueService.update(venue.id, venue);
        alert("Venue updated successfully!");
        navigate("/venues");     
    } catch (error) {
        console.error("Error updating venue:", error);
        alert("Failed to update venue.");
    }
};

if (loading) {
    return <p className="p-6">Loading...</p>
}

if (!venue) {
    return <p className="p-6">Venue not found.</p>;
}

return (
    <div className="min-h-screen bg-[#f6f4ef] py-10 px-4 flex justify-center">
        <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg border border-[#b4a27a] p-8">
            <h1 className="text-3xl font-bold mb-4 text-[#0f3d2e]">
                Edit Venue
            </h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Navn */}
                <div>
                    <label className="block text-sm font-medium text-[#0f3d2e] mb-1">
                        Venue Name
                    </label>
                    <input
                    type="text"
                    value={venue.name}
                    onChange={(e) =>
                        setVenue({ ...venue, name: e.target.value })
                    }
                    className="w-full border border-[#bfa27a] rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#1d4e39]"
                    required
                    />
                </div>

                { /* Capacity */}
                <div>
                    <label className="block text-sm font-medium text-[#0f3d2e] mb-1">
                        Capacity 
                    </label>
                    <input
                    type="number"
                    value={venue.capacity}
                    onChange={(e) => 
                        setVenue({
                            ...venue,
                            capacity: Number(e.target.value),
                        })
                    }
                    className="w-full border border-[#bfa27a] rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#1d4e39]"
                    required
                    />
                </div>

                { /* Image path / URL */ }
                <div>
                    <label className="block text-sm font-medium text-[#0f3d2e] mb-1">
                        Image path / URL
                    </label>
                    <input 
                    type="text"
                    value={venue.image}
                    onChange={(e) =>
                        setVenue({ ...venue, image: e.target.value })
                    }
                    className="w-full border border-[#bfa27a] rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#1d4e39]"
                    required
                    />
                </div>

                {/* Lagre-knapp */}
                    <Button variant="primary" type="submit">
                        Save changes
                    </Button>
            </form>
        </div>
    </div>
);
}