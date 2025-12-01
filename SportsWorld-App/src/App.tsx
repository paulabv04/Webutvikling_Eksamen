import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes,Route} from "react-router-dom";
import AthletesPage from './pages/AthletesPage';
import FinancePage from './pages/FinancePage';

function App() {
  return (
    <Routes>
      <Route path='/' element={<AthletesPage/>} />
      <Route path="/finance" element={<FinancePage />} />

    </Routes>
  )
}

export default App
