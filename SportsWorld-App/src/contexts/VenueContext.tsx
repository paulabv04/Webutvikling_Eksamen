import { createContext, useContext, useEffect, useState } from "react";
import type { IVenue } from "../interfaces/IVenue";
import venueService from "../services/VenueService";

interface VenueContextType {
    venues: IVenue[];
    refreshVenues: () => Promise<void>;
    addVenue: (venue: Omit<IVenue, "id">) => Promise<void>;
    updateVenue: (venue: IVenue) => Promise<void>;
    deleteVenue: (id: number) => Promise<void>;
}

const VenueContext = createContext<VenueContextType>({
    venues: [],
    refreshVenues: async () => {},
    addVenue: async () => {},
    updateVenue: async () => {},
    deleteVenue: async () => {},
});

export function VenueProvider({ children }: { children: React.ReactNode }) {
    const [venues, setVenues] = useState<IVenue[]>([]);

    async function refreshVenues() {
        const data = await venueService.getAll();
        setVenues(data);
    }

    async function addVenue(venue: Omit<IVenue, "id">) {
        const created = await venueService.create(venue);
        setVenues((prev) => [...prev, created]);
    }

    async function updateVenue(venue: IVenue) {
        const updated = await venueService.update(venue.id, venue);
        setVenues((prev) => prev.map((v) => (v.id === venue.id ? updated : v)));
    }

    async function deleteVenue(id: number) {
        await venueService.delete(id);
        setVenues((prev) => prev.filter((v) => v.id !== id));
    }

    useEffect(() => {
        // henter venues en gang når appen starter
        refreshVenues();
    }, []);

    return (
        <VenueContext.Provider
        value= {{ venues, refreshVenues, addVenue, updateVenue, deleteVenue }}
        >
            {children}
        </VenueContext.Provider>
    );        
}

export function useVenue() {
    return useContext(VenueContext);
}