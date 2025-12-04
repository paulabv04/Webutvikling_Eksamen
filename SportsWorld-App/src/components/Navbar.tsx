
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function Navbar() {
    //For å finne ut hvilken side brukeren er på
    const { pathname } = useLocation();

    //Sjekker om man er inne på athletes- eller venues-sider
    const isAthletes = pathname.startsWith("/athletes");
    const isVenues = pathname.startsWith("/venues");

    return (
    <header className="bg-white border-b border-tennisGreen/30 shadow-sm relative z-50">
        <nav className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">

            { /* Logo */ }
            <NavLink to="/" className="flex items-baseline gap-2 hover:opacity-80 transition">
                <span className="font-serif text-2xl tracking-wide text-tennisGreen"> 
                    SportsWorld 
                </span>
                <span className="text-xs uppercase tracking-[0.25em] text-tennisDark/70"> 
                    Tennis 
                </span>
            </NavLink>

            { /* Links */ }
            <div className="flex items-center gap-6 text-sm">

            {/* Home */ }
            <NavLink
            to="/"
            end
            className={({ isActive }) =>
                `px-3 py-1 rounded-full transition ${
                    isActive ?  "bg-tennisGreen text-white" : "text-tennisDark hover:bg-tennisPink"
                }`
                }
            > 
                Home 
            </NavLink>

            { /* Finance */ }
            <NavLink 
            to="/finance"
            className={({ isActive }) =>
                `px-3 py-1 rounded-full transition  ${
                    isActive ? "bg-tennisGreen text-white" : "text-tennisDark hover:bg-tennisPink/40"
                }`
            }
        >
                Finance
            </NavLink>

            { /* Athletes dropdown */ }
            <div className="relative group">
                <button 
                    className={`
                        px-3 py-1 rounded-full transition
                        ${isAthletes ? "bg-tennisGreen text-white" : "text-tennisDark hover:bg-tennisPink/40"}
                    `}
                >
                    Athletes
                </button>

                 <div className="absolute left-0 mt-2 w-44 bg-tennisSand rounded-xl shadow-lg border border-tennisGreen/20 py-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-1">

                    <NavLink
                        to="/athletes"
                        className="block px-4 py-2 text-sm text-tennisDark hover:bg-tennisPink/30"
                    > 
                        See all Athletes 
                    </NavLink>

                    <NavLink
                        to="/athletes/register"
                        className="block px-4 py-2 text-sm text-tennisDark hover:bg-tennisPink/30">
                            Register athlete
                    </NavLink>
                </div>
            </div>

            { /* Venues dropdown */ }
            <div className="relative group">
                <button className={`
                        px-3 py-1 rounded-full transition
                        ${isVenues ? "bg-tennisGreen text-white" : "text-tennisDark hover:bg-tennisPink/40"}
                    `}
                >
                    Venues
                </button>

                <div className="absolute left-0 mt-2 w-44 bg-tennisSand rounded-xl shadow-lg border border-tennisGreen/20 py-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-1">

                <NavLink
                    to="/venues"
                    className="block px-4 py-2 text-sm text-tennisDark hover:bg-tennisPink/30"
                >
                    See all venues
                </NavLink>

                <NavLink
                    to="/venues/admin"
                    className="block px-4 py-2 text-sm text-tennisDark hover:bg-tennisPink/30"
                >
                    Add venue
                </NavLink>
                </div>
            </div>
        </div>
    </nav>
</header>
);
}
