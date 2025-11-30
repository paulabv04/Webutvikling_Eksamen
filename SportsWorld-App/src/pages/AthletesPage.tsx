import { useEffect, useState } from "react";
import type { IAthlete } from "../interfaces/IAthlete";
import { getAthletes,deleteAthlete } from "../services/AthleteService";

const AthletesPage = () => {
   const [athletes, setAthletes] = useState<IAthlete[]>([]);
   const [search, setSearch] = useState("");

   useEffect(() => {
    loadData();
   }, []);

   const loadData = async () => {
    const data = await getAthletes();
    console.log("ATHLETES FROM API:", data);
    setAthletes(data);
   };

   const handleData = async (id:number) => {
    if(!confirm("Delete athlete?")) return;
    await deleteAthlete(id);
    loadData();
   };

   const filteredAthletes = athletes.filter(a => 
    a.name.toLowerCase().includes(search.toLowerCase())
   );

   return(
    <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Athletes</h1>

        <input 
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 mb-4 w-full max-w-sm"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredAthletes.map(a => (
                <div key={a.id} className="border p-4 rounded shadow">
                    <img src={`/images/${a.image}`} alt={a.name} className="h-40 w-full object-cover mb-2" />
                    <h2 className="text-lg font-semibild">{a.name}</h2>
                    <p>Gender: {a.gender}</p>
                    <p>Price: ${a.price}</p>
                    <p>STATUS:{a.purchaseStatus ? "Purchased" : "Not purchased"}</p>

                    <button 
                    onClick={() => handleData(a.id)}
                    className="mt-2 bg-red-600 text-white px-3 py-1 rounded"
                    >Delete
                    </button>
                </div>
            ))}
        </div>
    </div>
   );
};

export default AthletesPage;