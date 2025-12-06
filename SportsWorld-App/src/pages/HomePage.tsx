
import { useVenue } from "../contexts/VenueContext";
import VenueCard from "../components/VenueCard";
import { useAthlete } from "../contexts/AthleteContext";
import AthleteCard from "../components/AthleteCard";

export default function Homepage(){

    //Henter venues og athletes fra context
    const { venues } = useVenue();
    const {athletes} = useAthlete();
    return (

        //Overordnet bakgrunn for hele siden
        <div className="w-full bg-tennisSand">

            {/*Video*/}
            <section className="relative w-full h-[80vh] overflow-hidden">
                <video 
                    className="absolute inset-0 w-[160%] left-1/2 -translate-x-1/2 h-full object-cover object-[center_30%]"
                    autoPlay
                    muted
                    loop
                >
                    <source src="/video/forsideVideo.mp4" type="video/mp4"/>
                    
                </video>
                
                {/*Mørk overlay for bedre kontrast*/}
                <div className="absolute inset-0 bg-gradient-to-b from-black/25 to-black/60"></div>

                {/*Tittel oppå video*/}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                    <h1 className="text-6xl md:text-8xl font-serif font-light tracking-wide text-tennisSand drop-shadow-xl">
                        SportsWorld Tennis
                    </h1>
                </div>

            </section>
            {/*Horisontal scroll for athletes*/}
            <section className="mt-16">
                <h2 className="flex gap-4 px-2 pb-4 snap-x snap-mandatory font-serif text-3xl">
                    Explore Athletes
                </h2>

                {/*Wrapper fro scroll sidevesi*/}
                <div className="overflow-x-auto">
                    <div className="flex gap-4 px-2 pb-4 snap-x snap-mandatory">

                        {athletes.map((athlete)=>(
                            <div
                                key={athlete.id}
                                className="snap-center flex-shrink-0"
                            >
                                <AthleteCard athlete={athlete} compact/>
                            </div>
                        ))}

                    </div>

                </div>
            </section>

            {/*Horisontal scroll for venues*/}
            <section className="mt-16">
                <h2 className="flex gap-4 px-2 pb-4 snap-x snap-mandatory font-serif text-3xl">
                    Explore Venues
                </h2>
                
                {/*Wrapper fro scroll sideveis*/}
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