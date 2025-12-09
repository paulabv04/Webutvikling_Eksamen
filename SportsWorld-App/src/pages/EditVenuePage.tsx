
import { useEffect, useState, type FormEvent} from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { IVenue } from "../interfaces/IVenue";
import venueService from "../services/VenueService";
import Button from "../components/Button";

export default function EditVenuePage() {
    // leser id fra URL
    const { id } = useParams();
    const navigate = useNavigate();

    // state for venue som skal redigeres og for loading-tilstand
    const [venue, setVenue] = useState<IVenue | null>(null);
    const [loading, setLoading] = useState(true);

// når komponenten lastes inn, henter vi venue fra API basert på id 
useEffect(() => {
    const loadVenue = async () => {
        if(!id) return;

        try {
            const data = await venueService.getById(Number(id));
            setVenue(data); // lagrer venue i state
        } catch (error) {
            console.error("Error loading venue:", error);
            alert("Failed to load venue.");
        } finally { 
            setLoading(false); // slutter å vise loading
        }
    };

    loadVenue();
}, [id]);

// håndterer innsending av skjema og lagrer endringer til backend
const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!venue) return;

    try {
        await venueService.update(venue.id, venue); // sender oppdatert venue til API
        alert("Venue updated successfully!");
        navigate("/venues"); // sender brukeren tilbake til venue oversikten
    } catch (error) {
        console.error("Error updating venue:", error);
        alert("Failed to update venue.");
    }
};

// viser enkel loading mens data lastes 
if (loading) {
    return <p className="p-6">Loading...</p>
}

// hvis det ikke finnes venue med denne id-en
if (!venue) {
    return <p className="p-6">Venue not found.</p>;
}

return (
    <div className="min-h-screen bg-tennisSand/40 py-10 px-4">
        <div className="max-w-xl w-full mx-auto bg-white rounded-2xl shadow-lg border border-tennisGreen/50 p-8">
            <h1 className="text-3xl font-serif mb-6 text-tennisGreen">
                Edit Venue
            </h1>

            { /* Skjema for å redigere venue */ }
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Navn */}
                <div>
                    <label className="block text-sm font-medium text-tennisGreen mb-1">
                        Venue Name
                    </label>
                    <input
                    type="text"
                    value={venue.name}
                    onChange={(e) =>
                        setVenue({ ...venue, name: e.target.value })
                    }
                    className="w-full rounded-xl border border-tennisGreen/40 p-3 shadow-sm focus:outline-none focus:ring-tennisGreen focus:ring-2"
                    required
                    />
                </div>

                { /* Capacity */}
                <div>
                    <label className="block text-sm font-medium text-tennisGreen mb-1">
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
                    className="w-full rounded-xl border border-tennisGreen/40 p-3 shadow-sm focus:outline-none focus:ring-tennisGreen focus:ring-2"
                    required
                    />
                </div>

                { /* Image path / URL */ }
                <div>
                    <label className="block text-sm font-medium text-tennisGreen mb-1">
                        Image path / URL
                    </label>
                    <input 
                    type="text"
                    value={venue.image}
                    onChange={(e) =>
                        setVenue({ ...venue, image: e.target.value })
                    }
                    className="w-full rounded-xl border border-tennisGreen/40 p-3 shadow-sm focus:outline-none focus:ring-tennisGreen focus:ring-2"
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