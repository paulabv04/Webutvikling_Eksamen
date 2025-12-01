import { Routes, Route } from "react-router-dom";

import AthletesPage from "./pages/AthletesPage";
import EditAthletePage from "./pages/EditAthletePage";

// Ikke laget enda – derfor kommentert ut:
// import DashboardPage from "./pages/DashboardPage";
// import RegisterAthletePage from "./pages/RegisterAthletePage";
// import VenuesPage from "./pages/VenuesPage";
// import EditVenuePage from "./pages/EditVenuePage";

function App() {
  return (
    <Routes>
      {/* Standard startside (kommentert ut fordi dere ikke har Dashboard ennå) */}
      {/* <Route path="/" element={<DashboardPage />} /> */}
      
         
      <Route path="/" element={<AthletesPage />} />
    
    {/* Athletes */}
    <Route path="/athletes" element={<AthletesPage />} />
    <Route path="/athletes/edit/:id" element={<EditAthletePage />} />

      {/* Ikke laget enda → kommentert ut */}
      {/*
      <Route path="/athletes/register" element={<RegisterAthletePage />} />
      <Route path="/venues" element={<VenuesPage />} />
      <Route path="/venues/edit/:id" element={<EditVenuePage />} />
      */}
      
    </Routes>
  );
}

export default App
