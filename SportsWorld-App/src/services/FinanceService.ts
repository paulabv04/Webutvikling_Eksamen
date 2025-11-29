
import { BASE_URL } from "../global";
import type { IFinance } from "../interfaces/IFinance";

export async function getFinance(): Promise<IFinance> {
    const response = await fetch(`${BASE_URL}/Finance`);
    if (!response.ok) throw new Error("Failed to load finance");
    return response.json();
}

export async function loan(amount:number): Promise<IFinance> {
    const response = await fetch(`${BASE_URL}/Finance/loan/${amount}`, {
        method: "PUT",
    });
    if (!response.ok) throw new Error("Loan failed");
    return response.json();
}

export async function purchaseAthlete(athleteId: number): Promise<IFinance> {
    const response = await fetch(`${BASE_URL}/Finance/purchase/${athleteId}`,{
        method: "PUT",
    });
    if (!response.ok) throw new Error("Purchase failed");
    return response.json();

}



