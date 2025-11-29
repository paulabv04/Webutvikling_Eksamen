
import { createContext, useContext, useEffect, useState } from "react";
import type { IFinance } from "../interfaces/IFinance";
import { getFinance } from "../services/FinanceService";

interface FinanceContextType {
    finance: IFinance | null;
    updateFinance: () => Promise<void>;
}

const FinanceContext = createContext<FinanceContextType>({
    finance: null,
    updateFinance: async() => {},
});

export function FinanceProvider({children}: {children: React.ReactNode}){
    const [finance, setFinance] = useState<IFinance | null>(null);

    async function updateFinance() {
        const data = await getFinance();
        setFinance(data);
    }

    useEffect(()=> {
        updateFinance();
    }, []);

    return (
        <FinanceContext.Provider value={{finance, updateFinance}}>
            {children}
        </FinanceContext.Provider>
    );
}

export function useFinance(){
    return useContext(FinanceContext);
}



