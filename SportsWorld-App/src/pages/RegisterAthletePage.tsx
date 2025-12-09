import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { IAthlete } from "../interfaces/IAthlete";
import { createAthlete } from "../services/AthleteService";
import { uploadImage } from "../services/AthleteService";
import Button from "../components/Button";
import SuccessModal from "../components/SuccessModal";

const RegisterAthletePage = () => {
    const navigate = useNavigate();

    //Holder på input-verdiene til ny athlete
    const[athlete, setAthlete] = useState<IAthlete>({
        id:0, 
        name: "",
        gender: "Male",
        price: 0,
        image: "",
        purchaseStatus: false, 
    });

    const [showSuccess, setShowSuccess] = useState(false);

    //Sender ny athlete til API
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await createAthlete(athlete);
        setShowSuccess(true);
    };

    return (
        <div className="min-h-screen bg-tennisSand/40 py-10 px-4">
            <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-lg border border-tennisGreen/50 p-8">

            {/*Tittel*/}
            <h1 className="text-4xl font-serif text-tennisGreen mb-1">Register new Athlete</h1>
            <p className="text-sm text-tennisDark mb-6">Register a new premium tennis venue for SportsWorld events.</p>

            {/*Skjema*/}
            <form onSubmit = {handleSubmit} className="space-y-4">

            {/*Navn*/}
            <div>
                <label className="block text-sm font-medium text-tennisDark">Name</label>
                    <input
                        type="text"
                        value={athlete.name}
                        placeholder="e.g. Kasper Rud"
                        onChange={(e) =>
                            setAthlete({...athlete, name: e.target.value})} 
                        className="w-full rounded-xl border border-tennisGreen/40 p-3 shadow-sm focus:outline-none focus:ring-tennisGreen focus:ring-2 focus:ring-tennisGreen"
                        required
                        />
                    </div>
                    
                    {/*Kjønn*/}
                    <div>
                        <label className="block text-sm font-medium text-tennisDark">Gender</label>
                        <select 
                        value={athlete.gender}
                        onChange={(e) =>
                            setAthlete({...athlete, gender: e.target.value})
                        } 
                        className="w-full rounded-xl border border-tennisGreen/40 p-3 shadow-sm focus:outline-none focus:ring-tennisGreen focus:ring-2 focus:ring-tennisGreen"
                        >
                            <option>Male</option>
                            <option>Female</option>
                        </select>
                    </div>

                    {/*Pris*/}
                    <div>
                        <label className="block text-sm font-medium text-tennisDark">Price</label>
                        <input
                        type="number"
                        value={athlete.price}
                        placeholder="e.g. 300000"
                        onChange={(e) =>
                            setAthlete({...athlete, price: Number(e.target.value)})} 
                        className="w-full rounded-xl border border-tennisGreen/40 p-3 shadow-sm focus:outline-none focus:ring-tennisGreen focus:ring-2 focus:ring-tennisGreen"
                        required
                        />
                    </div>

                    {/*Bilde*/}
                    <div>
                        <label className="block text-sm font-medium text-tennisDark">Choose Image</label>
                        <input
                        type="file"
                        accept="image/*"
                        onChange={async (e) => {
                            if (!e.target.files || e.target.files?.length === 0) return;

                            const file = e.target.files[0];
                            const uploadedFileName = await uploadImage(file);

                            setAthlete({ ...athlete, image: uploadedFileName});
                        }}
                        className="w-full rounded-xl border border-tennisGreen/40 p-3 shadow-sm focus:outline-none focus:ring-tennisGreen focus:ring-2 focus:ring-tennisGreen"
                        />
                    </div>
                    
                    <Button variant="primary" type="submit">
                        Register athlete
                    </Button>
                </form>

                <SuccessModal
                show={showSuccess}
                message="Athlete added succesfully!"
                onClose={() => {
                    setShowSuccess(false);
                    navigate("/athletes");
                }}
                />
        </div>
    </div>
    );
};

export default RegisterAthletePage;