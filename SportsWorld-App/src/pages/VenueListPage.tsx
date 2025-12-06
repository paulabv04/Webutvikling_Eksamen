
import { useEffect, useState } from "react";
import type { ChangeEvent } from "react";
import venueService from "../services/VenueService";
import type { IVenue } from "../interfaces/IVenue";
import VenueCard from "../components/VenueCard";
import ConfirmModal from "../components/ConfirmModal";
import { useNavigate } from "react-router-dom";

export default function VenueListPage() {
    //Loakl state for alle venues og filtrerte venues
    const [venues, setVenues] = useState<IVenue[]>([]);
    const [filteredVenues, setFilteredVenues] = useState<IVenue[]>([]);
    const [searchTerm, setSearchTerm] = useState("");

    //State for slettemodal
    const [showConfirm, setShowConfirm] = useState(false);
    const [pendingDeleteId, setPendingDeleteId] = useState<number | null>(null);

    //navigasjon, brukes for å navigere til edit siden 
    const navigate = useNavigate();

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

    // Åpner modal og lagrer id på venue som skal slettes
    const startDelete = (id: number) => {
        setPendingDeleteId(id);
        setShowConfirm(true);
    };

    // Sletter valgt venue, når bruker bekrefter
    const confirmDelete = async () => {
        if(pendingDeleteId === null) return;
        try {
            await venueService.delete(pendingDeleteId);
            await fetchVenues(); // henter oppdatert liste
        } catch (error) {
            console.error("Error deleting venue.", error);
            alert("Failed to delete venue.");
        }

        setShowConfirm(false);
        setPendingDeleteId(null);
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
        <div className="min-h-screen bg-tennisSand py-10 px-4 flex justify-center">
            <div className="w-full max-w-5xl bg-white rounded-2xl shadow-sm border border-tennisDark p-8">

                {/* tittel */}
                <div className="mb-6">
                    <h1 className="flex gap-4 px-2 pb-4 font-serif text-5xl text-tennisGreen">All Venues</h1>
                    <p className="text-sm text-tennisDark">Overview of all registered tennis venues for SportsWorld</p>
                    </div>

                    {/* søkefelt*/ }
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-tennisDark mb-1"> Search by venue name</label>
                        <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        placeholder="e.g. Centre Court, Wimbledon"
                        className="w-full border border-tennisDark rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-tennisDark"
                        />
                        </div>

                        {/* Liste */ }
                        {filteredVenues.length === 0 ? (
                            <p className="text-tennisDark italic">No venues found. Try another search or add a new venue on the admin page.</p>
                        ) : (
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {filteredVenues.map((v) => (
                                <VenueCard
                                key={v.id}
                                venue={v}
                                onDelete={() => startDelete(v.id)}
                                onEdit={()=> navigate(`/venues/edit/${v.id}`)}
                                />
                        ))}
                    </div>
                )}

                {/*Confirm Modal*/}
                <ConfirmModal 
                show={showConfirm}
                message="Are you sure you ant to delete this venue?"
                onConfirm={confirmDelete}
                onCancel={() => setShowConfirm(false)}
                />
            </div>
        </div>
    );
}
