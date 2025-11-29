import {BASE_URL} from "../global";
import type { IAthlete } from "../interface/IAthlete";

export async function getAthletes(): Promise<IAthlete[]> {
    const response = await fetch (`${BASE_URL}/athlete`);

    if(!response.ok){
        throw new Error("Failed to fetvh athletes");
    }
    return response.json()
}