import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAthlete } from "../contexts/AthleteContext";
import AthleteCard from "../components/AthleteCard";
import Button from "../components/Button";
import ConfirmModal from "../components/ConfirmModal";
import { deleteAthlete } from "../services/AthleteService";

const AthletesPage = () => {
    //Henter liste + oppdateringsfunskjoner fra context
   const {athletes, loadAthletes} = useAthlete();

   //Lokalt søkefelt
   const [search, setSearch] = useState("");

   //Navigasjon til andre sider
   const navigate = useNavigate();

   //Modal-state for sletting
   const [showConfirm, setShowConfirm] = useState(false);

   //starter sletting og åpner modal
   const [pendingDeleteId, setPendingDeleteId] = useState<number | null>(null);

   //Sletter athlete og oppdaterer liste
   const startDelete = (id: number) => {
    setPendingDeleteId(id);
    setShowConfirm(true);
   }

   const confirmDelete = async () => {
    if(pendingDeleteId === null) return;

    await deleteAthlete(pendingDeleteId);
    await loadAthletes();

    setShowConfirm(false);
    setPendingDeleteId(null);
   }

   //Fjerner athletes som ikke matcher søket 
   const filteredAthletes = athletes.filter(a => 
    a.name.toLowerCase().includes(search.toLowerCase())
   );

   return(
    <div className="p-6">
        <div className="flex justify-between items-center mb-4">
            <h1 className="text-4xl font-serif mb-4 text-tennisGreen">Athletes</h1>

            <Button variant="primary" onClick={() => navigate("/athletes/register")}>
                + Add Athlete
            </Button>
        </div>

        <input 
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-8 max-w-sm p-3 rounded-xl border border-tennisGreen/50 bg-white shadow-sm focus:outline-none focus:ring-tennisGreen focus:ring-2 focus:ring-tennisGreen"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAthletes.map(a => (
                <AthleteCard
                key={a.id}
                athlete={a}
                onDelete={startDelete}
                />
            ))}
        </div>

        <ConfirmModal 
        show={showConfirm}
        message="Are you sure you ant to delete this athlete?"
        onConfirm={confirmDelete}
        onCancel={() => setShowConfirm(false)}
        />
    </div>
);
};

export default AthletesPage;