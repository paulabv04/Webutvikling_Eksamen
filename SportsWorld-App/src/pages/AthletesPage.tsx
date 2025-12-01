import { useEffect, useState } from "react";
import type { IAthlete } from "../interfaces/IAthlete";
import { getAthletes,deleteAthlete } from "../services/AthleteService";
import AthleteCard from "../components/AthleteCard";
import { useNavigate } from "react-router-dom";

const AthletesPage = () => {
   const [athletes, setAthletes] = useState<IAthlete[]>([]);
   const [search, setSearch] = useState("");
   const navigate = useNavigate();


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
        <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold mb-4">Athletes</h1>

            <button
            onClick={() => navigate("/athletes/register")}
            className="bg-green-600 text-white px-4 py-2 rounded"
            >
                + Add Athlete
            </button>
        </div>

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