import React, { useEffect, useState } from "react";
import {useParams, useNavigate} from "react-router-dom";
import type { IAthlete } from "../interfaces/IAthlete";
import { getAthleteById, updateAthlete } from "../services/AthleteService";
import { uploadImage } from "../services/ImageService";

const EditAthletePage = () => {
    const {id} = useParams();
    const navigate = useNavigate();

    const [athlete, setAthlete] = useState<IAthlete | null>(null);

        useEffect(() => {
            loadData();
        }, []);

        const loadData = async () => {
            if(!id) return;
            const data = await getAthleteById(Number(id));
            setAthlete(data);
        };

        const handleSubmit = async (e: React.FormEvent) => {
            e.preventDefault();
            if(!athlete) return;

            await updateAthlete(athlete.id, athlete);
            navigate("/"); 
        };

        if(!athlete) return <p className="p-6">Loading...</p>;

        return(
            <div className="p-6 max-w-xl mx-auto">
                <h1 className="text-2xl front-bold mb-4">Edit Athlete</h1>

                <form onSubmit={handleSubmit} className="space-y-4">

                    <div>
                        <label>Name</label>
                        <input
                        type="text"
                        value={athlete.name}
                        onChange={(e) =>
                            setAthlete({...athlete, name: e.target.value})
                        } 
                        className="border p-2 w-full"
                        />
                    </div>
                    
                    <div>
                        <label>Gender</label>
                        <select 
                        value={athlete.gender}
                        onChange={(e) =>
                            setAthlete({...athlete, gender: e.target.value})
                        } 
                        className="border p-2 w-full"
                        >
                            <option>Male</option>
                            <option>Female</option>
                        </select>
                    </div>

                    <div>
                        <label>Price</label>
                        <input
                        type="number"
                        value={athlete.price}
                        onChange={(e) =>
                            setAthlete({...athlete, price: Number(e.target.value),

                            })
                        } 
                        className="border p-2 w-full"
                        />
                    </div>

                    <div>
                        <label>Purchased?</label>
                        <select
                        value={athlete.purchaseStatus ? "true" : "false"}
                        onChange={(e) =>
                            setAthlete({...athlete, purchaseStatus: e.target.value === "true"

                            })
                        } 
                        className="border p-2 w-full"
                        >
                          <option value="false">Not purchased</option>
                            <option value="true">Purchased</option>
                        </select>
                    </div>

                    <div>
                        <label>Change Image</label>
                        <input
                        type="file"
                        accept="image/*"
                        onChange={async (e) => {
                            if (!e.target.files || e.target.files?.length === 0) return;

                            const file = e.target.files[0];
                            const uploadedFileName = await uploadImage(file);

                            setAthlete({ ...athlete, image: uploadedFileName});
                        }}
                        className="border p-2 w-full"
                        />
                    </div>

                    <button
                    type="submit"
                    className="bg-green-600 text-white px-4 py-2 rounded"
                    >
                        Save Changes
                    </button>
                    </form>
            </div>
        );
};

export default EditAthletePage