import axios from "axios";
import { BASE_URL } from "../global";
import type { IAthlete } from "../interfaces/IAthlete";

const API_URL = `${BASE_URL}/Athlete`;

export const getAthletes = async (): Promise<IAthlete[]> => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const getAthleteById = async (id: number): Promise<IAthlete> => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};

export const updateAthlete = async (id: number, athlete: IAthlete): Promise<void> => {
    await axios.put(`${API_URL}/${id}`, athlete);
}

export const deleteAthlete = async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`);
};

export const createAthlete = async (athlete: IAthlete): Promise<void> => {
    await axios.post(API_URL,athlete);
}

export const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.post(`${BASE_URL}/ImageUpload`, formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
    return response.data.fileName;
}