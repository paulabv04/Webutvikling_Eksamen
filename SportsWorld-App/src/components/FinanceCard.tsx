
// importerer IFinace interface slik at komponenter får riktig TypeScript type
import type { IFinance } from "../interfaces/IFinance";


export default function FinanceCard({finance}: {finance: IFinance}){
    return (

        // grid layout med tre kolonner som viser de tre verdiene
        <div className="grid grid-cols-3 gap-4 mb-8">

            { /* Viser hvor mye penger som er igjen */ }
            <div className="bg-tennisGreen text-tennisSand p-5 rounded-xl shadow">
                <h3 className="text-sm">Money Left</h3>
                <p className="text-3xl font-bold">{finance.moneyLeft}</p>
            </div>

            { /* Viser hvor mange athletes som er kjøpt */ }
            <div className="bg-tennisGreen text-tennisSand p-5 rounded-xl shadow">
                <h3 className="text-sm">Purchased Athletes</h3>
                <p className="text-3xl font-bold">{finance.numberOfPurchases}</p>
            </div>

            { /* Viser totalsummen som er brukt */ }
            <div className="bg-tennisGreen text-tennisSand p-5 rounded-xl shadow">
                <h3 className="text-sm">Money Spent</h3>
                <p className="text-3xl font-bold">{finance.moneySpent}</p>
            </div>

        </div>
    );
}