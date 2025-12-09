import { useState } from "react";
import { useAthlete } from "../contexts/AthleteContext";
import AthleteCard from "../components/AthleteCard";
import ConfirmModal from "../components/ConfirmModal";
import { deleteAthlete } from "../services/AthleteService";

const AthletesPage = () => {
    //Henter liste + oppdateringsfunskjoner fra context
   const {athletes, loadAthletes} = useAthlete();

   //Lokalt søkefelt
   const [search, setSearch] = useState("");

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
    <div className="min-h-screen bg-tennisSand py-10 px-4 flex justify-center">
        <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg border border-tennisDark p-8">

        {/* Header */}
        <div className="mb-6">
        <h1 className="flex gap-4 px-2 pb-4 font-serif text-5xl text-tennisGreen">All Athletes</h1>
        <p className="text-sm text-tennisDark">Overview of all registered tennis athletes for SportsWorld</p>
        </div>


        {/* Søkefelt */ }
        <div className="mb-4">
            <label className="block text-sm font-medium text-tennisDark mb-1"> Search by athlete name</label>
            <input
            type="text"
            value={search}
            placeholder="e.g. Osaka, Rafa Nadal"
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-sm p-3 rounded-xl border border-tennisGreen/50 bg-white shadow-sm focus:outline-none focus:ring-tennisGreen focus:ring-2 focus:ring-tennisGreen"
            />
        </div>

        {/*Athletes*/}
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
        message="Are you sure you want to delete this athlete?"
        onConfirm={confirmDelete}
        onCancel={() => setShowConfirm(false)}
        />
        </div>
    </div>
);
};

export default AthletesPage;