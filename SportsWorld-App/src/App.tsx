
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";

import FinancePage from "./pages/FinancePage";
import AthletesPage from "./pages/AthletesPage";
import EditAthletePage from "./pages/EditAthletePage";
import AddVenuePage from "./pages/AddVenuePage";
import VenueListPage from "./pages/VenueListPage";

function App() {
  return (
    <BrowserRouter>
    <div className="min-h-screen bg-[#f6f4ef] text-[#0f3d2e]">

      { /* Navbar */ }
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
            <div className="flex gap-4 text-sm">
              <NavLink
              to="/"
              end
              className={({ isActive }) =>
              `px-3 py-1 rounded-full ${
                isActive
                ?  "bg-[#0f3d2e] text-[#f6f4ef]"
                : "text-[#1d4e39] hover:bg-[#e7ddc3]"
              }`
            }
            > Home </NavLink>

            <NavLink
            to="/athletes"
            className={({ isActive }) =>
              `px-3 py-1 rounded-full ${
                isActive
                ?  "bg-[#0f3d2e] text-[#f6f4ef]"
                : "text-[#1d4e39] hover:bg-[#e7ddc3]"
              }`
            }
            > Athletes </NavLink>

            <NavLink
            to="/venues"
            className={({ isActive }) =>
              `px-3 py-1 rounded-full ${
                isActive
                ?  "bg-[#0f3d2e] text-[#f6f4ef]"
                : "text-[#1d4e39] hover:bg-[#e7ddc3]"
              }`
            }
            > Venues </NavLink>

            <NavLink
            to="/venues/admin"
            className={({ isActive }) =>
              `px-3 py-1 rounded-full ${
                isActive
                ?  "bg-[#0f3d2e] text-[#f6f4ef]"
                : "text-[#1d4e39] hover:bg-[#e7ddc3]"
              }`
            }
            > Add Venue </NavLink>
          </div>
        </nav>
      </header>

      { /* Sideinnhold */ }
      <main className="max-w-6xl mx-auto px-4 py-8">
        <Routes>
          { /* Home -> bruker finance */ }
          <Route path="/" element={<FinancePage />} />

          { /* Athletes */ }
          <Route path="/athletes" element={<AthletesPage />} />
          <Route path="/athletes/edit/:id" element={<EditAthletePage />} />

          { /* Venues */ }
          <Route path="/venues" element={<VenueListPage />} />
          <Route path="/venues/admin" element={<AddVenuePage />} />

          <Route 
          path="*"
          element={
            <p className="text-center text-gray-600 mt-20"> Page not found.</p>
          }
        />
        </Routes>
      </main>
    </div>
    </BrowserRouter>
  )
}

export default App;
