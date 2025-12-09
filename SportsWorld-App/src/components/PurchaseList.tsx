
// importerer IAthlete interface for riktig typing
import type { IAthlete } from "../interfaces/IAthlete";
// importerer AthleteCard for å vise hver athlete
import AthleteCard from "./AthleteCard";

// definerer hvilke props komponenten skal motta
interface Props {
    athletes: IAthlete[]; // liste over alle athletes
    onPurchase: (id:number) => void; // funksjon for å kjøpe athlete
}

export default function PurchaseList({ athletes, onPurchase}: Props){
    // filtrerer ut athletes som ikke er kjøpt
    const available = athletes.filter(a => !a.purchaseStatus);

    return (
        <div>
            { /* Overskrift */ }
            <h2 className="text-2xl font-bold mb-4">Available Athletes</h2>

            { /* Grid som viser alle tilgjengelige athletes */ }
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {available.map(a => (
                    // Viser AthleteCard og sender videre onPurchase funksjonen
                    <AthleteCard key={a.id} athlete={a} onPurchase={onPurchase}/>
                ))}
            </div>
        </div>
    );
}
