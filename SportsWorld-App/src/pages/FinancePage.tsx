
import { useEffect, useState } from "react";
import { useFinance } from "../contexts/FinanceContext";
import { loan, purchaseAthlete } from "../services/FinanceService";
import { getAthletes } from "../services/AthleteService";
import type { IAthlete } from "../interfaces/IAthlete";
import FinanceCard from "../components/FinanceCard";
import PurchaseList from "../components/PurchaseList";

export default function FinancePage() {
    // Henter finance-state og funksjon for å oppdatere den fra context 
    const { finance, updateFinance } = useFinance();

    // lokal state for liste over athletes og lånebeløp
    const [athletes, setAthletes ] = useState<IAthlete[]>([]);
    const [loanAmount, setLoanAmount] = useState("");

    // henter alle athletes når siden lastes inn
    useEffect(() => {
        getAthletes().then(setAthletes);
    }, []);

    // håndterer knapp for å ta opp lån
    async function handleLoan() {
        if (!loanAmount) return;
        await loan(Number(loanAmount));
        await updateFinance();
        setLoanAmount("");
    }

    // håndterer kjøp av athlete 
    async function handlePurchase(id: number) {
        await purchaseAthlete(id);
        await updateFinance();
        setAthletes(await getAthletes());
    }

    // viser enkel lodaing text men finance ikke er lastet inn
    if (!finance) return <p>Loading...</p>;

    return (
        <div className="p-8 space-y-12">

            { /* Tittel */ }
            <h1 className="flex gap-4 px-2 pb-4 snap-x snap-mandatory font-serif text-5xl" > 
                Finances 
            </h1>

            { /* Oversiktskort for økonomi (money left, spent, purchases) */ }
            <FinanceCard finance={finance} /> 

            { /* seksjon for å ta opp lån */ }
            <section className="bg-tennisGreen p-6 rounded-xl">
                <h2 className="text-xl text-tennisSand mb-3">Get a loan</h2>

                <input
                    type="number"
                    value={loanAmount}
                    onChange={(e)=> setLoanAmount(e.target.value)}
                    className="p-2 rounded mr-3"
                    placeholder="Loan amount"
                />

                <button
                    onClick={handleLoan}
                    className="bg-tennisSand text-tennisGreen px-4 py-2 rounded font-semibold">
                        Add loan
                </button>
            </section>
            
            { /* Liste over athltes som kan kjøpes (ikke kjøpt enda) */}
            <PurchaseList athletes={athletes} onPurchase={handlePurchase}/>

        </div>
    );
}