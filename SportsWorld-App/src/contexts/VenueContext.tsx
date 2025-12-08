import { createContext, useContext, useEffect, useState } from "react";
import type { IVenue } from "../interfaces/IVenue";
import venueService from "../services/VenueService";

// definerer hva VenueContext skal inneholde
interface VenueContextType {
    venues: IVenue[];
    refreshVenues: () => Promise<void>;
    addVenue: (venue: Omit<IVenue, "id">) => Promise<void>;
    updateVenue: (venue: IVenue) => Promise<void>;
    deleteVenue: (id: number) => Promise<void>;
}

// oppretter context med tomme default-verdier
const VenueContext = createContext<VenueContextType>({
    venues: [],
    refreshVenues: async () => {},
    addVenue: async () => {},
    updateVenue: async () => {},
    deleteVenue: async () => {},
});

// Provider som gjør venue data tilgjengelig globalt i appen
export function VenueProvider({ children }: { children: React.ReactNode }) {
    const [venues, setVenues] = useState<IVenue[]>([]);

    // lokal state som lagrer alle venues
    async function refreshVenues() {
        const data = await venueService.getAll();
        setVenues(data);
    }

    // henter alle venues fra backend 
    async function addVenue(venue: Omit<IVenue, "id">) {
        const created = await venueService.create(venue);
        setVenues((prev) => [...prev, created]);
    }

    // oppdaterer en venue og bytter ut til den gamle i state
    async function updateVenue(venue: IVenue) {
        const updated = await venueService.update(venue.id, venue);
        setVenues((prev) => prev.map((v) => (v.id === venue.id ? updated : v))); // ersatter kun det som ble endret 
    }

    // sletter venue fra API og fra state
    async function deleteVenue(id: number) {
        await venueService.delete(id);
        setVenues((prev) => prev.filter((v) => v.id !== id));
    }

    useEffect(() => {
        // henter venues med en gang når appen starter
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

// egen hook for å bruke venueContext enklere
export function useVenue() {
    return useContext(VenueContext);
}