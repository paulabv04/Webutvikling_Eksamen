// Definerer strukturen for Finance-objektet som bruker i dashbordet
// Dette sikrer at frontend alltid håndterer økonomi data med riktig type og format
export interface IFinance {
    id: number;
    moneyLeft: number;
    numberOfPurchases: number;
    moneySpent: number; 
}