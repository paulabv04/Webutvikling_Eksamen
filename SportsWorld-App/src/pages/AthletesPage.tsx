import { useEffect, useState } from "react";
import type { IAthlete } from "../interfaces/IAthlete";
import { getAthletes,deleteAthlete } from "../services/AthleteService";
import AthleteCard from "../components/AthleteCard";

const AthletesPage = () => {
   const [athletes, setAthletes] = useState<IAthlete[]>([]);
   const [search, setSearch] = useState("");


   useEffect(() => {
    loadData();
   }, []);

   const loadData = async () => {
    const data = await getAthletes();
    setAthletes(data);
   };

   const handleDelete= async (id:number) => {
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
                <AthleteCard
                key={a.id}
                athlete={a}
                onDelete={handleDelete}
                />
            ))}
        </div>
    </div>
   );
};

export default AthletesPage;