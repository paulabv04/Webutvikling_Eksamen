
import { NavLink } from "react-router-dom";

export default function Navbar() {
    return (
    <header className="bg-white border-b border-[#d6c7a1] shadow-sm">
        <nav className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">

            { /* Logo */ }
            <div className="flex items-baseline gap-2">
            <span className="font-serif text-2xl tracking-wide text-[#0f3d2e]"> 
            SportsWorld 
            </span>
            <span className="text-xs uppercase tracking-[0.25em] text-[#1d4e39]"> 
            Tennis 
            </span>
            </div>

            { /* Links */ }
            <div className="flex items-center gap-4 text-sm">
            {/* Home */ }
            <NavLink
            to="/"
            end
            className={({ isActive }) =>
            `inline-flex items-center justify-center px-3 py-1 rounded-full ${
                isActive
                    ?  "bg-[#0f3d2e] text-[#f6f4ef]"
                    : "text-[#1d4e39] hover:bg-[#e7ddc3]"
                }`
            }
            > 
                Home 
            </NavLink>

            { /* Finance */ }
            <NavLink 
            to="/finance"
            className={({ isActive }) =>
                `inline-flex items-center justify-center px-3 py-1 rounded-full ${
                    isActive
                    ?  "bg-[#0f3d2e] text-[#f6f4ef]"
                    : "text-[#1d4e39] hover:bg-[#e7ddc3]"
                }`
            }
        >
            Finance
        </NavLink>
        


            { /* Athletes dropdown */ }
            <div className="relative group">
            <NavLink
            to="/athletes"
            className={({ isActive }) =>
            `inline-flex items-center justify-center px-3 py-1 rounded-full ${
            isActive
            ?  "bg-[#0f3d2e] text-[#f6f4ef]"
            : "text-[#1d4e39] hover:bg-[#e7ddc3]"
        }`
    }
            > 
            Athletes 
            </NavLink>

            { /* Dropdown når du hover på athletes */ }
            <div className="absolute left-0 mt-2 w-40 bg-white rounded-xl shadow-lg border border-[#e0d2ae] py-2 hidden group-hover:block">
            <NavLink
            to="/athletes"
            className="block px-3 py-1 text-xs text-[#1d4e39] hover:bg-[#f6f4ef]"
            >
                See all athletes
            </NavLink>
            <NavLink
            to="/athletes/register"
            className="block px-3 py-1 text-xs text-[#1d4e39] hover:bg-[#f6f4ef]"
            >
                Add athlete
            </NavLink>
            </div>
        </div>

        { /* Venues dropdown */ }
        <div className="relative group">
        <NavLink
        to="/venues"
        className={({ isActive }) =>
        `inline-flex items-center justify-center px-3 py-1 rounded-full ${
            isActive
            ?  "bg-[#0f3d2e] text-[#f6f4ef]"
            : "text-[#1d4e39] hover:bg-[#e7ddc3]"
            }`
        }
            > 
            Venues 
            </NavLink>

        { /* Dropdown når du hover på venues */ }
        <div className="absolute left-0 mt-2 w-40 bg-white rounded-xl shadow-lg border border-[#e0d2ae] py-2 hidden group-hover:block">
            <NavLink
                to="/venues"
                className="block px-3 py-1 text-xs text-[#1d4e39] hover:bg-[#f6f4ef]"
                >
                See all venues
                </NavLink>
                <NavLink
                to="/venues/admin"
                className="block px-3 py-1 text-xs text-[#1d4e39] hover:bg-[#f6f4ef]"
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
