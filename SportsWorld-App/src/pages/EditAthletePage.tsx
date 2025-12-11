import React, { useEffect, useState } from "react";
import {useParams, useNavigate} from "react-router-dom";
import type { IAthlete } from "../interfaces/IAthlete";
import { getAthleteById, updateAthlete } from "../services/AthleteService";
import { uploadImage } from "../services/ImageService";
import Button from "../components/Button";
import SuccessModal from "../components/SuccessModal";
import { useAthlete } from "../contexts/AthleteContext";

const EditAthletePage = () => {
    //Henter id fra URL
    const {id} = useParams();
    const navigate = useNavigate();

    const {loadAthletes} = useAthlete();

    //Holder på athleten som skal redigeres
    const [athlete, setAthlete] = useState<IAthlete | null>(null);

    const [showSuccess, setShowSuccess] = useState(false);

    //Laster inn data når siden åpnes
        useEffect(() => {
            console.log("ID from URL:", id);
            loadData();
        }, []);

        //Henter athleten basert på ID fra API
        const loadData = async () => {
            if(!id) return;
            const data = await getAthleteById(Number(id));
            setAthlete(data);
        };

        //Sender oppdaterte data til serveren
        const handleSubmit = async (e: React.FormEvent) => {
            e.preventDefault();
            if(!athlete) return;

            await updateAthlete(athlete.id, athlete);

            await loadAthletes();

            setShowSuccess(true);

        };

        //Viser loading før data er hentet
        if(!athlete) return <p className="p-6">Loading...</p>;

        return(
            <div className="min-h-screen bg-tennisSand/40 py-10 px-4">
                <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-lg border border-tennisGreen/50 p-8">

                {/*Tittel*/}
                <h1 className="text-3xl font-serif text-tennisGreen mb-6">Edit Athlete</h1>

                {/*Skjema for å redigere*/}
                <form onSubmit={handleSubmit} className="space-y-4">

                    {/*Navn-felt*/}
                    <div>
                        <label className="block text-tennisGreen font-medium mb-1">Name</label>
                        <input
                        type="text"
                        value={athlete.name}
                        onChange={(e) =>
                            setAthlete({...athlete, name: e.target.value})
                        } 
                        className="w-full rounded-xl border border-tennisGreen/40 p-3 shadow-sm focus:outline-none focus:ring-tennisGreen focus:ring-2 focus:ring-tennisGreen"
                        />
                    </div>
                    
                    {/*Kjønn dropdown*/}
                    <div>
                        <label className="block text-tennisGreen font-medium mb-1">Gender</label>
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

                    {/*Prisfelt*/}
                    <div>
                        <label className="block text-tennisGreen font-medium mb-1">Price</label>
                        <input
                        type="number"
                        value={athlete.price}
                        onChange={(e) =>
                            setAthlete({...athlete, price: Number(e.target.value),

                            })
                        } 
                        className="w-full rounded-xl border border-tennisGreen/40 p-3 shadow-sm focus:outline-none focus:ring-tennisGreen focus:ring-2 focus:ring-tennisGreen"
                        />
                    </div>

                    {/*Purchased-status*/}
                    <div>
                        <label className="block text-tennisGreen font-medium mb-1"> Purchased?</label>
                        <p className="p-3 rounded-xl border border-tennisGreen/40 bg-gray-50">
                        {athlete.purchaseStatus ? "Purchased" : "Not purchased"}
                        </p>
                    </div>

                    {/*Laste opp nytt bilde og oppdatere image-feltet*/}
                    <div>
                        <label className="block text-tennisGreen font-medium mb-1">Change Image</label>
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
                    
                    {/*Lagre endringer*/}
                    <Button variant="primary" type="submit">
                        Save changes
                    </Button>
                </form>
            </div>

            <SuccessModal 
            show={showSuccess}
            message="Athlete updated successfully!"
            onClose={() => {
                setShowSuccess(false);
                navigate("/athletes");
            }}
            />
        </div>
        );
};

export default EditAthletePage