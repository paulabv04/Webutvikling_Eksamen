
import type { IAthlete } from "../interfaces/IAthlete";
import AthleteCard from "./AthleteCard";

interface Props {
    athletes: IAthlete[];
    onPurchase: (id:number) => void;
}

export default function PurchaseList({ athletes, onPurchase}: Props){
    const available = athletes.filter(a => !a.purchaseStatus);

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Available Athletes</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {available.map(a => (
                    <AthleteCard key={a.id} athlete={a} onPurchase={onPurchase}/>
                ))}
            </div>
        </div>
    );
}
