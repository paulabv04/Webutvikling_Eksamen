import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { IAthlete } from "../interfaces/IAthlete";
import { createAthlete } from "../services/AthleteService";
import { uploadImage } from "../services/AthleteService";
import Button from "../components/Button";

const RegisterAthletePage = () => {
    const navigate = useNavigate();

    const[athlete, setAthlete] = useState<IAthlete>({
        id:0, 
        name: "",
        gender: "Male",
        price: 0,
        image: "",
        purchaseStatus: false, 
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await createAthlete(athlete);
        navigate("/athletes");
    };

    return (
        <div className="p-6 max-w-xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Register New Athlete</h1>

            <form onSubmit = {handleSubmit} className="space-y-4">

            <div>
                        <label>Name</label>
                        <input
                        type="text"
                        value={athlete.name}
                        onChange={(e) =>
                            setAthlete({...athlete, name: e.target.value})} 
                        className="border p-2 w-full"
                        required
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
                            setAthlete({...athlete, price: Number(e.target.value)})} 
                        className="border p-2 w-full"
                        required
                        />
                    </div>

                    <div>
                        <label>Choose Image</label>
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
                    
                    <Button variant="primary" type="submit">
                        Register Athlete
                    </Button>
                </form>
        </div>
    );
};

export default RegisterAthletePage;