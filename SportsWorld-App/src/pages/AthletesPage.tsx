import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAthlete } from "../contexts/AthleteContext";
import AthleteCard from "../components/AthleteCard";
import Button from "../components/Button";
import ConfirmModal from "../components/ConfirmModal";
import { deleteAthlete } from "../services/AthleteService";

const AthletesPage = () => {
   const {athletes, loadAthletes} = useAthlete();
   const [search, setSearch] = useState("");
   const navigate = useNavigate();
   const [showConfirm, setShowConfirm] = useState(false);
   const [pendingDeleteId, setPendingDeleteId] = useState<number | null>(null);

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

   const filteredAthletes = athletes.filter(a => 
    a.name.toLowerCase().includes(search.toLowerCase())
   );

   return(
    <div className="p-6">
        <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold mb-4 text-tennisGreen">Athletes</h1>

            <Button variant="primary" onClick={() => navigate("/athletes/register")}>
                + Add Athlete
            </Button>
        </div>

        <input 
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-8 max-w-sm p-3 rounded-xl border border-tennisGreen/20 bg-white shadow-sm focus:border-tennisGreen focus:ring-2 focus:ring-tennisGreen/60"
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