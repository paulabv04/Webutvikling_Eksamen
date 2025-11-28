import { useEffect,useState } from "react";
import AthleteCard from "../components/AthleteCard";
import { BASE_URL } from "../global";

function Athletes(){
    const [athletes, setAthletes] = useState([]);
    const [loading, setLoading] = useState(true);

    //Henter alle utøvere 
    const fetchAthletes = async () => {
        try {
            const res = await fetch(`${BASE_URL}/athlete`);
            const data = await res.json();
            setAthletes(data);
            setLoading(false);
        }catch(error){
            console.error("Feil ved henting av utøvere", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAthletes();
    }, []);

    //Funskjon for å kjøpe utøver 
    const purchaseAthlete = async (id) => {
        const res = await fetch(`${BASE_URL}/finance/purchase/${id}`, {
            method: "POST",
        });

        if (!res.ok) {
            const error = await res.text();
            alert(error);
            return;
        }

        //oppdater listen etter kjøp
        fetchAthletes();
    };

    if(loading) return <p>Loading...</p>;

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Athletes</h1>
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