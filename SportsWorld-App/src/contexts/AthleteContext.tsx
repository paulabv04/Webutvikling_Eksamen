import React, { createContext,useContext, useEffect, useState } from "react";
import { getAthletes } from "../services/AthleteService";
import type { IAthlete } from "../interfaces/IAthlete";

interface IAthleteContext {
    athletes: IAthlete[];
    loadAthletes: () => Promise<void>;
}

const AthleteContext = createContext<IAthleteContext | null>(null);

export function AthleteProvider({children}:{children: React.ReactNode}) {
    const [athletes, setAthletes] = useState<IAthlete[]>([]);

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

export const useAthlete = () => {
    const context = useContext(AthleteContext);
    if(!context) {
        throw new Error("useAthlete must be used inside AthleteProvider")
    }
    return context;
}