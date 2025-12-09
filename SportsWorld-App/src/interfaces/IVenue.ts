
// Definerer strukturen for et Venue-objekt
// Brukes for typing i hele frontend for å sikre at alle venue-data har riktig format
export interface IVenue {
    id: number;
    name: string;
    capacity: number;
    image: string;
}