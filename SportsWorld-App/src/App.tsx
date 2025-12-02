
import {  Routes, Route, } from "react-router-dom";
import Navbar from "./components/Navbar";

import AthletesPage from "./pages/AthletesPage";
import EditAthletePage from "./pages/EditAthletePage";
import AddVenuePage from "./pages/AddVenuePage";
import VenueListPage from "./pages/VenueListPage";
import FinancePage from "./pages/FinancePage";
import Homepage from "./pages/HomePage";
import RegisterAthletePage from "./pages/RegisterAthletePage";


function App() {
  return (
    <div className="min-h-screen bg-[#f6f4ef] text-[#0f3d2e]">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <Routes>
          { /* Home */ }
          <Route path="/" element={<Homepage />} />

          { /* Finance */ }
          <Route path="/finance" element={<FinancePage />} />

          { /* Athletes */ }
          <Route path="/athletes" element={<AthletesPage />} />
          <Route path="/athletes/edit/:id" element={<EditAthletePage />} />
          <Route path="/athletes/register" element={<RegisterAthletePage />} />
          
          { /* Venues */ }
          <Route path="/venues" element={<VenueListPage />} />
          <Route path="/venues/admin" element={<AddVenuePage />} />

          <Route 
          path="*"
          element={
              <p className="text-center text-gray-600 mt-20">Page not found.</p>
            } 
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
