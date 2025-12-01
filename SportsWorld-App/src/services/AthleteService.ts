import axios from "axios";
import { BASE_URL } from "../global";
import type { IAthlete } from "../interfaces/IAthlete";

const API_URL = `${BASE_URL}/Athlete`;

export const getAthletes = async (): Promise<IAthlete[]> => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const deleteAthlete = async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`);
};