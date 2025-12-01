
import { useEffect, useState } from "react";
import { useFinance } from "../contexts/FinanceContext";
import { loan, purchaseAthlete } from "../services/FinanceService";
import { getAthletes } from "../services/AthleteService";
import type { IAthlete } from "../interfaces/IAthlete";
import FinanceCard from "../components/FinanceCard";
//import PurchaseList from "../components/PurchaseList";

export default function FinancePage() {
    const { finance, updateFinance } = useFinance();
    const [athletes, setAthletes ] = useState<IAthlete[]>([]);
    const [loanAmount, setLoanAmount] = useState("");

    useEffect(() => {
        getAthletes().then(setAthletes);
    }, []);

    async function handleLoan() {
        if (!loanAmount) return;
        await loan(Number(loanAmount));
        await updateFinance();
        setLoanAmount("");
    }

    async function handlePurchase(id: number) {
        await purchaseAthlete(id);
        await updateFinance();
        setAthletes(await getAthletes());
    }

    if (!finance) return <p>Loading...</p>;

    return (
        <div className="p-8 space-y-12">

            <FinanceCard finance={finance} /> 

            <section className="bg-[#12382b] p-6 rounded-xl">
                <h2 className="text-xl text-[#d4c28a] mb-3">Get a loan</h2>

                <input
                    type="number"
                    value={loanAmount}
                    onChange={(e)=> setLoanAmount(e.target.value)}
                    className="p-2 rounded mr-3"
                    placeholder="Loan amount"
                />

                <button
                    onClick={handleLoan}
                    className="bg-[#d4c28a] text-[#12382b] px-4 py-2 rounded font-semibold">
                        Add loan
                </button>
            </section>
            
            {/*<PurchaseList athletes={athletes} onPurchase={handlePurchase}/>*/}

        </div>
    );
}