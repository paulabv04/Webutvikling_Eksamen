import { BASE_URL } from "../global";
import type { IVenue } from "../interfaces/IVenue";
import axios from "axios";


const API_URL = `${BASE_URL}/Venues`;

const venueService = {
    // Get: hent alle venues
    async getAll(): Promise<IVenue[]> {
        const response = await axios.get(API_URL);
        return response.data;
    },

    // GET: hent en venue
    async getById(id: number): Promise<IVenue> {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    },

    // POST: legg til venue
    async create(venue: Omit<IVenue, "id">): Promise<IVenue> {
        const response = await axios.post(API_URL, venue);
        return response.data;
    },

    // PUT: oppdater venue
    async update(id: number, venue: IVenue): Promise<IVenue> {
        const response = await axios.put(`${API_URL}/${id}`, venue);
        return response.data;
    },

    // DELETE: slett venue
    async delete(id: number): Promise<void> {
        await axios.delete(`${API_URL}/${id}`);
    },

    
    async uploadImage(file: File): Promise<string> {
        const formData = new FormData();
        formData.append("file", file);

        const response = await axios.post(`${API_URL}/upload`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

    return response.data;
    }

};

export default venueService;
