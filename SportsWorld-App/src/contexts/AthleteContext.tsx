import React, { createContext,useContext, useEffect, useState } from "react";
import { getAthletes } from "../services/AthleteService";
import type { IAthlete } from "../interfaces/IAthlete";

//Definerer hvilken data og funskjoner contexten skal gi videre til komponenter
interface IAthleteContext {
    athletes: IAthlete[];
    loadAthletes: () => Promise<void>;
}

//Oppretter selve contexten, starter som null og settes når Provider brukes
const AthleteContext = createContext<IAthleteContext | null>(null);

//Provider, wrapper og gjør athletes tilgjengelig globalt
export function AthleteProvider({children}:{children: React.ReactNode}) {
    const [athletes, setAthletes] = useState<IAthlete[]>([]);

    //Henter fra API, lagrer i global state
    const loadAthletes = async () => {
        const data = await getAthletes();
        setAthletes(data);
    };

    useEffect(() => {
        loadAthletes();
    }, []);

    return(
        <AthleteContext.Provider value={{ athletes, loadAthletes}}>
            {children}
        </AthleteContext.Provider>
    );
}

//Custom hook for å bruke enklere i andre komponenter
export const useAthlete = () => {
    const context = useContext(AthleteContext);
    if(!context) {
        throw new Error("useAthlete must be used inside AthleteProvider")
    }
    return context;
}