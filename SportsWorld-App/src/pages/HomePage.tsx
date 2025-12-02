
import { useVenue } from "../contexts/VenueContext";
import VenueCard from "../components/VenueCard";


export default function Homepage(){

    const { venues } = useVenue();
    return (

        <div className="w-full">

            <section className="relative w-full h-[80vh] overflow-hidden">
                <video 
                    className="absolute inset-0 w-full object-cover"
                    autoPlay
                    muted
                    loop
                >
                    <source src="/video/forsideVideo.mp4" type="video/mp4"/>
                    
                </video>

                <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
                    <h1 className="text-5xl md:text-7xl font-light tracking-wide">
                        SportsWorld Tennis
                    </h1>
                </div>

            </section>


            <section className="mt-16">
                <h2 className="flex gap-4 px-2 pb-4 snap-x snap-mandatory">
                    Explore our Venues
                </h2>

                <div className="overflow-x-auto">
                    <div className="flex gap-4 px-2 pb-4 snap-x snap-mandatory">

                        {venues.map((venue)=>(
                            <div
                                key={venue.id}
                                className="min-w-[250px] snap-center flex-shrink-0"
                            >
                                <VenueCard venue={venue}/>
                            </div>
                        ))}

                    </div>

                </div>
            </section>

        </div>

    )

}