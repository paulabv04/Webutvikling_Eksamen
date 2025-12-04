
import { useEffect, useState } from "react";
import type { ChangeEvent } from "react";
import venueService from "../services/VenueService";
import type { IVenue } from "../interfaces/IVenue";
import VenueCard from "../components/VenueCard";

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

    // sletter venue og laster listen på nytt
    const handleDelete = async (id: number) => {
        const confirmed = confirm("Delete this venue");
        if (!confirmed) return;

        try {
            await venueService.delete(id);
            await fetchVenues(); // henter oppdatert liste
        } catch (error) {
            console.error("Error deleting venue.", error);
            alert("Failed to delete venue.");
        }
    };

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

                        { /* Liste */ }
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {filteredVenues.map((v) => (
                                <VenueCard
                                key={v.id}
                                venue={v}
                                onDelete={handleDelete}
                                />
                            ))}
                        </div>
                </div>
            </div>
    );
}
