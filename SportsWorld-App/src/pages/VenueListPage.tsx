
import { useEffect, useState } from "react";
import type { ChangeEvent } from "react";
import venueService from "../services/VenueService";
import type { IVenue } from "../interfaces/IVenue";
import { IMAGE_BASE_PATH } from "../global";

export default function VenueListPage() {
    const [venues, setVenues] = useState<IVenue[]>([]);
    const [filteredVenues, setFilteredVenues] = useState<IVenue[]>([]);
    const [searchTerm, setSearchTerm] = useState("");

    // Hent alle venues fra API
    const fetchVenues = async () => {
        try {
            const data = await venueService.getAll();
            setVenues(data);
            setFilteredVenues(data);
        } catch (error) {
            console.error("Error fetching venues:", error);
            alert("Failed to load venues from API.");
        }
    };

    useEffect(() => {
        fetchVenues();
    }, []);

    // Håndterer søk på navn 
    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);

        const normalized = value.toLowerCase();
        const filtered = venues.filter((v) => 
        v.name.toLowerCase().includes(normalized)
    );

    setFilteredVenues(filtered);
    };

    return (
        <div className="min-h-screen bg-[#f6f4ef] py-10 px-4 flex justify-center">
            <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg border border-[#b4a27a] p-8">
                {/* tittel */}
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-[#0f3d2e]">All Venues</h1>
                    <p className="text-sm text-[#1d4e39]">Overview of all registered tennis venues for SportsWorld</p>
                    </div>

                    {/* søkefelt*/ }
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-[#0f3d2e] mb-1"> Search by venue name</label>
                        <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        placeholder="e.g. Centre Court, Wimbledon"
                        className="w-full border border-[#bfa27a] rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#1d4e39]"
                        />
                        </div>

                        {/* Liste */ }
                        {filteredVenues.length === 0 ? (
                            <p className="text-gray-500 italic">No venues found. Try another search or add a new venue on the admin page.</p>
                        ) : (
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {filteredVenues.map((v) => (
                                <div 
                                    key={v.id}
                                    className="bg-[#f6f4ef] rounded-xl border border-[#e3d6b3] shadow-sm overflow-hidden flex flex-col"
                                >
                                { /* Bilde */ }
                                <div className="h-32 bg-gray-200">
                                    <img 
                                    src={`${IMAGE_BASE_PATH}${v.image}`}
                                    alt={v.name}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        // Skjuler bildet vis URL er feil
                                        (e.currentTarget as HTMLImageElement).style.display =
                                        "none";
                                    }}
                                />
                                </div>

                                {/* Text info */ }
                                <div className="p-4 flex flex-col gap-1">
                                    <h2 className="text-lg font-semibold text-[#0f3d2e]">
                                        {v.name}
                                    </h2>
                                    <p className="text-sm text-[#1d4e39]">
                                        Capacity:{" "}
                                        <span className="font-medium">
                                            {v.capacity.toLocaleString()} people
                                        </span>
                                    </p>
                                </div>
                            </div>
                        ))}
                        </div>
                    )}
                </div>
            </div>
    );
}
