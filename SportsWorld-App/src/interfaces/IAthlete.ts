// Definerer strukturen (typen) for et athlete-objekt. 
// Dette brukes i hele prosjektet for å sikre at alle athletes har samme felter og riktige datatyper
export interface IAthlete {
    id: number;
    name: string;
    gender: string;
    price: number;
    image: string;
    purchaseStatus: boolean;
}