import axios from "axios";
import type { IAthlete } from "../interfaces/IAthlete";

const API_URL = "http://localhost:5134/api/Athlete";

export const getAthletes = async (): Promise<IAthlete[]> => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const deleteAthlete = async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`);
};