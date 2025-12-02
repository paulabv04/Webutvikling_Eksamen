
import { useState } from "react";
import type { FormEvent } from "react";
import { useVenue } from "../contexts/VenueContext";
import SuccessModal from "../components/SuccessModal";

export default function AddVenuePage() {
    const { venues, addVenue } = useVenue(); // henter fra context

    // input felt state
    const [name, setName] = useState("");
    const [capacity, setCapacity] = useState<number | "">("");
    const [image, setImage] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);


    // submit av skjema
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(!name || capacity === "" || !image) {
            alert("Please fill out all fields.");
            return;
        }

        try {
            await addVenue({
                name, 
                capacity: Number(capacity),
                image,
            });

            setShowSuccess(true);

            // tøm inputfeltene etter post
            setName("");
            setCapacity("");
            setImage("");
        } catch (error) {
            console.error("Error adding venue:", error);
            alert("Failed to add venue.")
        }
    };

    return (

        <div className="min-h-screen bg-[#f6f4ef] flex justify-center py-10 px-4">
            <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg border border-[#b4a27a] p-8">
            <h2 className="text-3xl font-bold mb-2 text-[#0f3d2e]"> Add new Venue </h2>
            <p className="text-sm text-[#1d4e39] mb-6">
                Register a new premium tennis venue for SportsWorld events.
            </p>
            {/* Skjema for å legge til venue */}
            <form onSubmit={handleSubmit} className="space-y-4 mb-8">
                <div>
                    <label className="block text-sm font-medium text-[#0f3d2e]"> Venue Name </label>
                    <input 
                    type="text"
                    value={name}
                    placeholder="e.g. Centre Court, Wimbledon"
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border border-[#bfa27a] rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#1d4e39]"
                    required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-[#0f3d2e] mb-1"> Capacity </label>
                    <input
                    type="number"
                    value={capacity}
                    placeholder="e.g. 15000"
                    onChange={(e) => {
                        const value = e.target.value;
                        setCapacity(value === "" ? "" : Number(value));
                    }}
                    className="w-full border border-[#bfa27a] rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#1d4e39]"
                    required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-[#0f3d2e] mb-1"> Image path / URL </label>
                    <input
                    type="text"
                    value={image}
                    placeholder="e.g. /images/wimbledon.jpg"
                    onChange={(e) => setImage(e.target.value)}
                    className="w-full border border-[#bfa27a] rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#1d4e39]"
                    required
                    />
                </div>

                <button 
                type="submit"
                className="w-full bg-[#0f3d2e] text-[#f6f4ef] py-2 rounded-lg font-semibold hover:bg-[#1d4e39] transition"
                >
                Add Venue
                </button>
                </form>

                <SuccessModal
                show={showSuccess}
                message="Venue added successfully!"
                onClose={() => setShowSuccess(false)}
                />
                
                {/* Liste over venues */}
                <h3 className="text-xl font-semibold text-[#0f3d2e] mb-3"> All Venues </h3>

                {venues.length === 0 ? (
                    <p className="text-gray-500 italic">No venues added yet.</p>
                ) : (
                    <ul className="space-y-2">
                        {venues.map((v, index) => (
                            <li
                            key={v.id}
                            className="p-3 bg-[#f6f4ef] rounded flex flex-col border-l-4 border-[#bfa27a] shadow-sm"
                        >
                            <span className="font-semibold text-[#0f3d2e]"> {index + 1}. {v.name} </span>
                            <span className="text-sm text-[#1d4e39]"> Capacity: {v.capacity} - {v.image} </span>
                            </li>
                        ))}
                    </ul>
                )}
                </div>
        </div>
    );
}