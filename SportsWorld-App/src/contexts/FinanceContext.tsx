
import { createContext, useContext, useEffect, useState } from "react";
import type { IFinance } from "../interfaces/IFinance";
import { getFinance } from "../services/FinanceService";

// definerer hvilke verdier som skal finnes i contexten
interface FinanceContextType {
    finance: IFinance | null;
    updateFinance: () => Promise<void>; // metode for å hente oppdatert data fra API
}

// oppretter context med default-verdier
const FinanceContext = createContext<FinanceContextType>({
    finance: null,
    updateFinance: async() => {},
});

// provider komponenten deler data om finance til hele applikasjonen
export function FinanceProvider({children}: {children: React.ReactNode}){

    // lokal state som holder finance-objektet
    const [finance, setFinance] = useState<IFinance | null>(null);

    // henter finance-data fra API-et
    async function updateFinance() {
        const data = await getFinance(); // kaller service-funksjonen 
        setFinance(data); // oppdaterer state
    }

    // henter finance-data automatisk når appen starter
    useEffect(()=> {
        updateFinance();
    }, []);

    return (
        // gjør finance og updateFinance tilgjengelig for alle barn-komponenter
        <FinanceContext.Provider value={{finance, updateFinance}}>
            {children}
        </FinanceContext.Provider>
    );
}

// egen hook for å bruke FinanceContext enklere
export function useFinance(){
    return useContext(FinanceContext);
}



