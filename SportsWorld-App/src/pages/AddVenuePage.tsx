
import { useState } from "react";
import type { FormEvent } from "react";
import { useVenue } from "../contexts/VenueContext";
import SuccessModal from "../components/SuccessModal";
import venueService from "../services/VenueService";
import Button from "../components/Button";

export default function AddVenuePage() {
    // henter addVenue fra VenueContext for å lagre ny venue globalt
    const { addVenue } = useVenue(); 

    // lokal state for inputfeltene i skjemaet
    const [name, setName] = useState("");
    const [capacity, setCapacity] = useState<number | "">("");
    const [image, setImage] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);


    // Håndter innsending av skjema
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // validering når alle felt er fylt ut
        if(!name || capacity === "" || !image) {
            alert("Please fill out all fields.");
            return;
        }

        try {
            // kaller addVenue fra context for å opprette en nye venue i backend
            await addVenue({
                name, 
                capacity: Number(capacity),
                image,
            });

            // vises suksessmodal når lagring er vellykket
            setShowSuccess(true);

            // tøm inputfeltene etter at venue er lagt til
            setName("");
            setCapacity("");
            setImage("");
        } catch (error) {
            console.error("Error adding venue:", error);
            alert("Failed to add venue.")
        }
    };

    return (

        <div className="min-h-screen bg-tennisSand/40 py-10 px-4">
            <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-lg border border-tennisGreen/50 p-8">

                {/*Tittel*/}
                <h1 className="text-4xl font-serif text-tennisGreen mb-1"> Register new Venue </h1>
                <p className="text-sm text-tennisDark mb-6">
                    Register a new premium tennis venue for SportsWorld events.
                </p>

                {/* Skjema for å registrere ny venue */}
                <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    { /* Navn felt */ }
                    <label className="block text-sm font-medium text-tennisDark"> Venue name </label>
                    <input 
                    type="text"
                    value={name}
                    placeholder="e.g. Centre Court, Wimbledon"
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-xl border border-tennisGreen/40 p-3 shadow-sm focus:outline-none focus:ring-tennisGreen focus:ring-2 focus:ring-tennisGreen"
                    required
                    />
                </div>

                { /* Kapasitet felt */ }
                <div>
                    <label className="block text-sm font-medium text-tennisDark mb-1"> Capacity </label>
                    <input
                    type="number"
                    value={capacity}
                    placeholder="e.g. 15000"
                    onChange={(e) => {
                        const value = e.target.value;
                        setCapacity(value === "" ? "" : Number(value));
                    }}
                    className="w-full border border-tennisDark rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-tennisGreen"
                    required
                    />
                </div>

                { /* Bildeopplasting, sender fil til backend og lagrer filnavn */ }
                <div>
                    <label className="block text-sm font-medium text-tennisDark mb-1"> Image </label>
                    <input
                    type="file"
                    accept="image/*"
                    onChange={async (e) => {
                        if (!e.target.files || e.target.files.length === 0) return;
                        const file = e.target.files[0];

                        // laster opp bilde via VenueService og lagrer filnavnet
                        const uploaded = await venueService.uploadImage(file);
                        setImage(uploaded);
                    }}
                    className="w-full rounded-xl border border-tennisGreen/40 p-3 shadow-sm focus:outline-none focus:ring-tennisGreen focus:ring-2 focus:ring-tennisGreen"
                    required
                    />
                </div>

                { /* Knapp for å sende inn skjema */ }
                <Button variant="primary" type="submit">
                        Register venue
                    </Button>
                </form>

                { /* Modal som vises når venue er lagt til */ }
                <SuccessModal
                show={showSuccess}
                message="Venue added successfully!"
                onClose={() => setShowSuccess(false)}
                />
            </div>
        </div>
    );
}