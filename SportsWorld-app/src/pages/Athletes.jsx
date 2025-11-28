import React, { useEffect,useState } from "react";
import { getAthletes } from "../services/AthleteService";
import AthleteCard from "../components/AthleteCard";

function Athletes(){
    const [athletes, setAthletes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAthletes().then((data) => {
    setAthletes(data);
    });
}, []);
   
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Tennis Athletes</h1>
            <div className="flex flex-wrap gap-4">
                {athletes.map((athlete) => (
                    <AthleteCard
                        key={athlete.id}
                        athlete={athlete}
                        onPurchase={purchaseAthlete}
                    />
                ))}
            </div>
        </div>
    );
}
export default Athletes;