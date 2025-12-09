
import { BASE_URL } from "../global";
import type { IFinance } from "../interfaces/IFinance";

// henter gjeldende finance data fra API-et
export async function getFinance(): Promise<IFinance> {
    const response = await fetch(`${BASE_URL}/Finance`);
    if (!response.ok) throw new Error("Failed to load finance");
    return response.json();
}

// POST-request for å ta opp lån og øke moneyLeft i databasen
export async function loan(amount:number): Promise<IFinance> {
    const response = await fetch(`${BASE_URL}/Finance/loan`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({amount})
    });
    if (!response.ok) throw new Error("Loan failed");
    return response.json();
}

// Registrerer kjøp av athlete i backend og oppdaterer Finance-tabellen
export async function purchaseAthlete(athleteId: number): Promise<IFinance> {
    const response = await fetch(`${BASE_URL}/Finance/purchase/${athleteId}`,{
        method: "POST",
    });
    if (!response.ok) throw new Error("Purchase failed");
    return response.json();

}



