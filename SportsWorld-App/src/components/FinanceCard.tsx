
import type { IFinance } from "../interfaces/IFinance";

export default function FinanceCard({finance}: {finance: IFinance}){
    return (

        <div className="grid grid-cols-3 gap-4 mb-8">

            <div className="bg-[#12382b] text-[#d4c28a] p-5 rounded-xl shadow">
                <h3 className="text-sm">Money Left</h3>
                <p className="text-3xl font-bold">{finance.moneyLeft}</p>
            </div>

            <div className="bg-[#12382b] text-[#d4c28a] p-5 rounded-xl shadow">
                <h3 className="text-sm">Purchased Athletes</h3>
                <p className="text-3xl font-bold">{finance.numberOfPurchases}</p>
            </div>

            <div className="bg-[#12382b] text-[#d4c28a] p-5 rounded-xl shadow">
                <h3 className="text-sm">Money Spent</h3>
                <p className="text-3xl font-bold">{finance.moneySpent}</p>
            </div>

        </div>
    );
}